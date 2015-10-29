# JSLite

[![](https://img.shields.io/github/issues/JSLite/JSLite.svg)](https://github.com/JSLite/JSLite/issues)  [![](https://img.shields.io/github/forks/JSLite/JSLite.svg)](https://github.com/JSLite/JSLite/network) [![](https://img.shields.io/github/stars/JSLite/JSLite.svg)](https://github.com/JSLite/JSLite/stargazers) [![](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/JSLite/JSLite/master/MIT-LICENSE) [![](https://travis-ci.org/JSLite/JSLite.svg?branch=master)](https://travis-ci.org/JSLite/JSLite) [![](https://img.shields.io/github/release/JSLite/JSLite.svg)](https://github.com/JSLite/JSLite/releases)

```
   __     ______     __         __     ______   ______    
  /\ \   /\  ___\   /\ \       /\ \   /\__  _\ /\  ___\   
 _\_\ \  \ \___  \  \ \ \____  \ \ \  \/_/\ \/ \ \  __\   
/\_____\  \/\_____\  \ \_____\  \ \_\    \ \_\  \ \_____\ 
\/_____/   \/_____/   \/_____/   \/_/     \/_/   \/_____/ 

```

让web开发更迅速，下载执行更快、量级更轻，针对现代高级浏览器的JavaScript库。 推进前端开发标准对于攻城师来说，人人有责。  

**如有疑问欢迎到这些地方交流：**  

QQ交流群：397463673   
[segmentfault社区](http://segmentfault.com/t/jslite/blogs) | [官方网站](http://jslite.io) | [官方文档-更详细](http://jslite.io/API/)

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

您需要在系统上安装 `Node.js`的。 

```shell
#npm 下载到 node_modules
$ npm install jslite

#bower 下载到 bower_components
$ bower install jslite

#安装grunt依赖
$ npm install

#启动grunt自动压缩合并，进入开发模式.... 
#默认合并所有模块生成到一个build目录中
$ npm start
```

## Test - 测试

> 测试需要在系统上安装 `Node.js`的 `4.x` 以上版本。 

```shell
$ grunt make # 先生成新的 压缩版本的JSLite
$ npm test # 进行单元测试

# 写测试用例的时候实时运行单元测试
$ npm test watch
```

## JSLite模块
JSLite 模块中的 `src/` 目录的各个文件。

模块 | 默认加载 | 描述
--- | ------- | -----
JSLite | ✔ | 核心模块，包含大多数方法。
function | ✔ | 内部函数调用
start | ✔ | UMD开始。
end | ✔ | UMD结束。
polyfill | - | 支持桌面浏览器IE和移动端 Windows Phone 8。
form | - | 表单方法。
event | - | 事件处理。
ajax | - | 异步请求的方法，发起任意Ajax请求。

默认合并 `start` `polyfill` `function` `JSLite` `end` 。上面打 `✔` 都为默认加载的核心模块。其它均可选择性加载。

```shell
# 运行下面任务请确认依赖是否安装 安装方法 `npm install`
# 模块选择合并，做一个自定义生成
# 默认不传环境变量全部合并
$ MODULES="polyfill event" grunt make

# on Windows
c:\JSLite> SET MODULES=polyfill event
c:\JSLite> grunt make
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




