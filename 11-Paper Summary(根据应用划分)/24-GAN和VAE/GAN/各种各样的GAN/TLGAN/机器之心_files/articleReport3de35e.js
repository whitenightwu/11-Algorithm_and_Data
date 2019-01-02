define("a/a_report.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","appmsg/log.js","a/a_sign.js"],function(o){
"use strict";
function e(o,e){
var i="https:"==location.protocol?1500:1200,d="/mp/advertisement_report?r="+Math.random()+"&ascene="+encodeURIComponent(window.ascene||-1)+"&",c=[],u=!1;
for(var l in o)o.hasOwnProperty(l)&&c.push(l+"="+o[l]);
var w=2;
1==window.__ad_has_exposure&&(w=1),c.push("has_exposure="+w),d+=c.join("&");
var j="trace_id="+o.tid+"&product_type="+o.pt+"&jump_url="+o.url+"&logtype=3&url="+encodeURIComponent(location.href)+"&rl="+o.rl;
o.tid&&s.gtVersion("6.3.22",!0)&&r.invoke("adDataReport",{
ad_info:j,
need_record_page_operation:1
},function(){}),p("[Ad report] url="+d),2==w&&window.__addIdKeyReport("68064",0),
window.__ad_test_exposure||window.__addIdKeyReport("68064",7),_.createSign(o,function(o,r,s,p,_){
d+="&ad_sign_data="+o+"&ad_sign_k1="+r+"&ad_sign_k2="+s+"&ad_sign_md5="+p+"&viewid="+_.viewid,
console.log("after calRqt url",d),t({
url:d,
mayAbort:!0,
type:"GET",
success:function(){
a&&a(56+n);
},
error:function(){
a&&a(57+n);
},
complete:function(){
u||(u=!0,!!e&&e());
},
async:!0
}),setTimeout(function(){
u||(u=!0,window.__ajaxtest="1",!!e&&e());
},i);
});
}
var t=o("biz_wap/utils/ajax.js"),a=window.__report,i=location.protocol,n="https:"==i?5:0,r=o("biz_wap/jsapi/core.js"),s=o("biz_wap/utils/mmversion.js"),p=o("appmsg/log.js"),_=o("a/a_sign.js");
return{
AdClickReport:e
};
});define("biz_wap/utils/show_time.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js"],function(t){
"use strict";
function i(){
try{
return JSON.parse(localStorage.getItem(_));
}catch(t){
return{};
}
}
function n(){
try{
localStorage.removeItem(_);
}catch(t){}
}
function e(t,n){
var e=i()||{};
e[t]={
traceid:m[t].info.traceid,
aid:+t,
staytime:n,
pos_type:m[t].info.pos_type
};
try{
localStorage.setItem(_,JSON.stringify(e));
}catch(r){}
}
function r(t){
var n=i()||{};
return n[t]?n[t].staytime:0;
}
function o(t,i){
var n=t.id||t.aid;
if(m[n]){
if(m[n].intervalId)return;
}else m[n]={};
m[n].intervalId=setInterval(function(){
var t=r(n);
e(n,t+p);
},p),i||(m[n].inViewport=!0,m[n].info=t);
}
function a(t,i){
m[t]&&m[t].intervalId&&(clearInterval(m[t].intervalId),m[t].intervalId=null,i||(m[t].inViewport=!1));
}
function d(){
if("hidden"in document)return"hidden";
for(var t=0;t<v.length;t++)if(v[t]+"Hidden"in document)return v[t]+"Hidden";
return null;
}
function u(){
if("visibilityState"in document)return"visibilityState";
for(var t=0;t<v.length;t++)if(v[t]+"VisibilityState"in document)return v[t]+"VisibilityState";
return null;
}
function c(){
window.__ajaxtest="2";
var t=i(),e={
biz_ad_exposure_time:[]
};
if(t&&!window.__second_open__){
for(var r in t)e.biz_ad_exposure_time.push(t[r]);
e=JSON.stringify(e),f({
url:"/mp/advertisement_report?action=extra_report&extra_data="+e+"&__biz="+biz,
type:"GET",
mayAbort:!0,
async:!1,
timeout:2e3,
success:function(){
n();
}
});
}
}
function s(){
var t=d();
if(t){
var i=t.replace(/[H|h]idden/,"")+"visibilitychange";
document.addEventListener(i,function(){
var t=document[u()];
for(var i in m)"hidden"===t?a(i,!0):m[i].inViewport&&o({
id:i
},!0);
},!1);
}
l.on(window,"unload",c),l.on(window,"load",c);
}
var l=t("biz_common/dom/event.js"),f=t("biz_wap/utils/ajax.js"),_="__WXLS__AD_SHOW_TIME",v=["webkit","moz","ms","o"],m={},p=100;
return s(),{
startShow:o,
stopShow:a
};
});define("biz_common/utils/get_para_list.js",[],function(){
"use strict";
function n(n){
for(var r=0;r<n.children.length;r++)if(-1!==e.indexOf(n.children[r].tagName))return!0;
}
function r(e){
var t=e.children;
if(!t.length)return t;
for(var i,c=[],a=0;a<t.length;a++)i=t[a],n(i)&&-1===i.className.indexOf("js_product_container")?c=c.concat(r(i)):c.push(i);
return c;
}
var e=["P","DIV","SECTION","LI","H1","H2","H3","H4","H5","H6","TABLE"];
return r;
});define("biz_wap/utils/openUrl.js",["biz_wap/jsapi/core.js"],function(e){
"use strict";
function r(e){
var r=document.createElement("a");
return r.href=e,{
source:e,
protocol:r.protocol.replace(":",""),
host:r.hostname,
port:r.port,
query:r.search,
params:function(){
for(var e,t={},a=r.search.replace(/^\?/,"").split("&"),o=a.length,n=0;o>n;n++)a[n]&&(e=a[n].split("="),
t[e[0]]=e[1]);
return t;
}(),
file:(r.pathname.match(/([^\/?#]+)$/i)||[,""])[1],
hash:r.hash.replace("#",""),
path:r.pathname.replace(/^([^\/])/,"/$1"),
relative:(r.href.match(/tps?:\/\/[^\/]+(.+)/)||[,""])[1],
segments:r.pathname.replace(/^\//,"").split("/")
};
}
function t(e,t){
var o;
t=t||1,0==e.indexOf("/")&&(o=r(location.href),e=o.protocol+"://"+o.host+e,console.log("openUrlWithExtraWebview with relative path:",e)),
a.invoke("openUrlWithExtraWebview",{
url:e,
openType:t
},function(r){
-1==r.err_msg.indexOf("ok")&&(location.href=e);
});
}
var a=e("biz_wap/jsapi/core.js");
return{
openUrlWithExtraWebview:t
};
});define("a/a_sign.js",["biz_wap/jsapi/core.js","biz_common/jquery.md5.js"],function(i){
"use strict";
function e(i,e){
console.log("sign postObj",i);
var o=window.location.search.substr(1).split("&");
try{
var t=decodeURIComponent(i.rl).split("?")[1].split("&");
}catch(r){
var t=["viewid=0"];
}
for(var a,n={},c="",p=["__biz","press_interval"],_=0;_<p.length;_++)i[p[_]]||(i[p[_]]="");
for(var _=0;_<o.length;_++){
var l=o[_].split("=");
n[l[0]]=l[1];
}
for(var v={},_=0;_<t.length;_++){
var l=t[_].split("=");
v[l[0]]=l[1];
}
c="biz="+i.__biz+"&click_pos="+i.click_pos+"&pass_ticket="+n.pass_ticket+"&pos_x="+i.pos_x+"&pos_y="+i.pos_y+"&press_interval="+i.press_interval+"&viewid="+decodeURIComponent(v.viewid).replace(/\+/g," "),
a=window.md5(c),s.invoke("calRqt",{
rqt:a
},function(i){
var s,o,t;
i.data&&i.k1&&i.k2?(s=encodeURIComponent(i.data),o=i.k1,t=i.k2,e(s,o,t,a,v)):e(0,0,0,a,v);
});
}
var s=i("biz_wap/jsapi/core.js");
return i("biz_common/jquery.md5.js"),{
createSign:e
};
});define("pages/loadscript.js",[],function(){
"use strict";
function e(t){
e.counter||(e.counter=1);
var n="number"!=typeof t.retry?1:t.retry,o=t.win||window,r=o.document,a=r.createElement("script"),i=t.type||"JSONP",d=r.head||r.getElementsByTagName("head")[0]||r.documentElement,l=t.callbackName,c="uninitialized",u="undefined"==typeof t.successCode?200:t.successCode,s="undefined"==typeof t.timeoutCode?500:t.timeoutCode,f="undefined"==typeof t.scriptErrorCode?400:t.scriptErrorCode,m=!1,p=null;
"JSONP"!=i&&"JS"!=i&&(i="JSONP");
var y="";
y="JSONP"==i?t.url+"&t="+Math.random():t.url;
var h=function(e){
a&&!m&&(m=!0,p&&(clearTimeout(p),p=null),a.onload=a.onreadystatechange=a.onerror=null,
d&&a.parentNode&&d.removeChild(a),a=null,l&&-1==l.indexOf(".")&&(window[l]=null),
"JS"==i&&e==u&&"loaded"==c&&"function"==typeof t.callback?t.callback():e!=u&&"loaded"!=c&&"function"==typeof t.onerror&&t.onerror(e));
};
if(l&&"function"==typeof t.callback&&"JSONP"==i){
var w=l;
-1==l.indexOf(".")&&(l=window[l]?l+e.counter++:l,window[l]=function(){
c="loaded",t.callback.apply(null,arguments);
}),y=y.replace("="+w,"="+l);
}
a.onload=a.onreadystatechange=function(){
var e=navigator.userAgent.toLowerCase();
(-1!=e.indexOf("opera")||-1==e.indexOf("msie")||/loaded|complete/i.test(this.readyState))&&("JS"==i&&(c="loaded"),
h("loaded"==c?u:f));
},a.onerror=function(){
return n>0?(t.retry=n-1,p&&(clearTimeout(p),p=null),void e(t)):void h(f);
},t.timeout&&(p=setTimeout(function(){
h(s);
},parseInt(t.timeout,10))),c="loading",a.charset="utf-8",setTimeout(function(){
a.src=y;
try{
d.insertBefore(a,d.lastChild);
}catch(e){}
},0);
}
return e;
});define("biz_wap/utils/ajax_load_js.js",["biz_wap/utils/ajax.js","biz_wap/utils/localstorage.js"],function(e){
"use strict";
function n(e){
var n=d(e.url,e.version),o=function(){},i=function(){};
if("function"==typeof e.onSuccess&&(o=e.onSuccess),"function"==typeof e.onError&&(i=e.onError),
c(e.win,n))return void o({
code:1,
queueIndex:0
});
if(e.useCache){
var a=u(e.url,e.version);
if(a&&t({
win:e.win,
funcStr:a,
useCache:!1,
url:e.url,
version:e.version
}),c(e.win,n))return void o({
code:2,
queueIndex:0
});
}
if(S.callbackQueue.push({
options:e,
onSuccess:o,
onError:i
}),"undefined"==typeof S.jsLoadState[n]&&(S.jsLoadState[n]=-1),-1==S.jsLoadState[n]){
var s=e.url;
s+=-1==s.indexOf("?")?"?"+S.customerParam+"="+e.version:"&"+S.customerParam+"="+e.version,
r({
originUrl:e.url,
version:e.version,
url:s,
key:n
});
}
}
function r(e){
S.jsLoadState[e.key]=1,w({
url:e.url,
notJoinUrl:!0,
timeout:1e4,
type:"POST",
dataType:"text",
noXRequestedWidthHeader:!0,
success:function(n){
if(1==S.jsLoadState[e.key]){
S.jsLoadState[e.key]=-1;
var r=!0;
r=n?t({
win:null,
funcStr:n,
useCache:!0,
url:e.originUrl,
version:e.version
}):!1,o(r?{
code:3,
type:"suc",
funcStr:n
}:{
code:51,
type:"err"
});
}
},
error:function(){
1==S.jsLoadState[e.key]&&(S.jsLoadState[e.key]=-1,o({
code:52,
type:"err"
}));
},
complete:function(){
1==S.jsLoadState[e.key]&&(S.jsLoadState[e.key]=-1,o({
code:53,
type:"err"
}));
}
});
}
function t(e){
var n=e.win||window,r=!0;
try{
n.eval(e.funcStr),r=!0;
}catch(t){
r=!1;
}
return r?(s({
url:e.url,
version:e.version,
win:n
}),e.useCache&&a(e.url,e.version,e.funcStr),!0):(l({
url:e.url,
version:e.version,
win:n
}),i(e.url),!1);
}
function o(e){
for(var n=0,r=S.callbackQueue.length;r>n;n++){
var o=S.callbackQueue[n],u=o.options,i=u.win,a=d(u.url,u.version);
"suc"==e.type?(e.funcStr&&!c(i,a)&&t({
win:i,
funcStr:e.funcStr,
useCache:!1,
url:u.url,
version:u.version
}),o.onSuccess({
code:e.code,
queueIndex:n
})):o.onError({
code:e.code,
queueIndex:n
});
}
S.callbackQueue=[];
}
function u(e,n){
var r=f(e),t=y.get(r);
if(!t)return null;
var o;
try{
o=JSON.parse(t);
}catch(u){}
if(o){
var a=+new Date,c=1*o.time;
return a-c>S.lsTimeout||o.version!=n||!o.func?(i(e),null):o.func;
}
}
function i(e){
var n=f(e);
y.remove(n);
}
function a(e,n,r){
var t={
version:n,
func:r,
time:+new Date
},o=f(e);
try{
y.set(o,JSON.stringify(t));
}catch(u){}
}
function c(e,n){
return e=e||window,e[S.winCacheKey]&&e[S.winCacheKey][n]&&e[S.winCacheKey][n].state===!0?!0:!1;
}
function s(e){
var n=d(e.url,e.version),r=e.win||window;
r[S.winCacheKey]||(r[S.winCacheKey]={}),r[S.winCacheKey][n]||(r[S.winCacheKey][n]={}),
r[S.winCacheKey][n].state=!0;
}
function l(e){
var n=d(e.url,e.version),r=e.win||window;
if(r[S.winCacheKey]&&r[S.winCacheKey][n])try{
delete r[S.winCacheKey][n];
}catch(t){}
}
function f(e){
return encodeURIComponent(e);
}
function d(e,n){
return encodeURIComponent(e)+"_"+n||"";
}
function v(e){
l(e),i(e.url);
}
var w=e("biz_wap/utils/ajax.js"),y=e("biz_wap/utils/localstorage.js"),S={
jsLoadState:{},
winCacheKey:"__loadExternalJsStates__",
lsTimeout:1728e5,
customerParam:"wxv",
callbackQueue:[]
};
return{
ClearCache:v,
Load:n
};
});define("appmsg/comment.js",["biz_common/dom/class.js","appmsg/cmt_tpl.html.js","biz_common/utils/wxgspeedsdk.js","appmsg/comment_report.js","biz_wap/utils/device.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/fakehash.js","appmsg/log.js","appmsg/comment_tpl.html.js","appmsg/friend_comment_tpl.html.js","appmsg/my_comment_tpl.html.js","appmsg/emotion/emotion.js","appmsg/emotion/dom.js"],function(e,t,n,o){
"use strict";
function m(e,t){
e&&(e.style.display=t?t:"block");
}
function i(e){
e&&(e.style.display="none");
}
function c(){
setTimeout(function(){
m(et.toast);
},750),setTimeout(function(){
i(et.toast);
},1500);
}
function d(e){
return e.replace(/^\s+|\s+$/g,"");
}
function s(e,t){
if(!(Math.random()<.999)){
var n=window.location.protocol,o=9;
"https:"==n&&(o=18),q.saveSpeeds({
uin:uin,
pid:o,
speeds:[{
sid:29,
time:e
},{
sid:30,
time:t
}]
}),q.send();
}
}
function l(e,t){
if("undefined"!=typeof e){
var n=new Image;
n.src=Y.idkey?"//mp.weixin.qq.com/mp/jsmonitor?idkey="+(Y.idkey+"_"+e+"_1")+"&t="+Math.random():"http://mp.weixin.qq.com/mp/jsreport?key="+e+"&content="+(t||"")+"&r="+Math.random();
}
}
function a(){
var e=window.innerHeight||document.documentElement.clientHeight,t=window.pageYOffset||document.documentElement.scrollTop,n=document.documentElement.scrollHeight;
if(t+e+100>n&&A.off(window,"scroll",a),!($||-1==X||X>0&&n-t-e>500)){
if("number"==typeof window.comment_count&&0==window.comment_count)return void _({
enabled:1,
elected_comment:[],
friend_comment:[],
elected_comment_total_cnt:0,
my_comment:[],
only_fans_can_comment:window.only_fans_can_comment,
is_fans:window._is_fans,
logo_url:window._logo_url,
nick_name:window._nick_name
});
var o=+new Date;
$=!0,i(et.tips),m(et.loading);
var c="/mp/appmsg_comment?action=getcomment&scene="+Y.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+R+"&offset="+X+"&limit="+Z+(window.send_time?"&send_time="+send_time:"");
try{
mt++,mt>1&&l(Y.moreList,encodeURIComponent(c)),ot.indexOf(c)>-1&&l(Y.repeatList,encodeURIComponent(c)),
ot.push(c);
}catch(d){}
!!O&&console.log("[Appmsg comment] start get comment data:"+c),P("[Appmsg comment] start get comment data, url:"+c),
console.log("before getcomment",c),F({
url:c,
type:"get",
success:function(e){
var t=+new Date,n=t-o,m={};
try{
m=window.eval.call(window,"("+e+")");
}catch(i){}
window.test_comment_data&&(m=window.test_comment_data);
var d=m.base_resp&&m.base_resp.ret;
if(0==d){
_(m);
var a=+new Date-t;
s(n,a);
}else l(Y.errList,"type:resperr;url:"+encodeURIComponent(c)+";ret="+d);
P("[Appmsg comment] get comment success");
},
error:function(){
l(Y.errList,"type:ajaxerr;url:"+encodeURIComponent(c)),P("[Appmsg comment] get comment ajax error");
},
complete:function(){
$=!1,i(et.loading),A.off(window,"scroll",C);
}
});
}
}
function _(e){
var t,n,o=document.createDocumentFragment(),c=document.createDocumentFragment();
it++,it>1&&l(Y.handleList,encodeURIComponent(JSON.stringify({
comment_id:R,
offset:X,
url:location.href
}))),"undefined"!=typeof e.only_fans_can_comment?window.can_fans_comment_only=e.only_fans_can_comment:"undefined"==typeof window.can_fans_comment_only&&(window.can_fans_comment_only=0),
1!=e.enabled?(x&&(x.style.display="none"),L&&i(L),e.elected_comment=[],e.friend_comment=[],
e.elected_comment_total_cnt=0,e.friend_comment_total_cnt=0):(x&&(x.style.display="block"),
L&&m(L)),0==X?(G=e.logo_url,K=e.nick_name,t=e.elected_comment,t&&t.length?(g(t,o,"elected"),
et.list.appendChild(o),m(et.main),0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans?m(document.getElementById("js_cmt_addbtn1")):m(document.getElementById("js_cmt_nofans1"),"block"),
e.elected_comment_total_cnt<=10&&(m(document.getElementById("js_cmt_statement")),
m(document.getElementById("js_cmt_qa")))):(i(et.main),0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans?m(document.getElementById("js_cmt_addbtn2")):m(document.getElementById("js_cmt_nofans2"),"block")),
n=e.friend_comment,g(n,c,"friend"),n&&0==n.length&&i(L),et.fdlist.appendChild(c),
n&&n.length?(m(et.fdmain),(0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans)&&(i(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn2")),m(document.getElementById("js_cmt_addbtn3")))):i(et.fdmain),
e.friend_comment.length>0||e.elected_comment.length>0,function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=(document.getElementById("img-content"),
document.getElementById("js_cmt_area"));
if(e&&t&&t.offsetTop){
var n=t.offsetTop;
window.scrollTo(0,n-25);
}
}()):(t=e.elected_comment,t&&t.length&&(g(t,o,"elected"),et.list.appendChild(o))),
0==e.elected_comment_total_cnt?(X=-1,i(document.getElementById("js_cmt_loading")),
i(document.getElementById("js_cmt_statement")),i(document.getElementById("js_cmt_qa"))):X+Z>=e.elected_comment_total_cnt?(X=-1,
i(document.getElementById("js_cmt_loading")),m(document.getElementById("js_cmt_statement")),
m(document.getElementById("js_cmt_qa"))):X+=e.elected_comment.length;
}
function r(){
W.log("tag1");
var e=d(et.input.value);
if(W.log("tag2"),!T.hasClass(et.submit,"btn_disabled")){
if(W.log("tag3"),e.length<1)return y("留言不能为空");
if(W.log("tag4"),e.length>600)return y("字数不能多于600个");
W.log("tag5"),T.addClass(et.submit,"btn_disabled"),W.log("tag6");
var t=document.getElementById("activity-name");
W.log("tag7"),ct!=e&&(dt=+new Date);
var n=function(t){
{
var n=document.createDocumentFragment();
document.createDocumentFragment();
}
c(),console.log("------------------------",window.friend_comment_enabled),g([{
content:e,
nick_name:K,
create_time:(new Date).getTime()/1e3|0,
is_elected:0,
logo_url:G,
like_status:0,
like_num_format:0,
like_num:0,
is_from_friend:0,
is_from_me:1,
my_id:t.my_id,
content_id:t.content_id
}],n,"mine"),et.mylist.insertBefore(n,et.mylist.firstChild);
m(et.mylist.parentNode),et.input.value="",v();
};
if(window.test_comment_data)return void n({
my_id:"111"
});
var o="/mp/appmsg_comment?action=addcomment&scene="+Y.scene+"&comment_id="+R+"&__biz="+biz+"&idx="+idx+"&appmsgid="+appmsgid+"&sn="+sn;
F({
url:o,
data:{
content:e,
title:t&&d(t.innerText),
head_img:G,
nickname:K,
client_id:dt
},
type:"POST",
success:function(t){
W.log("tag8"),Q.hidePannel();
var m={};
try{
m=window.eval.call(window,"("+t+")");
}catch(i){}
switch(+m.ret){
case 0:
n(m);
break;

case-6:
y("你留言的太频繁了，休息一下吧");
break;

case-7:
y("你还未关注该公众号，不能参与留言");
break;

case-10:
y("字数不能多于600个");
break;

case-15:
y("留言已关闭");
break;

default:
ct=e,y("系统错误，请重试");
}
0!=m.ret&&l(Y.addCommentErr,"type:resperr;url:"+encodeURIComponent(o)+";ret="+m.ret);
},
error:function(e){
W.log("shit;"+e.status+";"+e.statusText),l(Y.addCommentErr,"type:ajaxerr;url:"+encodeURIComponent(o));
},
complete:function(){
""!=et.input.value&&T.removeClass(et.submit,"btn_disabled");
}
});
}
}
function p(){
if(0==V){
var e="/mp/appmsg_comment?action=getmycomment&scene="+Y.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+R,t=document.getElementById("js_mycmt_loading");
V=1,m(t),F({
url:e,
type:"get",
success:function(t){
var n={};
try{
n=window.eval.call(window,"("+t+")");
}catch(o){}
var i=n.base_resp&&n.base_resp.ret;
if(0==i){
var c=n.my_comment,d=document.createDocumentFragment();
c&&c.length&&(g(c,d,"mine"),et.mylist.appendChild(d),m(et.mylist.parentNode)),V=2;
}else V=0,l(Y.errComment,"type:resperr;url:"+encodeURIComponent(e)+";ret="+i);
},
error:function(){
V=0,l(Y.errComment,"type:ajaxerr;url:"+encodeURIComponent(e));
},
complete:function(){
i(t);
}
});
}
}
function u(e){
var t=(new Date).getTime(),n=new Date;
n.setDate(n.getDate()+1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n=n.getTime();
var o=t/1e3-e,m=n/1e3-e,i=new Date(n).getFullYear(),c=new Date(1e3*e);
return 3600>o?Math.ceil(o/60)+"分钟前":86400>m?Math.floor(o/60/60)+"小时前":172800>m?"昨天":604800>m?Math.floor(m/24/60/60)+"天前":c.getFullYear()==i?c.getMonth()+1+"月"+c.getDate()+"日":c.getFullYear()+"年"+(c.getMonth()+1)+"月"+c.getDate()+"日";
}
function g(e,t,n){
var o,m="",i=document.createElement("div"),c="http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHiak6fjSeA7cianwo25C0CIt5ib8nAcZjW7QT1ZEmUo4r5iazzAKhuQibEXOReDGmXzj8rNg/0",d="";
"elected"==n?d=0:"friend"==n&&(d=1),nt={};
for(var s,a=0;s=e[a];++a){
s.time=u(s.create_time),s.status="",s.logo_url=s.logo_url||c,s.logo_url=-1!=s.logo_url.indexOf("wx.qlogo.cn")?s.logo_url.replace(/\/132$/,"/96"):s.logo_url,
s.content=s.content.htmlDecodeLite().htmlEncodeLite(),s.nick_name=s.nick_name.htmlDecodeLite().htmlEncodeLite(),
s.like_num_format=parseInt(s.like_num)>=1e4?(s.like_num/1e4).toFixed(1)+"万":s.like_num,
s.is_from_friend="friend"==n?0:s.is_from_friend||0,s.is_from_me="mine"==n?1:s.is_from_me||0,
s.reply=s.reply||{
reply_list:[]
},s.is_mine=n?!1:!0,s.is_elected="elected"==n||"friend"==n?1:s.is_elected,s.is_top="friend"==n?0:s.is_top,
s.report_elected=s.is_elected||0,s.report_friend=s.is_from_friend||0,s.scene=d,s.reply.reply_list.length>0&&(s.reply.reply_list[0].time=u(s.reply.reply_list[0].create_time),
s.reply.reply_list[0].content=(s.reply.reply_list[0].content||"").htmlEncodeLite(),
s.reply.reply_list[0].reply_like_status=s.reply.reply_list[0].reply_like_status||0,
s.reply.reply_list[0].reply_like_num=s.reply.reply_list[0].reply_like_num||0,s.reply.reply_list[0].reply_like_num_format=parseInt(s.reply.reply_list[0].reply_like_num)>=1e4?(s.reply.reply_list[0].reply_like_num/1e4).toFixed(1)+"万":s.reply.reply_list[0].reply_like_num),
s.new_appmsg=window.new_appmsg,m+=N.tmpl(z,s);
try{
var _=s.nick_name+s.content,r=!1,p=Y.repeatContentID;
nt[_]&&(r=!0,p=Y.repeatContent),tt.indexOf(s.content_id)>-1&&(r=!0,p=Y.repeatContentID),
tt.push(s.content_id),nt[_]=!0,r&&l(p,encodeURIComponent(JSON.stringify({
comment_id:R,
content_id:s.content_id,
offset:X,
length:e.length,
url:location.href
})));
}catch(g){}
}
for(i.innerHTML=m,f(i);o=i.children.item(0);)t.appendChild(o);
}
function f(e){
W.each(e.querySelectorAll("div.discuss_message_content"),function(e){
e.innerHTML=Q.encode(e.innerHTML);
});
}
function y(e){
return setTimeout(function(){
o(e);
});
}
function w(){
var e="1"===M.getParam("js_my_comment");
e&&h(!0);
}
function h(e){
J=window.pageYOffset||document.documentElement.scrollTop,i(et.article),m(et.mine),
window.__second_open__&&S.os.ios&&m(et.fakebar),window.scrollTo(0,0),p(),e||W.later(function(){
et.input.focus();
});
}
function j(){
i(et.mine),m(et.article),console.log(J),window.scrollTo(0,J),et.input.blur();
}
function b(e){
var t=e.delegatedTarget||e.srcElement,n=null;
if(T.hasClass(t,"js_comment_praise")&&(n=t),n){
for(var o=parseInt(n.dataset.status),m=0==o?1:0,i=n.dataset.contentId,c=n.dataset.scene,d=document.querySelectorAll('.js_comment_praise[data-content-id="'+i+'"]'),s=0;s<d.length;s++)E(d[s]);
if(window.test_comment_data)return;
F({
url:"/mp/appmsg_comment?action=likecomment",
type:"POST",
data:{
like:m,
__biz:biz,
appmsgid:appmsgid,
comment_id:R,
content_id:i,
item_show_type:window.item_show_type||0,
scene:c
}
});
}
}
function I(e){
for(var t=e.delegatedTarget,n=parseInt(t.dataset.status),o=n?0:1,m=t.dataset.contentId,i=t.dataset.replyId,c=t.dataset.scene,d=document.querySelectorAll('.js_reply_praise[data-content-id="'+m+'"]'),s=0;s<d.length;s++)E(d[s]);
document.querySelector("meta[name=viewport]"),window.test_comment_data||F({
url:"/mp/appmsg_comment?action=like_author_reply",
type:"post",
data:{
__biz:biz,
comment_id:R,
content_id:m,
reply_id:i,
like:o,
scene:c,
item_show_type:window.item_show_type||0
}
});
}
function E(e){
var t=T.hasClass(e,"praised"),n=e.querySelector(".praise_num"),o=n.innerHTML,m=o.indexOf("万"),i=parseInt(o)?parseInt(o):0;
t?(-1==m&&(n.innerHTML=i-1>0?i-1:""),T.removeClass(e,"praised"),e.dataset.status=0):(-1==m&&(n.innerHTML=i+1),
T.addClass(e,"praised"),e.dataset.status=1);
}
function v(){
et.list.children.length?et.fdlist.children.length?(m(document.getElementById("js_cmt_addbtn3")),
i(document.getElementById("js_cmt_addbtn1")),i(document.getElementById("js_cmt_addbtn2")),
i(document.getElementById("js_cmt_addbtn4"))):(m(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn2")),i(document.getElementById("js_cmt_addbtn3")),
i(document.getElementById("js_cmt_addbtn4"))):et.fdlist.children.length?(m(document.getElementById("js_cmt_addbtn3")),
i(document.getElementById("js_cmt_addbtn4")),i(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn2"))):(m(document.getElementById("js_cmt_addbtn2")),
i(document.getElementById("js_cmt_addbtn3")),i(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn4")));
}
function k(e){
var t=e.delegatedTarget,n=t.getAttribute("data-my-id"),m="/mp/appmsg_comment?action=delete&scene="+Y.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&comment_id="+R+"&my_id="+n;
confirm("确定删除吗？")&&F({
url:m,
success:function(e){
var m,c=t;
try{
e=JSON.parse(e);
}catch(d){
e={};
}
if(0==e.ret){
for(;c&&(c.nodeType!=c.ELEMENT_NODE||"li"!=c.tagName.toLowerCase());)c=c.parentNode;
if(c){
c.parentNode.removeChild(c),m=document.getElementById("cid"+n);
for(var s=document.querySelectorAll(".cid"+n),l=0;l<s.length;l++)s[l].parentNode.removeChild(s[l]);
0==et.list.children.length?(i(et.main),i(document.getElementById("js_cmt_statement")),
i(document.getElementById("js_cmt_qa")),0==et.fdlist.children.length&&i(et.fdmain)):0==et.fdlist.children.length&&i(et.fdmain),
0==et.mylist.children.length&&i(et.mylist.parentNode),et.list.children.length+et.fdlist.children.length==0,
v();
}
}else o("删除失败，请重试");
},
error:function(){
o("网络错误，请重试");
}
});
}
function B(e){
e&&e.preventDefault(),j(),i(et.fakebar);
}
function C(){
try{
var e=et.loading.getBoundingClientRect(),t=Math.random()<1;
e.top<window.innerHeight&&$&&t&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_45_1&lc=1&log0",
A.off(window,"scroll",C));
}catch(n){}
}
function D(e){
var t=document.createElement("a");
t.setAttribute("href",e),this.el=t,this.parser=this.el,this.getParam=function(e){
var t=new RegExp("([?&])"+e+"=([^&#]*)([&#])?"),n=this.el.search.match(t);
return n?n[2]:null;
};
}
var T=e("biz_common/dom/class.js"),z=e("appmsg/cmt_tpl.html.js"),x=document.getElementById("js_cmt_area"),L=document.getElementById("js_friend_cmt_area"),M=new D(window.location.href),q=e("biz_common/utils/wxgspeedsdk.js"),H=e("appmsg/comment_report.js"),O=location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,S=e("biz_wap/utils/device.js"),R=0;
if(window._has_comment=!0,"undefined"!=typeof window.comment_id?R=window.comment_id:window.cgiData&&"undefined"!=typeof window.cgiData.comment_id&&(R=window.cgiData.comment_id),
!!O&&console.log("comment_id:"+R+";uin:"+uin+";key:"+key),-1!=navigator.userAgent.indexOf("MicroMessenger")||window.test_comment_data||(x&&(x.style.display="none"),
L&&(L.style.display="none"),R=0,window._has_comment=!1),0==R)return void(window._has_comment=!1);
var A=e("biz_common/dom/event.js"),F=e("biz_wap/utils/ajax.js"),N=(e("biz_common/utils/string/html.js"),
e("biz_common/tmpl.js")),U=e("biz_wap/utils/fakehash.js"),P=e("appmsg/log.js"),Y={
scene:0,
idkey:"",
moreList:27,
repeatList:25,
errList:18,
handleList:26,
addCommentErr:19,
errComment:18,
repeatContent:24,
repeatContentID:23
},J=null;
window.__commentReportData&&window.__commentReportData.idkey&&(!!O&&console.log("init reportData"),
Y=window.__commentReportData),function(){
if(x){
var t=e("appmsg/comment_tpl.html.js");
x.innerHTML=N.tmpl(t,{
new_appmsg:window.new_appmsg
});
}
if(L){
var n=e("appmsg/friend_comment_tpl.html.js");
L.innerHTML=N.tmpl(n,{
new_appmsg:window.new_appmsg
});
}
}(),function(){
var t=e("appmsg/my_comment_tpl.html.js"),n=document.createElement("div");
n.innerHTML=N.tmpl(t,{
new_appmsg:window.new_appmsg,
friend_comment_enabled:window.friend_comment_enabled,
isIos:S.os.ios
}),document.body.appendChild(n);
}();
var Q=e("appmsg/emotion/emotion.js"),W=e("appmsg/emotion/dom.js"),X=(new Image,0),Z=100,$=!1,G="",K="我",V=0,et={
article:document.getElementById("js_article"),
mine:document.getElementById("js_cmt_mine"),
main:document.getElementById("js_cmt_main"),
input:document.getElementById("js_cmt_input"),
submit:document.getElementById("js_cmt_submit"),
goback:document.getElementById("js_cmt_goback"),
addbtn:document.getElementById("js_cmt_addbtn"),
list:document.getElementById("js_cmt_list"),
mylist:document.getElementById("js_cmt_mylist"),
morelist:document.getElementById("js_cmt_morelist"),
toast:document.getElementById("js_cmt_toast"),
tips:document.getElementById("js_cmt_tips"),
loading:document.getElementById("js_cmt_loading"),
fdmain:document.getElementById("js_friend_cmt_main"),
fdlist:document.getElementById("js_friend_cmt_list"),
fdlisthide:document.getElementById("js_friend_cmt_list_hide"),
morefdlist:document.getElementById("js_more_friend_cmt_area"),
morefd:document.getElementById("js_more_friend_cmt"),
fakebar:document.getElementById("js_fake_bar")
},tt=[],nt={},ot=(new Image,[]),mt=0,it=0,ct=null,dt=+new Date;
if(window.__second_open__&&S.os.ios&&(et.mine.style.marginBottom=getComputedStyle(et.fakebar).height),
function(){
a(),w(),Q.init();
}(),U.on("comment",function(){
!!O&&console.log("FakeHash on comment"),h();
}),U.on("article",function(){
!!O&&console.log("FakeHash on article"),j();
}),U.on(function(e){
"comment"==e&&j();
}),A.on(et.input,"input",function(){
var e=d(et.input.value);
e.length<1?T.addClass(et.submit,"btn_disabled"):T.removeClass(et.submit,"btn_disabled");
}),A.on(et.list,"tap",".js_comment_praise",b),A.on(et.mylist,"tap",".js_comment_praise",b),
A.on(et.fdlist,"tap",".js_comment_praise",b),A.on(et.list,"tap",".js_reply_praise",I),
A.on(et.fdlist,"tap",".js_reply_praise",I),A.on(et.list,"tap",".js_del",k),A.on(et.mylist,"tap",".js_del",k),
A.on(et.fdlist,"tap",".js_del",k),A.on(et.list,"tap",".js_del",function(e){
e.preventDefault();
}),A.on(et.mylist,"tap",".js_del",function(e){
e.preventDefault();
}),A.on(et.fdlist,"tap",".js_del",function(e){
e.preventDefault();
}),A.on(et.submit,"tap",r),A.on(et.submit,"click",function(e){
e.preventDefault();
}),et.goback&&(A.on(et.goback,"tap",B),A.on(et.goback,"click",B)),window.__second_open__&&S.os.ios){
A.on(et.input,"tap",function(){
i(et.fakebar);
}),A.on(et.input,"blur",function(){
console.log("input blur"),"none"!=et.mine.style.display&&m(et.fakebar);
});
var st=null,lt=null;
A.on(window,"orientationchange",function(){
"none"!==et.fakebar.style.display&&(clearTimeout(st),st=setTimeout(function(){
window.innerWidth!==parseFloat(getComputedStyle(et.fakebar).width)&&(clearTimeout(lt),
et.mine.style.height=window.innerHeight+"px",window.scrollBy&&window.scrollBy(0,1),
lt=setTimeout(function(){
window.scrollBy&&window.scrollBy(0,-1),et.mine.style.height="";
},100));
},50));
});
}
A.on(window,"scroll",a),A.on(window,"scroll",C),A.on(document.getElementById("js_cmt_write1"),"click",function(e){
e.preventDefault(),window.__second_open__&&S.os.ios?h():(!!O&&console.log("push comment"),
U.push("comment"));
}),A.on(document.getElementById("js_cmt_write2"),"click",function(e){
e.preventDefault(),window.__second_open__&&S.os.ios?h():(!!O&&console.log("push comment"),
U.push("comment"));
}),A.on(document.getElementById("js_cmt_write3"),"click",function(e){
e.preventDefault(),window.__second_open__&&S.os.ios?h():(!!O&&console.log("push comment"),
U.push("comment"));
}),A.on(document.getElementById("js_cmt_write4"),"click",function(e){
e.preventDefault(),window.__second_open__&&S.os.ios?h():(!!O&&console.log("push comment"),
U.push("comment"));
}),new H({
comment_id:R,
appmsgid:appmsgid,
idx:idx,
item_show_type:window.item_show_type||0,
biz:biz
});
});define("appmsg/my_comment_tpl.html.js",[],function(){
return'<!-- 发表留言 -->\n<#if(window.new_appmsg){#>\n  <div id="js_cmt_mine" class="discuss_container_wrp" style="display:none;">\n    <div class="discuss_container editing access">\n        <div class="discuss_container_inner">\n            <h2 class="rich_media_title"><#=window.msg_title#></h2>\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <#if(window.friend_comment_enabled == 1){#>\n                    <!-- <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言对朋友可见，被公众号筛选后，将对所有人可见。"></textarea> -->\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}else{#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}#>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                        </span>\n                        <div class="emotion_panel" id="js_emotion_panel">\n                            <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                                <i class="emotion_panel_arrow arrow_out"></i>\n                                <i class="emotion_panel_arrow arrow_in"></i>\n                            </span>\n                            <div class="emotion_list_wrp" id="js_slide_wrapper">\n                                <!--<ul class="emotion_list"></ul>-->\n                                <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                            </div>\n                            <ul class="emotion_navs" id="js_navbar">\n                                <!--<li class="emotion_nav"></li>-->\n                            </ul>\n                        </div>\n                    </div>\n                </span>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">留言</a></div>\n            <#if(isIos){#>\n            <!-- <div class="discuss_btn_wrp"><a id="js_cmt_goback" class="btn btn_primary btn_discuss" href="##">返回</a></div> -->\n            <#}#>\n            <div class="discuss_list_wrp" style="display:none">\n                <div class="mod_title_context">\n                    <strong class="mod_title">我的留言</strong>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="weui-loadmore" id="js_mycmt_loading">\n                <i class="weui-loading"></i>\n                <span class="weui-loadmore__tips">正在加载</span>\n            </div>\n            <div id="js_cmt_toast" style="display: none;">\n                <div class="weui-mask_transparent"></div>\n                <div class="weui-toast">\n                    <i class="weui-icon-success-no-circle weui-icon_toast"></i>\n                    <p class="weui-toast__content">已留言</p>\n                </div>\n            </div>\n        </div>\n    </div>\n  </div>\n<#}else{#>\n    <div id="js_cmt_mine" class="discuss_container editing access" style="display:none;">\n        <div class="discuss_container_inner">\n            <h2 class="rich_media_title"><#=window.msg_title#></h2>\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <#if(window.friend_comment_enabled == 1){#>\n                    <!-- <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言对朋友可见，被公众号筛选后，将对所有人可见。"></textarea> -->\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}else{#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}#>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                        </span>\n                        <div class="emotion_panel" id="js_emotion_panel">\n                            <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                                <i class="emotion_panel_arrow arrow_out"></i>\n                                <i class="emotion_panel_arrow arrow_in"></i>\n                            </span>\n                            <div class="emotion_list_wrp" id="js_slide_wrapper">\n                                <!--<ul class="emotion_list"></ul>-->\n                                <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                            </div>\n                            <ul class="emotion_navs" id="js_navbar">\n                                <!--<li class="emotion_nav"></li>-->\n                            </ul>\n                        </div>\n                    </div>\n                </span>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">留言</a></div>\n            <div class="discuss_list_wrp" style="display:none">\n                <div class="rich_tips with_line title_tips discuss_title_line">\n                    <span class="tips">我的留言</span>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="rich_tips tips_global loading_tips" id="js_mycmt_loading">\n                <img src="<#=window.icon_loading_white#>" class="rich_icon icon_loading_white" alt="">\n                <span class="tips">加载中</span>\n            </div>\n            <div class="wx_poptips" id="js_cmt_toast" style="display:none;">\n                <img alt="" class="icon_toast" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABqCAYAAABUIcSXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyMTUxMzkxZS1jYWVhLTRmZTMtYTY2NS0xNTRkNDJiOGQyMWIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTA3QzM2RTg3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTA3QzM2RTc3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWMyOGVjZTMtNzllZS00ODlhLWIxZTYtYzNmM2RjNzg2YjI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIxNTEzOTFlLWNhZWEtNGZlMy1hNjY1LTE1NGQ0MmI4ZDIxYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmvxj1gAAAVrSURBVHja7J15rF1TFMbXk74q1ZKHGlMkJVIhIgg1FH+YEpEQJCKmGBpThRoSs5jVVNrSQUvEEENIhGiiNf9BiERICCFIRbUiDa2qvudbOetF3Tzv7XWGffa55/uS7593977n3vO7e5+199p7v56BgQGh0tcmvAUERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERVAUQVEERVAUQbVYk+HdvZVG8b5F0xj4RvhouB+eCy8KrdzDJc1RtAX8ILxvx98V1GyCSkN98Cx4z/95/Wn4fj6j6tUEeN4wkFSnw1MJqj5NhBfAuwaUHREUg4lqNMmePVsHll/HFhVfe1t3FwpJI8DXCCquDrCWNN4B6Tb4M3Z98aTPmTvh0YHl18PXw29yZiKejoPvcUD6E74yFBJbVDk6Bb7K8aP/Hb4c/tRzEYIqprPhSxzlf4Uvhb/0Xoig8qnHAJ3lqPMzfDH8XZ4LEpRf2sVdA5/sqPO9Qfop70UJyn+/boaPddT5yrq7VUUvTIVJI7q74MMddXR8NB1eXcYvhBpZm0s2w72/o86HFoKvLau/pYaXzjLMdUJ6y0LwtWV9CIIaXtvA8+G9HHV03u5q+K+yH47U0NoRngPv7KjzHDwTLj0bS1BDazfJJlcnOOostC6ysnCT+q80G/sIvFVgeW09D8FPVT0uoP7VfvAD8NjA8pqmuAN+OcYAjso0RbIZ8DGB5TVNcRO8JMaHY9SXSdfa3eeANJimWBLrA7JFiZwIXye+NMUV8CcxP2SRFjXefok7NRjSGZJlWUPvw2/wtNiQirSoXWyMsR28wR7AzzYM0oXw+Y7yK+CLJGeaoqjyrJSdZJD6Ov4+z5y6NJc0Az7NUecHydIUy+v60KNyQHoM3nKI1y7YCFiq0i7uBvgER52vDdKqWn9djhY1Dn4G3n6Ecqm2rF74dvgoR53S0hQxW9RJAZAGW5bSn58QJA27dQ7uIEedjywEX5NKVxCqsY6y+qA+LxFI4+yZ6oH0trWkNan80jygtIUsc5SflgAsDXgehfdx1KkkTRE76tN+Xue2jnTU0Ru1oIbvpt30bBtKhOp5yaaRkts0lic8V1i6dPcIRx2d/l8Y8XtNNEg7OOo8bl1kmmOKnDsO88CaYzejau0hWZqiL7C83oCH4SeTHvwV2BqqsHRVztSEYOmWF80NeXZT6Hd4KflResE9vCnBOlCyGfDNAstHTVPUDWoQ1t3iW+9WNizvlhfd4aerXd+ThqiMfNR6+9LvOOro5OY5JX2H4+F7HZD+kGzlamMgldWiirQsjcwWFbjmqZJteekJLK9pisvgL6RhKvuciZiwzrWWGapfrPy30kBVcSBIrw0aD3PU0XB6cehntq7rTMf7/2iQlktDVdXJLXlg6VjmiYBn6rWSTRCH6hvJ0hQrpcGq8oidsmHpTP8t8DGO9/vcWt9qabiqPgup1yKyQwvC2tSefZ73SSpNkUJ4PlLorlHZ+446nc8f3fIyywlJhwrTuwVSjBa1ccvSxN0hjjoK5xVrYZMd9V6XbFfgBukixTwGLg8sDam3dZR/wZ6L/dJlin1en8LS+bgpFbz3Ygvzu1J1HKxYNqxGpCmaCEo12rrBorD6LRp8UbpcdR5VWhTW35KlKd6QFqjuM2XzwlpnMxTvSkuUwuG/Xlg6NtPjbT6WFimF/VG6LEvXgn8QGDjMbBukVECFwhpoS+CQatfX2Q1q6H7wENHdrfCr0lKleEB9JyxNneus+VJpsVL9TwI6W65LovWIGl3KtVJaLv7LBwYTFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFFWq/hFgADUMN4RzT6/OAAAAAElFTkSuQmCC">\n                <p class="toast_content">已留言</p>\n            </div>\n        </div>\n    </div>\n<#}#>\n<div class="weui-webview-nav" style="display:none;background-color: #f2f2f2;" id="js_fake_bar">\n    <button class="weui-webview-nav__btn_goback" id="js_cmt_goback">goback</button>\n    <button class="weui-webview-nav__btn_forward weui-webview-nav__btn_disabled" disabled="disabled">forward</button>\n</div>';
});define("appmsg/cmt_tpl.html.js",[],function(){
return'<#if(window.new_appmsg){#>\n<li class="js_comment_item discuss_item cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" data-elected="<#=report_elected#>" data-friend="<#=report_friend#>" data-content_id="<#=content_id#>">\n    <# if(is_elected == 1){ #>\n    <div class="discuss_opr">\n        <span class="media_tool_meta meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\' data-scene="<#=scene#>">\n            <i class="icon_praise_gray"></i>\n            <span class="praise_num"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span>\n        </span>\n    </div>\n    <# } #>\n    <div class="user_info">\n        <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(朋友)<# } #></strong>\n        <img class="avatar" src="<#=logo_url#>">\n        <# if(typeof is_top === \'number\' && is_top == 1){ #><span class="icon_appmsg_tag">置顶</span><# } #>\n    </div>\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content"><#=content#></div>\n    </div>\n    <# if (is_from_me == 1) { #>\n    <p class="discuss_extra_info">\n        <!-- <#=time#> -->               \n        <a class="discuss_del js_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>\n    </p>\n    <# } #>\n    <# if(reply && reply.reply_list && reply.reply_list.length > 0){ #>\n        <div class="reply_result">\n            <div class="discuss_opr">\n                <span class="media_tool_meta meta_praise js_reply_praise <# if(reply.reply_list[0].reply_like_status == 1){ #>praised<# } #>" data-status="<#=reply.reply_list[0].reply_like_status#>" data-content-id="<#=content_id#>" data-reply-id=\'<#=reply.reply_list[0].reply_id#>\' data-scene="<#=scene#>">\n                    <i class="icon_praise_gray"></i>\n                    <span class="praise_num"><# if(reply.reply_list[0].reply_like_num_format !== 0){ #><#=reply.reply_list[0].reply_like_num_format#> <# } #></span>\n                </span>\n            </div>\n            <#if(window.new_appmsg){#>\n            <div class="nickname">作者</div>\n            <#}else{#>\n            <div class="nickname">作者回复</div>\n            <# } #>\n            <div class="discuss_message">\n                <div class="discuss_message_content"><#=reply.reply_list[0].content#></div>\n            </div>\n            <!-- <p class="discuss_extra_info"><#=reply.reply_list[0].time#></p> -->\n        </div>\n    <# } #>\n        \n</li>\n<#}else{#>\n<li class="js_comment_item discuss_item cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" data-elected="<#=report_elected#>" data-friend="<#=report_friend#>" data-content_id="<#=content_id#>">\n    <# if(is_elected == 1){ #>\n    <div class="discuss_opr">\n        <span class="media_tool_meta tips_global meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\' data-scene="<#=scene#>">\n            <i class="icon_praise_gray"></i>\n            <span class="praise_num"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span>\n        </span>\n    </div>\n    <# } #>\n    <div class="user_info">\n        <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(朋友)<# } #></strong>\n        <img class="avatar" src="<#=logo_url#>">\n        <# if(typeof is_top === \'number\' && is_top == 1){ #><span class="icon_discuss_top">置顶</span><# } #>\n    </div>\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content"><#=content#></div>\n    </div>\n    <p class="discuss_extra_info">\n        <#=time#>               \n        <# if (is_from_me == 1) { #>\n        <a class="discuss_del js_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>\n        <# } #>\n    </p>\n    <# if(reply && reply.reply_list && reply.reply_list.length > 0){ #>\n        <div class="reply_result">\n            <div class="discuss_opr">\n                <span class="media_tool_meta tips_global meta_praise js_reply_praise <# if(reply.reply_list[0].reply_like_status == 1){ #>praised<# } #>" data-status="<#=reply.reply_list[0].reply_like_status#>" data-content-id="<#=content_id#>" data-reply-id=\'<#=reply.reply_list[0].reply_id#>\' data-scene="<#=scene#>">\n                    <i class="icon_praise_gray"></i>\n                    <span class="praise_num"><# if(reply.reply_list[0].reply_like_num_format !== 0){ #><#=reply.reply_list[0].reply_like_num_format#> <# } #></span>\n                </span>\n            </div>\n            <#if(window.new_appmsg){#>\n            <div class="nickname">作者</div>\n            <#}else{#>\n            <div class="nickname">作者回复</div>\n            <# } #>\n            <div class="discuss_message">\n                <div class="discuss_message_content"><#=reply.reply_list[0].content#></div>\n            </div>\n            <p class="discuss_extra_info"><#=reply.reply_list[0].time#></p>\n        </div>\n    <# } #>\n        \n</li>\n<#}#>\n';
});define("sougou/a_tpl.html.js",[],function(){
return'<h3 class="rich_media_area_title">相关文章</h3>\n<ul class="relate_article_list">\n    <# for(var i in list){#>\n    <li class="relate_article_item">\n        <a class="relate_article_link sg_link" href="<#=list[i].url#>" target="_blank"><#=list[i].title#></a>\n    </li>\n    <#}#>\n</ul>\n';
});define("appmsg/emotion/emotion.js",["appmsg/emotion/dom.js","appmsg/emotion/slide.js","appmsg/emotion/common.js","appmsg/emotion/nav.js","appmsg/emotion/textarea.js","biz_common/utils/emoji_data.js","biz_common/utils/emoji_panel_data.js"],function(n,t){
"use strict";
function i(){
v.WIDTH=S=_("#js_article").width()||_("#js_cmt_mine").width(),v.pageCount=z=e(),
o(),a(),s();
}
function e(){
d=S-2*P,C=parseInt(d/W),M=3*C-1;
var n=parseInt(R/M);
return R%M!==0&&n++,n;
}
function o(){
var n=_("#js_slide_wrapper"),t=v.wrapperWidth=z*S;
n.css({
width:t+"px"
});
}
function a(){
for(var n=_("#js_slide_wrapper").el[0],t=(S-C*W)/2,i=0,e=z;e>i;i++){
var o=document.createElement("ul");
o.setAttribute("class","emotion_list"),n.appendChild(o),_(o).css({
width:S+"px",
"float":"left",
"padding-left":t+"px",
"padding-right":"0"
}),c(o,i,t);
}
}
function s(){
for(var n=_("#js_navbar"),t=0,i=z;i>t;t++){
var e=_(_.el("li"));
e.attr("class","emotion_nav js_emotion_nav"),D.push(e),n.append(e);
}
v.navs=D;
}
function c(n,t,i){
for(var e=0,o=M;o>e;e++){
var a=document.createElement("li");
if(y++,y>R)break;
a=r(y),_(n).append(a);
}
var s=m(i);
_(n).append(s);
}
function r(n){
var t=_(_.el("li")),i=_(_.el("i")),e=0;
i.attr("class","icon_emotion icon"+n),i.css({
"background-position":"0px "+((1-n)*Z-e)+"px"
}),t.attr("class","emotion_item js_emotion_item"),t.attr("data-index",n);
var o=W+"px";
return t.css({
width:o,
height:o
}),t.append(i),t;
}
function m(n){
var t=_(_.el("li")),i=_(_.el("i"));
t.attr("class","emotion_item del js_emotion_item"),t.attr("data-index",-1),i.attr("class","icon_emotion del");
var e=W+"px";
return t.css({
width:e,
height:e,
right:n+"px"
}),t.append(i),t;
}
function p(){
function n(){
o.show(),w.show(),e.blur(),_.later(function(){
e.blur();
});
}
function t(){
o.hide(),w.hide(),e.focus(),_.later(function(){
e.focus();
});
}
w=_("#js_emotion_panel");
var i=_("#js_cmt_input"),e=i.el[0],o=_("#js_emotion_panel_arrow_wrp");
w.hide(),_("#js_emotion_switch").on("tap",function(i){
console.log("emotion click"),i.preventDefault(),i.stopPropagation(),g=!g,g?n():t();
}),i.on("tap",function(){
w.hide(),g=!1;
});
}
function l(){
function n(n){
if(!v.isMoved){
var t=_(n.currentTarget),i=+t.attr("data-index");
h.inputEmotion(i);
}
}
_("li.js_emotion_item").on("click",n),_("li.js_emotion_item").on("touchend",n);
}
function u(n){
for(var t=[],i=0;i<x.length;i++){
var e=x[i];
if(e.cn){
var o=new RegExp(e.cn.replace("[","\\[").replace("]","\\]"),"g"),a=n.match(o);
a&&(t=t.concat(a));
}
if(e.emoji){
var o=new RegExp(e.emoji,"g"),a=n.match(o);
a&&(t=t.concat(a));
}
}
return _.each(t,function(t){
if(void 0!==I[t]){
var i=I[t],e=O[i],o='<i class="icon_emotion_single '+e+'"></i>';
n=n.replace(t,o);
}
}),n;
}
for(var d,_=n("appmsg/emotion/dom.js"),f=n("appmsg/emotion/slide.js"),v=n("appmsg/emotion/common.js"),j=n("appmsg/emotion/nav.js"),h=n("appmsg/emotion/textarea.js"),t=(_.each,
{}),g=!1,w=null,x=n("biz_common/utils/emoji_data.js"),b=n("biz_common/utils/emoji_panel_data.js"),E={},I={},O=[],T=0;T<x.length;T++){
var N=x[T];
E[N.id]=N;
}
for(var T=0;T<b.length;T++){
var k=b[T],N=E[k];
I[N.cn]=T,N.emoji&&(I[N.emoji]=T),O.push(N.style);
}
var z,M,C,S,D=[],P=15,R=v.EMOTIONS_COUNT,W=v.EMOTION_LI_SIZE,Z=v.EMOTION_SIZE;
t.init=function(){
p(),i(),f.init(),j.activeNav(0),l(),h.init();
};
var y=0;
return t.encode=function(n){
n=u(n);
var t=/\/([\u4e00-\u9fa5\w]{1,4})/g,i=n.match(t);
return i?(_.each(i,function(t){
var i=t.replace("/",""),e=[i.slice(0,4),i.slice(0,3),i.slice(0,2),i.slice(0,1)];
_.each(e,function(t){
if(void 0!==I["["+t+"]"]){
var i=I["["+t+"]"],e=O[i],o='<i class="icon_emotion_single '+e+'"></i>';
n=n.replace("/"+t,o);
}
});
}),n):n;
},t.hidePannel=function(){
w.hide();
},t;
});define("biz_common/base64.js",[],function(r,t,n){
"use strict";
var e,c="2.1.9";
if("undefined"!=typeof n&&n.exports)try{}catch(o){}
var u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=function(r){
for(var t={},n=0,e=r.length;e>n;n++)t[r.charAt(n)]=n;
return t;
}(u),h=String.fromCharCode,i=function(r){
if(r.length<2){
var t=r.charCodeAt(0);
return 128>t?r:2048>t?h(192|t>>>6)+h(128|63&t):h(224|t>>>12&15)+h(128|t>>>6&63)+h(128|63&t);
}
var t=65536+1024*(r.charCodeAt(0)-55296)+(r.charCodeAt(1)-56320);
return h(240|t>>>18&7)+h(128|t>>>12&63)+h(128|t>>>6&63)+h(128|63&t);
},f=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,A=function(r){
return r.replace(f,i);
},d=function(r){
var t=[0,2,1][r.length%3],n=r.charCodeAt(0)<<16|(r.length>1?r.charCodeAt(1):0)<<8|(r.length>2?r.charCodeAt(2):0),e=[u.charAt(n>>>18),u.charAt(n>>>12&63),t>=2?"=":u.charAt(n>>>6&63),t>=1?"=":u.charAt(63&n)];
return e.join("");
},g=function(r){
return r.replace(/[\s\S]{1,3}/g,d);
},s=e?function(r){
return(r.constructor===e.constructor?r:new e(r)).toString("base64");
}:function(r){
return g(A(r));
},C=function(r,t){
return t?s(String(r)).replace(/[+\/]/g,function(r){
return"+"==r?"-":"_";
}).replace(/=/g,""):s(String(r));
},l=function(r){
return C(r,!0);
},p=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),S=function(r){
switch(r.length){
case 4:
var t=(7&r.charCodeAt(0))<<18|(63&r.charCodeAt(1))<<12|(63&r.charCodeAt(2))<<6|63&r.charCodeAt(3),n=t-65536;
return h((n>>>10)+55296)+h((1023&n)+56320);

case 3:
return h((15&r.charCodeAt(0))<<12|(63&r.charCodeAt(1))<<6|63&r.charCodeAt(2));

default:
return h((31&r.charCodeAt(0))<<6|63&r.charCodeAt(1));
}
},b=function(r){
return r.replace(p,S);
},v=function(r){
var t=r.length,n=t%4,e=(t>0?a[r.charAt(0)]<<18:0)|(t>1?a[r.charAt(1)]<<12:0)|(t>2?a[r.charAt(2)]<<6:0)|(t>3?a[r.charAt(3)]:0),c=[h(e>>>16),h(e>>>8&255),h(255&e)];
return c.length-=[0,0,2,1][n],c.join("");
},F=function(r){
return r.replace(/[\s\S]{1,4}/g,v);
},j=e?function(r){
return(r.constructor===e.constructor?r:new e(r,"base64")).toString();
}:function(r){
return b(F(r));
},m=function(r){
return j(String(r).replace(/[-_]/g,function(r){
return"-"==r?"+":"/";
}).replace(/[^A-Za-z0-9\+\/]/g,""));
};
return{
VERSION:c,
atob:F,
btoa:g,
fromBase64:m,
toBase64:C,
utob:A,
encode:C,
encodeURI:l,
btou:b,
decode:m
};
});define("biz_wap/utils/wapsdk.js",["biz_common/utils/wxgspeedsdk.js"],function(e){
"use strict";
function s(e){
var s=.001;
"number"==typeof e.sample&&(s=e.sample);
var n=Math.random();
s>n&&o.saveSpeeds(e);
}
function n(e){
var s=e.sample||.001,n=Math.random();
s>n&&o.setBasicTime(e);
}
function i(){
o.send();
}
function a(e){
var e=e||[];
if(!e.length){
var s=e;
e=[],e.push(s);
}
for(var n=[],i=0;i<e.length;i++){
var s=e[i],a=s.id,o=s.key,t=s.value||1;
a&&o&&n.push(a+"_"+o+"_"+t);
}
0!=n.length&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey="+n.join(";"));
}
var o=e("biz_common/utils/wxgspeedsdk.js");
return{
saveSpeeds:s,
setBasicTime:n,
send:i,
jsmonitor:a
};
});define("biz_common/utils/report.js",[],function(){
"use strict";
return function(n){
var e=new Image;
e.src=n;
};
});define("appmsg/articleReport.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/mmversion.js"],function(i){
"use strict";
function n(i){
i.dom&&(i.dom.style.display="",t.tap(i.dom,function(){
var n=["https://mp.weixin.qq.com/mp/infringement?url=",encodeURIComponent(i.link.htmlDecode()),"&title=",encodeURIComponent(i.title),"&__biz=",window.biz].join("");
return location.href=n+"#wechat_redirect",!1;
}));
}
i("biz_common/utils/string/html.js");
{
var t=i("biz_common/dom/event.js"),e=i("biz_wap/utils/mmversion.js");
({
not_in_mm:!e.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger")
});
}
return{
init:n
};
});