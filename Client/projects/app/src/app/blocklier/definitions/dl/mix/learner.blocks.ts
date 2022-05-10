import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(
  `

prefix: learner
style: learner_blocks
help: https://pytorch.org/docs/stable/optim.html

set
设置(var learner: Learner)为{Learner}
Python
$A0 = $A1

get: Learner
(var learner: Learner)
Python
$A0

prefix: optimizer

new: Optimizer,Function
创建[SGD/Adam/RMSprop]优化器 模型{Module} 学习率{num}
inline: true
Python
import: from torch import optim
optim.$A0($A1.parameters(), $A2)

prefix: loss

new: Loss,Function
创建[L1损失:L1Loss/平滑L1损失:SmoothL1Loss/均值损失:MSELoss/交叉熵损失:CrossEntropyLoss/二分类交叉熵损失:BCELoss]函数
Python
import: from torch import nn
nn.$A0()

`,
  true,
);
