var Stack = require('../src/stack.js');
var assert = require("assert");

describe('Stack.prototype.constructor', function() {
    it("should take no argument", function() {
        var a = new Stack();
        assert.deepEqual(a.toArray(), []);
    });

    it("should take array argument", function() {
        var a = new Stack([1,2,3,4]);
        var b = new Stack([]);

        assert(a._top >= 4);
        assert.deepEqual(a.toArray(), [1,2,3,4]);
        assert(b._top >= 0);
        assert.deepEqual(b.toArray(), []);
    });
});

describe('Stack.prototype.toArray', function () {
    it("should return an array", function() {
        var a = new Stack([1,2,3,4]);
        assert.deepEqual(a.toArray(), [1,2,3,4]);
    });
});

describe('Stack.prototype.push', function () {
    it("Should do nothing if no arguments", function() {
        var a = new Stack();
        var before = a.length;
        var ret = a.push();
        assert(ret === before);
        assert(a.length === ret);
        assert(ret === 0);
    });

    it("Should add single argument", function() {
        var a = new Stack([1,2,3,4,5]);
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
        var a = new Stack([1,2,3,4,5]);
        assert(a.length > 2);
        var before = a.length;
        var ret = a.push(1, 2);
        assert(ret === before + 1);
        assert(a.length === ret);
        assert(ret === 6);
        assert.deepEqual(a.toArray(), [1,2,3,4,5,1]);
    });
});

describe('Stack.prototype.pop', function () {
    it("Should return undefined when empty stack", function() {
        var a = new Stack();
        assert(a.length === 0);
        assert(a.pop() === void 0);
        assert(a.pop() === void 0);
        assert(a.length === 0);
    });

    it("Should return the item on the top of the stack", function() {
        var a = new Stack();
        var b = new Array();

        a.push(1);  a.push(2);  a.push(3);
        a.push(4);  a.push(5);  a.push(6);
        a.push(7);  a.push(8);  a.push(9);
        b.push(1,2,3,4,5,6,7,8,9);

        assert(a.pop() === 9);
        assert(a.pop() === 8);
        b.pop(); b.pop();
        assert.deepEqual(a.toArray(), b);
        a.push(1);  a.push(2);  a.push(3);
        a.push(4);  a.push(5);
        a.pop();
        b.push(1,2,3,4,5);
        b.pop();
        assert.deepEqual(a.toArray(), b);
        assert(a.pop() === b.pop());
        assert.deepEqual(a.toArray(), b);
    });
});

describe('Stack.prototype.peek', function () {
    it("Should return undefined when empty stack", function() {
        var a = new Stack();
        assert(a.length === 0);
        assert(a.pop() === void 0);
        assert(a.pop() === void 0);
        assert(a.length === 0);
    });

    it("Should return the item on the top of the stack", function() {
        var a = new Stack();
        var b = new Array();

        a.push(1);  a.push(2);  a.push(3);
        a.push(4);  a.push(5);  a.push(6);
        a.push(7);  a.push(8);  a.push(9);
        b.push(1,2,3,4,5,6,7,8,9);
        assert(a.peek() === 9);
        assert(a.peek() === 9);
        assert.deepEqual(a.toArray(), b);
        
        a.push(1);  a.push(2);  a.push(3);
        a.push(4);  a.push(5);
        a.pop();    a.pop();
        b.push(1,2,3,4,5);
        b.pop();    b.pop();
        assert.deepEqual(a.toArray(), b);
        assert(a.peek() === b[b.length - 1]);
        assert.deepEqual(a.toArray(), b);
    });
});

describe('Stack.prototype.isEmpty', function () {
    it("should return true on empty stack", function() {
        var a = new Stack();
        assert(a.isEmpty());
    });

    it("should return false on stack with items", function() {
        var a = new Stack([1]);
        assert(!a.isEmpty());
    });
});

describe('Stack.prototype.clear', function () {
    it("should clear the stack", function() {
        var a = new Stack([1,2,3,4]);
        assert(!a.isEmpty());
        a.clear();
        assert(a.isEmpty());
    });
});