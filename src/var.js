var emptyArray = [];
var slice = emptyArray.slice;
var filter = emptyArray.filter;
var some = emptyArray.some;
var emptyObject = {};
var toString = emptyObject.toString;
var elementTypes = [1, 9, 11];
var P = {};
var propMap = {
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
var JSLite;

P = {
    singleTagRE: /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    fragmentRE: /^\s*<(\w+|!)[^>]*>/,
    tagExpanderRE: /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    table: document.createElement('table'),
    tableRow: document.createElement('tr'),
    containers: {
        '*': document.createElement('div'),
        'tr': document.createElement('tbody'),
        'tbody': P.table,
        'thead': P.table,
        'tfoot': P.table,
        'td': P.tableRow,
        'th': P.tableRow
    }
};
