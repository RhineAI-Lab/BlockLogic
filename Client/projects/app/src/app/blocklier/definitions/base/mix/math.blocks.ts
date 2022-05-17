import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(
  `

prefix: math
style: math_blocks

round_with: num
保留(number:2)位小数{num}
tip: 四舍五入至指定位数小数
Python
round($A1, $A0)

`,
  true,
);
