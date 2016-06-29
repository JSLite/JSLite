import { JSLite } from './global/var.js';
import { type, funcArg, fragment } from './core/validator.js';


['after','prepend','before','append'].forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2;
    JSLite.fn[operator] = function(){
        var argType, nodes = JSLite.map(arguments, function(arg) {
                argType = type(arg);
                if(argType=="function") arg = funcArg(this, arg);
                return argType == "object" || argType == "array" || arg == null ? arg : fragment(arg);
            }),parent,script,copyByClone = this.length > 1;
        if (nodes.length < 1) return this;
        return this.each(function(_, target){
            parent = inside ? target : target.parentNode;
            target = operatorIndex == 0 ? target.nextSibling :
                    operatorIndex == 1 ? target.firstChild :
                    operatorIndex == 2 ? target :
                    null;

            var parentInDocument = JSLite.contains(document.documentElement, parent);

            nodes.forEach(function(node){
                var txt;
                if (copyByClone) node = node.cloneNode(true);
                parent.insertBefore(node, target);
                if(parentInDocument && node.nodeName != null && node.nodeName.toUpperCase() === 'SCRIPT' &&
                    (!node.type || node.type === 'text/javascript') && !node.src) txt=node.innerHTML;
                else if(parentInDocument &&node.children && node.children.length>0&&JSLite(node)&&(script=JSLite(node).find("script")))
                    if(script.length>0) script.each(function(_,item){
                        txt=item.innerHTML;
                    });
                txt?window['eval'].call(window, txt):undefined;
            });
        });
    };
    JSLite.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
        JSLite(html)[operator](this);
        return this;
    };
});
