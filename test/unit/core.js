describe('core ', function () {
    
    it('$.trim() - 去掉字符串起始和结尾的空格。', function () {
        var str = '  JSLite官网  '
        expect($.trim(str)).to.equal('JSLite官网');
    })
    
    it('$.grep() - 使用过滤函数过滤数组元素。', function () {
        var arr = $.grep( [0,1,2], function(n,i){return n != 0; })
        assert.typeOf(arr, 'array');
        assert.include(arr, 1)
        assert.notInclude(arr, 0)
        assert.lengthOf(arr, 2)

    })
    
    it('$.parseJSON() - 与 JSON.parse 方法相同。', function () {
        var json = '{"name":"JSLite"}'
        json = $.parseJSON(json)
        assert.typeOf(json, 'object');
        assert.deepEqual(json,{"name":"JSLite"})
        assert.equal(json.name,'JSLite')
    })

    
    it('.length - 对象中元素的个数。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="jslite">Goodbye</div>';
        assert.equal($('#test div').length, 1);
    })


    it('$.noConflict() - 放弃 JSLite 控制的$ 变量。', function () {

        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="jslite">Goodbye</div>';

        JSLite.noConflict();
        JSLite(document).ready(function($) {
            assert.equal($('#test div').length, 1);
            assert.ok($, '$对象不存在');
        });
        assert.notOk($, '$对象不存在');
        var $ = JSLite.noConflict();
        assert.ok($, '$对象不存在');
        elm.innerHTML = '';

    })

})