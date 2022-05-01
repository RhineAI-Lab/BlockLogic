import torch
import torchvision
from matplotlib import pyplot as plt
import numpy as np
import time
from torchvision.transforms import transforms
import torch.nn as nn

# 定义超参数
EPOCHS = 10
LR = 0.001
BATCH_SIZE = 16

# 导入数据集
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])
train_datasets = torchvision.datasets.CIFAR10('I:\data', train=True, download=True, transform=transform)
train_loader = torch.utils.data.DataLoader(dataset=train_datasets, batch_size=BATCH_SIZE, shuffle=True)
test_datasets = torchvision.datasets.CIFAR10('I:\data', train=False, download=True, transform=transform)
test_loader = torch.utils.data.DataLoader(dataset=test_datasets, batch_size=BATCH_SIZE, shuffle=True)
classes = ('plane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck')

# 显示部分数据集示例
for i, (imgs, labels) in enumerate(train_datasets):
    plt.subplot(3,3,i+1)
    plt.tight_layout()
    plt.title(str(classes[labels]))
    imgs = imgs.numpy().transpose(1, 2, 0)
    imgs = np.clip(imgs, 0, 1)
    plt.imshow(imgs)
    plt.xticks([])
    plt.yticks([])
    if i==8: break
plt.show()

# 定义网络结构
class ResNet(nn.Module):
    def __init__(self, num_classes=10):
        super(ResNet, self).__init__()
        self.net = torchvision.models.resnet18(pretrained=True)
        self.classifier = nn.Sequential(
            nn.Linear(1000, 64),
            nn.ReLU(True),
            nn.Dropout(0.5),
            nn.Linear(64, num_classes),
        )
    def forward(self, x):
        x = self.net(x)
        x = self.classifier(x)
        return x

# 构建网络并打印其结构
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
net = ResNet(len(classes)).to(device)
print(net)

# 创建损失函数和优化器
loss = torch.nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(net.parameters(), lr=LR)

# 测试
def evaluate_accuracy(data_loader, net, device=None):
    if device is None and isinstance(net, nn.Module):
        device = list(net.parameters())[0].device
    acc_sum, n = 0.0, 0
    with torch.no_grad():
        for imgs, labels in data_loader:
            if isinstance(net, nn.Module):
                net.eval()
                acc_sum += (net(imgs.to(device)).argmax(dim=1) == labels.to(device)).float().sum().cpu().item()
                net.train()
            else:
                if('is_training' in net.__code__.co_varnames):
                    acc_sum += (net(imgs, is_training=False).argmax(dim=1) == labels).float().sum().item()
                else:
                    acc_sum += (net(imgs).argmax(dim=1) == labels).float().sum().item()
            n += labels.shape[0]
    return acc_sum / n

# 训练
print("Training on: ", device)
for epoch in range(EPOCHS):
    train_l_sum, train_acc_sum, n, batch_count, start = 0.0, 0.0, 0, 0, time.time()
    for imgs, labels in train_loader:
        imgs, labels = imgs.to(device), labels.to(device)
        preds = net(imgs)
        l = loss(preds, labels)
        optimizer.zero_grad()
        l.backward()
        optimizer.step()
        train_l_sum += l.cpu().item()
        train_acc_sum += (preds.argmax(dim=1) == labels).sum().cpu().item()
        n += labels.shape[0]
        batch_count += 1
    test_acc = evaluate_accuracy(test_loader, net)
    print('epoch %d, loss %.4f, train acc %.3f, test acc %.3f, time %.1f sec'
          % (epoch + 1, train_l_sum / batch_count, train_acc_sum / n, test_acc, time.time() - start))
