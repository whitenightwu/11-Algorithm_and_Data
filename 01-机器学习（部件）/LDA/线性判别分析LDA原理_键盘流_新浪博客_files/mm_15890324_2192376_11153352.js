(function(doc, w) {
    var pid = "mm_15890324_2192376_11153352"
    var saxlist = {
        "mm_15890324_2192376_11153352": "//sax.sina.com.cn/view?type=nonstd&t=REowMDAxMDc1MA%3D%3D"
    }
    var currentScript = doc.currentScript;
    if(!doc.getElementById('tanx-a-'+pid)){
        doc.body.appendChild((function(){
            var o = doc.createElement("a");
            o.style.display = "none";
            o.id = "tanx-a-"+pid;
            return o;
        })())
    }


    function sax(url) {
        if (!url) return;
        var img = new Image();
        w[Math.random().toString(16).substring(2)] = img;
        img.src = url;
    };

    if (!currentScript) {
        var scripts = doc.getElementsByTagName('script');
        currentScript = scripts[scripts.length - 1];
        for (var i = scripts.length - 1; i >= 0; i--) {
            var script = scripts[i];
            if (script.readyState === 'interactive') {
                currentScript = script;
            }
        }
    }


    // document.write('<a  style="display:none!important"  id="tanx-a-'+pid+'"></a>');
    var tanx_s = doc.createElement("script");
    tanx_s.type = "text/javascript";
    tanx_s.charset = "gbk";
    tanx_s.id = "tanx-s-" + pid;
    tanx_s.async = true;
    tanx_s.src = "https://phs.tanx.com/ex?i=" + pid + "&_t="+ +new Date();
    var tanx_h = doc.getElementsByTagName("head")[0];
    if (tanx_h) tanx_h.insertBefore(tanx_s, tanx_h.firstChild);

    sax(saxlist[pid]);
})(document, window);
