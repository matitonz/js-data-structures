# js-data-structures

Extremely fast stack, queue and deque implementations for Node

#Introduction

Fast and simple data structures for use with Node (v8 browser implementations to come).

- [Stack](http://en.wikipedia.org/wiki/Stack_\(abstract_data_type\))
- [Queue](http://en.wikipedia.org/wiki/Queue_\(data_structure\))
- [Deque (double-ended queue)](http://en.wikipedia.org/wiki/Double-ended_queue)

All operations are constant time lookups - `O(1)`.


#Topics

- [Getting started](#getting-started)
- [Is it better than a native Array?](#is-it-better-than-a-native-array)
- [API reference](#api)
- [Benchmarks](#performance)
- [Todo](#todo)


#Getting started

    Clone the repo and `npm install`.

```js
var Stack = require("node-data-structures").Stack;
var Queue = require("node-data-structures").Queue;
var Deque = require("node-data-structures").Deque;

var stack = new Stack();
stack.push(4);
stack.push({prop: 3});
stack.pop();    // 4
stack.pop();    // {"prop":3}

var deque = new Deque([1,2,3,4]);
deque.shift(); 	//1
deque.pop(); 	//4
```


#Is it better than a native Array?

WAY better - check out the performance section :)  Built in arrays can be really, seriously, naughtily bad.

These data structures are particularly fast compared to built in array's when storing objects or combinations of smis and objects in the stack, queue, or deque.


#API

##Stack
stack.push(value);
stack.pop();
stack.peek();

stack.clear();
stack.isEmpty();
stack.length;
stack.toJSON();
stack.toArray();
stack.toString();
stack.valueOf();

##Queue
queue.push(value);
queue.enqueue(value);

queue.shift();
queue.dequeue();
queue.peek();

queue.clear();
queue.isEmpty();
queue.length;
queue.toJSON();
queue.toArray();
queue.toString();
queue.valueOf();

##Deque
Front
deque.unshift(value);
deque.insertFront(value);

deque.shift();
deque.dequeue();
deque.removeFront();
deque.peekFront();

Back
deque.push(value);
deque.enqueue(value);
deque.insertBack(value);

deque.pop();
deque.removeBack();
deque.peekBack();

Utilities
deque.clear();
deque.isEmpty();
deque.length;
deque.toJSON();
deque.toArray();
deque.toString();
deque.valueOf();


#Performance

Clone the repo and `npm install`. Then run the `benchmarks` script.

##Simple-Stack
###1,000 integers on the stack

    Benchmarking stack's with 1,000 integers...
    simple-stack x 56,792 ops/sec ±0.79% (90 runs sampled)
    double-ended-queue x 30,149 ops/sec ±2.38% (83 runs sampled)
    built-in array x 4,440 ops/sec ±1.18% (85 runs sampled)

###1 million objects on the stack

    Benchmarking stack's with 1,000,000 objects...
    simple-stack x 58,318 ops/sec ±0.25% (92 runs sampled)
    double-ended-queue x 30,942 ops/sec ±0.22% (93 runs sampled)
    built-in array x 5,266 ops/sec ±0.27% (92 runs sampled)

##Simple-Queue
###1 million objects in the queue

	Benchmarking queue's with 1,000 integers...
	simple-queue x 56,202 ops/sec ±1.32% (83 runs sampled)
	double-ended-queue x 33,929 ops/sec ±0.60% (92 runs sampled)
	built-in array x 4,616 ops/sec ±0.46% (89 runs sampled)

###1 million objects in the queue

	Benchmarking queue's with 1,000,000 objects...
	simple-queue x 55,856 ops/sec ±2.94% (88 runs sampled)
	double-ended-queue x 30,259 ops/sec ±0.21% (91 runs sampled)
	built-in array x 0.56 ops/sec ±1.70% (6 runs sampled)


Note just how poor performance a built-in array can produce given the right (| wrong) conditions.


#Todo

- [Benchmark performance in differing circumstances]
- [Write tests - oops!]
- [Port code for browser]