const container = document.getElementById('container')
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71']
const SQUARES = 500

for (let i = 0; i < SQUARES; i++) {
    const square = document.createElement('div')
    //设置样式
    square.classList.add('square')
    //为每个盒子添加事件  鼠标移入 变色 移出  恢复
    //当一个定点设备（通常指鼠标）在一个元素本身或者其子元素上移动时，mouseover 事件在该元素上触发。
    square.addEventListener('mouseover', () => setColor(square))
    //mouseout 事件在定点设备（通常是鼠标）移动至元素或其子元素之外时，会在该元素上触发。
    square.addEventListener('mouseout', () => removeColor(square))
    container.appendChild(square)
}

//设置颜色
function setColor(element) {
    const color = getRandomColor();
    element.style.background = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

//移除颜色
function removeColor(element) {
    element.style.background = '#1d1d1d'
    element.style.boxShadow = '0 0 2px #000'
}


//获取随机颜色
function getRandomColor() {
    return colors[Math.round(Math.random() * colors.length)];
}