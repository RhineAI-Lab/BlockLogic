import {defineBlocksWithText} from "../../register";

defineBlocksWithText(`

prefix: layers
style: module_blocks
help: https://pytorch.org/docs/stable/generated/

Module: linear
线性连接层   IO{num}{num} 偏差(checkbox)
help: torch.nn.Linear.html#torch.nn.Linear
tip: 创建线性连接层，此处输入输出为输入输出的维度大小。
Python
import: from torch import nn
nn.Linear($A0, $A1, bias=$A2)

prefix: test

null: block
测试块 {str} 选择[aa/AAA:aaa/BBB:bbb] 颜色(colour) 输入{R:input}
inline: 0

`);
