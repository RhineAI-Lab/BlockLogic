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

# 读取数据
batch_size = 10
dataset = Data.TensorDataset(features, labels)
data_iter = Data.DataLoader(dataset, batch_size, shuffle=True)

# 定义模型
net = nn.Sequential(
    nn.Linear(1, 1),
)

# 定义损失
loss = nn.MSELoss()

# 定义优化器
optimizer = optim.SGD(net.parameters(), lr=0.01)

# 训练
num_epochs = 10
for epoch in range(1, num_epochs + 1):
    for X, y in data_iter:
        output = net(X)
        l = loss(output, y.view(-1, 1))
        optimizer.zero_grad()
        l.backward()
        optimizer.step()
    print('epoch %d, loss: %f' % (epoch, l.item()))

# 输出域侧结果
pred_w = net[0].weight
pred_b = net[0].bias
print('TrainResult:  w=%.4f  h=%.4f'%(pred_w,pred_b))

# 绘制域侧结果
preds = net(features)
plt.scatter(features.numpy(),labels.numpy(), alpha=0.5)
plt.scatter(features.numpy(),preds.detach().numpy(), c='#e36', s=3)
plt.show()
