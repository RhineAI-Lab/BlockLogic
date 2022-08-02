import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(`
prefix: cv2
style: opencv_blocks

cap_get: Numpy
获取摄像头图像
Python
import: import cv2
import: cap = cv2.VideoCapture(0)
cap.read()

imread: Numpy
读取图像{str}[忽略透明度: cv.IMREAD_COLOR/忽略色彩: cv.IMREAD_GRAYSCALE/原图无损: cv.IMREAD_UNCHANGED]
inline: 1
tip: 读取图像
Python
import: import cv2
cv2.imread($A0, $A1)

imwrite
保存图像{Numpy}至{str}
inline: 1
tip: 将图像写入路径
Python
import: import cv2
cv2.imwrite($A1, $A0)

imshow
展示图像{Numpy}
inline: 1
tip: 显示图像
Python
import: import cv2
cv2.imshow('image', $A0)
    `);
