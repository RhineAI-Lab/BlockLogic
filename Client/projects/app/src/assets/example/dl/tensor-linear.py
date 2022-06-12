import torch.utils.data as Data
import torch
import torch.nn as nn
import numpy as np
import torch.optim as optim
import matplotlib.pyplot as plt

# 生成数据
num_inputs = 1
num_examples = 500
true_w = 2.6
true_b = 4.2
features = torch.tensor(np.random.normal(0, 1, (num_examples, num_inputs)), dtype=torch.float)
labels = true_w * features[:, 0] + true_b
noises= torch.tensor(np.random.normal(0, 1.5, size=labels.size()), dtype=torch.float)
labels += noises

# 定义超参数
BATCH_SIZE = 32
LEARNING_RATE = 0.01
NUM_EPOCHS = 10

# 读取数据
dataset = Data.TensorDataset(features, labels)
data_iter = Data.DataLoader(dataset, BATCH_SIZE, shuffle=True)

# 定义模型
net = nn.Sequential(
    nn.Linear(1, 1),
)

# 定义损失函数和优化器
loss = nn.MSELoss()
optimizer = optim.SGD(net.parameters(), lr=LEARNING_RATE)

# 训练
for epoch in range(NUM_EPOCHS):
    for X, y in data_iter:
        output = net(X)
        l = loss(output, y.view(-1, 1))
        optimizer.zero_grad()
        l.backward()
        optimizer.step()
    print('epoch %d, loss: %f' % (epoch, l.item()))

# 输出训练结果
pred_w = net[0].weight
pred_b = net[0].bias
print('TrainResult:  w=%.4f  h=%.4f'%(pred_w,pred_b))

# 绘制预测结果 (蓝色为数据集值中正确位置，红色为预测位置)
preds = net(features)
plt.scatter(features.numpy(),labels.numpy(), alpha=0.5)
plt.scatter(features.numpy(),preds.detach().numpy(), c='#e36', s=3)
plt.show()
