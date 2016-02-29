'use strict';

var MIN_CAPACITY = 0x40;        // 64
var MAX_CAPACITY = 0x40000000;  // 1,073,741,824 ||  Math.pow(2, 30);

function Deque(init) {
    this._front = 0;
    this._length = 0;
    this._max = MIN_CAPACITY;
    this._data = {};
    if (Array.isArray(init)) {
        var len = init.length;
        var max = this._max - 1;
        for (var i = 0; i < len; i++) {
            if (init[i] !== void 0) {
                this._data[(this._front + this._length) & max] = init[i];
                this._length++;
            }
        }
    }
}

Deque.prototype.push = function Deque$push(item) {
    if (item !== undefined) {
        if (this._max === this._length) {
            this._resize();
        }
        var i = (this._front + this._length) & (this._max - 1);
        this._data[i] = item;
        return ++this._length;
    }
    return this._length;
};

Deque.prototype.pop = function Deque$pop() {
    if (this._length === 0) return void 0;
    var index = (this._front + this._length - 1) & (this._max - 1);
    var data = this._data[index];
    this._data[index] = void 0;
    this._length--;
    return data;
};

Deque.prototype.shift = function Deque$shift() {
    var len = this._length;
    if (len === 0) {
        return void 0;
    }
    var front = this._front;
    var data = this._data[front];
    this._data[front] = void 0;
    this._length--;
    this._front = (front + 1) & (this._max - 1);
    return data;
};

Deque.prototype.unshift = function Deque$unshift(item) {
    if (item !== undefined) {
        if (this._max === this._length) {
            this._resize();
        }
        this._front = (((this._front - 1) & (this._max - 1)) ^ this._max) - this._max;
        this._data[this._front] = item;
        return ++this._length;
    }
    return this._length;
};

Deque.prototype.peekFront = function Deque$peekFront() {
	return this._data[this._front];
};

Deque.prototype.peekBack = function Deque$peekBack() {
    if (this._length === 0) return void 0;
	return this._data[(this._front + this._length - 1) & (this._max - 1)];
};

Deque.prototype.clear = function Deque$clear() {
    this._data = {};
    this._front = 0;
    this._length = 0;
    this._max = MIN_CAPACITY;
    return 0;
};

Deque.prototype.isEmpty = function Deque$isEmpty() {
    return this._length === 0;
};

Object.defineProperty(Deque.prototype, 'length', {
    get: function () {
        return this._length;
    },
    set: function () {
        throw new RangeError('');
    }
});

Deque.prototype.toArray = function Deque$toArray() {
    var ret = [];
    var len = this._length;
    var front = this._front;
    var max = this._max - 1;
    for (var i = 0; i < len; i++) {
        ret[i] = this._data[(front + i) & max];
    }
    return ret;
};

Deque.prototype.toString = function Deque$toString() {
    return this.toArray().toString();
};

function nextPowerOfTwo(n) {
    n = n - 1;
    n = n | (n >> 1);
    n = n | (n >> 2);
    n = n | (n >> 4);
    n = n | (n >> 8);
    n = n | (n >> 16);
    return n + 1;
}

Deque.prototype._resize = function Deque$_resize() {
    var oldMax = this._max;
    var oldFront = this._front;
    this._max = nextPowerOfTwo(oldMax + 1);
    this._max = this._max > MAX_CAPACITY ? MAX_CAPACITY : this._max;
    this._front = this._max - (oldMax - oldFront);
    var newMax = this._max - 1;
    var newFront = this._front;
    var propCache = 0;
    var pointer = oldMax - oldFront - 1;
    oldMax--;
    while (pointer > -1) {
        propCache = (oldFront + pointer) & oldMax;
        this._data[((newFront + pointer) & newMax)] = this._data[propCache];
        this._data[propCache] = void 0;
        pointer--;
    }
};

Deque.prototype.toString = function Deque$toString() {
    return this.toArray().toString();
};

Deque.prototype.insertBack = Deque.prototype.push;
Deque.prototype.removeBack = Deque.prototype.pop;
Deque.prototype.removeFront = Deque.prototype.shift;
Deque.prototype.insertFront = Deque.prototype.unshift;

Deque.prototype.toJSON = Deque.prototype.toArray;
Deque.prototype.valueOf = Deque.prototype.toString;

module.exports = Deque;