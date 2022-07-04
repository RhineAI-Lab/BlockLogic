import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(
  `
prefix: file
style: file_blocks

open: file
[只读: r/写入: w/读写: r+/新建读写: w+]模式 打开文本文件 路径{str} 
inline: 1
tip:打开文本文件 
Python
open($A1, mode='$A0', encoding='utf-8')

close
关闭{file}文件
inline: 1
tip:关闭文件
Python
$A0.close()

read: str
读取{file}文件内容
inline: 1
tip: 读取全部文件内容
Python
$A0.read()

readlines: list
读取{file}文件并生成内容列表
inline: 1
tip: 读取文件的每一行
Python
$A0.readlines()

write
将{str}写入{file}文件
inline: 1
tip: 将文本写入文件
Python
$A1.write($A0)
    `,
  true,
);
