function startmarquee(lh, speed, delay, index) {
	var t;
	var p = false;
	var o = $(index);
	o.innerHTML += o.innerHTML;
	o.onmouseover = function() {
		p = true
	}
	o.onmouseout = function() {
		p = false
	}
	if (o.scrollHeight != 0) {
		lh = Math.floor(o.scrollHeight / 4);
	}
	//alert(lh)
	o.scrollTop = 0;
	function start() {
		if (!p) o.scrollTop +=1;
		t = setInterval(scrolling, speed);		
	}
	function scrolling()
	 {
		if (o.scrollHeight != 0) {
			lh = Math.floor(o.scrollHeight / 4);
		};		
		if (o.scrollTop % lh != 0)
		 {
			o.scrollTop += 1;
			if (o.scrollTop >= lh * 2)
			 o.scrollTop = 0;
		}
		 else
		 {
			clearInterval(t);
			setTimeout(start, delay);
		}
	}	
	setTimeout(start, delay);
};
function $(id) {
	return document.getElementById(id);
}; 
startmarquee(20, 25, 5000, "scroll");
