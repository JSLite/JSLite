# JSLite

[![](https://img.shields.io/github/issues/JSLite/JSLite.svg)](https://github.com/JSLite/JSLite/issues)  [![](https://img.shields.io/github/forks/JSLite/JSLite.svg)](https://github.com/JSLite/JSLite/network) [![](https://img.shields.io/github/stars/JSLite/JSLite.svg)](https://github.com/JSLite/JSLite/stargazers) [![](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/JSLite/JSLite/master/MIT-LICENSE) [![](https://travis-ci.org/JSLite/JSLite.svg?branch=master)](https://travis-ci.org/JSLite/JSLite)


让web开发更迅速，下载执行更快、量级更轻，针对现代高级浏览器的JavaScript库。 推进前端开发标准对于攻城师来说，人人有责。  

**如有疑问欢迎到这些地方交流：**  

QQ交流群：397463673   
[segmentfault社区](http://segmentfault.com/t/jslite/blogs) | [官方网站](http://jslite.io) | [官方文档-更详细](http://jslite.io/API/)  | [Github文档](https://github.com/jaywcjlove/jaywcjlove.github.io/blob/master/JSLite/doc/index.md) 

> 1. jQuery 的目标是兼容所有主流浏览器，这就意味着它的大量代码对移动端的浏览器是无用或者低效的。
> 2. 而 JSLite 只针对先进浏览器(支持HTML5,CSS3)、移动端浏览器编写，使用js新方法实现jQuery API，因此体积更小、效率更高.
> 3. 更重要的是，JSLite 的 API 完全仿照 jQuery ，所以学习成本也很低。
> 4. JSLite与jQuery有着绝大部分类似的api，通用库只有5-10k，手机上每一kb都是钱。
> 5. 让web开发更迅速，下载执行更快、量级更轻，针对现代高级浏览器的JavaScript库。 推进前端开发标准对于攻城师来说，人人有责。

## 100% compatibility with common browsers - 主要兼容的浏览器(100% 的兼容)
此兼容，是根据我使用的一些js方法函数的支持情况来判断的。设备过少，部分是根据[developer.mozilla.org](https://developer.mozilla.org)的方法函数兼容数据来判断的，下面的我们的主要兼容目标

> Safari 6+ (Mac)  
> Chrome 30+ (Windows, Mac, Android, iOS, Linux, Chrome OS)  
> Firefox 24+ (Windows, Mac, Android, Linux, Firefox OS)  
> iOS 5+ Safari
> Android 2.3+ Browser  
> Internet Explorer 10+ (Windows, Windows Phone)  


## Installation - 安装

### npm 

```shell
$ npm install jslite
```

### bower 

```shell
$ bower install jslite
```

### 传统方法
1. 去[官网下载](http://jslite.io)JSLite  
2. 页面Head标签内引用 JSLite.js  

```html
<script type="text/javascript" src="JSLite.js"></script>
```

## Usage - 用法
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




