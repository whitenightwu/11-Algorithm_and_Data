define("biz_wap/utils/storage.js",[],function(){
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
more_read_type:0,
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
tmp_version:1,
more_read_type:a.more_read_type
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
});define("a/a.js",["biz_wap/utils/mmversion.js","biz_wap/utils/device.js","a/a_sign.js","biz_wap/utils/openUrl.js","biz_common/utils/get_para_list.js","biz_wap/utils/show_time.js","biz_common/utils/url/parse.js","biz_common/dom/event.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","a/card.js","a/wxopen_card.js","a/mpshop.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","a/a_tpl.html.js","a/sponsor_a_tpl.html.js","a/cpc_a_tpl.html.js","biz_common/utils/report.js","biz_common/dom/class.js","biz_wap/utils/storage.js","appmsg/log.js","a/tpl/crt_tpl_manager.js","a/a_config.js","appmsg/cdn_img_lib.js","a/tpl/cpc_tpl.html.js","a/sponsor.js","a/video.js","a/app_card.js","a/profile.js","a/android.js","a/ios.js"],function(require,exports,module,alert){
"use strict";
function report(e,a){
Report("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+a);
}
function adOptReport(e,a,t,i){
Report("http://mp.weixin.qq.com/mp/ad_complaint?&action=report&type="+e+"&pos_type="+a+"&trace_id="+t+"&aid="+i+"&__biz="+window.biz+"&r="+Math.random());
}
function insertAfter(e,a){
var t=a.parentNode;
t.lastChild===a?t.appendChild(e):t.insertBefore(e,a.nextSibling);
}
function getPosKeyDesc(e,a){
var t=a?e+"_"+a:e;
return POS_KEY_PREFIX+t;
}
function processAdEleByPos(e){
var a;
e===AD_POS.POS_MID&&(a=document.getElementsByTagName("mpcpc")),adElCountMapByPos[e]=a.length;
for(var t=0;t<a.length;t++)el_gdt_areas[getPosKeyDesc(e,t)]=a[t],ping_cpm_apurl[getPosKeyDesc(e,t)]={};
}
function initAdData(){
processAdEleByPos(AD_POS.POS_MID);
}
function checkNeedAds(){
var is_need_ad=1,_adInfo=null,screen_num=0;
if(!globalAdDebug){
var inwindowwx=-1!=navigator.userAgent.indexOf("WindowsWechat");
if(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger")||inwindowwx||mmversion.isInMiniProgram){
if(is_need_ad=0,js_sponsor_ad_area.style.display="none",js_bottom_ad_area.style.display="none",
adElCountMapByPos[AD_POS.POS_MID])for(var i=0;i<adElCountMapByPos[AD_POS.POS_MID];i++)el_gdt_areas[getPosKeyDesc(AD_POS.POS_MID,i)].style.display="none";
}else{
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
_adInfo&&_now-1*_adInfoSaveTime<AD_CONFIG.AD_CACHE_TIME&&1*_adInfo.advertisement_num>0?is_need_ad=0:adLS.remove(key),
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
if(a.dest_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&(a.is_wx_app=!0),
e.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||e.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE){
var t=a.app_info.app_size||0,i=a.app_info.app_name||a.app_info.appname||"",_=a.app_info.apk_url||a.app_info.pkgurl||"",n=a.app_info.file_md5||a.app_info.pkgmd5||a.app_info.app_md5||"",p=a.app_info.apk_name||a.app_info.pkg_name||"";
t=formSize(t),i=formName(i),a.app_info.app_size=t,a.app_info.app_name=i,a.app_info.apk_name=p,
a.app_info.appname=a.app_info.app_name,a.app_info.app_rating=a.app_info.app_rating||0,
a.app_info.app_id=a.app_info.app_id,a.app_info.icon_url=a.app_info.icon_url,a.app_info.channel_id=a.app_info.channel_id,
a.app_info.md5sum=a.app_info.app_md5,a.app_info.rl=a.rl,a.app_info.pkgname=p,a.app_info.url_scheme=a.app_info.url_scheme,
a.app_info.androiddownurl=_,a.app_info.versioncode=a.app_info.version_code,a.app_info.appinfo_url=a.app_info.appinfo_url,
a.app_info.traceid=a.traceid,a.app_info.pt=a.pt,a.app_info.url=a.url,a.app_info.ticket=a.ticket,
a.app_info.type=a.type,a.app_info.adid=a.aid,a.app_info.file_md5=n;
var o=extend({
appname:a.app_info.app_name,
app_rating:a.app_info.app_rating||0,
app_id:a.app_info.app_id,
icon_url:a.app_info.icon_url,
channel_id:a.app_info.channel_id,
md5sum:a.app_info.app_md5,
rl:a.rl,
pkgname:p,
url_scheme:a.app_info.url_scheme,
androiddownurl:_,
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
file_md5:n
},a);
return o;
}
if(e.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE){
for(var r=a.exp_info.exp_value||[],d=!1,s=0,c=0;c<r.length;++c){
var l=r[c]||{};
if(1==l.exp_type&&(s=l.comm_attention_num,d=s>0),2==l.exp_type){
d=!1,s=0;
break;
}
}
a.biz_info.show_comm_attention_num=d,a.biz_info.comm_attention_num=s;
var o=extend({
usename:a.biz_info.user_name,
pt:a.pt,
url:a.url,
traceid:a.traceid,
adid:a.aid,
ticket:a.ticket,
is_appmsg:!0
},a);
return o;
}
return e;
}
function i(e){
var a,t=e;
if(e.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||e.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE){
var i=t.app_info.app_size||0,_=t.app_info.app_name||t.app_info.appname||"",n=t.app_info.apk_url||t.app_info.pkgurl||"",p=t.app_info.file_md5||t.app_info.pkgmd5||t.app_info.app_md5||"",o=t.app_info.apk_name||t.app_info.pkg_name||"",r=t.app_info.category,d=["万","百万","亿"],s=t.app_info.down_count||0;
if(s>=1e4){
s/=1e4;
for(var c=0;s>=10&&2>c;)s/=100,c++;
s=s.toFixed(1)+d[c]+"次";
}else s=s.toFixed(1)+"次";
return r=r?r[0]||"其他":"其他",i=formSize(i),_=formName(_),t.app_info._down_count=s,
t.app_info._category=r,t.app_info.app_size=i,t.app_info.app_name=_,t.app_info.apk_name=o,
t.app_info.appname=t.app_info.app_name,t.app_info.app_rating=t.app_info.app_rating||0,
t.app_info.app_id=t.app_info.app_id,t.app_info.icon_url=t.app_info.icon_url,t.app_info.channel_id=t.app_info.channel_id,
t.app_info.md5sum=t.app_info.app_md5,t.app_info.rl=t.rl,t.app_info.pkgname=o,t.app_info.url_scheme=t.app_info.url_scheme,
t.app_info.androiddownurl=n,t.app_info.versioncode=t.app_info.version_code,t.app_info.appinfo_url=t.app_info.appinfo_url,
t.app_info.traceid=t.traceid,t.app_info.pt=t.pt,t.app_info.url=t.url,t.app_info.ticket=t.ticket,
t.app_info.type=t.type,t.app_info.adid=t.aid,t.app_info.file_md5=p,a=extend({
appname:t.app_info.app_name,
app_rating:t.app_info.app_rating||0,
app_id:t.app_info.app_id,
icon_url:t.app_info.icon_url,
channel_id:t.app_info.channel_id,
md5sum:t.app_info.app_md5,
rl:t.rl,
pkgname:o,
url_scheme:t.app_info.url_scheme,
androiddownurl:n,
versioncode:t.app_info.version_code,
appinfo_url:t.app_info.appinfo_url,
traceid:t.traceid,
pt:t.pt,
url:t.url,
ticket:t.ticket,
type:t.type,
adid:t.aid,
source:source||"",
is_appmsg:!0,
file_md5:p
},t);
}
if(e.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE){
for(var l=t.exp_info.exp_value||[],m=!1,u=0,f=0;f<l.length;++f){
var g=l[f]||{};
if(1==g.exp_type&&(u=g.comm_attention_num,m=u>0),2==g.exp_type){
m=!1,u=0;
break;
}
}
return t.biz_info.show_comm_attention_num=m,t.biz_info.comm_attention_num=u,a=extend({
usename:t.biz_info.user_name,
pt:t.pt,
url:t.url,
traceid:t.traceid,
adid:t.aid,
ticket:t.ticket,
is_appmsg:!0
},t);
}
if(e.product_type==AD_TYPE.CARD_PRODUCT_TYPE||e.product_type==AD_TYPE.COUPON_PRODUCT_TYPE){
var v=t.card_info.card_id||"",P=t.card_info.card_ext||"";
P=P.htmlDecode();
try{
P=JSON.parse(P),P.outer_str=t.card_info.card_outer_id||"",P=JSON.stringify(P);
}catch(D){
P="{}";
}
return a=extend({
card_id:v,
card_ext:P,
pt:y,
ticket:t.ticket||"",
url:t.url,
rl:t.rl,
tid:t.traceid,
traceid:t.traceid,
type:t.type,
adid:t.aid,
is_appmsg:!0
},t);
}
if(e.product_type==AD_TYPE.SHOP_PRODUCT_TYPE){
if(t.mp_shop_info){
var T=t.mp_shop_info.pid||"",w=t.mp_shop_info.outer_id||"";
a=extend({
pid:T,
outer_id:w,
pt:y,
url:t.url,
rl:t.rl,
tid:t.traceid,
traceid:t.traceid,
type:t.type,
adid:t.aid,
is_appmsg:!0
},t);
}else a=t;
return a;
}
return e;
}
function _(e){
return e;
}
var n={},p={},o=e.is_need_ad,r=e._adInfo;
if(0==o)p=r,p||(p={
advertisement_num:0
});else{
if(a.advertisement_num>0&&a.advertisement_info){
var d=a.advertisement_info;
p.advertisement_info=saveCopy(d);
}
p.advertisement_num=a.advertisement_num;
}
1==o&&(window._adRenderData=p),p=p||{
advertisement_num:0
};
var s=!1;
if(!p.flag&&p.advertisement_num>0){
var c=p.advertisement_num,l=p.advertisement_info;
window.adDatas.num=c;
for(var m=0;c>m;++m){
var u,f=null,g=l[m];
g.exp_info=g.exp_info||{},g.is_cpm=g.is_cpm||0,g.biz_info=g.biz_info||{},g.app_info=g.app_info||{},
g.pos_type=g.pos_type||0,g.logo=g.logo||"",g.use_new_protocol=g.use_new_protocol||0;
var y=g.pt,v=g.pos_type,P=g.product_type;
if(2==g.use_new_protocol&&g.pos_type==AD_POS.POS_BOTTOM){
var D=JSON.stringify({
biz_log_report:[{
pos_type:+g.pos_type,
traceid:g.traceid,
aid:+g.aid,
log_type:1,
ext_info:g.crt_size
}]
});
CrtManager.CRT_CONF[g.crt_size]||(g.use_new_protocol=g.product_type!=AD_TYPE.IOS_APP_PRODUCT_TYPE&&g.product_type!=AD_TYPE.ANDROID_APP_PRODUCT_TYPE||2!=g.material_type&&9!=g.material_type||g.dest_type!=AD_CONFIG.AD_DEST_TYPE.APPDETAIL_DEST_TYPE&&g.dest_type!=AD_CONFIG.AD_DEST_TYPE.APPINFO_PAGE_DEST_TYPE&&!AD_CONFIG.AD_DEST_TYPE.CANVAS_AD_DEST_TYPE?0:1,
console.info("[底部广告旧协议兼容] crt_size:",g.crt_size," 最终协议类型：",g.use_new_protocol),ajax({
url:"/mp/advertisement_report?action=extra_report&extra_data="+D+"&__biz="+biz,
timeout:2e3
}));
}
if(urlParser.getQuery("oldAd")&&(g.use_new_protocol=0),u=g.use_new_protocol,n[v]||(n[v]=0),
n[v]++,u)1==u?v===AD_POS.POS_MID?(s=!0,g=t(g),f=g):0===v?(g=i(g),(P===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||P===AD_TYPE.IOS_APP_PRODUCT_TYPE)&&(f=g)):3===v&&(g=_(g),
f=g):2==u&&(v===AD_POS.POS_MID?(s=!0,g=t(g)):0==v&&(g=i(g)),f=g);else if(100===y||115===y){
for(var T=g.exp_info.exp_value||[],w=!1,E=0,b=0;b<T.length;++b){
var h=T[b]||{};
if(1==h.exp_type&&(E=h.comm_attention_num,w=E>0),2==h.exp_type){
w=!1,E=0;
break;
}
}
g.biz_info.show_comm_attention_num=w,g.biz_info.comm_attention_num=E,f={
usename:g.biz_info.user_name,
pt:y,
url:g.url,
traceid:g.traceid,
adid:g.aid,
ticket:g.ticket,
is_appmsg:!0
};
}else if(102===y)f={
appname:g.app_info.app_name,
versioncode:g.app_info.version_code,
pkgname:g.app_info.apk_name,
androiddownurl:g.app_info.apk_url,
md5sum:g.app_info.app_md5,
signature:g.app_info.version_code,
rl:g.rl,
traceid:g.traceid,
pt:y,
ticket:g.ticket,
type:g.type,
adid:g.aid,
is_appmsg:!0
};else if(101===y)f={
appname:g.app_info.app_name,
app_id:g.app_info.app_id,
icon_url:g.app_info.icon_url,
appinfo_url:g.app_info.appinfo_url,
rl:g.rl,
traceid:g.traceid,
pt:y,
ticket:g.ticket,
type:g.type,
adid:g.aid,
is_appmsg:!0
};else if(103===y||104===y||2===y&&g.app_info){
var A=g.app_info.down_count||0,x=g.app_info.app_size||0,O=g.app_info.app_name||"",j=g.app_info.category,I=["万","百万","亿"];
if(A>=1e4){
A/=1e4;
for(var C=0;A>=10&&2>C;)A/=100,C++;
A=A.toFixed(1)+I[C]+"次";
}else A=A.toFixed(1)+"次";
x=formSize(x),j=j?j[0]||"其他":"其他",O=formName(O),g.app_info._down_count=A,g.app_info._app_size=x,
g.app_info._category=j,g.app_info.app_name=O,f={
appname:g.app_info.app_name,
app_rating:g.app_info.app_rating||0,
icon_url:g.app_info.icon_url,
app_id:g.app_info.app_id,
channel_id:g.app_info.channel_id,
md5sum:g.app_info.app_md5,
rl:g.rl,
pkgname:g.app_info.apk_name,
url_scheme:g.app_info.url_scheme,
androiddownurl:g.app_info.apk_url,
versioncode:g.app_info.version_code,
appinfo_url:g.app_info.appinfo_url,
traceid:g.traceid,
pt:y,
url:g.url,
ticket:g.ticket,
type:g.type,
adid:g.aid,
is_appmsg:!0,
app_info:g.app_info
};
}else if(105===y){
var k=g.card_info.card_id||"",S=g.card_info.card_ext||"";
S=S.htmlDecode();
try{
S=JSON.parse(S),S.outer_str=g.card_info.card_outer_id||"",S=JSON.stringify(S);
}catch(Y){
S="{}";
}
f={
card_id:k,
card_ext:S,
pt:y,
ticket:g.ticket||"",
url:g.url,
rl:g.rl,
tid:g.traceid,
traceid:g.traceid,
type:g.type,
adid:g.aid,
is_appmsg:!0
};
}else if(106===y){
var z=g.mp_shop_info.pid||"",R=g.mp_shop_info.outer_id||"";
f={
pid:z,
outer_id:R,
pt:y,
url:g.url,
rl:g.rl,
tid:g.traceid,
traceid:g.traceid,
type:g.type,
adid:g.aid,
is_appmsg:!0
};
}else if(108===y||109===y||110===y||116===y||117===y)f={
pt:y,
ticket:g.ticket||"",
url:g.url,
traceid:g.traceid,
adid:g.aid,
is_appmsg:!0
},g.video_info&&(f.displayWidth=g.video_info.displayWidth,f.displayHeight=g.video_info.displayHeight,
f.thumbUrl=g.video_info.thumbUrl,f.videoUrl=g.video_info.videoUrl,f.rl=g.rl),g.dest_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&Wxopen_card.startConnect(g);else if(111===y||113===y||114===y||112===y||121===y||122===y){
var x=g.app_info.app_size||0,O=g.app_info.app_name||"";
x=formSize(x),O=formName(O),g.app_info.app_size=x,g.app_info.app_name=O,f={
appname:g.app_info.app_name,
app_rating:g.app_info.app_rating||0,
app_id:g.app_info.app_id,
icon_url:g.app_info.icon_url,
channel_id:g.app_info.channel_id,
md5sum:g.app_info.app_md5,
rl:g.rl,
pkgname:g.app_info.apk_name,
url_scheme:g.app_info.url_scheme,
androiddownurl:g.app_info.apk_url,
versioncode:g.app_info.version_code,
appinfo_url:g.app_info.appinfo_url,
traceid:g.traceid,
pt:y,
url:g.url,
ticket:g.ticket,
type:g.type,
adid:g.aid,
source:source||"",
is_appmsg:!0
};
}else if(118===y)f=g,s=!0,Wxopen_card.startConnect(g);else if(119===y||120===y)f=g,
Wxopen_card.startConnect(g);else if(125===y)f=g,g.dest_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&Wxopen_card.startConnect(g);else if(140===y){
f=g;
try{
f.shopImage=f.shop_image[0],f.shopImage.mp_tags=f.shopImage.mp_tags||[];
}catch(N){
f.shopImage={};
}
}
var U=g.image_url;
require("appmsg/cdn_img_lib.js"),U&&U.isCDN()&&(U=U.replace(/\/0$/,"/640"),U=U.replace(/\/0\?/,"/640?"),
g.image_url=urlParser.addParam(U,"wxfrom","50",!0)),adDatas.ads[getPosKeyDesc(v,n[v]-1)]={
a_info:g,
adData:f
},localStorage&&localStorage.setItem&&g.app_info&&g.app_info.url_scheme&&localStorage.setItem("__WXLS__a_url_schema_"+g.traceid,g.app_info.url_scheme),
g.has_installed=!1,g.app_info&&!function(e){
JSAPI.invoke("getInstallState",{
packageName:e.app_info.apk_name
},function(a){
var t=a.err_msg;
t.indexOf("get_install_state:yes")>-1&&(e.has_installed=!0);
});
}(g),0===v&&9===g.material_type&&(P===AD_TYPE.MINI_GAME_PRODUCT_TYPE&&g.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&g.game_info&&(g.biz_info.head_img=g.game_info.head_img,
g.biz_info.nick_name=g.game_info.nick_name),P!==AD_TYPE.IOS_APP_PRODUCT_TYPE&&P!==AD_TYPE.ANDROID_APP_PRODUCT_TYPE||!g.app_info||(g.biz_info.head_img=g.app_info.icon_url,
g.biz_info.nick_name=g.app_info.app_name));
}
var q=function(){
var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,a=document.documentElement.clientHeight||window.innerHeight;
if(js_sponsor_ad_area.offsetTop<e+a){
var t=document.getElementById("js_ad_area");
t&&Class.addClass(t,"show"),DomEvent.off(window,"scroll",q);
}
},M=adDatas.ads;
for(var B in M)if(0===B.indexOf("pos_")){
var f=M[B],g=!!f&&f.a_info,P=g.product_type;
if(f&&g){
if(g.pos_type===AD_POS.POS_MID&&!adElCountMapByPos[AD_POS.POS_MID]){
var W=getParaList(contentWrp),H=void 0!==g.position_index&&g.position_index>=0&&g.position_index<W.length,L=H?g.position_index:Math.ceil(W.length/2)-1,K=document.createElement("mpcpc");
el_gdt_areas[getPosKeyDesc(AD_POS.POS_MID)]=K,insertAfter(K,W[L]);
}
if(2!==g.use_new_protocol){
if(0==g.pos_type){
if(g.new_appmsg=window.new_appmsg,g.longAppBtnText=P===AD_TYPE.IOS_APP_PRODUCT_TYPE?"查看应用":"下载应用",
g.shortAppBtnText=P===AD_TYPE.IOS_APP_PRODUCT_TYPE?"查看":"下载",js_bottom_ad_area.innerHTML=TMPL.tmpl(a_tpl,g),
111==g.pt||112==g.pt||113==g.pt||114==g.pt){
var F=document.getElementsByClassName("js_download_app_card")[0],G=F.offsetWidth,J=Math.floor(G/2.875);
J>0&&(F.style.height=J+"px");
}
}else if(3==g.pos_type){
var F=document.createElement("div");
F.appendChild(document.createTextNode(g.image_url)),g.image_url=F.innerHTML.replace(/&amp;/g,"&"),
g.new_appmsg=window.new_appmsg,js_sponsor_ad_area.innerHTML=TMPL.tmpl(sponsor_a_tpl,g),
js_sponsor_ad_area.style.display="block";
var X=js_sponsor_ad_area.clientWidth;
108!=g.pt&&109!=g.pt&&110!=g.pt||2==g.use_new_protocol?116==g.pt||117==g.pt:document.getElementById("js_main_img").style.height=X/1.77+"px",
DomEvent.on(window,"scroll",q),q(0);
}else if(g.pos_type===AD_POS.POS_MID&&checkShowCpc(el_gdt_areas[B],g)){
g=_parseExpCpc(g);
var V=!1;
if(P===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||P===AD_TYPE.IOS_APP_PRODUCT_TYPE)js_cpc_area.innerHTML=TMPL.tmpl(cpc_a_tpl,g),
V=!0;else{
var Q=require("a/tpl/cpc_tpl.html.js"),Z=g.exp_obj.sale_text;
(P===AD_TYPE.ADD_CONTACT_PRODUCT_TYPE||P===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||P===AD_TYPE.IOS_APP_PRODUCT_TYPE||P===AD_TYPE.MINI_GAME_PRODUCT_TYPE)&&(Z=g.avatarTitle),
js_cpc_area.innerHTML=TMPL.tmpl(Q,{
tag_pos:g.exp_obj.tag_pos,
type:g.tag_pos,
ticket:g.ticket,
url:g.url,
rl:g.rl,
aid:g.aid,
pt:g.pt,
traceid:g.traceid,
group_id:g.group_id,
apurl:g.apurl,
is_cpm:g.is_cpm,
can_see_complaint:window.can_see_complaint,
pos_type:g.pos_type,
banner:g.image_url,
price:g.exp_obj.price,
title:Z,
is_wx_app:g.is_wx_app,
btn_text:g.exp_obj.btn_text,
avatar:g.avatar,
isDownload:V
});
}
}
mmversion.isIOS&&g.app_info&&g.app_info.url_scheme&&P===AD_TYPE.IOS_APP_PRODUCT_TYPE&&(document.getElementById("js_promotion_tag")&&(document.getElementById("js_promotion_tag").innerHTML="查看应用"),
document.getElementsByClassName("js_ad_btn")&&document.getElementsByClassName("js_ad_btn").length>0&&(document.getElementsByClassName("js_ad_btn")[0].innerHTML="查看"),
document.getElementById("js_ad_btn_"+g.pos_type)&&(document.getElementById("js_ad_btn_"+g.pos_type).innerHTML="查看应用"));
}else{
var $,ea={},V=!1,aa={};
if(g.button_action)try{
"string"==typeof g.button_action&&(g.button_action=JSON.parse(g.button_action.html())),
g.button_action.button_text&&""!=g.button_action.button_text||(g.button_action.button_text="去逛逛");
}catch(Y){
g.button_action={
button_text:"decode error"
};
}else g.button_action={
button_text:"something wrong"
};
if($=g.crt_size,g.biz_info&&g.biz_info.head_img&&(g.avatar=g.biz_info.head_img,g.avatarTitle=g.biz_info.nick_name),
(P===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||P===AD_TYPE.IOS_APP_PRODUCT_TYPE)&&(V=!0,
g.app_info&&g.app_info.icon_url&&(g.avatar=g.app_info.icon_url,g.avatarTitle=g.app_info.appname)),
P===AD_TYPE.MINI_GAME_PRODUCT_TYPE&&g.game_info&&g.game_info.head_img&&(g.avatar=g.game_info.head_img,
g.avatarTitle=g.game_info.nick_name),g.dest_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE&&Wxopen_card.startConnect(g),
g.pos_type===AD_POS.POS_MID){
if(checkShowCpc(el_gdt_areas[B],g)){
g=_parseExpCpc(g);
var Z=g.exp_obj.sale_text;
(P===AD_TYPE.ADD_CONTACT_PRODUCT_TYPE||P===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||P===AD_TYPE.IOS_APP_PRODUCT_TYPE||P===AD_TYPE.MINI_GAME_PRODUCT_TYPE)&&(Z=g.avatarTitle),
ea={
tag_pos:g.exp_obj.tag_pos,
type:g.tag_pos,
ticket:g.ticket,
url:g.url,
rl:g.rl,
aid:g.aid,
pt:g.pt,
traceid:g.traceid,
group_id:g.group_id,
apurl:g.apurl,
is_cpm:g.is_cpm,
can_see_complaint:window.can_see_complaint,
pos_type:g.pos_type,
banner:g.image_url,
price:g.exp_obj.price,
title:Z,
is_wx_app:g.is_wx_app,
is_ios:mmversion.isIOS,
isDownload:V,
btn_text:g.exp_obj.btn_text,
avatar:g.avatar
},V&&(aa.customUpdataFunc=function(e,a){
var t=e.querySelector(".js_download_percent"),i=e.querySelector(".js_download_outside"),_=e.querySelector(".js_download_inner");
t&&(t.style.width=a.percent+"%"),i.textContent=a.btn_text,_.textContent=a.btn_text;
}),ad_render_object[B]=new CrtManager.createCrtObject($,ea,el_gdt_areas[B],aa),gdt_as[B]=el_gdt_areas[B].getElementsByClassName("js_ad_main_area");
}
}else if(g.pos_type==AD_POS.POS_SPONSOR){
var F=document.createElement("div");
F.appendChild(document.createTextNode(g.image_url)),g.image_url=F.innerHTML.replace(/&amp;/g,"&"),
g.new_appmsg=window.new_appmsg;
var f={
pt:g.pt,
ticket:g.ticket||"",
url:g.url,
traceid:g.traceid,
adid:g.aid,
is_appmsg:!0
};
if(g.video_info&&(f.displayWidth=g.video_info.displayWidth,f.displayHeight=g.video_info.displayHeight,
f.thumbUrl=g.video_info.thumbUrl,f.videoUrl=g.video_info.videoUrl,f.rl=g.rl),ea={
type:g.tag_pos,
ticket:g.ticket,
url:g.url,
rl:g.rl,
aid:g.aid,
pt:g.pt,
traceid:g.traceid,
group_id:g.group_id,
apurl:g.apurl,
is_cpm:g.is_cpm,
can_see_complaint:window.can_see_complaint,
pos_type:g.pos_type,
banner:g.image_url,
title:g.biz_info.nick_name,
is_wx_app:g.button_action.jump_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE,
is_ios:mmversion.isIOS,
isDownload:V,
btn_text:g.button_action.button_text,
avatar:g.biz_info.head_img,
isApp:!1
},ad_render_object[B]=new CrtManager.createCrtObject($,ea,js_sponsor_ad_area,aa),
js_sponsor_ad_area.style.display="block",gdt_as["pos_"+g.pos_type]=js_sponsor_ad_area.getElementsByClassName("js_ad_main_area"),
!ad_render_object[B].getCrtData().has_banner){
var ta="&tid="+g.traceid+"&uin="+uin+"&key="+key+"&ticket="+(g.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+g.adid+"&ad_engine=0&pos_type="+g.pos_type+"&exp_id="+g.exp_info.exp_id+"&exp_value="+g.exp_info.exp_value+"&r="+Math.random();
g.report_param=ta;
}
var ia=require("a/sponsor.js");
new ia({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adVideo:document.getElementById("js_video_container"),
adComplain:document.getElementById("js_btn_complain"),
adData:f,
a_info:g,
pos_type:g.pos_type,
report_param:ta
}),DomEvent.on(window,"scroll",q),q(0);
}else if(g.pos_type==AD_POS.POS_BOTTOM){
var aa={};
if(g.video_info&&(f.displayWidth=g.video_info.displayWidth,f.displayHeight=g.video_info.displayHeight,
f.thumbUrl=g.video_info.thumbUrl,f.videoUrl=g.video_info.videoUrl,f.rl=g.rl),V&&(aa.customUpdataFunc=function(e,a){
var t=e.querySelector(".js_download_percent"),i=e.querySelector(".js_download_outside"),_=e.querySelector(".js_download_inner");
t&&(t.style.width=a.percent+"%"),i.textContent=a.btn_text,_.textContent=a.btn_text;
},aa.afterRenderFunc=function(e,a){
JSAPI.invoke("getInstallState",{
packageName:g.app_info.apk_name
},function(t){
var i=t.err_msg,_=e.querySelector(".js_watermark_text");
i.indexOf("get_install_state:yes")>-1&&g.app_info.url_scheme&&(_.textContent=354==parseInt(a.crt_size)||117==parseInt(a.crt_size)||355==parseInt(a.crt_size)||568==parseInt(a.crt_size)?"进入":"进入应用");
});
}),ea=extend({
banner:g.image_url,
is_wx_app:g.button_action.jump_type==AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE,
btn_text:g.button_action.button_text,
avatar:g.avatar,
isApp:!1,
isDownload:V
},g),ad_render_object["pos_"+g.pos_type]=new CrtManager.createCrtObject($,ea,js_bottom_ad_area,aa),
!ad_render_object["pos_"+g.pos_type].getCrtData().has_banner){
var ta="&tid="+g.traceid+"&uin="+uin+"&key="+key+"&ticket="+(g.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+g.adid+"&ad_engine=0&pos_type="+pos_type+"&exp_id="+g.exp_info.exp_id+"&exp_value="+g.exp_info.exp_value+"&r="+Math.random();
g.report_param=ta;
var _a=ad_render_object["pos_"+g.pos_type].getWrapperElm().getElementsByClassName("js_video_container_new_protocol");
if(_a[0]){
_a=_a[0],g.videoContainer=_a;
var na=require("a/video.js");
new na(g);
}
}
gdt_as["pos_"+g.pos_type]=js_bottom_ad_area.getElementsByClassName("js_ad_main_area");
}
}
lazyLoadAdImg({
aid:g.aid,
type:g.pt,
info:g
}),checkAdImg(g);
}
}
bindAdOperation();
}
if(is_temp_url&&adElCountMapByPos[AD_POS.POS_MID]&&!s)for(var pa=0;pa<adElCountMapByPos[AD_POS.POS_MID];pa++){
if(!checkShowCpc(el_gdt_areas[getPosKeyDesc(AD_POS.POS_MID,pa)]))return;
el_gdt_areas[getPosKeyDesc(AD_POS.POS_MID,pa)].innerHTML=TMPL.tmpl(cpc_a_tpl,{
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
pos_type:"",
dest_type:"",
exp_obj:{
btn_text:"按钮"
},
image_url:"https://mmbiz.qlogo.cn/mmbiz_png/cVgP5bCElFiaPhsbHe4ctnlUllMCDCEIJib69wX3BUX42XagNypd2JcgyEiaoFRu4KicKF3avfRgVnWPABVTjtPRwQ/0?wx_fmt=png"
});
}
}
function _parseExpCpc(e){
var a=e.product_type,t={
icon_pos:"",
btn_text:"去逛逛",
price:"",
sale_text:""
};
if(5==e.watermark_type&&(t.btn_text="查看详情"),e.biz_info&&e.biz_info.head_img&&e.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE&&(e.avatar=e.biz_info.head_img,
e.avatarTitle=e.biz_info.nick_name),29===a||31===a?t.btn_text="查看详情":a===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||a===AD_TYPE.IOS_APP_PRODUCT_TYPE?(t.btn_text=a===AD_TYPE.IOS_APP_PRODUCT_TYPE?"查看应用":"下载应用",
e.app_info&&e.app_info.icon_url&&(e.avatar=e.app_info.icon_url,e.avatarTitle=e.app_info.appname)):30===a?t.btn_text="去逛逛":a===AD_TYPE.ADD_CONTACT_PRODUCT_TYPE?t.btn_text=e.biz_info.is_subscribed?"查看公众号":"关注公众号":a===AD_TYPE.MINI_GAME_PRODUCT_TYPE&&(t.btn_text="进入小游戏",
e.game_info&&e.game_info.head_img&&(e.avatar=e.game_info.head_img,e.avatarTitle=e.game_info.nick_name)),
e.dest_type===AD_CONFIG.AD_DEST_TYPE.CANVAS_AD_DEST_TYPE&&(t.btn_text="查看详情"),e.cpc_exp_info&&e.cpc_exp_info.exp_content){
var i=e.cpc_exp_info.exp_content;
try{
for(var _=JSON.parse(i.replace(/&quot;/g,'"')),n=-1,p=0;p<_.aid_list.length;p++)_.aid_list[p].aid==e.aid&&(n=p);
n>-1&&(t.icon_pos=_.icon_pos||"",t.btn_text=_.btn_text||t.btn_text,t.price=_.aid_list[n].price,
t.sale_text=_.aid_list[n].sale_text,window.__addIdKeyReport("68064",15));
}catch(o){
window.__addIdKeyReport("68064",16);
}
}
return e.exp_obj=t,e;
}
function checkShowCpc(e,a){
if(globalAdDebug)return!0;
if(e){
var t,i=(document.documentElement.clientHeight||window.innerHeight)/2,_=e.offsetTop,n=contentWrp.offsetHeight;
if(i>_?t=1:_<(document.documentElement.clientHeight||window.innerHeight)&&(t=2),
t&&a){
var p=JSON.stringify({
biz_middle_not_exp:[{
scene:t,
traceid:a.traceid,
aid:+a.aid,
appmsg_id:+window.appmsgid,
item_idx:+window.idx
}]
});
ajax({
url:"/mp/advertisement_report?action=extra_report&extra_data="+p+"&__biz="+biz,
timeout:2e3
});
}
return i>_||i>n-_?!1:!0;
}
}
function lazyLoadAdImg(e){
for(var a=document.getElementsByClassName("js_alazy_img"),t=0;t<a.length;t++){
var i=a[t];
a[t].onload=function(){
window.__addIdKeyReport("28307",54),i.src.indexOf("retry")>-1&&window.__addIdKeyReport("28307",69);
},a[t].onerror=function(){
if(-1==i.src.indexOf("retry"))i.src=urlParser.addParam(i.src,"retry",1);else{
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
var i=e[t],_=typeof i;
i="string"==_?i.htmlDecode():i,"object"==_&&(i="[object Array]"==Object.prototype.toString.call(i)?saveCopyArr(i):saveCopy(i)),
a.push(i);
}
return a;
}
function saveCopy(e){
var a={};
for(var t in e)if(e.hasOwnProperty(t)){
var i=e[t],_=typeof i;
i="string"==_?i.htmlDecode():i,"object"==_&&(i="[object Array]"==Object.prototype.toString.call(i)?saveCopyArr(i):saveCopy(i)),
a[t]=i;
}
return a;
}
function formName(e){
for(var a=[" ","-","(",":",'"',"'","：","（","—","－","“","‘"],t=-1,i=0,_=a.length;_>i;++i){
var n=a[i],p=e.indexOf(n);
-1!=p&&(-1==t||t>p)&&(t=p);
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
var _=this,n=arguments,p=function(){
i=null,t||e.apply(_,n);
},o=t&&!i;
i||(i=setTimeout(p,a),o&&e.apply(_,n));
};
}
function seeAds(){
var adDatas=window.adDatas;
if(adDatas&&adDatas.num>0){
var onScroll=debounce(function(){
var scrollTop=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
for(var i in adDatas.ads)!function(pos_key){
var gdt_a=gdt_as[pos_key];
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
}),reportUrlLength(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj,{
pos_type:pos_type,
tid:tid,
aid:aid
},"/mp/advertisement_report?report_type=1&tid="+tid+"&aid="+aid+"&gh_id="+gh_id+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl)+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pos_type="+pos_type+"&exp_id="+exp_id+"&exp_value="+exp_value+"&r="+Math.random());
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
}),reportUrlLength(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj,{
pos_type:pos_type,
tid:tid,
aid:aid
},"/mp/advertisement_report?report_type=1&tid="+tid+"&aid="+aid+"&gh_id="+gh_id+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl+"&viewable=true")+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pos_type="+pos_type+"&r="+Math.random());
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
}),reportUrlLength(adSignData,adSignK1,adSignK2,signMd5,viewidKeyObj,{
pos_type:pos_type,
tid:tid,
aid:aid
},"/mp/advertisement_report?report_type=1&tid="+tid+"&aid="+aid+"&gh_id="+gh_id+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl+"&viewable=true")+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pos_type="+pos_type+"&exp_id="+exp_id+"&exp_value="+exp_value+"&r="+Math.random());
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
function ad_click(e,a,t,i,_,n,p,o,r,d,s,c,l,m,u,f,g,y,v){
if(!has_click[_]){
has_click[_]=!0;
{
var P=document.getElementById("loading_"+_);
g.product_type;
}
P&&(P.style.display="inline");
var D=g.exp_info||{},T=D.exp_id||"",w=D.exp_value||[];
try{
w=JSON.stringify(w);
}catch(E){
w="[]";
}
var b="";
c&&c.weapp_info&&c.weapp_info.original_id&&(b=c.weapp_info.original_id),AdClickReport({
click_pos:1,
report_type:2,
type:e,
exp_id:T,
exp_value:w,
url:encodeURIComponent(a),
tid:_,
aid:o,
rl:encodeURIComponent(t),
__biz:biz,
pos_type:d,
pt:r,
pos_x:l,
pos_y:m,
ad_w:u,
ad_h:f,
gh_id:b,
press_interval:window.__a_press_interval||-1
},function(){
if(has_click[_]=!1,P&&(P.style.display="none"),g.app_info){
var t=handleApp(a,_,idx,mid,biz,r,o,s,d,c,g,n,y);
if(t)return;
}
if(isCanvasAd(g))return void openCanvasAd({
canvasId:g.canvas_info.canvas_id,
adInfoXml:g.canvas_info.ad_info_xml,
pos_type:d,
report_param:y,
url:a
});
if(v)if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.OUTER_DEST_TYPE)handleH5(a,_,idx,mid,biz,r,o,s,d,c,g);else if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE)Wxopen_card.openWxopen(c);else if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.AD_DEST_TYPE)OpenUrlWithExtraWebview(a);else{
if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_SHOP_DEST_TYPE)return void OpenUrlWithExtraWebview(ParseJs.join(a,{
outer_id:c.outer_id
}));
if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.BIZ_DEST_TYPE&&g.product_type==AD_CONFIG.AD_TYPE.CARD_PRODUCT_TYPE)return void Card.openCardDetail(c.card_id,c.card_ext,c);
console.info("[广告新协议兜底跳转]",g),OpenUrlWithExtraWebview(a);
}else if("5"==e)OpenUrlWithExtraWebview("/mp/profile?source=from_ad&tousername="+a+"&ticket="+n+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+_);else{
if("105"==r&&c)return void Card.openCardDetail(c.card_id,c.card_ext,c);
if("106"==r&&c)return void OpenUrlWithExtraWebview(urlParser.join(a,{
outer_id:c.outer_id
}));
if("118"==r||"119"==r||"120"==r)return void Wxopen_card.openWxopen(c);
if(g.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE)return void Wxopen_card.openWxopen(c);
if(-1==a.indexOf("mp.weixin.qq.com"))a="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(a);else if(-1==a.indexOf("mp.weixin.qq.com/s")&&-1==a.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var i={
source:4,
tid:_,
idx:idx,
mid:mid,
appuin:biz,
pt:r,
aid:o,
ad_engine:s,
pos_type:d
},p=window.__report;
if(("104"==r||"113"==r||"114"==r||"122"==r)&&c||-1!=a.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var l="",m="";
c&&(l=c.pkgname&&c.pkgname.replace(/\./g,"_"),m=c.channel_id||""),i={
source:4,
tid:_,
traceid:_,
mid:mid,
idx:idx,
appuin:biz,
pt:r,
channel_id:m,
aid:o,
engine:s,
pos_type:d,
pkgname:l
};
}
a=urlParser.join(a,i),(0==a.indexOf("http://mp.weixin.qq.com/promotion/")||0==a.indexOf("https://mp.weixin.qq.com/promotion/"))&&(a=urlParser.join(a,{
traceid:_,
aid:o,
engine:s
})),!o&&p&&p(80,a);
}
OpenUrlWithExtraWebview(a);
}
});
}
}
function bindAdOperation(){
seeAds();
for(var e in adDatas.ads)!function(e){
var a=el_gdt_areas[e];
if(!a)return!1;
if(!a.getElementsByClassName&&a.style)return a.style.display="none",!1;
var t=a.getElementsByClassName("js_ad_link")||[],i=adDatas.ads[e];
if(i){
var _,n,p=i.adData,o=i.a_info,r=o.pos_type,d=o.pos_type,s=i.ad_engine,c=a.getElementsByClassName("js_ad_opt_list_btn_"+r),l=a.getElementsByClassName("js_complain_btn_"+r);
if(2==o.use_new_protocol){
var m=a.getElementsByClassName("js_material_"+r),u=a.getElementsByClassName("js_ad_action_"+r);
if(m.length>0&&(n=p.tid||o.traceid,_=o.aid,DomEvent.on(m[0],"click",function(e){
var a=o,t=!!e&&e.target;
if(a&&3!=o.pos_type){
var i=a.type,c=a.url,l=a.rl,u=a.apurl,f=a.ticket,g=a.group_id,y=a.pt,v=o.use_new_protocol;
if(p){
p.adid=window.adid||p.adid||p.aid;
var P="&tid="+p.traceid+"&uin="+uin+"&key="+key+"&ticket="+(p.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+p.adid+"&ad_engine="+s+"&pos_type="+d+"&r="+Math.random();
}
var D,T,w,E;
return D=position.getX(t,"js_material_"+r)+e.offsetX,T=position.getY(t,"js_material_"+r)+e.offsetY,
w=m[0].clientWidth,E=m[0].clientHeight,ad_click(i,c,l,u,n,f,g,_,y,d,s,p,D,T,w,E,o,P,v),
log("[Ad] ad_click: type="+i+", url="+c+", rl="+l+", apurl="+u+", traceid="+n+", ticket="+f+", group_id="+g+", aid="+_+", pt="+y+", pos_type="+d+", ad_engine="+s),
!1;
}
})),u.length>0&&o.button_action&&3!=o.pos_type)if(o.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||o.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE){
var f=require("a/app_card.js"),g=15,y=p.pkgname&&p.pkgname.replace(/\./g,"_");
new f({
btn:u[0],
adData:p,
report_param:h,
pos_type:d,
url_scheme:p.url_scheme,
via:[p.traceid,p.adid,y,source,g,s].join("."),
ticket:p.ticket,
appdetail_params:["&aid="+p.adid,"traceid="+p.traceid,"pkgname="+y,"source="+source,"type="+g,"engine="+s,"appuin="+biz,"pos_type="+d,"ticket="+p.ticket,"scene="+scene].join("&"),
engine:s,
percentStatus:function(a,t){
var i=ad_render_object[e].getData();
i.percent=t,"downloading"==a?i.btn_text="暂停":"paused"==a?i.btn_text="继续":"installed"==a?(i.percent=0,
i.btn_text="已安装"):"downloaded"==a?(i.percent=0,i.btn_text="安装"):"gotodetail"==a?(i.percent=0,
i.btn_text=117==parseInt(o.crt_size)||354==parseInt(o.crt_size)||355==parseInt(o.crt_size)||568==parseInt(o.crt_size)?"进入":"进入应用"):(i.percent=0,
i.btn_text=117==parseInt(o.crt_size)||354==parseInt(o.crt_size)||355==parseInt(o.crt_size)||568==parseInt(o.crt_size)?"进入":"进入应用"),
ad_render_object[e].updateData(i);
}
});
}else if(o.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE){
var v=require("a/profile.js");
p.adid=window.adid||p.adid||p.aid,new v({
btnProfile:u[0],
adData:p,
pos_type:d,
report_param:h,
aid:p.adid,
ad_engine:s
});
}else o.product_type==AD_TYPE.CARD_PRODUCT_TYPE?new Card({
btn:u[0],
adData:p,
report_param:h,
pos_type:d
}):o.product_type==AD_TYPE.WECHATCARD_PRODUCT_TYPE?new MpShop({
btn:u[0],
adData:p,
report_param:h,
pos_type:d
}):DomEvent.on(u[0],"click",function(e){
var a=p,t=!!e&&e.target,i=a.type,_=o.button_action.jump_url,n=a.rl,c=a.apurl,l=a.tid||o.traceid,m=a.ticket,f=a.group_id,g=a.aid,y=a.pt,v=o.use_new_protocol;
if(console.info("[广告新协议点击素材]",o.dest_type,o.product_type),p){
p.adid=window.adid||p.adid||p.aid;
var P="&tid="+p.traceid+"&uin="+uin+"&key="+key+"&ticket="+(p.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+p.adid+"&ad_engine="+s+"&pos_type="+d+"&r="+Math.random();
}
var D,T,w,E;
return D=position.getX(t,"js_ad_action_"+r)+e.offsetX,T=position.getY(t,"js_ad_action_"+r)+e.offsetY,
w=u[0].clientWidth,E=u[0].clientHeight,ad_click(i,_,n,c,l,m,f,g,y,d,s,p,D,T,w,E,o,P,v),
log("[Ad] ad_click: type="+i+", url="+_+", rl="+n+", apurl="+c+", traceid="+l+", ticket="+m+", group_id="+f+", aid="+g+", pt="+y+", pos_type="+d+", ad_engine="+s),
!1;
});
}else for(var P=0,D=t.length;D>P;++P)!function(e,a){
var i=t[e],p=i.dataset;
if(p&&3!=o.pos_type){
var r=p.type,c=p.url,l=p.rl,m=p.apurl,u=p.ticket,f=p.group_id,g=p.pt,y=o.use_new_protocol,v=!0;
n=p.tid,_=p.aid,(y&&(o.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||o.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE)||115===g)&&(v=!1),
o.pos_type===AD_POS.POS_MID&&(v=!1),DomEvent.on(i,"click",function(e){
var t=!!e&&e.target,i=[AD_TYPE.ANDROID_APP_PRODUCT_TYPE,AD_TYPE.IOS_APP_PRODUCT_TYPE,AD_TYPE.ADD_CONTACT_PRODUCT_TYPE];
if(!t||!t.className||d==AD_POS.POS_MID&&a&&-1==i.toString().indexOf(a.product_type)||-1==t.className.indexOf("js_ad_btn")&&-1==t.className.indexOf("js_btn_process")&&-1==t.className.indexOf("js_muted_btn")&&-1==t.className.indexOf("js_poster_cover")&&-1==t.className.indexOf("js_ad_opt_list_btn")&&-1==t.className.indexOf("js_complain_btn")&&-1==t.className.indexOf("js_view_profile")&&-1==t.className.indexOf("js_add_contact")){
if(a){
a.adid=window.adid||a.adid||a.aid;
var p="&tid="+a.traceid+"&uin="+uin+"&key="+key+"&ticket="+(a.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+a.adid+"&ad_engine="+s+"&pos_type="+d+"&r="+Math.random();
o&&o.has_installed&&("104"==a.pt||"113"==a.pt||"114"==a.pt||"2"==a.pt)?report(114,p):"103"==a.pt||"111"==a.pt||"112"==a.pt?report(23,p):("104"==a.pt||"113"==a.pt||"114"==a.pt)&&report(25,p);
}
var v,P,D,T;
return v=position.getX(t,"js_ad_link")+e.offsetX,P=position.getY(t,"js_ad_link")+e.offsetY,
D=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
T=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight,
ad_click(r,c,l,m,n,u,f,_,g,d,s,a,v,P,D,T,o,p,y),log("[Ad] ad_click: type="+r+", url="+c+", rl="+l+", apurl="+m+", traceid="+n+", ticket="+u+", group_id="+f+", aid="+_+", pt="+g+", pos_type="+d+", ad_engine="+s),
!1;
}
},v),DomEvent.on(i,"touchstart",function(){
window.__a_press_interval=+new Date;
}),DomEvent.on(i,"touchend",function(){
window.__a_press_interval=+new Date-window.__a_press_interval;
});
}
}(P,p);
if(c[0]&&DomEvent.on(c[0],"click",function(){
if(parseInt(window.can_see_complaint)){
var e=c[0].getElementsByClassName("js_ad_opt_list_"+o.pos_type);
adOptReport(0,o.pos_type,n,_),e&&e[0]&&(e[0].style.display="none"==e[0].style.display?"block":"none");
}
return!1;
}),l[0]&&DomEvent.on(l[0],"click",function(){
var e="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/feedback.html?aid="+_+"&traceid="+n+"&source="+o.pos_type+"&biz="+window.biz;
return adOptReport(1,o.pos_type,n,_),mmversion.isWp||mmversion.isIOS||mmversion.isAndroid?JSAPI.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=e);
}):OpenUrlWithExtraWebview(e),!1;
}),p&&2!=o.use_new_protocol){
p.adid=window.adid||p.adid||p.aid;
var T=o.exp_info||{},w=T.exp_id||"",E=T.exp_value||[];
try{
E=JSON.stringify(E);
}catch(b){
E="[]";
}
var h="&tid="+p.traceid+"&uin="+uin+"&key="+key+"&ticket="+(p.ticket||"")+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+p.adid+"&ad_engine="+s+"&pos_type="+d+"&exp_id="+w+"&exp_value="+E+"&r="+Math.random();
if(p.report_param=h,p.use_new_protocol){
if(o.product_type===AD_TYPE.ANDROID_APP_PRODUCT_TYPE||o.product_type===AD_TYPE.IOS_APP_PRODUCT_TYPE){
var f=require("a/app_card.js"),g=15,y=p.pkgname&&p.pkgname.replace(/\./g,"_"),A=document.getElementById("js_ad_btn_"+d);
new f({
btn:A,
adData:p,
report_param:h,
pos_type:d,
url_scheme:p.url_scheme,
via:[p.traceid,p.adid,y,source,g,s].join("."),
ticket:p.ticket,
appdetail_params:["&aid="+p.adid,"traceid="+p.traceid,"pkgname="+y,"source="+source,"type="+g,"engine="+s,"appuin="+biz,"pos_type="+d,"ticket="+p.ticket,"scene="+scene].join("&"),
engine:s
});
}else if(o.product_type==AD_TYPE.ADD_CONTACT_PRODUCT_TYPE){
var v=require("a/profile.js");
new v({
btnProfile:document.getElementById("js_ad_btn_"+d),
btnViewProfile:document.getElementById("js_view_profile_"+d),
btnAddContact:document.getElementById("js_add_contact_"+d),
adData:p,
pos_type:d,
report_param:h,
aid:p.adid,
ad_engine:s,
a_info:o
});
}
if(9==o.material_type){
o.report_param=h;
var x=require("a/video.js");
new x(o);
}
}else{
if("100"==p.pt||"115"==p.pt){
var v=require("a/profile.js");
return void new v({
btnViewProfile:document.getElementById("js_view_profile_"+d),
btnAddContact:document.getElementById("js_add_contact_"+d),
adData:p,
pos_type:d,
report_param:h,
aid:p.adid,
ad_engine:s,
a_info:o
});
}
if("102"==p.pt){
var O=require("a/android.js"),g=15,y=p.pkgname&&p.pkgname.replace(/\./g,"_");
return void new O({
btn:document.getElementById("js_app_action_"+d),
adData:p,
report_param:h,
task_ext_info:[p.adid,p.traceid,y,source,g,s].join("."),
via:[p.traceid,p.adid,y,source,g,s].join(".")
});
}
if("101"==p.pt){
var j=require("a/ios.js");
return void new j({
btn:document.getElementById("js_app_action_"+d),
adData:p,
ticket:p.ticket,
report_param:h
});
}
if("105"==p.pt)return void new Card({
btn:document.getElementById("js_card_action_"+d),
adData:p,
report_param:h,
pos_type:d
});
if("106"==p.pt)return void new MpShop({
btn:document.getElementById("js_shop_action_"+d),
adData:p,
report_param:h,
pos_type:d
});
if("103"==p.pt||"104"==p.pt||"111"==p.pt||"112"==p.pt||"113"==p.pt||"114"==p.pt||"121"==p.pt||"122"==p.pt){
var f=require("a/app_card.js"),g=15,y=p.pkgname&&p.pkgname.replace(/\./g,"_");
return void new f({
btn:document.getElementById("js_appdetail_action_"+d),
js_app_rating:document.getElementById("js_app_rating_"+d),
adData:p,
report_param:h,
pos_type:d,
url_scheme:p.url_scheme,
via:[p.traceid,p.adid,y,source,g,s].join("."),
ticket:p.ticket,
appdetail_params:["&aid="+p.adid,"traceid="+p.traceid,"pkgname="+y,"source="+source,"type="+g,"engine="+s,"appuin="+biz,"pos_type="+d,"ticket="+p.ticket,"scene="+scene].join("&"),
engine:s
});
}
if("108"==p.pt||"109"==p.pt||"110"==p.pt||"116"==p.pt||"117"==p.pt){
var I=require("a/sponsor.js");
new I({
adDetailBtn:document.getElementById("js_ad_detail"),
adMoreBtn:document.getElementById("js_ad_more"),
adAbout:document.getElementById("js_btn_about"),
adImg:document.getElementById("js_main_img"),
adMessage:document.getElementById("js_ad_message"),
adVideo:document.getElementById("js_video_container"),
adComplain:document.getElementById("js_btn_complain"),
adData:p,
a_info:o,
pos_type:d,
report_param:h
});
}
if("118"==o.pt&&(p.report_param=h),"125"==o.pt){
o.report_param=h;
var x=require("a/video.js");
new x(o);
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
return!!e.canvas_info&&e.dest_type===AD_CONFIG.AD_DEST_TYPE.CANVAS_AD_DEST_TYPE;
}
function launchIosAppBackup(e,a,t,i,_,n,p,o,r,d,s,c,l){
return isCanvasAd(s)?void openCanvasAd({
canvasId:s.canvas_info.canvas_id,
adInfoXml:s.canvas_info.ad_info_xml,
pos_type:r,
report_param:l,
url:e
}):s.dest_type!==AD_CONFIG.AD_DEST_TYPE.OUTER_DEST_TYPE||isItunesLink(e)?s.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_APPLET_DEST_TYPE?void Wxopen_card.openWxopen(d):s.dest_type===AD_CONFIG.AD_DEST_TYPE.WECHAT_SHOP_DEST_TYPE?void OpenUrlWithExtraWebview(ParseJs.join(e,{
outer_id:d.outer_id
})):void openWebAppStore(s.app_info.appinfo_url,c):void handleH5(e,a,t,i,_,n,p,o,r,d,s);
}
function handleApp(e,a,t,i,_,n,p,o,r,d,s,c,l){
console.info("[广告处理下载事件]",s);
var m=arguments;
if(s.has_installed&&!isItunesLink(s.app_info.appinfo_url)&&s.app_info.url_scheme)return JSAPI.invoke("launchApplication",{
schemeUrl:s.app_info.url_scheme
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=s.app_info.url_scheme);
}),!0;
if(isItunesLink(s.app_info.appinfo_url))return s.app_info.url_scheme&&mmversion.gtVersion("6.5.6",!0)?JSAPI.invoke("launchApplication",{
schemeUrl:s.app_info.url_scheme
},function(e){
-1===e.err_msg.indexOf("ok")&&launchIosAppBackup.apply(null,m);
}):launchIosAppBackup.apply(null,m),!0;
if(s.product_type!==AD_TYPE.ANDROID_APP_PRODUCT_TYPE&&s.product_type!==AD_TYPE.IOS_APP_PRODUCT_TYPE)return!1;
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
appuin:_,
pt:n,
aid:p,
ad_engine:o,
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
appuin:_,
pt:n,
channel_id:y,
aid:p,
engine:o,
pos_type:r,
pkgname:g
};
}
e=urlParser.join(e,u),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=urlParser.join(e,{
traceid:a,
aid:p,
engine:o
})),!p&&f&&f(80,e);
}
return OpenUrlWithExtraWebview(e),!0;
}
function handleH5(e,a,t,i,_,n,p,o,r,d,s){
if(console.info("[广告处理H5事件]",s),-1==e.indexOf("mp.weixin.qq.com"))e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var c={
source:4,
tid:a,
idx:t,
mid:i,
appuin:_,
pt:n,
aid:p,
ad_engine:o,
pos_type:r
},l=window.__report;
if(("104"==n||"113"==n||"114"==n||"122"==n)&&d||-1!=e.indexOf("mp.weixin.qq.com/mp/ad_app_info")){
var m="",u="";
d&&(m=d.pkgname&&d.pkgname.replace(/\./g,"_"),u=d.channel_id||""),c={
source:4,
tid:a,
traceid:a,
mid:i,
idx:t,
appuin:_,
pt:n,
channel_id:u,
aid:p,
engine:o,
pos_type:r,
pkgname:m
};
}
e=urlParser.join(e,c),(0==e.indexOf("http://mp.weixin.qq.com/promotion/")||0==e.indexOf("https://mp.weixin.qq.com/promotion/"))&&(e=urlParser.join(e,{
traceid:a,
aid:p,
engine:o
})),!p&&l&&l(80,e);
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
function setBackgroundClass(){
window._has_comment||0!=window.adDatas.num||window._share_redirect_url||window.is_temp_url?classList.removeClass(document.body,"rich_media_empty_extra"):classList.addClass(document.body,"rich_media_empty_extra");
}
function reportUrlLength(e,a,t,i,_,n,p){
var o=p+"&ad_sign_data="+e+"&ad_sign_k1="+a+"&ad_sign_k2="+t+"&ad_sign_md5="+i+"&viewid="+_.viewid;
if(o.length>=4e3){
var r=JSON.stringify({
biz_log_report:[{
pos_type:+n.pos_type,
traceid:n.tid,
aid:+n.aid,
log_type:1,
ext_info:"[url length:"+o.length+"]"+p.substring(0,2e3)
}]
});
ajax({
url:"/mp/advertisement_report?action=extra_report",
timeout:2e3,
data:{
extra_data:r,
__biz:biz
},
type:"post"
});
}
}
var mmversion=require("biz_wap/utils/mmversion.js"),Device=require("biz_wap/utils/device.js"),Sign=require("a/a_sign.js"),openUrl=require("biz_wap/utils/openUrl.js"),getParaList=require("biz_common/utils/get_para_list.js"),showTime=require("biz_wap/utils/show_time.js"),urlParser=require("biz_common/utils/url/parse.js"),DomEvent=require("biz_common/dom/event.js"),AdClickReport=require("a/a_report.js").AdClickReport,ajax=require("biz_wap/utils/ajax.js"),position=require("biz_wap/utils/position.js"),Card=require("a/card.js"),Wxopen_card=require("a/wxopen_card.js"),MpShop=require("a/mpshop.js"),JSAPI=require("biz_wap/jsapi/core.js"),TMPL=require("biz_common/tmpl.js"),a_tpl=require("a/a_tpl.html.js"),sponsor_a_tpl=require("a/sponsor_a_tpl.html.js"),cpc_a_tpl=require("a/cpc_a_tpl.html.js"),Report=require("biz_common/utils/report.js"),Class=require("biz_common/dom/class.js"),LS=require("biz_wap/utils/storage.js"),log=require("appmsg/log.js"),CrtManager=require("a/tpl/crt_tpl_manager.js"),classList=require("biz_common/dom/class.js"),AD_CONFIG=require("a/a_config.js"),POS_KEY_PREFIX="pos_",globalAdDebug=!!urlParser.getQuery("mock")||!!urlParser.getQuery("rtx"),AD_TYPE=AD_CONFIG.AD_TYPE,AD_POS=AD_CONFIG.AD_POS,pos_type=window.pos_type||0,__report=window.__report,js_bottom_ad_area=document.getElementById("js_bottom_ad_area"),js_sponsor_ad_area=document.getElementById("js_sponsor_ad_area"),el_gdt_areas={
pos_3:js_sponsor_ad_area,
pos_0:js_bottom_ad_area
},adElCountMapByPos={},contentWrp=document.getElementById("js_content"),ad_render_object={
pos_3:null,
pos_0:null
},gdt_as={
pos_3:js_sponsor_ad_area.getElementsByClassName("js_ad_link"),
pos_0:js_bottom_ad_area.getElementsByClassName("js_ad_link")
},ping_apurl={
pos_0:!1,
pos_1:!1,
pos_3:!1
},ping_cpm_apurl={
pos_0:{},
pos_1:{},
pos_3:{}
},isScroll=!1,isSee=!1,OpenUrlWithExtraWebview=openUrl.openUrlWithExtraWebview,openWebAppStore=openUrl.openWebAppStore,see_ad_detail_report=[!1,!1,!1,!1,!1,!1],see_ad_detail_first_see_time=0,innerHeight=window.innerHeight||document.documentElement.clientHeight,ad_engine=0;
window.adDatas={
ads:{},
num:0
};
var adDatas=window.adDatas,has_click={};
return initAdData(),{
checkNeedAds:checkNeedAds,
afterGetAdData:afterGetAdData,
setBackgroundClass:setBackgroundClass
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
});define("biz_common/utils/respTypes.js",[],function(require,exports,module,alert){
"use strict";
var logList=[],log=function(r){
logList.push(r);
},printLog=function(){
for(var r=0,e=logList.length;e>r;++r)console.log("[RespType]"+logList[r]);
},isArray=function(r){
return"[object Array]"==Object.prototype.toString.call(r);
},getValueType=function(r){
return isArray(r)?"array":typeof r;
},parseRtDesc=function(r,e){
var t="mix",o=!1,c=e;
if(e){
var n="_R",s=e.indexOf(n),i=e.length-n.length;
o=-1!=s&&s==i,c=o?e.substring(0,i):e;
}
return"string"==typeof r?t=r:isArray(r)?t="array":"object"==typeof r&&(t="object"),
{
key:c,
type:t,
isRequired:o
};
},checkForArrayRtDesc=function(r,e){
if(!isArray(r))return!1;
for(var t=0,o=r.length;o>t;++t){
for(var c,n=r[t],s=0,i=0===e.length;c=e[s++];)if(checkForRtDesc(n,c)){
i=!0;
break;
}
if(!i)return!1;
}
return!0;
},checkForStringRtDesc=function(r,e){
var t=getValueType(r),o=parseRtDesc(e),c=o.type==t;
return c||log("miss match type : "+t+" !== "+o.type),c;
},checkForObjectRtDesc=function(r,e){
if("object"!=typeof r||isArray(r))return log("must be object"),!1;
var t=r,o=r;
for(var c in e)if(e.hasOwnProperty(c)){
var n=e[c],s=parseRtDesc(n,c),i=s.key;
o=t[i];
var u=getValueType(o);
if(s.isRequired&&void 0===o)return log("is required @key="+i),!1;
if(void 0!==o){
if(u!=s.type&&"mix"!=s.type)return log("miss match type : "+u+" !== "+s.type+" @key="+i),
!1;
if(("array"==u||"object"==u)&&"mix"!=s.type&&!checkForRtDesc(o,n))return!1;
}
}
return!0;
},checkForRtDesc=function(r,e){
return isArray(e)?checkForArrayRtDesc(r,e):"object"==typeof e?checkForObjectRtDesc(r,e):"string"==typeof e?checkForStringRtDesc(r,e):!1;
},check=function(json,rtDescs){
if("string"==typeof json)try{
json=eval("("+json+")");
}catch(e){
return log("parse json error"),!1;
}
if("object"!=typeof json)return log("must be object"),!1;
isArray(rtDesc)||(rtDescs=[rtDescs]);
for(var rtDesc,i=0;rtDesc=rtDescs[i++];)if(checkForRtDesc(json,rtDesc))return!0;
return!1;
};
return{
check:function(r,e){
logList=[];
try{
var t=check(r,e);
return t||printLog(),t;
}catch(o){
return logList.push("[rtException]"+o.toString()),printLog(),!1;
}
},
getMsg:function(){
return logList.join(";");
}
};
});define("biz_wap/utils/log.js",["biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js"],function(i){
"use strict";
var s=i("biz_wap/utils/mmversion.js"),e=i("biz_wap/jsapi/core.js");
return function(i,n,o){
"string"!=typeof i&&(i=JSON.stringify(i)),n=n||"info",o=o||function(){};
var t;
s.isIOS?t="writeLog":s.isAndroid&&(t="log"),t&&e.invoke(t,{
level:n,
msg:"[WechatFe]"+i
},o);
};
});define("sougou/index.js",["appmsg/emotion/emotion.js","biz_common/tmpl.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_common/utils/string/html.js","sougou/a_tpl.html.js","appmsg/cmt_tpl.html.js","appmsg/my_comment_tpl.html.js"],function(t){
"use strict";
function e(t){
var e=document.getElementById("js_cover"),n=[];
e&&n.push(e);
var o=document.getElementById("js_content");
if(o)for(var i=o.getElementsByTagName("img")||[],s=0,r=i.length;r>s;s++)n.push(i.item(s));
for(var a=[],s=0,r=n.length;r>s;s++){
var l=n[s],c=l.getAttribute("data-src")||l.getAttribute("src");
c&&(a.push(c),function(e){
m.on(l,"click",function(){
return"ios"==t?window.JSInvoker&&window.JSInvoker.openImageList&&window.JSInvoker.openImageList(JSON.stringify({
index:e,
array:a
})):window.JSInvoker&&JSInvoker.weixin_openImageList&&window.JSInvoker.weixin_openImageList(JSON.stringify({
index:e,
array:a
})),!1;
});
}(s));
}
}
var n=t("appmsg/emotion/emotion.js"),o=t("biz_common/tmpl.js"),m=(t("biz_wap/utils/ajax.js"),
t("biz_common/tmpl.js"),t("biz_common/dom/event.js"));
t("biz_common/utils/string/html.js");
t("sougou/a_tpl.html.js"),t("appmsg/cmt_tpl.html.js");
if(document.getElementById("js_report_article3")&&(document.getElementById("js_report_article3").style.display="none"),
document.getElementById("js_toobar3")&&(document.getElementById("js_toobar3").style.display="none"),
function(){
var e=t("appmsg/my_comment_tpl.html.js"),n=document.createElement("div");
n&&(n.innerHTML=o.tmpl(e,{}),document.body.appendChild(n));
}(),n.init(),navigator.userAgent.toLowerCase().match(/ios/)){
var i=navigator.userAgent.toLowerCase().match(/(?:sogousearch\/ios\/)(.*)/);
if(i&&i[1]){
var s=i[1].replace(/\./g,"");
parseInt(s)>422&&e("ios");
}
}else e("android");
window.onerror=function(t){
var e=new Image;
e.src="/mp/jsreport?key=86&content="+t+"&r="+Math.random();
};
});