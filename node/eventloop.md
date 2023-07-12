# 事件循环

1. 脚本评估：同步执行脚本，直到调用堆栈为空。
2. 任务处理：选择任务队列中的第一个任务并运行它，直到调用堆栈为空。
3. 微任务处理：选择微任务队列中的第一个微任务并运行它，直到调用堆栈为空，重复直到微任务队列为空。
4. 渲染：重新呈现 UI 并循环回步骤 2。

```javascript
console.log('Script start');

setTimeout(() => console.log('setTimeout()'), 0);

Promise.resolve()
  .then(() => console.log('Promise.then() #1'))
  .then(() => console.log('Promise.then() #2'));

console.log('Script end');

// LOGS:
//   Script start
//   Script end
//   Promise.then() #1
//   Promise.then() #2
//   setTimeout()
```

按照上面的循环描述，你可能会觉得是输出，有这种疑问是对的

```javascript
// LOGS:

//script start
//script end
//setTimeout()
//#1
//#2
```

但其实不是，第一次，注意是**第一次**

是macro(宏任务)优先于micro(微)。只不过执行script的时候 已经算作宏任务了。当线程第一次检视任务队列时，第一次macro执行完毕，开始执行微任务。所以给人的感觉是micro先，但实质上并非如此