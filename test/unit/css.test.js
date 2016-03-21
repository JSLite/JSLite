discribe('CSS样式处理方法',function(){

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
        elm.innerHTML = '';
    })

})