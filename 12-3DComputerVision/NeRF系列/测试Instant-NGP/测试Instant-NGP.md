# 测试Instant-NGP


(1).camera_angle_x, camera_angle_y: 水平、垂直视角；镜头的焦距决定了视角的大小；在colmap2nerf.py中，由焦距求视角的公式为:
camera_angle_x = math.atan(w / (fl_x * 2)) * 2
camera_angle_y = math.atan(h / (fl_y * 2)) * 2
(2).fl_x, fl_y: 焦距，若没有给出可通过水平或垂直视角计算出，在nerf_loader.cu中的公式为：
fl_x = 0.5f * (float)w / tanf(0.5f * camera_angle_x);
fl_y = 0.5f * (float)h / tanf(0.5f * camera_angle_y);
(3).k1,k2,k3,k4: 径向畸变参数；
(4).p1,p2: 切向畸变参数；
(5).is_fisheye: 是否是鱼眼相机模型；
(6).cx,cy: 主点坐标；
(7).w,h: 分辨率，图像宽、高；
(8).aabb_scale: 对于在单元立方体(unit cube)外部有可见背景的自然场景，有必要将参数aabb_scale设置为2的幂，最大为128;即代表世界场景的立方体与代表单位立方体之间的比值
(9).transform_matrix: 外参.


不要用去全黑的背景

对于遮挡，还可以将3D点云映射回2D图像，然后在2D图像上比较当前点云和模板点云的面积。

    "scale": 10,
    "offset": [0.5, 0.5, 0.5],
    
    "aabb": [[-0.1, -0.1, 0.5],[0.1,0.1, 0.6]],
                coordinate_frame = o3d.geometry.TriangleMesh.create_coordinate_frame(
                    size=0.01
                )
                coordinate_frame.transform(rough_registration_matrix)

