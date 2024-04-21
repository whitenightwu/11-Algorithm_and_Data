# anygrasp和graspnet
跟相机没什么关系，只是影响抓取效果。你可以参考lib_py/grasping/graspnet下的robot_grasp.py中的predict函数，里面有它的输入参数。

## 相关研究
- GPD
是2020年工博会上的实际使用的，版本是caffe-mxnet-pytorch
- DEXnet
- anygrasp
生成14400个pose，300*12*4。
学的是结构，而不是物体本身，所以没见过的物体也可以抓


## 经验之谈
- 只剩下几个物料时，很多时候都无法检测出来。
- 点云质量决定了抓取的效果，可以通过滤波改善点云质量，但有时候滤波反而会降低点云质量。
- 预测的pose不准确，无法抓取
- 预测的pose在边缘位置，无法抓取
- 虽然预测的pose准确，但夹爪在夹取时会碰到物料，导致无法抓取。



- Parallel-Jaw Gripper Strengths: 
	- Universality except transparent objects because of camera limit;
	- Chose the best position to grasp;
	- Chose the best orientation to grasp;
	- Adjust gripper width to avoid collision.

- Parallel-Jaw Gripper Weaknesses:
	- No force control: can not apply different forces for different material textures;
	- Relatively high failure probability for smooth objects;
	- Unable to grasp objects with size greater than gripper fully open width.

- Suction-Cup Gripper Weaknesses:
	- Might choose the suction points that on/near the interface.
