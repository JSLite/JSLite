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
    })

    it('.attr() - 获取匹配的元素集合中的第一个元素的属性的值 或 设置每一个匹配元素的一个或多个属性。', function () {
        document.body.innerHTML = '<div class="jslite">Goodbye</div>';
        // console.log("www:",$("div").attr("style"))
        // expect($("div").attr("style","color:#red").css('color')).to.equal("rgb(255, 255, 0)");
        expect($("div").attr('class')).to.equal('jslite');
    })

    it('.hasClass() - 确定任何一个匹配元素是否有被分配给定的（样式）类。', function () {
        
    })

    it('.prop() - 获取匹配的元素集中的第一个元素的属性（property）值或设置每一个匹配元素的一个或多个属性。', function () {
        
    })

    it('.removeAttr() - 为匹配的元素集合中的每个元素中移除一个属性。', function () {
        
    })

    it('.removeClass() - 移除集合中每个匹配元素上一个，多个或全部样式。', function () {
        
    })

    it('.removeProp() - 为集合中匹配的元素删除一个属性（property）。', function () {
        
    })

    it('.toggleClass() - 在匹配的元素集合中的每个元素上添加或删除一个或多个样式类,取决于这个样式类是否存在或价值切换属性。', function () {
        
    })

})