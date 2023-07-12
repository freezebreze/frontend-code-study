const ajax = (method, url) => {
    return new Promise((res, rej) => {
        //发起网络请求 成功resolve  失败reject
        let request = new XMLHttpRequest()
        request.open(method, url)
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                console.log('请求完成')
                if (request.status === 200) {
                    console.log('请求成功')
                    resolve.call(null, request.response) //成功则调用resolve
                } else {
                    console.log('请求失败')
                    reject.call(null, request) //失败则调用reject
                }
            }
        }
        request.send()
    })
}

/**
 * 并发控制请求数量
 */
function sendRequest(requestlist, limits, callback) {
    const promises = requestlist.slice()
    //并发数 取最小值 
    const concurrentNum = Math.min(limits, requestlist.lenght)
    let concurrentCount = 0 // 当前并发数
    //启动初次能执行的任务
    const runTaskNeeded = () => {
        let i = 0;
        while (i < concurrentNum) {
            runTask()
        }
    }
    // 取出任务并推送到执行器
    const runTask = () => {
        const task = promises.shift()
        task && runner(task)
    }


    // 执行器，这里去执行任务
    const runner = async (task) => {
        try {
            concurrentCount++
            await task()
        } catch (error) {

        } finally {
            concurrentCount--
            picker()
        }

    }
    // 捞起下一个任务
    const picker = () => {
        // 任务队列里还有任务并且此时还有剩余并发数的时候 执行
        if (concurrentCount < limits && promises.length > 0) {

            // 继续执行任务

            runTask()

            // 队列为空的时候，并且请求池清空了，就可以执行最后的回调函数了

        } else if (promises.length == 0 && concurrentCount == 0) {

            // 执行结束 调用回调

            callback && callback()

        }
    }
    // 开始执行！
    runTaskNeeded()
}

async function sendRequest1(requestList, limits, callback) {

    // 维护一个promise队列

    const promises = []

    // 当前的并发池,用Set结构方便删除

    const pool = new Set() // set也是Iterable<any>[]类型，因此可以放入到race里

    // 开始并发执行所有的任务

    for (let request of requestList) {

        // 开始执行前，先await 判断 当前的并发任务是否超过限制

        if (pool.size >= limits) {

            // 这里因为没有try catch ，所以要捕获一下错误，不然影响下面微任务的执行


            await Promise.race(pool)

                .catch(err => err)

        }

        const promise = request()// 拿到promise

        // 删除请求结束后，从pool里面移除

        const cb = () => {

            pool.delete(promise)

        }

        // 注册下then的任务

        promise.then(cb, cb)

        pool.add(promise)

        promises.push(promise)

    }

    // 等最后一个for await 结束，这里是属于最后一个 await 后面的 微任务

    // 注意这里其实是在微任务当中了，当前的promises里面是能确保所有的promise都在其中(前提是await那里命中了if)


    Promise.allSettled(promises).then(callback, callback)

}
