var jsdom = require('../setup.js');
var assert = require('chai').assert;
var fs = require('fs');

jsdom({
    src: fs.readFileSync('./dist/JSLite.js', 'utf-8')
})

describe('Array 数组对象操作', function () {

    it('$.intersect() - 数组交集。', function () {
        assert.isArray($.intersect([1,2,3,'asdkjf'],[2,3,6,'asdkjf']));
        assert.include($.intersect([1,2,3,'asdkjf'],[2,3,6,'asdkjf']), 3);
        assert.sameMembers($.intersect([1,2,3,'asdkjf'],[2,3,6,'asdkjf']), [ 2, 3, 'asdkjf'] );
    })

    it('$.unique() - 删除数组中重复元素。', function () {
        assert.sameMembers($.unique([1,2,12,3,2,1,2,1,1,1,1]), [1, 2, 12, 3] );
        assert.include($.unique([1,2,12,3,2,1,2,1,1,1,1]), 12);
        document.body.innerHTML = '<div class="intro"></div>';
        var arr = $('div').concat($('div'));
        assert.lengthOf($.unique(arr), 1);
    })
    
    it('$.slice() - array中提取的方法。从start开始，如果end 指出。提取不包含end位置的元素。 ', function () {
        document.body.innerHTML = '<input type="checkbox" /><input type="text" /><input type="button" />';
        assert.lengthOf($("input").slice(0,1), 1);
        assert.isArray($("input").slice(0,1));
        expect($("input").slice(0,1)[0].outerHTML).to.equal('<input type="checkbox">');
    })
    // 由于isDocument无法判断目前无法测试
    it('$.sibling() - 根据类型获取节点对象属性的集合 (node,type)。', function () {
        document.body.innerHTML = '<input type="checkbox" /><input type="text" /><input type="button" />';
        // console.log("message1:",$("input"));
        // console.log("message2:",$.sibling($("input"),"type"));
        // assert.include($.sibling($("input"),"type"), 3);
    })

})