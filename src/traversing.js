JSLite.fn.extend({
    filter:function(selector){
        if (isFunction(selector)) return this.not(this.not(selector))
        return JSLite(filter.call(this, function(element){
            return JSLite.matches(element, selector)
        }))
    },
    not:function(selector){
        var nodes = [];
        if (isFunction(selector)&& selector.call !== undefined){
            this.each(function(idx){
                if (!selector.call(this,idx)) nodes.push(this);
            });
        }else {
            var excludes = typeof selector == 'string' ? this.filter(selector):
            (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : JSLite(selector)
            this.forEach(function(el){
                if (excludes.indexOf(el) < 0) nodes.push(el)
            })
        }
        return JSLite(nodes)
    },
    children:function(selector){
        var e=[];
        filter.call(this.pluck('children'), function(item, idx){
            JSLite.map(item,function(els){ if (els&&els.nodeType == 1) e.push(els) })
        });
        return JSLite(e).filter(selector || '*');
    },
    contents: function() {
        return this.map(function() { return this.contentDocument || slice.call(this.childNodes) })
    },
    parent: function(selector){return JSLite(JSLite.unique(this.pluck('parentNode'))).filter(selector||'*')},
    parents: function(selector){
        var ancestors=JSLite.sibling(this,'parentNode');
        return selector == null ? JSLite(ancestors) : JSLite(ancestors).filter(selector);
    },
    closest: function(selector, context){
        var node = this[0], collection = false
        if (typeof selector == 'object') collection = JSLite(selector)
        while (node && !(collection ? collection.indexOf(node) >= 0 : JSLite.matches(node, selector)))
            node = node !== context && !isDocument(node) && node.parentNode
        return JSLite(node)
    },
    prev: function(selector){
        return JSLite(this.pluck('previousElementSibling')).filter(selector || '*')
    },
    next: function(selector){
        return JSLite(this.pluck('nextElementSibling')).filter(selector || '*')
    },
    nextAll: function (selector) {
        return JSLite(JSLite.sibling(this,'nextElementSibling')).filter(selector || '*');
    },
    prevAll: function (selector) {
        return JSLite(JSLite.sibling(this,'previousElementSibling')).filter(selector || '*');
    },
    siblings: function(selector){
        var n=[];this.map(function(i,el){
            filter.call(el.parentNode.children, function(els, idx){
                 if (els&&els.nodeType == 1&&els!=el) n.push(els)
            });
        })
        return JSLite(n).filter(selector || '*');
    },
    find: function(selector){
        var nodes = this.children(),ancestors=[];
        while (nodes.length > 0)
        nodes=JSLite.map(nodes, function(node,inx){
            if (ancestors.indexOf(node)<0) ancestors.push(node);
            if ((nodes = JSLite(node).children())&&nodes.length>0 ) return nodes;
        });
        return JSLite(ancestors).filter(selector || '*');
    }
});