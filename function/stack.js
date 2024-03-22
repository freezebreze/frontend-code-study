class Stack {
    constructor() {
        this.items = []
    }
    push(s) {

        this.items.push(s)
    }
    pop() {
        return this.items.pop()
    }
    peek() {
        return this.items[this.items.length - 1]
    }
    isEmpty() {
        return this.items.length === 0
    }
    clear() {
        this.items = []
    }
    size() {
        return this.items.length
    }
}
class StackByObject {
    constructor() {
        this.count = 0
        this.items = {}
    }
    push(s) {
        this.items[this.count] = s
        this.count++
    }
    pop() {
        if (this.isEmpty()) {
            return undefined
        }
        this.count--
        const result = this.items[this.count]
        delete this.items[this.count]
        return result
    }
    peek() {
        return this.items[this.count - 1]
    }
    isEmpty() {
        return this.count === 0
    }
    clear() {
        this.items = {
        }
        this.count = 0
    }
    size() {
        return this.count
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[0]}`; // {1} 
        for (let i = 1; i < this.count; i++) { // {2} 
            objString = `${objString},${this.items[i]}`; // {3} 
        }
        return objString;
    }
}

function decimalToBinary(decNumber) {
    const remStack = new Stack();
    let number = decNumber;
    let rem;
    let binaryString = '';

    while (number > 0) {
        rem = Math.floor(number % 2);
        remStack.push(rem);
        number = Math.floor(number / 2);
    }
    while (!remStack.isEmpty()) {
        binaryString += remStack.pop().toString();
    }
    return binaryString;
}

console.log(decimalToBinary(233));

function baseConverter(decNumber, base) {
    const remStack = new Stack();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // {6} 
    let number = decNumber;
    let rem;
    let baseString = '';
    if (!(base >= 2 && base <= 36)) {
        return '';
    }
    while (number > 0) {
        rem = Math.floor(number % base);
        remStack.push(rem);
        number = Math.floor(number / base);
    }
    while (!remStack.isEmpty()) {
        baseString += digits[remStack.pop()]; // {7} 
    }
    return baseString;
}