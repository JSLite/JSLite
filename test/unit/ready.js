describe('ready 添加一个事件侦听器，当页面 dom 加载完毕 DOMContentLoaded 事件触发时触发。', function () {

    it('ready', function () {
        var elm = $(document).ready(function(J,w){
            assert.equal(J,$);
        })
        assert.lengthOf(elm,1)
        assert.include(elm,document)
        var elm = $(function(J){
            assert.equal(J,$);
        })
        assert.lengthOf(elm,1)
        assert.include(elm,document)
    })

})