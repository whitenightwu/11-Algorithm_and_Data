define("appmsg/voicemsg.js",["biz_wap/jsapi/core.js","biz_common/dom/event.js","biz_common/dom/class.js"],function(e){
"use strict";
function o(e){
return document.getElementById(e);
}
function i(){
"1"==window.show_msg_voice&&(s.invoke("getBackgroundAudioState",{},function(e){
console.log("voicemsg getBackgroundAudioState res",e);
var i="waiting"==e.playState||"seeked"==e.playState||"seeking"==e.playState||"play"==e.playState;
e.paused=1*e.paused,e&&!e.paused&&i&&e.src&&e.src.indexOf("/mp/msgvoice?action=get_voice")>=0?a||(o("js_msgvoice_reading").style.display="",
o("js_msgvoice_reading_title").innerHTML=e.title,console.log("hello msgvoice reading"),
n.on(o("js_msgvoice_reading"),"click",function(){
location.href=e.musicbar_url||"https://mp.weixin.qq.com/mp/msgvoice?action=ttspage&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"#wechat_redirect";
}),c.addClass(o("page-content"),"voice"),console.log("add class voice in page-content"),
a=!0):(a=!1,o("js_msgvoice_reading").style.display="none",c.removeClass(o("page-content"),"voice"),
console.log("removeClass done"));
}),console.log("begin to getBackgroundAudioState in show_msg_voice"),setTimeout(function(){
i(),4>=d&&(d++,t+=1e3);
},t)),console.log("show_msg_voice is",window.show_msg_voice);
}
var s=e("biz_wap/jsapi/core.js"),n=e("biz_common/dom/event.js"),c=e("biz_common/dom/class.js"),t=1e3,a=!1,d=0;
i();
});define("appmsg/autoread.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","pages/voice_tpl.html.js","pages/voice_component.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function i(){
var e=d("autoread");
e&&(e.innerHTML='<p><label>朗读类型：</label>                                <select id="autoreadSelect">                                <option selected="true" value="0">女1</option>                                <option value="1">女2</option>                                <option value="2">男1</option>                                <option value="6">男2</option>                                </select></p><p id="autoread_voice"></p>',
r.on(d("autoreadSelect"),"change",function(){
p.player&&(p.player.destory(),p.player=null),p.checkAudioId&&(clearTimeout(p.checkAudioId),
p.checkAudioId=null);
var e=d("autoreadSelect");
d("autoread_voice").innerHTML="",o(e.value);
}),o(0));
}
function o(e){
var i=d("autoread_voice");
p._oMusic={
voiceid:p.voiceid,
duration_str:"",
posIndex:p.posIndex,
title:"文章朗读体验（"+p.voiceType[e||0]+"）",
nickname:window.nickname||"公众号"
},s.renderPlayer(u,p._oMusic,i,!0),d("voice_author_"+p.key).innerHTML="来自"+p._oMusic.nickname+"（创建音频中）",
c(e);
}
function n(e,i){
var o=p._oMusic;
d("voice_author_"+p.key).innerHTML="来自"+o.nickname,d("voice_duration_"+p.key).innerHTML=s.formatTime(1*i),
p.player=s.init({
protocal:"hls",
wxIndex:o.posIndex,
type:2,
songId:e,
src:a("https://mp.weixin.qq.com/mp/msgvoice?action=get_voice&media="+e),
allowPause:!0,
autoPlay:!0,
duration:i,
title:o.title,
singer:o.nickname?o.nickname+"的语音":"公众号语音",
epname:"来自文章",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"share_audio_playing",
playCssDom:d("voice_main_"+p.key),
playArea:d("voice_play_"+p.key),
progress:d("voice_progress_"+p.key),
fileSize:o.fileSize,
playtimeDom:d("voice_playtime_"+p.key),
bufferDom:d("voice_buffer_"+p.key),
playdotDom:d("voice_playdot_"+p.key),
seekRange:d("voice_seekRange_"+p.key),
seekContainer:d("voice_main_"+p.key),
loadingDom:d("voice_loading_"+p.key)
});
}
function t(e){
p.curNum+=1;
var i=1e3;
p.curNum>p.maxNum&&(i=2e3);
var o=["/mp/msgvoice?action=get_media&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&type=",e||0].join("");
m({
url:o,
type:"GET",
dataType:"json",
async:!0,
success:function(o){
o.mediaid&&o.duration?n(o.mediaid,o.duration):p.checkAudioId=setTimeout(function(){
t(e);
},i);
},
error:function(){
p.checkAudioId=setTimeout(function(){
t(e);
},i);
}
});
}
function a(e){
return e+=["&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&uin=",window.uin||"","&key=",window.key||"","&pass_ticket=",window.pass_ticket||"","&clientversion=",window.clientversion||"","&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||""].join("");
}
function c(e){
p.curNum=0;
var i=["/mp/msgvoice?action=tts&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&type=",e||0].join("");
m({
url:i,
type:"GET",
dataType:"json",
async:!0,
success:function(i){
i&&i.base_resp&&0==i.base_resp.ret?t(e):d("voice_author_"+p.key).innerHTML="来自"+window.nickname+"（失败）";
},
error:function(){
d("voice_author_"+p.key).innerHTML="来自"+window.nickname+"（失败）";
}
});
}
function d(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var r=e("biz_common/dom/event.js"),u=e("pages/voice_tpl.html.js"),s=e("pages/voice_component.js"),m=e("biz_wap/utils/ajax.js"),p={
checkId:"",
voiceid:"autoread",
posIndex:0,
key:"autoread_0",
voiceType:{
0:"女1",
1:"女2",
2:"男1",
6:"男2"
},
maxNum:5,
curNum:0
};
i();
});define("appmsg/voice.js",["biz_common/utils/string/html.js","pages/voice_tpl.html.js","appmsg/log.js","pages/voice_component.js"],function(e){
"use strict";
function i(){
var e=a("js_content");
return e?(p._oElements=e.getElementsByTagName("mpvoice")||[],p._oElements.length<=0?!1:!0):!1;
}
function o(){
p.musicLen=p._oElements.length;
}
function n(){
for(var e=0,i=0;i<p.musicLen;i++){
var o=p._oElements[i],n={},c=o.getAttribute("voice_encode_fileid")||"";
try{
c=decodeURIComponent(c);
}catch(a){}
n.voiceid=r.encodeStr(c),n.voiceid=n.voiceid.replace(/&#61;/g,"=").replace(/^\s/,"").replace(/\s$/,""),
n.isaac=1*o.getAttribute("isaac2")||0,n.src=p.srcRoot.replace("#meidaid#",n.voiceid),
1===n.isaac&&(n.jsapi2Src=n.src+"&voice_type=1"),n.voiceid&&"undefined"!=n.voiceid&&(t(o,n,e),
e++);
}
}
function t(e,i,o){
i.duration=parseInt((1*e.getAttribute("play_length")||0)/1e3,10),i.duration_str=r.formatTime(i.duration),
i.posIndex=o;
var n=e.getAttribute("name")||"";
try{
n=decodeURIComponent(n);
}catch(t){}
i.title=r.encodeStr(n).replace(/^\s/,"").replace(/\s$/,""),i.fileSize=1*e.getAttribute("high_size")||0,
i.nickname=window.nickname,r.renderPlayer(d,i,e),c(i),p.musicList[i.voiceid+"_"+i.posIndex]=i;
}
function c(e){
var i=e.voiceid+"_"+e.posIndex,o="";
if(window.voice_in_appmsg&&window.voice_in_appmsg[e.voiceid]){
var n=window.voice_in_appmsg[e.voiceid],t=window.biz||"",c=window.mid||"",d=window.idx||"";
n.bizuin&&n.appmsgid&&n.idx&&(t=n.bizuin,c=n.appmsgid,d=n.idx);
var p=window.location.protocol||"https:";
o=p+"//mp.weixin.qq.com/mp/audio?_wxindex_=#_wxindex_#&scene=104&__biz=#biz#&mid=#mid#&idx=#idx#&voice_id=#voice_id#&sn=#sn##wechat_redirect".replace("#_wxindex_#",e.posIndex).replace("#biz#",t).replace("#mid#",c).replace("#idx#",d).replace("#voice_id#",e.voiceid).replace("#sn#",n.sn||"");
}
s("[Voice] init"+o);
var m=r.decodeStr(e.title);
e.player=r.init({
wxIndex:e.posIndex,
type:2,
songId:e.voiceid,
comment_id:"",
src:e.src,
jsapi2Src:e.jsapi2Src,
allowPause:!0,
duration:e.duration,
title:m,
singer:window.nickname?window.nickname+"的语音":"公众号语音",
epname:"来自文章",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"share_audio_playing",
playCssDom:a("voice_main_"+i),
playArea:a("voice_play_"+i),
progress:a("voice_progress_"+i),
fileSize:e.fileSize,
playtimeDom:a("voice_playtime_"+i),
bufferDom:a("voice_buffer_"+i),
playdotDom:a("voice_playdot_"+i),
seekRange:a("voice_seekRange_"+i),
seekContainer:a("voice_main_"+i),
loadingDom:a("voice_loading_"+i),
detailArea:o?a("voice_detail_"+i):"",
detailUrl:o,
webUrl:o
});
}
function a(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var d=e("pages/voice_tpl.html.js"),s=e("appmsg/log.js"),r=e("pages/voice_component.js"),p={
musicList:{},
musicLen:0,
srcRoot:location.protocol+"//res.wx.qq.com/voice/getvoice?mediaid=#meidaid#"
};
return i()?(o(),n(),p.musicList):void 0;
});define("appmsg/qqmusic.js",["biz_common/utils/string/html.js","appmsg/log.js","pages/qqmusic_tpl.html.js","pages/voice_component.js","pages/qqmusic_ctrl.js","pages/kugoumusic_ctrl.js"],function(e){
"use strict";
function t(){
var e=u("js_content");
return e?(l._oElements=e.getElementsByTagName("qqmusic")||[],l._oElements.length<=0?!1:!0):!1;
}
function i(){
l.musicLen=l._oElements.length;
}
function s(){
for(var e=0,t=0;t<l.musicLen;t++){
var i=l._oElements[t],s={};
s.musicid=m.encodeStr(i.getAttribute("musicid")||"").replace(/^\s/,"").replace(/\s$/,""),
s.musicid&&"undefined"!=s.musicid&&(r(i,s,e),e++);
}
}
function r(e,t,i){
t.media_id=m.encodeStr(e.getAttribute("mid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.musictype=parseInt(e.getAttribute("musictype"))||1,t.musictype>2&&(t.musictype=2),
t.albumid=m.encodeStr(e.getAttribute("albumid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.otherid=m.encodeStr(e.getAttribute("otherid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.jumpurlkey=m.encodeStr(e.getAttribute("jumpurlkey")||"").replace(/^\s/,"").replace(/\s$/,""),
t.duration=parseInt(e.getAttribute("play_length")||0,10),t.posIndex=i,t.albumurl=m.encodeStr(e.getAttribute("albumurl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.audiourl=m.encodeStr(e.getAttribute("audiourl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.singer=m.encodeStr(e.getAttribute("singer")||"").replace(/^\s/,"").replace(/\s$/,""),
t.music_name=m.encodeStr(e.getAttribute("music_name")||"").replace(/^\s/,"").replace(/\s$/,""),
l.adapter[t.musictype]&&"function"==typeof l.adapter[t.musictype].initData&&(t=l.adapter[t.musictype].initData(t,{
scene:0
})),m.renderPlayer(n,t,e),a(t),l.musicList[t.musicid+"_"+t.posIndex]=t;
}
function a(e){
var t=e.musicid+"_"+e.posIndex;
c("[Music] init "+e.detailUrl);
var i=m.decodeStr(e.music_name);
e.player=m.init({
allowPause:e.allowPause===!0?!0:!1,
wxIndex:e.posIndex,
type:e.type||0,
comment_id:"",
mid:e.media_id,
otherid:e.otherid,
albumid:e.albumid,
songId:e.musicid,
duration:e.duration,
title:i,
singer:window.nickname?window.nickname+"推荐的歌":"公众号推荐的歌",
epname:"音乐",
coverImgUrl:e.albumurl,
playingCss:"qqmusic_playing",
pauseCss:e.pauseCss||"",
playCssDom:u("qqmusic_main_"+t),
playArea:u("qqmusic_play_"+t),
detailUrl:e.detailUrl||"",
webUrl:e.webUrl||"",
detailArea:u("qqmusic_home_"+t)
});
}
function u(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var c=e("appmsg/log.js"),n=e("pages/qqmusic_tpl.html.js"),m=e("pages/voice_component.js"),l={
adapter:{
1:e("pages/qqmusic_ctrl.js"),
2:e("pages/kugoumusic_ctrl.js")
},
musicList:{},
musicLen:0
};
return t()?(i(),s(),l.musicList):void 0;
});define("appmsg/iframe.js",["biz_common/utils/string/html.js","pages/video_communicate_adaptor.js","biz_wap/utils/ajax_wx.js","biz_common/utils/url/parse.js","new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
"use strict";
function t(e){
var t=0;
try{
e.contentDocument&&e.contentDocument.body.offsetHeight?t=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?t=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(t=e.document.body.scrollHeight);
var i=e.parentElement;
if(i&&(e.style.height=t+"px"),/MSIE\s(7|8)/.test(navigator.userAgent)&&e.contentWindow&&e.contentWindow.document){
var o=e.contentWindow.document.getElementsByTagName("html");
o&&o.length&&(o[0].style.overflow="hidden");
}
}catch(n){}
}
function i(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=c.video_top.length,n=e+c.innerHeight,d=0,s=0;t>s;s++){
var m=c.video_top[s];
m.reported?d++:n>=m.start&&n<=m.end&&(m.reported=!0,setTimeout(function(e,t,i){
return function(){
var n=o.getVideoInfo(),d="";
n[e]&&n[e].hit_bizuin&&(d=n[e].hit_bizuin),r.report({
step:1,
hit_bizuin:d,
vid:e,
screen_num:Math.ceil(t/i),
screen_height:i
});
};
}(m.vid,n,c.innerHeight),1e4));
}
d==t&&(a.off(window,"scroll",i),c.video_top=c.video_iframe=i=null);
}
e("biz_common/utils/string/html.js");
{
var o=e("pages/video_communicate_adaptor.js"),n=e("biz_wap/utils/ajax_wx.js"),d=e("biz_common/utils/url/parse.js"),r=e("new_video/ctl.js"),c={
txVideoReg:/^http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/,
mpVideoReg:/^http(s)*\:\/\/mp\.weixin\.qq\.com\/mp\/readtemplate\?t=pages\/video_player_tmpl/,
innerHeight:window.innerHeight||document.documentElement.clientHeight,
video_iframe:[],
video_top:[]
},s=e("pages/version4video.js"),m=e("biz_common/dom/attr.js"),a=(m.setProperty,e("biz_common/dom/event.js")),p=document.getElementsByTagName("iframe"),l=[];
/MicroMessenger/.test(navigator.userAgent);
}
window.reportVid=[];
for(var _=Math.ceil(1e4*Math.random()),u=0,w=p.length;w>u;++u)!function(e){
var i=e.getAttribute("data-src")||"",o=e.className||"",r=e.getAttribute("src")||i;
if(!i||"#"==i){
var m=e.getAttribute("data-display-src");
if(m&&(0==m.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==m.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
m=m.replace(/&amp;/g,"&");
for(var a=m.split("&"),p=["/mp/newappmsgvote?action=show"],u=0;u<a.length;u++)(0==a[u].indexOf("__biz=")||0==a[u].indexOf("supervoteid="))&&p.push(a[u]);
p.length>1&&(i=p.join("&")+"#wechat_redirect");
}
}
if(r&&(c.txVideoReg.test(r)||c.mpVideoReg.test(r))){
if(s.isShowMpVideo()||c.mpVideoReg.test(r)){
var w=d.getQuery("vid",i);
if(!w)return;
var f=e.getAttribute("data-vw"),g=e.getAttribute("data-vh"),v=document.domain;
"qq.com"==v&&((new Image).src="https://badjs.weixinbridge.com/badjs?id=139&level=4&from="+window.encodeURIComponent(window.location.host)+"&msg="+window.encodeURIComponent(window.location.href),
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=27302_100_1&lc=1&log0=[beforeD]"+window.encodeURIComponent(window.location.href)),
window.reportVid.push(w),c.video_iframe.push({
dom:e,
vid:w
}),r=["/mp/videoplayer?video_h=",g,"&video_w=",f,"&scene=",window.source,"&random_num=",_,"&article_title=",encodeURIComponent(window.msg_title.htmlDecode()),"&source=4&vid=",w,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&nodetailbar=",window.is_temp_url?1:0,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||""].join(""),
uin||window.__addIdKeyReport&&window.__addIdKeyReport("28307",21),window.__addIdKeyReport&&window.__addIdKeyReport("28307",11),
setTimeout(function(e,t){
t.setAttribute("marginWidth",0),t.setAttribute("marginHeight",0),t.style.top="0",
window.__second_open__?n({
url:e,
type:"GET",
f:"html",
success:function(i){
t.setAttribute("src",e),t.contentDocument.open("text/html","replace"),t.contentDocument.write(i),
t.contentDocument.close(),t.contentWindow.__iframe_src__=e;
}
}):t.setAttribute("src",e);
},0,r,e);
}
}else if(i&&(i.indexOf("newappmsgvote")>-1&&o.indexOf("js_editor_vote_card")>=0||0==i.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&o.indexOf("card_iframe")>=0||i.indexOf("appmsgvote")>-1||i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(window.is_transfer_msg&&!window.reprint_ticket&&i.indexOf(window.biz)<0)return void l.push(e);
if(window.__second_open__||(i=i.replace(/^http:/,location.protocol)),o.indexOf("card_iframe")>=0){
var h=i.replace("#wechat_redirect",["&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz,"&wxtoken=",window.wxtoken||""].join(""));
reprint_ticket&&(h+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join("")),
window.__second_open__?n({
url:h,
type:"GET",
f:"html",
success:function(o){
e.setAttribute("src",h),e.contentWindow.document.open("text/html","replace"),e.contentWindow.document.write(o),
e.contentWindow.document.close(),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
});
}
}):(e.setAttribute("src",h),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
}));
}else{
var x=i.indexOf("#wechat_redirect")>-1,b=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&wxtoken=",window.wxtoken||""].join("");
reprint_ticket?b+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx,"&appmsg_token=",appmsg_token].join(""):o.indexOf("vote_iframe")>=0&&(b+=["&mid=",mid,"&idx=",idx,"&appmsg_token=",appmsg_token].join(""));
var h=x?i.replace("#wechat_redirect",b):i+b;
window.__second_open__?n({
url:h,
type:"GET",
f:"html",
success:function(o){
e.contentWindow.Ajax=n,e.setAttribute("src",h),e.contentWindow.document.open("text/html","replace"),
e.contentWindow.document.write(o),e.contentWindow.document.close(),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
});
}
}):(e.setAttribute("src",h),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
}));
}
e.appmsg_idx=u;
}
if(i&&i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&f>0){
var y=f,j=3*y/4;
e.width=y,e.height=j,e.style.setProperty&&(e.style.setProperty("width",y+"px","important"),
e.style.setProperty("height",j+"px","important"));
}
}(p[u]);
for(var f=0;f<l.length;f++){
var g=l[f];
g.parentNode.removeChild(g);
}
if(window.iframe_reload=function(){
for(var e=0,i=p.length;i>e;++e){
var o=p[e],n=o.getAttribute("src");
n&&(n.indexOf("newappmsgvote")>-1||n.indexOf("appmsgvote")>-1)&&t(o);
}
},"getElementsByClassName"in document)for(var v,h=document.getElementsByClassName("video_iframe"),u=0;v=h.item(u++);)v.setAttribute("scrolling","no"),
v.style.overflow="hidden";
c.video_iframe.length>0&&setTimeout(function(){
for(var e=c.video_iframe,t=document.getElementById("js_article"),o=0,n=e.length;n>o;o++){
var d=e[o];
if(!d||!d.dom)return;
for(var r=d.dom,s=r.offsetHeight,m=0;r&&t!==r;)m+=r.offsetTop,r=r.offsetParent;
c.video_top.push({
start:m+s/2,
end:m+s/2+c.innerHeight,
reported:!1,
vid:d.vid
});
}
i(),a.on(window,"scroll",i);
});
});define("appmsg/product.js",["biz_common/dom/event.js"],function(e){
"use strict";
function t(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=window.innerHeight||document.documentElement.clientHeight,o=0;o<d.length;++o){
var n=d[o];
if(!n.isReport){
var r=n.offsetTop;
r>=e&&e+t>=r&&(n.isReport=!0,(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=1&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+n.product_id+"&order="+n.order+"&r="+Math.random());
}
}
}
var o=e("biz_common/dom/event.js");
if(document.getElementsByClassName){
for(var n=document.getElementsByClassName("js_product_section"),r=document.getElementsByClassName("js_product_a"),d=[],i=0;i<n.length;++i){
var s=n[i];
s.dataset&&s.dataset.product_id&&s.dataset.order&&d.push({
dom:s,
offsetTop:s.offsetTop,
product_id:s.dataset.product_id||"",
order:s.dataset.order||"",
isReport:!1
});
}
d.length>0&&(o.on(window,"scroll",t),t());
for(var i=0;i<r.length;++i)!function(e){
o.on(e,"click",function(){
var t=e.dataset||{};
return(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=2&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+(t.product_id||"")+"&order="+(t.order||"")+"&r="+Math.random(),
t.href?(setTimeout(function(){
location.href="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(t.href)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&scene=0";
},300),!1):!1;
},!0);
}(r[i]);
}
});define("appmsg/review_image.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","appmsg/log.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","appmsg/cdn_img_lib.js"],function(e){
"use strict";
function t(e,t,a,o){
var i={
current:e,
urls:t,
currentInfo:{
url:e,
data:a,
pos:o
}
};
console.log("imagePreview request",i),r.invoke("imagePreview",i,function(e){
console.log("imagePreview response",e),window.__addIdKeyReport&&window.__addIdKeyReport("28307","2");
}),d("[Appmsg] click image, src: "+e);
}
function a(e,t){
s({
url:"/mp/rewardappmsgreport",
data:{
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
oper:t||"",
cdn_url:e||"",
ascene:window.ascene||-1
},
type:"POST",
dataType:"json",
async:!0
});
}
function o(e){
var o=[],r=e.container,d=e.imgs||[];
if(r)for(var s=r.getElementsByTagName("img")||[],g=0,l=s.length;l>g;g++)d.push(s.item(g));
for(var c=p.isIOS&&1==window._copyright_stat&&1==window.is_need_reward,m=0,g=0,l=d.length;l>g;g++){
var w=d[g],u=w.getAttribute("data-src")||w.getAttribute("src"),h=w.getAttribute("data-type");
if(u&&!u.isGif()&&0!=u.indexOf("data:")){
for(;-1!=u.indexOf("?tp=webp");)u=u.replace("?tp=webp","");
w.dataset&&w.dataset.s&&u.isCDN()&&(u=u.replace(/\/640$/,"/0"),u=u.replace(/\/640\?/,"/0?")),
u.isCDN()&&(u=n.addParam(u,"wxfrom","3",!0)),u=e.is_https_res?u.http2https():u.https2http(),
h&&(u=n.addParam(u,"wxtype",h,!0)),o.push(u),"1"!=w.getAttribute("data-nopreviewclick")&&!function(e){
i.on(w,"click",function(i){
if(!(i&&i.target&&i.target.className&&i.target.className.indexOf("img_loadederror")>-1)){
if("function"==typeof window.__addIdKeyReport&&window.__addIdKeyReport("110644",2),
window.getComputedStyle){
for(var r=i.target,n=r.getBoundingClientRect(),d=!0;r&&"body"!=r.nodeName.toLowerCase();){
var s=window.getComputedStyle(r,null),g=parseInt(s.getPropertyValue("opacity")),l=s.getPropertyValue("filter"),w=s.getPropertyValue("visibility"),u=s.mixBlendMode;
if(1!=g||"visible"!=w||l.indexOf("opacity")>=0||l.indexOf("blur")>=0||u&&"normal"!=u){
d=!1;
break;
}
var h=r.getBoundingClientRect();
if(("hidden"==s.overflow||"hidden"==s.overflowX||"hidden"==s.overflowY)&&(h.left>n.left||h.right<n.right||h.top>n.top||h.bottom<n.bottom)){
d=!1;
break;
}
r=r.parentElement;
}
if(!d){
if(console.log("don't try this again"),"function"==typeof window.__addIdKeyReport){
window.__addIdKeyReport("110644",3);
var f=new Image,b="https://badjs.weixinbridge.com/badjs?id=168&level=4&from="+encodeURIComponent(location.href)+"&msg="+encodeURIComponent(e);
f.src=b.slice(0,1024);
}
return!1;
}
}
"undefined"==typeof getComputedStyle&&(window.getComputedStyle=document.body.currentStyle?function(e){
return e.currentStyle;
}:{});
var y=i.target,_=window.getComputedStyle(y),v=y.getBoundingClientRect(),j=document.createElement("canvas");
j.style.width=_.width,j.style.height=_.height,j.width=parseFloat(_.width),j.height=parseFloat(_.height);
var F=j.getContext("2d"),x="";
F.drawImage(y,0,0,parseFloat(_.width),parseFloat(_.height));
try{
x=j.toDataURL();
}catch(i){}
p.isAndroid&&(x=""),t(e,o,x,{
x:v.left-parseFloat(_.paddingLeft)-parseFloat(_.borderLeftWidth),
y:v.top-parseFloat(_.paddingTop)-parseFloat(_.borderTopWidth),
width:v.width-parseFloat(_.paddingLeft)-parseFloat(_.paddingRight)-parseFloat(_.borderLeftWidth)-parseFloat(_.borderRightWidth),
height:v.height-parseFloat(_.paddingTop)-parseFloat(_.paddingBottom)-parseFloat(_.borderTopWidth)-parseFloat(_.borderBottomWidth)
}),c&&0==m&&a(i.target.src,2);
}
});
}(u),w.removeAttribute("data-nopreviewclick");
}
}
if(c){
var f=document.getElementById("js_content"),b=0,y=0;
i.on(f,"touchstart",function(e){
return e&&e.target&&e.target.tagName&&"string"==typeof e.target.tagName&&"IMG"==e.target.tagName.toString().toUpperCase()?(m=+new Date,
b=e.touches[0].pageX,void(y=e.touches[0].pageY)):void(m=0);
}),i.on(f,"touchmove",function(e){
var t=e.touches[0].pageX,a=e.touches[0].pageY;
Math.abs(t-b)>10&&Math.abs(a-y)>10&&(m=0);
}),i.on(f,"touchend",function(e){
0!=m&&(+new Date-m>800&&+new Date-m<6e3?a(e.target.src,1):m=0);
});
}
}
var i=e("biz_common/dom/event.js"),r=e("biz_wap/jsapi/core.js"),n=e("biz_common/utils/url/parse.js"),d=e("appmsg/log.js"),s=e("biz_wap/utils/ajax.js"),p=e("biz_wap/utils/mmversion.js");
return e("appmsg/cdn_img_lib.js"),o;
});define("appmsg/outer_link.js",["biz_common/dom/event.js","appmsg/reportClickLink.js","biz_wap/utils/ajax.js"],function(n){
"use strict";
function e(n){
var e=n.container;
if(!e)return!1;
for(var i=e.getElementsByTagName("a")||[],a=0,o=i.length;o>a;++a)!function(e){
var a=i[e],o=a.getAttribute("href");
if(!o)return!1;
var s=0,c=a.innerHTML;
/^[^<>]+$/.test(c)?s=1:/^<img[^>]*>$/.test(c)&&(s=2),!!n.changeHref&&(o=n.changeHref(o,s)),
r.on(a,"click",function(n){
return n.preventDefault(),"MzIxNzA1NDEyNQ=="===window.biz&&(o.indexOf("campaign%3Dtw")>=0||o.indexOf("campaign%3Dtuiwen")>=0)?(t({
path:o,
type:s,
success:function(){
location.href=o;
},
error:function(){
location.href=o;
}
}),!1):(location.href=o,!1);
},!0);
}(a);
}
function i(){
var n=navigator.userAgent.toLowerCase(),e=~n.indexOf("android"),i=~n.search(/ip(od|hone|ad)/);
return e?"Android":i?"iOS":"unknown";
}
function t(n){
var e="/mp/articleh5report?action=open_h5",t={
OsName:i(),
UserAgent:navigator.userAgent,
Count:1,
bizuin:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
uin:window.user_uin||"",
currentURL:window.location.href,
targetURL:n.path||"",
linkType:n.type||2,
targetType:0,
targetAppId:n.appid||"",
isAD:0
};
a({
url:e,
data:{
json:JSON.stringify(t)
},
type:"POST",
dataType:"json",
async:!0,
success:n.success,
error:n.error
});
}
var r=n("biz_common/dom/event.js"),a=(n("appmsg/reportClickLink.js"),n("biz_wap/utils/ajax.js"));
return e;
});define("appmsg/copyright_report.js",["biz_common/dom/event.js"],function(t){
"use strict";
function o(t){
var o=["/mp/copyrightreport?action=report&biz=",biz,"&scene=",t.scene,"&user_uin=",user_uin,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&t=",Math.random()].join("");
window.isSg&&(o+="&from=sougou");
var e=new Image;
e.src=o.substr(0,1024);
}
function e(){
var t=__appmsgCgiData;
if("2"==t.copyright_stat){
for(var o=r("copyright_info"),e=r("js_article");o&&e!==o;)c.copyright_top+=o.offsetTop,
o=o.offsetParent;
i.on(window,"scroll",n);
}
}
function n(){
var t=window.pageYOffset||document.documentElement.scrollTop;
t+c.innerHeight>c.copyright_top&&(o({
scene:"1",
card_pos:"0"
}),i.off(window,"scroll",n),n=c.copyright_top=null);
}
function r(t){
return document.getElementById(t);
}
var i=t("biz_common/dom/event.js"),c={
innerHeight:window.innerHeight||document.documentElement.clientHeight,
copyright_top:0
};
return{
card_click_report:o,
card_pv_report:e
};
});define("appmsg/async.js",["biz_common/utils/string/html.js","appmsg/comment_utils.js","pages/create_txv.js","pages/video_ctrl.js","biz_common/utils/url/parse.js","biz_common/dom/class.js","appmsg/img_copyright_tpl.html.js","appmsg/appmsgext.js","appmsg/share_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","biz_wap/utils/storage.js","appmsg/log.js","rt/appmsg/getappmsgext.rt.js","a/a.js","biz_wap/utils/mmversion.js","pages/version4video.js","appmsg/like.js","appmsg/reward_entry.js","a/testdata.js","appmsg/iframe.js","appmsg/more_read.js"],function(e,t,r,i){
"use strict";
function a(){
for(var t=document.getElementsByTagName("iframe"),r=[],i=0,a=t.length;a>i;++i)r.push(t[i]);
t=null;
var d=document.getElementById("js_content"),o=d.offsetWidth,s=o/u.getRatio();
window.logs.video_cnt=0;
for(var i=0,a=r.length;a>i;++i){
var _=r[i],m=_.getAttribute("data-src")||"",c=_.getAttribute("src")||m;
if(c){
var l=e("pages/version4video.js");
if(0==c.indexOf("http://z.weishi.com/weixin/player.html"))c=c.replace(/width=\d+/g,"width="+o),
c=c.replace(/height=\d+/g,"height="+s),_.width=o,_.height=s,_.style.setProperty&&(_.style.setProperty("width",o+"px","important"),
_.style.setProperty("height",s+"px","important")),_.setAttribute("src",c),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10),
window.logs.video_cnt++;else if(/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(c)){
if(!l.isShowMpVideo()){
var p;
p=n(j?_:_),p&&N.push(p),"function"==typeof window.__addIdKeyReport&&(window.__addIdKeyReport("28307",10),
l.device.inWechat&&l.device.inWindowWechat?window.__addIdKeyReport("110644",0):l.device.inWechat&&l.device.inMacWechat&&window.__addIdKeyReport("110644",1));
}
window.logs.video_cnt++;
continue;
}
}
}
N.length>0&&"function"==typeof window.__getVideoWh&&k.on(window,"resize",function(){
try{
for(var e=0,t=N.length;t>e;e++){
var r=N[e],i=r.playerObj;
if(i){
var a=window.__getVideoWh(r);
r.style.width=a.w+"px",r.style.height=a.h+"px",i.resize({
width:a.vw,
height:a.vh
});
}
}
}catch(n){}
},!1);
}
function n(e){
var t=e.getAttribute("data-src")||e.getAttribute("src"),r=g.getQuery("vid",t),i=e.getAttribute("data-vw"),a=e.getAttribute("data-vh"),n=e.getAttribute("data-ratio"),o=document.createElement("span");
o.setAttribute("data-ratio",n),o.id="js_tx_video_container_"+Math.random(),o.className="js_tx_video_container",
o.style.cssText=e.style.cssText,o.style.display="none";
var s=e.parentNode;
return s?(s.lastChild===e?s.appendChild(o):s.insertBefore(o,e.nextSibling),w.createTxVideo({
containerId:o.id,
vid:r,
width:i,
height:a,
autoplay:!1,
allowFullScreen:!0,
onSuccess:function(e){
o.playerObj=e.player,d(o,r),o.style.display="block";
},
onError:function(){}
}),s.removeChild(e),o):void 0;
}
function d(e,t){
if(t&&e){
var r=e.parentNode;
if(r){
for(var i=[],a=0,n=r.children.length;n>a;a++){
var d=r.children[a];
d.className.indexOf("img_loading")>=0&&d.getAttribute("data-vid")==t&&i.push(d);
}
for(var a=0,n=i.length;n>a;a++)r.removeChild(i[a]);
e.style.display="block";
}
}
}
function o(e){
if(e&&e.img_copy_info&&e.img_copy_info.list){
for(var t={},r=e.img_copy_info.list,i=window.__appmsgCgiData.copyright_stat,a=window.__appmsgCgiData.source_biz,n=0,d=r.length;d>n;n++){
var o=r[n];
if(2==o.type){
if(2==i&&a==o.source_uin)continue;
t[o.img_url]={
source_nickname:o.source_nickname,
source_uin:o.source_uin,
source_encode_biz:o.source_encode_biz||""
};
}
}
for(var s=document.getElementsByTagName("img"),n=0,d=s.length;d>n;n++){
var o=s[n],_=o.getAttribute("data-src")||o.getAttribute("data-backsrc")||"";
if(t[_]){
var m=document.createElement("div");
m.innerHTML=E.tmpl(v,t[_]);
{
var c=m.children[0],l=o.parentNode,p=l.insertBefore(c,o),w=p.children[0];
(function(e,t){
k.on(t,"click",function(){
var t="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene=112#wechat_redirect";
return-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?(location.href=t,
!1):(I.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
}),!1);
});
})(t[_],w);
}
p.insertBefore(o,w);
}
}
}
}
function s(t){
var r=t.appmsgstat||{};
if(window.appmsgstat||(window.appmsgstat=r),r.show){
var a=document.getElementById("js_read_area3"),n=document.getElementById("like3"),d=document.getElementById("likeNum3"),o=document.getElementById("readNum3");
if(!(a&&n&&d&&o))return;
var s=e("appmsg/like.js");
r.liked=window.is_temp_url?window.liked:r.liked,s.showLikeNum({
show:!0,
likeAreaDom:n,
likeNumDom:d,
liked:r.liked,
className:"praised",
likeAreaDisplayValue:"inline",
likeNum:window.is_temp_url?window.like_num:r.like_num
}),s.showReadNum({
show:!0,
readAreaDom:a,
readNumDom:o,
readAreaDisplayValue:"block",
readNum:window.is_temp_url?window.read_num:r.read_num
}),s.initLikeEvent({
likeAreaDom:n,
likeNumDom:d,
className:"praised",
biz:window.biz,
mid:window.mid,
idx:window.idx,
appmsgid:window.appmsgid,
itemidx:window.itemidx,
is_temp_url:window.is_temp_url
});
}
var _=document.getElementById("js_share_appmsg");
t.share_redirect_url&&_&&(window._share_redirect_url=t.share_redirect_url,_.innerHTML=E.tmpl(f,{
url:t.share_redirect_url
})),p.initCommentByExtData(t),window._has_comment||0!=window.adDatas.num||window._share_redirect_url||window.is_temp_url||h.addClass(document.body,"rich_media_empty_extra");
var c=document.getElementById("js_author_name");
t.reward_entrance_enable_for_preview||(-1!=b.indexOf("WindowsWechat")||-1==b.indexOf("MicroMessenger")||A.isInMiniProgram?A.isInMiniProgram&&c&&x.removeClass(c,"rich_media_meta_link"):(l=e("appmsg/reward_entry.js"),
l.handle(t.reward,m()),c&&t.reward.rewardsn&&t.reward.timestamp&&(c.setAttribute("data-rewardsn",t.reward.rewardsn),
c.setAttribute("data-timestamp",t.reward.timestamp),c.setAttribute("data-canreward",t.reward.can_reward)),
c&&!t.reward.can_reward&&x.removeClass(c,"rich_media_meta_link"))),1!=t.reward_entrance_enable_for_preview||A.isInMiniProgram?(1==t.reward_entrance_enable_for_preview||A.isInMiniProgram)&&c&&x.removeClass(c,"rich_media_meta_link"):author_id?(document.getElementById("js_preview_reward_author")&&(document.getElementById("js_preview_reward_author").style.display="block"),
t.reward_wording&&document.getElementById("js_preview_reward_author_wording")&&(document.getElementById("js_preview_reward_author_wording").innerText=t.reward_wording,
document.getElementById("js_preview_reward_author_wording").style.display="block"),
t.reward_author_head&&document.getElementById("js_preview_reward_author_avatar")&&(document.getElementById("js_preview_reward_author_head").setAttribute("src",t.reward_author_head),
document.getElementById("js_preview_reward_author_avatar").style.display="block"),
document.getElementById("js_preview_reward_link_text").innerText="喜欢作者",k.on(document.getElementById("js_preview_reward_author_link"),"tap",function(e){
e.preventDefault(),i("预览状态下无法操作。");
})):A.isAndroid&&(document.getElementById("js_preview_reward_author")&&(document.getElementById("js_preview_reward_author").style.display="block"),
t.reward_wording&&document.getElementById("js_preview_reward_author_wording")&&(document.getElementById("js_preview_reward_author_wording").innerText=t.reward_wording,
document.getElementById("js_preview_reward_author_wording").style.display="block"),
document.getElementById("js_preview_reward_author_name").style.display="none",k.on(document.getElementById("js_preview_reward_author_link"),"tap",function(e){
e.preventDefault(),i("预览状态下无法操作。");
}));
var w=document.getElementById("js_cmt_container");
1==t.comment_entrance_enable_for_preview&&window.is_temp_url&&w&&(w.style.display="block"),
t.comment_entrance_enable_for_preview&&(document.getElementById("js_preview_cmt")&&(document.getElementById("js_preview_cmt").style.display="block"),
k.on(document.getElementById("js_preview_cmt_write"),"tap",function(e){
e.preventDefault(),i("预览状态下无法操作。");
})),t.comment_enabled&&w&&(w.style.display="block");
}
function _(){
var t=z.checkNeedAds(),r=t.is_need_ad,i=t.both_ad,a=-1!=location.href.indexOf("mock_ad=");
a&&(t.is_need_ad=r=1),B("[Appmsg] start get asycn data, is_need_ad:"+r);
var n=0;
y.getData({
biz:biz,
appmsg_type:appmsg_type,
mid:mid,
sn:sn,
idx:idx,
scene:source,
title:msg_title,
ct:ct,
abtest_cookie:abtest_cookie,
devicetype:devicetype,
version:window.clientversion,
is_need_ticket:N&&N.length>0?1:0,
is_need_ad:r,
comment_id:comment_id,
is_need_reward:is_need_reward,
both_ad:i,
reward_uin_count:is_need_reward?3*m():0,
send_time:window.send_time||"",
msg_daily_idx:msg_daily_idx,
is_original:n,
is_only_read:is_only_read,
req_id:window.req_id||"",
pass_ticket:pass_ticket,
is_temp_url:window.is_temp_url||0,
more_read_type:more_read_type||0,
rtId:"27613",
rtKey:"50",
onSuccess:function(t){
if(t)try{
if(a){
var r=e("a/testdata.js");
t.advertisement_info=r.getAd(),t.advertisement_num=t.advertisement_info.length;
}
if(t&&t.base_resp&&t.base_resp.wxtoken&&(window.wxtoken=t.base_resp.wxtoken),window.fromWeixinCached&&e("appmsg/iframe.js"),
o(t),t.ret)return;
var i=document.getElementById("js_more_read_area");
i&&t&&t.more_read_list&&t.more_read_list.length&&e("appmsg/more_read.js")(i,t.more_read_list),
window.wx_user_can_reward=t.user_can_reward,s({
appmsgstat:t.appmsgstat,
comment_enabled:t.comment_enabled,
comment_count:t.comment_count,
friend_comment_enabled:t.friend_comment_enabled,
only_fans_can_comment:t.only_fans_can_comment,
reward:{
reward_total:t.reward_total_count,
reward_head_imgs:t.reward_head_imgs||[],
can_reward:t.can_reward,
user_can_reward:t.user_can_reward,
reward_qrcode_ticket:t.reward_qrcode_ticket,
timestamp:t.timestamp,
reward_author_head:t.reward_author_head,
rewardsn:t.rewardsn
},
reward_entrance_enable_for_preview:t.reward_entrance_enable_for_preview,
reward_wording:t.reward_wording,
reward_author_head:t.reward_author_head,
comment_entrance_enable_for_preview:t.comment_entrance_enable_for_preview,
share_redirect_url:t.share_redirect_url||"",
logo_url:t.logo_url,
nick_name:t.nick_name,
is_fans:t.is_fans
});
}catch(n){
B("[Appmsg] error parse async data, biz="+biz+", mid="+mid);
var d=new Image;
return d.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(n.toString())+"&r="+Math.random()).substr(0,1024),
void(console&&console.error(n));
}
},
onError:function(){
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
}
});
}
function m(){
return k.on(window,"resize",function(){
c(),l&&l.render(m());
}),c();
}
function c(){
var e=window.innerWidth||document.documentElement.clientWidth;
try{
var t=document.getElementById("page-content").getBoundingClientRect();
t.width&&(e=t.width);
}catch(r){}
var i=30,a=36,n=Math.floor(.9*(e-i)/a);
return window.new_appmsg&&(n=Math.floor(.8*(e-60)/a)),document.getElementById("js_reward_inner")&&(document.getElementById("js_reward_inner").style.width=n*a+"px"),
m=function(){
return n;
},n;
}
e("biz_common/utils/string/html.js");
var l,p=e("appmsg/comment_utils.js"),w=e("pages/create_txv.js"),u=e("pages/video_ctrl.js"),g=e("biz_common/utils/url/parse.js"),h=e("biz_common/dom/class.js"),v=e("appmsg/img_copyright_tpl.html.js"),y=e("appmsg/appmsgext.js"),f=e("appmsg/share_tpl.html.js"),b=navigator.userAgent,j=-1!=b.indexOf("MicroMessenger"),k=(-1!=navigator.userAgent.indexOf("WindowsWechat"),
e("biz_common/dom/event.js")),x=(e("biz_wap/utils/ajax.js"),e("biz_common/dom/class.js")),I=e("biz_wap/jsapi/core.js"),E=e("biz_common/tmpl.js"),B=(e("biz_wap/utils/storage.js"),
e("appmsg/log.js")),z=(e("rt/appmsg/getappmsgext.rt.js"),e("a/a.js")),A=e("biz_wap/utils/mmversion.js"),N=[];
a(),_();
});define("biz_wap/ui/lazyload_img.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/dom/attr.js","biz_common/ui/imgonepx.js"],function(t){
"use strict";
function i(){
var t=this.images;
if(!t||t.length<=0)return!1;
var i=window.pageYOffset||document.documentElement.scrollTop,e=window.innerHeight||document.documentElement.clientHeight,o=this.offset||60,n=0;
if("wifi"==window.networkType){
var s={
bottom:1,
top:1
};
this.lazyloadHeightWhenWifi&&(s=this.lazyloadHeightWhenWifi()),o=Math.max(s.bottom*e,o),
n=Math.max(s.top*e,n);
}
for(var r=+new Date,c=[],d=this.sw,f=this,g=-1,u=0,p=t.length;p>u;u++)!function(t,i){
var s=t.el.getBoundingClientRect(),r=t.src;
if(r){
(r.match(/\:\/\/[^\/]+\/mmbiz\//)&&r.indexOf("wx_fmt=gif")>-1||r.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&g++;
var f=n,u=o;
(r.match(/\:\/\/[^\/]+\/mmbiz\//)&&r.indexOf("wx_fmt=gif")>-1||r.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&l&&(f=0,
u=60),!t.show&&(s.top<=0&&s.top+s.height+f>=0||s.top>0&&s.top<e+u)&&(i.inImgRead&&(s.top<=0&&s.top+s.height>=0||s.top>0&&s.top<e)&&i.inImgRead(r,networkType),
i.changeSrc&&(r=i.changeSrc(t.el,r,g)),t.el.onerror=function(){
var e=this;
!!i.onerror&&i.onerror(t.el.src,e);
},t.el.onload=function(){
var e=this;
if("data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="!=e.src){
var o=e.getAttribute("data-forceheight");
o?(e.removeAttribute("data-forceheight"),h(e,"height",o,"important")):h(e,"height","auto","important"),
e.getAttribute("_width")?h(e,"width",e.getAttribute("_width"),"important"):h(e,"width","auto","important"),
!!i.onload&&i.onload(t.el.src,e);
}
},m(t.el,"src",r),c.push(r),t.show=!0,h(t.el,"visibility","visible","important")),
a.isWp&&1*t.el.width>d&&(t.el.width=d);
}
}(t[u],f);
c.length>0&&this.detect&&this.detect({
time:r,
loadList:c,
scrollTop:i
});
}
function e(){
var t=document.getElementsByTagName("img"),e=[],o=this.container,n=this.attrKey||"data-src",a=o.offsetWidth,s=0,r=this.imgOccupied||!1,l=this.crossOrigin||!1;
o.currentStyle?s=o.currentStyle.width:"undefined"!=typeof getComputedStyle&&(s=getComputedStyle(o).width),
this.sw=1*s.replace("px","");
for(var d=0,f=t.length;f>d;d++){
var g=t.item(d),u=m(g,n),p=m(g,"src");
if(u&&!(p&&p.indexOf("data:image/gif;base64")<0)){
var w=100;
if(g.dataset&&g.dataset.ratio){
var A=1*g.dataset.ratio,b=1*g.dataset.w||a;
"number"==typeof A&&A>0?(b=a>=b?b:a,w=b*A,r||(g.style.width&&g.setAttribute("_width",g.style.width),
h(g,"width",b+"px","important"),h(g,"visibility","visible","important"),g.setAttribute("src",c))):h(g,"visibility","hidden","important");
}else h(g,"visibility","hidden","important");
r||h(g,"height",w+"px","important"),l&&-1==u.indexOf("mmsns.qpic.cn")&&!(u.match(/\:\/\/[^\/]+\/mmbiz\//)&&u.indexOf("wx_fmt=gif")>-1||u.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&(g.crossOrigin="anonymous"),
e.push({
el:g,
src:u,
height:w,
show:!1
});
}
}
this.images=e,i.call(this);
}
function o(t){
if(this.__called_first_time)i.call(this,t),this.__called_first_time=!1;else if(!this.debounce){
this.debounce=!0;
var e=this;
setTimeout(function(){
i.call(e,t),e.debounce=!1;
},500);
}
}
function n(t){
s.on(window,"scroll",function(i){
o.call(t,i);
}),setTimeout(function(){
e.call(t,{});
},0),s.on(document,"touchmove",function(i){
o.call(t,i);
}),t.__called_first_time=!0,o.call(t,{});
}
var a=t("biz_wap/utils/mmversion.js"),s=t("biz_common/dom/event.js"),r=t("biz_common/dom/attr.js"),m=r.attr,h=r.setProperty,c=t("biz_common/ui/imgonepx.js"),l=!0;
return n;
});define("biz_common/log/jserr.js",[],function(){
function e(e,n){
return e?(r.replaceStr&&(e=e.replace(r.replaceStr,"")),n&&(e=e.substr(0,n)),encodeURIComponent(e.replace("\n",","))):"";
}
var r={};
return window.onerror=function(n,o,t,c,i){
return"Script error."==n||o?"undefined"==typeof r.key||"undefined"==typeof r.reporturl?!0:void setTimeout(function(){
c=c||window.event&&window.event.errorCharacter||0;
var l=[];
if(l.push("msg:"+e(n,100)),o&&(o=o.replace(/[^\,]*\/js\//g,"")),l.push("url:"+e(o,200)),
l.push("line:"+t),l.push("col:"+c),i&&i.stack)l.push("info:"+e(i.stack.toString(),200));else if(arguments.callee){
for(var s=[],u=arguments.callee.caller,a=3;u&&--a>0&&(s.push(u.toString()),u!==u.caller);)u=u.caller;
s=s.join(","),l.push("info:"+e(s,200));
}
var p=new Image;
if(p.src=(r.reporturl+"&key="+r.key+"&content="+l.join("||")).substr(0,1024),window.console&&window.console.log){
var f=l.join("\n");
try{
f=decodeURIComponent(f);
}catch(d){}
console.log(f);
}
},0):!0;
},function(e){
r=e;
};
});define("appmsg/share.js",["biz_common/utils/string/html.js","appmsg/cdn_img_lib.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","biz_wap/utils/mmversion.js","appmsg/appmsg_report.js","appmsg/malicious_wording.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function i(e,i){
var n="",t="";
try{
""!=tid&&(t="tid="+tid+"&aid=54");
var o=e.split("?")[1]||"";
if(o=o.split("#")[0],""==o);else{
var m=[o,"mpshare=1","scene="+i,"srcid="+srcid];
""!=t&&m.push(t),o=m.join("&"),n=e.split("?")[0]+"?"+o+"#"+(e.split("#")[1]||"");
}
}catch(s){
n="";
}
return n||(n=location.href+"#wechat_redirect",(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_47_1&lc=1&log0=[share_link]["+encodeURIComponent(location.href)+"]["+encodeURIComponent(e)+"]["+encodeURIComponent(msg_link)+"]"),
n;
}
function n(e,i,n){
s.shareReport({
link:e,
action_type:n
});
}
function t(e,i){
return e.isCDN()&&(e=o.addParam(e,"wxfrom",i,!0)),e;
}
e("biz_common/utils/string/html.js"),e("appmsg/cdn_img_lib.js");
var o=(e("biz_common/dom/event.js"),e("biz_common/utils/url/parse.js")),m=e("biz_wap/utils/mmversion.js"),s=e("appmsg/appmsg_report.js"),a=e("appmsg/malicious_wording.js"),c=(e("biz_wap/utils/ajax.js"),
e("biz_wap/jsapi/core.js"));
c.call("hideToolbar"),c.call("showOptionMenu");
var l=msg_title.htmlDecode(),r=(msg_source_url.htmlDecode(),""),u=cdn_url_1_1||msg_cdn_url||ori_head_img_url||round_head_img,_=u,p=msg_link.htmlDecode(),l=msg_title.htmlDecode(),g=msg_desc.htmlDecode();
g=g||"",g=g.replace(/<br\/>/g,"\n"),idx>1&&document.getElementById("js_content")&&1446652800>ct&&(g=document.getElementById("js_content").innerHTML.replace(/<\/?[^>]*\/?>/g,"").htmlDecode().replace(/^(\s*)|(\s*)$/g,"").substr(0,54)),
u.isCDN()&&(u=u.replace(/\/0$/,"/300"),u=u.replace(/\/0\?/,"/300?")),_.isCDN()&&(_=_.replace(/\/0$/,"/640"),
_=_.replace(/\/0\?/,"/640?")),malicious_title_reason_id&&(l=a.maliciousTitleMap[malicious_content_type][malicious_title_reason_id]||l,
g=a.maliciousDescMap[malicious_content_type][malicious_title_reason_id]||g,1!=malicious_content_type&&(u="https://mmbiz.qlogo.cn/mmbiz_png/cVgP5bCElFiayFgbgEB9iaDt7hLicfz9RrXGM0LpaQ0TUic2gP7lbbqU3jCD8ibonicgIa3p99yjx1f1P26HChraeRUg/0?wx_fmt=png")),
"1"==is_limit_user&&c.call("hideOptionMenu"),window.is_temp_url&&c.invoke("hideMenuItems",{
menuList:["menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:facebook","menuItem:share:qzone","menuitem:share:weibo","menuItem:share:WeiboApp","menuItem:share:QZone","menuitem:facebook","menuItem:copyUrl","menuItem:share:email","menuitem:copy_url"]
},function(){}),c.on("menu:share:appmessage",function(e){
var o=1,m=t(u,"1");
e&&"favorite"==e.scene&&(o=24,m=t(u,"4")),1==malicious_content_type&&(m="https://mmbiz.qlogo.cn/mmbiz_png/cVgP5bCElFiayFgbgEB9iaDt7hLicfz9RrXGM0LpaQ0TUic2gP7lbbqU3jCD8ibonicgIa3p99yjx1f1P26HChraeRUg/0?wx_fmt=png"),
c.invoke("sendAppMessage",{
appid:r,
img_url:m,
img_width:"640",
img_height:"640",
link:i(p,o),
desc:g,
title:l
},function(){
n(p,fakeid,o);
});
}),c.on("menu:share:timeline",function(){
var e=u;
m.isIOS||(e=t(u,"2")),n(p,fakeid,2),c.invoke("shareTimeline",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(p,2),
desc:g,
title:l
},function(){});
});
c.on("menu:share:weiboApp",function(){
c.invoke("shareWeiboApp",{
img_url:u,
link:i(p,3),
title:l
},function(){
n(p,fakeid,3);
});
}),c.on("menu:share:facebook",function(){
n(p,fakeid,7),c.invoke("shareFB",{
img_url:_,
img_width:"640",
img_height:"640",
link:i(p,43),
desc:g,
title:l
},function(){});
}),c.on("menu:share:QZone",function(){
var e=t(u,"6");
n(p,fakeid,5),c.invoke("shareQZone",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(p,22),
desc:g,
title:l
},function(){});
}),c.on("menu:share:qq",function(){
var e=t(u,"7");
n(p,fakeid,5),c.invoke("shareQQ",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(p,23),
desc:g,
title:l
},function(){});
}),c.on("menu:share:email",function(){
n(p,fakeid,5),c.invoke("sendEmail",{
content:i(p,5),
title:l
},function(){});
}),c.on("onArticleReadingBtnClicked",function(e){
console.log("argv",e),location.href="https://mp.weixin.qq.com/mp/msgvoice?action=ttspage&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"#wechat_redirect";
}),1==window.show_msg_voice&&c.invoke("showMenuItems",{
menuList:["menuItem:readArticle"]
},function(e){
console.log("showMenuItems call",e);
}),c.on("sys:record",function(){
c.invoke("recordHistory",{
link:p,
title:l,
source:nickname,
img_url:u
},function(){});
});
});define("appmsg/cdn_img_lib.js",[],function(){
"use strict";
function t(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=gif")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_gif\//)&&-1==t.indexOf("/s640");
}
function i(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=png")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_png\//);
}
function n(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=jpg")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_jpg\//);
}
function r(t){
return t.indexOf("tp=webp")>-1;
}
function e(t){
return t.indexOf("tp=wxpic")>-1;
}
String.prototype.http2https=function(){
return this.replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qpic.cn/");
},String.prototype.https2http=function(){
var t=this.replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/");
return t=t.replace(/https:\/\/mmbiz\.qpic\.cn\//g,"http://mmbiz.qpic.cn/");
},String.prototype.isCDN=function(){
return 0==this.indexOf("http://mmbiz.qpic.cn/")||0==this.indexOf("https://mmbiz.qpic.cn/")||0==this.indexOf("https://mmbiz.qlogo.cn/")||0==this.indexOf("http://res.wx.qq.com/")||0==this.indexOf("https://res.wx.qq.com/");
},String.prototype.nogif=function(){
var i=this.toString();
return t(i)?i.replace(/\/\d+\?/g,"/s640?").replace(/\/\d+\//g,"/s640/").replace(/\/\d+\./g,"/s640.").replace("wx_fmt=gif",""):i;
},String.prototype.isGif=function(){
var i=this.toString();
return t(i);
},String.prototype.isWxpic=function(){
var t=this.toString();
return e(t);
},String.prototype.isWebp=function(){
var t=this.toString();
return r(t);
},String.prototype.canHevc=function(){
var r=this.toString();
return n(r)||i(r)||t(r);
},String.prototype.getImgType=function(){
var p=this.toString();
return t(p)?"gif":r(p)?"webp":e(p)?"wxpic":i(p)?"png":n(p)?"jpg":"unknow";
},String.prototype.getOriginImgType=function(){
var r=this.toString();
return t(r)?"gif":i(r)?"png":n(r)?"jpg":"unknow";
},String.prototype.imgChange640=function(){
var t=this.toString();
t=t.replace(/(\?tp=webp)|(\?tp=wxpic)|(&tp=webp)|(&tp=wxpic)/g,"");
var i=new Date;
return i.setFullYear(2014,9,1),t.isCDN()&&1e3*ct>=i.getTime()&&!t.isGif()&&(t=t.replace(/\/0$/,"/640"),
t=t.replace(/\/0\?/,"/640?"),t=t.replace(/\/0\./,"/640.")),t;
};
});define("appmsg/finance_communicate.js",[],function(){
"use strict";
function e(t){
if(!t.childNodes||0===t.childNodes.length)return[];
var a=[],n=t.childNodes;
if(/MSIE(6|7|8)/i.test(navigator.userAgent))for(var i=0;i<n.length;i++)1===n[i].nodeType&&a.push(n[i]);else a=Array.prototype.slice.call(t.children);
for(var s=[],o=0;o<a.length;o++)s=s.concat(e(a[o]));
return a.concat(s);
}
function t(e){
var t=getComputedStyle(s);
window.parent.postMessage({
name:e,
data:parseFloat(t.height)-(n.offsetTop-i.offsetTop)
},"http://finance.qq.com");
}
function a(e){
console.log("[IFRAME RECEIVE MESSAGE]: ",e);
var a;
if(e.origin?a=e.origin:e.originalEvent&&(a=e.originalEvent.origin),/^http(s)?\:\/\/finance\.qq\.com$/.test(a)&&e.source){
var n=e.data,i=(document.getElementsByTagName("body")[0],document.getElementById("activity-name")),s=document.getElementById("meta_content"),o=document.getElementById("page-content");
if("setFontSize"===n.name){
for(var l=0;l<r.length;l++)r[l].style.cssText+=";font-size:"+n.data+"!important;";
t("updatePageHeight");
}else if("setFontColor"===n.name)for(var l=0;l<r.length;l++)r[l].style.cssText+=";color:"+n.data+"!important;";else if("setFontLineHeight"===n.name){
for(var l=0;l<r.length;l++)r[l].style.cssText+=";line-height:"+n.data+"!important;";
t("updatePageHeight");
}else if("setFontFamily"===n.name){
for(var l=0;l<r.length;l++)r[l].style.cssText+=";font-family:"+n.data+"!important;";
t("updatePageHeight");
}else if("setPagePadding"===n.name)o.style.cssText+=";padding:"+n.data+";",t("updatePageHeight");else if("setPageBackground"===n.name)o.style.cssText+=";background:"+n.data+";";else if("setTitleHide"===n.name)n.data?(i.style.display="none",
s.style.display="none"):(i.style.display="",s.style.display="");else if("setTextAlign"===n.name)for(var l=0;l<r.length;l++)r[l].style.cssText+=";text-align:"+n.data+"!important;";else if("setParagraphMinHeight"===n.name){
for(var l=0;l<r.length;l++)"p"===r[l].tagName.toLowerCase()&&(r[l].style.cssText+=";min-height:"+n.data+"!important;");
t("updatePageHeight");
}else if("setParagraphMargin"===n.name){
for(var l=0;l<r.length;l++)"p"===r[l].tagName.toLowerCase()&&(r[l].style.cssText+=";margin:"+n.data+"!important;");
t("updatePageHeight");
}else if("setImageWidth"===n.name){
for(var l=0;l<r.length;l++)"img"===r[l].tagName.toLowerCase()&&(r[l].style.cssText+=";width:"+n.data+"!important;");
t("updatePageHeight");
}else if("setTextIndent"===n.name){
for(var l=0;l<r.length;l++)r[l].style.cssText+=";text-indent:"+n.data+"!important;";
t("updatePageHeight");
}
}
}
if(window.parent===window)return!1;
var n=document.getElementById("js_content"),i=document.getElementById("img-content"),s=document.getElementById("js_article"),o=document.getElementsByClassName("rich_media_area_extra")[0];
o.style.display="none";
var r=e(n);
t("pageHeight"),window.addEventListener("message",a,!1);
});;define('page/appmsg_new/not_in_mm.css', [], function(require, exports, module) {
	return ".not_in_mm .rich_media_meta_list{position:relative;z-index:1}.not_in_mm .rich_media_content{position:relative}.not_in_mm .profile_container{width:535px;position:absolute;top:100%;left:0;margin-top:10px;font-size:14px;*margin-top:10px}.not_in_mm .profile_inner{position:relative;padding:30px 22px 36px 144px;background-color:#fff;border:1px solid #d9dadc;*zoom:1}.not_in_mm .profile_arrow_wrp{position:absolute;left:22px;top:-8px}.not_in_mm .profile_arrow{display:inline-block;width:0;height:0;border-width:8px;border-style:dashed;border-color:transparent;border-top-width:0;border-bottom-color:#d9dadc;border-bottom-style:solid;position:absolute;top:0}.not_in_mm .profile_arrow.arrow_in{margin-top:1px;border-bottom-color:#fff}.not_in_mm .profile_avatar{position:absolute;width:100px;left:24px;top:24px;height:100px!important}.not_in_mm .profile_nickname{font-size:16px;font-weight:400}.not_in_mm .profile_meta{margin-top:5px;overflow:hidden;*zoom:1}.not_in_mm .profile_meta_label{float:left;width:4em;margin-right:1em}.not_in_mm .profile_meta_value{display:block;overflow:hidden;*zoom:1;color:#adadad}.not_in_mm .icon_verify{width:16px;height:16px;vertical-align:middle;display:inline-block;line-height:9em;overflow:hidden}.not_in_mm .icon_verify.success{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/wxverify\/icon_verify_success238f07.png) no-repeat 0 0}.not_in_mm .rich_media_inner{position:relative}.not_in_mm .qr_code_pc_outer{display:none!important;position:fixed;left:0;right:0;top:20px;color:#717375;text-align:center}.not_in_mm .qr_code_pc_inner{position:relative;width:740px;margin-left:auto;margin-right:auto}.not_in_mm .qr_code_pc{position:absolute;right:-140px;top:0;width:140px;padding:16px;border:1px solid #d9dadc;background-color:#fff;word-wrap:break-word;word-break:break-all}.not_in_mm .qr_code_pc p{font-size:14px;line-height:20px}.not_in_mm .qr_code_pc_img{width:102px;height:102px}@media screen and (min-width:1024px){.not_in_mm .qr_code_pc_outer{display:block!important;top:32px}}.not_in_mm .qr_code_pc{-webkit-box-sizing:border-box;box-sizing:border-box}";
});