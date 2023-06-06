class Observer {
    //将对象的所有属性劫持
    //通过object.defineproperty 方法 对每个属性就行 劫持 
    /*
    设置它的get 方法  当某个数据需要订阅时  将它加入订阅列表 然后正常返回值
    set 方法  当数据更改后通知订阅的 更新数据
     */
}


class dep {
    /**
     * 依赖收集
     * 将依赖保存到依赖数组
     * 提供一个添加依赖到该
     */
}

class watcher {
    /**
     * 生成依赖
     * 
     */
}

setTimeout(() => {
    console.log(5)
}, 0)
console.log(1)
new Promise((re, rj) => {
    console.log(2)
    re()
}).then((res) => {
    console.log(4)
})
console.log(3)

//expect out put  12345


function delay(ms) {
    return new Promise((re, rj) => {
        setTimeout(() => {
            re()
        }, ms);
    })
}