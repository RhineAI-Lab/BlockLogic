export const blocks = `

prefix: layer
style: module_blocks
help: https://pytorch.org/docs/stable/generated/

Module: linear
线性连接层 输入{num} 输出{num} 偏差(check)
help: torch.nn.Linear.html#torch.nn.Linear
tip: 创建线性连接层，此处输入输出为输入输出的维度大小。
Python
import: from torch import nn
nn.Linear(c0, c1, bias=c2)

`;
