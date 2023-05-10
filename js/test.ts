//ts在我理解就是一个补充Js没有变量类型预检查的功能 在编译阶段直接检查   不用在运行时 进行过多的类型判断


//interface  声明一个对象或者类里面的属性的类型  接口声明
interface User {
    name: string;
    age: number;
}
// 使用方式 const xx : XXXX = {}     :后面跟着你定义的类型  或者是js系统已经定义的数据类型
const a: User = {
    name: '123',
    age: 123
}
//可选属性
interface User1 {
    name: string;
    age?: number
}
//任意类型属性 这里有很多细节  使用时要注意 具体看文档
interface User2 {
    name: string;
    age?: number;
    [propName: string]: any
}
//只读属性 readonly 开头声明
interface User3 {
    readonly id: number
}

//接口声明与类一起使用
class UserAccount {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const b: User = new UserAccount('12', 1);
//联合类型  type 开头表示联合类型
type MyBool = true | false;
//WindowStates 必须是以下的值 有点类似枚举类
type WindowStates = "open" | "closed" | "minimized";
//用在函数参数上 字符串或者字符串数组 或者整数数组
function getLength(obj: string | string[] | number[], name: string) {

}
//泛型 Array<elemType> 数组泛型  可能大概别的泛型也是这样形式的表示 但是好像确实只有数组里面的值可能有很多类型
type stringArray = Array<string>;
//这样会报错
// let c : stringArray = [1,2,3,4];
let c: stringArray = ['1', '2'];
//声明自己使用 的泛型
interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type
}

//使用  declare 声明  告诉ts back这个变量 使用的是这个类型 string会替换掉刚才声明的Type  以达到一个动态声明的效果 所以叫泛型吧?很广泛  比如这个可以是string 可以是number等
declare const back: Backpack<string>
//然后可以通过这个泛型的变量 为别的变量定义类型 比如这个get 就会return Type也就是刚才传入的string 所以object是string类型的
const object = back.get();
//这里不能传入数字 只能传入string类型的变量
// back.add(1)
//函数的类型 函数声明
function sum(x: number, y: number): number {
    return x + y;
}
// 或者函数表达式 太麻烦和傻逼了  狗都不用
let sum1: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
}
//用接口定义函数的形状  更麻烦 凑字数?  想不到什么函数要搞这么复杂
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    return source.search(subString) !== -1;
}

//可选参数 用?号表示可选参数
function fn1(x: number, y?: number | string): void {
    let a = x;
}
//参数默认值
function fn2(x: number = 1, y?: number | string): void {
    let a = x;
}
//剩余参数 ...rest 因为是数组 所以我  只能放在最后定义
function fn3(x: number = 1, y?: number | string, ...arr: any[]): void {
    let a = x;
}
//重载 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
//类型断言  将一个可能为多个类型的情况的值断言为一个值?
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function getName(animal: Cat | Fish) {
    // animal.swim();
    return animal.name;
}
//这里可以看出 有两个类型一个是cat 一个是fish   都有不同的方法 我们不能确定传入的是哪个 如果使用animal.swim() 会报错 只能调用共同的属性name
// 变量 as 断言的类型 语法
function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}
//不要滥用断言 这里是欺骗ts的编译器 让它认为这个变量就是某个类型  但是实际使用中还是会有可能人为的错误
//ts是在编译时发现错误   js是运行时报错的


//声明 declare  主要是给ts的编译器声明的 让ts明白一些非js语法或者别的库 Npm包的一些东西  类似 php 命名空间 use 这种?
// jquery('#xxx')   ts 是不知道这个是jquery的 所以要声明 一个变量(这个是对TS的编译器才有用的变量)
declare var jQuery: (selector: string) => any;
//通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件
// xxx.d.ts
/**
 * 编译器会扫面所有.d.ts文件
 * 一般来说，ts 会解析项目中所有的 *.ts 文件，当然也包含以 .d.ts 结尾的文件。所以当我们将 jQuery.d.ts 放到项目中时，其他所有 *.ts 
 * 文件就都可以获得 jQuery 的类型定义了。
 */
// declare var 声明全局变量
// declare function 声明全局方法
// declare class 声明全局类
// declare enum 声明全局枚举类型
// declare namespace 声明（含有子属性的）全局对象
// interface 和 type 声明全局类型
//泛型 <T>   两个括号包起来 