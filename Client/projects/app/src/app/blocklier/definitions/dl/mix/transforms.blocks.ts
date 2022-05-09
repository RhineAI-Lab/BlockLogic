import {defineBlocksWithDt} from "../../register";

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

FiveCrop: Transforms
上下左右中心裁剪 尺寸{num,Array}
inline: 1
tip: 对图片进行上下左右以及中心裁剪，获得5张图片，返回一个4D-tensor
Python
import: from torchvision import transforms
transforms.FiveCrop(size=$A0)

TenCrop: Transforms
上下左右中心裁剪 尺寸{num,Array} 再[水平:False/垂直:True]翻转
inline: 1
tip: 对图片进行上下左右以及中心裁剪，然后水平/垂直翻转，获得10张图片，返回一个4D-tensor
Python
import: from torchvision import transforms
transforms.TenCrop(size=$A0,vertical_flip=$A1)
`);

defineBlocksWithDt(`

`,true);