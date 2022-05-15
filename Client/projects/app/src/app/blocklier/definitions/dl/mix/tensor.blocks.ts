import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(
  `

prefix: tensor
style: tensor_blocks
help: https://pytorch.org/docs/stable/tensors.html

set
设置(var t: Tensor)为{Tensor}
Python
$A0 = $A1

get: Tensor
(var t: Tensor)
Python
$A0


`,
  true,
);
