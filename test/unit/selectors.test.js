describe('selectors 选择器', function () {

    it('$("*"): - 查找文档中的每一个元素（包括 head, body 等）', function () {
        expect($("*")).to.have.length.above(5);
    })

    it('$( "[attribute=value]" ): - 选择 type="text" 的所有元素。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<input type="text"/>';
        expect($("input[type='text']")).to.have.length.above(0);
        elm.innerHTML = '';
    })

    it('#id: - 选择 id="firstname" 的所有元素。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<div id="jslite"></div>';
        expect($("#jslite")).to.have.length.above(0);
    })

    it('.class: 选择 class="intro" 的所有元素。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="jslite_intro"></div>';
        expect($(".jslite_intro")).to.have.length.above(0);
    })

    it('element: 选择所有 <p> 元素。', function () {
        expect($("div")).to.have.length.above(0);
    })

    it('element,element: 选择所有 <p> 元素。', function () {
        expect($("div,p")).to.have.length.above(1);
    })

    it('element element: 选择 <div> 元素内部的所有 <p> 元素。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<div><p></p></div>';
        expect($("#test div p")).to.have.length.above(0);
    })

    it('element>element: 选择父元素为 <div> 元素的所有 <p> 元素。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<div><p></p></div><span><p></p></span>';
        expect($("#test div>p")).to.have.length.within(1,1);
    })

    it('element+element: 选择紧接在 <div> 元素之后的所有 <p> 元素。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<div><p></p></div><p></p>';
        expect($("#test div+p")).to.have.length.within(1,1);
    })

    it('[attribute]: [target]   选择带有 target 属性所有元素。', function () {
        var elm = document.getElementById("test");
        elm.innerHTML = '<div><a target="_blank" href="http://jslite.io"></p>';
        expect($("#test [target]")).to.have.length.within(1,1);
    })

    it('[attribute~=value]  [title~=flower] 选择 title 属性包含单词 "flower" 的所有元素。 ',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<div title="tulip flower"><div>';
        expect($("#test [title~=flower]")).to.have.length.within(1,1);
    })

    it('[attribute|=value]  [lang|=en]  选择 lang 属性值以 "en" 开头的所有元素。  ',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<p lang="en">Hello!</p>';
        expect($("#test [lang|=en]")).to.have.length.within(1,1);
    })

    // it(':link   a:link  选择所有未被访问的链接。    ',function(){})
    // it(':visited    a:visited   选择所有已被访问的链接。    ',function(){})
    // it(':active a:active    选择活动链接。 ',function(){})
    // it(':hover  a:hover 选择鼠标指针位于其上的链接。  ',function(){})
    // it(':focus  input:focus 选择获得焦点的 input 元素。   ',function(){})
    // it(':first-letter   p:first-letter  选择每个 <p> 元素的首字母。    ',function(){})
    // it(':first-line p:first-line    选择每个 <p> 元素的首行。 ',function(){})

    it(':first-child    p:first-child   选择属于父元素的第一个子元素的每个 <p> 元素。   ',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<div><p>1</p><p>2</p><p>3</p><p>4</p></div>';
        expect($("#test p:first-child")).to.have.length.within(1,1);
        expect($("#test p:first-child")[0].outerHTML).to.equal('<p>1</p>')
    })

    // it(':before p:before    在每个 <p> 元素的内容之前插入内容。    ',function(){})
    // it(':after  p:after 在每个 <p> 元素的内容之后插入内容。    ',function(){})

    it(':lang(language) p:lang(it)  选择带有以 "it" 开头的 lang 属性值的每个 <p> 元素。  ',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<p>我是唐老鸭。</p> <p lang="en">I live in Duckburg.</p>';
        expect($('#test p:lang(en)')).to.have.length.within(1,1);
    })

    it('element1~element2   p~ul    选择前面有 <p> 元素的每个 <ul> 元素。    ',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<div>一个 div 元素。</div> <ul> <li>咖啡</li> <li>牛奶</li> <li>茶</li> </ul> <p>第一段。</p> <ul> <li>咖啡</li> <li>牛奶</li> <li>茶</li> </ul> <h2>另一个列表</h2> <ul> <li>咖啡</li> <li>牛奶</li> <li>茶</li> </ul>';
        
        expect($('#test p~ul')).to.have.length.within(2,2);
    })

    it('[attribute^=value]  a[src^="https"] 选择其 src 属性值以 "https" 开头的每个 <a> 元素。  ',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="first_test">第一个 div 元素。</div> <div class="second">第二个 div 元素。</div> <div class="test">第三个 div 元素。</div> <p class="test">这是段落中的文本。</p>';
        expect($('#test div[class^="test"]')).to.have.length.within(1,1);
    })

    it('[attribute$=value]  a[src$=".pdf"]  选择其 src 属性以 ".pdf" 结尾的所有 <a> 元素。',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="first_test">第一个 div 元素。</div> <div class="second">第二个 div 元素。</div> <div class="test">第三个 div 元素。</div> <p class="test">这是段落中的文本。</p>';
        expect($('#test div[class$="test"]')).to.have.length.within(2,2);
    })

    it('[attribute*=value]  a[src*="abc"]   选择其 src 属性中包含 "abc" 子串的每个 <a> 元素。',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<div class="first_test">第一个 div 元素。</div> <div class="second">第二个 div 元素。</div> <div class="test">第三个 div 元素。</div> <p class="test">这是段落中的文本。</p>';
        expect($('#test div[class*="test"]')).to.have.length.within(2,2);
    })

    it(':first-of-type  p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<p>这是第一个段落。</p> <p>这是第二个段落。</p> <p>这是第三个段落。</p> <p>这是第四个段落。</p>';
        expect($("#test p:first-of-type")).to.have.length.within(1,1);
        expect($("#test p:first-of-type")[0].outerHTML).to.equal('<p>这是第一个段落。</p>');
    })

    it(':last-of-type   p:last-of-type  选择属于其父元素的最后 <p> 元素的每个 <p> 元素。   ',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<p>这是第一个段落。</p> <p>这是第二个段落。</p> <p>这是第三个段落。</p> <p>这是第四个段落。</p>';
        expect($('#test p:last-of-type')).to.have.length.within(1,1);
        expect($('#test p:last-of-type')[0].outerHTML).to.equal('<p>这是第四个段落。</p>')
    })

    it(':only-of-type   p:only-of-type  选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。   ',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<div> <p>这是一个2段落。</p> </div> <div> <p>这是一个段落。</p> <p>这是一个段落。</p> </div>';
        expect($('#test p:only-of-type')).to.have.length.within(1,1);
        expect($('#test p:only-of-type')[0].outerHTML).to.equal('<p>这是一个2段落。</p>')
    })

    it(':only-child p:only-child    选择属于其父元素的唯一子元素的每个 <p> 元素。   ',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<div> <p>这是一个段落23。</p> </div> <div> <span>这是一个 span。</span> <p>这是一个段落。</p> </div>';
        expect($('#test p:only-child')).to.have.length.within(1,1);
        expect($('#test p:only-child')[0].outerHTML).to.equal('<p>这是一个段落23。</p>');
    })

    it(':nth-child(n)   p:nth-child(2)  选择属于其父元素的第二个子元素的每个 <p> 元素。  ',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<h1>这是标题</h1> <p>第一个段落。</p> <p>第二个段落。</p> <p>第三个段落。</p> <p>第四个段落。</p>';
        expect($('#test p:nth-child(2)')).to.have.length.within(1,1);
        expect($('#test p:nth-child(2)')[0].outerHTML).to.equal('<p>第一个段落。</p>');
    })

    it(':nth-last-child(n)  p:nth-last-child(2) 同上，从最后一个子元素开始计数。',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<h1>这是标题</h1> <p>第一个段落。</p> <p>第二个段落。</p> <p>第三个段落。</p> <p>第四个段落。</p> <p>第五个段落。</p>';
        expect($('#test p:nth-last-child(2)')).to.have.length.within(1,1)
        expect($('#test p:nth-last-child(2)')[0].outerHTML).to.equal('<p>第四个段落。</p>');
    })

    it(':nth-of-type(n) p:nth-of-type(2)    选择属于其父元素第二个 <p> 元素的每个 <p> 元素。   ',function(){
        expect($('#test p:nth-of-type(2)')).to.have.length.within(1,1);
        expect($('#test p:nth-of-type(2)')[0].outerHTML).to.equal('<p>第二个段落。</p>');
    })

    it(':nth-last-of-type(n)    p:nth-last-of-type(2)   同上，但是从最后一个子元素开始计数。  ',function(){
        expect($('#test p:nth-last-of-type(2)')).to.have.length.within(1,1);
        expect($('#test p:nth-last-of-type(2)')[0].outerHTML).to.equal('<p>第四个段落。</p>');
    })

    it(':last-child p:last-child    选择属于其父元素最后一个子元素每个 <p> 元素。   ',function(){
        expect($('#test p:last-child')).to.have.length.within(1,1);
        expect($('#test p:last-child')[0].outerHTML).to.equal('<p>第五个段落。</p>');
    })

    it(':root   :root   选择文档的根元素。',function(){
        expect($(':root')).to.have.length.within(1,1);
    })

    it(':empty  p:empty 选择没有子元素的每个 <p> 元素（包括文本节点）。  ',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<h1>这是标题</h1> <p>第一个段落。</p> <p></p> <p>第三个段落。</p> <p>第四个段落。</p> <p>第五个段落。</p>';
        expect($('#test p:empty')).to.have.length.within(1,1);
        expect($('#test p:empty')[0].outerHTML).to.equal('<p></p>');
    })

    // it(':target #news:target    选择当前活动的 #news 元素。   ',function(){})

    it(':enabled    input:enabled   选择每个启用的 <input> 元素。 ',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<input type="text" value="Mickey" /><input type="text" value="Mouse" /><input type="text" disabled="disabled" value="Disneyland" />';
        expect($('#test input:enabled')).to.have.length.within(2,2);
        expect($('#test input:enabled')[0].outerHTML).to.equal('<input type="text" value="Mickey">');
    })

    it(':disabled   input:disabled  选择每个禁用的 <input> 元素  ',function(){
        expect($('#test input:disabled')).to.have.length.within(1,1);
        expect($('#test input:disabled')[0].outerHTML).to.equal('<input type="text" disabled="disabled" value="Disneyland">');
    })

    it(':checked    input:checked   选择每个被选中的 <input> 元素。',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<input type="radio" checked="checked" value="male" name="gender" /> Male <input type="radio" value="female" name="gender" /> Female <input type="checkbox" checked="checked" value="Bike" /> I have a bike <input type="checkbox" value="Car" /> I have a car';
        expect($('#test input:checked')).to.have.length.within(2,2);
        expect($('#test input:checked')[0].outerHTML).to.equal('<input type="radio" checked="checked" value="male" name="gender">');
    })

    it(':not(selector)  :not(p) 选择非 <p> 元素的每个元素。',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<h1>这是标题</h1> <p>这是一个段落。</p> <p>这是另一个段落。</p> <div>这是 div 元素中的文本。</div>';
        expect($('#test :not(p)')).to.have.length.within(2,2);
        expect($('#test :not(p)')[0].outerHTML).to.equal('<h1>这是标题</h1>');
        elm.innerHTML = '';
    })    
  
    it('.eq(index) 获取当前链式操作中第N个 JSLite 对象。',function(){
        var elm = document.getElementById("test");
        elm.innerHTML = '<ul><li>第1行</li><li>第2行</li><li>第3行</li><li>第4行</li></ul>';
        expect($('#test li').eq(3)).to.have.length.within(1,1);
        expect($('#test li').eq(3)[0].outerHTML).to.equal('<li>第4行</li>');
        // console.log($('#test li').eq(3)[0].outerHTML)
        elm.innerHTML = '';
    })
    // it('::selection ::selection 选择被用户选取的元素部分。',function(){})

})