# segment anything（SAM）
ICCV 2023。
分割一切的图像分割模型。它是来自 Meta AI 研究院的图像分割模型，只需一键就可以“切出”图像中的任何对象。它在 1100 万张图像和 11 亿个掩码(mask) 的数据集上完成了训练，能够在各种分割任务上具有很强的零样本(zero-shot) 性能。
编码器-解码器结构，其中编码器部分由多个卷积层和池化层组成，用于提取图像特征；解码器部分则由多个反卷积层和上采样层组成，用于将特征图恢复到原始图像大小，并生成分割结果。
SAM使用了一种基于交叉熵的多任务损失函数，其中包括了像素级别的分类损失和边界框级别的回归损失。分类损失用于衡量每个像素属于哪个类别（如前景或背景），回归损失则用于调整每个像素的边界框位置，以更好地匹配目标。主要使用的是focal loss和dice loss。
对于一个prompt，模型会输出3个mask，实际上也可以输出更多的分割结果，3个可以看作一个物体的整体、部分、子部分，基本能满足大多数情况。使用IOU的方式，排序mask。在反向传播时，参与计算的只有loss最小的mask相关的参数
SAM利用Transformer的Cross attention机制。


SAM很快就能掌握自动标注能力，在SA-1B中，仅仅进行了0.012%（120,000张）的专家标注，就已经具备优秀的全自动分割水平（99.1%的标注由SAM自动生成），其他模型需要10%甚至更多的标注量才能达到类似的水平，印证了SAM充分挖掘了数量有限的监督数据集，大大降低了监督算法对数据量的依赖，从而大大降低了监督算法过拟合的可能。
SAM在监督学习的框架内实现了极其优异的Zero-shot性能，这带给我们一个思考——到底是数据集还是多模态带来了这种能力？互联网数据源或许能给出答案。当你提示“猫”，在图像数据集无穷大的时候，理论上“猫”的文本语义对应到了无数张不同的猫的图像，这样只要你给定文本语义，模型总是能准确地提取对应掩模。所以我们首先可以确定，数据量足够庞大足够多元才能充分激发这种Zero-shot性能。那就是数据集才是根本吗？并不是。前面我们提到，无论是站在3个空间模态的角度来看，还是站在图像模态的角度来看，它们的学习视角十分自由，都近乎是无穷的。也就是说，当你图像模态有效增长了1个数据，SAM的3种空间模态就能从分割面中自由提取几乎无数种可以配对的点、框、掩码（标签文本例外）。所以可以这么建模：自由度高的模态选择x数据集多元=优秀的Zero-Shot性能。两个因素理论上是平等的，但实际上，你无法获取无穷的数据，所以自由度高的模态设计更加重要，性价比也更高，这也启发了我们一种降低人工标注成本的预训练模型获取方式。
SAM也可以进行边缘检测。即先出mask，然后NMS，最后用sober直接进行边缘提取。


## SAM的缺点
SAM不适合高精度要求的分割任务
SAM的图像编码器太大，拖慢了整体效率。但可以提前完成图像编码，再根据用户需要制作 Prompt 并推理
文本模态仍不能很好地对应到图像语义，作者还没想明白怎么基于提示实现语义和全景分割任务
在少数几个任务，比如绘画数据集、X光数据集、模糊场景数据集、细节信息密集的数据集上泛化性能不足


## 数据集SA-1B
超过10亿张mask，1.1千万张图片。比当下最大的分割数据集OpenImage V5大6倍，分割量大400倍。
来自俄罗斯的图片是最多的。
SA-1B的标注十分精确，大量噪声被有意修复。
SA-1B涵盖了各种类型、风格、场景和视角的图像。这有利于模型学习更通用和鲁棒的特征表示，从而提高分割算法举一反三的水平。上面已经分析了SAM具有Zero-Shot性能的几个核心原因，而下面分析的是一些次要的因素。SA-1B的虽然没有类别标注的概念，但实际上覆盖的分割对象种类特别全面，包含了大量的常见和罕见类别，它们覆盖了自然界和人造界的各个领域。


## encoder模型
encoder是个大模型，输出的embedding是整张图片的，是可以保存下来重复使用。
输入是原图，3*1024*1024
输出是image embedding，256*64*64

## decoder模型
decoder是个小模型，是处理prompt和整张图的embedding。
输入是encoder模型输出的image embedding，256*64*64
输出是mask（3*256*256）和score（n）

## prompt的encoder模型
实际上，prompt会经过prompt encoder。并且prompt只在encode网络中，不在decode网络中（flexiv将prompt的encoder模型放到了decode网络中）。
prompt总共有point，box，mask，text四种，会将其分为三类。point和box可以作为一类使用position encodings, text可以使用CLIP作为encoder, 而mask是一种密集型的prompt，可以使用卷积作为encoder。
当为point prompt或box prompt时，实际输入网络的是2*（坐标值）+1（label）。例如，point prompt为两个点，实际输入网络的是（2*2+1），即5个数值。

label有三种
points prompt：它的label是[1]
negative_points prompt：它的label是[0]
bbox prompt：它的label是[2, 3]


-----------------------------------------------------------------------------------------------

## 官方demo的prompt
总共有point,box, mask, text四种。由于text prompt效果不太稳定，demo和代码中都没有该部分。 另外还有一种，everything方式，其本质就是grid的point prompt。
everything: 将图片中所有物体的分割都展示出来。本质是使用grid point，由参数POINTS_PER_SIDE控制生成的point数量。
points prompt：输出的是同一个instance的mask。也就是说即使prompt输入3个点，仍然是输出1个instance。
bbox prompt：分割box中的物体。必须是2个点。
mask prompt：一定是1*256*256的二进制掩码。不能单独使用mask prompt，需要和point prompt或者bbox prompt才能正常输出。通常mask prompt是来自之前的预测，用于迭代使用SAM。实际使用中，mask prompt几乎无法改进最终的结果。



## backbone模型选择
有vit_H、vit_L、vit_B、vit_tiny，性能依次降低。vit_tiny是对vit_B进行蒸馏得到的。
vit_B比vit_H的边缘差很多，会出现锯齿边缘。
vit_H太大了暂时没有放，本机跑不动的那种大


## 参数设置
- mask_confidence：对pixel进行binary的confidence。
- confidence：后面的是物体的confidence。
- multimask_output：是否输出所有的mask，如果为false则值输出得分最高的mask
- 模型输入必须有point prompt。如果不使用prompt，本质是使用grid point。如果只输入negative point，这是跑不了的。


## 实际使用
- fastSAM的效果不如moblieSAM
- 对比“prompt为bbox”和“prompt为point”
	用bbox做prompt的确好很多，不过需要细致的调整bbox。就这张图片而言，我去找图中的这个钳子，发现bbox稍微有一些偏移，seg的结果变化还是挺大的。当然，很可能是由于遮挡情况太有挑战性了。
	对于纯色物体，“prompt为point”可以直接找到物体的instance，但“prompt为bbox”则可能有误检。
- 最好的是prompt是point+negative point联合使用。
- 对比“先crop，然后将patch输入SAM”和“将全图和bbox prompt输入SAM”。两者没有太多的差异，但对于小物体，“将全图和bbox prompt输入SAM”明显更好。推荐“将全图和bbox prompt输入SAM”，这更省时间的（整个图只encoding一次）。
- SAM对于 “由多个色块组成”的物体，分割并不理想。fastpose中也有这种情况。

## 用SAM进行自动标注
使用大模型进行自动标注，例如SAM模型；dino模型。
推荐使用方法2
1. 方法1：先使用SAM的everything模式，然后删除多余的label。
2. 方法2：在物体的instance上联合使用prompt point（可以使用多个prompt point）和prompt negative point。




