
describe('serialize 序列化。', function () {


    it('.param() 将表单元素数组或者对象序列化。', function () {

        assert.equal( decodeURI($.param({foo: {one: 1,two: 2 } })), 'foo[one]=1&foo[two]=2')
        assert.equal( decodeURI($.param({ids:["a1","b2","c3"], c:{g:23,e:[567]}, a:3 })), 'ids[]=a1&ids[]=b2&ids[]=c3&c[g]=23&c[e]=567&a=3')
        assert.equal( decodeURI($.param([1,2,3])), '0=1&1=2&2=3')
        assert.equal( decodeURI($.param({ids:[1,2,3] })), 'ids[]=1&ids[]=2&ids[]=3')
        assert.equal( decodeURI($.param({ids:["a1","b2","c3"], c:{g:23,e:[567]}, a:3 },true)), 'ids=a1&ids=b2&ids=c3&c=[object Object]&a=3')

    })

    it('.serialize() 将表单元素数组或者对象序列化。', function () {

        var elm = document.getElementById("test");
        elm.innerHTML = '<form> <input type="text" name="name" value="kacper"> <select name="school"> <option value="中学">Volvo</option> <option value="大学" selected="selected">Saab</option> <option value="小学">Opel</option> </select> <input type="radio" name="gender" value="1"> <input type="radio" name="gender" checked="checked" value="2"> </form>';
        assert.equal( decodeURI($('#test form').serialize()), 'name=kacper&school=大学&gender=2')        

    })

    it('.serializeArray() 将表单元素数组或者对象序列化。', function () {

        var elm = document.getElementById("test");
        elm.innerHTML = '<form> <input type="text" name="name" value="kacper"> <select name="school"> <option value="中学">Volvo</option> <option value="大学" selected="selected">Saab</option> <option value="小学">Opel</option> </select> <input type="radio" name="gender" value="1"> <input type="radio" name="gender" checked="checked" value="2"> </form>';
        assert.equal( JSON.stringify($('#test form').serializeArray()), '[{"name":"name","value":"kacper"},{"name":"school","value":"大学"},{"name":"gender","value":"2"}]')        

    })

    // 还没有找到测试方法
    it('.getUrlParam() 获取 url 参数的值。', function () {

        // document.location.search='?id=22&name=%E4%B8%AD%E6%96%87&DEBUG'
        var search = '?id=22&name=%E4%B8%AD%E6%96%87&DEBUG'
        assert.equal( $.getUrlParam('id', search),   '22')
        assert.equal( $.getUrlParam('name', search), '中文')
        assert.equal( $.getUrlParam('DEBUG', search), undefined)

        var params = $.getUrlParam(null, search)
        assert.equal( params.id,   '22')
        assert.equal( params.name, '中文')
        assert.equal( params.DEBUG, undefined)
        
    })


})