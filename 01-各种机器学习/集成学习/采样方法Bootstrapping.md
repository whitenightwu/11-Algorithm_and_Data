# Bootstrapping
Bootstrapping，即boostrap sample，Bootstrapping sample。又有OOB(out of boostrap)。中译为拔靴法或自助法或自助抽样法。
它是一种统计学方法（而不单单只是局限于机器学习算法）。从给定训练集中有放回的均匀抽样，由多次重复的抽样，重新建立起足以代表母体样本分布的新样本。也就是说，每当选中一个样本，它等可能地被再次选中并被再次添加到训练集中。
bootstrapping的运用基于很多统计学假设，因此采样的准确性会影响假设的成立与否。


在机器学习中，Bootstrap方法指的是借助替换的随机采样，它是一个重采样，允许模型或算法更好地理解存在于其中的偏差、方差和特征。数据的采样允许重采样包含不同的偏向，然后将其作为一个整体进行包含。
不同的采样算法会得到不同的子样本集，而每个样本集有着各不相同的部分，这会影响到数据集的整体均值、标准差和其他描述性指标。反过来，它可以发展出更多鲁棒的模型。


## Bagging、boosting与Bootstrap的联系
Bagging和Boosting都使用Bootstrapping。

Bagging和Bootstrapping的不同是：Bagging是Bootstrap Aggregating（自举汇聚法），它不仅仅包括了Bootstrapping，还包括Aggregating的集成思想。

boosting和Bootstrapping的不同是：boosting不仅仅包括了Bootstrapping，还包括“迭代提升”的集成思想。

Bagging和Boosting的不同：见bagging或者boosting的资料。

# 参考资料
https://www.jianshu.com/p/a5b28cdfd438