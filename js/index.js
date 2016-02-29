(function () {
    'use strict';
    
    var MIN_CAPACITY = 0x40;        // 64
    var MAX_CAPACITY = 0x40000000;  // 1,073,741,824 ||  Math.pow(2, 30);

    function Stack(init) {
        this._top = 0;
        this._data = {};
        if (Array.isArray(init)) {
            var len = init.length;
            for (var i = 0; i < len; i++) {
                if (init[i] !== void 0) {
                    this._data[this._top++] = init[i];
                }
            }
        }
    };

    Stack.prototype.push = function Stack$push(value) {
        if (value !== undefined) {
            this._data[this._top++] = value;
        }
        return this._top;
    };

    Stack.prototype.pop = function Stack$pop() {
        if (this._top === 0) return void 0;
        var data = this._data[--this._top];
        this._data[this._top] = void 0;
        return data;
    };

    Stack.prototype.peek = function Stack$peek() {
        if (this._top === 0) return void 0;
        return this._data[this._top - 1];
    };

    Stack.prototype.clear = function Stack$clear() {
        this._data = {};
        this._top = 0;
        return this._top;
    };

    Stack.prototype.isEmpty = function Stack$isEmpty() {
        return this._top === 0;
    };

    Object.defineProperty(Stack.prototype, 'length', {
        get: function () {
            return this._top;
        },
        set: function () {
            throw new RangeError('');
        }
    });

    Stack.prototype.toArray = function Stack$toArray() {
        var ret = [];
        var len = this._top;
        for (var i = 0; i < len; i++) {
            ret[i] = this._data[i];
        }
        return ret;
    };

    Stack.prototype.toString = function Stack$toString() {
        return this.toArray().toString();
    };

    Stack.prototype.toJSON = Stack.prototype.toArray;
    Stack.prototype.valueOf = Stack.prototype.toString;
    
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

    function nextPowerOfTwo(n) {
        n = n - 1;
        n = n | (n >> 1);
        n = n | (n >> 2);
        n = n | (n >> 4);
        n = n | (n >> 8);
        n = n | (n >> 16);
        return n + 1;
    }

    window.Stack = Stack;
    window.Queue = Queue;
    window.Deque = Deque;
    
})(window);