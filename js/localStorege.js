class LocalStorege {
    //存储键值对
    __map = {}
    __length = 0
    constructor() {

    }

    get(key) {
        return this.has(key) ? this.__map[key] : undefined
    }

    set(key, value, delay = 0) {
        try {
            if (!this.has(key)) {
                this.__length++
            }
            this.__map[key] = value
            if (delay != 0) {
                setTimeout(() => {
                    this.remove(key)
                }, delay);
            }
        } catch (error) {
            console.log(error?.message ?? 'error')
        }
    }

    remove(key) {
        if (!key) { throw { message: 'key must exist, but now give null' } }
        if (!this.has(key)) { return undefined }
        let tmp = this.__map[key]
        delete this.__map[key]
        this.__length--
        return tmp
    }

    key(n) {
        const keys = Object.keys(this.__map)
        if (keys.length) {
            return keys[n]
        }
        return undefined
    }

    clear() {
        this.__map = {}
    }

    has(key) {
        return Object.hasOwn(this.__map, key)
    }
}

const myLocal = new LocalStorege()
myLocal.set('name', 'ruansheng')
console.log(myLocal.get('name'))
myLocal.set('age', '26')
console.log(myLocal.key(1))
console.log(myLocal?.__length)
myLocal.remove()
