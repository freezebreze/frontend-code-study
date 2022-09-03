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
        //每个元素的样式 宽高都为125px 也就是一个125的小窗 每个box的背景都是同一张图  根据这个来设置位置显示不同的地方
        //第一个块 显示的是 -125px 0px   xy坐标  浏览器的xy左边是默认在左上角为0.0点
        /*
         * 第一行 第一个坐标 0 0 然后加上盒子的宽高 125 125 显示的图内容就是 125,125
         * 反正这个计算还是挺精巧的 反正就是用125宽高的视窗盒子来显示图片的一小块一小块
         */
        box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`;
        //将盒子添加到外层
        boxs.appendChild(box);
    }
}