import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(
  `

prefix: modules
style: module_blocks
help: https://pytorch.org/docs/stable/generated/

sequential_e: Module
顺序模型
{}
Python
import: from torch import nn
nn.Sequential(\n$A0)

sequential_create_e
顺序模型(var net:Module)
{}
Python
import: from torch import nn
$A0 = nn.Sequential(\n$A1)

list_connector
{Module}
Python
$A0,\\n

device: Device
设备[推荐设备:'cuda' if torch.cuda.is_available() else 'cpu'/CPU:'cpu'/CUDA:'cuda']
Python
import: import torch
torch.device($A0)

module_to_device
转换{Module,Tensor}到设备{Device}
inline: true
Python
$A0 = $A0.to($A1)

`,
  false,
);
