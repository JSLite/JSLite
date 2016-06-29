import { JSLite } from './global/var.js';
import { dasherize, camelCase } from './core/validator.js';

export default function(property, value){
    var elem = this[0];
    if(arguments.length < 2){
        if (!elem) return [];
        if(!value && typeof property == 'string') return elem.style[property];
        if(JSLite.isArray(property)){
            var props = {};
            JSLite.each(property, function(_, prop){
                props[prop] = elem.style[camelCase(prop)];
            });
            return props;
        }
    }

    var css={},k;
    if (typeof property == 'string') {
        //当value的值为非零的 空不存在，删掉property样式
        if (!value && value !== 0) this.each(function(){ this.style.removeProperty(dasherize(property)); });
        else css[dasherize(property)] = value;
    } else {
        for(k in property){
            if(!property[k] && property[k] !== 0){
                this.each(function(){ this.style.removeProperty(dasherize(k)); });
            }else{
                css[dasherize(k)] = property[k];
            }
        } 
    }
    // 设置样式
    return this.each(function(){ for(var a in css) this.style[a] = css[a];});

}