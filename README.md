JSLite
======
jQuery lite.

## 核心Core
```js
$$("#box")        //选择器
$$.extend         //通过源对象扩展目标对象的属性
$$.fn             //是一个对象，它拥有WCJ对象上所有可用的方法。扩展一个方法例如：
    //$$.fn.each=function(){ return this;}
$$.isDocument     //判断对象是否为【document】
$$.isFunction     //判断对象是否为【函数】
$$.isObject       //判断是否为【Object】
$$.isArray        //判断对象是否为【数组】
$$.likeArray      //判断对象是否为数组或者是字符
$$.type           //获取类型
$$.map            //遍历集合中的元素返回一个新的数组，过滤null and undefined。
    //$$.map({"w":1,"c":2,"j":3},function(item,index){
    //     return index
    //}); 
$$.matches        //当前元素能被指定的css选择器查找到,则返回true,否则返回false.
$$.error          //创建自定义错误
$$.matches(element, selector) //如果当前元素能被指定的css选择器查找到,则返回true,否则返回false.
$$.inArray        //搜索数组中指定值并返回它的索引（如果没有找到则返回-1)
    //inArray(element, array, [fromIndex])
$$(document).ready(fun)//当页面dom加载完毕 “DOMContentLoaded” 事件触发时触发
$$("#box").each()     //遍历
$$("#box").map()      //遍历对象集合中的所有元素返回一个新的集合对象
$$("#box").get(1)     //当前对象集合中获取所有元素或单个元素
$$("#box").empty()    //对象集合中移除所有的dom子节点。
$$("#box").text()     //取得所有匹配元素的文本内容。
$$("#box").filter()   //筛选出与指定表达式匹配的元素集合。filter(selector) 
$$("#box").pluck()    //获取对象集合中每一个元素的属性值
$$("#box").parent()   //对象集合中每个元素的直接父元素。
$$("#box").parents()  //获取对象集合每个元素所有的祖先元素（不包含根元素）
$$("#box").extend()   //扩展
$$("#box").bind()     //绑定事件
$$("#box").unbind()   //事件移除
```


## 事件Event

## 异步请求Ajax

## Touch events