
describe('traversing 遍历，过滤', function () {

    it('.children() - 获得每个匹配元素集合元素的直接子元素(可以带上滤选择器)。', function () {
        var elm = document.getElementById("test")

        assert.lengthOf($('#test').children(),0)
        elm.innerHTML = '<div>Goodbye</div><span>Test</span>';
        assert.lengthOf($('#test').children(),2)
        assert.lengthOf($('#test').children('span'),1)
        assert.equal($('#test').children('span')[0].tagName,'SPAN')

    })

    it('.closest() - 获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上。', function () {
        var elm = document.getElementById("test")
        elm.innerHTML = '<div>Goodbye<p><span>Test</span></p></div>';
        var elmdiv = $("#test p").closest('div')
        assert.lengthOf(elmdiv,1)
        assert.equal(elmdiv[0].innerText,'Goodbye\nTest')
        var elmdiv = $("#test span").closest('p',$('#test p')[0])
        assert.lengthOf(elmdiv,1)
        assert.equal(elmdiv[0].tagName,'P')
    })

    it('.find() - 后代节点的集合(可以带上滤选择器)。', function () {
        var elm = document.getElementById("test")
        elm.innerHTML = '<div>Goodbye<p><span>Test</span></p><p>Goodbye</p></div>';
        assert.lengthOf($('#test').find('p'),2)
        assert.lengthOf($('#test').find('span'),1)
        assert.lengthOf($('#test').find(),4)
    })

    it('.first() - 获取当前对象集合中的第一个元素。 first() ⇒ collection', function () {
        var elm = document.getElementById("test")
        elm.innerHTML = '<div>Goodbye<p><span>Test</span></p><p>Goodbye</p></div>';
        assert.lengthOf($('#test p').first(),1)
        assert.equal($('#test p').first()[0].innerText,'Test')
    })

    it('.parent() - 对象集合中每个元素的直接父元素。', function () {
        var elm = document.getElementById("test")
        elm.innerHTML = '<div>Goodbye<p><span>Test</span></p><p>Goodbye</p></div>'
        assert.lengthOf($('#test p').parent(),1)
        assert.equal($('#test p').parent()[0].innerText,'Goodbye\nTest\n\nGoodbye')
    })

    it('.parents() - 获取对象集合每个元素所有的祖先元素（不包含根元素）。', function () {
        var elm = document.getElementById("test")
        elm.innerHTML = '<div>Goodbye<p><span>Test</span></p><p>Goodbye</p></div>'
        assert.lengthOf($('#test p').parents(),4,"错误1")
        assert.lengthOf($('#test p').parents('div'),2,"错误2")
        assert.equal($('#test p').parents('div')[0].innerText,'Goodbye\nTest\n\nGoodbye')
    })

    it('.siblings() - 获取对此对象【其它】所有兄弟对象(可以带上滤选择器)。', function () {
        var elm = document.getElementById("test")
        elm.innerHTML = '<p>test</p><p>3test</p><div>siblings</div><p>3sdtest</p><p class="wcj">3sdtest</p><p>3sdasdftest</p>'
        assert.lengthOf($('#test .wcj').siblings(),5)
        assert.lengthOf($('#test .wcj').siblings('div'),1)
        assert.equal($('#test .wcj').siblings('div')[0].innerText,'siblings')
    })

    it('.contents() - 获得每个匹配元素集合元素的子元素，包括文字和注释节点。', function () {
        var elm = document.getElementById("test")
        elm.innerHTML = 'JSLite contents<div>JSLite</div>'
        assert.lengthOf($('#test').contents(),2)
        assert.equal($('#test').contents()[0].data,'JSLite contents')
        assert.lengthOf($('#test').contents('div'),1)
        assert.equal($('#test').contents('div')[0].innerText,'JSLite')
    })

    it('.prev() - 获取对象集合每个元素的所有上一个对象(可以带上滤选择器)。', function () {
        var elm = document.getElementById("test")
        elm.innerHTML = '<div class="next">prev1</div><div>prev22</div><div id="prev">prev33</div>'
        assert.lengthOf($('#test #prev').prev(),1)
        assert.lengthOf($('#test #prev').prev('ul'),0)
        assert.lengthOf($('#test #prev').prev('div'),1)
        assert.equal($('#test #prev').prev('div')[0].innerText,"prev22")
    })

    it('.next() - 获取对象集合每个元素的所有下一个对象(可以带上滤选择器)。', function () {
        assert.lengthOf($('#test .next').next(),1)
        assert.lengthOf($('#test .next').next('ul'),0)
        assert.lengthOf($('#test .next').next('div'),1)
        assert.equal($('#test .next').next('div')[0].innerText,"prev22")
    })

    it('.prevAll() - 获取对此对象【上】所有兄弟对象(可以带上滤选择器)。', function () {
        assert.lengthOf($('#test #prev').prevAll(),2)
        assert.lengthOf($('#test #prev').prevAll('ul'),0)
        assert.lengthOf($('#test #prev').prevAll('div.next'),1)
        assert.equal($('#test #prev').prevAll('div.next')[0].innerText,"prev1")
    })

    it('.nextAll() - 获取对此对象【下】所有兄弟对象(可以带上滤选择器)。', function () {
        assert.lengthOf($('#test .next').nextAll(),2)
        assert.lengthOf($('#test .next').nextAll('ul'),0)
        assert.lengthOf($('#test .next').nextAll('div#prev'),1)
        assert.equal($('#test .next').nextAll('div#prev')[0].innerText,"prev33")
    })

    it('$.map() - 通过遍历集合中的节点对象，通过函数返回一个新的数组，null 或 undefined 将被过滤掉。', function () {
        var elm = document.getElementById("test")
        elm.innerHTML = '<div class="next">prev1</div><div>prev22</div><div id="prev">prev33</div><p>JSLite</p>'

        var elmarr = $.map($('#test div'),function(node,idx){return node.innerText }) 
        assert.lengthOf(elmarr,3)
        assert.include(elmarr,'prev1')
        assert.isArray(elmarr)
        
        var newarr = $.map({"w":1,"c":2,"j":3},function(val,key){return key })
        assert.lengthOf(newarr,3)
        assert.include(newarr,'w')
        assert.isArray(newarr)
        assert.deepEqual(newarr,["w","c","j"])

        newarr = $.map({"w":1,"c":2,"j":3},function(idx,item){if(item == 'w') return item });
        assert.lengthOf(newarr,1)
        assert.include(newarr,'w')
        assert.isArray(newarr)
        assert.deepEqual(newarr,["w"])

        newarr = $.map(["J","S","L","i","t","e"],function(val,idx){return val})
        assert.lengthOf(newarr,6)
        assert.include(newarr,'J')
        assert.isArray(newarr)
        assert.deepEqual(newarr,["J","S","L","i","t","e"])

    })

    it('$.each() - 通用例遍方法，可用于例遍对象和数组', function () {
        var newarr = $.each(['a', 'b', 'c'], function(idx, item){
            assert.isNumber(idx, '不是数字！')
            assert.isString(item, '不是字符串！')
            idx === 0 && assert.equal(item,'a')
            idx === 1 && assert.equal(item,'b')
            idx === 3 && assert.equal(item,'c')
        })
        assert.lengthOf(newarr,3)
        assert.include(newarr,'a')
        assert.isArray(newarr)
        var newarr = $.each({"a":"ww","b":"JSLite"}, function( key,val){
            key === 'a' && assert.equal(val,'ww')
            key === 'b' && assert.equal(val,'JSLite')
        })
        assert.deepEqual(newarr, {"a":"ww","b":"JSLite"});
    })
    
    it('$.grep() - 使用过滤函数过滤数组元素。', function () {
        var arr = $.grep( [0,1,2], function(n,i){return n != 0; })
        assert.typeOf(arr, 'array');
        assert.include(arr, 1)
        assert.notInclude(arr, 0)
        assert.lengthOf(arr, 2)
    })

    it('.each() - 遍历一个 JSLite 集合对象，为每一个匹配元素执行一个函数。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<div>J</div><div>S</div><div>L</div><div>i</div><div>t</div><div>e</div>';
        var itemarr = $("#test div").each(function(idx,item){
            assert.isNumber(idx, '不是数字！')
            if(idx === 0 ) assert.deepEqual(item.outerHTML, '<div>J</div>')
            if(idx === 3 ) assert.deepEqual(item.outerHTML, '<div>i</div>')
            item.innerHTML= idx + 'JSLite'
        });
        assert.lengthOf(itemarr,6)
        assert.equal(itemarr[0].outerHTML,'<div>0JSLite</div>')
    })

    it('.map() - 遍历节点对象集合中的所有节点对象返回一个新的集合对象', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<div>J</div><div>S</div><div>L</div><div>i</div><div>t</div><div>e</div>';
        var itemarr = $("#test div").map(function(idx,item){
            assert.isNumber(idx, '不是数字！')
            if(idx === 0 ) assert.deepEqual(item.outerHTML, '<div>J</div>')
            if(idx === 3 ) assert.deepEqual(item.outerHTML, '<div>i</div>')
            return item.innerText
        });
        assert.isArray(itemarr)
        assert.equal(itemarr.join(''),'JSLite')
    })

    it('.forEach() - 类似 each，forEach遍历不会停止。', function () {

    })

    it('.eq() - 指定匹配元素的集合为的索引的哪一个元素。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<div>J</div><div>S</div>';
        assert.lengthOf($('#test div').eq(1),1)
        assert.lengthOf($('#test div').eq(0),1)
        assert.lengthOf($('#test div').eq(-1),1)
        assert.lengthOf($('#test div').eq(-2),1)
        assert.lengthOf($('#test div').eq(),0)
        assert.lengthOf($('#test div').eq(99),0)
        assert.equal($('#test div').eq(0)[0].outerHTML,'<div>J</div>')
        assert.equal($('#test div').eq(-2)[0].outerHTML,'<div>J</div>')
    })

    it('.index() - 获取一个元素的位置。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<div>J</div><span>S</span><p>L</p>';
        assert.equal($("#test").children().index($('#test p')[0]),2)
        assert.equal($("#test span").index(),1)
        assert.equal($("#test").children().index('span'),1)
        assert.equal($("#test").children().index('#box'),-1)
        elm.innerHTML = '<ul> <li id="foo">foo</li> <li id="bar">bar</li> <li id="baz">baz</li> </ul>';
        assert.equal($('#test li').index(document.getElementById('bar')),1)
        assert.equal($('#test li').index($('#bar')[0]),1)
        assert.equal($('#test li').index($('#sssbar')[0]),0)
    })

    it('.indexOf() - 在当前获取的节点数组中获取一个元素在这个数组的位置。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<div>J</div><span>S</span><p>L</p><div id="bar">J</div>';
        assert.equal($("#test div").indexOf($('#bar')[0]),1)
        assert.equal($("#test span").indexOf($('#bar')[0]),-1)

    })

    it('.filter() - 筛选出与指定表达式匹配的元素集合。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<div>J</div><span>S</span><p>L</p><div id="bar">J</div>';
        assert.lengthOf($("#test").children().filter("p"),1)
        assert.lengthOf($("#test").children().filter(),0)
        elm.innerHTML = '<select id="select"> <option value="1">s1</option> <option selected value="2">s2</option> <option value="3">s3</option> </select>';
        var sel = $("#select option").filter(function(idx){
            return this.selected
        })
        assert.lengthOf(sel,1)
        assert.equal(sel[0].outerHTML,'<option selected="" value="2">s2</option>')
        assert.lengthOf($("#select option").filter(function(idx){}),0)
    })

    it('.not() - 筛选出与指定表达式匹配的元素集合。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<select id="select"> <option value="1">s1</option> <option selected value="2">s2</option> <option value="3">s3</option> </select>';
        var sel = $("#select option").not(function(idx){
            return this.selected
        })
        assert.lengthOf(sel,2)
        assert.equal(sel[0].outerHTML,'<option value="1">s1</option>')
        assert.equal(sel[1].outerHTML,'<option value="3">s3</option>')
        elm.innerHTML = '<input type="text" value="1"> <input type="text"  value="2"> <input type="text"  value="3"> <input type="text"  value="4" id="input">';
        sel = $('#test input').not('#input')
        assert.lengthOf(sel,3)
        assert.equal(sel[0].outerHTML,'<input type="text" value="1">')
        assert.equal(sel[1].outerHTML,'<input type="text" value="2">')
        assert.equal(sel[2].outerHTML,'<input type="text" value="3">')
        elm.innerHTML = '';
    })

})

