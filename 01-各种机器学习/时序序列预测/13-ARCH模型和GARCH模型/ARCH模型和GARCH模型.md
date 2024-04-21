# ARCH模型和GARCH模型
ARMA、ARIMA及季节模型等等，这些模型一般都假设干扰项的方差为常数，然而很多情况下时间序列的波动有集聚性等特征，使得方差并不为常数。而ARCH、GARCH模型可以刻画出随时间变化的条件异方差。

## 1）ARCH模型
全称为Autoregressive Conditionally Heteroskedastic Models，自回归条件异方差模型。
模型只有一个参数，可以表示为ARCH(p)。一方面，可以认为是作用在时间序列的方差上的AR(p)模型；另一个方面，可以理解为时间序列当前的方差依赖于过去一段时间的方差，且方差是乘性的。

## 2）GARCH模型
全称为Generalized Autoregressive Conditionally Heteroskedastic Models，广义自回归条件异方差模型。
模型有两个参数，可以表示为GARCH(p,q)，p作用于AR，q作用于MA。ARMA模型作用到时间序列的variance上就是GARCH(p,q), The AR(p) models the variance of the residuals (squared errors) or simply our time series squared. The MA(q) portion models the variance of the process.




