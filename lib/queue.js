'use strict';

var MIN_CAPACITY = 0x40;        // 64
var MAX_CAPACITY = 0x40000000;  // 1,073,741,824 ||  Math.pow(2, 30);

function Queue(init) {
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

Queue.prototype.push = function Queue$push(value) {
    if (value !== void 0) {
        if (this._max === this._length) {
            this._resize();
        }
        this._data[(this._front + this._length) & (this._max - 1)] = value;
        return ++this._length;
    }
    return this._length;
};

Queue.prototype.shift = function Queue$shift() {
    var len = this._length;
    if (len === 0) {
        return void 0;
    }
    var front = this._front;
    var data = this._data[front];
    this._data[front] = void 0;
    this._length--;
    if (this._max - front === 1) {
        this._front = 0;    // reset front
    }
    else {
        this._front++;
    }
    return data;
}

Queue.prototype.peek = function Queue$peek() {
	return this._data[this._front];
}

Queue.prototype.clear = function Queue$clear() {
    this._data = {};
    this._front = 0;
    this._length = 0;
    this._max = MIN_CAPACITY;
    return 0;
}

Queue.prototype.isEmpty = function Queue$isEmpty() {
    return this._length === 0;
}

Object.defineProperty(Queue.prototype, 'length', {
    get: function () {
        return this._length;
    },
    set: function () {
        throw new RangeError('');
    }
});

Queue.prototype.toArray = function Queue$toArray() {
    var ret = [];
    var len = this._length;
    var front = this._front;
    var max = this._max - 1;
    for (var i = 0; i < len; i++) {
        ret[i] = this._data[(front + i) & max];
    }
    return ret;
}

Queue.prototype.toString = function Queue$toString() {
    return this.toArray().toString();
}

function nextPowerOfTwo(n) {
    n = n - 1;
    n = n | (n >> 1);
    n = n | (n >> 2);
    n = n | (n >> 4);
    n = n | (n >> 8);
    n = n | (n >> 16);
    return n + 1;
}

Queue.prototype._resize = function () {
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
}

Queue.prototype.enqueue = Queue.prototype.push;
Queue.prototype.dequeue = Queue.prototype.shift;

Queue.prototype.toJSON = Queue.prototype.toArray;
Queue.prototype.valueOf = Queue.prototype.toString;

module.exports = Queue;