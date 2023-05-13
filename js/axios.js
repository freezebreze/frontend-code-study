class Axios {
    constructor() {
        this.interceptors = {
            request: new InterceptorsManage,
            response: new InterceptorsManage
        }
    }

    request(config) {
        // 拦截器和请求组装队列
        //chains大概是['fulfilled1','reject1','fulfilled2','reject2','this.sendAjax','undefined','fulfilled2','reject2','fulfilled1','reject1']这种形式
        let chain = [this.sendAjax.bind(this), undefined] // 成对出现的，失败回调暂时不处理

        // 请求拦截
        this.interceptors.request.handlers.forEach(interceptor => {
            chain.unshift(interceptor.fullfield, interceptor.rejected)
        })

        // 响应拦截
        this.interceptors.response.handlers.forEach(interceptor => {
            chain.push(interceptor.fullfield, interceptor.rejected)
        })

        // 执行队列，每次执行一对，并给promise赋最新的值
        let promise = Promise.resolve(config);
        while (chain.length > 0) {
            promise = promise.then(chain.shift(), chain.shift())
        }
        return promise;
    }
    sendAjax(config) {
        return new Promise(resolve => {
            const { url = '', method = 'get', data = {} } = config;
            // 发送ajax请求
            console.log(config);
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.onload = function () {
                console.log(xhr.responseText)
                resolve(xhr.responseText);
            };
            xhr.send(data);
        })
    }
}


function CreateAxiosFn() {
    let axios = new Axios();
    //bind 绑定运行上下文
    let req = axios.request.bind(axios);
    //将axios上的'get', 'delete', 'head', 'options', 'put', 'patch', 'post'方法混入
    utils.extend(req, Axios.prototype, axios)
    //把定义在 axios上的方法和属性也般到req上   
    utils.extend(req, axios)
    return req;
}


let axios = CreateAxiosFn();

const methodsArr = ['get', 'delete', 'head', 'options', 'put', 'patch', 'post'];
methodsArr.forEach(met => {
    //给Xios原型添加 方法  return 一个函数  这里因为有几个方法是不需要data值的 所以要判断处理一下
    Axios.prototype[met] = function () {
        console.log('执行' + met + '方法');
        if (['get', 'delete', 'head', 'options'].includes(met)) { // 2个参数(url[, config])
            return this.request({
                method: met,
                url: arguments[0],
                ...arguments[1] || {}
            })
        } else { // 3个参数(url[,data[,config]])
            return this.request({
                method: met,
                url: arguments[0],
                data: arguments[1] || {},
                ...arguments[2] || {}
            })
        }
    }
})

//混合方法 将b的方法混入到a
const utils = {
    extend(a, b, context) {
        for (let key in b) {
            //hasOwnProperty 检测是不是b本身的属性而不是继承的
            if (b.hasOwnProperty(key)) {
                //如果是函数 
                if (typeof b[key] === 'function') {
                    //在a上设置一个一样的键值 赋值为绑定呢上下文context的函数
                    a[key] = b[key].bind(context);
                } else {
                    //如果不是函数而是其他非引用值 直接赋值
                    a[key] = b[key]
                }
            }

        }
    }
}

//构建拦截器的构造函数
class InterceptorsManage {
    constructor() {
        this.handlers = [];
    }

    use(fullfield, rejected) {
        this.handlers.push({
            fullfield,
            rejected
        })
    }
}





