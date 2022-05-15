import json , random
from rouge import Rouge
from transformers import T5Tokenizer, T5ForConditionalGeneration, TrainingArguments, Trainer

def read_json(input_file: str) -> list:
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    return list(map(json.loads, lines))

trainset = read_json(r"../csl/csl_title_train.json")
test = read_json(r"../csl/csl_title_dev.json")

random.shuffle(trainset)
train = trainset[:2500]
dev = trainset[2500:]
print('训练集大小：%d个训练样本'%(len(train)))
print('开发集大小：%d个训练样本'%(len(dev)))
print('每个训练样本的原始格式如下：\n',train[1])

model_path = r"../mengzi-t5-base"
Mengzi_tokenizer = T5Tokenizer.from_pretrained(model_path)
Mengzi_model = T5ForConditionalGeneration.from_pretrained(model_path)

class Seq2SeqDataset:
    def __init__(self, data):
        self.datas = data

    def __len__(self):
        return len(self.datas)

    def __getitem__(self, index):
        return self.datas[index]

class DataCollatorForSeq2Seq:
    def __init__(self, tokenizer, padding: bool = True, max_length: int = 512):
        self.tokenizer = tokenizer
        #self.model = model
        self.padding = padding
        self.max_length = max_length

    def __call__(self, batch):
        features = self.collator_fn(batch)
        return features

    def preprocess(self, item):
        source = item["abst"]
        target = item["title"]
        return source, target

    def collator_fn(self, batch):
        results = map(self.preprocess, batch)
        inputs, targets = zip(*results)

        input_tensor = self.tokenizer(inputs,
                                      truncation=True,
                                      padding=True,
                                      max_length=self.max_length,
                                      return_tensors="pt",
                                      )

        target_tensor = self.tokenizer(targets,
                                       truncation=True,
                                       padding=True,
                                       max_length=self.max_length,
                                       return_tensors="pt",
                                       )

        input_tensor["labels"] = target_tensor["input_ids"]

        if "token_type_ids" in input_tensor:
            del input_tensor["token_type_ids"]
        return input_tensor

trainset = Seq2SeqDataset(train)
devset = Seq2SeqDataset(dev)
collator = DataCollatorForSeq2Seq(Mengzi_tokenizer)

output_dir = "test" # 模型checkpoint的保存目录
training_args = TrainingArguments(
        num_train_epochs=1,
        per_device_train_batch_size=8,
        logging_steps=10,
        #fp16=True,
        evaluation_strategy="steps",
        eval_steps=100,
        load_best_model_at_end=True,
        learning_rate=1e-5,
        #warmup_steps=100,
        output_dir="test",
        save_total_limit=5,
        lr_scheduler_type='constant',
        gradient_accumulation_steps=1,
        dataloader_num_workers=0)

# print(training_args)
trainer = Trainer(
    tokenizer=Mengzi_tokenizer,
    model=Mengzi_model,
    args=training_args,
    data_collator=collator,
    train_dataset=trainset,
    eval_dataset=devset
)

trainer.train()
trainer.save_model("test/best") # 保存最好的模型

# 开始推理
test = read_json(r"../csl/csl_title_dev.json")

def preprocess(items):
    inputs = []
    titles = []
    for item in items:
        inputs.append(item["abst"])
        titles.append(item["title"])
    return inputs, titles

best_model = "test/best"
tokenizer = T5Tokenizer.from_pretrained(best_model)
model = T5ForConditionalGeneration.from_pretrained(best_model).cuda()

def predict(sources, batch_size=8):
    model.eval()  # 将模型转换为评估模式

    kwargs = {"num_beams": 4}

    outputs = []
    for start in range(0, len(sources), batch_size):
        batch = sources[start:start + batch_size]

        input_tensor = tokenizer(batch, return_tensors="pt", truncation=True, padding=True,
                                 max_length=512).input_ids.cuda()

        outputs.extend(model.generate(input_ids=input_tensor, **kwargs))
    return tokenizer.batch_decode(outputs, skip_special_tokens=True)

inputs, refs = preprocess(test)
generations = predict(inputs)

print("inputs:"+inputs[0])
print("refs:"+refs[0])
print("generations"+generations[0])

rouge = Rouge()

def rouge_score(candidate, reference):
    text1 = " ".join(list(candidate))
    text2 = " ".join(list(reference))
    score = rouge.get_scores(text1, text2)
    return score

def compute_rouge(preds, refs):
    r1=[]
    r2=[]
    R_L=[]
    for pred, ref in zip(preds, refs):
        scores = rouge_score(pred, ref)
        r1.append(scores[0]["rouge-1"]["f"])
        r2.append(scores[0]["rouge-2"]["f"])
        R_L.append(scores[0]["rouge-l"]["f"])
    return sum(r1)/len(r1), sum(r2)/len(r2), sum(R_L)/len(R_L)

R_1, R_2, R_L = compute_rouge(generations, refs)
print('R_1:',R_1, '/n', 'R_2:', R_2, '\n', 'R_L:', R_L)