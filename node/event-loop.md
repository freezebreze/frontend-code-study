# 事件循环问题

1. 什么是运行时，举一个例子

代码运行的环境，这个运行环境包括了运行代码需要的编译器，以及操作系统底层的支持    

2. 什么是回调，回调与异步有必然联系吗？

通俗的解释就是将一个函数作为参数传递给另一个函数，并且作为参数的函数可以被执行，

没有必然联系，回调是需要我们提供的，被调用方需要执行我们提供的这个回调，我们只是告诉了怎么做，被调用方 怎么执行这个 回调， 由被调用方决定，如果它把该方法推入一个等待执行的队列，例如setTimeout（（）=> {}, 1000），在1s后 会把该函数推入执行队列，这时候是异步的，但是如果它立即调用了 ，那就是同步的    

3. 什么是事件？

在nodejs或者浏览器运行中，鼠标点击 移动等等 ，文件读取完毕等这些叫事件，在网页交互中产生的可以叫页面事件，毕竟js运行的场景大多数是网页。

4. 并行与并发有什么区别和联系

并行（parallel）是指同一时刻，两个或两个以上时间同时发生。

并发（parallel）是指同一时间间隔（同一段时间），两个或两个以上时间同时发生。

联系

宏观上来说并行和并发都是同时处理多路请求的意思

5. nextTick的原理是什么，和setimmedite有什么区别

nextTick定义出一个异步动作，在当前事件循环结束后执行，nodejs中eventloop有很多阶段 按顺序timer， i/o callback，poll，check，close，像上面的每个阶段中如果定义了nextTick 都会在该事件循环结束后运行，而setimmaite则只会在check阶段执行，所以nextTick会比setimmedite早，从名称和功能上来说 nextTick比setimmedite更immedite