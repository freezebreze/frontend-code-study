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

class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected; // {1} 是否有向
        this.vertices = []; // {2} 顶点
        this.adjList = new Dictionary(); // {3}  顶尖作为键的 字典  实现邻接表   v: [a,b,c...]
    }
    //添加顶点
    addVertex(v) {
        if (!this.vertices.includes(v)) {
            this.vertices.push(v)
            this.adjList.set(v, [])
        }
    }
    //添加线
    addEdge(v, w) {
        //这两步确保顶点一定存在 而且也顺便初始化邻接表
        if (!this.adjList.get(v)) {
            this.addVertex(v); // {8} 
        }
        if (!this.adjList.get(w)) {
            this.addVertex(w); // {9} 
        }
        this.adjList.get(v).push(w) //   v:[w]
        if (this.isDirected) {
            this.adjList.get(w).push(v) // 有方向的 w：[v] 也要存进来
        }
    }

    toString() {
        let s = '';
        for (let i = 0; i < this.vertices.length; i++) { // {15} 
            s += `${this.vertices[i]} -> `;
            const neighbors = this.adjList.get(this.vertices[i]); // {16} 
            for (let j = 0; j < neighbors.length; j++) { // {17} 
                s += `${neighbors[j]} `;
            }
            s += '\n'; // {18} 
        }
        return s;
    }
}


const graph = new Graph();
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']; // {12} 
for (let i = 0; i < myVertices.length; i++) { // {13} 
    graph.addVertex(myVertices[i]);
}

graph.addEdge('A', 'B'); // {14}
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
console.log(graph.toString()); 