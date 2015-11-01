describe('core ', function () {

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
    
    it('$.trim() - 去掉字符串起始和结尾的空格。', function () {

        assert.equal($.trim('hello JSLite.  '),'hello JSLite.')
        assert.equal($.trim('  hello JSLite.  '),'hello JSLite.')

    })
    
    it('$.grep() - 使用过滤函数过滤数组元素。', function () {

        assert.notInclude($.grep( [0,1,2], function(n,i){return n != 0;}),0)

    })
    
    it('$.parseJSON() - 与 JSON.parse 方法相同。', function () {
        var json = '{ "tea": { "green": "matcha" }}'
        assert.propertyNotVal($.parseJSON(json), 'tea');
        assert.deepPropertyVal($.parseJSON(json), 'tea.green', 'matcha');
    })

    
    it('.length - 对象中元素的个数。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div class="jslite">Goodbye</div><div></div>';

        assert.equal($('#test div').length,2)
        elm.innerHTML = ''

    })


})