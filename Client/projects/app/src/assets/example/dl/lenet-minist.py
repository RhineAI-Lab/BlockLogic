import torch
from torchvision import transforms
from torchvision import datasets
from torch.utils import data
from torch import nn
from torch import optim

EPOCHS = None
trans = None
conv = None
learner = None
LR = None
train_loader = None
test_loader = None
fc = None
epoch = None
BATCH_SIZE = None
net = None
train_acc_sum = None
device = None
x = None
train_img_num = None
train_loss_sum = None
batch_num = None
batch = None
test_acc_sum = None
imgs = None
labels = None
preds = None
test_img_num = None
loss = None
output = None


EPOCHS = 5
LR = 0.001
BATCH_SIZE = 32
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

trans = transforms.Compose([
  transforms.ToTensor(),
  transforms.Normalize(mean=(0.2,),std=(0.3,))
])
train_datasets = datasets.MNIST(root='./data', train=True, download=True, transform=trans)
train_loader = data.DataLoader(train_datasets, batch_size=BATCH_SIZE, shuffle=True)
test_datasets = datasets.MNIST(root='./data', train=False, download=True, transform=trans)
test_loader = data.DataLoader(test_datasets, batch_size=BATCH_SIZE, shuffle=False)

conv = nn.Sequential(
  nn.Conv2d(1, 6, 5),
  nn.Sigmoid(),
  nn.MaxPool2d(2),
  nn.Conv2d(6, 16, 5),
  nn.Sigmoid(),
  nn.MaxPool2d(2)
)
fc = nn.Sequential(
  nn.Linear(256, 120),
  nn.Sigmoid(),
  nn.Linear(120, 84),
  nn.Sigmoid(),
  nn.Linear(84, 10)
)
class MyModule(nn.Module):
  def __init__(self):
    super(MyModule, self).__init__()
    self.conv = conv
    self.fc = fc
  def forward(self, x):
    x = self.conv(x)
    x = x.view([x.shape[0], -1])
    x = self.fc(x)
    return x
net = MyModule()
net = net.to(device)
print(net)

learner = nn.CrossEntropyLoss(), optim.Adam(net.parameters(), LR)
for epoch in range(1,EPOCHS+1):
  train_acc_sum = 0
  train_img_num = 0
  train_loss_sum = 0
  batch_num = 0
  for batch in train_loader:
    imgs, labels = batch
    preds = net(imgs)
    loss_f, optimizer = learner
    l = loss_f(preds, labels)
    optimizer.zero_grad()
    l.backward()
    optimizer.step()
    loss = l.cpu().item()
    train_acc_sum += (preds.argmax(dim=1) == labels).sum().cpu().item()
    train_img_num += labels.shape[0]
    train_loss_sum += loss
    batch_num += 1
  test_acc_sum = 0
  test_img_num = 0
  for batch in test_loader:
    imgs, labels = batch
    preds = net(imgs)
    test_acc_sum += (preds.argmax(dim=1) == labels).sum().cpu().item()
    test_img_num += labels.shape[0]
  output = 'epoch:'
  output += str(epoch)
  output += ', 训练集正确率:'
  output += str(((train_acc_sum / train_img_num) * 100))
  output += ', 测试集正确率:'
  output += str(((test_acc_sum / test_img_num) * 100))
  print(output)



#------ 图形块结构记录 请勿随意修改 ------
