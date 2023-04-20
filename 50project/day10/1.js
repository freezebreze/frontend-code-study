const range = document.getElementById('range')




range.addEventListener('input', (e) => {
    let value = e.target.value;
    const label = e.target.nextElementSibling
    //label的定位位置也要跟随值前进
    //进度条的位置 滑块凹槽
    const range_width = getComputedStyle(e.target).getPropertyValue('width');
    //进度条圆圈的位置 滑块
    const label_width = getComputedStyle(label).getPropertyValue('width')
    const num_width = +range_width.substring(0, range_width.length - 2)
    const num_label_width = +label_width.substring(0, label_width.length - 2)

    const max = +e.target.max
    const min = +e.target.min
    //这段公式看不懂 吃了文化的亏 妈的  有空学学数学
    const left = value * (num_width / max) - num_label_width / 2 + scale(value, min, max, 10, -10)
    //调整滑块 定位的值
    label.style.left = `${left}px`
    //改变value
    label.innerHTML = value
})

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}