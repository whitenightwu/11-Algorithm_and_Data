define("appmsg/reward_entry.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","rt/appmsg/getappmsgext.rt.js","biz_wap/utils/mmversion.js","appmsg/appmsgext.js"],function(e,t,r,a){
"use strict";
function n(e){
e&&(e.style.display="block");
}
function d(e){
e&&(e.style.display="none");
}
function i(){
f.getData({
biz:biz,
appmsg_type:appmsg_type,
mid:mid,
sn:sn,
idx:idx,
scene:source,
title:msg_title,
ct:ct,
devicetype:devicetype,
version:version,
is_need_reward:is_need_reward,
reward_uin_count:is_need_reward?3*c:0,
send_time:window.send_time||"",
rtId:"27613",
rtKey:"50",
onSuccess:function(e){
e&&(document.getElementById("js_reward_link")&&u.off(document.getElementById("js_reward_link"),"click",I),
document.getElementById("js_reward_avatar")&&u.off(document.getElementById("js_reward_avatar"),"click",b),
s({
reward_total:e.reward_total_count,
reward_head_imgs:e.reward_head_imgs||[],
can_reward:e.can_reward,
timestamp:e.timestamp,
reward_author_head:e.reward_author_head,
rewardsn:e.rewardsn
}));
},
onError:function(){}
});
}
function o(e){
return function(t){
return"0"==window.wx_user_can_reward?void a("你已成为该公众号的黑名单用户，暂时无法赞赏。"):(t.preventDefault(),
-1==e.indexOf("&__tc=1")&&window.__addIdKeyReport?window.__addIdKeyReport("110809",2):window.__addIdKeyReport&&window.__addIdKeyReport("110809",3),
void g.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
t.err_msg.indexOf(":ok")>-1||(location.href=e);
}));
};
}
function s(e){
var t=window.innerWidth||document.documentElement.innerWidth,r=(Math.ceil((v-188)/42)+1)*Math.floor((t-15)/42);
l="http://mp.weixin.qq.com/mp/reward?act=getrewardheads&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&offset=0&count="+r+"&source=1#wechat_redirect";
var a="#wechat_redirect",s="";
s="https://mp.weixin.qq.com/mp/author?action=show&__biz="+biz+"&appmsgid="+mid+"&timestamp="+e.timestamp+"&author_id="+author_id+"&idx="+idx+"&scene=142&rscene=128",
e.rewardsn&&(s+="&rewardsn="+e.rewardsn),s+=a,-1==navigator.userAgent.indexOf("Android")||author_id||(s="https://mp.weixin.qq.com/bizmall/reward?act=showpage&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&timestamp="+e.timestamp+"&showwxpaytitle=1&rewardsn="+e.rewardsn+a);
var _=document.getElementById("js_reward_link"),c=document.getElementById("js_reward_avatar");
if(_&&(g.on("activity:state_change",function(e){
if("onResume"==e.state_change||"onResume"==e.state){
var t=(new Date).valueOf();
if(-1!=navigator.userAgent.indexOf("Android")&&localStorage.getItem("lastOnresumeTime")&&t-parseInt(localStorage.getItem("lastOnresumeTime"))<=x)return;
localStorage.setItem("lastOnresumeTime",t),h.isAndroid&&!author_id&&g.invoke("setNavigationBarColor",{
actionCode:"1"
}),i();
}
}),I=o(s.replace(a,"&__tc=1"+a)),b=o(s),u.on(_,"click",I),author_id&&1==e.can_reward&&u.on(c,"click",b),
1==e.can_reward&&author_id)){
n(document.getElementById("js_reward_author")),n(document.getElementById("js_reward_avatar")),
document.getElementById("js_reward_author_head").setAttribute("src",e.reward_author_head),
document.getElementById("js_reward_area").classList.add("reward_area_primary");
var p=document.getElementById("js_reward_link_text");
p.innerText="喜欢作者",Math.random()<.05?p.innerText="稀罕作者":Math.random()>.05&&Math.random()<.1&&(p.innerText="钟意作者"),
document.getElementById("js_reward_total_text").innerText="喜欢";
}
j=e.reward_head_imgs;
var f=m();
y.reward&&(author_id||h.isAndroid)&&1==e.can_reward?(n(y.reward),u.on(window,"load",function(){
w&&(u.off(window,"scroll",w),u.on(window,"scroll",w));
})):d(y.reward);
var E=document.getElementById("js_reward_inner");
E&&f>0&&n(E);
var z=document.getElementById("js_reward_total");
z&&(z.innerText=e.reward_total,z.setAttribute("href",l));
}
function _(e,t){
var r=document.createElement("span");
r.className="reward_user_avatar";
var a=new Image;
return a.onload=function(){
window.logs&&window.logs.reward_heads_total++,a.onload=a.onerror=null;
},a.onerror=function(){
window.logs&&window.logs.reward_heads_total++,window.logs&&window.logs.reward_heads_fail++,
a.onload=a.onerror=null;
},a.src=t,r.appendChild(a),e.appendChild(r),r;
}
function m(){
if(j.length){
var e=document.getElementById("js_reward_list"),t=0,r=document.createDocumentFragment();
if(e){
for(var a=0,n=j.length;n>a&&(t++,_(r,j[a]),t!=3*c);++a);
t>c&&(e.className+=" tl"),e.innerHTML="",e.appendChild(r);
}
return t;
}
}
function w(){
var e=window.pageYOffset||document.documentElement.scrollTop;
e+v>y.reward.offsetTop&&(p({
type:"GET",
url:"/bizmall/reward?act=report&__biz="+biz+"&appmsgid="+mid+"&idx="+idx,
async:!0
}),u.off(window,"scroll",w),w=null);
}
var c,l,u=e("biz_common/dom/event.js"),p=e("biz_wap/utils/ajax.js"),g=e("biz_wap/jsapi/core.js"),h=(e("rt/appmsg/getappmsgext.rt.js"),
e("biz_wap/utils/mmversion.js")),f=e("appmsg/appmsgext.js"),v=window.innerHeight||document.documentElement.clientHeight,y={
reward:document.getElementById("js_reward_area")
},j=[],x=500;
window.logs&&(window.logs.reward_heads_total=0,window.logs.reward_heads_fail=0);
var I=function(){},b=function(){};
return{
handle:function(e,t){
c=t,s(e);
},
render:function(e){
c=e,m();
}
};
});define("appmsg/like.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js","appmsg/log.js"],function(require,exports,module,alert){
"use strict";
function initLikeEvent(opt){
var el_like=opt.likeAreaDom,el_likeNum=opt.likeNumDom;
if(el_like&&el_likeNum){
var like_report=function(e){
log("[Appmsg] click like");
var tmpAttr=el_like.getAttribute("like"),tmpHtml=el_likeNum.innerHTML,isLike=parseInt(tmpAttr)?parseInt(tmpAttr):0,like=isLike?0:1,likeNum=parseInt(tmpHtml)?parseInt(tmpHtml):0,appmsgid=opt.appmsgid||opt.mid,itemidx=opt.itemidx||opt.idx;
ajax({
url:"/mp/appmsg_like?__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&like="+like+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
data:{
is_temp_url:opt.is_temp_url||0
},
type:"POST",
success:function(res){
var data=eval("("+res+")");
log("[Appmsg] like ajax succ"+data.base_resp.ret),0==data.base_resp.ret&&(isLike?(Class.removeClass(el_like,opt.className),
el_like.setAttribute("like",0),likeNum>0&&"100000+"!==tmpHtml&&(el_likeNum.innerHTML=likeNum-1==0?"赞":likeNum-1)):(el_like.setAttribute("like",1),
Class.addClass(el_like,opt.className),"100000+"!==tmpHtml&&(el_likeNum.innerHTML=likeNum+1)));
},
async:!0
});
};
DomEvent.on(el_like,"click",function(e){
return like_report(e),!1;
});
}
}
function showLikeNum(e){
var i=e||{};
if(i.show){
var t=i.likeAreaDom,l=i.likeNumDom;
t&&(t.style.display=i.likeAreaDisplayValue,i.liked&&Class.addClass(t,i.className),
t.setAttribute("like",i.liked?"1":"0"));
var s=i.likeNum||"赞";
parseInt(s)>1e5?s="100000+":"",l&&(l.innerHTML=s);
}
}
function showReadNum(e){
var i=e||{};
if(i.show){
var t=i.readAreaDom,l=i.readNumDom;
t&&(t.style.display=i.readAreaDisplayValue);
var s=i.readNum||1;
parseInt(s)>1e5?s="100000+":"",l&&(l.innerHTML=s);
}
}
var DomEvent=require("biz_common/dom/event.js"),Class=require("biz_common/dom/class.js"),ajax=require("biz_wap/utils/ajax.js"),log=require("appmsg/log.js");
return{
initLikeEvent:initLikeEvent,
showLikeNum:showLikeNum,
showReadNum:showReadNum
};
});define("pages/version4video.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/device.js","new_video/ctl.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function i(e,i){
i=i||"",i=["uin:"+r.user_uin,"resp:"+i].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+i+"&r="+Math.random();
}
function n(){
return window.__second_open__?!0:-1!=a.indexOf("&_newvideoplayer=0")?!1:-1!=a.indexOf("&_newvideoplayer=1")?!0:1!=r.is_login?!1:r.use_tx_video_player?!1:w.canSupportVideo&&h.inWechat?h.is_ios||h.is_android?!0:!1:(r._hasReportCanSupportVideo||w.canSupportVideo||!h.inWechat||(r._hasReportCanSupportVideo=!0,
i(44)),!1);
}
function o(){
console.log("isUseAd: "+c.isInMiniProgram);
{
var e=a,i=window.location.href;
r.sn||"";
}
return-1==e.indexOf("&_videoad=0")||"5a2492d450d45369cd66e9af8ee97dbd"!=r.sn&&"f62e1cb98630008303667f77c17c43d7"!=r.sn&&"30c609ee11a3a74a056e863f0e20cae2"!=r.sn?c.isInMiniProgram?!1:-1!=e.indexOf("&_videoad=1")?!0:-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")?!1:"54"==r.appmsg_type?!1:-1!=i.indexOf("&xd=1")?!1:r.__appmsgCgiData&&r.__appmsgCgiData.can_use_page&&(h.is_ios||h.is_android)?!0:_.showAd()?!0:!1:!1;
}
function t(){
var e=a;
if(!r.user_uin)return!1;
if(-1!=e.indexOf("&_proxy=1"))return!0;
if(-1!=e.indexOf("&_proxy=0"))return!1;
if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show"))return!1;
var i=(new Date).getHours();
return i>=9&&14>=i?!1:h.inWechat&&h.is_android&&h.is_x5&&h.wechatVer>="6.2.2"?!0:h.inWechat&&h.is_android&&h.is_xweb&&h.xweb_version>=16?!0:h.inWechat&&h.is_ios&&(-1!=f.indexOf("MicroMessenger/6.2.4")||h.wechatVer>="6.2.4")?!0:!1;
}
function s(){
return u.networkType;
}
var r,a,d=e("biz_common/dom/event.js"),p=e("biz_wap/jsapi/core.js"),w=e("biz_wap/utils/device.js"),_=e("new_video/ctl.js"),c=e("biz_wap/utils/mmversion.js"),f=window.navigator.userAgent,u={
networkType:""
},h={};
if(parent==window)r=window,a=window.location.href;else try{
a=parent.window.location.href,r=parent.window;
}catch(m){
a=window.location.href,r=window;
}
return function(e){
var i=w.os;
h.is_ios=/(iPhone|iPad|iPod|iOS)/i.test(e),h.is_android=!!i.android,h.is_wp=!!i.phone,
h.is_pc=!(i.phone||!i.Mac&&!i.windows),h.inWechat=/MicroMessenger/.test(e),h.inWindowWechat=/WindowsWechat/i.test(e),
h.inMacWechat=/wechat.*mac os/i.test(e),h.is_android_phone=h.is_android&&/Mobile/i.test(e),
h.is_android_tablet=h.is_android&&!/Mobile/i.test(e),h.ipad=/iPad/i.test(e),h.iphone=!h.ipad&&/(iphone)\sos\s([\d_]+)/i.test(e),
h.is_x5=/TBS\//.test(e)&&/MQQBrowser/i.test(e);
var n,o=/XWEB\/([\d\.]+)/i,t=e.match(o);
t&&t[1]&&(n=parseInt(t[1])),h.is_xweb=!!t,h.xweb_version=n;
var s=e.match(/MicroMessenger\/((\d+)(\.\d+)*)/);
h.wechatVer=s&&s[1]||0,d.on(window,"load",function(){
if(""==u.networkType&&h.inWechat){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
p.invoke("getNetworkType",{},function(i){
u.networkType=e[i.err_msg]||"fail","network_type:edge"==i.err_msg&&i.detailtype&&"4g"==i.detailtype&&(u.networkType="4g");
});
}
},!1);
}(window.navigator.userAgent),"undefined"==typeof r._hasReportCanSupportVideo&&(r._hasReportCanSupportVideo=!1),
{
device:h,
isShowMpVideo:n,
isUseProxy:t,
isUseAd:o,
getNetworkType:s
};
});define("biz_wap/utils/storage.js",[],function(){
"use strict";
function t(t){
if(!t)throw"require function name.";
this.key=t,this.init();
}
var e="__WXLS__",n=window.localStorage||{
getItem:function(){},
setItem:function(){},
removeItem:function(){},
key:function(){},
length:0
};
return t.getItem=function(t){
return t=e+t,n.getItem(t);
},t.setItem=function(i,r){
i=e+i;
for(var a=3;a--;)try{
n.setItem(i,r);
break;
}catch(o){
t.clear();
}
},t.clear=function(){
var t,i;
for(t=n.length-1;t>=0;t--)i=n.key(t),0==i.indexOf(e)&&n.removeItem(i);
},t.prototype={
constructor:t,
init:function(){
this.check();
},
getData:function(){
var e=t.getItem(this.key)||"{}";
try{
e=JSON.parse(e);
}catch(n){
e={};
}
return e;
},
check:function(){
var e,n,i=this.getData(),r={},a=+new Date;
for(e in i)n=i[e],+n.exp>a&&(r[e]=n);
t.setItem(this.key,JSON.stringify(r));
},
set:function(e,n,i){
var r=this.getData();
r[e]={
val:n,
exp:i||+new Date
},t.setItem(this.key,JSON.stringify(r));
},
get:function(t){
var e=this.getData();
return e=e[t],e?e.val||null:null;
},
remove:function(e){
var n=this.getData();
n[e]&&delete n[e],t.setItem(this.key,JSON.stringify(n));
}
},t;
});define("appmsg/share_tpl.html.js",[],function(){
return'<div class="rich_media_extra">\n    <a href="<#= url #>" class="share_appmsg_container appmsg_card_context flex_context">\n        <div class="flex_hd">\n            <i class="share_appmsg_icon"> </i>\n        </div>\n        <div class="flex_bd">\n            <div class="share_appmsg_title">分享给订阅用户</div>\n            <p class="share_appmsg_desc">可快速分享原创文章给你的公众号订阅用户</p>\n        </div>\n    </a>\n</div>\n';
});define("appmsg/appmsgext.js",["appmsg/log.js","biz_wap/utils/ajax.js","rt/appmsg/getappmsgext.rt.js"],function(e){
"use strict";
function t(e){
function t(e){
for(var t=window.location.href,s=t.indexOf("?"),i=t.substr(s+1),n=i.split("&"),a=0;a<n.length;a++){
var r=n[a].split("=");
if(r[0].toUpperCase()==e.toUpperCase())return r[1];
}
return"";
}
var a={
biz:"",
appmsg_type:"",
mid:"",
sn:"",
idx:"",
scene:"",
title:"",
ct:"",
abtest_cookie:"",
devicetype:"",
version:"",
is_need_ticket:0,
is_need_ad:0,
comment_id:"",
is_need_reward:0,
both_ad:0,
reward_uin_count:0,
send_time:"",
msg_daily_idx:"",
is_original:0,
is_only_read:0,
req_id:"",
pass_ticket:"",
is_temp_url:0,
rtId:"",
rtKey:"",
onSuccess:function(){},
onError:function(){}
};
for(var r in e)e.hasOwnProperty(r)&&(a[r]=e[r]);
console.info("[(评论、点赞、赞赏) 发送请求]: ",new Date),i({
url:"/mp/getappmsgext?f=json&mock="+t("mock"),
data:{
r:Math.random(),
__biz:a.biz,
appmsg_type:a.appmsg_type,
mid:a.mid,
sn:a.sn,
idx:a.idx,
scene:a.scene,
title:encodeURIComponent(a.title.htmlDecode()),
ct:a.ct,
abtest_cookie:a.abtest_cookie,
devicetype:a.devicetype.htmlDecode(),
version:a.version.htmlDecode(),
is_need_ticket:a.is_need_ticket,
is_need_ad:a.is_need_ad,
comment_id:a.comment_id,
is_need_reward:a.is_need_reward,
both_ad:a.both_ad,
reward_uin_count:a.is_need_reward?a.reward_uin_count:0,
send_time:a.send_time,
msg_daily_idx:a.msg_daily_idx,
is_original:a.is_original,
is_only_read:a.is_only_read,
req_id:a.req_id,
pass_ticket:a.pass_ticket,
is_temp_url:a.is_temp_url,
item_show_type:a.item_show_type,
tmp_version:1
},
type:"POST",
dataType:"json",
rtId:a.rtId,
rtKey:a.rtKey,
rtDesc:n,
async:!0,
success:function(e){
if(console.info("[(评论、点赞、赞赏) 响应请求]: ",new Date,e),s("[Appmsg] success get async data"),
"function"==typeof a.onSuccess&&a.onSuccess(e),e)try{
s("[Appmsg] success get async data, async data is: "+JSON.stringify(e));
}catch(t){}else s("[Appmsg] success get async data, async data is empty");
},
error:function(){
s("[Appmsg] error get async data, biz="+a.biz+", mid="+a.mid),"function"==typeof a.onError&&a.onError();
}
});
}
var s=e("appmsg/log.js"),i=e("biz_wap/utils/ajax.js"),n=e("rt/appmsg/getappmsgext.rt.js");
return{
getData:t
};
});define("appmsg/img_copyright_tpl.html.js",[],function(){
return'<span class="original_img_wrp">            \n    <span class="tips_global">来自: <#=source_nickname#></span>\n</span>    ';
});define("pages/video_ctrl.js",[],function(){
"use strict";
function n(n){
n=n||window;
var i=n.cgiData;
return i&&2==i.ori_status&&1==i.is_mp_video&&(i.nick_name||i.hit_username)?!0:!1;
}
function i(n){
return n=n||window,!1;
}
function e(){
return-1!=r.indexOf("&vl=1")?!1:"54"==parent.window.appmsg_type?!1:!0;
}
function t(){
return-1!=r.indexOf("&dd=1")?!1:"54"==parent.window.appmsg_type?!1:!0;
}
function o(){
var n;
if(parent==window)n=window;else try{
{
parent.window.__videoDefaultRatio;
}
n=parent.window;
}catch(i){
n=window;
}
var e=n.__videoDefaultRatio||16/9;
return"54"==n.appmsg_type?e:e;
}
var r=window.location.href;
return{
showPauseTips:t,
showVideoLike:e,
showVideoDetail:i,
showReprint:n,
getRatio:o
};
});define("pages/create_txv.js",["biz_common/utils/monitor.js","biz_wap/utils/ajax_load_js.js","pages/loadscript.js"],function(e){
"use strict";
function n(){
"function"!=typeof window.__createTxVideo&&(window.__createTxVideo=function(e){
o(e);
});
}
function o(e){
var n=function(){},o=function(){};
"function"==typeof e.onSuccess&&(o=e.onSuccess),"function"==typeof e.onError&&(n=e.onError),
r.Load({
url:c.jsUrl,
version:c.jsVersion,
useCache:!0,
win:e.win,
onSuccess:function(s){
2!=s.code&&3!=s.code||0!=s.queueIndex||(i.setSum("64728","111",1),i.setSum("64728","112",1));
var u=e.win||window,a=!0;
if(u.Txp&&"function"==typeof u.Txp.Player?(a=!0,0==s.queueIndex&&(2==s.code?i.setSum("64728","116",1):3==s.code&&i.setSum("64728","117",1),
i.send())):(a=!1,0==s.queueIndex&&(2==s.code?i.setSum("64728","114",1):3==s.code&&i.setSum("64728","115",1),
i.send())),a){
var d=t({
win:u,
options:e
});
o({
player:d
});
}else r.ClearCache({
win:u,
version:c.jsVersion,
url:c.jsUrl
}),n();
},
onError:function(n){
0==n.queueIndex&&(i.setSum("64728","111",1),i.setSum("64728","118",1),51==n.code?i.setSum("64728","119",1):52==n.code?i.setSum("64728","120",1):53==n.code&&i.setSum("64728","121",1),
i.send()),s(e);
}
});
}
function t(e){
var n=e.win||window,o=e.options,t=new n.Txp.Player({
containerId:o.containerId,
vid:o.vid,
width:o.width,
height:o.height,
autoplay:o.autoplay===!0?!0:!1,
allowFullScreen:o.allowFullScreen===!0?!0:!1
});
return t;
}
function s(e){
var n=function(){},o=function(){};
"function"==typeof e.onSuccess&&(o=e.onSuccess),"function"==typeof e.onError&&(n=e.onError);
var s=c.jsUrl;
s+=-1==s.indexOf("?")?"?"+c.customerParam+"="+c.jsVersion:"&"+c.customerParam+"="+c.jsVersion,
u({
win:e.win,
url:s,
timeout:1e4,
type:"JS",
callback:function(){
i.setSum("64728","122",1);
var s=e.win||window;
if(s.Txp&&"function"==typeof s.Txp.Player){
i.setSum("64728","124",1),i.send();
var r=t({
win:e.win,
options:e
});
o({
player:r
});
}else i.setSum("64728","123",1),i.send(),n();
},
onerror:function(e){
switch(i.setSum("64728","122",1),1*e){
case 400:
c.jsLoadState=4,i.setSum("64728","125",1);
break;

case 500:
c.jsLoadState=5,i.setSum("64728","126",1);
break;

default:
c.jsLoadState=6,i.setSum("64728","127",1);
}
i.send(),n();
}
});
}
var i=e("biz_common/utils/monitor.js"),r=e("biz_wap/utils/ajax_load_js.js"),u=e("pages/loadscript.js"),c={
customerParam:"wxv",
jsUrl:"//vm.gtimg.cn/tencentvideo/txp/js/iframe/api.js?",
jsVersion:"v1"
};
return{
createTxVideo:o,
createGlobalFunc:n
};
});define("appmsg/comment_utils.js",["appmsg/comment.js"],function(n){
"use strict";
function m(m){
1==m.comment_enabled&&(window.can_fans_comment_only=m.only_fans_can_comment,window.comment_count=m.comment_count,
window._is_fans=m.is_fans,window._logo_url=m.logo_url,window._nick_name=m.nick_name,
window.friend_comment_enabled=m.friend_comment_enabled,n("appmsg/comment.js"));
}
return{
initCommentByExtData:m
};
});define("biz_common/ui/imgonepx.js",[],function(){
"use strict";
return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJDQzA1MTVGNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJDQzA1MTYwNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkNDMDUxNUQ2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkNDMDUxNUU2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6p+a6fAAAAD0lEQVR42mJ89/Y1QIABAAWXAsgVS/hWAAAAAElFTkSuQmCC";
});define("appmsg/malicious_wording.js",[],function(){
"use strict";
var i={
0:{
90041:"此标题包含夸大误导信息",
20012:"此标题包含低俗恶俗内容"
},
1:{
90041:"",
20012:""
},
2:{
90041:"此文章包含夸大误导信息",
20012:"此文章包含低俗恶俗内容"
}
},s={
0:{
90041:"标题使用夸大、煽动、低俗等词语造成误导或引人不适",
20012:"标题使用低俗或恶俗词语造成不正当影响或引人不适"
},
1:{
90041:"摘要包含误导、煽动的信息引人不适或造成微信用户混淆",
20012:"摘要包含低俗或恶俗内容造成不正当影响或引人不适"
},
2:{
90041:"文章包含误导、煽动的信息引人不适或造成微信用户混淆",
20012:"文章包含低俗或恶俗内容造成不正当影响或引人不适"
}
};
return{
maliciousTitleMap:i,
maliciousDescMap:s
};
});define("a/a.js",["biz_wap/utils/mmversion.js","biz_wap/utils/device.js","a/a_sign.js","biz_wap/utils/openUrl.js","biz_common/utils/get_para_list.js","biz_wap/utils/show_time.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","a/card.js","a/wxopen_card.js","a/mpshop.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","a/a_tpl.html.js","a/sponsor_a_tpl.html.js","a/cpc_a_tpl.html.js","biz_common/utils/report.js","biz_common/dom/class.js","biz_wap/utils/storage.js","appmsg/log.js","a/tpl/crt_tpl_manager.js","appmsg/cdn_img_lib.js","a/tpl/cpc_tpl.html.js","a/sponsor.js","a/app_card.js","a/profile.js","a/android.js","a/ios.js","a/video.js"],function(require,exports,module,alert){
"use strict";
function _GetQuery(e){
for(var a=window.location.search,t=a.substring(1,a.length).split("&"),i=0;i<t.length;i++){
var n=t[i].split("=");
if(n[0].toUpperCase()===e.toUpperCase())return n[1];
}
return"";
}
function insertAfter(e,a){
var t=a.parentNode;
t.lastChild===a?t.appendChild(e):t.insertBefore(e,a.nextSibling);
}
function report(e,a){
Report("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+a);
}
function adOptReport(e,a,t,i){
Report("http://mp.weixin.qq.com/mp/ad_complaint?&action=report&type="+e+"&pos_type="+a+"&trace_id="+t+"&aid="+i+"&__biz="+window.biz+"&r="+Math.random());
}
function getWindowHeight(){
return"CSS1Compat"===document.compatMode?document.documentElement.clientHeight:document.body.clientHeight;
}
function checkNeedAds(){
var is_need_ad=1,_adInfo=null,screen_num=0;
if(!globalAdDebug){
var inwindowwx=-1!=navigator.userAgent.indexOf("WindowsWechat");
if(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger")||inwindowwx||mmversion.isInMiniProgram)is_need_ad=0,
js_sponsor_ad_area.style.display="none",js_bottom_ad_area.style.display="none",js_cpc_area&&js_cpc_area.style&&(js_cpc_area.style.display="none");else{
var adLS=new LS("ad");
if(window.localStorage&&-1===location.href.indexOf("mock"))try{
var key=[biz,sn,mid,idx].join("_"),_ad=adLS.get(key);
_adInfo=_ad.info;
try{
_adInfo=eval("("+_adInfo+")");
}catch(e){
_adInfo=null;
}
var _adInfoSaveTime=_ad.time,_now=+new Date;
_adInfo&&18e4>_now-1*_adInfoSaveTime&&1*_adInfo.advertisement_num>0?is_need_ad=0:adLS.remove(key),
log("[Ad] is_need_ad: "+is_need_ad+" , adData:"+JSON.stringify(_ad));
}catch(e){
is_need_ad=1,_adInfo=null;
}
}
}
return{
is_need_ad:is_need_ad,
both_ad:0,
_adInfo:_adInfo
};
}
function afterGetAdData(e,a){
function t(e){
var a=e;
if(6==a.dest_type&&(a.is_wx_app=!0),e.product_type===ANDROID_APP_PRODUCT_TYPE||e.product_type===IOS_APP_PRODUCT_TYPE){
var t=a.app_info.app_size||0,i=a.app_info.app_name||a.app_info.appname||"",n=a.app_info.apk_url||a.app_info.pkgurl||"",p=a.app_info.file_md5||a.app_info.pkgmd5||a.app_info.app_md5||"",o=a.app_info.apk_name||a.app_info.pkg_name||"";
t=formSize(t),i=formName(i),a.app_info.app_size=t,a.app_info.app_name=i,a.app_info.apk_name=o,
a.app_info.appname=a.app_info.app_name,a.app_info.app_rating=a.app_info.app_rating||0,
a.app_info.app_id=a.app_info.app_id,a.app_info.icon_url=a.app_info.icon_url,a.app_info.channel_id=a.app_info.channel_id,
a.app_info.md5sum=a.app_info.app_md5,a.app_info.rl=a.rl,a.app_info.pkgname=o,a.app_info.url_scheme=a.app_info.url_scheme,
a.app_info.androiddownurl=n,a.app_info.versioncode=a.app_info.version_code,a.app_info.appinfo_url=a.app_info.appinfo_url,
a.app_info.traceid=a.traceid,a.app_info.pt=a.pt,a.app_info.url=a.url,a.app_info.ticket=a.ticket,
a.app_info.type=a.type,a.app_info.adid=a.aid,a.app_info.file_md5=p;
var _=extend({
appname:a.app_info.app_name,
app_rating:a.app_info.app_rating||0,
app_id:a.app_info.app_id,
icon_url:a.app_info.icon_url,
channel_id:a.app_info.channel_id,
md5sum:a.app_info.app_md5,
rl:a.rl,
pkgname:o,
url_scheme:a.app_info.url_scheme,
androiddownurl:n,
versioncode:a.app_info.version_code,
appinfo_url:a.app_info.appinfo_url,
traceid:a.traceid,
pt:a.pt,
url:a.url,
ticket:a.ticket,
type:a.type,
adid:a.aid,
source:source||"",
is_appmsg:!0,
file_md5:p
},a);
return _;
}
if(23==e.product_type){
for(var r=a.exp_info.exp_value||[],d=!1,s=0,c=0;c<r.length;++c){
var l=r[c]||{};
if(1==l.exp_type&&(s=l.comm_attention_num,d=s>0),2==l.exp_type){
d=!1,s=0;
break;
}
}
a.biz_info.show_comm_attention_num=d,a.biz_info.comm_attention_num=s;
var _=extend({
usename:a.biz_info.user_name,
pt:a.pt,
url:a.url,
traceid:a.traceid,
adid:a.aid,
ticket:a.ticket,
is_appmsg:!0
},a);
return _;
}
return e;
}
function i(e){
if(e.product_type===ANDROID_APP_PRODUCT_TYPE||e.product_type===IOS_APP_PRODUCT_TYPE){
var a=e,t=a.app_info.app_size||0,i=a.app_info.app_name||a.app_info.appname||"",n=a.app_info.apk_url||a.app_info.pkgurl||"",p=a.app_info.file_md5||a.app_info.pkgmd5||a.app_info.app_md5||"",o=a.app_info.apk_name||a.app_info.pkg_name||"";
t=formSize(t),i=formName(i),a.app_info.app_size=t,a.app_info.app_name=i,a.app_info.apk_name=o,
a.app_info.appname=a.app_info.app_name,a.app_info.app_rating=a.app_info.app_rating||0,
a.app_info.app_id=a.app_info.app_id,a.app_info.icon_url=a.app_info.icon_url,a.app_info.channel_id=a.app_info.channel_id,
a.app_info.md5sum=a.app_info.app_md5,a.app_info.rl=a.rl,a.app_info.pkgname=o,a.app_info.url_scheme=a.app_info.url_scheme,
a.app_info.androiddownurl=n,a.app_info.versioncode=a.app_info.version_code,a.app_info.appinfo_url=a.app_info.appinfo_url,
a.app_info.traceid=a.traceid,a.app_info.pt=a.pt,a.app_info.url=a.url,a.app_info.ticket=a.ticket,
a.app_info.type=a.type,a.app_info.adid=a.aid,a.app_info.file_md5=p;
var _=extend({
appname:a.app_info.app_name,
app_rating:a.app_info.app_rating||0,
app_id:a.app_info.app_id,
icon_url:a.app_info.icon_url,
channel_id:a.app_info.channel_id,
md5sum:a.app_info.app_md5,
rl:a.rl,
pkgname:o,
url_scheme:a.app_info.url_scheme,
androiddownurl:n,
versioncode:a.app_info.version_code,
appinfo_url:a.app_info.appinfo_url,
traceid:a.traceid,
pt:a.pt,
url:a.url,
ticket:a.ticket,
type:a.type,
adid:a.aid,
source:source||"",
is_appmsg:!0,
file_md5:p
},a);
return _;
}
return e;
}
function n(e){
return e;
}
var p={},o=e.is_need_ad,_=e._adInfo;
if(0==o)p=_,p||(p={
advertisement_num:0
});else{
if(a.advertisement_num>0&&a.advertisement_info){
var r=a.advertisement_info;
p.advertisement_info=saveCopy(r);
}
p.advertisement_num=a.advertisement_num;
}
1==o&&(window._adRenderData=p),p=p||{
advertisement_num:0
};
var d=!1;
if(!p.flag&&p.advertisement_num>0){
var s=p.advertisement_num,c=p.advertisement_info;
window.adDatas.num=s;
for(var l=0;s>l;++l){
var m,u=null,f=c[l];
f.exp_info=f.exp_info||{},f.is_cpm=f.is_cpm||0,f.biz_info=f.biz_info||{},f.app_info=f.app_info||{},
f.pos_type=f.pos_type||0,f.logo=f.logo||"",f.use_new_protocol=f.use_new_protocol||0;
var g=f.pt,y=f.pos_type,v=f.product_type;
if(m=f.use_new_protocol)1==m?4===y?(d=!0,f=t(f),u=f):0===y?(f=i(f),(v===ANDROID_APP_PRODUCT_TYPE||v===IOS_APP_PRODUCT_TYPE)&&(u=f)):3===y&&(f=n(f),
u=f):2==m&&4===y&&(d=!0,f=t(f),u=f);else if(100===g||115===g){
for(var w=f.exp_info.exp_value||[],h=!1,b=0,x=0;x<w.length;++x){
var j=w[x]||{};
if(1==j.exp_type&&(b=j.comm_attention_num,h=b>0),2==j.exp_type){
h=!1,b=0;
break;
}
}
f.biz_info.show_comm_attention_num=h,f.biz_info.comm_attention_num=b,u={
usename:f.biz_info.user_name,
pt:g,
url:f.url,
traceid:f.traceid,
adid:f.aid,
ticket:f.ticket,
is_appmsg:!0
};
}else if(102===g)u={
appname:f.app_info.app_name,
versioncode:f.app_info.version_code,
pkgname:f.app_info.apk_name,
androiddownurl:f.app_info.apk_url,
md5sum:f.app_info.app_md5,
signature:f.app_info.version_code,
rl:f.rl,
traceid:f.traceid,
pt:g,
ticket:f.ticket,
type:f.type,
adid:f.aid,
is_appmsg:!0
};else if(101===g)u={
appname:f.app_info.app_name,
app_id:f.app_info.app_id,
icon_url:f.app_info.icon_url,
appinfo_url:f.app_info.appinfo_url,
rl:f.rl,
traceid:f.traceid,
pt:g,
ticket:f.ticket,
type:f.type,
adid:f.aid,
is_appmsg:!0
};else if(103===g||104===g||2===g&&f.app_info){
var k=f.app_info.down_count||0,P=f.app_info.app_size||0,I=f.app_info.app_name||"",O=f.app_info.category,T=["万","百万","亿"];
if(k>=1e4){
k/=1e4;
for(var D=0;k>=10&&2>D;)k/=100,D++;
k=k.toFixed(1)+T[D]+"次";
}else k=k.toFixed(1)+"次";
P=formSize(P),O=O?O[0]||"其他":"其他",I=formName(I),f.app_info._down_count=k,f.app_info._app_size=P,
f.app_info._category=O,f.app_info.app_name=I,u={
appname:f.app_info.app_name,
app_rating:f.app_info.app_rating||0,
icon_url:f.app_info.icon_url,
app_id:f.app_info.app_id,
channel_id:f.app_info.channel_id,
md5sum:f.app_info.app_md5,
rl:f.rl,
pkgname:f.app_info.apk_name,
url_scheme:f.app_info.url_scheme,
androiddownurl:f.app_info.apk_url,
versioncode:f.app_info.version_code,
appinfo_url:f.app_info.appinfo_url,
traceid:f.traceid,
pt:g,
url:f.url,
ticket:f.ticket,
type:f.type,
adid:f.aid,
is_appmsg:!0,
app_info:f.app_info
};
}else if(105===g){
var E=f.card_info.card_id||"",A=f.card_info.card_ext||"";
A=A.htmlDecode();
try{
A=JSON.parse(A),A.outer_str=f.card_info.card_outer_id||"",A=JSON.stringify(A);
}catch(C){
A="{}";
}
u={
card_id:E,
card_ext:A,
pt:g,
ticket:f.ticket||"",
url:f.url,
rl:f.rl,
tid:f.traceid,
traceid:f.traceid,
type:f.type,
adid:f.aid,
is_appmsg:!0
};
}else if(106===g){
var S=f.mp_shop_info.pid||"",z=f.mp_shop_info.outer_id||"";
u={
pid:S,
outer_id:z,
pt:g,
url:f.url,
rl:f.rl,
tid:f.traceid,
traceid:f.traceid,
type:f.type,
adid:f.aid,
is_appmsg:!0
};
}else if(108===g||109===g||110===g||116===g||117===g)u={
pt:g,
ticket:f.ticket||"",
url:f.url,
traceid:f.traceid,
adid:f.aid,
is_appmsg:!0
},f.video_info&&(u.displayWidth=f.video_info.displayWidth,u.displayHeight=f.video_info.displayHeight,
u.thumbUrl=f.video_info.thumbUrl,u.videoUrl=f.video_info.videoUrl,u.rl=f.rl),6==f.dest_type&&Wxopen_card.startConnect(f);else if(111===g||113===g||114===g||112===g||121===g||122===g){
var P=f.app_info.app_size||0,I=f.app_info.app_name||"";
P=formSize(P),I=formName(I),f.app_info.app_size=P,f.app_info.app_name=I,u={
appname:f.app_info.app_name,
app_rating:f.app_info.app_rating||0,
app_id:f.app_info.app_id,
icon_url:f.app_info.icon_url,
channel_id:f.app_info.channel_id,
md5sum:f.app_info.app_md5,
rl:f.rl,
pkgname:f.app_info.apk_name,
url_scheme:f.app_info.url_scheme,
androiddownurl:f.app_info.apk_url,
versioncode:f.app_info.version_code,
appinfo_url:f.app_info.appinfo_url,
traceid:f.traceid,
pt:g,
url:f.url,
ticket:f.ticket,
type:f.type,
adid:f.aid,
source:source||"",
is_appmsg:!0
};
}else if(118===g)u=f,d=!0,Wxopen_card.startConnect(f);else if(119===g||120===g)u=f,
Wxopen_card.startConnect(f);else if(125===g)u=f,6==f.dest_type&&Wxopen_card.startConnect(f);else if(140===g){
u=f;
try{
u.shopImage=u.shop_image[0],u.shopImage.mp_tags=u.shopImage.mp_tags||[];
}catch(q){
u.shopImage={};
}
}
var R=f.image_url;
require("appmsg/cdn_img_lib.js"),R&&R.isCDN()&&(R=R.replace(/\/0$/,"/640"),R=R.replace(/\/0\?/,"/640?"),
f.image_url=ParseJs.addParam(R,"wxfrom","50",!0)),adDatas.ads["pos_"+y]={
a_info:f,
adData:u
},localStorage&&localStorage.setItem&&f.app_info&&f.app_info.url_scheme&&localStorage.setItem("__WXLS__a_url_schema_"+f.traceid,f.app_info.url_scheme),
f.has_installed=!1,f.app_info&&!function(e){
JSAPI.invoke("getInstallState",{
packageName:e.app_info.apk_name
},function(a){
var t=a.err_msg;
t.indexOf("get_install_state:yes")>-1&&(e.has_installed=!0);
});
}(f),0===y&&9===f.material_type&&(46===v&&6===f.dest_type&&f.game_info&&(f.biz_info.head_img=f.game_info.head_img,
f.biz_info.nick_name=f.game_info.nick_name),v!==IOS_APP_PRODUCT_TYPE&&v!==ANDROID_APP_PRODUCT_TYPE||!f.app_info||(f.biz_info.head_img=f.app_info.icon_url,
f.biz_info.nick_name=f.app_info.app_name));
}
var U=function(){
var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,a=document.documentElement.clientHeight||window.innerHeight;
if(js_sponsor_ad_area.offsetTop<e+a){
var t=document.getElementById("js_ad_area");
t&&Class.addClass(t,"show"),DomEvent.off(window,"scroll",U);
}
},B=adDatas.ads;
for(var N in B)if(0==N.indexOf("pos_")){
var u=B[N],f=!!u&&u.a_info,v=f.product_type;
if(u&&f){
if(4===f.pos_type&&!js_cpc_area){
var W=getParaList(contentWrp),H=void 0!==f.position_index&&f.position_index>=0&&f.position_index<W.length,M=H?f.position_index:Math.ceil(W.length/2)-1;
js_cpc_area=document.createElement("mpcpc"),el_gdt_areas.pos_4=js_cpc_area,gdt_as.pos_4=js_cpc_area.getElementsByClassName("js_ad_link"),
insertAfter(js_cpc_area,W[M]);
}
if(2!==f.use_new_protocol){
if(0==f.pos_type){
if(f.new_appmsg=window.new_appmsg,f.longAppBtnText=v===IOS_APP_PRODUCT_TYPE?"查看应用":"下载应用",
f.shortAppBtnText=v===IOS_APP_PRODUCT_TYPE?"查看":"下载",js_bottom_ad_area.innerHTML=TMPL.tmpl(a_tpl,f),
111==f.pt||112==f.pt||113==f.pt||114==f.pt){
var Y=document.getElementsByClassName("js_download_app_card")[0],L=Y.offsetWidth,K=Math.floor(L/2.875);
K>0&&(Y.style.height=K+"px");
}
}else if(3==f.pos_type){
var Y=document.createElement("div");
Y.appendChild(document.createTextNode(f.image_url)),f.image_url=Y.innerHTML.replace(/&amp;/g,"&"),
f.new_appmsg=window.new_appmsg,js_sponsor_ad_area.innerHTML=TMPL.tmpl(sponsor_a_tpl,f),
js_sponsor_ad_area.style.display="block";
var J=js_sponsor_ad_area.clientWidth;
108!=f.pt&&109!=f.pt&&110!=f.pt||2==f.use_new_protocol?116==f.pt||117==f.pt:document.getElementById("js_main_img").style.height=J/1.77+"px",
DomEvent.on(window,"scroll",U),U(0);
}else if(4==f.pos_type&&_checkShowCpc()){
f=_parseExpCpc(f);
var X=!1;
if(v===ANDROID_APP_PRODUCT_TYPE||v===IOS_APP_PRODUCT_TYPE)js_cpc_area.innerHTML=TMPL.tmpl(cpc_a_tpl,f),
X=!0;else{
var V=require("a/tpl/cpc_tpl.html.js"),F=f.exp_obj.sale_text;
(23===v||v===ANDROID_APP_PRODUCT_TYPE||v===IOS_APP_PRODUCT_TYPE||46===v)&&(F=f.avatarTitle),
js_cpc_area.innerHTML=TMPL.tmpl(V,{
tag_pos:f.exp_obj.tag_pos,
type:f.tag_pos,
ticket:f.ticket,
url:f.url,
rl:f.rl,
aid:f.aid,
pt:f.pt,
traceid:f.traceid,
group_id:f.group_id,
apurl:f.apurl,
is_cpm:f.is_cpm,
can_see_complaint:window.can_see_complaint,
pos_type:f.pos_type,
banner:f.image_url,
price:f.exp_obj.price,
title:F,
is_wx_app:f.is_wx_app,
btn_text:f.exp_obj.btn_text,
avatar:f.avatar,
isDownload:X
});
}
}
mmversion.isIOS&&f.app_info&&f.app_info.url_scheme&&v===IOS_APP_PRODUCT_TYPE&&(document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="查看应用"),
document.getElementsByClassName("js_ad_btn")&&document.getElementsByClassName("js_ad_btn").length>0&&(document.getElementsByClassName("js_ad_btn")[0].innerHTML="查看"),
document.getElementById("js_ad_btn_"+f.pos_type)&&(document.getElementById("js_ad_btn_"+f.pos_type).innerHTML="查看应用"));
}else{
var G,Q={},X=!1,$={};
if(f.button_action)try{
"string"==typeof f.button_action&&(f.button_action=JSON.parse(f.button_action.html())),
f.button_action.button_text&&""!=f.button_action.button_text||(f.button_action.button_text="去逛逛");
}catch(C){
f.button_action={
button_text:"decode error"
};
}else f.button_action={
button_text:"something wrong"
};
if(G=f.crt_size,f.biz_info&&f.biz_info.head_img&&23===v&&(f.avatar=f.biz_info.head_img,
f.avatarTitle=f.biz_info.nick_name),(v===ANDROID_APP_PRODUCT_TYPE||v===IOS_APP_PRODUCT_TYPE)&&(X=!0,
f.app_info&&f.app_info.icon_url&&(f.avatar=f.app_info.icon_url,f.avatarTitle=f.app_info.appname)),
46===v&&f.game_info&&f.game_info.head_img&&(f.avatar=f.game_info.head_img,f.avatarTitle=f.game_info.nick_name),
6==f.dest_type&&Wxopen_card.startConnect(f),4==f.pos_type){
if(_checkShowCpc()){
f=_parseExpCpc(f);
var F=f.exp_obj.sale_text;
(23===v||v===ANDROID_APP_PRODUCT_TYPE||v===IOS_APP_PRODUCT_TYPE||46===v)&&(F=f.avatarTitle),
Q={
tag_pos:f.exp_obj.tag_pos,
type:f.tag_pos,
ticket:f.ticket,
url:f.url,
rl:f.rl,
aid:f.aid,
pt:f.pt,
traceid:f.traceid,
group_id:f.group_id,
apurl:f.apurl,
is_cpm:f.is_cpm,
can_see_complaint:window.can_see_complaint,
pos_type:f.pos_type,
banner:f.image_url,
price:f.exp_obj.price,
title:F,
is_wx_app:f.is_wx_app,
is_ios:mmversion.isIOS,
isDownload:X,
btn_text:f.button_action.button_text,
avatar:f.avatar
},X&&($.customUpdataFunc=function(e,a){
var t=e.querySelector(".js_download_percent"),i=e.querySelector(".js_download_outside"),n=e.querySelector(".js_download_inner");
t&&(t.style.width=a.percent+"%"),i.textContent=a.btn_text,n.textContent=a.btn_text;
}),ad_render_object["pos_"+f.pos_type]=new CrtManager.createCrtObject(G,Q,js_cpc_area,$),
gdt_as.pos_4=js_cpc_area.getElementsByClassName("js_ad_main_area");
}
}else if(3==f.pos_type){
var Y=document.createElement("div");
Y.appendChild(document.createTextNode(f.image_url)),f.image_url=Y.innerHTML.replace(/&amp;/g,"&"),
f.new_appmsg=window.new_appmsg;
var u={
pt:f.pt,
ticket:f.ticket||"",
url:f.url,
traceid:f.traceid,
adid:f.aid,
is_appmsg:!0
};
if(f.video_info&&(u.displayWidth=f.video_info.displayWidth,u.displayHeight=f.video_info.displayHeight,
u.thumbUrl=f.video_info.thumbUrl,u.videoUrl=f.video_info.videoUrl,u.rl=f.rl),Q={
type:f.tag_pos,
ticket:f.ticket,
url:f.url,
rl:f.rl,
aid:f.aid,
pt:f.pt,
traceid:f.traceid,
group_id:f.group_id,
apurl:f.apurl,
is_cpm:f.is_cpm,
can_see_complaint:window.can_see_complaint,
pos_type:f.pos_type,
banner:f.image_url,
title:f.biz_info.nick_name,
is_wx_app:6==f.button_action.jump_type,
is_ios:mmversion.isIOS,
isDownload:X,
btn_text:f.button_action.button_text,
avatar:f.biz_info.head_img,
isApp:!1
},ad_render_object["pos_"+f.pos_type]=new CrtManager.createCrtObject(G,Q,js_sponsor_ad_area,$),
js_sponsor_ad_area.style.display="block",gdt_as.pos_3=js_sponsor_ad_area.getElementsByClassName("js_ad_main_area"),
!ad_render_object["pos_"+f.pos_type].getCrtData().has_banner){
var Z="&tid="+f.traceid+"&uin="+uin+"&key="+N+"&ticket="+(f.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+f.adid+"&ad_engine=0&pos_type="+pos_type+"&exp_id="+f.exp_info.exp_id+"&exp_value="+f.exp_info.exp_value+"&r="+Math.random();
f.report_param=Z;
}
var ea=require("a/sponsor.js");
new ea({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adVideo:document.getElementById("js_video_container"),
adComplain:document.getElementById("js_btn_complain"),
adData:u,
a_info:f,
pos_type:pos_type,
report_param:Z
}),DomEvent.on(window,"scroll",U),U(0);
}
}
lazyLoadAdImg({
aid:f.aid,
type:f.pt,
info:f
}),checkAdImg(f);
}
}
bindAdOperation();
}
is_temp_url&&document.getElementsByTagName("mpcpc").length>0&&_checkShowCpc()&&!d&&(js_cpc_area.innerHTML=TMPL.tmpl(cpc_a_tpl,{
type:"",
ticket:"",
url:"",
rl:"",
aid:"",
pt:"",
traceid:"",
group_id:"",
apurl:"",
is_cpm:"",
exp_obj:{},
pos_type:"",
dest_type:"",
image_url:"https://mmbiz.qlogo.cn/mmbiz_png/cVgP5bCElFiaPhsbHe4ctnlUllMCDCEIJib69wX3BUX42XagNypd2JcgyEiaoFRu4KicKF3avfRgVnWPABVTjtPRwQ/0?wx_fmt=png"
}));
}
function _parseExpCpc(e){
var a=e.product_type,t={
icon_pos:"",
btn_text:"去逛逛",
price:"",
sale_text:""
};
if(5==e.watermark_type&&(t.btn_text="查看详情"),e.biz_info&&e.biz_info.head_img&&23==e.product_type&&(e.avatar=e.biz_info.head_img,
e.avatarTitle=e.biz_info.nick_name),29===a||31===a?t.btn_text="查看详情":a===ANDROID_APP_PRODUCT_TYPE||a===IOS_APP_PRODUCT_TYPE?(t.btn_text=a===IOS_APP_PRODUCT_TYPE?"查看应用":"下载应用",
e.app_info&&e.app_info.icon_url&&(e.avatar=e.app_info.icon_url,e.avatarTitle=e.app_info.appname)):30===a?t.btn_text="去逛逛":23===a?t.btn_text=e.biz_info.is_subscribed?"查看公众号":"关注公众号":46===a&&(t.btn_text="进入小游戏",
e.game_info&&e.game_info.head_img&&(e.avatar=e.game_info.head_img,e.avatarTitle=e.game_info.nick_name)),
e.dest_type===CANVAS_AD_DEST_TYPE&&(t.btn_text="查看详情"),e.cpc_exp_info&&e.cpc_exp_info.exp_content){
var i=e.cpc_exp_info.exp_content;
try{
for(var n=JSON.parse(i.replace(/&quot;/g,'"')),p=-1,o=0;o<n.aid_list.length;o++)n.aid_list[o].aid==e.aid&&(p=o);
p>-1&&(t.icon_pos=n.icon_pos||"",t.btn_text=n.btn_text||t.btn_text,t.price=n.aid_list[p].price,
t.sale_text=n.aid_list[p].sale_text,window.__addIdKeyReport("68064",15));
}catch(_){
window.__addIdKeyReport("68064",16);
}
}
return e.exp_obj=t,e;
}
function _checkShowCpc(){
if(globalAdDebug)return!0;
if(js_cpc_area){
var e=(document.documentElement.clientHeight||window.innerHeight)/2,a=js_cpc_area.offsetTop,t=contentWrp.offsetHeight;
return e>a||e>t-a?!1:!0;
}
}
function lazyLoadAdImg(e){
for(var a=document.getElementsByClassName("js_alazy_img"),t=0;t<a.length;t++){
var i=a[t];
a[t].onload=function(){
window.__addIdKeyReport("28307",54),i.src.indexOf("retry")>-1&&window.__addIdKeyReport("28307",69);
},a[t].onerror=function(){
if(-1==i.src.indexOf("retry"))i.src=ParseJs.addParam(i.src,"retry",1);else{
window.__addIdKeyReport("28307",98);
var a="other";
mmversion.isIOS?a="iphone":mmversion.isAndroid&&(a="android"),window.setTimeout(function(){
var t=window.networkType||"unknow";
ajax({
url:"http://mp.weixin.qq.com/tp/datacenter/report?cmd=report&id=900023&os="+a+"&uin=777&aid="+e.aid+"&image_url="+encodeURIComponent(i.src)+"&type="+e.type+"&network="+t,
type:"GET",
async:!0
});
},500),reportAdImgLoadFail(e,i.src);
}
window.__addIdKeyReport("28307",57);
},a[t].src=a[t].dataset.src;
}
}
function getHost(e){
if(!e)return"";
var a=document.createElement("a");
return a.href=e,a.hostname;
}
function checkAdImg(e){
if(e){
var a=["wximg.qq.com","wximg.gtimg.com","pgdt.gtimg.cn","mmsns.qpic.cn","mmbiz.qpic.cn","vweixinthumb.tc.qq.com","pp.myapp.com","wx.qlog.cn","mp.weixin.qq.com"],t=e.image_url||"",i=getHost(t);
return void(i&&-1==a.indexOf(i)&&window.__addIdKeyReport("28307",58));
}
}
function saveCopyArr(e){
for(var a=[],t=0;t<e.length;++t){
var i=e[t],n=typeof i;
i="string"==n?i.htmlDecode():i,"object"==n&&(i="[object Array]"==Object.prototype.toString.call(i)?saveCopyArr(i):saveCopy(i)),
a.push(i);
}
return a;
}
function saveCopy(e){
var a={};
for(var t in e)if(e.hasOwnProperty(t)){
var i=e[t],n=typeof i;
i="string"==n?i.htmlDecode():i,"object"==n&&(i="[object Array]"==Object.prototype.toString.call(i)?saveCopyArr(i):saveCopy(i)),
a[t]=i;
}
return a;
}
function formName(e){
for(var a=[" ","-","(",":",'"',"'","：","（","—","－","“","‘"],t=-1,i=0,n=a.length;n>i;++i){
var p=a[i],o=e.indexOf(p);
-1!=o&&(-1==t||t>o)&&(t=o);
}
return-1!=t&&(e=e.substring(0,t)),e;
}
function formSize(e){
return"number"!=typeof e?e:(e>=1024?(e/=1024,e=e>=1024?(e/1024).toFixed(2)+"MB":e.toFixed(2)+"KB"):e=e.toFixed(2)+"B",
e);
}
function debounce(e,a,t){
var i;
return function(){
var n=this,p=arguments,o=function(){
i=null,t||e.apply(n,p);
},_=t&&!i;
i||(i=setTimeout(o,a),_&&e.apply(n,p));
};
}
function seeAds(){
var adDatas=window.adDatas;
if(adDatas&&adDatas.num>0){
var onScroll=debounce(function(){
for(var scrollTop=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,i=0;total_pos_type>i;++i)!function(i){
var pos_key="pos_"+i,gdt_a=gdt_as[pos_key];
if(gdt_a=!!gdt_a&&gdt_a[0],gdt_a&&gdt_a.dataset&&gdt_a.dataset.apurl){
var aInfo=adDatas.ads[pos_key].a_info,gid=gdt_a.dataset.gid,tid=gdt_a.dataset.tid,aid=gdt_a.dataset.aid,apurl=gdt_a.dataset.apurl,is_cpm=1*gdt_a.dataset.is_cpm,ads=adDatas.ads,a_info=ads[pos_key].a_info||{},exp_info=a_info.exp_info||{},exp_id=exp_info.exp_id||"",exp_value=exp_info.exp_value||[],pos_type=aInfo.pos_type,gdt_area=el_gdt_areas[pos_key],offsetTop=gdt_area.offsetTop,adHeight=gdt_a.clientHeight,adOffsetTop=offsetTop+gdt_a.offsetTop,gh_id="",pt=aInfo.pt,signData={
click_pos:"",
rl:encodeURIComponent(a_info.rl),
__biz:biz,
pos_x:"",
pos_y:"",
press_interval:""
};
adDatas.ads[pos_key]&&aInfo&&aInfo.weapp_info&&aInfo.weapp_info.original_id&&(gh_id=aInfo.weapp_info.original_id),
adDatas.ads[pos_key].ad_engine=0;
try{
exp_value=JSON.stringify(exp_value);
}catch(e){
exp_value="[]";
}
if(-1!=apurl.indexOf("ad.wx.com")&&(adDatas.ads[pos_key].ad_engine=1),scrollTop+innerHeight>offsetTop&&offsetTop+adHeight>scrollTop?showTime.startShow(aInfo):showTime.stopShow(aid),
!ping_apurl[pos_key]&&scrollTop+innerHeight>offsetTop){
ping_apurl[pos_key]=!0;
var report_arg="trace_id="+tid+"&product_type="+pt+"&logtype=2&url="+encodeURIComponent(location.href)+"&apurl="+encodeURIComponent(apurl);
tid&&mmversion.gtVersion("6.3.22",!0)&&JSAPI.invoke("adDataReport",{
ad_info:report_arg
},function(){}),log("[Ad] seeAd, tid="+tid+", aid="+aid+", pos_type="+pos_type),
Sign.createSign(signData,function(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj){
ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&aid="+aid+"&gh_id="+gh_id+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl)+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pos_type="+pos_type+"&exp_id="+exp_id+"&exp_value="+exp_value+"&r="+Math.random()+"&ad_sign_data="+adSignData+"&ad_sign_k1="+adSignK1+"&ad_sign_k2="+adSignK2+"&ad_sign_md5="+signMd5+"&viewid="+viewidKeyObj.viewid,
success:function(res){
log("[Ad] seeAd report success, tid="+tid+", aid="+aid+", pos_type="+pos_type);
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret?ping_apurl[pos_key]=!1:ping_apurl.pos_0&&ping_apurl.pos_1;
},
error:function(){
log("[Ad] seeAd report error, tid="+tid+", aid="+aid+", pos_type="+pos_type),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_27_1";
},
async:!0
});
});
}
var ping_cpm_apurl_obj=ping_cpm_apurl[pos_key];
if(is_cpm&&!ping_cpm_apurl_obj.hasPing){
var rh=.5;
scrollTop+innerHeight>=adOffsetTop+adHeight*rh&&adOffsetTop+adHeight*(1-rh)>=scrollTop?3==pos_type?(ping_cpm_apurl_obj.hasPing=!0,
Sign.createSign(signData,function(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj){
ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&aid="+aid+"&gh_id="+gh_id+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl+"&viewable=true")+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pos_type="+pos_type+"&r="+Math.random()+"&ad_sign_k1="+adSignK1+"&ad_sign_k2="+adSignK2+"&ad_sign_md5="+signMd5+"&viewid="+viewidKeyObj.viewid,
mayAbort:!0,
success:function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret&&(ping_cpm_apurl_obj.hasPing=!1);
},
async:!0
});
})):ping_cpm_apurl_obj.clk||(ping_cpm_apurl_obj.clk=setTimeout(function(){
ping_cpm_apurl_obj.hasPing=!0,Sign.createSign(signData,function(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj){
ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&aid="+aid+"&gh_id="+gh_id+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl+"&viewable=true")+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pos_type="+pos_type+"&exp_id="+exp_id+"&exp_value="+exp_value+"&r="+Math.random()+"&ad_sign_k1="+adSignK1+"&ad_sign_k2="+adSignK2+"&ad_sign_md5="+signMd5+"&viewid="+viewidKeyObj.viewid,
mayAbort:!0,
success:function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret&&(ping_cpm_apurl_obj.hasPing=!1);
},
async:!0
});
});
},1001)):3!=pos_type&&ping_cpm_apurl_obj.clk&&(clearTimeout(ping_cpm_apurl_obj.clk),
ping_cpm_apurl_obj.clk=null);
}
var allReport=!0;
if(107==pt||108==pt||110==pt)for(var i=0;i<see_ad_detail_report.length;i++)if(see_ad_detail_report[i])allReport=!1;else{
var report_url=location.protocol+"//mp.weixin.qq.com/mp/ad_report?action=see_report&aid="+aid+"&tid="+tid;
if((0==i&&scrollTop+innerHeight>offsetTop+1||1==i&&scrollTop+innerHeight>offsetTop+.5*adHeight||2==i&&scrollTop+innerHeight>offsetTop+adHeight)&&((new Image).src=report_url+"&seepos="+(i+1)+"&report_type=0",
see_ad_detail_report[i]=!0),i>=3)if(scrollTop+innerHeight>offsetTop&&offsetTop+adHeight>scrollTop){
if(see_ad_detail_first_see_time>0){
var t=0;
3==i&&(t=500),4==i&&(t=1e3),5==i&&(t=2e3),+new Date-see_ad_detail_first_see_time>t?((new Image).src=report_url+"&seetime="+t+"&report_type=1",
see_ad_detail_report[i]=!0):window.setTimeout(function(){
seeAds();
},t);
}
0==see_ad_detail_first_see_time&&(see_ad_detail_first_see_time=+new Date);
}else see_ad_detail_first_see_time=0;
}
}
}(i);
},50);
DomEvent.on(window,"scroll",onScroll),onScroll();
}
}
function imgReport(e){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=68064_"+e+"_1&r="+Math.random();
}
function imgReportBadJs(e){
var a=Math.random();
.5>a&&((new Image).src="https://badjs.weixinbridge.com/badjs?id=102&level=4&from="+encodeURIComponent(location.host)+"&msg="+encodeURIComponent(e));
}
function openWebAppStore(e,a){
var t=navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
return t&&t[1]&&parseInt(t[1].split("_")[0],10)>=12?void OpenUrlWithExtraWebview("http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(e)+"&ticket="+a+"#wechat_redirect"):void JSAPI.invoke("downloadAppInternal",{
appUrl:e
},function(t){
t.err_msg&&-1!=t.err_msg.indexOf("ok")||OpenUrlWithExtraWebview("http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(e)+"&ticket="+a+"#wechat_redirect");
});
}
function openCanvasAd(e){
JSAPI.invoke("openADCanvas",{
canvasId:e.canvasId,
preLoad:0,
noStore:0,
extraData:JSON.stringify({
pos_type:e.pos_type
}),
adInfoXml:e.adInfoXml
},function(a){
0!=a.ret?(OpenUrlWithExtraWebview(e.url),report(135,e.report_param)):report(134,e.report_param);
});
}
function isItunesLink(e){
return/^https?:\/\/itunes\.apple\.com\//.test(e);
}
function ad_click(e,a,t,i,n,p,o,_,r,d,s,c,l,m,u,f,g,y,v){
if(!has_click[n]){
has_click[n]=!0;
{
var w=document.getElementById("loading_"+n);
g.product_type;
}
w&&(w.style.display="inline");
var h=g.exp_info||{},b=h.exp_id||"",x=h.exp_value||[];
try{
x=JSON.stringify(x);
}catch(j){
x="[]";
}
var k="";
c&&c.weapp_info&&c.weapp_info.original_id&&(k=c.weapp_info.original_id),AdClickReport({
click_pos:1,
report_type:2,
type:e,
exp_id:b,
exp_value:x,
url:encodeURIComponent(a),
tid:n,
aid:_,
rl:encodeURIComponent(t),
__biz:biz,
pos_type:d,
pt:r,
pos_x:l,
pos_y:m,
ad_w:u,
ad_h:f,
gh_id:k,
press_interval:window.__a_press_interval||-1
},function(){
if(has_click[n]=!1,w&&(w.style.display="none"),g.app_info){
var t=handleApp(a,n,idx,mid,biz,r,_,s,d,c,g,p,y);
if(t)return;
}
if(isCanvasAd(g))return void openCanvasAd({
canvasId:g.canvas_info.canvas_id,
adInfoXml:g.canvas_info.ad_info_xml,
pos_type:d,
report_param:y,
url:a
});
if(v)1==g.dest_type?handleH5(a,n,idx,mid,biz,r,_,s,d,c,g):6==g.dest_type?Wxopen_card.openWxopen(c):0==g.dest_type?OpenUrlWithExtraWebview(a):(console.info("[广告新协议兜底跳转]",g),
OpenUrlWithExtraWebview(a));else if("5"==e)OpenUrlWithExtraWebview("/mp/profile?source=from_ad&tousername="+a+"&ticket="+p+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+n);else{
if("105"==r&&c)return void Card.openCardDetail(c.card_id,c.card_ext,c);
if("106"==r&&c)return void OpenUrlWithExtraWebview(ParseJs.join(a,{
outer_id:c.outer_id
}));
if("118"==r||"119"==r||"120"==r)return void Wxopen_card.openWxopen(c);
if(6===g.dest_type)return void Wxopen_card.openWxopen(c);
if(-1==a.indexOf("mp.weixin.qq.com"))a="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(a);else if(-1==a.indexOf("mp.weixin.qq.com/s")&&-1==a.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var i={
source:4,
tid:n,
idx:idx,
mid:mid,
appuin:biz,
pt:r,
aid:_,
ad_engine:s,
pos_type:d
},o=window.__report;
if(("104"==r||"113"==r||"114"==r||"122"==r)&&c||-1!=a.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var l="",m="";
c&&(l=c.pkgname&&c.pkgname.replace(/\./g,"_"),m=c.channel_id||""),i={
source:4,
tid:n,
traceid:n,
mid:mid,
idx:idx,
appuin:biz,
pt:r,
channel_id:m,
aid:_,
engine:s,
pos_type:d,
pkgname:l
};
}
a=URL.join(a,i),(0==a.indexOf("http://mp.weixin.qq.com/promotion/")||0==a.indexOf("https://mp.weixin.qq.com/promotion/"))&&(a=URL.join(a,{
traceid:n,
aid:_,
engine:s
})),!_&&o&&o(80,a);
}
OpenUrlWithExtraWebview(a);
}
});
}
}
function bindAdOperation(){
seeAds();
for(var e=0;total_pos_type>e;++e)!function(e){
var a="pos_"+e,t=el_gdt_areas[a];
if(!t)return!1;
if(!t.getElementsByClassName&&t.style)return t.style.display="none",!1;
var i=t.getElementsByClassName("js_ad_link")||[],n=adDatas.ads[a],p=t.getElementsByClassName("js_ad_opt_list_btn_"+e),o=t.getElementsByClassName("js_complain_btn_"+e);
if(n){
var _,r,d=n.adData,s=n.a_info,c=s.pos_type,l=n.ad_engine;
if(2==s.use_new_protocol){
var m=t.getElementsByClassName("js_material_"+e),u=t.getElementsByClassName("js_ad_action_"+e);
if(m.length>0&&(r=m[0].dataset.tid,_=m[0].dataset.aid,DomEvent.on(m[0],"click",function(a){
var t=m[0].dataset,i=!!a&&a.target;
if(t&&3!=s.pos_type){
var n=t.type,p=t.url,o=t.rl,u=t.apurl,f=t.ticket,g=t.group_id,y=t.pt,v=s.use_new_protocol;
if(d){
d.adid=window.adid||d.adid||d.aid;
var w="&tid="+d.traceid+"&uin="+uin+"&key="+key+"&ticket="+(d.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+d.adid+"&ad_engine="+l+"&pos_type="+c+"&r="+Math.random();
}
var h,b,x,j;
return h=position.getX(i,"js_material_"+e)+a.offsetX,b=position.getY(i,"js_material_"+e)+a.offsetY,
x=m[0].clientWidth,j=m[0].clientHeight,ad_click(n,p,o,u,r,f,g,_,y,c,l,d,h,b,x,j,s,w,v),
log("[Ad] ad_click: type="+n+", url="+p+", rl="+o+", apurl="+u+", traceid="+r+", ticket="+f+", group_id="+g+", aid="+_+", pt="+y+", pos_type="+c+", ad_engine="+l),
!1;
}
})),u.length>0&&s.button_action&&3!=s.pos_type)if(s.product_type===ANDROID_APP_PRODUCT_TYPE||s.product_type===IOS_APP_PRODUCT_TYPE){
var f=require("a/app_card.js"),g=15,y=d.pkgname&&d.pkgname.replace(/\./g,"_");
new f({
btn:u[0],
adData:d,
report_param:P,
pos_type:c,
url_scheme:d.url_scheme,
via:[d.traceid,d.adid,y,source,g,l].join("."),
ticket:d.ticket,
appdetail_params:["&aid="+d.adid,"traceid="+d.traceid,"pkgname="+y,"source="+source,"type="+g,"engine="+l,"appuin="+biz,"pos_type="+c,"ticket="+d.ticket,"scene="+scene].join("&"),
engine:l,
percentStatus:function(e,a){
var t=ad_render_object["pos_"+s.pos_type].getData();
t.percent=a,"downloading"==e?t.btn_text="暂停":"paused"==e?t.btn_text="继续":"installed"==e?(t.percent=0,
t.btn_text="已安装"):"downloaded"==e?(t.percent=0,t.btn_text="安装"):"gotodetail"==e?(t.percent=0,
t.btn_text="进入"):(t.percent=0,t.btn_text="进入应用"),ad_render_object["pos_"+s.pos_type].updateData(t);
}
});
}else if(23==s.product_type){
var v=require("a/profile.js");
d.adid=window.adid||d.adid||d.aid,new v({
btnProfile:u[0],
adData:d,
pos_type:c,
report_param:P,
aid:d.adid,
ad_engine:l
});
}else DomEvent.on(u[0],"click",function(a){
var t=m[0].dataset,i=!!a&&a.target,n=t.type,p=s.button_action.jump_url,o=t.rl,_=t.apurl,r=t.tid,f=t.ticket,g=t.group_id,y=t.aid,v=t.pt,w=s.use_new_protocol;
if(console.info("[广告新协议点击素材]",s.dest_type,s.product_type),d){
d.adid=window.adid||d.adid||d.aid;
var h="&tid="+d.traceid+"&uin="+uin+"&key="+key+"&ticket="+(d.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+d.adid+"&ad_engine="+l+"&pos_type="+c+"&r="+Math.random();
}
var b,x,j,k;
return b=position.getX(i,"js_ad_action_"+e)+a.offsetX,x=position.getY(i,"js_ad_action_"+e)+a.offsetY,
j=u[0].clientWidth,k=u[0].clientHeight,ad_click(n,p,o,_,r,f,g,y,v,c,l,d,b,x,j,k,s,h,w),
log("[Ad] ad_click: type="+n+", url="+p+", rl="+o+", apurl="+_+", traceid="+r+", ticket="+f+", group_id="+g+", aid="+y+", pt="+v+", pos_type="+c+", ad_engine="+l),
!1;
});
}else for(var w=0,h=i.length;h>w;++w)!function(e,a){
var t=i[e],n=t.dataset;
if(n&&3!=s.pos_type){
var p=n.type,o=n.url,d=n.rl,m=n.apurl,u=n.ticket,f=n.group_id,g=n.pt,y=s.use_new_protocol,v=!0;
r=n.tid,_=n.aid,(y&&(s.product_type===ANDROID_APP_PRODUCT_TYPE||s.product_type===IOS_APP_PRODUCT_TYPE)||115===g)&&(v=!1),
4==s.pos_type&&(v=!1),DomEvent.on(t,"click",function(e){
var t=!!e&&e.target,i=[ANDROID_APP_PRODUCT_TYPE,IOS_APP_PRODUCT_TYPE,23];
if(!t||!t.className||4==c&&a&&-1==i.toString().indexOf(a.product_type)||-1==t.className.indexOf("js_ad_btn")&&-1==t.className.indexOf("js_btn_process")&&-1==t.className.indexOf("js_muted_btn")&&-1==t.className.indexOf("js_poster_cover")&&-1==t.className.indexOf("js_ad_opt_list_btn")&&-1==t.className.indexOf("js_complain_btn")&&-1==t.className.indexOf("js_view_profile")&&-1==t.className.indexOf("js_add_contact")){
if(a){
a.adid=window.adid||a.adid||a.aid;
var n="&tid="+a.traceid+"&uin="+uin+"&key="+key+"&ticket="+(a.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+a.adid+"&ad_engine="+l+"&pos_type="+c+"&r="+Math.random();
s&&s.has_installed&&("104"==a.pt||"113"==a.pt||"114"==a.pt||"2"==a.pt)?report(114,n):"103"==a.pt||"111"==a.pt||"112"==a.pt?report(23,n):("104"==a.pt||"113"==a.pt||"114"==a.pt)&&report(25,n);
}
var v,w,h,b;
return v=position.getX(t,"js_ad_link")+e.offsetX,w=position.getY(t,"js_ad_link")+e.offsetY,
h=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
b=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight,
ad_click(p,o,d,m,r,u,f,_,g,c,l,a,v,w,h,b,s,n,y),log("[Ad] ad_click: type="+p+", url="+o+", rl="+d+", apurl="+m+", traceid="+r+", ticket="+u+", group_id="+f+", aid="+_+", pt="+g+", pos_type="+c+", ad_engine="+l),
!1;
}
},v),DomEvent.on(t,"touchstart",function(){
window.__a_press_interval=+new Date;
}),DomEvent.on(t,"touchend",function(){
window.__a_press_interval=+new Date-window.__a_press_interval;
});
}
}(w,d);
if(p[0]&&DomEvent.on(p[0],"click",function(){
if(parseInt(window.can_see_complaint)){
var e=document.getElementsByClassName("js_ad_opt_list_"+s.pos_type);
adOptReport(0,s.pos_type,r,_),e&&e[0]&&(e[0].style.display="none"==e[0].style.display?"block":"none");
}
return!1;
}),o[0]&&DomEvent.on(o[0],"click",function(){
var e="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/feedback.html?aid="+_+"&traceid="+r+"&source="+s.pos_type+"&biz="+window.biz;
return adOptReport(1,s.pos_type,r,_),mmversion.isWp||mmversion.isIOS||mmversion.isAndroid?JSAPI.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=e);
}):OpenUrlWithExtraWebview(e),!1;
}),d&&2!=s.use_new_protocol){
d.adid=window.adid||d.adid||d.aid;
var b=s.exp_info||{},x=b.exp_id||"",j=b.exp_value||[];
try{
j=JSON.stringify(j);
}catch(k){
j="[]";
}
var P="&tid="+d.traceid+"&uin="+uin+"&key="+key+"&ticket="+(d.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+d.adid+"&ad_engine="+l+"&pos_type="+c+"&exp_id="+x+"&exp_value="+j+"&r="+Math.random();
if(d.report_param=P,d.use_new_protocol){
if(s.product_type===ANDROID_APP_PRODUCT_TYPE||s.product_type===IOS_APP_PRODUCT_TYPE){
var f=require("a/app_card.js"),g=15,y=d.pkgname&&d.pkgname.replace(/\./g,"_"),I=document.getElementById("js_ad_btn_"+c);
new f({
btn:I,
adData:d,
report_param:P,
pos_type:c,
url_scheme:d.url_scheme,
via:[d.traceid,d.adid,y,source,g,l].join("."),
ticket:d.ticket,
appdetail_params:["&aid="+d.adid,"traceid="+d.traceid,"pkgname="+y,"source="+source,"type="+g,"engine="+l,"appuin="+biz,"pos_type="+c,"ticket="+d.ticket,"scene="+scene].join("&"),
engine:l
});
}else if(23==s.product_type){
var v=require("a/profile.js");
new v({
btnProfile:document.getElementById("js_ad_btn_"+c),
btnViewProfile:document.getElementById("js_view_profile_"+c),
btnAddContact:document.getElementById("js_add_contact_"+c),
adData:d,
pos_type:c,
report_param:P,
aid:d.adid,
ad_engine:l,
a_info:s
});
}
if(9==s.material_type){
s.report_param=P;
var O=require("a/video.js");
new O(s);
}
}else{
if("100"==d.pt||"115"==d.pt){
var v=require("a/profile.js");
return void new v({
btnViewProfile:document.getElementById("js_view_profile_"+c),
btnAddContact:document.getElementById("js_add_contact_"+c),
adData:d,
pos_type:c,
report_param:P,
aid:d.adid,
ad_engine:l,
a_info:s
});
}
if("102"==d.pt){
var T=require("a/android.js"),g=15,y=d.pkgname&&d.pkgname.replace(/\./g,"_");
return void new T({
btn:document.getElementById("js_app_action_"+c),
adData:d,
report_param:P,
task_ext_info:[d.adid,d.traceid,y,source,g,l].join("."),
via:[d.traceid,d.adid,y,source,g,l].join(".")
});
}
if("101"==d.pt){
var D=require("a/ios.js");
return void new D({
btn:document.getElementById("js_app_action_"+c),
adData:d,
ticket:d.ticket,
report_param:P
});
}
if("105"==d.pt)return void new Card({
btn:document.getElementById("js_card_action_"+c),
adData:d,
report_param:P,
pos_type:c
});
if("106"==d.pt)return void new MpShop({
btn:document.getElementById("js_shop_action_"+c),
adData:d,
report_param:P,
pos_type:c
});
if("103"==d.pt||"104"==d.pt||"111"==d.pt||"112"==d.pt||"113"==d.pt||"114"==d.pt||"121"==d.pt||"122"==d.pt){
var f=require("a/app_card.js"),g=15,y=d.pkgname&&d.pkgname.replace(/\./g,"_");
return void new f({
btn:document.getElementById("js_appdetail_action_"+c),
js_app_rating:document.getElementById("js_app_rating_"+c),
adData:d,
report_param:P,
pos_type:c,
url_scheme:d.url_scheme,
via:[d.traceid,d.adid,y,source,g,l].join("."),
ticket:d.ticket,
appdetail_params:["&aid="+d.adid,"traceid="+d.traceid,"pkgname="+y,"source="+source,"type="+g,"engine="+l,"appuin="+biz,"pos_type="+c,"ticket="+d.ticket,"scene="+scene].join("&"),
engine:l
});
}
if("108"==d.pt||"109"==d.pt||"110"==d.pt||"116"==d.pt||"117"==d.pt){
var E=require("a/sponsor.js");
new E({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adVideo:document.getElementById("js_video_container"),
adComplain:document.getElementById("js_btn_complain"),
adData:d,
a_info:s,
pos_type:c,
report_param:P
});
}
if("118"==s.pt&&(d.report_param=P),"125"==s.pt){
s.report_param=P;
var O=require("a/video.js");
new O(s);
}
}
}
}
}(e);
}
function extend(e,a){
for(var t in a)e[t]=a[t];
return e;
}
function isCanvasAd(e){
return!!e.canvas_info&&e.dest_type===CANVAS_AD_DEST_TYPE;
}
function launchIosAppBackup(e,a,t,i,n,p,o,_,r,d,s,c,l){
return isCanvasAd(s)?void openCanvasAd({
canvasId:s.canvas_info.canvas_id,
adInfoXml:s.canvas_info.ad_info_xml,
pos_type:r,
report_param:l,
url:e
}):1===s.dest_type?void handleH5(e,a,t,i,n,p,o,_,r,d,s):6===s.dest_type?void Wxopen_card.openWxopen(d):void openWebAppStore(s.app_info.appinfo_url,c);
}
function handleApp(e,a,t,i,n,p,o,_,r,d,s,c,l){
console.info("[广告处理下载事件]",s);
var m=arguments;
if(s.has_installed&&!isItunesLink(s.app_info.appinfo_url)&&s.app_info.url_scheme)return JSAPI.invoke("launchApplication",{
schemeUrl:s.app_info.url_scheme
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=s.app_info.url_scheme);
}),!0;
if(isItunesLink(s.app_info.appinfo_url))return s.app_info.url_scheme&&mmversion.gtVersion("6.5.6",!0)?JSAPI.invoke("launchApplication",{
schemeUrl:s.app_info.url_scheme
},function(){
launchIosAppBackup.apply(null,m);
}):launchIosAppBackup.apply(null,m),!0;
if(s.product_type!==ANDROID_APP_PRODUCT_TYPE&&s.product_type!==IOS_APP_PRODUCT_TYPE)return!1;
if(isCanvasAd(s))return openCanvasAd({
canvasId:s.canvas_info.canvas_id,
adInfoXml:s.canvas_info.ad_info_xml,
pos_type:r,
report_param:l,
url:e
}),!0;
if(-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var u={
source:4,
tid:a,
idx:t,
mid:i,
appuin:n,
pt:p,
aid:o,
ad_engine:_,
pos_type:r
},f=window.__report;
if(d||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var g="",y="";
d&&(g=d.pkgname&&d.pkgname.replace(/\./g,"_"),y=d.channel_id||""),u={
source:4,
tid:a,
traceid:a,
mid:i,
idx:t,
appuin:n,
pt:p,
channel_id:y,
aid:o,
engine:_,
pos_type:r,
pkgname:g
};
}
e=URL.join(e,u),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=URL.join(e,{
traceid:a,
aid:o,
engine:_
})),!o&&f&&f(80,e);
}
return OpenUrlWithExtraWebview(e),!0;
}
function handleH5(e,a,t,i,n,p,o,_,r,d,s){
if(console.info("[广告处理H5事件]",s),-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var c={
source:4,
tid:a,
idx:t,
mid:i,
appuin:n,
pt:p,
aid:o,
ad_engine:_,
pos_type:r
},l=window.__report;
if(("104"==p||"113"==p||"114"==p||"122"==p)&&d||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var m="",u="";
d&&(m=d.pkgname&&d.pkgname.replace(/\./g,"_"),u=d.channel_id||""),c={
source:4,
tid:a,
traceid:a,
mid:i,
idx:t,
appuin:n,
pt:p,
channel_id:u,
aid:o,
engine:_,
pos_type:r,
pkgname:m
};
}
e=URL.join(e,c),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=URL.join(e,{
traceid:a,
aid:o,
engine:_
})),!o&&l&&l(80,e);
}
console.info("[广告H5落地页最终URL]",e),OpenUrlWithExtraWebview(e);
}
function reportAdImgLoadFail(e,a){
var t=0;
mmversion.isIOS?t=1:mmversion.isAndroid&&(t=2);
var i={
creative_load_fail:[{
ts:parseInt(+new Date/1e3),
aid:parseInt(e.info.aid),
img_url:a,
network_type:window.networkType,
errmsg:"",
os_type:t,
client_version:parseInt(window.clientversion),
traceid:e.info.traceid
}]
};
i=JSON.stringify(i),ajax({
url:"/mp/advertisement_report?action=extra_report&extra_data="+i+"&__biz="+biz,
type:"GET",
timeout:2e3,
success:function(e){
console.log(e);
}
});
}
var mmversion=require("biz_wap/utils/mmversion.js"),js_bottom_ad_area=document.getElementById("js_bottom_ad_area"),js_sponsor_ad_area=document.getElementById("js_sponsor_ad_area"),js_cpc_area=document.getElementsByTagName("mpcpc"),contentWrp=document.getElementById("js_content"),gdt_pos_4={},Device=require("biz_wap/utils/device.js"),Sign=require("a/a_sign.js"),OpenUrlWithExtraWebview=require("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,getParaList=require("biz_common/utils/get_para_list.js"),showTime=require("biz_wap/utils/show_time.js"),ANDROID_APP_PRODUCT_TYPE=12,IOS_APP_PRODUCT_TYPE=19,CANVAS_AD_DEST_TYPE=9;
js_cpc_area.length>0?(js_cpc_area=document.getElementsByTagName("mpcpc")[0],gdt_pos_4=js_cpc_area.getElementsByClassName("js_ad_link")):js_cpc_area=void 0;
var globalAdDebug=!!_GetQuery("mock"),pos_type=window.pos_type||0,__report=window.__report,total_pos_type=5,el_gdt_areas={
pos_4:js_cpc_area,
pos_3:js_sponsor_ad_area,
pos_0:js_bottom_ad_area
},ad_render_object={
pos_4:null,
pos_3:null,
pos_0:null
},gdt_as={
pos_4:gdt_pos_4,
pos_3:js_sponsor_ad_area.getElementsByClassName("js_ad_link"),
pos_0:js_bottom_ad_area.getElementsByClassName("js_ad_link")
},isScroll=!1,isSee=!1;
window.adDatas={
ads:{},
num:0
};
var adDatas=window.adDatas,has_click={},DomEvent=require("biz_common/dom/event.js"),URL=require("biz_common/utils/url/parse.js"),AReport=require("a/a_report.js"),AdClickReport=AReport.AdClickReport,ajax=require("biz_wap/utils/ajax.js"),position=require("biz_wap/utils/position.js"),Card=require("a/card.js"),Wxopen_card=require("a/wxopen_card.js"),MpShop=require("a/mpshop.js"),JSAPI=require("biz_wap/jsapi/core.js"),ParseJs=require("biz_common/utils/url/parse.js"),TMPL=require("biz_common/tmpl.js"),a_tpl=require("a/a_tpl.html.js"),sponsor_a_tpl=require("a/sponsor_a_tpl.html.js"),cpc_a_tpl=require("a/cpc_a_tpl.html.js"),Report=require("biz_common/utils/report.js"),Class=require("biz_common/dom/class.js"),LS=require("biz_wap/utils/storage.js"),ParseJs=require("biz_common/utils/url/parse.js"),log=require("appmsg/log.js"),CrtManager=require("a/tpl/crt_tpl_manager.js"),ping_apurl={
pos_0:!1,
pos_1:!1,
pos_3:!1,
pos_4:!1
},ping_cpm_apurl={
pos_0:{},
pos_1:{},
pos_3:{},
pos_4:{}
},ping_test_apurl={
pos_0:[],
pos_1:[],
pos_3:[],
pos_4:[]
},see_ad_detail_report=[!1,!1,!1,!1,!1,!1],see_ad_detail_first_see_time=0,ping_test_apurl_random=Math.random()<.3,innerHeight=window.innerHeight||document.documentElement.clientHeight,innerHeight_new=getWindowHeight(),ad_engine=0,keyOffset="https:"==location.protocol?5:0;
return{
checkNeedAds:checkNeedAds,
afterGetAdData:afterGetAdData
};
});define("rt/appmsg/getappmsgext.rt.js",[],function(){
"use strict";
return{
base_resp:{
ret:"number",
errmsg:"string",
wxtoken:"number"
},
advertisement_num:"number",
advertisement_info:[{
hint_txt_R:"string",
url_R:"string",
type_R:"string",
rl_R:"string",
apurl_R:"string",
traceid_R:"string",
group_id_R:"string",
ticket:"string",
aid:"string",
pt:"number",
image_url:"string",
ad_desc:"string",
biz_appid:"string",
pos_type:"number",
watermark_type:"number",
logo:"string",
app_info:{},
biz_info:{},
card_info:{}
}],
comment_enabled:"number",
appmsgticket:{
ticket:"string"
},
self_head_imgs:"string",
appmsgstat:{
ret:"number",
show:"boolean",
is_login:"boolean",
like_num:"number",
liked:"boolean",
read_num:"number",
real_read_num:"number"
},
timestamp:"number",
reward_total_count:"number",
reward_head_imgs:["string"]
};
});define("pages/video_communicate_adaptor.js",[],function(){
"use strict";
function t(){
window.addEventListener("message",e,!1),s();
}
function e(t){
var e;
if(t.origin?e=t.origin:t.originalEvent&&(e=t.originalEvent.origin),/^http(s)?\:\/\/mp\.weixin\.qq\.com$/.test(e)&&t.source){
var i=t.data;
if(i&&i.type){
if(!/^mpvideo_/.test(i.type))return;
var o=i.type.replace(/^mpvideo_/,"");
/^broadcast_/.test(o)?f.postMessageEvt.broadcast({
data:i.data,
type:o
}):f.postMessageEvt[o]&&f.postMessageEvt[o](i.data);
}
}
}
function i(t){
var e=t.type.replace(/^broadcast_/,""),i=a();
if(i.length>0)for(var n=0,r=i.length;r>n;n++){
var d=i[n];
o({
win:d.contentWindow,
type:e,
data:t.data
});
}
o({
win:window,
type:e,
data:t.data
});
}
function o(t){
var e=t.type;
/^mpvideo_/.test(e)||(e="mpvideo_"+e);
var i={
data:t.data,
type:e
};
t.win.postMessage(i,document.location.protocol+"//mp.weixin.qq.com");
}
function n(t){
var e=a({
vid:t.vid
});
if(0!=e.length)for(var i=0,o=e.length;o>i;i++){
var n=e[i];
n.style.display="";
var r=n.parentNode,d=r.querySelectorAll('.js_img_loading[data-vid="'+t.vid+'"]');
if(d&&d.length>0)for(var i=0,o=d.length;o>i;i++)r.removeChild(d[i]);
}
}
function a(t){
t=t||{};
for(var e=document.getElementsByTagName("iframe"),i=[],o=0,n=e.length;n>o;o++){
var a=e[o],r=a.getAttribute("src");
if(r&&-1!=r.indexOf("/mp/videoplayer")){
if("undefined"!=typeof t.vid){
var d=r.match(/[\?&]vid\=([^&]*)/);
if(!d||!d[1]||d[1]!=t.vid)continue;
}
i.push(a);
}
}
return i;
}
function r(t){
if(t.height){
var e=a({
vid:t.vid
});
if(0!=e.length){
var i=e[0],o=i.offsetHeight+1*t.height;
i.setAttribute("height",o),i.setAttribute("data-additionalheight",t.height),i.style.setProperty&&i.style.setProperty("height",o+"px","important");
}
}
}
function d(t){
f.videoInfo[t.vid]||(f.videoInfo[t.vid]={}),f.videoInfo[t.vid].ori_status=t.ori_status,
f.videoInfo[t.vid].hit_bizuin=t.hit_bizuin;
}
function s(){
"function"==typeof window.__getVideoWh&&window.addEventListener("resize",function(){
for(var t=a(),e=0,i=t.length;i>e;e++){
var o=t[e];
setTimeout(function(t){
return function(){
var e=window.__getVideoWh(t),i=e.w,o=e.h,n=1*t.getAttribute("data-additionalheight");
n&&(o+=n),t.setAttribute("width",i),t.setAttribute("height",o),t.style.setProperty&&(t.style.setProperty("width",i+"px","important"),
t.style.setProperty("height",o+"px","important"));
};
}(o),50);
}
},!1);
}
function v(){
return f.videoInfo;
}
var f={
videoInfo:{},
postMessageEvt:{
broadcast:i,
removeVideoLoading:n,
addVideoIframeHeight:r,
videoInited:d
}
};
return t(),{
getVideoInfo:v
};
});define("biz_wap/utils/ajax_wx.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function s(e){
console.log(e),/^(http:\/\/|https:\/\/|\/\/)/.test(e.url)?/^\/\//.test(e.url)&&(e.url="https:"+e.url):e.url="https://mp.weixin.qq.com/"+e.url.replace(/^\//,""),
"html"!=e.f&&(-1==e.url.indexOf("?")?e.url+="?f=json":(-1==e.url.indexOf("?f=json")||-1==e.url.indexOf("&f=json"))&&(e.url+="&f=json"));
var s=null;
if("object"==typeof e.data){
var o=e.data;
s=[];
for(var n in o)o.hasOwnProperty(n)&&s.push(n+"="+encodeURIComponent(o[n]));
s=s.join("&");
}else s="string"==typeof e.data?e.data:null;
console.log("before request");
var a=1,i=function(e,s){
return r.invoke("request",{
url:e.url,
method:e.type,
data:s,
header:{
Cookie:document.cookie
}
},function(o){
if(console.log("jsapiRequest",o.err_msg),o.err_msg.indexOf(":ok")>-1){
var n={};
if(o.data){
console.log(e.dataType),console.log(e);
try{
n="json"==e.dataType?JSON.parse(o.data):o.data;
}catch(c){
return console.error(c),void(e.error&&e.error({}));
}
}
var l={};
try{
l=JSON.parse(o.data);
}catch(c){}
l.base_resp&&"-3"==l.base_resp.ret&&a>0?(a--,r.invoke("updatePageAuth",{},function(r){
console.log("updatePageAuth",r),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_3_1",
r&&r.err_msg&&r.err_msg.indexOf(":ok")>-1?(window.top.pass_ticket=encodeURIComponent(t.getQuery("pass_ticket",r.fullUrl).html(!1).replace(/\s/g,"+")),
e.pass_ticket&&(e.pass_ticket=window.top.pass_ticket),i(e,s),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_4_1"):e.success&&e.success(n);
})):e.success&&e.success(n);
}else o.err_msg.indexOf("no permission")>-1?Ajax(e):e.error&&e.error({});
e.complete&&e.complete();
});
};
return i(e,s);
}
e("biz_common/utils/string/html.js");
var t=e("biz_common/utils/url/parse.js"),r=e("biz_wap/jsapi/core.js");
return s;
});