JSLite
======
jQuery lite.

## 核心Core
```js
$$("#box")              //选择器
$$.isDocument           //判断对象是否为【document】
$$.isFunction           //判断对象是否为【函数】
$$.isObject             //判断是否为【Object】
$$.isArray              //判断对象是否为【数组】
$$.likeArray            
$$.type                 //获取类型
$$.error                //创建自定义错误
$$.matches(element, selector) //如果当前元素能被指定的css选择器查找到,则返回true,否则返回false.

$$.map({"w":1,"c":2,"j":3},function(item,index){
     return index
}); 

$$("#box").each()       //遍历
$$("#box").extend()     //扩展
```


## 事件Event

## 异步请求Ajax

## Touch events