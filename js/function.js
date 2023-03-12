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