
var jsdom = require('../setup.js');
var fs = require('fs');

jsdom({
    src: fs.readFileSync('./dist/JSLite.js', 'utf-8')
})

describe('effects 效果', function () {


    it('.hide() - 隐藏匹配节点对象。', function () {


    })
    
    it('.show() - 显示匹配节点对象。', function () {


    })

    it('.toggle() - 显示或隐藏匹配节点对象。', function () {


    })


})