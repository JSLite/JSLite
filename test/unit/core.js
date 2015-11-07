describe('core ', function () {
    
    it('$.trim() - 去掉字符串起始和结尾的空格。', function () {
        assert.equal($.trim('hello JSLite.  '),'hello JSLite.')
        assert.equal($.trim('  hello JSLite.  '),'hello JSLite.')
    })

    it('$.noConflict() - 放弃 JSLite 控制的$ 变量。', function () {
        $.noConflict();
        JSLite(document).ready(function($) {
            assert.property($,'noConflict');
        });
        assert.isUndefined($)
        $ = JSLite.noConflict();
        assert.isFunction($)
        assert.property($,'noConflict');
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
        elm.innerHTML = '';
    })


})