describe('attributes 获取和设置页面元素的 DOM 属性。', function () {

    it('.attr() - 获取匹配的元素集合中的第一个元素的属性的值 或 设置每一个匹配元素的一个或多个属性。', function () {

        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="jslite">Goodbye</div><input class="yaotaiyang" id="check2" type="checkbox"><input class="taiyang" id="check1" type="checkbox" checked="checked">';
        expect($("#test .jslite")).to.have.property('attr');
        expect($("#test .jslite").attr({"style":"background:red"})[0]).to.have.deep.property('style.backgroundColor','red');
        expect($("#test #check1").attr("checked")).to.equal('checked');
        expect($("#test #check2").attr("checked")).to.be.false;
        expect($("#test div").attr('class')).to.equal('jslite');

    })

    it('.prop() - 获取匹配的元素集中的第一个元素的属性（property）值或设置每一个匹配元素的一个或多个属性。', function () {

        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="jslite">Goodbye</div><input class="yaotaiyang" id="check2" type="checkbox"><input class="taiyang" id="check1" type="checkbox" checked="checked">';
        expect($("#test div")).to.have.property('prop');
        expect($("#test #check1").prop("checked")).to.be.true;
        expect($("#test #check2").prop("checked")).to.be.false;
        expect($("#test div").prop("className",function(index,oldvalue){return "222"})[0]).to.have.property('className','222');
        expect($("#test div").prop("jslites",'www')[0]).to.have.property('jslites','www');

    })


    it('.removeAttr() - 为匹配的元素集合中的每个元素中移除一个属性。', function () {

        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="jslite">Goodbye</div>';
        expect($("#test div")).to.have.property('removeAttr');
        expect($("#test div").removeAttr("class")).to.be.have.length.above(0);
        expect($("#test div").attr('class')).to.be.null;

    })

    it('.removeProp() - 为集合中匹配的元素删除一个属性（property）。', function () {

        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="jslite">Goodbye</div>';
        expect($("#test div")).to.have.property('removeProp');
        expect($('#test div').prop("prop_a", "CodePlayer").removeProp('prop_a').prop("prop_a")).to.be.undefined;

    })

    it('.val() - 获取设置input的 value 。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<input type="text" value="jslite">';
        expect($("#test input")).to.have.property('val');
        expect($("#test input").val()).equal('jslite');
        expect($("#test input").val('jslite').val()).to.equal('jslite');

    })

    it('.pluck() -获取对象集合中每一个元素的属性值。', function () {
        
        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="jslite">Goodbye</div><span>test</span>';
        expect($("#test").pluck("nodeName")[0]).to.equal('DIV');
        expect($("#test .jslite").pluck("nextElementSibling")[0].outerHTML).to.equal('<span>test</span>');
        expect($("#test").pluck('children')[0]).to.have.length(2);

    })

    it('.is() - 判断当前匹配的元素集合中的元素，是否为一个选择器。', function () {
        
        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="jslite">Goodbye</div><span>test</span>';
        expect($('#test').is('div')).to.be.true;
        expect($('#test').is('#test')).to.be.true;
        expect($('#test').is('#testss')).to.be.false;
        expect($('#test .jslite').is($('#test').find('.jslite')[0])).to.be.true;
        elm.innerHTML = '';
        
    })

})