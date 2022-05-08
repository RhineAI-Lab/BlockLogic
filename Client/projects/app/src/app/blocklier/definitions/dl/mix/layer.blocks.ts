import {defineBlocksWithDt} from "../../register";

defineBlocksWithDt(`

prefix: modules
style: module_blocks

sequential_e: Module
顺序模型
{}
Python
import: from torch import nn
nn.Sequential(\n$A0)

sequential_create_e
创建顺序模型(var net:Module)
{}
Python
import: from torch import nn
$A0 = nn.Sequential(\n$A1)

list_connector
{Module}
Python
$A0,\\n

prefix: layers
help: https://pytorch.org/docs/stable/generated/

linear: Module
线性层   IO{num}{num} 偏差(checkbox:true)
help: torch.nn.Linear.html#torch.nn.Linear
tip: 创建线性连接层，此处输入输出为输入输出的维度大小。
Python
import: from torch import nn
nn.Linear($A0, $A1, bias=$A2)



`, true);
