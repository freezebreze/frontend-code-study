function defaultEquals(a, b) {
    return a === b;
}

class Node {
    constructor(element) {
        this.element = element;
        this.next = undefined;
    }
}

class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0;
        this.head = undefined;
        this.equalsFn = equalsFn;
    }

    push(element) {
        const node = new Node(element);
        let current;
        if (this.head == null) {
            this.head = node
        } else {
            current = this.head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }

    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next
            }
            this.count--
            return current.element;
        }
        return undefined;
    }

    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if (index === 0) {
                const current = this.head;
                node.next = current;
                this.head = node
            } else {
                const previous = this.getElementAt(index - 1);
                const current = previous.next;
                previous.next = node;
                node.next = current;
            }
            this.count++;
            return true
        }
        return false
    }

    indexOf(element) {
        let current = this.head
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i
            }
            current = current.next
        }
        return -1
    }

    getElementAt(index) {
        if (index >= 0 && index <= this.count) { // {1} 
            let node = this.head; // {2} 
            for (let i = 0; i < index && node != null; i++) { // {3} 
                node = node.next;
            }
            return node; // {4} 
        }
        return undefined; // {5} 
    }

    size() {
        return this.count;
    }

    isEmpty() {
        return this.size() === 0;
    }

    getHead() {
        return this.head;
    }

    toString() {
        if (this.head == null) { // {1} 
            return '';
        }
        let objString = `${this.head.element}`; // {2} 
        let current = this.head.next; // {3} 
        for (let i = 1; i < this.size() && current != null; i++) { // {4} 
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString; // {5} 
    }

}
