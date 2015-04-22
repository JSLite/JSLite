;(function($){
    $.fn.extend({
        serializeArray:function(){
            var result = [], el,type,elm=this.get(0);
            if(!elm || ! elm.elements) return result
            $([].slice.call(this.get(0).elements)).each(function(){
                el = $(this),type = el.attr('type')
                if (this.nodeName.toLowerCase() != 'fieldset' && !this.disabled && type != 'submit' && type != 'reset' && type != 'button' && ((type != 'radio' && type != 'checkbox') || this.checked)) {
                    result.push({name: el.attr('name'), value: el.val() }) 
                }
            });
            return result
        },
        serialize:function(result){
            result = [],this.serializeArray().forEach(function(elm){
              result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
            })
            return result.join('&')
        }
    });
})(JSLite);