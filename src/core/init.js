import { JSLite, slice, emptyArray, elementTypes } from '../global/var.js';
import { fragmentRE, idRE, classRE, tagRE } from '../global/regexp';
import { type, fragment, isFunction } from './validator';

export default function(selector,context){
    var dom ;

    if (!selector) {
        //没有参数，返回空数组
        dom = emptyArray,
        dom.selector = selector || '',
        dom.__proto__ = JSLite.fn.init.prototype;
    } else if( type(selector) === 'string' 
        && (selector = selector.trim()) 
        && selector[0] == '<' && fragmentRE.test(selector) ){

            // 如果selector是一个 JSLite dome 实例，
            // 如果它是一个HTML片段，从它创建节点
        dom = fragment(selector, RegExp.$1, context),selector=null;
    } else if (isFunction(selector)) {
        //如果selector是个函数，则在DOM ready的时候执行它
        return JSLite(document).ready(selector);
    } else {
        if (JSLite.isArray(selector)) {
            dom = selector;
        } else if (type(selector) === 'object') {
            dom = [selector], selector = null;
        } else if (elementTypes.indexOf(selector.nodeType) >= 0 || selector === window) {
            dom = [selector], selector = null;
        } else {
            dom =(() => {
                var found;
                return (document && idRE.test(selector))?
                ( (found = document.getElementById(RegExp.$1)) ? [found] : [] ):
                slice.call(
                    classRE.test(selector) ? document.getElementsByClassName(RegExp.$1) :
                    tagRE.test(selector) ? document.getElementsByTagName(selector) :
                    document.querySelectorAll(selector)
                );
            })();
        }
    }
    dom = dom || emptyArray;
    JSLite.extend(dom, JSLite.fn);
    dom.selector = selector || '';
    return dom;
}