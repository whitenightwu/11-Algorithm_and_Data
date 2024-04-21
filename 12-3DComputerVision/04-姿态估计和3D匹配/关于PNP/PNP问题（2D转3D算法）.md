# PNP问题（2D转3D算法）

2D转3D姿态的算法，除了pnp还有什么



在之前的展会上看到过一个有意思的，是车底的两个部件的拼装（都比较大），一个部件是固定的，另一个通过2D视觉识别抓取。
用的是2D相机，但给的是3Dpose，他们说用PNP效果差，后来换了一种2D转3D的算法就还不错了，说是已经落地。
我觉得这种2D转3D的算法可以调研一下。


-----------------------------------------------------------------------------------------------
# 常用算法
## PnP类算法
opencv提供了很好用的接口，solvePnP()与solvePnPRansac()。前者无法剔除离群点，而后者可以，所以相对于前者，后者的鲁棒性更好，用起来更加好用（我目前是这么觉得的）。
cv::solveP3P (InputArray objectPoints, InputArray imagePoints, InputArray cameraMatrix, InputArray distCoeffs, OutputArrayOfArrays rvecs, OutputArrayOfArrays tvecs, int flags)
 	Finds an object pose from 3 3D-2D point correspondences. More...
 
bool 	cv::solvePnP (InputArray objectPoints, InputArray imagePoints, InputArray cameraMatrix, InputArray distCoeffs, OutputArray rvec, OutputArray tvec, bool useExtrinsicGuess=false, int flags=SOLVEPNP_ITERATIVE)
 	Finds an object pose from 3D-2D point correspondences. More...
 
int 	cv::solvePnPGeneric (InputArray objectPoints, InputArray imagePoints, InputArray cameraMatrix, InputArray distCoeffs, OutputArrayOfArrays rvecs, OutputArrayOfArrays tvecs, bool useExtrinsicGuess=false, SolvePnPMethod flags=SOLVEPNP_ITERATIVE, InputArray rvec=noArray(), InputArray tvec=noArray(), OutputArray reprojectionError=noArray())
 	Finds an object pose from 3D-2D point correspondences. More...
 
bool 	cv::solvePnPRansac (InputArray objectPoints, InputArray imagePoints, InputArray cameraMatrix, InputArray distCoeffs, OutputArray rvec, OutputArray tvec, bool useExtrinsicGuess=false, int iterationsCount=100, float reprojectionError=8.0, double confidence=0.99, OutputArray inliers=noArray(), int flags=SOLVEPNP_ITERATIVE)
 	Finds an object pose from 3D-2D point correspondences using the RANSAC scheme. More...
 
bool 	cv::solvePnPRansac (InputArray objectPoints, InputArray imagePoints, InputOutputArray cameraMatrix, InputArray distCoeffs, OutputArray rvec, OutputArray tvec, OutputArray inliers, const UsacParams &params=UsacParams())
 
void 	cv::solvePnPRefineLM (InputArray objectPoints, InputArray imagePoints, InputArray cameraMatrix, InputArray distCoeffs, InputOutputArray rvec, InputOutputArray tvec, TermCriteria criteria=TermCriteria(TermCriteria::EPS+TermCriteria::COUNT, 20, FLT_EPSILON))
 	Refine a pose (the translation and the rotation that transform a 3D point expressed in the object coordinate frame to the camera coordinate frame) from a 3D-2D point correspondences and starting from an initial solution. More...
 
void 	cv::solvePnPRefineVVS
EPNP等等。


## Bundle Adjustment
算法的流程如下
1. 初始化相机位姿：选择一个初始相机位姿，通常是随机初始化或者预先设定一个值。
2. 定义优化目标函数：通过重投影误差来定义优化目标函数。重投影误差是指将三维点云通过相机的内参和外参进行投影，然后与实际的二维图像进行比较，从而得到的误差。
3. 选择优化算法：选择一种梯度下降的优化算法，如 Gauss-Newton 算法或 L-BFGS 算法，来迭代更新相机位姿。
4. 迭代更新相机位姿：使用选定的优化算法，根据当前相机位姿计算重投影误差，并更新相机位姿，直到达到预设的停止条件。
5. 输出结果：输出最优相机位姿以及相应的重投影误差。


-----------------------------------------------------------------------------------------------
# 
P3P算法
DLT算法
Bundle Adjustment算法


除了 PnP（Perspective-n-Point）算法外，还有以下几种算法可以将 2D 上的点转换到 3D 中或在 pose 中：

1. DLT（(Direct Linear Transformation)法：DLT 算法是一种用于将 2D 图像转换到 3D 的方法，它通过六个基本矩阵和一个本质矩阵来实现点云的转换。

2. Fitting 算法：Fitting 算法是一种基于最小二乘法的方法，它通过优化 2D 点云和 3D 点云之间的距离来计算 3D 点云。该算法可以应用于人脸几何重建、三维扫描等领域。

3. Triangulation 算法：Triangulation 算法是一种基于三角形测量的方法，它通过已知的 2D 点和相机的内参、外参来计算 3D 点。该算法广泛应用于计算机视觉、机器人等领域。

需要注意的是，这些算法都有其适用范围和限制，具体应用中需要根据实际情况选择合适的算法。



ORB-SLAM:ORB-SLAM 是一种基于特征点匹配和图优化的视觉 SLAM 算法，可以用于姿态估计。它利用 ORB 特征点提取算法来提取图像中的特征点，并通过匹配特征点来确定相机的位置和姿态。


除了 PnP 算法，还有以下算法可以用于计算物体的 pose(姿态):

1. ICP(Iterative Closest Point) 算法
2. RANSAC(Random Sample Consensus) 算法
3. Levenberg-Marquardt 算法
4. Gauss-Newton 算法
5. Particle Filtering 算法
6. Extended Kalman Filter(EKF) 算法
7. Non-linear Optimization 算法


