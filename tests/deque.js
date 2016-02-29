var Deque = require('../src/deque.js');
var assert = require("assert");

describe('Deque.prototype.constructor', function() {
    it("should take no argument", function() {
        var a = new Deque();
        assert.deepEqual(a.toArray(), []);
    });

    it("should take array argument", function() {
        var a = new Deque([1,2,3,4]);
        var b = new Deque([]);

        assert(a.length === 4);
        assert.deepEqual(a.toArray(), [1,2,3,4]);
        assert(b.length === 0);
        assert.deepEqual(b.toArray(), []);
    });
});

describe('Deque.prototype.toArray', function () {
    it("should return an array", function() {
        var a = new Deque([1,2,3,4]);
        assert.deepEqual(a.toArray(), [1,2,3,4]);
    });
});

describe('Deque.prototype.push', function () {
    it("Should do nothing if no arguments", function() {
        var a = new Deque();
        var before = a.length;
        var ret = a.push();
        assert(ret === before);
        assert(a.length === ret);
        assert(ret === 0);
    });

    it("Should add single argument", function() {
        var a = new Deque([1,2,3,4,5]);
        assert(a.length === 5);
        var before = a.length;
        var ret = a.push(1);
        assert(ret === before + 1);
        assert(a.length === ret);
        assert(ret === 6);
        assert.deepEqual(a.toArray(), [1,2,3,4,5,1]);
    });
});

describe('Deque.prototype.unshift', function () {
    it("Should do nothing if no arguments", function() {
        var a = new Deque();
        var before = a.length;
        var ret = a.unshift();
        assert(ret === before);
        assert(a.length === ret);
        assert(ret === 0);
    });

    it("Should add single argument", function() {
        var a = new Deque([1,2,3,4,5]);
        assert(a.length === 5);
        var before = a.length;
        var ret = a.unshift(1);
        assert(ret === before + 1);
        assert(a.length === ret);
        assert(ret === 6);
        assert.deepEqual(a.toArray(), [1,1,2,3,4,5]);
    });
});

describe('Deque.prototype.pop', function () {
    it("Should return undefined when empty deque", function() {
        var a = new Deque();
        assert(a.length === 0);
        assert(a.pop() === void 0);
        assert(a.pop() === void 0);
        assert(a.length === 0);
    });

    it("Should return the item at the back of the deque", function() {
        var a = new Deque();
        var b = new Array();

        a.push(1);  a.push(2);  a.push(3);
        a.push(4);  a.push(5);  a.push(6);
        a.push(7);  a.push(8);  a.push(9);
        b.push(1,2,3,4,5,6,7,8,9);

        assert(a.pop() === 9);
        assert(a.pop() === 8);
        b.pop(); b.pop();
        assert.deepEqual(a.toArray(), b);

        a.unshift(1);  a.unshift(2);  a.unshift(3);
        a.unshift(4);  a.unshift(5);
        a.push(1);  a.push(2);  a.push(3);
        a.push(4);  a.push(5);
        a.unshift(1);  a.unshift(2);  a.unshift(3);
        a.pop();

        b.unshift(5,4,3,2,1);
        b.push(1,2,3,4,5);
        b.unshift(3,2,1);
        b.pop();

        assert.deepEqual(a.toArray(), b);
        // assert(a.pop() === b.pop());
        // assert.deepEqual(a.toArray(), b);
    });
});

describe('Deque.prototype.shift', function () {
    it("Should return undefined when empty deque", function() {
        var a = new Deque();
        assert(a.length === 0);
        assert(a.shift() === void 0);
        assert(a.shift() === void 0);
        assert(a.length === 0);
    });

    it("Should return the item at the front of the deque", function() {
        var a = new Deque();
        var b = new Array();

        a.push(1);  a.push(2);  a.push(3);
        a.push(4);  a.push(5);  a.push(6);
        a.push(7);  a.push(8);  a.push(9);
        b.push(1,2,3,4,5,6,7,8,9);

        assert(a.shift() === 1);
        assert(a.shift() === 2);
        b.shift(); b.shift();
        assert.deepEqual(a.toArray(), b);
        
        a.unshift(1);  a.unshift(2);  a.unshift(3);
        a.unshift(4);  a.unshift(5);
        a.push(1);  a.push(2);  a.push(3);
        a.push(4);  a.push(5);
        a.unshift(1);  a.unshift(2);  a.unshift(3);
        a.shift();
        b.unshift(5,4,3,2,1);
        b.push(1,2,3,4,5);
        b.unshift(3,2,1);
        b.shift();
        assert.deepEqual(a.toArray(), b);
        assert(a.shift() === b.shift());
        assert.deepEqual(a.toArray(), b);
    });
});

describe('Deque.prototype.peekBack', function () {
    it("Should return undefined when empty deque", function() {
        var a = new Deque();
        assert(a.length === 0);
        assert(a.peekBack() === void 0);
        assert(a.peekBack() === void 0);
        assert(a.length === 0);
    });

    it("Should return the item at the back of the deque", function() {
        var a = new Deque();
        a.push(1);  a.push(2);  a.push(3);
        a.push(4);  a.push(5);  a.push(6);
        a.push(7);  a.push(8);  a.push(9);

        assert(a.peekBack() === 9);

        var l = 5;
        while(l--) a.pop();

        assert.deepEqual(a.toArray(), [1, 2, 3, 4]);

        assert(a.peekBack() === 4);

        var l = 2;
        while(l--) a.shift();

        assert(a.peekBack() === 4);

        assert.deepEqual(a.toArray(), [3, 4]);

        assert(a.peekBack() === 4);

        a.push(1);  a.push(2);  a.push(3);

        assert(a.peekBack() === 3);

        a.pop();
        a.shift();

        assert(a.peekBack() === 2);
        assert.deepEqual(a.toArray(), [4,1,2]);
    });
});

describe('Deque.prototype.peekFront', function () {
    it("Should return undefined when empty deque", function() {
        var a = new Deque();
        assert(a.length === 0);
        assert(a.peekFront() === void 0);
        assert(a.peekFront() === void 0);
        assert(a.length === 0);
    });

    it("Should return the item at the front of the deque", function() {
        var a = new Deque();
        a.push(1);  a.push(2);  a.push(3);
        a.push(4);  a.push(5);  a.push(6);
        a.push(7);  a.push(8);  a.push(9);

        assert(a.peekFront() === 1);

        var l = 5;
        while(l--) a.pop();

        assert.deepEqual(a.toArray(), [1, 2, 3, 4]);

        assert(a.peekFront() === 1);

        var l = 2;
        while(l--) a.shift();

        assert(a.peekFront() === 3);

        assert.deepEqual(a.toArray(), [3, 4]);

        assert(a.peekFront() === 3);

        a.push(1);  a.push(2);  a.push(3);

        assert(a.peekFront() === 3);

        a.pop();
        a.shift();

        assert(a.peekFront() === 4);
        assert.deepEqual(a.toArray(), [4,1,2]);
    });
});

describe('Deque.prototype.isEmpty', function () {
    it("should return true on empty deque", function() {
        var a = new Deque();
        assert(a.isEmpty());
    });

    it("should return false on deque with items", function() {
        var a = new Deque([1]);
        assert(!a.isEmpty());
    });
});

describe('Deque.prototype.clear', function () {
    it("should clear the deque", function() {
        var a = new Deque([1,2,3,4]);
        assert(!a.isEmpty());
        a.clear();
        assert(a.isEmpty());
    });
});