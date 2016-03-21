describe('core ', function () {


    describe('判断断言',function(){
            
        it('$.isFunction(): 判断对象是否为函数【function】。', function(){
            expect($.isFunction(function(){})).to.be.true;
        })

        it('$.isObject(): 判断是否为 `Object` 。', function(){
            expect($.isObject({})).to.be.true;
            expect($.isObject([])).to.be.false;
            expect($.isObject(1)).to.be.false;
            expect($.isObject("2323")).to.be.false;
        })

        it('$.isPlainObject(): 判断是否为 Object 。', function(){
            expect($.isPlainObject(new Object())).to.be.true;
            expect($.isPlainObject(new Date())).to.be.false;
            expect($.isPlainObject(window)).to.be.false;
        })

        it('$.isArray(): 判断是否为【数组】。', function(){
            expect($.isArray([1,2,3])).to.be.true;
            expect($.isArray({})).to.be.false;
            expect($.isArray(function(){})).to.be.false;
        })

        it('$.isString(): 判断是否为【字符串】。', function(){
            expect($.isString('字符串')).to.be.true;
            expect($.isString({})).to.be.false;
            expect($.isString(123)).to.be.false;
            expect($.isString(function(){})).to.be.false;
        })

        it('$.isDocument(): 判断对象是否为【document】。', function(){
            expect($.isDocument(document)).to.be.true;
            expect($.isDocument(window)).to.be.true;
            expect($.isDocument(document.documentElement)).to.be.false;
        })

        it('$.isWindow(): 确定参数是否为一个窗口（window对象）。', function(){
            expect($.isWindow(window)).to.be.true;
            expect($.isWindow({})).to.be.false;
            expect($.isWindow(function(){})).to.be.false;
        })

        it('$.isEmptyObject(): 检查一个对象是否为空对象。', function(){
            expect($.isEmptyObject({})).to.be.true;
            expect($.isEmptyObject({ foo: "bar" })).to.be.false;
        })

        it('$.type() - 获取JavaScript 对象的类型。', function () {
            expect($.type(true)).to.equal('boolean');
            expect($.type("div")).to.equal('string');
            expect($.type(123)).to.equal('number');
            expect($.type({})).to.equal('object');
            expect($.type(function(){})).to.equal('function');
            expect($.type(undefined)).to.equal('undefined');
            expect($.type(new RegExp())).to.equal("regexp");
            expect($.type(new Date())).to.equal("date");
        })


        it('$.inArray(value,array,[fromIndex]): 搜索数组中指定的值并返回它的索引（如果未找到返回-1）数字。', function(){
            var arr = [ 4, "Pete", 8, "John" ];
            assert.equal($.inArray("John", arr), '3');
            assert.equal($.inArray(4, arr), '0');
            assert.equal($.inArray("David", arr), -1);
            assert.equal($.inArray("Pete", arr, 1), 1);
        })

        it('.indexOf(): 搜索数组中指定的值并返回它的索引（如果未找到返回-1）数字。', function(){
            var $arr = $.map([ "a", "b", "c", "d", "e" ], function(n, i){
                return (n.toUpperCase() + i);
            });
            assert.equal($arr.indexOf('B1'), 1);
            assert.equal($arr.indexOf('B12'), -1);
        })
        it('.size(): 返回的JSLite对象匹配的DOM元素的数量。', function(){
            var elm = document.getElementById("test");
            elm.innerHTML = '<span></span><span></span><span></span>';

            assert.equal($('#test span').size(), 3);
        })
        it('.length: 返回的JSLite对象匹配的DOM元素的数量。', function(){
            var elm = document.getElementById("test");
            elm.innerHTML = '<span></span><span></span><span></span>';
            assert.equal($('#test span').length, 3);
        })

    })

    describe('循环 ',function(){


        it('.forEach() - 类似 each，forEach遍历不会停止。', function () {
            var newarr = [1,"wcj",2,3].forEach(function(item,idx,array){
                idx===0&&assert.isNumber(item)
                idx===1&&assert.isString(item)
                assert.isNumber(idx)
                assert.isArray(array)
            })
            assert.isUndefined(newarr)
            var elm = document.getElementById("test");
            elm.innerHTML = '<div>J</div><div>S</div><div>L</div><div>i</div><div>t</div><div>e</div>';
            var elmarr = $("#test div").forEach(function(item,index,array){
                index===0&&assert.equal(item.innerHTML,'J')
                assert.isNumber(index)
                assert.isArray(array)
            })
            assert.isUndefined(elmarr)

        })

        it('.each(): 遍历一个 JSLite 集合对象，为每一个匹配元素执行一个函数。', function(){
            var elm = document.getElementById("test");
            elm.innerHTML = '<span></span><span></span><span></span>';
            var $span = $("#test span").each(function(idx,itm){
                this.className = "test" + idx;
                expect(itm.tagName).to.equal('SPAN');
            });
            expect($span).to.have.length(3);
            expect($span[0].outerHTML).to.equal('<span class="test0"></span>');
            elm.innerHTML = '';
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

        it('$.grep(array, callback, [invert]) - 使用过滤函数过滤数组元素。', function () {
            var arr = $.grep( [0,1,2], function(n,i){return n != 0; });
            assert.typeOf(arr, 'array');
            assert.include(arr, 1);
            assert.notInclude(arr, 0);
            assert.lengthOf(arr, 2);
            var arr = $.grep( [0,1,2,3,4,5,6], function(n,i){return n > 3; }, true);
            assert.typeOf(arr, 'array');
            assert.notInclude(arr, 4);
            assert.notInclude(arr, 5);
            assert.lengthOf(arr, 4);
        })

    })
    
    it('.concat() - 将一个数组对象或者一个对象，合并到JSLite数组对象中', function () {
        var elm = document.getElementById("test")
        assert.lengthOf($('#test').concat('ww'),2)
    })

    it('.toArray() - 把JSLite集合中所有DOM元素恢复成一个数组。', function () {
        var elm = document.getElementById("test")
        elm.innerHTML = '<div>J</div><div>S</div><div>L</div><div>i</div><div>t</div><div>e</div>';
        var toarr = $('#test div').toArray();
        assert.lengthOf(toarr,6)
        assert.deepEqual(toarr[1].outerHTML,'<div>S</div>')
        expect(toarr).to.not.property('toArray');
    })
    
    it('.slice(start, [end]) - 选取一个匹配的子集', function () {
        var elm = document.getElementById("test")
        elm.innerHTML = '<p>Hello</p><p>cruel</p><p>World</p>';
        var new_elm = $("#test p").slice(0, 1)
        assert.deepEqual($("#test p").slice(0, 1)[0].outerHTML,'<p>Hello</p>');
        assert.deepEqual($("#test p").slice(0, 2)[0].outerHTML,'<p>Hello</p>');
        assert.deepEqual($("#test p").slice(0, 2)[1].outerHTML,'<p>cruel</p>');
        assert.lengthOf($("#test p").slice(0, 2),2);
    })
    
    it('$.trim() - 去掉字符串起始和结尾的空格。', function () {
        assert.equal($.trim('hello JSLite.  '),'hello JSLite.')
        assert.equal($.trim('  hello JSLite.  '),'hello JSLite.')
    })

    it('$.camelCase(string)  将样式属性字符转换成驼峰',function(){
        expect( $.camelCase('padding-top') ).to.equal('paddingTop');
        expect( $.camelCase('-webkit-border-radius') ).to.equal('WebkitBorderRadius');
        expect( $.camelCase('-ms-border-radius') ).to.equal('msBorderRadius');
        expect( $.camelCase('-moz-border-radius') ).to.equal('MozBorderRadius');
    })

    it('$.globalEval(string)  执行代码的作用域为全局作用域。',function(){
        var newVar = undefined;
        function test() {
          $.globalEval( "newVar = true" )
        }
        expect(window.newVar).to.be.undefined;
        test();
        expect(window.newVar).to.be.true;

    })

    it('$(document).ready() - 当DOM载入就绪可以查询及操纵时绑定一个要执行的函数。', function () {
        var a = 3;
        var ready = $(document).ready(function(){++a; });
        assert.equal(a, 4);
        assert.equal(ready.length, 1);
        assert.equal(ready[0], window.document);

        ready = $(function(){++a;});

        assert.equal(a, 5);
        assert.equal(ready.length, 1);
        assert.equal(ready[0], window.document);
    })

    it('$.extend(): 通过源对象扩展目标对象的属性。', function(){
        $.extend({
            min: function(a, b) { return a < b ? a : b; },
            max: function(a, b) { return a > b ? a : b; }
        });
        expect($.min(2,3)).to.equal(2);
        expect($.max(4,5)).to.equal(5);
    })

    it('$.merge(): 合并两个数组内容到第一个数组。', function(){
        var first = [1,23,45], second = [23,"23"]
        var newarr = $.merge(first,second);
        expect(newarr.length).to.equal(5);

        var first = ['a','b','c'];
        var second = ['d','e','f'];
        expect( $.merge( $.merge([],first), second) ).to.deep.equal(["a","b","c","d","e","f"])
    })

    it('.get(): 取得其中一个匹配的元素。', function(){
        var elm = document.getElementById("test")
            elm.innerHTML = '<div>Goodbye</div><div>JSLite</div>';

            assert.lengthOf($('#test div').get(),2)
            assert.equal($('#test div').get(0).outerHTML,'<div>Goodbye</div>')
    })

    it('$.now: 返回一个数字，表示当前时间。', function(){
        assert.isNumber($.now(),'返回错误');
    })

    it('$.noConflict() - 放弃 JSLite 控制的$ 变量。', function () {
        $.noConflict();
        JSLite(document).ready(function($) {
            assert.property($,'noConflict');
        });
        assert.isUndefined($)
        $ = JSLite.noConflict();
        assert.isFunction($)
        assert.property($,'noConflict');
    })

})