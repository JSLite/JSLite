var jsdom = require('../setup.js');
var assert = require('chai').assert;
var fs = require('fs');


jsdom({
    src: fs.readFileSync('./dist/JSLite.js', 'utf-8')
})

describe('utilities 实用工具', function (done) {

    it('data: 读取或写入dom的 data-* 属性。', function (done) {
        require( "./polyfill-jsdom" );

        document.body.innerHTML = '<div class="intro"></div><input type="text"/>';
        expect($('div').data('name',{"sss":1})).to.have.length.within(1,1);
        expect($('div').data()).to.eql({"name":"{\"sss\":1}"});
        expect($('div').data('name')).to.eql({ sss: 1 }); 
        expect($('div').data('names',[1,2,3,4]) ).to.have.length.within(1,1);
        expect($('div').data('names')).to.include(4); 
        done()
    })

    it('each: 遍历一个 JSLite 集合对象，为每一个匹配元素执行一个函数。', function(){
        document.body.innerHTML = '<img src="1.jpg" /><img src="2.jpg" /><img src="3.jpg" />';
        var $img = $("img").each(function(i){this.src = "test" + i + ".jpg"; });
        expect($img).to.have.length.within(3,3);
        expect($img[0].outerHTML ).to.equal('<img src="test0.jpg">');
    })

    it('$.map: 通过遍历集合中的节点对象，通过函数返回一个新的数组。', function(){
        document.body.innerHTML = '';
        var $arr = $.map({"w":1,"c":2,"j":3},function(idx,item){return item });
        expect($arr).to.have.length.within(3,3);
        expect($arr[0]).to.equal('w');
    })

    it('$.isFunction: 判断对象是否为函数【function】。', function(){
        document.body.innerHTML = '';
        expect($.isFunction(function(){})).to.be.true;
    })

    it('$.isObject: 判断是否为 `Object` 。', function(){
        document.body.innerHTML = '';
        expect($.isObject({})).to.be.true;
        expect($.isObject([])).to.be.false;
        expect($.isObject(1)).to.be.false;
        expect($.isObject("2323")).to.be.false;
    })

    it('$.isPlainObject: 判断是否为 Object 。', function(){
        document.body.innerHTML = '';
        expect($.isPlainObject(new Object())).to.be.true;
        expect($.isPlainObject(new Date())).to.be.false;
        expect($.isPlainObject(window)).to.be.false;
    })

    it('$.isArray: 判断是否为【数组】。', function(){
        document.body.innerHTML = '';
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
        document.body.innerHTML = '';
        expect($.isWindow(window)).to.be.true;
        expect($.isWindow({})).to.be.false;
        expect($.isWindow(function(){})).to.be.false;
    })

    it('$.type() - 获取JavaScript 对象的类型。', function () {
        expect($.type(true)).to.equal('Boolean');
        expect($.type("div")).to.equal('String');
        expect($.type(123)).to.equal('Number');
        expect($.type({})).to.equal('Object');
        expect($.type(function(){})).to.equal('Function');
        expect($.type(undefined)).to.equal(undefined);
        expect($.type(new RegExp())).to.equal("RegExp");
        expect($.type(new Date())).to.equal("Date");
    })
    // 暂时无法测试
    it('.is() - 判断当前匹配的元素集合中的元素，是否为一个选择器，DOM元素。', function () {
        document.body.innerHTML = '<div id="box"></div>';
        // console.log("message:",$('div').is('div'));
        // expect($('#box').is('div')).to.be.true;

    })

    // 暂时无法测试 element.webkitMatchesSelector 不存在
    it('$.isDocument: 判断对象是否为【document】。', function(){
        document.body.innerHTML = '';
        // console.log("window.constructor:",window.document)
        // console.log("window.DOCUMENT_NODE:",$.isDocument(window.document))
        // console.log("window.DOCUMENT_NODE:",$.isDocument(window))
        // expect($.isDocument(document)).to.be.true;
        // expect($.isDocument(window)).to.be.false;
    })

    it('$.extend: 通过源对象扩展目标对象的属性。', function(){
        document.body.innerHTML = '';
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

})