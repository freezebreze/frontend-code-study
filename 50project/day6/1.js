const body = document.body
const slides = document.querySelectorAll('.slide')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')

let activeSlide = 0

rightBtn.addEventListener('click', () => {
    activeSlide++;
    //超出长度返回第一张
    if (activeSlide > slides.length - 1) {
        activeSlide = 0
    }
    //设置body的背景
    setBgToBody()
    //设置当前激活的背景图
    setActiveSlide()
})

leftBtn.addEventListener('click', () => {
    activeSlide--

    if (activeSlide < 0) {
        activeSlide = slides.length - 1
    }

    setBgToBody()
    setActiveSlide()
})

function setBgToBody() {
    //给body添加背景图片
    body.style.backgroundImage = slides[activeSlide].style.backgroundImage;
}

function setActiveSlide() {
    //先去掉所有存在的active样式
    slides.forEach((item) => item.classList.remove('active'))
    //给当前选中的图片增加样式
    slides[activeSlide].classList.add('active')
}

setBgToBody();