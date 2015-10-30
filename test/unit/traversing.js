var jsdom = require('../setup.js');
var fs = require('fs');

jsdom({
    src: fs.readFileSync('./dist/JSLite.js', 'utf-8')
})

describe('traversing 遍历', function () {

    it('.children() - 获得每个匹配元素集合元素的直接子元素(可以带上滤选择器)。', function () {

    })

    it('.closest() - 获得每个匹配元素集合元素的子元素，包括文字和注释节点。', function () {

    })

    it('.find() - 后代节点的集合(可以带上滤选择器)。', function () {

    })

    it('.first() - 获取当前对象集合中的第一个元素。 first() ⇒ collection', function () {

    })

    it('.parent() - 对象集合中每个元素的直接父元素。', function () {

    })

    it('.parents() - 获取对象集合每个元素所有的祖先元素（不包含根元素）。', function () {

    })

    it('.siblings() - 获取对此对象【其它】所有兄弟对象(可以带上滤选择器)。', function () {

    })

})