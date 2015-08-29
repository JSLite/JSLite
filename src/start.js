;(function (root, factory) {
    var JSLite = factory(root);
    if ( typeof define === 'function' && define.amd) {
        // AMD
        define('JSLite', function() {
            return JSLite;
        });
    } else if ( typeof exports === 'object') {
        // Node.js
        module.exports = JSLite;
    } else {
        // Browser globals
        var _JSLite = root.JSLite;
        var _$ = root.$;
        JSLite.noConflict = function (deep) {
            if (deep && root.JSLite === JSLite) {
                root.JSLite = _JSLite;
            }

            if (root.$ === JSLite) {
                root.$ = _$;
            }

            return JSLite;
        };
        root.JSLite = JSLite;
        root.$ = JSLite;
    }
}(this, function (root, undefined) {
    "use strict";