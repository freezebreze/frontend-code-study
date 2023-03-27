/**
 * @description 检测数组里的所有元素是否能通过fn
 * @param {Array} arr 
 * @param {Function} fn 
 * @returns {boolean}
 */
const every = (arr, fn) => {
    let result = true;
    for (const value of arr) {
        result = result && fn(value);
    }
    return result;
}

console.log(every([NaN, NaN, 1], isNaN));//output false
console.log(every([NaN, NaN, NaN], isNaN));//output true

/**
 * @description 检测数组里的所有元素只要有一个元素通过就返回true
 * @param {Array} arr 
 * @param {Function} fn 
 * @returns {boolean}
 */
const some = (arr, fn) => {
    let result = false;
    for (const value of arr) {
        result = result || fn(value);
    }
    return result;
}

console.log(some([NaN, NaN, 1], isNaN));//output true
console.log(some([1, 1, 1], isNaN));//output false

/**
 * @description 如果predicate为true 则执行fn函数
 * @param {boolean} predicate 
 * @param {Function} fn
 */
const unless = (predicate, fn) => {
    if (!predicate)
        fn();
}

/**
 * @description 从0开始迭代多少次
 * @param {Number} times 
 * @param {Function} fn 
 */
const times = (times, fn) => {
    for (let i = 0; i < times; i++) {
        fn(i);
    }
}

//求0-10的偶数
times(10, (x) => {
    unless(x % 2, () => console.log(x, 'is even'));
})

/**
 * @description 接受一个指返回一个函数
 * @param {*} value 
 * @returns {Function}
 */
const tab = (value) => {
    return (fn) => {
        typeof (fn) === 'function' && fn(value);
    }
}

tab('text tab fun')((x) => {
    console.log(x);
})

const map = (arr, fn) => {
    let results = [];
    for (const v of arr) {
        results.push(fn(v));
    }
    return results;
}

/**
 * @description 将多个参数的函数转成接收一个参数的函数
 * @param {*} fn 
 */
const unary = (fn) => {
    fn.length === 1 ? fn : (arg) => fn(arg);
}

const once = (fn) => {
    //是否停止
    let done = false;
    return () => {
        return done ? undefined : ((done = true), fn());
    }
}

let testOnce = once(() => { console.log('once') });
testOnce();
testOnce();

const memoized = (fn) => {
    //记录已经求得的值
    let lookupTable = {};
    return (arg) => {
        return lookupTable[arg] || (lookupTable[arg] = fn(arg));
    }
}

var factorial = (n) => {
    if (n === 0) {
        return 1;
    }

    // This is it! Recursion!!
    return n * factorial(n - 1);
}
let fastFactorial = memoized(factorial);
console.log(fastFactorial(5));
console.log(fastFactorial(5));

const filter = (array, fn) => {
    let result = [];
    for (const value of array) {
        (fn(value)) ? result.push(value) : undefined;
    }
    return result;
}

//数组扁平化
const concatAll = (array) => {
    let results = [];
    for (const value of array) {
        //push(v1,v2,v3,v4) 用apply方法解决需要填多个值的情况把数组传递给apply
        results.push.apply(results, value);
    }

    return results;
}

const reduce = (array, fn, initialValue) => {
    let accumlator;
    //如果设置了初始参数则讲其赋值给init 
    if (initialValue != undefined) {
        accumlator = initialValue;
    }
    else {
        //没有给初始值就取第一个
        accumlator = array[0];
    }

    if (initialValue === undefined) {
        //从数组的第二个元素 也就是下标为1的元素取值
        for (let i = 1; i < array.length; i++) {
            accumlator = accumlator + array[i];
        }
    } else {
        for (const value of array) {
            //从0开始加起 有初始值
            accumlator = fn(accumlator, value)
        }
    }

    return accumlator;
}
//合并两个给定的数组
const zip = (leftArr, rightArr, fn) => {
    let index, results = [];
    for (index = 0; index < Math.min(leftArr.length, rightArr.length); index++) {
        results.push(fn(leftArr[index], rightArr[index]));
    }
    return results;
}

//一元柯里化
const curry = (binaryFn) => {
    return function (firstArg) {
        return function (secondArg) {
            return binaryFn(firstArg, secondArg);
        }
    }
}

const add = (x, y) => x + y;
let autoCurriedAdd = curry(add)
console.log("Curried summation", autoCurriedAdd(2)(2)); // 打印 "Curried summation 4"


//n柯里化
const curryN = (fn) => {
    //检测fn是不是函数
    if (typeof (fn) !== 'function') {
        throw Error('no function provided')
    }
    return function curriedFn(...args) {
        //如果传进来的参数还不够fn函数所需要的参数
        if (args.length < fn.length) {
            return function () {
                return curriedFn.apply(null, args.concat([].slice.call(arguments)));
            }
        }

        //参数够了则直接运行
        return fn.apply(null, args);
    }
}

const setTimeoutWrapper = (time, fn) => {
    setTimeout(fn, time);
}
const delayTenMs = curryN(setTimeoutWrapper)(1000);
delayTenMs(() => console.log("Do X task")); // 一秒后打印 "Do X task"
delayTenMs(() => console.log("Do Y task")); // 一秒后打印 "Do Y task"
//偏应用 柯里化预设参数值
const partial = function (fn, ...partialArgs) {
    let args = partialArgs.slice(0);//返回一个参数得新数组，不要对原始参数做改变
    //返回一个函数
    return function(...fullArguments) {
        let arg = 0;
        //从第一个参数开始 如果参数已经够了则执行函数
        for(let i = 0; i < args.length && arg < fullArguments.length; i++) {
            
            //如果当前得参数没有设置 也就是undefined  args得值设置为传入得参数 从0开始取，
            if (args[i] === undefined) {
                args[i] = fullArguments[arg++];
            }
        }
        return fn.apply(this, args);
    }
}
let delayTenMsPartial = partial(setTimeout, undefined, 1000);//function(...fullArguments) args = ['setTimeout', 'undefined', 1000]
delayTenMsPartial(() => console.log("Do X. . .  task"))//fullArguments = [fn]
delayTenMsPartial(() => console.log("Do Y . . . . task"))
//函数得组合

let compose = (a, b) => (c) => {
    return a(b(c));
}
//组合多个函数 数据流是从右往左 执行组合得函数
let composeN = (...fns) => {
    return (value) => {
        reduce(fns.reverse(), (acc, fn) => {
            return fn(acc);
        }, value)
    }
}
// let testComposeN = pipe(fn1, fn2, fn3)  testComposeN(v) => fn1(fn2(fn3(v)))
//管道 数据流从左往右执行组合得函数
let pipe = (...fns) => {
    return (value) => {
        reduce(fns, (acc, fn) => {
            return fn(acc);
        }, value)
    }
}
// let testPipe = pipe(fn1, fn2, fn3)  testPipe(v) => fn3(fn2(fn1(v)))


//函子
const container = function(val) {
    this.value = val;
}

container.of = function(value) {
    return new container(value);
}

container.prototype.map = function(fn) {
    return container.of(fn(this.value));
}
let double = (x) => x + x;
container.of(3).map(double).map(double)