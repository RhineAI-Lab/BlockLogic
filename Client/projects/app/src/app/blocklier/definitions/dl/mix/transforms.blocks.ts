import { defineBlocksWithDt } from '../../register';

defineBlocksWithDt(`
prefix: transforms
style: transforms_blocks

RandomCrop: Transforms
随机裁剪 尺寸{num,Array} 边距{num,Array}
inline: 1
tip: 对图片进行随机裁剪
Python
import: from torchvision import transforms
transforms.RandomCrop(size=$A0,padding=$A1)

CenterCrop: Transforms
中心裁剪 尺寸{num,Array}
inline: 1
tip: 对图片进行随机裁剪
Python
import: from torchvision import transforms
transforms.CenterCrop(size=$A0,padding=$A1)

prefix: transforms
style: transforms_blocks

RandomResizedCrop: Transforms
随机缩放裁剪 尺寸{num,Array} 区间从{num}到{num}
inline: 1
tip: 对图片进行随机裁剪
Python
import: from torchvision import transforms
transforms.RandomResizedCrop(size=$A0,scale=($A1，$A2))

FiveCrop: Tensor
上下左右中心裁剪 尺寸{num,Array}
inline: 1
tip: 对图片进行上下左右以及中心裁剪，获得5张图片，返回一个4D-tensor
Python
import: from torchvision import transforms
transforms.FiveCrop(size=$A0)

TenCrop: Tensor
上下左右中心裁剪 尺寸{num,Array} 再[水平:False/垂直:True]翻转
inline: 1
tip: 对图片进行上下左右以及中心裁剪，然后水平/垂直翻转，获得10张图片，返回一个4D-tensor
Python
import: from torchvision import transforms
transforms.TenCrop(size=$A0,vertical_flip=$A1)

RandomHorizontalFlip: Transforms
随机水平翻转 概率为{num}
inline: 1
tip: 指定概率，对图片进行随机水平翻转
Python
import: from torchvision import transforms
transforms.RandomHorizontalFlip(p=$A0)

RandomVerticalFlip: Transforms
随机垂直翻转 概率为{num}
inline: 1
tip: 指定概率，对图片进行随机垂直翻转
Python
import: from torchvision import transforms
transforms.RandomVerticalFlip(p=$A0)

RandomRotation: Transforms
随机旋转 区间从{num}到{num}
inline: 1
tip: 对图片进行随机旋转
Python
import: from torchvision import transforms
transforms.RandomRotation(degrees=($A0,$A1))

Resize: Transforms
修改分辨率 高为{num} 宽为{num}
inline: 1
tip: 修改图像的分辨率
Python
import: from torchvision import transforms
transforms.Resize(size=[$A0,$A1])

Normalize: Tensor
归一化 均值{Array} 方差{Array}
inline: 1
tip: 进行归一化
Python
import: from torchvision import transforms
transforms.Normalize(mean=$A0,std=$A1)

ColorJitter: Tensor
修改[亮度:brightness/对比度:contrast/饱和度:saturation/色相:hue] 区间从{num}到{num}
inline: 1
tip: 进行修改亮度/对比度/饱和度/色相
Python
import: from torchvision import transforms
transforms.ColorJitte($A0=($A1,$A2))




`,
  false,
);
