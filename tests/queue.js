var Queue = require('../src/queue.js');
var assert = require("assert");

describe('Queue.prototype.constructor', function() {
    it("should take no argument", function() {
        var a = new Queue();
        assert.deepEqual(a.toArray(), []);
    });

    it("should take array argument", function() {
        var a = new Queue([1,2,3,4]);
        var b = new Queue([]);

        assert(a.length === 4);
        assert.deepEqual(a.toArray(), [1,2,3,4]);
        assert(b.length === 0);
        assert.deepEqual(b.toArray(), []);
    });
});

describe('Queue.prototype.toArray', function () {
    it("should return an array", function() {
        var a = new Queue([1,2,3,4]);
        assert.deepEqual(a.toArray(), [1,2,3,4]);
    });
});

describe('Queue.prototype.push', function () {
    it("Should do nothing if no arguments", function() {
        var a = new Queue();
        var before = a.length;
        var ret = a.push();
        assert(ret === before);
        assert(a.length === ret);
        assert(ret === 0);
    });

    it("Should add single argument", function() {
        var a = new Queue([1,2,3,4,5]);
        assert(a.length > 1);
        var before = a.length;
        var ret = a.push(1);
        assert(ret === before + 1);
        assert(a.length === ret);
        assert(ret === 6);
        assert.deepEqual(a.toArray(), [1,2,3,4,5,1]);
    });

    // achtung!
    it("Should NOT add multiple arguments", function() {
        var a = new Queue([1,2,3,4,5]);
        assert(a.length > 2);
        var before = a.length;
        var ret = a.push(1, 2);
        assert(ret === before + 1);
        assert(a.length === ret);
        assert(ret === 6);
        assert.deepEqual(a.toArray(), [1,2,3,4,5,1]);
    });
});

describe('Queue.prototype.shift', function () {
    it("Should return undefined when empty queue", function() {
        var a = new Queue();
        assert(a.length === 0);
        assert(a.shift() === void 0);
        assert(a.shift() === void 0);
        assert(a.length === 0);
    });

    it("Should return the item at the front of the queue", function() {
        var a = new Queue();
        var b = new Array();

        a.push(1);  a.push(2);  a.push(3);
        a.push(4);  a.push(5);  a.push(6);
        a.push(7);  a.push(8);  a.push(9);
        b.push(1, 2, 3, 4, 5, 6, 7, 8, 9);

        assert(a.shift() === 1);
        assert(a.shift() === 2);
        assert(a.shift() === 3);
        assert(a.shift() === 4);
        b.shift(); b.shift(); b.shift(); b.shift();
        assert.deepEqual(a.toArray(), b);

        a.push(1);  a.push(2);  a.push(3);
        a.push(4);  a.push(5);  a.push(9);
        a.shift();
        b.push(1, 2, 3, 4, 5, 9);
        b.shift();

        assert.deepEqual(a.toArray(), b);
        assert(a.shift() === b.shift());
        assert.deepEqual(a.toArray(), b);
    });
});

describe('Queue.prototype.peek', function () {
    it("Should return undefined when empty queue", function() {
        var a = new Queue();
        assert(a.length === 0);
        assert(a.peek() === void 0);
        assert(a.peek() === void 0);
        assert(a.length === 0);
    });

    it("Should return the item at the front of the queue", function() {
        var a = new Queue();
        a.push(1);  a.push(2);  a.push(3);
        a.push(4);  a.push(5);  a.push(6);
        a.push(7);  a.push(8);  a.push(9);
        // a.push(1,2,3,4,5,6,7,8,9);
        assert(a.peek() === 1);

        var l = 5;
        while(l--) a.shift();
        assert.deepEqual(a.toArray(), [6, 7, 8, 9]);
        assert(a.peek() === 6);

        var l = 2;
        while(l--) a.shift();

        assert(a.peek() === 8);
        assert.deepEqual(a.toArray(), [8, 9]);

        a.push(1);  a.push(3);
        a.push(4);
        assert(a.peek() === 8);
        a.shift();
        assert(a.peek() === 9);
        assert.deepEqual(a.toArray(), [9, 1, 3, 4]);

    });
});

describe('Queue.prototype.isEmpty', function () {
    it("should return true on empty queue", function() {
        var a = new Queue();
        assert(a.isEmpty());
    });

    it("should return false on queue with items", function() {
        var a = new Queue([1]);
        assert(!a.isEmpty());
    });
});

describe('Queue.prototype.clear', function () {
    it("should clear the queue", function() {
        var a = new Queue([1,2,3,4]);
        assert(!a.isEmpty());
        a.clear();
        assert(a.isEmpty());
    });
});