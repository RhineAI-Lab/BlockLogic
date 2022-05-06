import {defineBlocksWithText} from "../../register";

defineBlocksWithText(`

prefix: transforms
style: transforms_blocks

tensor: RandomCrop
随机裁剪{TENSOR} 尺寸为{num}
inline: 1
tip: 指定尺寸对图片进行随机裁剪
Python
import: from torchvision import transforms
$0.RandomCrop(size=$1)
`);