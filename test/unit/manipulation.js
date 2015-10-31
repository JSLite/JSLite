describe('Manipulation 此部分中所有的方法是一些操作DOM的方式。', function () {

    it('.add() - 添加元素到当前匹配的元素集合中。', function () {
   
    })

    it('.append() - 根据参数设定在每个匹配元素里面的末尾处插入内容。', function () {
        
        var elm = document.getElementById("test")
            elm.innerHTML = '<div class="jslite">Goodbye</div>';
        expect($("#test div.jslite")).to.have.property('append');
        expect($("#test div.jslite").append("dd").text()).to.equal('Goodbyedd');
        expect($("#test div.jslite").append(function(){return "wcj";}).text()).to.equal('Goodbyeddwcj');

    })

    it('.after() - 插入到标签结束标记后。（兄弟节点的下面）', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div>Goodbye</div>';
        expect($("#test div")).to.have.property('after');
        expect($("#test div").after("dd")).to.have.length.above(0);
        expect($('#test')[0].outerHTML).to.equal('<div id="test"><div>Goodbye</div>dd</div>');
        
    })

    it('.appendTo() - 将匹配的元素插入到目标元素的最后面（内部插入）。', function () {
        
        var elm = document.getElementById("test")
            elm.innerHTML = '<div>Goodbye</div>';
        expect($("#test")).to.have.property('appendTo');
        expect($('<div>test</div>').appendTo('#test') ).to.have.length.above(0);
        expect($('#test')[0].outerHTML).to.equal('<div id="test"><div>Goodbye</div><div>test</div></div>');
        expect($("#test div").after(function(){return "wcj"}) ).to.have.length.above(0);
        expect($("#test")[0].innerHTML).to.equal('<div>Goodbye</div>wcj<div>test</div>wcj');

    })

    it('.before() - 插入到标签开始前。', function () {
        
        var elm = document.getElementById("test")
            elm.innerHTML = '<input type="text"/><div class="jslite"><div>Goodbye</div></div>';
        expect($("div")).to.have.property('before');
        expect($("#test .jslite div").before($('input')) ).to.have.length.above(0);  
        expect($("#test")[0].outerHTML).to.equal('<div id="test"><div class="jslite"><input type="text"><div>Goodbye</div></div></div>');
        
    })

    it('.clone() - 通过深度克隆来复制集合中的所有元素。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div class="jslite">Goodbye</div>';
        expect($("div")).to.have.property('clone');
        expect($('#test').append($(".jslite").clone())).to.have.length.above(0);
        expect($('#test').html()).to.equal('<div class="jslite">Goodbye</div><div class="jslite">Goodbye</div>');

    })

    it('.detach() - 被遗弃的方法(不建议使用)，作用跟remove一样，所有绑定的事件、附加的数据等都会保留下来。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<p>Goodbye</p><div>String</div>';
        var div = $('#test p').detach()
        expect($("div")).to.have.property('detach');
        expect(div).to.have.length.above(0);
        expect($('#test p')).to.be.empty;
        expect($('#test div').append(div)).to.have.length.above(0);
        expect($('#test div').html()).to.equal('String<p>Goodbye</p>');

    })


    it('.empty() - 所有匹配节点对象集合中移除所有的dom子节点，不包括自己，清空内容。', function () {
        
        var elm = document.getElementById("test")
            elm.innerHTML = '<p>Goodbye</p><div>String</div>';
        expect($("div")).to.have.property('empty');
        expect($("#test").empty()).to.have.length.above(0);
        expect($("#test").html()).to.be.empty;

    })

    it('.html() - 从集合的第一个匹配元素中获取HTML内容 或 设置每一个匹配元素的html内容。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div>Goodbye</div>';
        expect($("div")).to.have.property('html');
        expect($("#test").html()).eql('<div>Goodbye</div>');
        expect($("#test").html("string").html()).eql("string");
        expect($("#test").html(function(){return '<div>test</div>'; })).to.have.length.below(2);
        expect($("#test").html()).to.equal('<div>test</div>')

    })

    it('.prepend() - 将参数内容插入到每个匹配元素的前面（元素内部）。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div>Goodbye</div>';
        expect($("div")).to.have.property('prepend');
        expect($("#test").prepend("dd")).to.have.length.below(2);
        expect($("#test").html()).to.equal('dd<div>Goodbye</div>')
        expect($("#test").prepend(function(){return "asdfasdf"})).to.have.length.below(2);
        expect($("#test").html()).to.equal('asdfasdfdd<div>Goodbye</div>');

    })

    it('.prependTo() - 将所有元素插入到目标前面（元素内）。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div>Goodbye</div>';
        expect($("div")).to.have.property('prependTo');
        expect($('<div>test</div>').prependTo('#test')).to.have.length.below(2);
        expect($("#test").html()).to.equal('<div>test</div><div>Goodbye</div>');

    })

    it('.text() - 取得所有匹配节点对象的文本内容。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div>Goodbye</div>';
        expect($("div")).to.have.property('text');
        expect($("#test").text()).to.eql("Goodbye");
        expect($("#test").text("test").text()).eql("test");
        expect($("#test").text("test")).to.have.length.below(2);

    })


    it('.insertAfter() - 插入的对象集合中的元素到指定的每个元素后面的dom中。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div>Goodbye</div>';
        expect($("div")).to.have.property('insertAfter');
        expect($('<p>test</p>').insertAfter('#test div')[0].outerHTML).to.equal('<p>test</p>');
        expect($('#test').html()).to.equal('<div>Goodbye</div><p>test</p>');

    })

    it('.insertBefore() - 将生成的内容插入 selector 匹配的节点标签开始前。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div>Goodbye</div>';
        expect($("div")).to.have.property('insertBefore');
        expect($('<p>test</p>').insertBefore('#test div')[0].outerHTML).to.equal('<p>test</p>');

    })

    it('.prepend() - 插入到标签开始标记之后（里面的第一个）。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div>Goodbye</div>';
        expect($("div")).to.have.property('prepend');
        expect($("#test div").prepend("dd")[0].outerHTML).to.have.equal('<div>ddGoodbye</div>');
        expect($("#test div").prepend(function(){return "www";})[0].outerHTML).to.have.equal('<div>wwwddGoodbye</div>');

    })

    it('.prependTo() - 将生成的内容插入到匹配的节点标签开始标记之后。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div>Goodbye</div>';
        expect($("div")).to.have.property('prependTo');
        expect($("<div>s</div>").prependTo("#test")[0].outerHTML).to.have.equal('<div>s</div>');
        expect($("#test")[0].outerHTML).to.have.equal('<div id="test"><div>s</div><div>Goodbye</div></div>');

    })

    it('.remove() - 删除所有匹配节点对象【自己】及所有【自己】里面的内容。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div>Goodbye<span>ww</span></div>';
        expect($("div")).to.have.property('remove');
        expect($("#test").remove('span')[0].outerHTML).to.have.equal('<span>ww</span>');
        expect($("#test div").remove()[0].outerHTML).to.have.equal('<div>Goodbye</div>');
        expect($('#test')[0].outerHTML).to.have.equal('<div id="test"></div>');

    })

    it('.replaceWith() - 将所有匹配的元素替换成指定的HTML或DOM元素。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div>Goodbye<span>ww</span></div>';
        expect($("div")).to.have.property('replaceWith');
        expect($("#test div").replaceWith("<b>段落。</b>")).to.have.length.within(1,1)
        expect($('#test')[0].outerHTML).to.have.equal('<div id="test"><b>段落。</b></div>')

    })

    it('.unwrap() - 移除集合中每个元素的直接父节点，并把他们的子元素保留在原来的位置。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div>Goodbye<span>ww</span></div><div>Goodbye<span>ww</span></div>';
        expect($("div")).to.have.property('unwrap');
        expect($('#test span').unwrap()[0].outerHTML).to.have.equal('<span>ww</span>');
        expect($('#test')[0].outerHTML).to.have.equal('<div id="test">Goodbye<span>ww</span>Goodbye<span>ww</span></div>');
        elm.innerHTML = '';
    })

})