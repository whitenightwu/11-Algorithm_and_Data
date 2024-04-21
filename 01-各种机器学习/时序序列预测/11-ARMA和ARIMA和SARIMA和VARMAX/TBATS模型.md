# TBATS模型
Trigonometric seasonality, Box-Cox transformation, ARMA errors, Trend and Seasonal components.
模型使用季节性特征、Box-Cox转换、ARMA误差、趋势和季节组分。也就是说预测的y由4部分组成，l是局部水平，b是趋势水平，d是ARMA模型，s是季节性部分。



## ARMA类模型与TBATS模型
TBATS模型在时间序列中是一个比较高能的模型，说他‘高能’是因为他在ARIMA的基础上更进一步，能够同时识别不同的seasonal pattern。而且是个自动化模型，几行code就能得到一个准确性比较高的预测结果。
ARIMA能引入外生变量，即ARIMAX，但是TBATS只能用于一个变量。