/**
 * Promise 的理解 和使用
 */


//简单使用
//Promise 的构造函数 接受一个参数 该参数是一个函数 这个函数又他妈又两个参数  这两个参数会被赋值成两个函数？
//这里 传的参数名 语义化点  否则 传给a b也是一样的   都会变成一个函数 可以这样调用 a()  b()
const b = new Promise((resolve, reject) => {
    //做一些请求  比如请求数据  xxxx之类的
    //加如 成功 返回一个promise 对象 并且可以传值
    if (1) {
        resolve(1);
    } else {
        reject(2);
    }
})
//然后可以调用then方法  链式调用  resolve or reject 都会返回一个promise对象  该对象有个属性是我们resoleve或者reject的值

b.then((res) => {
    console.log(res); //output 1 如果是reject  output 2
})


//地狱回调
setTimeout(function () {  //第一层
    console.log('张三');//等3秒打印张三在执行下一个回调函数
    setTimeout(function () {  //第二层
        console.log('李四');//等2秒打印李四在执行下一个回调函数
        setTimeout(function () {   //第三层
            console.log('王五');//等一秒打印王五
        }, 1000)
    }, 2000)
}, 3000)


//promise 解决
function callBack(str) {
    let promise = new promise((resolve, reject) => {
        let flag = true;
        setTimeout(() => {
            if (flag) {
                resolve(str);
            } else {
                reject('error');
            }
        });
    })
    return promise;
}
//链式调用
callBack('张三').then((res) => {
    console.log(res);
    return callBack('李四');
}).then((res) => {
    console.log(res);
    return callBack('王五');
})

//async
async function test() {
    let a = await callBack('a');
    let b = await callBack('b');
    
}