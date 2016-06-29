import JSLite from "./core";
// import * as attributes from "./attributes";
import { 
    attr,
    removeAttr,
    prop,
    removeProp,
    addClass,
    hasClass,
    removeClass,
    toggleClass,
    pluck
} from "./attributes";

import css from "./css";
import * as manipulation from "./manipulation";

JSLite.fn.extend({
    css:css,
    attr:attr,
    removeAttr:removeAttr,
    prop:prop,
    removeProp:removeProp,
    addClass:addClass,
    hasClass:hasClass,
    removeClass:removeClass,
    toggleClass:toggleClass,
    pluck:pluck
});

window.JSLite = window.$ = JSLite;

export default JSLite;


