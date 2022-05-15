import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(`
prefix: cv2
style: transforms_blocks

imread: Numpy
读取图像 {str} [忽略透明度: cv.IMREAD_COLOR/忽略色彩: cv.IMREAD_GRAYSCALE/原图无损: cv.IMREAD_UNCHANGED]
inline: 1
tip: 读取图像
Python
import: import cv2
cv2.imread($A0, $A1)
    `)