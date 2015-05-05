//修复IE，增加方法getComputedStyle为对象的窗口和getPropertyValue方法的对象，它返回的getComputedStyle
if (window&&!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}
//IE浏览器对filter方法的支持
if (!Array.prototype.filter){
    Array.prototype.filter = function(fun /*, thisArg */){
        "use strict";
        if (this === void 0 || this === null)
            throw new TypeError();
        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
            throw new TypeError();
        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++){
            if (i in t){
                var val = t[i];
                if (fun.call(thisArg, val, i, t))
                res.push(val);
            }
        }
        return res;
    };
}
//IE对indexOf方法的支持
if(!Array.indexOf){
    Array.prototype.indexOf = function(obj){              
        for(var i=0; i<this.length; i++){
            if(this[i]==obj) return i;
        }
        return -1;
    }
}
//IE对forEach方法的支持
if (!Array.prototype.forEach) {  
    Array.prototype.forEach = function(fun /*, thisp*/){  
        var len = this.length;  
        if (typeof fun != "function")  
            throw new TypeError();  
        var thisp = arguments[1];  
        for (var i = 0; i < len; i++){  
            if (i in this)  
                fun.call(thisp, this[i], i, this);  
        }  
    }
}
//删除数组 元素
if (!Array.prototype.remove){
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        return index > -1 && this.splice(index, 1), this;
    } 
}