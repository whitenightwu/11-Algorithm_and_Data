# ICP(Iterative Closest Point)算法
基于EM(Expectation-maximization algorithm)思想的方法，采用交替迭代法优化得到最优值。 即ICP分为两步迭代优化，优化点云匹配及优化运动估计。点云匹配是将两帧点云数据在同一个坐标系下，一帧数据中的点找到另一帧数据最近的点，就作为一对匹配点。

精配准（ICP、NICP等等）​

## 算法流程
1. 筛选：点集或曲面的筛选（滤波） 
有全选，随意筛选，均匀分布，特征筛选等多种方法。kinectFusion中使用的是最朴素的全选（由于使用了GPU，并行化增加的前提下简单的算法有无可比拟的优势）。

2. 匹配：两个点集之间的点进行配对 
注意这并不是要保证匹配的点对是真实的匹配，因为本身ICP是迭代计算出匹配点并将其拟合的收敛过程。我们需要做的是每次选取合适的初始值。
KinectFusion采用的是投影关联(projective data association)。简单来说就是用上一个世界坐标系中的点，先转化成上个相机坐标系点vi−1（3D），再转化成上一个图像坐标系点P（2D），然后找到本次图片中同样的2D坐标点，用当前的Ti值和Ri值去计算出点v及其法向量n，最后判断v和n与其对应点的相容性（其实是第4步去除的操作）。这样就完成了一次找匹配点的计算。


3. 加权：给每个匹配的点对分配权重
4. 去除：去除不符合条件的点对
5. 计算loss：基于以上点对，给出每个点对的误差计算方法
6. 最小化：最小化误差度量，求解当前最优变换

7. 重复1～6步，直到满足迭代终止条件，常用的终止条件有：
loss的变化量小于一定值
loss小于一定值
达到最大迭代次数

fitness计算重叠区域（内点数目/目标点数目）。越高越好。
inlier_rmse计算所有内点的均方根误差RMSE。越低越好。


## 优缺点
优点：
简单，不必对点云进行分割和特征提取
初值较好情况下，精度和收敛性都不错

缺点：
找最近对应点的计算开销较大
只考虑了点与点距离，缺少对点云结构信息的利用


## 实际使用中的一些注意事项
ICP 比较依赖于变换初值，平移比较简单，直接用点云质心来估计；旋转初值的话可以手动调一个粗略值，或者沿每个轴的旋转进行采样、组合来尝试（不适合实时性应用）；
点太多的话可以先降采样；
找到一些 anchor 点对（比如先用特征点匹配），可以帮助加速收敛；
对应用场景引入一些合理假设，比如限制旋转、平移的范围，变换自由度数量等。


## open3d中的ICP

relative_fitness和relative_rmse不是最终输出的值，而是差值。例如relative_fitness为1e-6，指的是本次与上一次的fitness的差值小于1e-6时则停止。
def icp_point_to_point(source, target, init, dist_thresh, max_iteration=30, relative_fitness=0.99):
    """Point-to-Point ICP."""
    result_icp = o3d.pipelines.registration.registration_icp(
        source,
        target,
        dist_thresh,
        init,
        o3d.pipelines.registration.TransformationEstimationPointToPoint(False),
        o3d.pipelines.registration.ICPConvergenceCriteria(max_iteration=max_iteration, relative_fitness=0.6),
    )
    return result_icp.transformation, result_icp.fitness, result_icp.inlier_rmse


def icp_point_to_plane(source, target, init, dist_thresh):
    """Point-to-Plane ICP."""
    result_icp = o3d.pipelines.registration.registration_icp(
        source,
        target,
        dist_thresh,
        init,
        o3d.pipelines.registration.TransformationEstimationPointToPlane(),
    )
    return result_icp.transformation, result_icp.fitness, result_icp.inlier_rmse



------------------------------
# ICP算法的加速



------------------------------
# ICP算法与各种改进
## 经典ICP
对初始变换敏感，容易陷入局部最优解。后来有相当多的ICP改进算法，简要列举一些：
经典ICP中，求和的每一项是pcS中的每一个点到pcT中的每一个点的距离，也就是point-to-point。

## Point-to-Plane ICP
原始ICP算法的代价函数中使用的point-to-point距离，而point-to-plane则是考虑源顶点到目标顶点所在面的距离，比起直接计算点到点距离，考虑了点云的局部结构，精度更高，不容易陷入局部最优；但要注意point-to-plane的优化是一个非线性问题，速度比较慢，一般使用其线性化近似。


Point-to-Plane肯定是比Point-to-Point慢很多的。
使用点到平面（point-plane）误差度量的迭代最近点 (ICP) 算法已被证明比使用点到点（point-point）误差度量的算法收敛得更快。在 ICP 算法的每次迭代中，产生最小点到平面误差的相对位姿变化通常使用标准的非线性最小二乘法来解决。



## Plane-to-Plane ICP
point-to-plane ICP只考虑目标点云局部结构， plane-to-plane 顾名思义就是也考虑源点云的局部结构，计算面到面的距离；
point-to-plane则是pcS中的每一个点到pcT中平面的距离。

## Generalized ICP(GICP)
综合考虑 point-to-point、point-to-plane 和 plane-to-plane 策略，精度、鲁棒性都有所提高；

## Normal Iterative Closest Point (NICP)
考虑法向量和局部曲率，更进一步利用了点云的局部结构信息，其论文中实验结果比GICP的性能更好。
https://github.com/yorsh87/nicp

## BundleProjectiveICP

