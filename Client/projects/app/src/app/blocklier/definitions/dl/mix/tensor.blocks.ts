import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(
  `

prefix: tensor
style: tensor_blocks
help: https://pytorch.org/docs/stable/tensors.html

set
设置(var x: Tensor)为{Tensor}
Python
$A0 = $A1

get: Tensor
(var x: Tensor)
Python
$A0

create_shape: Tensor
创建张量 默认填充[0:zeros,1:ones,空:empty,0-1均匀随机:rand,正态分布随机:randn] 形状为{Array}
help: #creation-ops
Python
import: import torch
torch.$A0($A1)

create_like: Tensor
创建张量 默认填充[0:zeros,1:ones,空:empty,0-1均匀随机:rand,正态分布随机:randn] 形状等同于{Tensor}
help: #creation-ops
Python
import: import torch
torch.$A0_like($A1)

create_from: Tensor
转换为张量{Numpy,Array}
tip: 从列表或Numpy转换为张量
Python
import: import torch
torch.tensor($A0)

shape_get: Array
(var x: Tensor)的形状
Python
$A0.shape

shape_set
修改(var x: Tensor)的形状为{Array}
inline: true
Python
$A0.view($A1)

`,
  true,
);
