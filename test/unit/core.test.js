describe('core ', function () {

    it('$.isFunction: 判断对象是否为函数【function】。', function(){
        expect($.isFunction(function(){})).to.be.true;
    })

    it('$.isObject: 判断是否为 `Object` 。', function(){
        expect($.isObject({})).to.be.true;
        expect($.isObject([])).to.be.false;
        expect($.isObject(1)).to.be.false;
        expect($.isObject("2323")).to.be.false;
    })

    it('$.isPlainObject: 判断是否为 Object 。', function(){
        expect($.isPlainObject(new Object())).to.be.true;
        expect($.isPlainObject(new Date())).to.be.false;
        expect($.isPlainObject(window)).to.be.false;
    })

    it('$.isArray: 判断是否为【数组】。', function(){
        expect($.isArray([1,2,3])).to.be.true;
        expect($.isArray({})).to.be.false;
        expect($.isArray(function(){})).to.be.false;
    })

    it('$.isString: 判断是否为【字符串】。', function(){
        expect($.isString('字符串')).to.be.true;
        expect($.isString({})).to.be.false;
        expect($.isString(123)).to.be.false;
        expect($.isString(function(){})).to.be.false;
    })

    it('$.isDocument: 判断对象是否为【document】。', function(){
        expect($.isDocument(document)).to.be.true;
        expect($.isDocument(window)).to.be.true;
        expect($.isDocument(document.documentElement)).to.be.false;
    })

    it('$.isWindow: 确定参数是否为一个窗口（window对象）。', function(){
        expect($.isWindow(window)).to.be.true;
        expect($.isWindow({})).to.be.false;
        expect($.isWindow(function(){})).to.be.false;
    })

    it('$.type() - 获取JavaScript 对象的类型。', function () {
        expect($.type(true)).to.equal('boolean');
        expect($.type("div")).to.equal('string');
        expect($.type(123)).to.equal('number');
        expect($.type({})).to.equal('object');
        expect($.type(function(){})).to.equal('function');
        expect($.type(undefined)).to.equal('undefined');
        expect($.type(new RegExp())).to.equal("regexp");
        expect($.type(new Date())).to.equal("date");
    })

    it('each: 遍历一个 JSLite 集合对象，为每一个匹配元素执行一个函数。', function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<span></span><span></span><span></span>';
        var $span = $("#test span").each(function(idx,itm){
            this.className = "test" + idx;
            expect(itm.tagName).to.equal('SPAN');
        });
        expect($span).to.have.length(3);
        expect($span[0].outerHTML).to.equal('<span class="test0"></span>');
        elm.innerHTML = '';
    })

    it('$.each() - 通用例遍方法，可用于例遍对象和数组', function () {
        var newarr = $.each(['a', 'b', 'c'], function(idx, item){
            assert.isNumber(idx, '不是数字！')
            assert.isString(item, '不是字符串！')
            idx === 0 && assert.equal(item,'a')
            idx === 1 && assert.equal(item,'b')
            idx === 3 && assert.equal(item,'c')
        })
        assert.lengthOf(newarr,3)
        assert.include(newarr,'a')
        assert.isArray(newarr)
        var newarr = $.each({"a":"ww","b":"JSLite"}, function( key,val){
            key === 'a' && assert.equal(val,'ww')
            key === 'b' && assert.equal(val,'JSLite')
        })
        assert.deepEqual(newarr, {"a":"ww","b":"JSLite"});
    })
    
    it('$.trim() - 去掉字符串起始和结尾的空格。', function () {
        assert.equal($.trim('hello JSLite.  '),'hello JSLite.')
        assert.equal($.trim('  hello JSLite.  '),'hello JSLite.')
    })

    it('$.inArray: 搜索数组中指定的值并返回它的索引（如果未找到返回-1）数字。', function(){
        var arr = [ 4, "Pete", 8, "John" ];
        assert.equal($.inArray("John", arr), '3');
        assert.equal($.inArray(4, arr), '0');
        assert.equal($.inArray("David", arr), -1);
        assert.equal($.inArray("Pete", arr, 1), 1);
    })

    it('$(document).ready() - 当DOM载入就绪可以查询及操纵时绑定一个要执行的函数。', function () {
        var a = 3;
        var ready = $(document).ready(function(){++a; });
        assert.equal(a, 4);
        assert.equal(ready.length, 1);
        assert.equal(ready[0], window.document);

        ready = $(function(){++a;});

        assert.equal(a, 5);
        assert.equal(ready.length, 1);
        assert.equal(ready[0], window.document);
    })

    it('$.extend: 通过源对象扩展目标对象的属性。', function(){
        $.extend({
            min: function(a, b) { return a < b ? a : b; },
            max: function(a, b) { return a > b ? a : b; }
        });
        expect($.min(2,3)).to.equal(2);
        expect($.max(4,5)).to.equal(5);
    })

})