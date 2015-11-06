describe('core ', function () {

    it('$.noConflict() - 放弃 JSLite 控制的$ 变量。', function () {


    })
    
    it('$.trim() - 去掉字符串起始和结尾的空格。', function () {
        var str = '  JSLite官网  '
        expect($.trim(str)).to.equal('JSLite官网');
    })
    
    it('$.grep() - 使用过滤函数过滤数组元素。', function () {


    })
    
    it('$.parseJSON() - 与 JSON.parse 方法相同。', function () {


    })

    
    it('.length - 对象中元素的个数。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="jslite">Goodbye</div>';
        assert.equal($('#test div').length, 1);
    })


})