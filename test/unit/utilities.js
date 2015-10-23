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

})