const nums = document.querySelectorAll('.nums span')
const counter = document.querySelector('.counter')
const finalMessage = document.querySelector('.final')
const replay = document.querySelector('#replay')
//文档加载完成就运行动画函数
runAnimation()
/**
 * 重置DOM状态
 */
function resetDOM() {
    counter.classList.remove('hide')
    finalMessage.classList.remove('show')
    nums.forEach(num => {
        num.classList.value = ''
    })
    //给第一个span添加in类
    nums[0].classList.add('in')
}

function runAnimation() {
    //实行切换秒数
    nums.forEach((num, idx) => {
        const nextToLast = nums.length - 1;
        //监听动画事件
        num.addEventListener('animationend', e => {
            //如果执行结束的动画是GOIN 且不是最后一个span元素 则 移除in 添加out 执行Out动画
            if (e.animationName == 'goIn' && idx !== nextToLast) {
                num.classList.remove('in')
                num.classList.add('out')
            } else if (e.animationName === 'goOut' && num.nextElementSibling) {
                //如果执行结束的动画是goout 且 还有下一个兄弟元素 则给兄弟元素添加in执行in动画
                num.nextElementSibling.classList.add('in')
            } else {
                //每个元素都执行过一编动画  结束  展示 重新一遍的按钮
                counter.classList.add('hide')
                finalMessage.classList.add('show')
            }
        })
    })
}
//重置点击按钮
replay.addEventListener('click', () => {
    resetDOM()
    runAnimation()
})