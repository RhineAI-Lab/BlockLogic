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


style: console_blocks

input_new: num,str
[数字:NUMBER/文本:STRING]输入 提示{str}
tip: 数字或文本输入
PythonCode
if (A0 == 'NUMBER') {
    code = 'float(text_prompt(' + A1 + '))'
} else {
    code = 'text_prompt(' + A1 + ')'
}

`,
  false,
);
