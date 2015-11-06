describe('effects 效果', function () {

    it('.hide() - 隐藏匹配节点对象。', function () {
        var elm = document.getElementById("test");
            elm.innerHTML = '<div></div>';
        expect($("#test div").hide()[0].style.display).to.equal('none');

    })
    
    it('.show() - 显示匹配节点对象。', function () {

        expect($("#test div").show()[0].style.display).to.equal('');

    })

    it('.toggle() - 显示或隐藏匹配节点对象。', function () {

        expect($("#test div").toggle()[0].style.display).to.equal('none');
        expect($("#test div").toggle()[0].style.display).to.equal('');
        expect($("#test div").toggle()[0].style.display).to.equal('none');
        var elm = document.getElementById("test");
            elm.innerHTML = '';

    })

})