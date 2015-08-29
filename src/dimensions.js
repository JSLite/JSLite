JSLite.fn.extend({
    offset:function(){
        if(this.length==0) return null;
        var obj = this[0].getBoundingClientRect();
        return {
            left: obj.left + window.pageXOffset,
            top: obj.top + window.pageYOffset,
            width: obj.width,
            height: obj.height
        };
    },
    scrollTop: function(value){
        if (!this.length) return;
        var hasScrollTop = 'scrollTop' in this[0];
        if (value === undefined){
            return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset;
        };
        return this.each(hasScrollTop ? function(){
            this.scrollTop = value;
        } : function(){
            this.scrollTo(this.scrollX, value);
        })
    },
    scrollLeft: function(value){
        if (!this.length) return;
        var hasScrollLeft = 'scrollLeft' in this[0];
        if (value === undefined){
            return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset;
        };
        return this.each(hasScrollLeft ?function(){
            this.scrollLeft = value;
        } : function(){
            this.scrollTo(value, this.scrollY);
        })
    }
});
;['width', 'height'].forEach(function(dimension){
    var dimensionProperty = dimension.replace(/./,dimension[0].toUpperCase())
    JSLite.fn[dimension]=function(value){
        var offset, el = this[0]
        if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
        else return this.each(function(idx){
            el = $(this)
            el.css(dimension, funcArg(this, value, idx, el[dimension]()))
        })
    }
})