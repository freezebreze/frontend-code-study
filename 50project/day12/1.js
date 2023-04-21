const loveMe = document.querySelector('.loveMe')
const times = document.querySelector('#times')

let clickTime = 0
let timesClicked = 0

loveMe.addEventListener('click', (e) => {
    //监听单击事件 浏览器没有双击事件 因为都是鼠标左键点击 通过两次点击事件的事件间隔来判断
    if (clickTime === 0) {
        clickTime = new Date().getTime()
    } else {
        if ((new Date().getTime() - clickTime) < 800) {
            //执行动画
            createHeart(e)
            clickTime = 0
        }
        clickTime = new Date().getTime()
    }
})

function createHeart(e) {
    //创建一个i标签 插入 字体图标 爱心
    const heart = document.createElement('i')
    //添加对应的类  详情参见font-awesome
    heart.classList.add('fas')
    heart.classList.add('fa-heart')

    //得到我们在图片内点击得坐标
    //这个是点击时 相对屏幕得x,y坐标 
    const x = e.clientX
    const y = e.clientY
    //当前元素距离屏幕左边界和顶部得偏移量
    const leftOffset = e.target.offsetLeft
    const topOffset = e.target.offsetTop
    //由于使用得是相对定位 爱心会相对在图片内 而不是在整个body 用点击得X,Y减去图片相对偏移量可以得到 爱心相对与图片得绝对定位坐标
    const xInside = x - leftOffset
    const yInside = y - topOffset

    //设置相对于图片得 定位偏移量
    heart.style.top = `${yInside}px`
    heart.style.left = `${xInside}px`
    //添加元素
    loveMe.appendChild(heart)
    //增加点击次数
    times.innerHTML = ++timesClicked
    //固定事件移除爱心
    setTimeout(() => heart.remove(), 1000)
}