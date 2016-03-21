import { JSLite, propMap } from './global/var.js';
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
    }
})