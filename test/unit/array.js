describe('Array 数组对象操作', function () {

    it('$.intersect() - 数组交集。', function () {
        assert.isArray($.intersect([1,2,3,'asdkjf'],[2,3,6,'asdkjf']));
        assert.include($.intersect([1,2,3,'asdkjf'],[2,3,6,'asdkjf']), 3);
        assert.sameMembers($.intersect([1,2,3,'asdkjf'],[2,3,6,'asdkjf']), [ 2, 3, 'asdkjf'] );
    })

    it('$.unique() - 删除数组中重复元素。', function () {
        assert.sameMembers($.unique([1,2,12,3,2,1,2,1,1,1,1]), [1, 2, 12, 3] );
        assert.include($.unique([1,2,12,3,2,1,2,1,1,1,1]), 12);
        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="intro"></div>';
        var arr = $('#test').concat($('#test'));
        assert.lengthOf($.unique(arr), 1);
    })
    
    it('$.slice() - array中提取的方法。从start开始，如果end 指出。提取不包含end位置的元素。 ', function () {
        var elm = document.getElementById("test");
            elm.innerHTML = '<input type="checkbox" /><input type="text" /><input type="button" />';
        assert.lengthOf($("#test input").slice(0,1), 1);
        assert.isArray($("#test input").slice(0,1));
        expect($("#test input").slice(0,1)[0].outerHTML).to.equal('<input type="checkbox">');
    })

    it('$.sibling() - 根据类型获取节点对象属性的集合 (node,type)。', function () {
        var elm = document.getElementById("test");

        assert.lengthOf($.sibling($("#test input"),"type"), 3);
        assert.lengthOf($.sibling($("#test input"),"tagName"), 1);
        elm.innerHTML = '';
        
    })

})