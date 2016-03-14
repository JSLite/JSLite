import { JSLite, version } from './global/var.js';
import { trimRE } from './global/regexp.js';
import init from './core/init.js';
import { isArrayLike, type, isDocument, isWindow, isFunction, isObject, isPlainObject, isString, inArray
 } from './core/validator'

JSLite.fn = JSLite.prototype = {
    jslite:version,
    init:init
}

//给init函数后实例化JSLite原型
JSLite.fn.init.prototype = JSLite.prototype;

// 把对象合并为参数。
// 对于一个深度的扩展，将第一个参数设置为“真”。
JSLite.extend = JSLite.fn.extend = function() {
    var options,
        // 常见用法 JSLite.extend( obj1, obj2 )，此时，target为arguments[0]
        target = arguments[0] || {},    
        i = 1,
        length = arguments.length,
        deep = false;

    // 检查是否有深度合并
    // 如果第一个参数为true，即 JSLite.extend( true, obj1, obj2 ); 的情况
    if ( typeof target === "boolean" ) {    
        // 此时target是true
        deep = target;  
        // target改为 obj1
        target = arguments[1] || {};    
        // 跳过 boolean 和 extended
        i = 2;
    }

    // 当目标是一个字符串或某个东西（可能在深拷贝）处理的情况下
    // 处理奇怪的情况，比如 JSLite.extend( 'hello' , {name: 'kkk'})
    if ( isObject(target) && !isFunction(target) ) {
        target = {};
    }

    // 处理这种情况 JSLite.extend(obj)，或 JSLite.fn.extend( obj )
    if ( length === i ) {  
        target = this;  
        // JSLite.extend时，this指的是JSLite；JSLite.fn.extend时，this指的是JSLite.fn
        --i;
    }

    for ( ; i < length; i++ ) {
        // 只有处理非空/未定义的值
        if ( (options = arguments[ i ]) != null ) { 
            // 比如 JSLite.extend( obj1, obj2, obj3, ojb4 )，
            // options则为 obj2、obj3...
            // 扩展基对象
            for ( var prop in options ) {
                if ( Object.prototype.hasOwnProperty.call( options, prop ) ) {
                    // 如果深度合并和属性是对象，合并属性
                    if ( deep && isPlainObject(target)) {
                        target[prop] = extend( true, target[prop], options[prop] );
                    } else {
                        target[prop] = options[prop];
                    }
                }
            }
        }
    }

    // 返回修改过的对象
    return target;
}


JSLite.extend({
    isArray:Array.isArray,
    isString:isString,
    isFunction:isFunction,
    isDocument:isDocument,
    isWindow:isWindow,
    isPlainObject:isPlainObject,
    isObject:isObject,
    inArray:inArray,
    type:type,
    trim:(text) => text == null ? "" : ( text + "" ).replace( trimRE, "" ),
    each:function(elements, callback) {
        if (isArrayLike(elements)) {
            for (let i = 0; i < elements.length; i++) {
                if (callback.call(elements[i], i, elements[i]) === false) {
                    return elements;
                }
            }
        } else {
            for (let key in elements) {
                if (callback.call(elements[key], key, elements[key]) === false) {
                    return elements;
                }
            }
        }
        return elements;
    },
    // 合并两个数组内容到第一个数组。
    // 只做合并，不过滤
    merge: function( first, second ) {
        var i = first.length;
        for (let j =0 ; j < +second.length; j++ ) {
            first[ i++ ] = second[ j ];
        }
        first.length = i;
        return first;
    }
})

JSLite.fn.extend({
    each: function(callback ){ return JSLite.each(this,callback);},
    eq: function(idx){return idx === -1 ? JSLite(this.slice(idx)) : JSLite(this.slice(idx, + idx + 1))},
    ready: function(callback){
        if (/complete|loaded|interactive/.test(document.readyState) && document.body) callback(JSLite)
        else document.addEventListener('DOMContentLoaded', function(){callback(JSLite) }, false)
        return this
    }
})


export default JSLite;