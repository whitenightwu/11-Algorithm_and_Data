define("biz_wap/jsapi/core.js",[],function(e,i,n,o){
"use strict";
var t=window.__moon_report||function(){},r=8,d={},a=!1;
try{
d=top.window.document;
}catch(w){
a=!0;
}
var c={
ready:function(e){
var i=function(){
try{
e&&(window.onBridgeReadyTime=window.onBridgeReadyTime||+new Date,e());
}catch(i){
throw t([{
offset:r,
log:"ready",
e:i
}]),i;
}
};
a||"undefined"!=typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.invoke?i():d.addEventListener?d.addEventListener("WeixinJSBridgeReady",i,!1):d.attachEvent&&(d.attachEvent("WeixinJSBridgeReady",i),
d.attachEvent("onWeixinJSBridgeReady",i));
},
invoke:function(e,i,n){
this.ready(function(){
return a?!1:"object"!=typeof top.window.WeixinJSBridge?(o("请在微信中打开此链接！"),!1):void top.window.WeixinJSBridge.invoke(e,i,function(i){
try{
if(n){
n.apply(window,arguments);
var o=i&&i.err_msg?", err_msg-> "+i.err_msg:"";
console.info("[jsapi] invoke->"+e+o);
}
}catch(d){
throw t([{
offset:r,
log:"invoke;methodName:"+e,
e:d
}]),d;
}
});
});
},
call:function(e){
this.ready(function(){
if(a)return!1;
if("object"!=typeof top.window.WeixinJSBridge)return!1;
try{
top.window.WeixinJSBridge.call(e);
}catch(i){
throw t([{
offset:r,
log:"call;methodName:"+e,
e:i
}]),i;
}
});
},
on:function(e,i){
this.ready(function(){
return a?!1:"object"==typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.on?void top.window.WeixinJSBridge.on(e,function(){
try{
i&&i.apply(window,arguments);
}catch(n){
throw t([{
offset:r,
log:"on;eventName:"+e,
e:n
}]),n;
}
}):!1;
});
}
};
return c;
});define("biz_common/dom/event.js",[],function(){
"use strict";
function e(){
return s&&(new Date).getTime()-s<200?!0:!1;
}
function t(t,n,i,o){
u.isPc||u.isWp?a(t,"click",o,n,i):a(t,"touchend",o,function(t){
if(-1==u.tsTime||+new Date-u.tsTime>200||e())return u.tsTime=-1,!1;
var i=t.changedTouches[0];
return Math.abs(u.y-i.clientY)<=5&&Math.abs(u.x-i.clientX)<=5?n.call(this,t):void 0;
},i);
}
function n(e,t,n,i){
var o=this,c=0;
if(u.isPc||u.isWp){
var r,s,d,l=!1;
a(e,"mousedown",i,function(e){
d=!1,l=!0,r=e.clientX,s=e.clientY,c=setTimeout(function(){
d=!0,c=0,t.call(o,e);
},500),e.preventDefault();
}),a(e,"mousemove",i,function(e){
l&&(Math.abs(s-e.clientY)>5||Math.abs(r-e.clientX)>5)&&(clearTimeout(c),c=0);
}),a(e,"mouseup",i,function(){
l=!1,clearTimeout(c);
}),a(e,"click",i,function(){
return d?!1:void 0;
});
}else a(e,"touchstart",i,function(e){
c=setTimeout(function(){
c=0,t.call(o,e);
},500),e.preventDefault();
}),a(e,"touchmove",i,function(e){
var t=e.changedTouches[0];
(Math.abs(u.y-t.clientY)>5||Math.abs(u.x-t.clientX)>5)&&(clearTimeout(c),c=0);
}),a(e,"touchend",i,function(){
clearTimeout(c);
});
}
function i(e,t){
if(!e||!t||e.nodeType!=e.ELEMENT_NODE)return!1;
var n=e.webkitMatchesSelector||e.msMatchesSelector||e.matchesSelector;
return n?n.call(e,t):(t=t.substr(1),e.className.indexOf(t)>-1);
}
function o(e,t,n){
for(;e&&!i(e,t);)e=e!==n&&e.nodeType!==e.DOCUMENT_NODE&&e.parentNode;
return e;
}
function a(e,i,a,c,r){
var s,d,l;
return"input"==i&&u.isPc,e?("function"==typeof a&&(r=c,c=a,a=""),"string"!=typeof a&&(a=""),
e==window&&"load"==i&&/complete|loaded/.test(document.readyState)?c({
type:"load"
}):"tap"==i?t(e,c,r,a):"longtap"===i?n(e,c,r,a):("unload"==i&&"onpagehide"in window&&(i="pagehide"),
s=function(e){
var t=c(e);
return t===!1&&(e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault()),
t;
},a&&"."==a.charAt(0)&&(l=function(t){
var n=t.target||t.srcElement,i=o(n,a,e);
return i?(t.delegatedTarget=i,s(t)):void 0;
}),d=l||s,c[i+"_handler"]=d,e.addEventListener?void e.addEventListener(i,d,!!r):e.attachEvent?void e.attachEvent("on"+i,d,!!r):void 0)):void 0;
}
function c(e,t,n,i){
if(e){
var o=n[t+"_handler"]||n;
return e.removeEventListener?void e.removeEventListener(t,o,!!i):e.detachEvent?void e.detachEvent("on"+t,o,!!i):void 0;
}
}
var r=navigator.userAgent,u={
isPc:/(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),
isWp:/Windows\sPhone/i.test(r),
tsTime:-1
};
u.isPc||a(document,"touchstart",function(e){
var t=e.changedTouches[0];
u.x=t.clientX,u.y=t.clientY,u.tsTime=+new Date;
});
var s;
return window.addEventListener("scroll",function(){
s=(new Date).getTime();
},!0),{
on:a,
off:c,
tap:t,
longtap:n
};
});define("appmsg/test.js",[],function(){
"use strict";
var t=[],e=function(){
"undefined"==typeof getComputedStyle&&document.body.currentStyle&&(window.getComputedStyle=function(t){
return t.currentStyle;
});
},n=function(){
for(var e="/mp/jsmonitor?idkey=",n=[],r=0,i=t.length;i>r;++r){
var o=t[r],d=o.idkey.toString()+"_"+o.order.toString()+"_"+o.num.toString();
n.push(d);
}
e+=n.join(";"),t.length>0&&((new Image).src=e);
},r=function(){
try{
e(),i(),n();
}catch(t){
console.log(t);
}
},i=function(){
var e=10,n=window.user_uin||0,r=0!==n&&Math.floor(n/100)%1e3<e;
if(r){
var i=document.getElementsByTagName("img"),o=i.length,d=document.getElementById("img-content"),u=d.offsetWidth,a=0,g=0,c=getComputedStyle(d);
a=parseInt(c.paddingLeft)+parseInt(c.paddingRight),u-=a,u||(u=window.innerWidth-30);
for(var f=0;o>f;++f){
var m=i[f].getAttribute("data-src");
if(m){
var s=1*i[f].getAttribute("data-w")||u,l=1*i[f].getAttribute("data-ratio");
l&&l>0&&s>u&&g++;
}
}
g>0&&t.push({
idkey:28307,
order:22,
num:g
});
}
};
return r;
});define("biz_wap/utils/mmversion.js",[],function(){
"use strict";
function n(){
var n=/MicroMessenger\/([\d\.]+)/i,r=s.match(n);
return r&&r[1]?r[1]:!1;
}
function r(r,t,i){
var e=n();
if(e){
e=e.split("."),r=r.split("."),/\d+/g.test(e[e.length-1])||e.pop();
for(var o,s,u=f["cp"+t],a=0,c=Math.max(e.length,r.length);c>a;++a){
o=e[a]||0,s=r[a]||0,o=parseInt(o)||0,s=parseInt(s)||0;
var p=f.cp0(o,s);
if(!p)return u(o,s);
}
return i||0==t?!0:!1;
}
}
function t(n){
return r(n,0);
}
function i(n,t){
return r(n,1,t);
}
function e(n,t){
return r(n,-1,t);
}
function o(){
return u?"ios":c?"android":"unknown";
}
var s=navigator.userAgent,u=/(iPhone|iPad|iPod|iOS)/i.test(s),a=/Windows\sPhone/i.test(s),c=/(Android)/i.test(s),p=c&&/miniprogram/.test(s.toLowerCase())||"miniprogram"==window.__wxjs_environment,f={
"cp-1":function(n,r){
return r>n;
},
cp0:function(n,r){
return n==r;
},
cp1:function(n,r){
return n>r;
}
};
return{
get:n,
cpVersion:r,
eqVersion:t,
gtVersion:i,
ltVersion:e,
getPlatform:o,
isWp:a,
isIOS:u,
isAndroid:c,
isInMiniProgram:p
};
});define("appmsg/max_age.js",["biz_wap/utils/ajax.js"],function(e){
"use strict";
function a(){
window.location.href.indexOf("clearStorage=1")>=0&&(localStorage.removeItem("max-age-storage-test"),
console.log("清除 localStorage"));
var e=1,a=window.user_uin||0,t=0!==a&&Math.floor(a/100)%1e3<e;
if(t&&(o({
type:"GET",
url:"/mp/reportcache?type=1&random="+Math.random()
}),(new Image).src="/mp/reportcache?type=2&uin="+uin,localStorage&&null==localStorage.getItem("max-age-storage-test"))){
console.log("localstorage为空");
try{
localStorage.setItem("max-age-storage-test",!0),console.log("localStorage设置成功");
}catch(r){}
o({
type:"GET",
url:"/mp/reportcache?type=3&random="+Math.random()
});
}
}
var o=e("biz_wap/utils/ajax.js");
return a;
});define("biz_common/dom/attr.js",[],function(){
"use strict";
function t(t,e,n){
return"undefined"==typeof n?t.getAttribute(e):t.setAttribute(e,n);
}
function e(t,e,n,r){
t.style.setProperty?(r=r||null,t.style.setProperty(e,n,r)):"undefined"!=typeof t.style.cssText&&(r=r?"!"+r:"",
t.style.cssText+=";"+e+":"+n+r+";");
}
return{
attr:t,
setProperty:e
};
});define("biz_wap/utils/ajax.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","biz_common/utils/respTypes.js","biz_wap/utils/ajax_wx.js"],function(require,exports,module,alert){
"use strict";
function logClientLog(e){
try{
var t;
/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?t="writeLog":/(Android)/i.test(navigator.userAgent)&&(t="log"),
t&&doLog(t,e);
}catch(o){
throw console.error(o),o;
}
}
function doLog(e,t){
var o,r,n={};
o=top!=window?top.window:window;
try{
r=o.WeixinJSBridge,n=o.document;
}catch(i){}
e&&r&&r.invoke?r.invoke(e,{
level:"info",
msg:"[WechatFe][ajax]"+t
}):setTimeout(function(){
n.addEventListener?n.addEventListener("WeixinJSBridgeReady",function(){
doLog(e,t);
},!1):n.attachEvent&&(n.attachEvent("WeixinJSBridgeReady",function(){
doLog(e,t);
}),n.attachEvent("onWeixinJSBridgeReady",function(){
doLog(e,t);
}));
},0);
}
function joinUrl(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof key&&(t.key=key),
"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),"undefined"!=typeof wxtoken&&(t.wxtoken=wxtoken),
"undefined"!=typeof window.devicetype&&(t.devicetype=window.devicetype),"undefined"!=typeof window.clientversion&&(t.clientversion=window.clientversion),
"undefined"!=typeof appmsg_token?t.appmsg_token=appmsg_token:e.indexOf("advertisement_report")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=68064_13_1&r="+Math.random()),
t.x5=isx5?"1":"0",t.f="json",Url.join(e,t);
}
function reportRt(e,t,o){
var r="";
if(o&&o.length){
var n=1e3,i=o.length,a=Math.ceil(i/n);
r=["&lc="+a];
for(var s=0;a>s;++s)r.push("&log"+s+"=[rtCheckError]["+s+"]"+encodeURIComponent(o.substr(s*n,n)));
r=r.join("");
}
var c,d="idkey="+e+"_"+t+"_1"+r+"&r="+Math.random();
if(window.ActiveXObject)try{
c=new ActiveXObject("Msxml2.XMLHTTP");
}catch(p){
try{
c=new ActiveXObject("Microsoft.XMLHTTP");
}catch(_){
c=!1;
}
}else window.XMLHttpRequest&&(c=new XMLHttpRequest);
c&&(c.open("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?",!0),c.setRequestHeader("cache-control","no-cache"),
c.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.send(d));
}
function Ajax(obj){
var type=(obj.type||"GET").toUpperCase(),url;
url=obj.notJoinUrl?obj.url:joinUrl(obj.url),"html"==obj.f&&(url=url.replace("&f=json",""));
var mayAbort=!!obj.mayAbort,async="undefined"==typeof obj.async?!0:obj.async,xhr=new XMLHttpRequest,timer=null,data=null;
if("object"==typeof obj.data){
var d=obj.data;
data=[];
for(var k in d)d.hasOwnProperty(k)&&data.push(k+"="+encodeURIComponent(d[k]));
data=data.join("&");
}else data="string"==typeof obj.data?obj.data:null;
xhr.open(type,url,async);
var _onreadystatechange=xhr.onreadystatechange;
xhr.onreadystatechange=function(){
if("function"==typeof _onreadystatechange&&_onreadystatechange.apply(xhr),3==xhr.readyState&&obj.received&&obj.received(xhr),
4==xhr.readyState){
xhr.onreadystatechange=null;
var status=xhr.status;
if(status>=200&&400>status)try{
var responseText=xhr.responseText,resp=responseText;
if("json"==obj.dataType)try{
resp=eval("("+resp+")");
var rtId=obj.rtId,rtKey=obj.rtKey||0,rtDesc=obj.rtDesc,checkRet=!0;
rtId&&rtDesc&&RespTypes&&!RespTypes.check(resp,rtDesc)&&reportRt(rtId,rtKey,RespTypes.getMsg()+"[detail]"+responseText+";"+obj.url);
}catch(e){
return void(obj.error&&obj.error(xhr));
}
obj.success&&obj.success(resp);
}catch(e){
throw __moon_report({
offset:MOON_AJAX_SUCCESS_OFFSET,
e:e
}),e;
}else{
try{
obj.error&&obj.error(xhr);
}catch(e){
throw __moon_report({
offset:MOON_AJAX_ERROR_OFFSET,
e:e
}),e;
}
if(status||!mayAbort){
var __ajaxtest=window.__ajaxtest||"0";
__moon_report({
offset:MOON_AJAX_NETWORK_OFFSET,
log:"ajax_network_error["+status+"]["+__ajaxtest+"]: "+url+";host:"+location.host,
e:""
});
}
}
clearTimeout(timer);
try{
obj.complete&&obj.complete();
}catch(e){
throw __moon_report({
offset:MOON_AJAX_COMPLETE_OFFSET,
e:e
}),e;
}
obj.complete=null;
}
},"POST"==type&&xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
obj.noXRequestedWidthHeader||xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),
"undefined"!=typeof obj.timeout&&(timer=setTimeout(function(){
xhr.abort("timeout");
try{
obj.complete&&obj.complete();
}catch(e){
throw __moon_report({
offset:MOON_AJAX_COMPLETE_OFFSET,
e:e
}),e;
}
obj.complete=null,__moon_report({
offset:MOON_AJAX_TIMEOUT_OFFSET,
log:"ajax_timeout_error: "+url,
e:""
});
},obj.timeout));
try{
xhr.send(data);
}catch(e){
obj.error&&obj.error();
}
return xhr;
}
require("biz_common/utils/string/html.js");
var Url=require("biz_common/utils/url/parse.js"),RespTypes=require("biz_common/utils/respTypes.js"),Ajax_wx=require("biz_wap/utils/ajax_wx.js"),isx5=-1!=navigator.userAgent.indexOf("TBS/"),__moon_report=window.__moon_report||function(){},MOON_AJAX_SUCCESS_OFFSET=3,MOON_AJAX_NETWORK_OFFSET=4,MOON_AJAX_ERROR_OFFSET=5,MOON_AJAX_TIMEOUT_OFFSET=6,MOON_AJAX_COMPLETE_OFFSET=7,doc={},isAcrossOrigin=!1;
try{
doc=top.window.document;
}catch(e){
isAcrossOrigin=!0;
}
return window.__second_open__||!isAcrossOrigin&&top.window.__second_open__?Ajax_wx:Ajax;
});define("appmsg/log.js",["biz_wap/utils/log.js"],function(i){
"use strict";
var s=i("biz_wap/utils/log.js");
return function(i,t){
s(i,t);
};
});define("biz_common/dom/class.js",[],function(){
"use strict";
function s(s,a){
return s.classList?s.classList.contains(a):s.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"));
}
function a(s,a){
s.classList?s.classList.add(a):this.hasClass(s,a)||(s.className+=" "+a);
}
function e(a,e){
if(a.classList)a.classList.remove(e);else if(s(a,e)){
var c=new RegExp("(\\s|^)"+e+"(\\s|$)");
a.className=a.className.replace(c," ");
}
}
function c(c,l){
s(c,l)?e(c,l):a(c,l);
}
return{
hasClass:s,
addClass:a,
removeClass:e,
toggleClass:c
};
});define("biz_wap/utils/device.js",[],function(){
"use strict";
function s(s){
{
var e=s.match(/MQQBrowser\/(\d+\.\d+)/i),r=s.match(/QQ\/(\d+\.(\d+)\.(\d+)\.(\d+))/i)||s.match(/V1_AND_SQ_([\d\.]+)/),i=s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/)||s.match(/MicroMessenger\/((\d+)\.(\d+))/),t=s.match(/Mac\sOS\sX\s(\d+\.\d+)/),n=s.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/),a=s.match(/MiuiBrowser\/(\d+\.\d+)/i),d=s.match(/MI-ONE/),h=s.match(/MI PAD/),w=s.match(/UCBrowser\/(\d+\.\d+(\.\d+\.\d+)?)/)||s.match(/\sUC\s/),c=s.match(/IEMobile(\/|\s+)(\d+\.\d+)/)||s.match(/WPDesktop/),u=s.match(/(ipod).*\s([\d_]+)/i),b=s.match(/(ipad).*\s([\d_]+)/i),p=s.match(/(iphone)\sos\s([\d_]+)/i),v=s.match(/Chrome\/(\d+\.\d+)/),m=s.match(/Mozilla.*Linux.*Android.*AppleWebKit.*Mobile Safari/),f=s.match(/(android)\s([\d\.]+)/i);
s.indexOf("HTC")>-1;
}
if(o.browser=o.browser||{},o.os=o.os||{},window.ActiveXObject){
var l=6;
(window.XMLHttpRequest||s.indexOf("MSIE 7.0")>-1)&&(l=7),(window.XDomainRequest||s.indexOf("Trident/4.0")>-1)&&(l=8),
s.indexOf("Trident/5.0")>-1&&(l=9),s.indexOf("Trident/6.0")>-1&&(l=10),o.browser.ie=!0,
o.browser.version=l;
}else s.indexOf("Trident/7.0")>-1&&(o.browser.ie=!0,o.browser.version=11);
f&&(this.os.android=!0,this.os.version=f[2]),u&&(this.os.ios=this.os.ipod=!0,this.os.version=u[2].replace(/_/g,".")),
b&&(this.os.ios=this.os.ipad=!0,this.os.version=b[2].replace(/_/g,".")),p&&(this.os.iphone=this.os.ios=!0,
this.os.version=p[2].replace(/_/g,".")),n&&(this.os.windows=!0,this.os.version=n[2]),
t&&(this.os.Mac=!0,this.os.version=t[1]),s.indexOf("lepad_hls")>0&&(this.os.LePad=!0),
h&&(this.os.MIPAD=!0),e&&(this.browser.MQQ=!0,this.browser.version=e[1]),r&&(this.browser.MQQClient=!0,
this.browser.version=r[1]),i&&(this.browser.WeChat=!0,this.browser.mmversion=this.browser.version=i[1]),
a&&(this.browser.MIUI=!0,this.browser.version=a[1]),w&&(this.browser.UC=!0,this.browser.version=w[1]||0/0),
c&&(this.browser.IEMobile=!0,this.browser.version=c[2]),m&&(this.browser.AndriodBrowser=!0),
d&&(this.browser.M1=!0),v&&(this.browser.Chrome=!0,this.browser.version=v[1]),this.os.windows&&(this.os.win64="undefined"!=typeof navigator.platform&&"win64"==navigator.platform.toLowerCase()?!0:!1);
var M={
iPad7:"iPad; CPU OS 7",
LePad:"lepad_hls",
XiaoMi:"MI-ONE",
SonyDTV:"SonyDTV",
SamSung:"SAMSUNG",
HTC:"HTC",
VIVO:"vivo"
};
for(var g in M)this.os[g]=-1!==s.indexOf(M[g]);
o.os.phone=o.os.phone||/windows phone/i.test(s),this.os.getNumVersion=function(){
return parseFloat(o.os.version,"10");
},this.os.hasTouch="ontouchstart"in window,this.os.hasTouch&&this.os.ios&&this.os.getNumVersion()<6&&(this.os.hasTouch=!1),
o.browser.WeChat&&o.browser.version<5&&(this.os.hasTouch=!1),o.browser.getNumVersion=function(){
return parseFloat(o.browser.version,"10");
},o.browser.isFFCanOcx=function(){
return o.browser.firefox&&o.browser.getNumVersion()>=3?!0:!1;
},o.browser.isCanOcx=function(){
return!(!o.os.windows||!o.browser.ie&&!o.browser.isFFCanOcx()&&!o.browser.webkit);
},o.browser.isNotIESupport=function(){
return!!o.os.windows&&(!!o.browser.webkit||o.browser.isFFCanOcx());
},o.userAgent={},o.userAgent.browserVersion=o.browser.version,o.userAgent.osVersion=o.os.version,
delete o.userAgent.version;
}
var o={};
s.call(o,window.navigator.userAgent);
var e=function(){
var s=window.navigator.userAgent,e=null;
if(o.os.android){
if(o.browser.MQQ&&o.browser.getNumVersion()>=4.2)return!0;
if(-1!=s.indexOf("MI2"))return!0;
if(o.os.version>="4"&&(e=s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/))&&e[1]>=4.2)return!0;
if(o.os.version>="4.1")return!0;
}
return!1;
}(),r=function(){
var s=document.createElement("video");
if("function"==typeof s.canPlayType){
if("probably"==s.canPlayType('video/mp4; codecs="mp4v.20.8"'))return!0;
if("probably"==s.canPlayType('video/mp4; codecs="avc1.42E01E"')||"probably"==s.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'))return!0;
}
return!1;
}(),i=function(){
return console.info("[canSupportAutoPlay]",o.os.ios,o.os.getNumVersion()),o.os.ios&&o.os.getNumVersion()<10?!1:!0;
}();
return o.canSupportVideo=r||e,o.canSupportVideoMp4=r,o.canSupportH5Video=e,o.canSupportAutoPlay=i,
o;
});define("appmsg/weapp_common.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(e,p,a,n){
"use strict";
function o(){
var e=navigator.userAgent.match(/MicroMessenger\/(\d+)\.(\d+)\.(\d+)/);
if(e){
var p=Number(e[1]),a=Number(e[2]),n=Number(e[3]);
p>6?g.canJumpOnTap=!0:6===p&&a>5?g.canJumpOnTap=!0:6===p&&5===a&&n>=3&&(g.canJumpOnTap=!0);
}else navigator.userAgent.match(/MicroMessenger\//)||(g.isNonWechat=!0);
t();
}
function t(){
try{
g.appidSnInfo=JSON.parse(window.weapp_sn_arr_json).weapp_card_list;
}catch(e){
g.appidSnInfo=[];
}
if(!g.appidSnInfo||0==g.appidSnInfo.length)return g.getInfoState=1,void r();
for(var p={
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
uin:window.uin||"",
key:window.key||"",
pass_ticket:window.pass_ticket||"",
weapp_num:g.appidSnInfo.length
},a={},n={},o=0;o<p.weapp_num;o++){
var t=g.appidSnInfo[o].appid,i=g.appidSnInfo[o].sn;
a[t]?a[t].push(o):(a[t]=[o],p["weapp_appid_"+o]=g.appidSnInfo[o].appid,g.appidSnDict[t]=i),
n[i]?n[i].push(o):(n[i]=[o],p["weapp_sn_"+o]=g.appidSnInfo[o].sn);
}
var c="/mp/appmsg_weapp?action=batch_get_weapp";
for(var s in p)c+="&"+s+"="+encodeURIComponent(p[s]);
m({
url:c,
type:"GET",
dataType:"json",
async:!0,
success:function(e){
try{
if(g.appidInfoResp=e,e.base_resp.ret)throw new Error("Fetch weapp info but get ret="+e.base_resp.ret);
g.data={
infoMap:{},
appid:e.appid||"",
appmsg_compact_url:e.appmsg_compact_url||"",
pathArgs:"appid="+encodeURIComponent(e.appid)+(e.appmsg_compact_url?"&appmsg_compact_url="+encodeURIComponent(e.appmsg_compact_url):"")
};
for(var p=e.weapp_info,a=0;a<p.length;a++){
var n=p[a].weapp_appid;
g.data.infoMap[n]=p[a];
}
g.getInfoState=4;
}catch(o){
g.getInfoState=3,g.appidInfoCatchErr=o;
}
r();
},
error:function(){
g.getInfoState=2,r();
}
});
}
function r(){
if(1==g.getInfoState||2==g.getInfoState)for(var e=0,p=g.appInfoErrQueue.length;p>e;e++){
var a=g.appInfoErrQueue[e];
"function"==typeof a&&a({
code:g.getInfoState
});
}else if(3==g.getInfoState)for(var e=0,p=g.appInfoErrQueue.length;p>e;e++){
var a=g.appInfoErrQueue[e];
"function"==typeof a&&a({
code:g.getInfoState,
resp:g.appidInfoResp,
catchErr:g.appidInfoCatchErr
});
}else if(4==g.getInfoState)for(var e=0,p=g.appInfoSucQueue.length;p>e;e++){
var a=g.appInfoSucQueue[e];
"function"==typeof a&&a({
resp:g.appidInfoResp,
data:g.data
});
}
g.appInfoErrQueue=[],g.appInfoSucQueue=[];
}
function i(e){
1!=g.getInfoState&&2!=g.getInfoState||"function"!=typeof e.onError?3==g.getInfoState&&"function"==typeof e.onError?e.onError({
code:g.getInfoState,
resp:g.appidInfoResp,
catchErr:g.appidInfoCatchErr
}):4==g.getInfoState&&"function"==typeof e.onSuccess?e.onSuccess({
resp:g.appidInfoResp,
data:g.data
}):("function"==typeof e.onSuccess&&g.appInfoSucQueue.push(e.onSuccess),"function"==typeof e.onError&&g.appInfoErrQueue.push(e.onError)):e.onError({
code:g.getInfoState
});
}
function c(e,p){
var a={
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
weapp_appid:e.appid||"",
weapp_sn:g.appidSnDict[e.appid]||"",
path:e.path||""
},n="/mp/appmsg_weapp?action=get_wxa_code";
for(var o in a)n+="&"+o+"="+encodeURIComponent(a[o]);
m({
url:n,
type:"GET",
dataType:"json",
async:!0,
success:function(e){
e.base_resp&&0===e.base_resp.ret?p&&p(e.url):p&&p();
},
error:function(){
p&&p();
}
});
}
function s(e){
if(!e||!g.data)return"";
var p="",a=e.indexOf("?");
return p=a>=0?e.slice(0,a)+(a>0?".html":"")+e.slice(a)+"&"+g.data.pathArgs:e+(""!==e?".html?":"?")+g.data.pathArgs;
}
function f(e){
var p="",a=e.indexOf("?");
return p=e.slice(0,a)+(a>0?".html":"")+e.slice(a);
}
function u(e){
e=e||{};
var p;
if(e.options)p=e.options;else if(e.appid&&(g.data||e.cps_weapp_username)){
var a;
e.cps_weapp_username?(a={},a.weapp_username=e.cps_weapp_username,a.app_version=e.cps_weapp_version):a=g.data.infoMap[e.appid],
a&&(p={
userName:a.weapp_username,
scene:e.scene,
sceneNote:e.sceneNote,
relativeURL:s(e.path)
},void 0!==a.app_version&&(p.appVersion=a.app_version),e.cps_weapp_username&&(p.relativeURL=f(e.path)));
}
p&&(e.privateExtraData&&(p.privateExtraData=e.privateExtraData),e.sourceAppId&&(p.sourceAppId=e.sourceAppId),
p.scene=e.scene||1058,console.log("weapp257",p),g.canJumpOnTap?I.invoke("openWeApp",p,function(p){
"system:function_not_exist"===p.err_msg?g.isNonWechat?("function"!=typeof e.beforeNonWechatWarn||e.beforeNonWechatWarn()!==!1)&&_():("function"!=typeof e.beforeJumpBackupPage||e.beforeJumpBackupPage()!==!1)&&d(e.appid):"function"==typeof e.onJsapiCallback&&e.onJsapiCallback(p);
}):g.isNonWechat?("function"!=typeof e.beforeNonWechatWarn||e.beforeNonWechatWarn()!==!1)&&_():("function"!=typeof e.beforeJumpBackupPage||e.beforeJumpBackupPage()!==!1)&&d(e.appid));
}
function d(e){
location.href="https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&appid="+encodeURIComponent(e)+"#wechat_redirect";
}
function _(){
setTimeout(function(){
n("请在微信内打开小程序");
},0);
}
var m=e("biz_wap/utils/ajax.js"),I=e("biz_wap/jsapi/core.js"),g={
canJumpOnTap:!1,
isNonWechat:!1,
data:null,
appidInfoResp:null,
appidInfoCatchErr:null,
appInfoSucQueue:[],
appInfoErrQueue:[],
appidSnInfo:[],
appidSnDict:{},
getInfoState:0
};
return o(),{
canJumpOnTap:g.canJumpOnTap,
isNonWechat:g.isNonWechat,
getAppidInfo:i,
getAppidCode:c,
appidSnInfo:g.appidSnInfo,
getRelativeURL:s,
jumpUrl:u
};
});define("biz_common/utils/string/html.js",[],function(){
"use strict";
return String.prototype.html=function(t){
var e,n=["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"],r=["&","&amp;","¥","&yen;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;","`","&#96;"];
e=t?r:n;
for(var o=0,i=this;o<e.length;o+=2)i=i.replace(new RegExp(e[o],"g"),e[o+1]);
return i;
},String.prototype.htmlEncode=function(){
return this.html(!0);
},String.prototype.htmlDecode=function(){
return this.html(!1);
},String.prototype.getPureText=function(){
return this.replace(/<\/?[^>]*\/?>/g,"");
},String.prototype.htmlLite=function(t){
var e=["&#96;","`","&#39;","'","&quot;",'"',"&gt;",">","&lt;","<","&amp;","&"];
t&&e.reverse();
for(var n=0,r=this;n<e.length;n+=2)r=r.replace(new RegExp(e[n],"g"),e[n+1]);
return r;
},String.prototype.htmlEncodeLite=function(){
return this.htmlLite(!0);
},String.prototype.htmlDecodeLite=function(){
return this.htmlLite(!1);
},{
htmlDecode:function(t){
return t.htmlDecode();
},
htmlEncode:function(t){
return t.htmlEncode();
},
getPureText:function(t){
return t.getPureText();
},
htmlEncodeLite:function(t){
return t.htmlEncodeLite();
},
htmlDecodeLite:function(t){
return t.htmlDecodeLite();
}
};
});define("cps/tpl/list_tpl.html.js",[],function(){
return'<# if(cps_isready == true){ #> <!--cps 数据ready-->\n    <# if(cps_state == \'no_cps\'){ #>\n        <!--违规-->\n        <section class="cps_inner cps_inner_list cps_inner_empty js_product_err_container">\n            <p>此内容因违规，暂无法查看</p>\n        </section>\n    <# } else { #>\n        <!--正常-->\n        <section class="cps_inner cps_inner_list js_list_container js_product_container<# if(pid_type == \'book\' || pid_type != \'movie\'){ #> cps_inner_book<# } #>">\n            <div class="cps_inner_wrp js_product_loop_content">\n                <div class="cps_inner_content">\n                    <figure class="cps_inner_image_container">\n                        <span class="js_cover cps_inner_image" style="background: url(<#=img_url#>) no-repeat center bottom; background-size: cover;"></span>\n                    </figure>\n                    <# if(is_ad == 1){ #>\n                    <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n                    <# } #>\n                    <div class="cps_inner_info">\n                        <div class="cps_inner_info_hd">\n                            <h2 class="cps_inner_info_title <# if(typeof price !== \'undefined\' && pid_type !== \'book\' && pid_type !== \'movie\'){ #>line2<# } #>"><#=title#></h2>\n                            <# if(typeof price === \'undefined\' || pid_type === \'book\' || pid_type === \'movie\'){ #>\n                            <p class="cps_inner_info_desc"><#=desc#></p>\n                            <# } #>\n                            <div class="cps_inner_info_from">\n                                <span style="background: url(<#=source_logo_url#>) no-repeat center;\n                                background-size: contain;" class="cps_inner_ic_from"></span><#=source_name#>\n                            </div>\n                        </div>\n        \n                        <div class="cps_inner_info_ft">\n                            <span class="cps_inner_btn_cps_info <# if(is_ad == 1){ #>buy<# } #>"><!--<i class="cps_inner_ic_miniapp"></i><# if(is_ad == 1){ #>购买<# } else { #>详情<# } #>--></span>\n                            <# if(typeof price !== \'undefined\' && pid_type !== \'book\' && pid_type !== \'movie\'){ #>\n                            <p class="cps_inner_info_desc price"><span class="price_sign">¥</span><#=price#></p>\n                            <# } #>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n    <# } #>\n<# }else{ #>\n    <section class="cps_inner cps_inner_list cps_inner_placeholder">\n        <div class="cps_inner_wrp" data-templateid="" data-pid="{{pid1}}" data-order="" data-packid="" data-wxaappid="{{wxa_appid1}}" data-wxapath="{{url_path1}}">\n            <!-- 数据加载成功模板 -->\n            <div class="cps_inner_content">\n                <figure class="cps_inner_image_container">\n                    <span width="100%" class="cps_inner_image"></span>\n                </figure>\n                <div class="cps_inner_info">\n                    <div class="cps_inner_info_hd">\n                        <h2 class="cps_inner_info_title"></h2>\n                    </div>\n                    <div class="cps_inner_info_ft"></div>\n                </div>\n            </div>\n        </div>\n    </section>\n<# } #>\n    \n\n\n';
});define("cps/tpl/card_tpl.html.js",[],function(){
return'<!--卡片类型-->\n<# if(cps_isready == true){ #> <!--cps 数据ready-->\n    <# if(cps_state == \'no_cps\'){ #>\n        <!--违规-->\n        <section class="cps_inner cps_inner_card cps_inner_empty js_product_err_container js_banner_container">\n            <p>此内容因违规，暂无法查看</p>\n        </section>\n    \n    <# } else {#>\n        <!--正常-->\n        <section class="cps_inner cps_inner_card js_product_container js_banner_container">\n            <div class="cps_inner_wrp js_product_loop_content">\n                <div class="cps_inner_content">\n                    <figure class="cps_inner_image_container">\n                        <span width="100%" class="js_cover cps_inner_image" style="background: url(<#=img_url#>) no-repeat center; background-size:cover;"></span>\n                        <# if(is_ad == 1){ #>\n                        <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n                        <# } #>\n                        <div class="cps_inner_info_from">\n                            <span class="cps_inner_ic_from" style="background: url(<#=source_logo_url#>) no-repeat center;\n                            background-size: contain;"></span><#=source_name#>\n                        </div>\n                    </figure>\n                    <div class="cps_inner_info">\n                        <div class="cps_inner_info_hd">\n                            <h2 class="cps_inner_info_title <# if(typeof price !== \'undefined\' && pid_type !== \'book\' && pid_type !== \'movie\'){ #>line2<# } #>"><#=title#></h2> <!--通用模版带金额，title 可以显示2行-->\n                        </div>\n                        <div class="cps_inner_info_ft">\n                            <span class="cps_inner_btn_cps_info <# if(is_ad == 1){ #>buy<# } #>"><!--<i class="cps_inner_ic_miniapp"></i><# if(is_ad == 1){ #>购买<# } else { #>详情<# } #>--></span>\n                            <# if(typeof price !== \'undefined\' && pid_type !== \'book\' && pid_type !== \'movie\'){ #>\n                            <p class="cps_inner_info_desc"><span class="price_sign">¥</span><#=price#></p>\n                            <# } #>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n    \n    <# } #>\n<# }else{ #>\n    <section class="cps_inner cps_inner_card cps_inner_placeholder">\n        <div class="cps_inner_wrp">\n            <!-- 数据加载成功模板 -->\n            <div class="cps_inner_content">\n                <figure class="cps_inner_image_container">\n                    <span class="cps_inner_image"></span>\n                </figure>\n                <div class="cps_inner_info">\n                    <div class="cps_inner_info_hd">\n                        <h2 class="cps_inner_info_title"></h2>\n                    </div>\n                    <div class="cps_inner_info_ft"></div>\n                </div>\n            </div>\n        </div>\n    </section>\n<# } #>\n';
});define("cps/tpl/banner_tpl.html.js",[],function(){
return'<# if(cps_isready == true){ #> <!--cps 数据ready-->\n    <# if(cps_state == \'no_cps\'){ #>\n        <!--违规-->\n        <section class="cps_inner cps_inner_banner cps_inner_empty js_product_err_container js_banner_container">\n            <p>此内容因违规，暂无法查看</p>\n        </section>\n    \n    <# } else {#>\n        <!--正常-->\n        <section class="cps_inner cps_inner_banner js_product_container js_banner_container">\n            <div class="cps_inner_wrp js_product_loop_content">\n                <div class="cps_inner_content">\n                    <figure class="cps_inner_image_container">\n                        <span width="100%" class="js_cover cps_inner_image" style="background: url(<#=img_url#>) no-repeat center; background-size: cover;"></span>\n                    </figure>\n                    <# if(is_ad == 1){ #>\n                    <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n                    <# } #>\n                    <div class="cps_inner_info">\n                        <div class="cps_inner_info_hd">\n                            <h2 class="cps_inner_info_title"><#=title#></h2>\n                            <p class="cps_inner_info_desc"><#=desc#></p>\n                        </div>\n                        <div class="cps_inner_info_ft">\n                            <div class="cps_inner_info_from">\n                                <span class="cps_inner_ic_from" style="background: url(<#=source_logo_url#>) no-repeat center;\n                                background-size: contain;"></span><#=source_name#>\n                            </div>\n                            <span class="cps_inner_btn_cps_info <# if(is_ad == 1){ #>buy<# } #>"><!--<i class="cps_inner_ic_miniapp"></i><# if(is_ad == 1){ #>购买<# } else { #>详情<# } #>--></span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n    \n    <# } #>\n<# }else{ #>\n    <section class="cps_inner cps_inner_banner cps_inner_placeholder">\n        <div class="cps_inner_wrp">\n            <!-- 数据加载成功模板 -->\n            <div class="cps_inner_content">\n                <figure class="cps_inner_image_container">\n                    <span width="100%" class="cps_inner_image"></span>\n                </figure>\n                <div class="cps_inner_info">\n                    <div class="cps_inner_info_hd">\n                        <h2 class="cps_inner_info_title"></h2>\n                        <p class="cps_inner_info_desc"></p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n<# } #>\n';
});define("biz_common/tmpl.js",[],function(){
"use strict";
var e=function(e,r,t){
var n="";
n=e.replace(/[\r\t\n]/g," ").split("<#").join("	").replace(/((^|#>)[^\t]*)'/g,"$1\r"),
n=t?n.replace(/\t==(.*?)#>/g,"',$1,'").replace(/\t=(.*?)#>/g,"', String($1).replace(/&/g,'&amp;').replace(/\"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;') ,'"):n.replace(/\t=(.*?)#>/g,"',$1,'"),
n=n.split("	").join("');").split("#>").join("p.push('").split("\r").join("\\'");
var p=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+n+"');}return p.join('');");
return p(r);
},r=function(r,t,n){
var p=document.getElementById(r);
return p?e(p.innerHTML,t,n):"";
};
return{
render:r,
tmpl:e
};
});