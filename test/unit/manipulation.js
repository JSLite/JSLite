var jsdom = require('../setup.js');
var fs = require('fs');

jsdom({
    src: fs.readFileSync('./dist/JSLite.js', 'utf-8')
})

describe('Manipulation 此部分中所有的方法是一些操作DOM的方式。', function () {

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


    it('.append() - 根据参数设定在每个匹配元素里面的末尾处插入内容。', function () {
        
    })

    it('.after() - 插入到标签结束标记后。（兄弟节点的下面）', function () {
        
    })

    it('.appendTo() - 将匹配的元素插入到目标元素的最后面（内部插入）。', function () {
        
    })

    it('.before() - 插入到标签开始前。', function () {
        
    })

    it('.clone() - 通过深度克隆来复制集合中的所有元素。', function () {
        
    })

    it('.css() - 获取或设置节点对象的style样式内容。', function () {
        
    })

    it('.detach() - 被遗弃的方法(不建议使用)，作用跟remove一样，所有绑定的事件、附加的数据等都会保留下来。', function () {
        
    })


    it('.empty() - 所有匹配节点对象集合中移除所有的dom子节点，不包括自己，清空内容。', function () {
        
    })

    it('.html() - 从集合的第一个匹配元素中获取HTML内容 或 设置每一个匹配元素的html内容。', function () {

        document.body.innerHTML = '<div>Goodbye</div>';
        expect($("div").html()).eql('Goodbye');
        expect($("div").html("string").html()).eql("string");

    })

    it('.prepend() - 将参数内容插入到每个匹配元素的前面（元素内部）。', function () {
        
    })

    it('.prependTo() - 将所有元素插入到目标前面（元素内）。', function () {
        
    })

    it('.text() - 取得所有匹配节点对象的文本内容。', function () {

        document.body.innerHTML = '<div>Goodbye</div>';
        expect($("div").text()).eql("Goodbye");
        expect($("div").text("test").text()).eql("test");
        
    })

    it('.height() - 获取对象象集合中第一个元素的高，或设置对象集合所有元素的高。', function () {
        
    })

    it('.insertAfter() - 插入的对象集合中的元素到指定的每个元素后面的dom中。', function () {
        
    })

    it('.insertBefore() - 将生成的内容插入 selector 匹配的节点标签开始前。', function () {
        
    })

    it('.offset() - 获得当前元素相对于document的位置。', function () {
        
    })

    it('.prepend() - 插入到标签开始标记之后（里面的第一个）。', function () {
        
    })

    it('.prependTo() - 将生成的内容插入到匹配的节点标签开始标记之后。', function () {
        
    })

    it('.remove() - 删除所有匹配节点对象【自己】及所有【自己】里面的内容。', function () {
        
    })

    it('.replaceWith() - 将所有匹配的元素替换成指定的HTML或DOM元素。', function () {
        
    })

    it('.scrollLeft() - 获取匹配的元素集合中第一个元素的当前水平滚动条的位置。', function () {
        
    })

    it('.scrollTop() - 获取匹配的元素集合中第一个元素的当前垂直滚动条的位置。', function () {
        
    })

    it('.unwrap() - 移除集合中每个元素的直接父节点，并把他们的子元素保留在原来的位置。', function () {
        
    })

    it('.val() - 获取设置input的 value 。', function () {
        
    })

    it('.width() - 获取对象象集合中第一个元素的宽，或设置对象集合所有元素的宽。', function () {
        
    })


})