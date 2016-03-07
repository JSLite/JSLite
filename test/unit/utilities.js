

describe('utilities 实用工具', function (done) {

    it('data: 读取或写入dom的 data-* 属性。', function () {
        var elm = document.getElementById("test").innerHTML = '<div class="intro"></div>';
        expect($('div.intro').data('name',{"sss":1})).to.have.length.within(1,1);
        expect($('div.intro').data()).to.eql({"name":"{\"sss\":1}"});
        expect($('div.intro').data('name')).to.eql({ sss: 1 });
        expect($('div.intro').data('names',[1,2,3,4]) ).to.have.length.within(1,1);
        expect($('div.intro').data('names')).to.include(4);
    })

    it('each: 遍历一个 JSLite 集合对象，为每一个匹配元素执行一个函数。', function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<span></span><span></span><span></span>';
        var $span = $("#test span").each(function(i){this.className = "test" + i; });
        expect($span).to.have.length(3);
        expect($span[0].outerHTML).to.equal('<span class="test0"></span>');
        elm.innerHTML = '';
    })

    it('$.map: 通过遍历集合中的节点对象，通过函数返回一个新的数组。', function(){
        var $arr = $.map({"w":1,"c":2,"j":3},function(idx,item){return item });
        expect($arr).to.have.length.within(3,3);
        expect($arr[0]).to.equal('w');
    })

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

    it('$.inArray: 判断是否为【数组】。', function(){
        var arr = [ 4, "Pete", 8, "John" ];
        assert.equal($.inArray("John", arr), '3');
        assert.equal($.inArray(4, arr), '0');
        assert.equal($.inArray("David", arr), -1);
        assert.equal($.inArray("Pete", arr, 2), 1);
    })

    it('$.isString: 判断是否为【字符串】。', function(){
        expect($.isString('字符串')).to.be.true;
        expect($.isString({})).to.be.false;
        expect($.isString(123)).to.be.false;
        expect($.isString(function(){})).to.be.false;
    })

    it('$.likeArray: 判断对象是否为数组或者是字符。', function(){
        expect($.likeArray([1,2,3]) ).to.be.true;
        expect($.likeArray("222") ).to.be.true;
        expect($.likeArray({}) ).to.be.false;
        expect($.likeArray(123) ).to.be.false;
    })

    it('$.isJson: 判断是否为JSON对象。', function(){
        expect($.isJson({})).to.be.true;
        expect($.isJson([])).to.be.false;
        expect($.isJson('ss')).to.be.false;
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
    // 暂时无法测试
    it('.is() - 判断当前匹配的元素集合中的元素，是否为一个选择器，DOM元素。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<span></span><span></span><span></span>';
        expect($('#test').is('div')).to.be.true;
        expect($('#test').is('#test')).to.be.true;
        expect($('#test').is('#boxss')).to.be.false;
        expect($('#test').is(elm)).to.be.true;
    })

    it('$.isDocument: 判断对象是否为【document】。', function(){
        expect($.isDocument(document)).to.be.true;
        expect($.isDocument(window)).to.be.true;
        expect($.isDocument(document.documentElement)).to.be.false;
    })

    it('$.extend: 通过源对象扩展目标对象的属性。', function(){
        $.extend({
            min: function(a, b) { return a < b ? a : b; },
            max: function(a, b) { return a > b ? a : b; }
        });
        expect($.min(2,3)).to.equal(2);
        expect($.max(4,5)).to.equal(5);
    })

    it('$.now: 返回一个数字，表示当前时间。', function(){
        assert.isNumber($.now(),'返回错误');
    })

    it('$.contains  parent是否包含node节点对象。',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<div>这是 div 元素中的文本。</div>';
        expect($.contains($("#test")[0],$("#test div")[0])).to.be.true;
    })

    it('$.matches  如果当前节点能被指定的css选择器查找到，则返回true，否则返回false。',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<div id="box"></div>';
        expect($.matches($("#test #box")[0], "#box")).to.be.true;
        elm.innerHTML = ''
    })

})