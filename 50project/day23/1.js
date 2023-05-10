const toggles = document.querySelectorAll('.toggle')
const good = document.querySelector('#good')
const cheap = document.querySelector('#cheap')
const fast = document.querySelector('#fast')
//当 <input type="checkbox"> 元素被选中或取消选中时（通过点击或使用键盘）；
toggles.forEach(toggle => toggle.addEventListener('change', (e) => doTheTrick(e.target)))
function doTheTrick(theClickedOne) {
    if (good.checked && good.checked && good.checked) {
        if(good === theClickedOne) {
            fast.checked = false
        }

        if(cheap === theClickedOne) {
            good.checked = false
        }

        if(fast === theClickedOne) {
            cheap.checked = false
        }
    }
}
// https://www.cnblogs.com/mdengcc/p/6502108.html#:~:text=%E7%82%B9%E5%87%BBlabel%E7%9A%84,%E5%B0%B1%E6%94%B9%E6%88%90true.
//隐藏input 点击label 触发事件 然后会通知checkbox改变自己的状态