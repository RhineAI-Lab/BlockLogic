from torchvision import transforms
import torch
import numpy as np

a = np.array([[3,4,5],[6,7,8]])
l = transforms.ToTensor()(a)
print(l)

