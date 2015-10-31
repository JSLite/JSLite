describe('css 设置和获取元素的 CSS 相关的属性。', function () {


    it('.addClass() - 为每个匹配的元素添加指定的样式类名。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div id="foo">Goodbye</div>';

        expect($("#test div")).to.have.property('addClass');
        expect($("#test div").addClass('jslite')[0]).to.have.property('className','jslite');
        expect($("#test div").addClass(function(){return "wcj"})[0]).to.have.property('className','jslite wcj');

    })

    it('.hasClass() - 确定任何一个匹配元素是否有被分配给定的（样式）类。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div class="jslite">Goodbye</div>';

        expect($("#test div")).to.have.property('hasClass');
        expect($("#test div").hasClass('jslite')).to.be.true;
        expect($("#test div").hasClass('jslite-s')).to.be.false;

    })

    it('.removeClass() - 移除集合中每个匹配元素上一个，多个或全部样式。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div class=" jslite classname">Goodbye</div>';

        expect($("#test div")).to.have.property('removeClass');
        expect($("#test div").removeClass("jslite") ).to.be.have.length.above(0);
        expect($("#test div").attr('class')).to.equal('classname');
        expect($("#test div").removeClass().attr('class')).to.be.null;

    })

    it('.css() - 获取或设置节点对象的style样式内容。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div style="height:333px;">Goodbye</div>';

        expect($("#test div")).to.have.property('css');
        expect($("#test div").css(['color','background','height'])).to.eql({ color: '', background: '' ,"height": "333px"}); 
        expect($("#test div").css('height')).to.equal('333px');
        expect($("#test div").css({'color':'#fff','background':'red'})).to.have.length.above(0); 
        expect($("#test div").css('color')).to.equal('rgb(255, 255, 255)');
        expect($("#test div").css('color','')).to.have.length.above(0); 
        expect($("#test div").css('color')).to.be.empty; 

    })


    it('.offset() - 获得当前元素相对于document的位置。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div style="position: absolute;top:100px;left:200px;width:500px;height: 450px;">www</div>';

        elm.style.overflow = "hidden"
        expect($("#test div")).to.have.property('offset');
        expect($('#test div').offset()).to.eql({left: 200, top: 100, width: 500, height: 450});
        elm.innerHTML = '';

    })

    it('.scrollLeft() - 获取匹配的元素集合中第一个元素的当前水平滚动条的位置。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div class="jslite" style="height:3000px;width:3000px;boder:1px solid red;" >www</div>';

        expect($("#test div")).to.have.property('scrollLeft');
        expect($('#test').scrollLeft(400)).to.have.length.within(1,1);
        expect($('#test')[0].scrollLeft).to.have.equal(400);

    })

    it('.scrollTop() - 获取匹配的元素集合中第一个元素的当前垂直滚动条的位置。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div class="jslite" style="overflow:auto;height:400px;width:300px"><div style="height:3000px;width:3000px;boder:1px solid red;" >www</div></div>';
        
        expect($("#test .jslite")).to.have.property('scrollTop');
        expect($('#test .jslite').scrollTop(400)).to.have.length.within(1,1);
        expect($('#test .jslite').scrollTop()).to.have.equal(400);
        elm.innerHTML = '';

    })


    it('.toggleClass() - 在匹配的节点对象集合中的每个节点对象上添加或删除一个或多个样式类。', function () {
        
        var elm = document.getElementById("test")
        elm.innerHTML = '<div class="jslite">Goodbye</div>';
        expect($("#test div")).to.have.property('toggleClass');
        expect($("#test div").toggleClass('box1 box2')[0]).to.have.property('className','jslite box1 box2');
        expect($("#test div").toggleClass('box1 box2')[0]).to.have.property('className','jslite');
        expect($("#test div").toggleClass(function(){return "wcj"})[0]).to.have.property('className','jslite wcj');

    })

    it('.width() - 获取对象象集合中第一个元素的宽，或设置对象集合所有元素的宽。', function () {

        var elm = document.getElementById("test")
        elm.innerHTML = '<div class="jslite" ><div style="width:100px;height:500px;display:block;">1</div><div>2</div></div>';
        expect($("#test")).to.have.property('width');
        expect($("#test").width("400px")).to.have.length.within(1,1);
        expect($("#test").width()).to.equal(400);

    })

    it('.height() - 获取对象集合中第一个元素的高，或设置对象集合所有元素的高。', function () {
        
        var elm = document.getElementById("test")
        elm.innerHTML = '<div class="jslite" ><div style="width:100px;height:500px;display:block;">1</div><div>2</div></div>';
        expect($("#test")).to.have.property('height');
        expect($("#test").height("400px")).to.have.length.within(1,1);
        expect($("#test").height()).to.equal(400);
        expect($("#test").height('auto')).to.have.length.within(1,1);
        elm.innerHTML = '';

    })


    // .innerHeight()
    // .innerWidth()
    // .outerHeight()
    // .outerWidth()
    // .position()



})