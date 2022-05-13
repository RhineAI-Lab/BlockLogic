import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(
  `

prefix: data
style: data_blocks
help: https://pytorch.org/docs/stable/data.html

mix_create
创建内置数据集[MNIST/CIFAR10/FashionMNIST/STL10/ImageNet/CocoDetection/VocSegmentation] 路径{str}
自动下载(checkbox:true) 批次大小{num:R}
训练集(var train_loader: DataLoader) 增强{Transforms:R}
测试集(var test_loader: DataLoader) 增强{Transforms:R}
Python
import: from torchvision import datasets
import: from torch.utils import data
train_datasets = datasets.$A0(root=$A1, train=True, download=$A2, transform=$A5)
$A4 = data.DataLoader(train_datasets, batch_size=$A3, shuffle=True)
test_datasets = datasets.$A0(root=$A1, train=False, download=$A2, transform=$A7)
$A6 = data.DataLoader(test_datasets, batch_size=$A3, shuffle=False)

dataset_create
创建(var datasets:Dataset)为内置数据集[MNIST/CIFAR10/FashionMNIST/STL10/ImageNet/CocoDetection/VocSegmentation] 路径{str}
用于训练(checkbox:true) 自动下载(checkbox:true) 数据增强{Transforms:R}
Python
import: from torchvision import datasets
$A0 = datasets.$A1(root='$A2', train=$A3, download=$A4, transform=$A5)

loader_create
创建导入器(var dataloader: DataLoader) 数据集{Dataset} 打乱(checkbox) 批次大小{num:R}
Python
import: from torch.utils import data
$A0 = data.DataLoader($A1, batch_size=$A2, shuffle=$A3)


`,
  true,
);
