import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(
    `
prefix: time
style: transforms_blocks

sleep
停顿{num}秒
inline: 1
tip: 暂停程序执行
Python
import: import time
time.sleep($A0)

nowtime
获取当前时间[秒数:/文本:asc/结构化 无时区:gm/结构化 本地:local]
inline: 1
tip: 获取当前时间
Python
import: import time
time.$A0time()

changetostr
转换时间{num,Tuple}类型[元组:asc/秒数:c]到文本
inline: 1
tip: 转换时间类型为字符
Python
import: import time
time.$A1time($A0)

changetostruct
转换秒数时间{num}类型到结构化[无时区:gm/本地:local]
inline: 1
tip: 转换时间类型为结构化
Python
import: import time
time.$A1time($A0)
`);
