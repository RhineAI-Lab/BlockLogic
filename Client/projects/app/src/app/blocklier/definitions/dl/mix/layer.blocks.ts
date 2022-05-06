import {defineBlocksWithText} from "../../register";

defineBlocksWithText(`

prefix: layers
style: module_blocks
help: https://pytorch.org/docs/stable/generated/

linear: Module
线性连接层   IO{num}{num} 偏差(checkbox)
help: torch.nn.Linear.html#torch.nn.Linear
tip: 创建线性连接层，此处输入输出为输入输出的维度大小。
Python
import: from torch import nn
nn.Linear($A0, $A1, bias=$A2)

prefix: test

block: null
测试块 (input: 666) (checkbox: true) {str} 选择[AAA:aaa/BBB] 输入{num:R} 执行{STAT}
inline: 0
Python
import: from temp import test
order: 10
test('$A0', $A1, $A2, '$A3', $A4):
$A5

`);
