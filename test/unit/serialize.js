
var jsdom = require('../setup.js');
var fs = require('fs');

jsdom({
    src: fs.readFileSync('./dist/JSLite.js', 'utf-8')
})

describe('serialize 序列化。', function () {


    it('.param() 将表单元素数组或者对象序列化。', function () {

        
    })

    it('.serialize() 将表单元素数组或者对象序列化。', function () {

        
    })

    it('.serializeArray() 将表单元素数组或者对象序列化。', function () {

        
    })

    it('.getUrlParam() 获取 url 参数的值。', function () {

        
    })


})