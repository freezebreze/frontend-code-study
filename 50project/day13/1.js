const sliderContainer = document.querySelector('.slider-container')
const slideRight = document.querySelector('.right-slide')
const slideLeft = document.querySelector('.left-slide')
const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')
//获取右边图片的数量
const slidesLength = slideRight.querySelectorAll('div').length
//当前展示的图片的下标0-4不能大于4
let activeSlideIndex = 0
//左边图的起始量 随便定 这里是对应了 默认的图片所以调到了-300vh 刚好第四张图对应
slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`
upButton.addEventListener('click', () => changeSlide('up'))
downButton.addEventListener('click', () => changeSlide('down'))


function changeSlide(direction) {
    const sliderHeight = 100
    // const sliderHeight = sliderContainer.clientHeight
    if (direction == 'up') {
        activeSlideIndex++
        if (activeSlideIndex > slidesLength - 1) {
            //回到初始位置 0 1 2 3
            activeSlideIndex = 0
        }
    }

    if (direction == 'down') {
        activeSlideIndex--
        if (activeSlideIndex < 0) {
            //0 -1-> 3 2 1
            // 如果小于0则跳转到另一边头
            activeSlideIndex = slidesLength - 1
        }
    }
    slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}vh)`
    slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}vh)`
    //原作者这里写的是获取 包含快元素内部的高度  然后在跳转  不知道和这个视口有什么区别 实测下来也没发现有什么问题
    // lideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
    // slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`
} 