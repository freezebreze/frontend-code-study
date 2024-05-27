class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}: ${this.value}]`;
    }
}

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

class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }

    loseloseHashCode(key) {
        const tableKey = this.toStrFn(key); // {1} 
        let hash = 5381; // {2} 
        for (let i = 0; i < tableKey.length; i++) { // {3} 
            hash = (hash * 33) + tableKey.charCodeAt(i); // {4} 
        }
        return hash % 1013; // {5} 
    }

    hashCode(key) {
        return this.loseloseHashCode(key);
    }
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            this.table[position] = new ValuePair(key, value);
            return true
        }
        return false;
    }

    get(key) {
        const valuePair = this.table[this.hashCode(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    remove(key) {
        const hash = this.hashCode(key); // {1} 
        const valuePair = this.table[hash]; // {2} 
        if (valuePair != null) {
            delete this.table[hash]; // {3} 
            return true;
        }
        return false;
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const keys = Object.keys(this.table);
        let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
        for (let i = 1; i < keys.length; i++) {
            objString = `${objString},{${keys[i]} => 
      ${this.table[keys[i]].toString()}}`;
        }
        return objString;
    }
}

const hash = new HashTable();
hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
console.log(hash.hashCode('Gandalf') + ' - Gandalf');
console.log(hash.hashCode('John') + ' - John');
console.log(hash.hashCode('Tyrion') + ' - Tyrion'); 
