const buttons = document.querySelectorAll('.ripple')

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const x = e.pageX
        const y = e.pageY
        //触发元素的相对的位置
        const buttonTop = e.target.offsetTop
        const buttonLeft = e.target.offsetLeft

        //button内的坐标  这样可以相对计算出来  因为窗口大小在动态变化 得到点击得坐标
        const xInside = x - buttonLeft
        const yInside = y - buttonTop
        console.log(x, y, buttonTop, buttonLeft, xInside, yInside)

        //创建一个元素 绑定带有动画的类
        const circle = document.createElement('span')
        circle.classList.add('circle')//添加动画过渡类
        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'
        //定位到点击的点了开始 像外圈扩散  白色的 波浪  透明度慢慢变透明 达到最外圈就不见
        this.appendChild(circle)

        setTimeout(() => circle.remove(), 500)
    })
})