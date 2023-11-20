// 数组的常用方法
let array1 = [1, 2, 3, 4, 5]
let array2 = [5, '123', '1233as', 'asdasd']
// at 根据给定的下标输出对应的值
console.log(array1.at(0))
//concat 连接
console.log(array1.concat(array2))
function arrFn(v) {
    console.log(v)
}
//entries  返回键值的迭代器
let ge = array1.entries()
for (v of ge) {
    console.log(v)//expect [0,1] [1,2]....
}
//every 判断数组中的所有元素是否能通过函数的检验 可以返回true 否返回false
console.log(array1.every((v) => {
    return v > 6
}))
//fill 填充数组
console.log(new Array(8).fill({}))
//filter
console.log(array1.filter((v) => v > 3))
//find 返回满足测试函数得第一个得值  同理还有返回下标的
console.log(array1.find(v => v == 1))
console.log(array1.findIndex(v => v == 1))
//flat 返回新数组 并根据指定深度递归地将所有子数组元素拼接到新的数组中。
const arr1 = [0, 1, 2, [3, 4]]
console.log(arr1.flat())