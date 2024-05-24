class Set {
    constructor() {
        this.items = {};
    }
    //添加元素
    add(element) {
        if (!this.has(element)) {
            this.items[element] = element;
            return true;
        }
        return false;
    }
    //删除
    delete(element) {
        if (this.has(element)) {
            delete this.items[element];
            return true;
        }
        return false;
    }
    //判断元素是否存在
    has(element) {
        // 不是有的对象都继承了Object.prototype，甚至继承了Object.prototype 的对
        // 象上的hasOwnProperty 方法也有可能被覆盖，导致代码不能正常工作。要避
        // 免出现任何问题，使用 Object.prototype.hasOwnProperty.call 是更安
        // 全的做法。
        return Object.prototype.hasOwnProperty.call(this.items, element);
    }
    //清空
    clear() {
        this.items = {};
    }
    //获取集合元素个数
    size() {
        let count = 0
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                count++;
            }
        }
        return count;
    }
    //获取集合元素
    values() {
        let values = [];
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                values.push(key);
            }
        }
        return values;
    }

    union(otherSet) {
        let unionSet = new Set();
        this.values().forEach(value => {
            unionSet.add(value);
        });
        otherSet.values().forEach(value => {
            unionSet.add(value);
        });
        return unionSet;
    }

    intersection(otherSet) {
        let intersectionSet = new Set();
        this.values().forEach(value => {
            if (otherSet.has(value)) {
                intersectionSet.add(value);
            }
        });
        return intersectionSet;
    }

    difference(otherSet) {
        let differenceSet = new Set();
        this.values().forEach(value => {
            if (!otherSet.has(value)) {
                differenceSet.add(value);
            }
        });
        return differenceSet;
    }

    isSubsetOf(otherSet) {
        if (this.size() > otherSet.size()) {
            return false;
        } else {
            let isSubset = true;
            this.values().every(value => {
                if (!otherSet.has(value)) {
                    isSubset = false;
                    return false;
                }
            });
            return isSubset;
        }
    }
}

export default Set;