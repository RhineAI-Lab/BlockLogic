from torchvision import transforms
import torch
import numpy as np

a = torch.randn([3,4])
print(a)
print(a.view([3,-1]))

