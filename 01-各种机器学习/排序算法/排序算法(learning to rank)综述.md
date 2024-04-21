#排序算法（Learning to Rank）
##主要应用

> document retrieval(文献检索) 
> expert search(专家搜索) 
> definition search(定义搜索)
> collaborative filtering(协同过滤) 
> question answering(问答) 
> keyphrase extraction(关键词提取) 
> document summarization(文件摘要) 
> machine translation(机器翻译)

##例子
　　给定一个query，得到一批文档。

有三种函数可以量化这个指标：
　　1.DCG（Discount Cumulative Gain）
　　2.NDCG（Normalized Discount Cumulaive Gain）
　　3.MAP (Mean Average Precision)"	
在具体的算法中，上述的指标是无法直接优化的，只能采用各种各样的妥协，而这三种都是1-NDCG的upper bound函数。这三种则代表了不同类型的妥协：
　　第一种是pointwise的，因为在单个样本上计算损失。
　　第二种是pairwise的，在成对的样本上计算损失，即Hinge Loss。
　　第三种是listwise的，因为直接在list上计算损失。
		
![这里写图片描述](https://img-blog.csdn.net/20180712233208362?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3d5ZGJ5eHI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

##参考资料
https://blog.csdn.net/stdcoutzyx/article/details/50879219
