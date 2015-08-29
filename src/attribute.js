JSLite.fn.extend({
    pluck: function(property){ return JSLite.map(this, function(el){ return el[property] })},
    prop: function(name, value){
        name = propMap[name] || name
        return (1 in arguments) ? this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        }) :(this[0] && this[0][name])
    },
    removeProp: function(name) {
        name = propMap[name] || name;
        return this.each(function() {
            // 在IE中处理window属性可能报错
            try {
                this[name] = undefined;
                delete this[name];
            } catch(e) {}
        });
    },
    attr: function(name,value){
        var result,k;
        return (typeof name == 'string' && !(1 in arguments)) ?
            (!this.length || this[0].nodeType !== 1 ? undefined :
                (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
            ) : this.each(function(n){
                if (isObject(name)) for(k in name) this.setAttribute(k, name[k]);
                else this.setAttribute(name,funcArg(this, value));
            });
    },
    removeAttr:function(name){
        return this.each(function(){ this.nodeType === 1 && this.removeAttribute(name)});
    },
    val:function(value){
        return 0 in arguments ?
        this.each(function(idx){this.value = funcArg(this, value, idx, this.value)}) :
        (this[0] && (this[0].multiple ?
            JSLite(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
            this[0].value))
    },
    data: function(name, value){
        var attrName = 'data-' + name,data,a
        if(!name) return this[0].dataset;
        if(name&&isJson(name)){
            for(a in name) this.attr('data-' + a, name[a])
            return this
        }
        if(value&&(isArray(value) || isJson(value))) value = JSON.stringify(value);

        data = (1 in arguments) ? this.attr(attrName, value) : this.attr(attrName);
        try{data = JSON.parse(data);}catch(e){}
        return data;
    }
});