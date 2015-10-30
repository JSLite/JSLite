var jsdom = require('../setup.js');
var fs = require('fs');

jsdom({
    src: fs.readFileSync('./dist/JSLite.js', 'utf-8')
})

describe('Manipulation 此部分中所有的方法是一些操作DOM的方式。', function () {

    it('.add() - 添加元素到当前匹配的元素集合中。', function () {
   
    })

    it('.append() - 根据参数设定在每个匹配元素里面的末尾处插入内容。', function () {
        
        document.body.innerHTML = '<div class="jslite">Goodbye</div>';
        expect($("div")).to.have.property('append');
        expect($("div").append("dd").text()).to.equal('Goodbyedd');
        expect($("div").append(function(){return "wcj";}).text()).to.equal('Goodbyeddwcj');

    })

    it('.after() - 插入到标签结束标记后。（兄弟节点的下面）', function () {

        document.body.innerHTML = '<div>Goodbye</div>';
        expect($("div")).to.have.property('after');
        expect( $('div').after("dd") ).to.have.length.above(0);
        expect(document.body.innerHTML).to.equal('<div>Goodbye</div>dd');
        
    })

    it('.appendTo() - 将匹配的元素插入到目标元素的最后面（内部插入）。', function () {
        
        document.body.innerHTML = '<div>Goodbye</div>';
        expect($("div")).to.have.property('appendTo');
        expect( $('<div>test</div>').appendTo('div') ).to.have.length.above(0);
        expect(document.body.innerHTML).to.equal('<div>Goodbye<div>test</div></div>');
        expect( $("div").after(function(){return "wcj"}) ).to.have.length.above(1);
        expect(document.body.innerHTML).to.equal('<div>Goodbye<div>test</div>wcj</div>wcj');

    })

    it('.before() - 插入到标签开始前。', function () {
        
        document.body.innerHTML = '<input /><div class="jslite"><div>Goodbye</div></div>';
        expect($("div")).to.have.property('before');
        expect( $(".jslite div").before($('input')) ).to.have.length.above(0);  
        expect(document.body.innerHTML).to.equal('<div class="jslite"><input><div>Goodbye</div></div>');
        
    })

    it('.clone() - 通过深度克隆来复制集合中的所有元素。', function () {
        expect($("div")).to.have.property('clone');
        document.body.innerHTML = '<div class="jslite">Goodbye</div>';
        expect($('body').append($(".jslite").clone())).to.have.length.above(0);
        expect($('body').html()).to.equal('<div class="jslite">Goodbye</div><div class="jslite">Goodbye</div>');
    })

    it('.detach() - 被遗弃的方法(不建议使用)，作用跟remove一样，所有绑定的事件、附加的数据等都会保留下来。', function () {
        expect($("div")).to.have.property('detach');
        document.body.innerHTML = '<div>Goodbye</div>';
        expect($('div').detach()).to.have.length.above(0);
        expect($('div')).to.be.length.below(1);
        expect($('body').html() ).to.be.empty;
    })


    it('.empty() - 所有匹配节点对象集合中移除所有的dom子节点，不包括自己，清空内容。', function () {
        expect($("div")).to.have.property('empty');
        document.body.innerHTML = '<div>Goodbye</div>';
        expect($("div").empty()).to.have.length.above(0);
        expect($("div").html()).to.be.empty;
    })

    it('.html() - 从集合的第一个匹配元素中获取HTML内容 或 设置每一个匹配元素的html内容。', function () {

        expect($("div")).to.have.property('html');
        document.body.innerHTML = '<div>Goodbye</div>';
        expect($("div").html()).eql('Goodbye');
        expect($("div").html("string").html()).eql("string");
        expect($("body").html(function(){return '<div>test</div>'; })).to.have.length.below(2);
        expect($("body").html()).to.equal('<div>test</div>')

    })

    it('.prepend() - 将参数内容插入到每个匹配元素的前面（元素内部）。', function () {
        expect($("div")).to.have.property('prepend');
        document.body.innerHTML = '<div>Goodbye</div>';
        expect($("div").prepend("dd")).to.have.length.below(2);
        expect($("div").html()).to.equal('ddGoodbye')
        expect($("div").prepend(function(){return "asdfasdf"})).to.have.length.below(2);
        expect($("div").html()).to.equal('asdfasdfddGoodbye');
    })

    it('.prependTo() - 将所有元素插入到目标前面（元素内）。', function () {
        expect($("div")).to.have.property('prependTo');
        document.body.innerHTML = '<div>Goodbye</div>';
        expect($('<div>test</div>').prependTo('div')).to.have.length.below(2);
        expect($("div").html()).to.equal('<div>test</div>Goodbye');
    })

    it('.text() - 取得所有匹配节点对象的文本内容。', function () {
        expect($("div")).to.have.property('text');
        document.body.innerHTML = '<div>Goodbye</div>';
        expect($("div").text()).to.eql("Goodbye");
        expect($("div").text("test").text()).eql("test");
        expect($("div").text("test")).to.have.length.below(2);
    })


    it('.insertAfter() - 插入的对象集合中的元素到指定的每个元素后面的dom中。', function () {
        expect($("div")).to.have.property('insertAfter');
        document.body.innerHTML = '<div>Goodbye</div>';
        expect($('<p>test</p>').insertAfter('div')[0].outerHTML).to.equal('<p>test</p>');
        expect($('body').html()).to.equal('<div>Goodbye</div><p>test</p>');
    })

    it('.insertBefore() - 将生成的内容插入 selector 匹配的节点标签开始前。', function () {
        expect($("div")).to.have.property('insertBefore');
        document.body.innerHTML = '<div>Goodbye</div>';
        expect($('<p>test</p>').insertBefore('div')[0].outerHTML).to.equal('<p>test</p>');
        expect($('body').html()).to.equal('<p>test</p><div>Goodbye</div>');
    })

    it('.prepend() - 插入到标签开始标记之后（里面的第一个）。', function () {
        expect($("div")).to.have.property('prepend');
        document.body.innerHTML = '<div>Goodbye</div>';
        expect($("div").prepend("dd")[0].outerHTML).to.have.equal('<div>ddGoodbye</div>');
        expect($("div").prepend(function(){return "www";})[0].outerHTML).to.have.equal('<div>wwwddGoodbye</div>');
    })

    it('.prependTo() - 将生成的内容插入到匹配的节点标签开始标记之后。', function () {
        expect($("div")).to.have.property('prependTo');
        document.body.innerHTML = '<div>Goodbye</div>';
        expect($("<div>s</div>").prependTo("div")[0].outerHTML).to.have.equal('<div>s</div>');
        expect( $("body")[0].outerHTML ).to.have.equal('<body><div><div>s</div>Goodbye</div></body>');
    })

    it('.remove() - 删除所有匹配节点对象【自己】及所有【自己】里面的内容。', function () {
        expect($("div")).to.have.property('remove');
        document.body.innerHTML = '<div>Goodbye<span>ww</span></div>';
        expect($("div").remove('span')[0].outerHTML).to.have.equal('<span>ww</span>');
        expect($("div").remove()[0].outerHTML).to.have.equal('<div>Goodbye</div>');
        expect($('body')[0].outerHTML).to.have.equal('<body></body>');
    })

    it('.replaceWith() - 将所有匹配的元素替换成指定的HTML或DOM元素。', function () {
        expect($("div")).to.have.property('replaceWith');
        document.body.innerHTML = '<div>Goodbye</div>';
        expect($("div").replaceWith("<b>段落。</b>")).to.have.length.within(1,1)
        expect($('body')[0].outerHTML).to.have.equal('<body><b>段落。</b></body>')
    })

    // ==== 下列目前无法测试的样子。
    it('.unwrap() - 移除集合中每个元素的直接父节点，并把他们的子元素保留在原来的位置。', function () {
        expect($("div")).to.have.property('unwrap');
        document.body.innerHTML = '<div class="jslite"><p>Goodbye<span>sss</span></p></div>';
        expect($('span').unwrap()[0].outerHTML).to.have.equal('<span>sss</span>');
        // expect($('div')[0].outerHTML).to.have.equal('<span>sss</span>');
        // expect($('div')).to.have.length.within(0,0);
        // $('span').unwrap()
        
    })


})