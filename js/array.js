Array.prototype.myPush = function (value) {
    this[this.length] = value;
    return this.length;
};

Array.prototype.myPop = function () {
    if (this.length === 0) {
        return undefined;
    }
    const lastElement = this[this.length - 1];
    this.length--;
    return lastElement;
};

Array.prototype.myShift = function () {
    if (this.length === 0) {
        return undefined;
    }
    const firstElement = this[0];
    for (let i = 0; i < this.length - 1; i++) {
        this[i] = this[i + 1];
    }
    return firstElement;
};
Array.prototype.myUnshift = function (value) {
    for (let i = this.length; i > 0; i--) {
        this[i] = this[i - 1];
    }
    this[0] = value;
    return this.length;
};