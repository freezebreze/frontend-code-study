const counters = document.querySelectorAll('.counter')

// counters.forEach(counter => {
//     counter.innerText = '0'

//     const updateCounter = () => {
//         const target = +counter.getAttribute('data-target')
//         const c = +counter.innerText

//         const increment = target / 200

//         if (c < target) {
//             counter.innerText = `${Math.ceil(c + increment)}`
//             setTimeout(updateCounter, 1)
//         } else {
//             counter.innerText = target
//         }
//     }

//     updateCounter()
// })

counters.forEach(counter => {
    counter.innerText = '0'
    //执行一个值递增函数
    const updateCounter = () => {
        //得到自定义属性得值 这里加个+号转换为nuber
        const target = +counter.getAttribute('data-target')
        const c = +counter.innerText
        //递增速度
        const increment = target / 200

        if (c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`
            setTimeout(updateCounter, 1);
        } else {
            counter.innerText = target
        }
    }

    updateCounter()
})