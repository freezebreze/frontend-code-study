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
    readonly id:number
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
