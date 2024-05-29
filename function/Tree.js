class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}
const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
};

function defaultCompare(a, b) {
    if (a === b) {
        return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.root = null
    }
    insert(key) {
        if (this.root == null) {
            this.root = new Node(key);
        } else {
            this.insertNode(this.root, key);
        }
    }

    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new Node(key);
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key);
            } else {
                this.insertNode(node.right, key)
            }
        }
    }

    search(key) {
        return this.searchNode(this.root, key);
    }

    searchNode(node, key) {
        if (node == null) {
            return false;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key);
        } else if (
            this.compareFn(key, node.key) === Compare.BIGGER_THAN
        ) {
            return this.searchNode(node.right, key);
        } else {
            return true;
        }
    }

    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
    }

    inOrderTraverseNode() {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }

    preOrderTraverse() {
        this.preOrderTraverseNode(this.root, callback);
    }

    preOrderTraverseNode(node, callback) {
        if (node != null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }
    postOrderTraverse() {
        this.postOrderTraverseNode(this.root, callback);
    }
    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
    min() {
        return this.minNode(this.root);
    }

    minNode(node) {
        let current = node;
        while (current != null && current.left != null) {
            current = current.left;
        }
        return current;
    }

    max() {
        return this.maxNode(this.root);
    }

    maxNode(node) {
        let current = node;
        while (current != null && current.right != null) {
            current = current.right;
        }
        return current;
    }
    remove(key) {
        this.root = this.removeNode(this.root, key);
    }

    removeNode(node, key) {
        if (node == null) {
            return null;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) { // {3} 
            node.left = this.removeNode(node.left, key); // {4} 
            return node; // {5} 
        } else if (
            this.compareFn(key, node.key) === Compare.BIGGER_THAN
        ) { // {6} 
            node.right = this.removeNode(node.right, key); // {7} 
            return node; // {8} 
        } else {
            if (node.left == null && node.right == null) { // {9} 
                node = null; // {10} 
                return node; // {11} 
            }

            if (node.left == null) { // {12} 
                node = node.right; // {13} 
                return node; // {14} 
            } else if (node.right == null) { // {15} 
                node = node.left; // {16} 
                return node; // {17} 
            }

            const aux = this.minNode(node.right); // {18} 
            node.key = aux.key; // {19} 
            node.right = this.removeNode(node.right, aux.key); // {20} 
            return node; // {21} 
        }
    }
}

const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};

class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }

    getNodeHeight(node) {
        if (node == null) {
            return -1
        }
        return Math.max(this.getNodeHeight(node.left, this.getNodeHeight(node.right))) + 1
    }

    getBalanceFactor(node) {
        const heightDifference = this.getNodeHeight(node.left) -
            this.getNodeHeight(node.right);
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }

    rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    }

    rotationRR(node) {
        const tmp = node.right
        node.right = tmp.left
        tmp.left = node
        return tmp
    }

    rotationLR(node) {
        node.right = this.rotationLL(node.right)
        return this.rotationRR(node)

    }

    rotationRL(node) {
        node.left = this.rotationRR(node.left)
        return this.rotationLL(node)
    }
}