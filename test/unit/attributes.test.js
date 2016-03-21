describe('attributes 获取和设置页面元素的 DOM 属性。', function () {

    it('.attr() - 获取匹配的元素集合中的第一个元素的属性的值 或 设置每一个匹配元素的一个或多个属性。', function () {

        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="jslite">Goodbye</div><input class="yaotaiyang" id="check2" type="checkbox"><input class="taiyang" id="check1" type="checkbox" checked="checked">';
        expect($("#test .jslite")).to.have.property('attr');
        expect($("#test .jslite").attr({"style":"background:red"})[0]).to.have.deep.property('style.backgroundColor','red');
        expect($("#test #check1").attr("checked")).to.equal('checked');
        expect($("#test #check2").attr("checked")).to.be.false;
        expect($("#test div").attr('class')).to.equal('jslite');
        elm.innerHTML = '';
    })

    it('.removeAttr() - 为匹配的元素集合中的每个元素中移除一个属性。', function () {

        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="jslite">Goodbye</div>';
        expect($("#test div")).to.have.property('removeAttr');
        expect($("#test div").removeAttr("class")).to.be.have.length.above(0);
        expect($("#test div").attr('class')).to.be.null;
        elm.innerHTML = '';
    })


    it('prop(name|properties|key,value|fn) - 获取匹配的元素集中的第一个元素的属性（property）值或设置每一个匹配元素的一个或多个属性。', function () {

        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="jslite">Goodbye</div><input class="yaotaiyang" id="check2" type="checkbox"><input class="taiyang" id="check1" type="checkbox" checked="checked">';
        expect($("#test div")).to.have.property('prop');
        expect($("#test #check1").prop("checked")).to.be.true;
        expect($("#test #check2").prop("checked")).to.be.false;
        expect($("#test div").prop("className",function(index,oldvalue){return "222"})[0]).to.have.property('className','222');
        expect($("#test div").prop("jslites",'www')[0]).to.have.property('jslites','www');
        elm.innerHTML = '';
    })

    it('.removeProp(name) - 为集合中匹配的元素删除一个属性（property）。', function () {

        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="jslite">Goodbye</div>';
        expect($("#test div")).to.have.property('removeProp');
        expect($('#test div').prop("prop_a", "CodePlayer").removeProp('prop_a').prop("prop_a")).to.be.undefined;
        elm.innerHTML = '';
    })

    it('.addClass(class|fn) - 为每个匹配的元素添加指定的样式类名。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div id="foo">Goodbye</div>';

        expect($("#test div")).to.have.property('addClass');
        expect($("#test div").addClass('jslite')[0]).to.have.property('className','jslite');
        expect($("#test div").addClass(function(){return "wcj"})[0]).to.have.property('className','jslite wcj');
        elm.innerHTML = '';
    })

    it('.hasClass() - 确定任何一个匹配元素是否有被分配给定的（样式）类。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div class="jslite">Goodbye</div>';

        expect($("#test div")).to.have.property('hasClass');
        expect($("#test div").hasClass('jslite')).to.be.true;
        expect($("#test div").hasClass('jslite-s')).to.be.false;
        elm.innerHTML = '';

    })

    it('.removeClass() - 移除集合中每个匹配元素上一个，多个或全部样式。', function () {

        var elm = document.getElementById("test")
            elm.innerHTML = '<div class=" jslite classname">Goodbye</div>';

        expect($("#test div")).to.have.property('removeClass');
        expect($("#test div").removeClass("jslite") ).to.be.have.length.above(0);
        expect($("#test div").attr('class')).to.equal('classname');
        expect($("#test div").removeClass().attr('class')).to.be.null;
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
    
})