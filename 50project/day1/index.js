// 先拿到页面元素 按钮和 我们展示Boxs的盒子
const btn = document.getElementById('btn');
const boxs = document.getElementById('boxes');

//为按钮添加点击事件 切换样式
//DOMTokenList 接口的 toggle() 方法从列表中删除一个给定的标记并返回 false。如果标记不存在，则添加并且函数返回 true。
btn.addEventListener('click', () => {
    boxs.classList.toggle('big');
})
//循环添加盒子  4x4的盒子 双层循环添加
for (let i = 0; i < 4; ++i) {
    for (let j = 0; j < 4; ++j) {
        //创建元素 di
        const box = document.createElement('div');
        //添加样式
        box.classList.add('box');
        //
        box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`;
        //将盒子添加到外层
        boxs.appendChild(box);
    }
}