
from torchtext import datasets

train_iter = iter(datasets.AG_NEWS(root='I:\data', split='train'))

print(next(train_iter))
