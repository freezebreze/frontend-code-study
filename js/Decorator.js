//这个功能就类似编译阶段的混入 





function Ak(target) {
    target.ak = true
}

@Ak
class a {

}

let obj = new a()
console.log(obj.ak)

/**
 * 类的装饰器
 * 类属性装饰器
 */

@testtab
class myClass {

}

/**
 * 
 * @param {*} target 装饰器的第一个参数   要装饰的目标对象  
 */
function testtab(target) {
    target.isTestable = true;
}
//传递参数则return function 闭包 包装起来  @testtab(xxx)这样调用
function testtab(target) {
    return function (arg) {
        target.isTestable = true;
    }
}
//类属性的修饰 当对类属性进行装饰的时候，能够接受三个参数：
//类的原型对象
// 需要装饰的属性名
// 装饰属性名的描述对象   get set writable 迭代
function readonly(target, name, descriptor) {
    descriptor.writable = false; // 将可写属性设为false
    return descriptor;
}
//这样修饰后 这个属性就是不可以写的
class Person {
    @readonly
    name() { return `${this.first} ${this.last}` }
}

//尾递归
function pow(x, n, total) {
    total = 1
    if (x == 0) return 0
    if (n == 0) return 1
    if (n == 1 && total != 1) return x * total
    if (n == 1) return x
    return pow(x, n - 1, total * x)
}
//
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}
//
function factorial(n, total) {
    total = 1;
    if (n === 1) return 1;
    return factorial(n - 1, n * total);
}