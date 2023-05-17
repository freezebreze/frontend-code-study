
/**
 * 防抖
 * @param {*} func 
 * @param {*} wait 
 * @returns 
 */
function debounce(func, wait) {
    let timeout;
    return function () {
        let context = this;
        let arg = arguments;
        if (timeout) clearTimeout(timeout); // timeout 不为null
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait);
    }
}