import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(
    `
prefix: time
style: transforms_blocks

sleep
停顿{num}秒
inline: 1
tip: 显示图像
Python
import: import time
time.sleep($A0)

`);
