function sedRequest(urls, max, callbackFunc) {
    const REQUEST_MAX = max;//最大请求数
    const TOTAL_REQUESTS_NUM = urls.length;//数组长度
    const blockQueue = [];//等待队列
    let currentReqNumber = 0;//现在请求的数量是
    let numberOfRequestsDone = 0;//已经完成请求的数量
    let results = new Array(TOTAL_REQUESTS_NUM).fill(false);

    async function init() {
        for (let i = 0; i < urls.length; i++) {
            console.log('现在是第' + i + '个请求' + urls[i])
            request(i, urls[i])
        }
    }
    /*
     async 函数是使用async关键字声明的函数。async 函数是 AsyncFunction 构造函数的实例，并且其中允许使用 await 关键字。async 和 await 关键字让我们可以用一种更简洁的方式写出基于 Promise 的异步行为，
     而无需刻意地链式调用 promise。
     */
    async function request(index, reqUrl) {
        //如果现在的请求数量大于等于最大请求数量
        if (currentReqNumber >= REQUEST_MAX) {
            //把请求包入promise 注意这里是 await new Promise 会停止等待resolve执行才会继续后面的语句
            //await 操作符用于等待一个 Promise 兑现并获取它兑现之后的值。它只能在异步函数或者模块顶层中使用。
            await new Promise(resolve => {
                //这里要保证永远都是resolve 不能拒绝 拒绝 await会抛出错误
                blockQueue.push(resolve)
            })
        }
        reqHandler(index, reqUrl)
    }

    async function reqHandler(index, reqUrl) {
        currentReqNumber++;
        try {
            const result = await fetch(reqUrl);
            results[index] = result;
        } catch (err) {
            results[index] = err;
        } finally {
            currentReqNumber--;
            numberOfRequestsDone++;
            if (blockQueue.length) {
                blockQueue[0]();
                blockQueue.shift();
            }
            if (numberOfRequestsDone === TOTAL_REQUESTS_NUM) {
                callbackFunc(results);
            }
        }
    }
    init();
}

const arr = [
    'asdasd.com',
    'asdasd.com',
    'asdasd.com',
    'asdasd.com',
    'asdasd.com',
    'asdasd.com',
    'asdasd.com',
    'asdasd.com',
    'asdasd.com',
    'asdasd.com',
    'asdasd.com',
]

sedRequest(arr, 3, (result) => console.log(result))