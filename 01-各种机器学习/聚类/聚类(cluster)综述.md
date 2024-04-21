# 聚类（clustering）
属于无监督学习（无监督学习的应用之一就是能够解决大规模数据下标记成本高昂的问题）。
聚类本身就形容了问题和方法。聚类方法通常是由建模方式分类的，比如基于中心的聚类和层次聚类。所有的聚类方法都是利用数据的内在结构来组织数据，使得每组内的点有最大的共同性。

## 一图胜千言
<img alt="这里写图片描述" src="https://img-blog.csdn.net/20180714211302169?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3d5ZGJ5eHI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" title=""/>
   

## 主要的聚类方法
1）基于层次聚类算法：常见的有由下而上的两步聚类，确定相似函数及相似度的ROCK聚类等

2）基于密度聚类算法：常见的有基于最低信任值及最低n/N阀值的Dbscan

3）基于神经网络的聚类：常见的有把输入变量离散到目标维度上的SOM

4）基于统计学的聚类：常见的有类似于变量迭代的方式，产出如同决策树形式的COBWeb

5）先指定类个数的聚类算法，如k-means

更具体的：
```
BIRCH
DBSCAN
期望最大化（EM） Expectation-maximization(EM)
模糊聚类 Fuzzy clustering
K-means算法 K-means algorithm
k-均值聚类 K-means clustering
k-位数 K-medians
平均移 Mean-shift
OPTICS算法 OPTICS algorithm
```


### 常见的类模型有以下几种
1）连接模型。例如，基于距离连接的层次聚类法(hierarchical clustering)；

2）中心模型。例如，k-means法使用一个类均值代表一个类；

3）分布模型。例如，用概率分布代表一个类，典型的方法有基于EM算法的多元正态分布（即GMM的EM解法）。

### 按照不同类之间的关系，聚类分为两种类型
1）Hard clustering : 每一个对象确定地属于某一个类

2）Soft clustering : 每一个对象在某种程度上属于某个类，这里的“某种程度”，通常用概率表示。代表性的有高斯混合模型的EM解法。

### 不需要指定类个数的聚类算法
一般都是将k转化为别的参数。毕竟这是一个如何防止过拟合的情况下得出最优解的问题。
如果资源足够丰富，可以考虑对不同的k赋予先验的概率之后使用贝叶斯。

在聚类问题上，通常用Dirichlet process（狄利克雷）作为mixture proportions的先验。DP的扩展包括Hierarchical Dirichlet process 和 Pitman-Yor process。
1）前者是对joint groups的数据建模，假设这些groups共享一个base distribution，也就是参数的先验。
2）PYP在Chinese restaurant process的基础上加了一个参数用于控制类别数目的生成速度，使得PYP能够更好的刻画Power-law这一现象。
这两种扩展很大程度推动了DP的应用，比如基于HDP-HMM以及Infinite PCFG，还有Hierarchical-PYP等。

   
# 参考资料
https://blog.csdn.net/wong2016/article/details/70188187
还参考了很多资料，但已经无法追根溯源了。