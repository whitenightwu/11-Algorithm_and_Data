(function () {

	if (!window.$) {
		console.warn('qcmain::loader:\n\tjquery don\'t be loaded first!');
		return;
	}

	var NAV_TYPE = {
		leftnav: 'leftnav',
		topnav_firstlevel: 'topnav_firstlevel',
	};

	var NAV_METADATA = {};
	NAV_METADATA[NAV_TYPE.leftnav] = {
			selector: '#qcLeftNavSwitcher',
			dataJs: "//main.qcloudimg.com/scripts/qccomponents/leftnav.65c7532f5939f8ff31c7a25e901434e2.js",
	};
	NAV_METADATA[NAV_TYPE.topnav_firstlevel] = {
			selector: '#qcTopNavFstLevel',
	};

	var availableNavs = [NAV_TYPE.leftnav, NAV_TYPE.topnav_firstlevel].filter(function (nav) {
		return $(NAV_METADATA[nav].selector).length > 0;
	});

	if(availableNavs.length === 0){
		return;
	}

	var shouldLoadDataJsNavs = availableNavs.filter(function (nav) {
		return !!NAV_METADATA[nav].dataJs;
	});

	var COMPLETED = 1 + shouldLoadDataJsNavs.length;
	var step = 0;

	function loadScript (src, callback) {
		var script = document.createElement('script');
		script.onerror = function (error) { callback(error, null); };
		script.onload = function () { callback(null, null); };
		script.src = src;
		document.head.appendChild(script);
	}

	function loadScriptCallback (error) {
		step++;
		if (error) {
			return;
		}
		if (step === COMPLETED && window.QCComponent) {
			window.QCComponent.init();
		}
	}

	shouldLoadDataJsNavs.forEach(function (nav) {
		loadScript(NAV_METADATA[nav].dataJs,loadScriptCallback)
	});

	var logicalScript = "//imgcache.qq.com/qcloud/main/scripts/release/qccomponent/index.fae2fa40478eb16b7920.js?max_age=31536000";
	loadScript(logicalScript, loadScriptCallback);
})();
