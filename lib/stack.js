'use strict';

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

// check if we stuff v8 internals by this implementation (swaping datastore object)
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

module.exports = Stack;