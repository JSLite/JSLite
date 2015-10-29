var jsdom = require('../setup.js');
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

    it('$.isFunction: 判断对象是否为函数【function】。', function(){
        document.body.innerHTML = '';
        expect($.isFunction(function(){})).to.be.true;
    })

    it('$.isObject: 判断对象是否为函数【function】。', function(){
        document.body.innerHTML = '';
        expect($.isObject({})).to.be.true;
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
    })

    it('$.isString: 判断是否为【字符串】。', function(){
        document.body.innerHTML = '';
        expect($.isString('字符串')).to.be.true;
        expect($.isString({})).to.be.false;
    })

    it('$.isJson: 判断是否为JSON对象。', function(){
        document.body.innerHTML = '';
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

    // 暂时无法测试
    it('$.isDocument: 判断对象是否为【document】。', function(){
        document.body.innerHTML = '';
        // console.log("window.constructor:",window.document)
        // console.log("window.DOCUMENT_NODE:",$.isDocument(window.document))
        // console.log("window.DOCUMENT_NODE:",$.isDocument(window))
        // expect($.isDocument(document)).to.be.true;
        // expect($.isDocument(window)).to.be.false;
    })

})