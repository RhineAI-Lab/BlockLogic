import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(
  `

prefix: text
style: text_blocks

connect: str
拼接{str}{str}
inline: true
tip: 拼接字符串
Python
$A0 + $A1

`,
  false,
);
