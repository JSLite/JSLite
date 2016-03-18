import { JSLite, version, slice, emptyArray } from './global/var.js';
import { trimRE } from './global/regexp.js';
import init from './core/init.js';
import { isArrayLike, type, isDocument, isWindow, isFunction, isObject, isPlainObject, isString, isEmptyObject, inArray, camelCase
 } from './core/validator';

JSLite.fn = JSLite.prototype = {
    jslite:version,
    init:init,
}

// 给init函数后实例化JSLite原型
// JSLite.fn.init.prototype = JSLite.prototype;

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
    isString,
    isFunction,
    isDocument,
    isWindow,
    isPlainObject,
    isObject,
    inArray, 
    isEmptyObject, 
    type,
    camelCase,
    trim(text){ return text == null ? "" : ( text + "" ).replace( trimRE, "" ) },
    each(elements, callback) {
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
    // 默认将一个数组循环，处理之后成返回一个新的数组
    map( elems, callback, arg ) {
        var value,i = 0,ret = [];
        // 如果是个数组，通过数组循环
        if ( isArrayLike( elems ) ) {
            for ( ; i < elems.length; i++ ) {
                value = callback( elems[ i ], i, arg );

                if ( value != null ) {
                    ret.push( value );
                }
            }
        // 如果是键值对，就通过键循环
        } else {
            for ( i in elems ) {
                value = callback( elems[ i ], i, arg );

                if ( value != null ) {
                    ret.push( value );
                }
            }
        }
        return emptyArray.concat.apply( [], ret );
    },
    // 使用过滤函数过滤数组元素。
    grep(elems, callback, invert){

        var callbackInverse,
            matches = [];
            invert = !invert;

        // 将循环到的值保存到 matches 数组中
        for (let i = 0; i < elems.length; i++ ) {
            // 返回 true 或者 false
            callbackInverse = !callback( elems[ i ], i ,invert);
            if ( callbackInverse !== invert ) {
                matches.push( elems[ i ] );
            }
        }

        return matches;

    },
    // 合并两个数组内容到第一个数组。
    // 只做合并，不过滤
    merge( first, second ) {
        var i = first.length;
        for (let j =0 ; j < +second.length; j++ ) {
            first[ i++ ] = second[ j ];
        }
        first.length = i;
        return first;
    },
    now: Date.now,
})

JSLite.fn.extend({
    forEach: emptyArray.forEach,
    concat: emptyArray.concat,
    indexOf: emptyArray.indexOf,
    toArray(){ return this.get() },
    each(callback ){ return JSLite.each(this,callback);},
    map(callback){
        return JSLite.map(this, function( elem, i ) {
            return callback.call( elem, i, elem );
        } )
    },
    slice(){
        return slice.apply( this, arguments )
    },
    get(num) {
        return num != null ?
            // 返回集合中的一个元素
            ( num < 0 ? this[ num + this.length ] : this[ num ] ) :
            // 如果num不存在返回所有元素的原始数组
            slice.call( this );
    },
    size(){return this.length;},
    eq(idx){return idx === -1 ? JSLite(this.slice(idx)) : JSLite(this.slice(idx, + idx + 1))},
    ready(callback){
        if (/complete|loaded|interactive/.test(document.readyState) && document.body) callback(JSLite)
        else document.addEventListener('DOMContentLoaded', function(){callback(JSLite) }, false)
        return this
    }
})

var _JSLite = window.JSLite,
    _$ = window.$;

// 放弃 JSLite 控制的$ 变量为 $ 符号冲突弄一个解决方法
JSLite.noConflict = ( deep ) => {
    if ( window.$ === JSLite ) {
        window.$ = _$;
    }

    if ( deep && window.JSLite === JSLite ) {
        window.JSLite = _JSLite;
    }

    return JSLite;
};


export default JSLite;