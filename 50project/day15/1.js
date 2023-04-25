const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');

//"2d", 建立一个 CanvasRenderingContext2D 二维渲染上下文。  就是这个的实例
const ctx = canvas.getContext('2d');//获取一个上下文?等于实例化这个canvas 有webgl webgl2 2d bitmaprenderer
let size = 10//画笔初始大小
let isPressed = false//是否按下 标志时候在画画
colorEl.value = 'black'//选色器默认的颜色 设置为黑色
let color = colorEl.value
let x
let y
//画布上的xy坐标
//鼠标按下事件 xy坐标记录赋值给xy
canvas.addEventListener('mousedown', (e) => {
    isPressed = true//标记位置为true防止别的操作冲突

    x = e.offsetX
    y = e.offsetY
})
//鼠标松开 清楚xy 的值
document.addEventListener('mouseup', (e) => {
    isPressed = false

    x = undefined
    y = undefined
})

canvas.addEventListener('mousemove', (e) => {
    //如果鼠标不是按下状态 不要记录 因为这个事件是鼠标移动就会触发  但是我们是需要按住鼠标来移动才是画图 所以先判断一下
    if (isPressed) {
        //移动的距离 用坐标表示
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2)//先在按压下的地方画个圆 
        drawLine(x, y, x2, y2) //然后计算差值一直往前渲染 就成一条线

        x = x2
        y = y2
    }
})

//画圆
function drawCircle(x, y) {
    //创建新路径
    ctx.beginPath();
    //圆心 (x,y)坐标  半径  起点按X轴方向开始计算  圆弧的终点，单位以弧度表示
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    //是 Canvas 2D API 根据当前的填充样式
    ctx.fill()
}
//画直线
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    //线从 (x1, y1) 处开始，并在 (x2 y2) 处结束 这里是设置好路径 但是没绘制出来 也就是在图上是没有的
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    //根据当前的画线样式，绘制当前或已经存在的路径的方法。
    ctx.stroke()
}

//更新画笔大小的操作
increaseBtn.addEventListener('click', () => {
    size += 5

    if (size > 50) {
        size = 50
    }

    updateSizeOnScreen()
})

decreaseBtn.addEventListener('click', () => {
    size -= 5

    if (size < 5) {
        size = 5
    }

    updateSizeOnScreen()
})

//input的事件 更改颜色的时候 设置画笔颜色为选中的颜色
colorEl.addEventListener('change', (e) => color = e.target.value)
//清空canvas区域 CanvasRenderingContext2D.clearRect() 是 Canvas 2D API 的方法，这个方法通过把像素设置为透明以达到擦除一个矩形区域的目的。
clearEl.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))
//https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D 2d绘制就靠这个了