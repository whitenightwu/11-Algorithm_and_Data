# visual prompt

根据prompt直接预测。

## 流程
设想中的流程第一次，输入第一张图片，然后选定一类object。之后再输入图片，根据当前识别的+第一次选定的object，自动找到类似的obj。凌霄想让何文浩他们去做，不归我们做。
1. 标记物体，标记背景。
2. 直接预测
3. 如果不满意，标注更多的物体


Traditional workflow: Collect and label -> Train -> Predict
Prompt-based workflow: Prompt -> Predict

## 现有的模型
SAM模型


scenic/scenic/projects/owl_vit at main · google-research/scenic (github.com) 我今天看到这篇文章，跟DINO定位是一样的，但是文章里多了一个基于Visual Prompt的检测，不知道你这边有试过没，这是给的示例动图scenic/scenic/projects/owl_vit/data/image_cond_wiki_circuits_1.gif at main · google-research/scenic (github.com)




Instruct2Act。在感知部分，预定义的API用于访问多个基础模型，其中Segment Anything Model（SAM）准确地定位候选对象，而CLIP对它们进行分类。

