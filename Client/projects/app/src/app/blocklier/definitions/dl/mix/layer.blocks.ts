import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(
  `

prefix: layers
style: layer_blocks
help: https://pytorch.org/docs/stable/generated/

linear: Module
线性层   IO(number:10)(number:10)
help: torch.nn.Linear.html#torch.nn.Linear
tip: 创建线性连接层，此处输入输出为输入输出的维度大小。
Python
import: from torch import nn
nn.Linear($A0, $A1)

linear_full: Module
线性层   IO{num}{num} 偏差(checkbox:true)
help: torch.nn.Linear.html#torch.nn.Linear
tip: 创建线性连接层，此处输入输出为输入输出的维度大小。
Python
import: from torch import nn
nn.Linear($A0, $A1, bias=$A2)

conv: Module
卷积层[2d/3d/1d].  IO(number:16)(number:33) 卷积核(number:3)
help: torch.nn.Conv2d.html#torch.nn.Conv2d
Python
import: from torch import nn
nn.Conv$A0($A1, $A2, $A3)

conv_full: Module
[卷积层:Conv/懒卷积层:LazyConv/转置卷积层:ConvTranspose/转置懒卷积层:LazyConvTranspose][2d/3d/1d]
输入{num:R} 输出{num:R} 卷积核{num,Array:R}
步长{num,Array:R} 填充模式[zeros/reflect/replicate/circular] {num,Array:R}
help: torch.nn.Conv2d.html#torch.nn.Conv2d
inline: false
Python
import: from torch import nn
nn.$A0$A1($A2, $A3, $A4, $A5, $A7, '$A6')

pool: Module
[最大:Max/平均:Avg]池化层[2d/3d/1d].  卷积核(number:3)
help: torch.nn.MaxPool2d.html#torch.nn.MaxPool2d
tip: 创建池化层，用于压缩数据。
Python
import: from torch import nn
nn.$A0Pool$A1($A2)

pool_full: Module
[最大:Max/平均:Avg]池化层[2d/3d/1d]
卷积核{num:R} 步长{num:R} 填充{num:R}
help: torch.nn.MaxPool2d.html#torch.nn.MaxPool2d
tip: 创建池化层，用于压缩数据。
Python
import: from torch import nn
nn.$A0Pool$A1($A2, $A3, $A4)

sigmoid: Module
Sigmoid层
help: torch.nn.Sigmoid.html#torch.nn.Sigmoid
tip: 创建Sigmoid层，用于激活数据，使数据非线性化。
Python
import: from torch import nn
nn.Sigmoid()

relu: Module
ReLU层   覆盖(checkbox:false)
help: torch.nn.ReLU.html#torch.nn.ReLU
tip: 创建ReLU层，用于激活数据，使数据非线性化。
Python
import: from torch import nn
nn.ReLU($A0)

dropout: Module
随机丢弃层[标准:Dropout/透明:AlphaDropout/标准2d:Dropout2d/标准3d:Dropout3d]
概率(number:0.5) 覆盖(checkbox:false)
help: torch.nn.Dropout.html#torch.nn.Dropout
Python
import: from torch import nn
nn.$A0($A1, $A2)

rnn: Module
RNN层   输入(number:10) 隐藏大小(number:10) 层数(number:2)
help: torch.nn.RNN.html#torch.nn.RNN
tip: 创建RNN层。
Python
import: from torch import nn
nn.RNN($A0, $A1, $A2)

lstm: Module
LSTM层   输入(number:10) 隐藏大小(number:10) 层数(number:2)
help: torch.nn.LSTM.html#torch.nn.LSTM
tip: 创建LSTM层。
Python
import: from torch import nn
nn.LSTM($A0, $A1, $A2)

help: https://pytorch.org/vision/0.12/

vision: Module
视觉模型[resnet18/alexnet/vgg16].  预训练(checkbox:true)
help: models.html
Python
import: from torchvision import models
models.$A0(pretrained=$A1)

efficient: Module
高效模型[b0/b1/b2/b3/b4/b5/b6/b7].  预训练(checkbox:true)
help: models.html
Python
import: from torchvision import models
models.efficientnet_$A0(pretrained=$A1)


`,
  true,
);
