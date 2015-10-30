
var jsdom = require('../setup.js');
var fs = require('fs');

jsdom({
    src: fs.readFileSync('./dist/JSLite.js', 'utf-8')
})

describe('ready 添加一个事件侦听器，当页面 dom 加载完毕 DOMContentLoaded 事件触发时触发。', function () {

    it('ready', function () {

        
    })

})