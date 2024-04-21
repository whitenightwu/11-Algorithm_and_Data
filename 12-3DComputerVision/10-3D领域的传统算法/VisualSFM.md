# VisualSFM
一款SFM三维重建软件，用于将多张RGB图片重建为一个3D点云模型。
SfM是structure from motion，从multi view的rgb图像恢复三维世界坐标系下的点和camera参数，有的已知相机内参，有的不知道内参完全self calibration。All in all，是一种方法。


## 重建的主要步骤
1. 找出各张图片中的特征点，进行两两匹配；
要求能够精确识别物体的局部特征，并且进行快速准确的匹配。现常用的算法是由Dacid Lowe提出的SIFT方法。

2. 根据匹配结果，利用射影定理计算得到相机位置等场景信息；
此步又称运动恢复结构（Structure from Motion），或稀疏重建（Sparse Reconstruction）。结果的衡量标准注意是准确性，现常用是基于Lecenberg-Marquardt算法的Bundler。

3. 运用场景信息与原始照片，得到照片中物体的3D点云；
此步又称密集重建（Dense Reconstruction）。运用多视立体重建（Multi-view Stereo Reconstruction），得到3D点云。点云质量受到处理图像精度的执行效率、重建精度和完整性影响，目前最好的算法是PMVS。

4. 根据3D点云构建3D模型；
将点连成面，才可在一般三维建模软件中使用。现常用的是泊松表面重建算法（Possion Surface Reconstruction）。


# 参考资料
https://blog.csdn.net/u012989207/article/details/45032469
