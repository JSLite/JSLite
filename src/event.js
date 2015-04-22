;(function($){
    var handlers = {},_jid = 1
    /* 绑定事件 start */
    $.fn.extend({
        bind: function(event, func) {return this.each(function(){add(this, event, func)})},
        unbind:function(event, func) {return this.each(function(){remove(this, event, func)})},
        on:function(event, selector, data, callback){
            var self = this
            if (event && !$.isString(event)) {
                $.each(event, function(type, fn){
                    self.on(type, selector, data, fn)
                })
                return self
            }
            if (!$.isString(selector) && !$.isFunction(callback) && callback !== false)
                callback = data, data = selector, selector = undefined
            if ($.isFunction(data) || data === false)
                callback = data, data = undefined
            if (callback === false) callback = function(){return false;}
            return this.each(function(){ 
                add(this, event, callback, data, selector) 
            })
        },
        off:function(event, selector, callback){
            var self = this
            if (event && !$.isString(event)) {
                $.each(event, function(type, fn){
                    self.off(type, selector, fn)
                })
                return self
            }
            if (!$.isString(selector) && !$.isFunction(callback) && callback !== false)
                callback = selector, selector = undefined
            if (callback === false) callback =  function(){return false;}
            return self.each(function(){
                remove(this, event, callback, selector)
            })
        },
        delegate: function(selector, event, callback){
            return this.on(event, selector, callback)
        },
        trigger:function(event, data){
            var type = event,specialEvents={}
            specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';
            if (typeof type == 'string') {
                event = document.createEvent(specialEvents[type] || 'Events');
                event.initEvent(type,true, true);
            }else return;
            event._data = data;
            return this.each(function(){
                if('dispatchEvent' in this) this.dispatchEvent(event);
            });
        }
    });
    $.event={add:add,remove:remove};
    function add(element, events, func, data, selector){
        var self=this,id=jid(element),set=(handlers[id] || (handlers[id] = []));
        events.split(/\s/).forEach(function(event){
            var handler = $.extend(parse(event), {fn: func,sel: selector, i: set.length});
            var proxyfn = handler.proxy = function (e) {
                //处理事件代理
                if (selector) {
                    var $temp = $(element).find(selector);
                    var res = some.call($temp, function(val) {
                        return val === e.target || $.contains(val, e.target);
                    });
                    //不包含
                    if (!res) {
                        return false;
                    }
                }
                e.data = data;
                var result = func.apply(element,e._data == undefined ? [e] : [e].concat(e._data));
                if (result === false) e.preventDefault(), e.stopPropagation();
                return result;
            };
            set.push(handler)
            if (element.addEventListener) element.addEventListener(handler.e,proxyfn, false);
        })
    }
    function remove(element, events, func, selector){
        ;(events || '').split(/\s/).forEach(function(event){
            $.event = parse(event)
            findHandlers(element, event, func, selector).forEach(function(handler){
                delete handlers[jid(element)][handler.i]
                if (element.removeEventListener) element.removeEventListener(handler.e, handler.proxy, false);
            })
        })
    }
    function jid(element) {return element._jid || (element._jid = _jid++)}
    function parse(event) {
        var parts = ('' + event).split('.');
        return {e: parts[0], ns: parts.slice(1).sort().join(' ')};
    }
    function findHandlers(element, event, func, selector){
        var self=this,id = jid(element);event = parse(event)
        return (handlers[jid(element)] || []).filter(function(handler) {
            return handler 
            && (!event.e  || handler.e == event.e) 
            && (!func || handler.fn.toString()===func.toString())
            && (!selector || handler.sel == selector);
        })
    }
    ;("blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error paste drop dragstart dragover " +
    "beforeunload").split(' ').forEach(function(event) {
        $.fn[event] = function(callback) {
            return callback ? this.bind(event, callback) : this.trigger(event);
        }
    });
    /* 绑定事件 end */
})(JSLite);