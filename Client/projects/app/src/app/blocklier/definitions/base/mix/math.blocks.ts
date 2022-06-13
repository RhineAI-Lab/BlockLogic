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

calculate: num,Tensor,Numpy,Array
{num,Tensor,Numpy,Array}[+/-/×:*/÷]{num,Tensor,Numpy,Array}
tip: 数学运算
inline: true
PythonCode
A1 = A1.replace('÷', '/')
code = A0 + ' ' + A1 + ' ' + A2

prefix: logic
style: logic_blocks

compare_plus: Boolean,Tensor,Numpy
{num,Tensor,Numpy}[>/</=/≥:>=/≤:<=]{num,Tensor,Numpy}
tip: 比较运算
inline: true
Python
$A0 $A1 $A2

`,
  false,
);
