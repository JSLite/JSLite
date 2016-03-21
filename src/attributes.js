import { JSLite, propMap, emptyArray } from './global/var.js';
import { isObject, funcArg } from './core/validator.js';

JSLite.fn.extend({
    // 设置或返回被选元素的属性值。
    attr(name,value){
        var result,k;
        return (typeof name == 'string' && !(1 in arguments)) ?
            (!this.length || this[0].nodeType !== 1 ? undefined :
                (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
            ) : this.each(function(n){
                if (isObject(name)) for(k in name) this.setAttribute(k, name[k]);
                else this.setAttribute(name,funcArg(this, value));
            });
    },
    // 从每一个匹配的元素中删除一个属性
    removeAttr(name){
        return this.each(function(){ this.nodeType === 1 && this.removeAttribute(name)});
    },
    // 获取在匹配的元素集中的第一个元素的属性值。
    prop(name, value){
        name = propMap[name] || name
        return (1 in arguments) ? this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        }) :(this[0] && this[0][name])
    },
    // 用来删除由.prop()方法设置的属性集
    removeProp(name) {
        name = propMap[name] || name;
        return this.each(function() {
            // 在IE中处理window属性可能报错
            try {
                this[name] = undefined;
                delete this[name];
            } catch(e) {}
        });
    },
    // 为每个匹配的元素添加指定的样式类名
    addClass(name){
        if (!name) return this;
        var classList,cls,newName;
        return this.each(function(idx){
            classList=[],cls = this.className,newName=funcArg(this, name).trim();
            newName.split(/\s+/).forEach(function(k){
                if (!JSLite(this).hasClass(k)) classList.push(k);
            },this);
            if (!newName) return this;
            classList.length ? this.className = cls + (cls ? " " : "") + classList.join(" "):null;
        })
    },
    // 确定任何一个匹配元素是否有被分配给定的（样式）类。
    hasClass(name){
        if (!name) return false
        return emptyArray.some.call(this, function(el){
            return (' ' + el.className + ' ').indexOf(this) > -1
        }, ' ' + name + ' ');
    },
    // 为集合中匹配的元素删除一个属性
    removeClass(name){
        var cls;
        if (name === undefined) return this.removeAttr('class');
        return this.each(function(idx){
            cls = this.className;
            funcArg(this, name, idx, cls).split(/\s+/).forEach(function(k){
                cls=cls.replace(new RegExp('(^|\\s)'+k+'(\\s|$)')," ").trim();
            },this);
            cls?this.className = cls:this.className = "";
        })
    },
    // 在匹配的节点对象集合中的每个节点对象上添加或删除一个或多个样式类。
    toggleClass(name){
        if(!name) return this;
        return this.each(function(idx){
            var w=JSLite(this),names=funcArg(this, name);
            names.split(/\s+/g).forEach(function(cls){
                w.hasClass(cls)?w.removeClass(cls):w.addClass(cls);
            })
        })
    },
    // 获取对象集合中每一个元素的属性值。
    pluck(property){ return JSLite.map(this, function(el){ return el[property] })}
})