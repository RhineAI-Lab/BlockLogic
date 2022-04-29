import torch
import torchvision.datasets
from matplotlib import pyplot as plt
from torch.utils.data import DataLoader
from torchvision.transforms import transforms
import torch.nn as nn
import torchvision.models as models

classes = ('plane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck')

class ResNet(nn.Module):
    def __init__(self, num_classes=10):
        super(ResNet, self).__init__()
        self.features = models.resnet18(pretrained=True)
        self.classifier = nn.Sequential(
            nn.Linear(1000, 64),
            nn.ReLU(True),
            nn.Dropout(0.5),
            nn.Linear(64, num_classes),
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x

net = ResNet(len(classes))
print(net)

