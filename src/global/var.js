let emptyArray = [];
let slice = [].slice;
let filter = [].filter;
let concat = [].concat;
let some = [].some;
let emptyObject = {};
let toString = emptyObject.toString;
let elementTypes = [1, 9, 11];
let version ="<@VERSION@>";

var class2type = {};

let table = document.createElement('table');
let tableRow = document.createElement('tr');
let containers = {
    '*': document.createElement('div'),
    'tr': document.createElement('tbody'),
    'tbody': table,
    'thead': table,
    'tfoot': table,
    'td': tableRow,
    'th': tableRow
};
let propMap = {
    'tabindex': 'tabIndex',
    'readonly': 'readOnly',
    'for': 'htmlFor',
    'class': 'className',
    'maxlength': 'maxLength',
    'cellspacing': 'cellSpacing',
    'cellpadding': 'cellPadding',
    'rowspan': 'rowSpan',
    'colspan': 'colSpan',
    'usemap': 'useMap',
    'frameborder': 'frameBorder',
    'contenteditable': 'contentEditable'
};

// 构造函数
// 通过实例init函数，每次都构建新的init实例对象，来分隔this，避免交互混淆
var JSLite = (selector, context) => new JSLite.prototype.init(selector, context);


export { JSLite, version, emptyArray, slice, filter, concat, some, emptyObject, toString, elementTypes, class2type, containers, propMap };