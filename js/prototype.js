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