//手写一个new
function myNew(fn, ...arg) {
    //创建一个新`的对象
    let obj = {}
    //指向构造函数的原型   实例上有个[[prototype]] 或者现在浏览器实现的都叫__proto__ 指向构造函数的原型  然后这个原型的constructor指向构造函数
    //实例和构造函数是没有直接关系的,需要通过原型链来建立关系  实例->构造函数的原型->构造函数 这样实例和构造函数都继承于一个实例 
    obj.__proto__ = fn.prototype
    //绑定this的值 也就是函数运行 或者实例运行时的上下文环境(变量的环境)
    let result = fn.apply(obj, age)
    return result instanceof Object? result : obj;
}
// 构造函数要是没有显示的return 一个对象 那么就会方法刚才创建的新对象