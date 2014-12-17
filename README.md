JSLite
======
[官方网站](http://blog.pc175.com/JSLite/)
[官方文档-更详细](http://blog.pc175.com/JSLite/doc/)

## 核心Core
```js
$("#box")        //选择器
$(fun)           //$$(fun) = $$(document).ready(function(){})
$.extend         //通过源对象扩展目标对象的属性
$.fn             //是一个对象，它拥有WCJ对象上所有可用的方法。
$.isDocument     //判断对象是否为【document】
$.isWindow     //判断是否为window对象
$.isFunction     //判断对象是否为【函数】
$.isObject       //判断是否为【Object】
$.isPlainObject  //如果通过 "{}" 或者 "new Object" 创建的则返回true
$.isArray        //判断对象是否为【数组】
$.isJson         //判断对象是否为Json格式的对象
$.isContainsNode(parent,node)//parent是否包含node节点对象
$.getUrlParam("param")         //获取url参数的值
$.likeArray      //判断对象是否为数组或者是字符
$.intersect      //数组交集
$.type           //获取类型
$.map            //遍历集合中的元素返回一个新的数组，过滤null and undefined。
$.error          //创建自定义错误
$.matches(element, selector) //如果当前元素能被指定的css选择器查找到,则返回true,否则返回false.
$.sibling(elm,type)  //根据类型获取对象的集合
$.inArray            //搜索数组中指定值并返回它的索引（如果没有找到则返回-1)
    //inArray(element, array, [fromIndex])
$(document).ready(fun)//当页面dom加载完毕 “DOMContentLoaded” 事件触发时触发


each()     //遍历
map()      //遍历对象集合中的所有元素返回一个新的集合对象
get(1)     //当前对象集合中获取所有元素或单个元素
empty()    //对象集合中移除所有的dom子节点。
remove()   //删除【自己】及所有【自己】里面的内容
text()     //取得所有匹配元素的文本内容。
html()     //获取或设置对象内容。
css()      //获取或设置对象的style样式内容。
attr()     //读取或设置dom的属性。
offset()   //获取对象left|top|width|height
hasClass() //集合中是否有元素含有指定的class。
addClass() //为每个匹配的元素添加指定的class类名
removeClass() //清除集合中所有元素的指定class类名，不填写清空
toggleClass() //在匹配的元素集合中的每个元素上添加或删除一个或多个样式类
toggle()   //显示或隐藏匹配元素
show()     //显示匹配元素
hide()     //隐藏匹配元素
indexOf()  //获取节点对象集合的位置（跟字符串位置一样玩儿）
filter()   //筛选出与指定表达式匹配的元素集合。filter(selector) 
not()      //筛选出与 `非` 指定表达式匹配的元素集合。它的作用刚好与 `filter` 相反
pluck()    //获取对象集合中每一个元素的属性值
find()     //后代节点的集合(可以带上滤选择器)
children() //获得每个匹配元素集合元素的直接子元素(可以带上滤选择器)
parent()   //对象集合中每个元素的直接父元素。
parents()  //获取对象集合每个元素所有的祖先元素（不包含根元素）
prev("div")//获取对象集合每个元素的所有上一个对象(可以带上滤选择器)
next("div")//获取对象集合每个元素的所有下一个对象(可以带上滤选择器)
prevAll()  //获取对此对象【上】所有兄弟对象(可以带上滤选择器)
nextAll()  //获取对此对象【下】所有兄弟对象(可以带上滤选择器)
siblings() //获取对此对象【其它】所有兄弟对象(可以带上滤选择器)
extend()   //扩展
bind()     //绑定事件
unbind()   //事件移除
before(content)      //:插入到标签开始前
prepend(content)     //:插入到标签开始标记之后
append(content)      //:插入到标签结束标记前
after(content)       //:插入到标签结束标记后

insertAfter(selector) //插入的对象集合中的元素到指定的每个元素后面的dom中。
prependTo(selector)//将生成的内容插入到匹配的元素标签结束标记前（里面的最后）。
insertBefore(selector)//将生成的内容插入 selector 匹配的节点标签开始前。
appendTo(selector)//将生成的内容插入到匹配的元素标签结束标记前（里面的最后）。


$(".box").width()//对象象集合中第一个元素的宽，或设置对象集合所有元素的宽。
$(".box").height()//对象象集合中第一个元素的高，或设置对象集合所有元素的高。
```


## 事件Event
`blur` `focus` `focusin` `focusout` `load` `resize` `scroll` `unload` `click` `dblclick` `mousedown` `mouseup` `mousemove` `mouseover` `mouseout` `mouseenter` `mouseleave` `change` `select` `submit` `keydown` `keypress` `keyup` `error` 对象上直接添加事件。

```js
$("#box").click(function(){
    console.log("绑定点击事件")
});
```


### bind
为每个匹配元素的特定事件绑定事件处理函数。可以绑定这些事件 `blur` `focus` `focusin` `focusout` `load` `resize` `scroll` `unload` `click` `dblclick` `mousedown` `mouseup` `mousemove` `mouseover` `mouseout` `mouseenter` `mouseleave` `change` `select` `submit` `keydown` `keypress` `keyup` `error`。

```js
$("#box").bind("click", function(){
    console.log("绑定点击事件")
});
```

### unbind
解除绑定事件，从每一个匹配的节点对象中删除绑定的事件。

```js
var f1=function(){alert('41');}
$("#box").bind("click",f1)   //⇒ 绑定事件
$("#box").unbind("click",f1) //⇒ 解除绑定事件

$("#box").bind("click",function(){alert('41');})   //⇒ 绑定事件
$("#box").unbind("click",function(){alert('41');}) //⇒ 解除绑定事件
```

### on
为每个匹配元素的特定事件绑定事件处理函数。可以绑定这些事件 `blur` `focus` `focusin` `focusout` `load` `resize` `scroll` `unload` `click` `dblclick` `mousedown` `mouseup` `mousemove` `mouseover` `mouseout` `mouseenter` `mouseleave` `change` `select` `submit` `keydown` `keypress` `keyup` `error`。

```js
$("#box").on("click", function(){
    console.log("绑定点击事件")
});
```

### off
解除绑定事件，从每一个匹配的节点对象中删除绑定的事件。

```js
var f1=function(){alert('41');}
$("#box").on("click",f1)   //⇒ 绑定事件
$("#box").off("click",f1) //⇒ 解除绑定事件

$("#box").on("click",function(){alert('41');})   //⇒ 绑定事件
$("#box").off("click",function(){alert('41');}) //⇒ 解除绑定事件
```


## 异步请求Ajax

## ajax
执行Ajax请求。<br>

type：请求方法 ("GET", "POST")<br>
data：(默认：none)<br>发送到服务器的数据；如果是get请求，它会自动被作为参数拼接到url上。非String对象<br>
dataType：(`json`, `jsonp`, `xml`, `html`, or `text`)<br>
contentType：一个额外的"{键:值}"对映射到请求一起发送<br>
headers：(默认：{})： 一个额外的"{键:值}"对映射到请求一起发送<br>
url：发送请求的地址<br>
success(cdata)：请求成功之后调用。传入返回后的数据，以及包含成功代码的字符串。<br>
error(status, statusText)：请求出错时调用。 (超时，解析错误，或者状态码不在HTTP 2xx)。

###### ajax GET请求

```js
var data = { 'key': 'key', 'from': 'from'}
$.ajax('GET', 'http://127.0.0.1/api.php', 
function(cdata) {
    console.log('ok', cdata)
})

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

###### ajax POST请求

```js
var data = { 'key': 'key', 'from': 'from'}
$.ajax('POST', 'http://127.0.0.1/api.php', data,
function(data) {
    console.log('ok', data)
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


## Touch events