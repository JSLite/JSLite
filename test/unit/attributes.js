var jsdom = require('../setup.js');
var fs = require('fs');

jsdom({
    src: fs.readFileSync('./dist/JSLite.js', 'utf-8')
})

describe('Attributes 获取和设置页面元素的 DOM 属性。', function () {

    it('.addClass() - 为每个匹配的元素添加指定的样式类名。', function () {
        document.body.innerHTML = '<div>Goodbye</div>';
        expect($("div").addClass('jslite').attr("class")).to.equal('jslite');
        expect($("div").addClass(function(){return 'wcj'}).attr("class")).to.equal('jslite wcj');
        expect($("div").addClass(function(){return 'wcjto'}).attr("class")).to.contain('wcjto'); 
    })

    it('.attr() - 获取匹配的元素集合中的第一个元素的属性的值 或 设置每一个匹配元素的一个或多个属性。', function () {
        document.body.innerHTML = '<div class="jslite">Goodbye</div><input class="yaotaiyang" id="check2" type="checkbox"><input class="taiyang" id="check1" type="checkbox" checked="checked">';
        expect($(".jslite").attr({"style":"background:red"}).attr('style')).to.equal("background:red");
        expect($("#check1").attr("checked")).to.equal('checked');
        expect($("#check2").attr("checked")).to.be.false;
        expect($("div").attr('class')).to.equal('jslite');
    })

    it('.hasClass() - 确定任何一个匹配元素是否有被分配给定的（样式）类。', function () {
        document.body.innerHTML = '<div class="jslite">Goodbye</div>';
        expect($("div").hasClass('jslite')).to.be.true;
    })

    it('.prop() - 获取匹配的元素集中的第一个元素的属性（property）值或设置每一个匹配元素的一个或多个属性。', function () {
        document.body.innerHTML = '<div class="jslite">Goodbye</div><input class="yaotaiyang" id="check2" type="checkbox"><input class="taiyang" id="check1" type="checkbox" checked="checked">';
        expect($("#check1").prop("checked")).to.be.true;
        expect($("#check2").prop("checked")).to.be.false;
    })

    it('.removeAttr() - 为匹配的元素集合中的每个元素中移除一个属性。', function () {
        document.body.innerHTML = '<div class="jslite">Goodbye</div>';
        expect($("div").removeAttr("class").attr('class')).to.be.null;
    })

    it('.removeClass() - 移除集合中每个匹配元素上一个，多个或全部样式。', function () {
        document.body.innerHTML = '<div class=" jslite classname">Goodbye</div>';
        expect($("div").removeClass("classname").attr('class')).to.equal('jslite');
        expect($("div").removeClass().attr('class')).to.empty;
    })

    it('.removeProp() - 为集合中匹配的元素删除一个属性（property）。', function () {
        document.body.innerHTML = '<div class="jslite">Goodbye</div>';
        expect($('div').prop("prop_a", "CodePlayer").removeProp('prop_a').prop("prop_a")).to.be.undefined;        
    })

    it('.toggleClass() - 在匹配的节点对象集合中的每个节点对象上添加或删除一个或多个样式类。', function () {
        
        document.body.innerHTML = '<div class="jslite">Goodbye</div>';
        expect($("div").toggleClass('box1 box2').attr('class')).to.equal('jslite box1 box2');
        expect($("div").toggleClass('box1 box2').attr('class')).to.equal('jslite');
        expect($("div").toggleClass(function(){return "wcj"}).attr('class')).to.equal('jslite wcj');
    })

})