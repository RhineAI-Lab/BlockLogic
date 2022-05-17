import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(
  `

prefix: controls_loops
style: loop_blocks

range
变量(var i:any)从{num}数到{num}
{}
inline: true
Python
for $A0 in range($A1,$A2+1):
$A3


`,
  true,
);
