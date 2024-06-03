function Person(name) {
    this.name = name
}

Person.prototype.getName = function () {
    return this.name
}

var objectFactory = function () {
    var obj = new Object()
    Constructor = [].shift.call(arguments)
    obj.__proto__ = Constructor.prototype
    var ret = Constructor.apply(obj, arguments)
    return typeof ret === 'object' ? ret : obj;
}
var a = objectFactory(Person, 'sven');

Function.prototype.before = function (beforefn) {
    let __self = this
    return function () {    // 返回包含了原函数和新函数的"代理"函数 
        beforefn.apply(this, arguments);     // 执行新函数，修正this 
        return __self.apply(this, arguments);    // 执行原函数 
    }
}

Function.prototype.after = function (afterfn) {
    var __self = this;
    return function () {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};

var func = function () {
    console.log(2);
};

func = func.before(function () {
    console.log(1);
}).after(function () {
    console.log(3);
});
func();

//单例模式 保证全局只有一个实例
var getSingle = function (fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this, arguments));
    }
};

//策略模式 优化大量if else  将操作封装成函数在调用

var strategies = {
    "S": function (salary) {
        return salary * 4;
    },
    "A": function (salary) {
        return salary * 3;
    },
    "B": function (salary) {
        return salary * 2;
    }
};

var calculateBonus = function (level, salary) {
    return strategies[level](salary);
};


//代理模式

var myImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);

    return {
        setSrc: function (src) {
            imgNode.src = src;
        }
    }
})();

var proxyImage = (function () {
    var img = new Image;
    img.onload = function () {
        myImage.setSrc(this.src);
    }
    return {
        setSrc: function (src) {
            myImage.setSrc('file:// /C:/Users/svenzeng/Desktop/loading.gif');
            img.src = src;
        }
    }
})();

proxyImage.setSrc('http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg');

var myImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return function (src) {
        imgNode.src = src;
    }
})();
var proxyImage = (function () {
    var img = new Image;
    img.onload = function () {
        myImage(this.src);
    }
    return function (src) {
        myImage('file:// /C:/Users/svenzeng/Desktop/loading.gif');
        img.src = src;
    }
})();

proxyImage('http:// imgcache.qq.com/music// N/k/000GGDys0yA0Nk.jpg');


var miniConsole = (function () {
    var cache = [];
    var handler = function (ev) {
        if (ev.keyCode === 113) {
            var script = document.createElement('script');
            script.onload = function () {
                for (var i = 0, fn; fn = cache[i++];) {
                    fn();
                }
            };
            script.src = 'miniConsole.js';
            document.getElementsByTagName('head')[0].appendChild(script);
            document.body.removeEventListener('keydown', handler);// 只加载一次miniConsole.js 
        }
    };

    document.body.addEventListener('keydown', handler, false);

    return {
        log: function () {
            var args = arguments;
            cache.push(function () {
                return miniConsole.log.apply(miniConsole, args);
            });
        }
    }
})();

miniConsole.log(11);      // 开始打印log 

// miniConsole.js代码 

miniConsole = {
    log: function () {
        // 真正代码略 
        console.log(Array.prototype.join.call(arguments));
    }
};

//订阅发布
const myEvent = {
    clientList: [],
    listen: function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);    // 订阅的消息添加进缓存列表 
    },
    trigger: function () {
        var key = Array.prototype.shift.call(arguments),    // (1); 
            fns = this.clientList[key];

        if (!fns || fns.length === 0) {    // 如果没有绑定对应的消息 
            return false;
        }

        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);    // (2) // arguments 是trigger时带上的参数 
        }
    },
    remove: function (key, fn) {
        const fns = this.clientList[key]
        if (!fns) {    // 如果key对应的消息没有被人订阅，则直接返回 
            return false;
        }
        if (!fn) {    // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅 
            fns && (fns.length = 0);
        } else {
            for (var l = fns.length - 1; l >= 0; l--) {    // 反向遍历订阅的回调函数列表 
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1);    // 删除订阅者的回调函数 
                }
            }
        }
    }
}

const installEvent = function (obj) {
    for (var i in myEvent) {
        obj[i] = myEvent[i];
    }
};

var Event = (function () {

    var global = this,
        Event,
        _default = 'default';

    Event = function () {
        var _listen,
            _trigger,
            _remove,
            _slice = Array.prototype.slice,
            _shift = Array.prototype.shift,
            _unshift = Array.prototype.unshift,
            namespaceCache = {},
            _create,
            find,
            each = function (ary, fn) {
                var ret;
                for (var i = 0, l = ary.length; i < l; i++) {
                    var n = ary[i];
                    ret = fn.call(n, i, n);
                }
                return ret;
            };

        _listen = function (key, fn, cache) {
            if (!cache[key]) {
                cache[key] = [];
            }
            cache[key].push(fn);
        };

        _remove = function (key, cache, fn) {
            if (cache[key]) {
                if (fn) {
                    for (var i = cache[key].length; i >= 0; i--) {
                        if (cache[key][i] === fn) {
                            cache[key].splice(i, 1);
                        }
                    }
                } else {
                    cache[key] = [];
                }
            }
        };

        _trigger = function () {
            var cache = _shift.call(arguments),
                key = _shift.call(arguments),
                args = arguments,
                _self = this,
                ret,
                stack = cache[key];

            if (!stack || !stack.length) {
                return;
            }

            return each(stack, function () {
                return this.apply(_self, args);
            });
        };

        _create = function (namespace) {
            var namespace = namespace || _default;
            var cache = {},
                offlineStack = [],    // 离线事件  
                ret = {
                    listen: function (key, fn, last) {
                        _listen(key, fn, cache);
                        if (offlineStack === null) {
                            return;
                        }
                        if (last === 'last') {
                            offlineStack.length && offlineStack.pop()();
                        } else {
                            each(offlineStack, function () {
                                this();
                            });
                        }

                        offlineStack = null;
                    },
                    one: function (key, fn, last) {
                        _remove(key, cache);
                        this.listen(key, fn, last);
                    },
                    remove: function (key, fn) {
                        _remove(key, cache, fn);
                    },
                    trigger: function () {
                        var fn,
                            args,
                            _self = this;

                        _unshift.call(arguments, cache);
                        args = arguments;
                        fn = function () {
                            return _trigger.apply(_self, args);
                        };

                        if (offlineStack) {
                            return offlineStack.push(fn);
                        }
                        return fn();
                    }
                };

            return namespace ?
                (namespaceCache[namespace] ? namespaceCache[namespace] :
                    namespaceCache[namespace] = ret)
                : ret;
        };

        return {
            create: _create,
            one: function (key, fn, last) {
                var event = this.create();
                event.one(key, fn, last);
            },
            remove: function (key, fn) {
                var event = this.create();
                event.remove(key, fn);
            },
            listen: function (key, fn, last) {
                var event = this.create();
                event.listen(key, fn, last);
            },
            trigger: function () {
                var event = this.create();
                event.trigger.apply(this, arguments);
            }
        };
    }();
    return Event;
})();