(function(window, undefined) {
	"use strict";
	var ess,emptyArray = [],slice = emptyArray.slice,
		WCJ = (function(){
		var WCJ = function( selector ) {
		    return new WCJ.fn.init(selector);
		};
		WCJ.fn = WCJ.prototype = {
			init:function( selector ){
				var dom = (function(){
			        var found;
			        return (document && /^#([\w-]+)$/.test(selector))?
			        ((found = document.getElementById(RegExp.$1)) ? [found] : emptyArray ):
				    slice.call(
					    /^\.([\w-]+)$/.test(selector) ? document.getElementsByClassName(RegExp.$1) :
					    /^[\w-]+$/.test(selector) ? document.getElementsByTagName(selector) :
					    document.querySelectorAll(selector)
				    );
				})();
				dom = dom || emptyArray;
				dom.__proto__ = WCJ.fn.init.prototype;
				dom.selector = selector || '';
				return dom;
			}
		}
		WCJ.fn.init.prototype = WCJ.fn;
		return WCJ;
	})();
	window.WCJ = window.$$ = WCJ;
})(window);