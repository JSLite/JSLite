var jsdom = require('../setup.js');
var fs = require('fs');

jsdom({
    src: fs.readFileSync('./dist/JSLite.js', 'utf-8')
})

describe('Array 数组对象操作', function () {

    it('$.intersect() - 数组交集。', function () {

    })

    it('$.unique() - 删除数组中重复元素。', function () {

    })

    it('$.sibling() - 根据类型获取节点对象属性的集合 (node,type)。', function () {

    })
    
    it('$.sibling() - 根据类型获取节点对象属性的集合 (node,type)。', function () {

    })
    
    it('$.slice() - array中提取的方法。从start开始，如果end 指出。提取不包含end位置的元素。 ', function () {

    })

})