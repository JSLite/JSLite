JSLite
---

**如有疑问欢迎到这些地方交流，欢迎加入JSLite.io组织团伙共同开发！**   

[![](https://img.shields.io/github/issues/JSLite/JSLite.svg)](https://github.com/JSLite/JSLite/issues)  [![](https://img.shields.io/github/forks/JSLite/JSLite.svg)](https://github.com/JSLite/JSLite/network) [![](https://img.shields.io/github/stars/JSLite/JSLite.svg)](https://github.com/JSLite/JSLite/stargazers) [![](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/JSLite/JSLite/master/MIT-LICENSE) [![](https://travis-ci.org/JSLite/JSLite.svg?branch=master)](https://travis-ci.org/JSLite/JSLite)


QQ交流群：397463673   
[segmentfault社区](http://segmentfault.com/t/jslite/blogs) | [官方网站](http://jslite.io) | [官方文档-更详细](http://jslite.io/API/) | [Issues](https://github.com/JSLite/JSLite/issues)  

> 1. jQuery 的目标是兼容所有主流浏览器，这就意味着它的大量代码对移动端的浏览器是无用或者低效的。
> 2. 而 JSLite 只针对先进浏览器(支持HTML5,CSS3)、移动端浏览器编写，使用js新方法实现jQuery API，因此体积更小、效率更高.
> 3. 更重要的是，JSLite 的 API 完全仿照 jQuery ，所以学习成本也很低。
> 4. JSLite与jQuery有着绝大部分类似的api，通用库只有5-10k，手机上每一kb都是钱。
> 5. 让web开发更迅速，下载执行更快、量级更轻，针对现代高级浏览器的JavaScript库。 推进前端开发标准对于攻城师来说，人人有责。

## 浏览器兼容
此兼容，是根据我使用的一些js方法函数的支持情况来判断的。设备过少，部分是根据[developer.mozilla.org](https://developer.mozilla.org)的方法函数兼容数据来判断的，下面的我们的主要兼容目标

> Safari 6+ (Mac)  
> Chrome 30+ (Windows, Mac, Android, iOS, Linux, Chrome OS)  
> Firefox 24+ (Windows, Mac, Android, Linux, Firefox OS)  
> iOS 5+ Safari
> Android 2.3+ Browser  
> Internet Explorer 10+ (Windows, Windows Phone)  


## 安装

### npm 

```
$ npm install jslite
```

[![](https://nodei.co/npm/jslite.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/jslite/)

### 传统方法
1. 去[官网下载](http://jslite.io)JSLite，[github download](https://github.com/JSLite/JSLite)  
2. 页面Head标签内引用 JSLite.js  

```html
<script type="text/javascript" src="JSLite.js"></script>
```

## 核心

### $()
> 选择器使用的是浏览器自带的方法的 `document.querySelectorAll` 接口，支持标准的 CSS 选择器，没有使用jQuery作者John Resig开发的DOM选择器引擎(Dom Selector Engine) `Sizzle` 。
> 目前 IE8/9及Firefox/Chrome/Safari/Opera 的最新版已经支持 `querySelectorAll` 。  
>    
> `$(selector)`                 //⇒ 选择节点  
> `$("<DOM nodes>") `           //⇒ 生成节点  
> `$("htmlString")`             //⇒ 生成  
> `JSLite(function($){ ... })`  //⇒ 相当于ready

```js
$("#box") //⇒ 返回节点数组  //⇒ [<div>​…​</div>​]
$("<div></div>") //⇒ 生成div节点
//JSLite(func) 相当于ready
JSLite(function($){
    console.log("在节点加载完成之后执行")
})
//$(func) 相当于ready
$(function($){
    console.log("在节点加载完成之后执行")
})
```

### JSLite()
> 与`$()`相同。

### noConflict
`noConflict()` 方法让渡变量 $ 的 `JSLite` 控制权，解决俩库之间的$冲突。  
该方法释放 `JSLite` 对 `$` 变量的控制。  
该方法也可用于为 `JSLite` 变量规定新的自定义名称。  

#### 常规

```js
$.noConflict();
JSLite(document).ready(function($) {
// 使用 JSLite $ 的代码
});
// 使用其他库的 $ 的代码
```

#### 映射回原始的对象
将 `$` 引用的对象映射回原始的对象：

```js
JSLite.noConflict();
JSLite("div p").hide(); // 使用 JSLite
$("content").style.display = "none";    // 使用其他库的 $()
```

#### 恢复使用别名
恢复使用别名 `$`，然后创建并执行一个函数，在这个函数的作用域中仍然将 `$` 作为 `JSLite` 的别名来使用。在这个函数中，原来的 `$` 对象是无效的。这个函数对于大多数不依赖于其他库的插件都十分有效：

```js
JSLite.noConflict();
(function($) { 
  $(function() {
    // 使用 $ 作为 JSLite 别名的代码
  });
})(JSLite);

... // 其他用 $ 作为别名的库的代码
```

#### 简写
可以将 `JSLite.noConflict()` 与简写的 `ready` 结合，使代码更紧凑

```js
JSLite.noConflict()(function(){
    // 使用 JSLite 的代码
    console.log($('div'))
});
```

#### 创建别名
创建一个新的别名用以在接下来的库中使用 `JSLite` 对象：

```js
var j = JSLite.noConflict();
j("#box").hide();  // 基于 JSLite 的代码
$("content").style.display = "none";    // 基于其他库的 $() 代码
```

#### 新的命名空间
完全将 `JSLite` 移到一个新的命名空间：

```js
var dom = {};
dom.jslite = JSLite.noConflict(true);
```

结果:

```js
dom.jslite("div p").hide();  // 新 JSLite 的代码
$("content").style.display = "none";    // 另一个库 $() 的代码
JSLite("div > p").hide();   // 另一个版本 JSLite 的代码
```


----
## 插件编写

### $.extend 
> 通过源对象扩展目标对象的属性，扩展 `JSLite` 元素集来提供新的方法（通常用来制作插件）

```js
$.extend({
    min: function(a, b) { return a < b ? a : b; },
    max: function(a, b) { return a > b ? a : b; }
});
$.min(2,3);    //⇒ 2
$.max(4,5);    //⇒ 5
// 在$上扩展了几个方法  
//调用方法  $.min(2,3);   //⇒ 2
//调用方法  $.max(4,5);   //⇒ 5
```

### $.fn.extend
> 扩展 `JSLite` 元素集来提供新的方法（通常用来制作插件）。

```js
$.fn.extend({   //增加两个插件方法。
    check: function() {
        return this.each(function() { this.checked = true; });
    },
    uncheck: function() {
        return this.each(function() { this.checked = false; });
    }
});
$("input[type=checkbox]").check();  //选中
$("input[type=radio]").uncheck();   //取消选中
```

### $.error
> 当元素遇到错误（没有正确载入）时，发生 `error` 事件。

```js
$.error("2222")
//⇒ 输出错误 Uncaught 2222
```

----
## 字符串处理

### $.trim
去掉字符串起始和结尾的空格。

```js
$.trim("  hello, how are you?  ");//⇒ "hello, how are you?"
```

### trim
同上，去掉字符串起始和结尾的空格。

```js
"  hello, how are you?  ".trim()//⇒ "hello, how are you?"
```

----
## URL

### $.getUrlParam
> 获取 `url` 参数的值。

```js
//[URL] = http://blog.pc175.com/?param=2
$.getUrlParam("param") //⇒ 2
```

### $.param
> 将表单元素数组或者对象序列化。如果shallow设置为true，嵌套对象不会被序列化，嵌套数组的值不会使用放括号在他们的key上。  
> `$.param(object, [shallow])   ⇒ string`   
> `$.param(array)   ⇒ string`  

```js
$.param({
    foo: {one: 1,two: 2 }
})  //⇒ "foo[one]=1&foo[two]=2"

$.param({
    ids:["a1","b2","c3"],
    c:{g:23,e:[567]},
    a:3
},true) //⇒ ids=a1&&ids=b2&&ids=c3&&c=[object Object]&a=3

$.param({
    ids:["a1","b2","c3"],
    c:{g:23,e:[567]},
    a:3
}) //⇒ ids[]=a1&&ids[]=b2&&ids[]=c3&&c[g]=23&&c[e]=567&&a=3

$.param([1,2,3]) //⇒ 0=1&&1=2&&2=3

$.param({
    ids:[1,2,3] 
})  //=> "ids[]=1&ids[]=2&ids[]=3"
```


----
## 数组对象操作

### 最大(小)值

```js
//顺带小教程
//获取最大值最小值
var a=[1,2,3,5];
console.log(Math.max.apply(null, a));//最大值
console.log(Math.min.apply(null, a));//最小值

var a=[1,2,3,[5,6],[1,4,8]];
var ta=a.join(",").split(",");//转化为一维数组
console.log(Math.max.apply(null,ta));//最大值
console.log(Math.min.apply(null,ta));//最小值
```

### Array.remove
> 这个是在Array原型对象上扩展的。

```js
[1,5,6].remove(1)//⇒ [5, 6]
```

### $.intersect
> 数组交集

```js
$.intersect([1,2,3,'asdkjf'],[2,3,6,'asdkjf'])
//⇒ [2, 3, "asdkjf"] 
```

### $.unique
> 删除数组中重复元素。

```js
$.unique([1,2,12,3,2,1,2,1,1,1,1]) //⇒ [1, 2, 12, 3]
var arr = $('#box').concat($('#box')) //两个一模一样的数组
$.unique(arr) //去重
```

### $.sibling
> 根据类型获取节点对象属性的集合 `(node,type)`。

```js
$.sibling($("input"),"type")    //⇒ ["text", "button", "checkbox"]   
$.sibling($("input"),"tagName") //⇒ ["INPUT"]
```

### $.inArray
> 搜索数组中指定值并返回它的索引（如果没有找到则返回`-1`)。

```js
var arr = [ 4, "Pete", 8, "John" ];
$.inArray("John", arr);     //⇒ 3
$.inArray(4, arr);          //⇒ 0
$.inArray("David", arr);    //⇒ -1
$.inArray("Pete", arr, 2);  //⇒ -1
```

### $.map
> 通过遍历集合中的节点对象，通过函数返回一个新的数组，`null` 或 `undefined` 将被过滤掉。

```js
$.map({"w":1,"c":2,"j":3},function(idx,item){
     return item
}); 
//⇒ ["w", "c", "j"]
```

### $.each
> 通用例遍方法，可用于例遍对象和数组

```js
$.each(['a', 'b', 'c'], function(index, item){
    console.log('item %d is: %s', index, item)
})
```

### $.grep
> 使用过滤函数过滤数组元素。

```js
$.grep( [0,1,2], function(n,i){
  return n != 0;
});
```

### $.parseJSON
> 与 `JSON.parse` 方法相同，接受一个标准格式的 JSON 字符串，并返回解析后的 JavaScript 对象。

----
## 测试操作

### $.isDocument
> 判断对象是否为【document】。

```js
$.isDocument(document) //⇒ true
```

### $.isWindow
> 确定参数是否为一个窗口（window对象），如果是则返回true。这在处理iframe时非常有用，因为每个iframe都有它们自己的window对象，使用常规方法obj==window校验这些objects的时候会失败。

### $.isFunction
> 判断对象是否为函数【function】。

```js
$.isFunction(function(){}) //⇒ true
```

### $.isObject
> 判断是否为 `Object` 。

```js
$.isObject({})  //⇒ true
```

### $.isPlainObject
> `$.isPlainObject(object)   ⇒ boolean`  
> 如果通过 "{}" 或者 "new Object" 创建的则返回true。判断对象是否是纯粹的对象。

```js
$.isPlainObject({})         // => true
$.isPlainObject(new Object) // => true
$.isPlainObject(new Date)   // => false
$.isPlainObject(window)     // => false
```

### $.isArray
> 判断是否为【数组】。

```js
$.isArray([1,2,3])  //⇒ true
```

### $.isJson
> 判断是否为【数组】。

```js
$.isJson({})  //⇒ true
```

### $.contains
> `$.contains(parent, node)   ⇒ boolean  `
> `parent`是否包含`node`节点对象。

```js
$.contains($("#box")[0],$(".boxss")[0]) //⇒ parent是否包含node节点对象
```

### $.likeArray
> 判断对象是否为数组或者是字符。

```js
$.likeArray([1,2,3])     //⇒ true
$.likeArray("222")  //⇒ true
```

### $.type
> 获取JavaScript 对象的类型。可能的类型有： `null` `undefined` `boolean` `number` `string` `function` `array` `date` `regexp` `object` `error` 。

```js
$.type(true)  //⇒ Boolean
$.type("div") //⇒ String
```

### $.matches
> 如果当前节点能被指定的css选择器查找到，则返回`true`，否则返回`false`。  
> `$.matches(element,selector)  ⇒ boolean`

```js
$.matches($("#box")[0], "#box")//⇒ true   
```

### is
> 判断当前匹配的元素集合中的元素，是否为一个选择器，DOM元素
> is(selector)   ⇒ boolean  
> is(element)    ⇒ boolean

```js
$('#box').is('div');  //⇒ true  
$('#box').is('#box');  //⇒ true  
$('#box').is('#boxsss');  //⇒ false  
$('div').is($('#box')[0]) //⇒ true  节点是否在 $('#box')[0] 是否再集合中
```

----
## 对象访问

### each
> 遍历一个 `JSLite` 集合对象，为每一个匹配元素执行一个函数。this关键字指向当前item(作为函数的第二个参数传递)。如果函数返回 false，遍历结束。

```js
$("img").each(function(i){
    this.src = "test" + i + ".jpg";
});
//⇒ 找到所有的img对象给设置src  
//⇒ 返回 [ <img src="test0.jpg" />, <img src="test1.jpg" /> ]
```

### map
> 遍历节点对象集合中的所有节点对象返回一个新的集合对象

```js
$(".box").map(function(index,item){
    return $(this).text()
})
//⇒ 返回 ["12boxOne", "6", "11", "22123456", "7123123"]
```

### forEach
> 类似 each，forEach遍历不会停止。

```js
//遍历数组
[1,5,2,3].forEach(function(item,index,array){
    console.log(item,index,array)
})
//遍历节点
$("img").forEach(function(item,index,array){
    console.log(item,index,array)
})
```

### eq
> 指定匹配元素的集合为的索引的哪一个元素。一个整数，指示元素的位置，以 `0` 为基数。
> eq(index)  ⇒ collection
> eq(-index) ⇒ collection

```js
$("div").eq(0)//⇒ 返回数组第一个节点数组 [div#box.boxOne.box2.box3, init: function…]
$("div").eq(-1)//⇒ 倒数第一个节点数组
$("div").eq(-2)//⇒ 倒数第二个节点数组
```

### get
> 当前对象集合中获取所有节点对象或单个节点对象。

```js
$("div").get(0)//⇒ 返回节点 <div id="box" class="boxOne box2 box3" ></div>
```

### index
> 获取一个元素的位置。当elemen参数没有给出时，返回当前元素在兄弟节点中的位置。
> .index()  //对象中第一个元素相对于它同辈元素的位置
> .index(selector)  
> .index(element)

```js
$("#box").index()//⇒ 4
$("div").index("#box")//⇒ 2
$("div").index($("#box"))//⇒ 2
$("div").index($("#box")[0])//⇒ 2
```

### indexOf
> 在当前获取的节点数组中获取一个元素在这个数组的位置。

```js
$("div").indexOf($("#box")[0])
//⇒ 2
```

### length
> 对象中元素的个数。

```js
$("img").length;
//⇒ 2
```

----
## HTML代码/文本/值

### text
> 取得所有匹配节点对象的文本内容。

```js
$("#box").text()
//⇒ string 返回文本
```

### html
> 获取或设置节点对象内容。

```js
$("#box").html()
//⇒ string 返回包括HTML的文本
```

### val
> 获取设置input的 value 。

```js
$('input').val() //⇒ string 
$('input').val('test') //⇒ self 

$('#input').val(function(index,oldvalue){
    console.log(index,oldvalue)
    return '111' + oldvalue
}) //⇒ self 
```

----
## 节点属性

### pluck
> 获取对象集合中每一个元素的属性值。

```js
$("#box").pluck("nodeName") //⇒ ["DIV"]
$("#box").pluck("nextElementSibling") //⇒ <div class="boxs">1234567890</div>
$("#box").pluck('children') //⇒ [HTMLCollection[4]]
```

### attr
> 读取或设置dom的属性。

```js
$(".button").attr({"class":"","style":"background:red"}) //⇒ self 设置红色清空class
$(".button").attr("class","name")  //⇒ self 设置class替换之前的
$(".button").attr("class")  //⇒ string 获取class属性值
```

### removeAttr

> 移动当前对象集合中所有元素的指定属性。

```js
$("#box").removeAttr("class") //⇒ self 移除class
```

### prop

> 读取或设置dom的属性。它在读取属性值的情况下优先于 [attr](#attr)，因为这些属性值会因为用户的交互发生改变，如 `checked` 和 `selected` 。

```html
<input class="taiyang" id="check1" type="checkbox" checked="checked">
<input class="yaotaiyang" id="check2" type="checkbox">
<script type="text/javascript">
    $("#check1").attr("checked"); //=> "checked"
    $("#check1").prop("checked"); //=> "true"
    $("#check2").attr("checked"); //=> "false"
    $("#check2").prop("checked"); //=> "false"
    $("input[type='checkbox']").prop("type",function(index,oldvalue){
        console.log(index+"|"+oldvalue);
    });
    //=> 0|checkbox
    //=> 1|checkbox
    $("input[type='checkbox']").prop("className",function(index,oldvalue){
        console.log(index+"|"+oldvalue);
    });
    //=> 0|taiyang
    //=> 1|yaotaiyang
</script>
```

### removeProp

> 为集合中匹配的元素删除一个属性（property）。`removeProp()` 方法用来删除由`.prop()`方法设置的属性集。

**注意**: 不要使用此方法来删除原生的属性（ property ），比如checked, disabled, 或者 selected。这将完全移除该属性，一旦移除，不能再次被添加到元素上。使用.prop()来设置这些属性设置为false代替。

```html
<p id="n2" class="demo test" data-key="UUID" data_value="1235456465">CodePlayer</p>
<script>
var $n2 = $("#n2");
$n2.prop("prop_a", "CodePlayer");
$n2.prop("prop_b", { name: "CodePlayer", age: 20 } );

console.log($n2.prop("prop_a")) //⇒ CodePlayer
console.log($n2.prop("prop_b")) //⇒ Object {name: "CodePlayer", age: 20}

$n2.removeProp("data-key");
$n2.prop("data-key") //⇒ undefined
$n2.attr("data-key") //⇒ "UUID"
</script>
```

----

## CSS 类

### css
> 获取或设置节点对象的style样式内容。

```js
$("#box").css('color','yellow')     //⇒ self 返回Array 节点内容
$("#box").css({'color':'yellow'})   //⇒ self 返回Array 节点内容
```

### hasClass
> 集合中是否有节点对象含有指定的class。

```js
$("#box").hasClass('box2') //⇒ true
```

### addClass
> 为每个匹配的节点对象添加指定的class类名。

```js
$("#box").addClass('box23 go') //⇒ self 原有对象class上添加 box23和 go

$("#box").addClass(function(){
    return 'box23 wcj'
}) //⇒ self 原有对象class上添加 box23 和wcj
```

### removeClass
> 清除节点对象中所有节点对象的指定class类名，不填写清空。

```js
$("#box").removeClass('box23') //⇒ self 删除原有对象class中box23
$("div").removeClass() //⇒ self  所有匹配的对象class属性被删除
```

### toggleClass
> 在匹配的节点对象集合中的每个节点对象上添加或删除一个或多个样式类。

```js
$("#box").toggleClass('box1 box2') //⇒ self 原有对象class上添加 "box1 box2"或者删除"box1 box2"
```

----
## 效果

### toggle
> 显示或隐藏匹配节点对象。

```js
$("#box").toggle() //⇒ self 原有对象如果隐藏就显示，如果显示就隐藏。
```

### show
> 显示匹配节点对象。

```js
$("#box").show() //⇒ self 显示匹配节点对象
```

### hide
> 隐藏匹配节点对象。

```js
$("#box").hide() //⇒ self 隐藏匹配的对象
```

----
## 尺寸位置

### offset
> 获得当前元素相对于document的位置。返回一个对象含有：left|top|width|height

```js
$("#box").offset()  //⇒Object {left: 8, top: 8, width: 1260, height: 0}
$("#box").offset().left  //⇒  8
```

### width
> width()   ⇒ number  
> width(value)   ⇒ self  
> width(function(index, oldWidth){ ... })   ⇒ self  
> 获取对象象集合中第一个元素的宽，或设置对象集合所有元素的宽。

```js
$('#box').width()   // => 342
$(window).width()   // => 456 (可视区域宽度)
$(document).width() // => dsf 
```

### height
> height()   ⇒ number  
> height(value)   ⇒ self  
> height(function(index, oldWidth){ ... })   ⇒ self  
> 获取对象象集合中第一个元素的高，或设置对象集合所有元素的高。

```js
$('#box').height()   // => 342
$(window).height()   // => 456 (可视区域高度)
$(document).height() // => dsf 
```

### scrollLeft
> scrollLeft() ⇒  self
> 获取匹配的元素集合中第一个元素的当前水平滚动条的位置

```js
$('body').scrollLeft(400);
```

### scrollTop
> scrollTop() ⇒ self 
> 获取匹配的元素集合中第一个元素的当前垂直滚动条的位置

```js
$('body').scrollTop(400);
```

----
## 过滤

### filter
> 筛选出与指定表达式匹配的元素集合。`filter(selector) `。

```js
$("div").filter("#box") //⇒ self 在所有的div对象中选择器为 #box 的过滤出来。
```

### not
> not(selector)   ⇒ collection  
> not(collection)   ⇒ collection  
> not(function(index){ ... })   ⇒ collection  
> 筛选出与 `非` 指定表达式匹配的元素集合。它的作用刚好与 `filter` 相反，返回。

```js
$("#select option").not(function(idx){
    console.log(this.selected)
    return this.selected
})
//⇒ [<option value="3">哈哈3</option>]
$('input').not('#input') //⇒ 返回除去 匹配到的#input

$('input').not(function(){
    console.log(this.type)
    return this.type=='text'
})
```

----
## 删除节点

### empty
> 所有匹配节点对象集合中移除所有的dom子节点，不包括自己，清空内容。

```js
$("#box").empty()
//⇒ self <div id="box" class="boxOne box2 box3" ></div>
```

### remove
> 删除所有匹配节点对象【自己】及所有【自己】里面的内容。

```js
$("#box").remove()
//⇒ self <div id="box" class="boxOne box2 box3" ></div>
```

### detach !
> 被遗弃的方法(不建议使用)，作用跟remove一样，所有绑定的事件、附加的数据等都会保留下来。

```js
$("#box").click(function(){
    console.log("wcj")
})
var a = $('#box').detach();//删除的对象赋给a
$('body').append(a)//将a添加到 body 中还是可以点击
```

----
## 查找节点

### find
> 后代节点的集合(可以带上滤选择器)。

```js
$("#box").find()        //⇒后代节点的集合
$("#box").find(".box")  //⇒后代节点的集合，返回匹配'.box' 的集合
```

### children
> 获得每个匹配元素集合元素的直接子元素(可以带上滤选择器)。

```js
$("#box").children()
//下面这种方法也可以的 CSS3 节点选择器 -_+
$("#box *")
```

### contents
> 获得每个匹配元素集合元素的子元素，包括文字和注释节点。
> `contents()   ⇒ collection  `

```js
$("#box").contents()

```

### parent
> 对象集合中每个元素的直接父元素。

```js
$("#box").parent()
```

### parents
> 获取对象集合每个元素所有的祖先元素（不包含根元素）。  
> `parents([selector])  ⇒ collection`

```js
$("#box").parents()

$("#boxWhy").parents(".boxss")
```

### closest
> 从元素本身开始，逐级向上级元素匹配，并返回最先匹配`selector`的祖先元素。如果`context`节点参数存在。那么直考虑该节点的后代。这个方法与 `parents(selector)`有点相像，但他只返回最先匹配的祖先元素。

```js
$("#box").closest('div')

$(document).bind("click", function(e) {
    console.log(e.target)//当前点击的对象
    $(e.target).closest("li").css('background','red');
});

$("#boxWhy").closest('.boxss',$('#box')[0])//#boxWhy节点的父节点为："$('#box')[0]"的子节点".boxss"
```


### prev
> 获取对象集合每个元素的所有上一个对象(可以带上滤选择器)。

```js
$("#box").prev("div")
```

### next
> 获取对象集合每个元素的所有下一个对象(可以带上滤选择器)。

```js
$("#box").next("div")
```

### prevAll
> 获取对此对象【上】所有兄弟对象(可以带上滤选择器)。

```js
$("#box").prevAll("div")
```

### nextAll
> 获取对此对象【下】所有兄弟对象(可以带上滤选择器)。

```js
$("#box").nextAll("div")
```

### siblings
> 获取对此对象【其它】所有兄弟对象(可以带上滤选择器)。

```js
$("#box").siblings()
```

### slice
> array中提取的方法。从start开始，如果end 指出。提取不包含end位置的元素。
> `slice(start, [end]) ⇒ array`

```js
$("div").slice(3) //返回数组中第三个(包含第三个)之后的所有元素
$("div").slice(3,5) //返回数组 3-5之间的元素 
```

### add
> 添加元素到匹配的`JSLite`对象集合

```js
$("#box").siblings()
```

----

## 插入节点方法

### prepend
> 插入到标签开始标记之后（里面的第一个）。  
> `prepend(content)  ⇒ self ` 
> `prepend(Function)  ⇒ self`  

```js
$("#box").prepend("dd") //⇒ self
$("#box").prepend(function(){
    return "asdfasdf"
}) //⇒ self
```

### prependTo
> 将生成的内容插入到匹配的节点标签开始标记之后。这有点像prepend，但是是相反的方式。  
> `prependTo(selector)   ⇒ self  `

```js
$('<div>test</div>').prependTo('#box')
```

### append
> 插入到标签结束标记前（里面的结尾）。  
> `append(content)  ⇒ self  `
> `append(Function)  ⇒ self`

```js
$("#box").append("dd") //⇒ self

$("#box").append(function(){
    return "asdfasdf"
}) //⇒ self
```

### appendTo
> 将生成的内容插入到匹配的元素标签结束标记前（里面的最后）。这个有点像append，但是插入的目标与其相反。
> `appendTo(selector)   ⇒ self  `

```js
$('<div>test</div>').appendTo('#box')
```

### after
> 插入到标签结束标记后。（兄弟节点的下面）  
> `after(content)  ⇒ self  `
> `after(Function)  ⇒ self ` 

```js
$("#box").after("dd") //⇒ self
$("#box").after(function(){
    return "asdfasdf"
}) //⇒ self
```

### insertAfter
> 插入的对象集合中的元素到指定的每个元素后面的dom中。这个有点像 `after` ，但是使用方式相反。  
> `insertAfter(selector)   ⇒ self`  

```js
$('<p>test</p>').insertAfter('#box') //⇒ self
$('#input').insertAfter('#box')        //⇒ self  $('#input')
```

### before
> 插入到标签开始前。  
> `after(content)  ⇒ self ` 
> `after(Function)  ⇒ self`  

```js
$("#box").before($('input')) //⇒ self
$("#box").before(function(){
    return "asdfasdf"
}) //⇒ self
```


### insertBefore
> 将生成的内容插入 `selector` 匹配的节点标签开始前。这个有点像 `before`，但是使用方式相反。
> `insertBefore(selector)   ⇒ self`  

```js
$('<p>test</p>').insertBefore('#box')
```

### clone
> clone()   ⇒ collection  
> 通过深度克隆来复制集合中的所有元素。(通过原生 `cloneNode` 方法深度克隆来复制集合中的所有元素。此方法不会有数据和事件处理程序复制到新的元素。这点和jquery中利用一个参数来确定是否复制数据和事件处理不相同。)

```js
$('body').append($("#box").clone())
```

----

## 事件处理
> `blur` `focus` `focusin` `focusout` `load` `resize` `scroll` `unload` `click` `dblclick` `mousedown` `mouseup` `mousemove` `mouseover` `mouseout` `mouseenter` `mouseleave` `change` `select` `submit` `keydown` `keypress` `keyup` `error` 对象上直接添加事件。

```js
$("#box").click(function(){
    console.log("绑定点击事件")
});
```

### ready
> ready(function($){ ... })   ⇒ self  
> 添加一个事件侦听器，当页面 `dom` 加载完毕 `DOMContentLoaded` 事件触发时触发。加载完毕执行，建议使用 `$(func)` 来代替这种用法。

```js
$(document).ready(function(){
    alert("当页面dom加载完毕执行");
    console.log($("#box"));
})
```

### $(func)
> 加载完毕执行。与 `ready` 方法相同

```js
//或者使用下面方法代替ready
$(function(){
    console.log("当页面dom加载完毕执行");
})
```

### bind
> 为每个匹配元素的特定事件绑定事件处理函数。可以绑定这些事件 `blur` `focus` `focusin` `focusout` `load` `resize` `scroll` `unload` `click` `dblclick` `mousedown` `mouseup` `mousemove` `mouseover` `mouseout` `mouseenter` `mouseleave` `change` `select` `submit` `keydown` `keypress` `keyup` `error`  `paste` `drop` `dragover` 。

```js
$("#box").bind("click", function(){
    console.log("绑定点击事件")
});
```

### unbind
> 解除绑定事件，从每一个匹配的节点对象中删除绑定的事件。

```js
var f1=function(){alert('41');}
$("#box").bind("click",f1)   //⇒ 绑定事件
$("#box").unbind("click",f1) //⇒ 解除绑定事件

$("#box").bind("click",function(){alert('41');})   //⇒ 绑定事件
$("#box").unbind("click",function(){alert('41');}) //⇒ 解除绑定事件
```

### on
> on(type, [selector], function(e){ ... }) ⇒ self   
> on({ type: handler, type2: handler2, ... }, [selector]) ⇒ self  
> 为每个匹配元素的特定事件绑定事件处理函数。可以绑定这些事件 `blur` `focus` `focusin` `focusout` `load` `resize` `scroll` `unload` `click` `dblclick` `mousedown` `mouseup` `mousemove` `mouseover` `mouseout` `mouseenter` `mouseleave` `change` `select` `submit` `keydown` `keypress` `keyup` `error`  `paste` `drop` `dragover` 。

```js
$("#box").on("click", function(){
    console.log("绑定点击事件")
});

$("#box").on('click mouseover',function(evn){
    console.log('2'+evn)
}) //⇒ self  绑定两个事件

$("#box").on("click",{val:1},function(){//传参数
    console.log("dddd","event.data.val = " + event.data.val)
})

$( "#box" ).on({ //绑定多个事件
    click: function() {
        $( this ).css("background","red");
    }, 
    mouseover: function() {
        $( this ).css("background","yellow")
    },
    mousedown: function() {
        $( this ).css("background","green")
    }
});
```

### off
> 解除绑定事件，从每一个匹配的节点对象中删除绑定的事件。

```js
var f1=function(){alert('41');}
$("#box").on("click",f1)   //⇒ 绑定事件
$("#box").off("click",f1) //⇒ 解除绑定事件

$("#box").on("click",function(){alert('41');})   //⇒ 绑定事件
$("#box").off("click",function(){alert('41');}) //⇒ 解除绑定事件
```

### trigger
> trigger(event, [args])   ⇒ self  
> 匹配到的节点集合的元素上触发指定的事件。如果给定args参数，它会作为参数传递给事件函数。

```js
$("#box").on('abc:click',function(evn,a,c){
    console.log('2'+a+c)
}) //⇒ self  绑定一个事件
$("#box").trigger('abc:click',['wwww']) //⇒ self 触发并传一个参数进去
```

----
## Ajax

执行Ajax请求。请求地址可以是本地的或者跨域的，在支持的浏览器中通过 [HTTP access control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)或者通过 [JSONP](http://json-p.org/)来完成。

> 执行Ajax请求。  
> type：请求方法 ("GET", "POST")  
> data：(默认：none)发送到服务器的数据；如果是get请求，它会自动被作为参数拼接到url上。非String对象  
> processData (默认： true)： 对于非Get请求。是否自动将 data 转换为字符串。  
> dataType：(`json`, `jsonp`, `xml`, `html`, or `text`)  
> contentType：一个额外的"{键:值}"对映射到请求一起发送  
> headers：(默认：{})： 一个额外的"{键:值}"对映射到请求一起发送  
> url：发送请求的地址  
> async：此参数不传默认为true(同步请求)，false异步请求  
> success(cdata)：请求成功之后调用。传入返回后的数据，以及包含成功代码的字符串。  
> error(status, statusText)：请求出错时调用。 (超时，解析错误，或者状态码不在HTTP 2xx)。  

### $.get
> $.get(url, function(data, status, xhr){ ... })  ⇒ XMLHttpRequest  
> $.get(url, [data], [function(data, status, xhr){ ... }], [dataType])  ⇒ XMLHttpRequest   

```js
$.get('http://127.0.0.1/api.php?wcj=123', function(cdata) {
    console.log('ok', cdata)
},'json')

$.get('http://127.0.0.1/api.php?wcj=123',{"JSLite":4}, function(cdata) {
    console.log('ok', cdata)
})
```

### $.ajax(GET)

1.JSLite独有....

```js
$.ajax('GET', 'http://127.0.0.1/api.php', {"wcj":"123","ok":'11'},function(cdata) {
    console.log('ok', cdata)
})
```

2.通用调用方法

```js
$.ajax({
    type:'GET',
    dataType:'json',
    data:{'nike':'a'},
    url:'http://127.0.0.1/api.php',
    success:function(data){
       console.log('success:',data)
    },
    error:function(d){
       console.log('error:',d)
    }
})
```

### $.getJSON
发送一个Ajax GET请求并解析返回的JSON数据。方法支持跨域请求。  
$.getJSON(url, function(data, status, xhr){ ... })   

```js 
$.getJSON('http://127.0.0.1/api.php', function(data){
  console.log(data)
})
```

### jsonp
JSONP 方式

```js
$.ajax({
    url: 'http://127.0.0.1/api.php?callback',
    dataType: 'jsonp',
    success: function(data) {
        console.log(data)
    }
})

$.ajax({
    url: 'http://localhost/api3.php',
    dataType: 'jsonp',
    success: function(data) {
        console.log('success:2:',data)
    },
    error:function(d){
       console.log('error:',d)
    }
})
```

### $.post
> $.post(url, [data], function(data, status, xhr){ ... }, [dataType])

```js
$.post('http://127.0.0.1/api.php', {'nike':0},
function(cdata) {
    console.log('ok', cdata)
})
```

### $.ajax(POST)

1.JSLite独有....

```js
var data = { 'key': 'key', 'from': 'from'}
$.ajax('POST', 'http://127.0.0.1/api.php', data,function(data) {
    console.log('ok', data)
},'json')
```

2.通用调用方法

```js
$.ajax({
    type:'POST',
    dataType:'json',
    data:{"nike":"123","kacper":{"go":34,"to":100}},
    url:'http://127.0.0.1/api.php',
    success:function(data){
       console.log('success:',data)
    },
    error:function(d){
       console.log('error:',d)
    }
})
$.ajax({
    type:'POST',
    dataType:'json',
    data:JSON.stringify('{"nike":"123","kacper":{"go":34,"to":100}}'),
    url:'http://127.0.0.1/api.php',
    success:function(data){
       console.log('success:',data)
    },
    error:function(d){
       console.log('error:',d)
    }
})

$.ajax({
    type:'POST',
    dataType:'json',
    data:JSON.stringify({'nike':'a'}),
    url:'http://127.0.0.1/api.php',
    success:function(data){
       console.log('success:',data)
    },
    error:function(d){
       console.log('error:',d)
    }
})

$.ajax({
    type:'POST',
    data:{'nike':'a'},
    url:'http://127.0.0.1/api.php',
    success:function(data){
       console.log('success:',data)
    },
    error:function(d){
       console.log('error:',d)
    }
})

$.ajax({
    type:'POST',
    dataType:'json',
    data:{'nike':'a'},
    url:'http://127.0.0.1/api.php',
    success:function(data){
       console.log('success:',data)
    },
    error:function(d){
       console.log('error:',d)
    },
    headers: {
        "Access-Control-Allow-Origin":"http://pc175.com",
        "Access-Control-Allow-Headers":"X-Requested-With"
    },
    contentType: 'application/json'
})

```


### $.ajaxJSONP
已过时，使用 `$.ajax` 代替。此方法相对 `$.ajax` 没有优势，建议不要使用。
$.ajaxJSONP(options) ⇒ 模拟 XMLHttpRequest  


### load
> load() 方法从服务器加载数据，并把返回的数据放入被选元素中。

$(selector).load(URL,data,callback);  
必需的 `URL` 参数规定您希望加载的 URL。  
可选的 `data` 参数规定与请求一同发送的查询字符串键/值对集合。  
可选的 `callback` 参数是 `load()` 方法完成后所执行的函数名称。  


这是示例文件（"demo.txt"）的内容：

```js
<h2>JSLite中AJAX的一个方法！</h2>
<p id="demo">这是一个文本文件</p>
```


```js
// 把文件 "demo.txt" 的内容加载到指定的 <div> 元素中
$("#div1").load("demo.txt");
//把 "demo.txt" 文件中 id="div1" 的元素的内容，加载到指定的 <div> 元素中：
$("#div1").load("demo.txt #p1");
```


----
## Form
> 表单提交的一些方法

### submit
> submit() 方法把表单数据提交到 Web 服务器。这个是原生态提供的方法，还没有封装更改 *。

```js
$('form')[0].submit() //此处直接原生态提交表单，日后封装，直接在JSLite对象上就可以提交。
```

### serializeArray
> 将用作提交的表单元素的值组合成拥有name和value的键值对组成的数组。不能使用的表单元素，buttons，未选中的radio buttons/checkboxs 将会被跳过。结果不包含file inputs的数据。

```js
$('form').serializeArray();
//=> [{"name":"golang","value":"456"},{"name":"name","value":""},{"name":"password","value":""},{"name":"sel","value":[]},{"name":"kaikai","value":""},{"name":"w","value":""},{"name":"w","value":""}]
```

### serialize
> 将表单元素数组或者对象序列化。

```js
$('form').serialize();
//=> golang=456&name=&password=&sel=&kaikai=&w=asd&w2=asdf
```
