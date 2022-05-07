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

`);