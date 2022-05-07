import {defineBlocksWithDt} from "../../register";

defineBlocksWithDt(`

prefix: test

block: any
测试块 (input: 666) (checkbox: true) {str} 选择[AAA:aaa/BBB] 输入{num:R} 执行{STAT}
inline: 0
Python
import: from temp import test
order: 10
test('$A0', $A1, $A2, '$A3', $A4):
$A5

`);
