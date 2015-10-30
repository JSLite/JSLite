
var jsdom = require('../setup.js');
var fs = require('fs');

jsdom({
    src: fs.readFileSync('./dist/JSLite.js', 'utf-8')
})

describe('attributes 获取和设置页面元素的 DOM 属性。', function () {

    it('.attr() - 获取匹配的元素集合中的第一个元素的属性的值 或 设置每一个匹配元素的一个或多个属性。', function () {

        document.body.innerHTML = '<div class="jslite">Goodbye</div><input class="yaotaiyang" id="check2" type="checkbox"><input class="taiyang" id="check1" type="checkbox" checked="checked">';
        expect($(".jslite")).to.have.property('attr');
        expect($(".jslite").attr({"style":"background:red"})[0]).to.have.deep.property('style.backgroundColor','red');
        expect($("#check1").attr("checked")).to.equal('checked');
        expect($("#check2").attr("checked")).to.be.false;
        expect($("div").attr('class')).to.equal('jslite');

    })

    it('.html() - 从集合的第一个匹配元素中获取HTML内容 或 设置每一个匹配元素的html内容。', function () {

        expect($("div")).to.have.property('html');
        document.body.innerHTML = '<div>Goodbye</div>';
        expect($("div").html()).eql('Goodbye');
        expect($("div").html("string").html()).eql("string");
        expect($("body").html(function(){return '<div>test</div>'; })).to.have.length.below(2);
        expect($("body").html()).to.equal('<div>test</div>')

    })

    it('.text() - 取得所有匹配节点对象的文本内容。', function () {

        expect($("div")).to.have.property('text');
        document.body.innerHTML = '<div>Goodbye</div>';
        expect($("div").html()).eql('Goodbye');
        expect($("div").html("string").html()).eql("string");
        expect($("body").html(function(){return '<div>test</div>'; })).to.have.length.below(2);
        expect($("body").html()).to.equal('<div>test</div>')

    })

    it('.prop() - 获取匹配的元素集中的第一个元素的属性（property）值或设置每一个匹配元素的一个或多个属性。', function () {

        document.body.innerHTML = '<div class="jslite">Goodbye</div><input class="yaotaiyang" id="check2" type="checkbox"><input class="taiyang" id="check1" type="checkbox" checked="checked">';
        expect($("div")).to.have.property('prop');
        expect($("#check1").prop("checked")).to.be.true;
        expect($("#check2").prop("checked")).to.be.false;
        expect($("div").prop("className",function(index,oldvalue){return "222"})[0]).to.have.property('className','222');
        expect($("div").prop("jslites",'www')[0]).to.have.property('jslites','www');
    })


    it('.removeAttr() - 为匹配的元素集合中的每个元素中移除一个属性。', function () {

        document.body.innerHTML = '<div class="jslite">Goodbye</div>';
        expect($("div")).to.have.property('removeAttr');
        expect($("div").removeAttr("class")).to.be.have.length.above(0);
        expect($("div").attr('class')).to.be.null;

    })

    it('.removeProp() - 为集合中匹配的元素删除一个属性（property）。', function () {

        document.body.innerHTML = '<div class="jslite">Goodbye</div>';
        expect($("div")).to.have.property('removeProp');
        expect($('div').prop("prop_a", "CodePlayer").removeProp('prop_a').prop("prop_a")).to.be.undefined;

    })

    it('.val() - 获取设置input的 value 。', function () {
        document.body.innerHTML = '<input type="text" value="jslite">';
        expect($("input")).to.have.property('val');
        expect($("input").val()).equal('jslite');
        expect($("input").val('jslite').val()).to.equal('jslite');

    })

    it('.pluck() -获取对象集合中每一个元素的属性值。', function () {
        
    })

    it('.is() - 获取设置input的 value 。', function () {

    })

})