import { singleTagRE, fragmentRE, tagExpanderRE} from './regexp'

var emptyArray = [];
var slice = emptyArray.slice;
var filter = emptyArray.filter;
var concat = emptyArray.concat;
var some = emptyArray.some;
var emptyObject = {};
var toString = emptyObject.toString;
var elementTypes = [1, 9, 11];
let version ="<@VERSION@>";

var class2type = {}

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
}

// 构造函数
// 通过实例init函数，每次都构建新的init实例对象，来分隔this，避免交互混淆
var JSLite = (selector, context) => new JSLite.prototype.init(selector, context);

// fragment
// 需要一个HTML字符串和一个可选的标签名
// 生成DOM节点从给定的HTML字符串节点。
// 生成的DOM节点作为一个数组返回。
function fragment(html, name) {
    var dom, container;
    if (singleTagRE.test(html)) dom = JSLite(document.createElement(RegExp.$1));
    if (!dom) {
        if (html.replace) {
            html = html.replace(tagExpanderRE, "<$1></$2>");
        }
        if (name === undefined) {
            name = fragmentRE.test(html) && RegExp.$1;
        }
        if (!(name in containers)) {
            name = '*';
        }
        container = containers[name];
        container.innerHTML = '' + html;
        console.log(slice.call(container.childNodes))
        // 取容器的子节点，这样就直接把字符串转成DOM节点了
        dom = JSLite.each(slice.call(container.childNodes), function() {
            container.removeChild(this);
        });
    }
    return dom;
}

export { JSLite, version, emptyArray, slice, filter, some, emptyObject, toString, elementTypes, fragment, class2type }