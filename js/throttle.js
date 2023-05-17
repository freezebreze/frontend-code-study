/**
 * 时间戳写法
 * delay时间内多次触发只执行一次
 * @param {*} fn 需要节流的函数
 * @param {*} delay 时间 ms
 */
function throttled1(fn, delay = 1000) {
    let oldtime = Date.now()
    return function (...args) {
        let newtime = Date.now()
        if (newtime - oldtime >= delay) {
            fn.apply(null, args)
            //改变oldtime
            oldtime = Date.now()
        }
    }
}

let div = document.createElement('div')
div.append('时间戳节流盒子 0.5s内最多触发一次')
function divClick() {
    console.log('延时')
}
let body = document.getElementsByTagName('body')[0]
let throttleFn = throttled1(divClick, 1000);
div.addEventListener('click', throttleFn)
div.classList = 'box';
body.appendChild(div)

/**
 * 定时器写法
 * delay时间内多次触发只执行一次
 * @param {*} fn 需要节流的函数
 * @param {*} delay 时间 ms
 */
function throttled2(fn, delay = 1000) {
    let timer = null
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                //执行完函数后要重新设置timer为null
                fn.apply(this, args)
                timer = null
            }, delay);
        }
    }
}
let div2 = document.createElement('div')
let throttleFn2 = throttled2(divClick, 500);
div2.append('定时器节流盒子 函数间隔0.5s运行')
div2.addEventListener('click', throttleFn2)
div2.classList = 'box';
body.appendChild(div2)

/**
 * 两个结合的实现
 * @param {Function} fn 
 * @param {Number} delay 
 */
function throttled(fn, delay = 500) {
    let timer = null
    let starttime = Date.now()
    return function () {
        let curTime = Date.now() // 当前时间
        let remaining = delay - (curTime - starttime)  // 从上一次到现在，还剩下多少多余时间
        let context = this
        let args = arguments
        clearTimeout(timer)
        //如果超过间隔则立即执行 并更新上一次执行时间
        if (remaining <= 0) {
            fn.apply(context, args)
            starttime = Date.now()
        } else {
            //否则调用定时器在多少ms后执行
            timer = setTimeout(fn, remaining);
        }
    }
}

let div3 = document.createElement('div')
let throttleFn3 = throttled(divClick, 500);
div3.append('完整版实现节流')
div3.addEventListener('click', throttleFn3)
div3.classList = 'box';
body.appendChild(div3)