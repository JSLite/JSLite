JSLite.fn.extend({
    hide:function(){ return this.css("display", "none")},
    show:function(){
        return this.each(function(){
            this.style.display == "none" && (this.style.display = '');
            var CurrentStyle = function(e){
                return e.currentStyle || document.defaultView.getComputedStyle(e, null);
            }
            function defaultDisplay(nodeName) {
                var elm=document.createElement(nodeName),display
                JSLite('body').append(JSLite(elm));
                display = CurrentStyle(elm)['display'];
                elm.parentNode.removeChild(elm)
                return display
            }
            if (CurrentStyle(this)['display']=='none') {
                this.style.display = defaultDisplay(this.nodeName)
            }
        })
    },
    toggle:function(setting){
        return this.each(function(){
            var el = JSLite(this);(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
        })
    }
});