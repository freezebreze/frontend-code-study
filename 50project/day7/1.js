const loadText = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')

//设定初始值
let load = 0;

let int = setInterval(blurring, 30)

function blurring() {
    load++
    if (load > 99) {
        clearInterval(int)
    }
    loadText.innerText = `${load}%`
    //控制字体的透明度 直到变0
    loadText.style.opacity = scale(load, 0, 100, 1, 0)
    //高斯模糊 从100到0
    // bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
}

//看不太懂的公司 但是根据链接看到的信息是 给定一个范围 将输入值映射到这段范围内的一个值  数学不好看不懂 哎
// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}