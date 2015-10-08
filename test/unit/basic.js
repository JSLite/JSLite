var jsdom = require('../setup.js');
var fs = require('fs');

jsdom({
    src: fs.readFileSync('./dist/JSLite.js', 'utf-8')
})

describe('Basic 这些方法允许我们在现有元素内插入新内容。', function () {

    it('.append() - 根据参数设定在每个匹配元素里面的末尾处插入内容。', function () {
        
    })

    it('.appendTo() - 将匹配的元素插入到目标元素的最后面（内部插入）。', function () {
        
    })

    it('.html() - 从集合的第一个匹配元素中获取HTML内容 或 设置每一个匹配元素的html内容。', function () {

        document.body.innerHTML = '<div>Goodbye</div>';

        expect($("div").html()).eql('Goodbye');
        expect($("div").html("string").html()).eql("string");

    })

    it('.prepend() - 将参数内容插入到每个匹配元素的前面（元素内部）。', function () {
        
    })

    it('.prependTo() - 将所有元素插入到目标前面（元素内）。', function () {
        
    })

    it('.text() - 得到匹配元素集合中每个元素的文本内容结合，包括他们的后代，或设置匹配元素集合中每个元素的文本内容为指定的文本内容。', function () {
        document.body.innerHTML = '<div>Goodbye</div>'
        expect($("div").text()).eql("Goodbye");
        expect($("div").text("test").text()).eql("test");
    })

})
