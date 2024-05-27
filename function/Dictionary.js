class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.table = {};
        this.toStrFn = toStrFn;
    }
    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }

    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
    }

    hasKey(key) {
        return this.table[this.toStrFn(key)] != null;
    }

    get(key) {
        const valuePair = this.table[this.toStrFn(key)]; // {1} 
        return valuePair == null ? undefined : valuePair.value; // {2} 
    }
    clear() {
        this.table = {};
    }
    size() {
        return Object.keys(this.table).length;
    }
    isEmpty() {
        return this.size() === 0;
    }

    keys() {
        return this.keyValues().map(valuePair => valuePair.key);
    }

    values() {
        return this.keyValues().map(valuePair => valuePair.value);
    }

    keyValues() {
        let result = []
        for (let key in this.table) {
            if (this.hasKey(key)) {
                result.push(this.table[key])
            }
        }
        return result
    }
    forEach(callbackFn) {
        const valuePairs = this.keyValues(); // {1} 
        for (let i = 0; i < valuePairs.length; i++) { // {2} 
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value); // {3} 
            if (result === false) {
                break; // {4} 
            }
        }
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`; // {1} 
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString},${valuePairs[i].toString()}`; // {2} 
        }
        return objString; // {3} 
    }
}

class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}: ${this.value}]`;
    }
}

// const myMap = new Dictionary()
// myMap.set('Gandalf', 'gandalf@email.com')
// myMap.set('John', 'john@email.com')
// myMap.set('Tyrion', 'tyrion@email.com')
// console.log(myMap.hasKey('Gandalf'))
// console.log(myMap.size())
// console.log(myMap.keys())
// console.log(myMap.values())
// console.log(myMap.keyValues())
// console.log(myMap.toString())
// console.log(myMap.remove('Tyrion'))
// console.log(myMap.toString())
// console.log(myMap.remove('Tyrion'))
// console.log(myMap.toString())
// console.log(myMap.isEmpty())
// console.log(myMap.size())
// console.log(myMap.clear())
// console.log(myMap.toString())
// console.log(myMap.size())

function defaultToString(item) {
    if (item === null) {
        return 'NULL';
    } else if (item === undefined) {
        return 'UNDEFINED';
    } else if (typeof item === 'string' || item instanceof String) {
        return `${item}`;
    }
    return item.toString(); // {1} 
} 