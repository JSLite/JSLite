JSLite.fn.extend({
    css:function(property, value){
        if (!this[0]) return [];
        var computedStyle = getComputedStyle(this[0], '')
        if(value === undefined && typeof property == 'string') return computedStyle.getPropertyValue(property);
        var css="",k;
        for(k in property) css += k+':'+property[k]+';';
        if(typeof property == 'string') css = property+":"+value;
        return this.each(function(el){
            css ? this.style.cssText += ';' + css :"";
        });
    },
    hasClass:function(name){
        if (!name) return false
        return emptyArray.some.call(this, function(el){
            return this.test(el.className)
        }, new RegExp('(^|\\s)' + name + '(\\s|$)'));
    },
    addClass:function(name){
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
    removeClass:function(name){
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
    toggleClass:function(name){
        if(!name) return this;
        return this.each(function(idx){
            var w=JSLite(this),names=funcArg(this, name);
            names.split(/\s+/g).forEach(function(cls){
                w.hasClass(cls)?w.removeClass(cls):w.addClass(cls);
            })
        })
    }
});