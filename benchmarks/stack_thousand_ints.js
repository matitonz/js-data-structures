var Benchmark = require("benchmark");

var Stack = require("../src/stack.js");
var Deque = require("double-ended-queue");
var BuiltInArray = Array;


function printPlatform() {
    console.log("\nPlatform info:");
    var os = require("os");
    var v8 = process.versions.v8;
    var node = process.versions.node;
    var plat = os.type() + " " + os.release() + " " + os.arch() + "\nNode.JS " + node + "\nV8 " + v8;
    var cpus = os.cpus().map(function(cpu){
        return cpu.model;
    }).reduce(function(o, model){
        if( !o[model] ) o[model] = 0;
        o[model]++;
        return o;
    }, {});
    cpus = Object.keys(cpus).map(function( key ){
        return key + " \u00d7 " + cpus[key];
    }).join("\n");
    console.log(plat + "\n" + cpus + "\n");
}

console.log('\nBenchmarking stack\'s with 1,000 integers...');

function iteratePushPop(stack) {
    var temp = [];
    for (var i = 0; i < 1000; ++i) {
        temp[i] = stack.pop();
    }
    for (var j = 0; j < 1000; ++j) {
        stack.push(temp[i]);
    }
}

var stack = new Stack();
var deque = new Deque();
var builtInArray = new BuiltInArray();

var l = 1000;

while(--l) {
    stack.push(l);
    deque.push(l);
    builtInArray.push(l);
}

var suite = new Benchmark.Suite();

suite
.add("simple-stack", function(){
    var a = stack.pop();
    var b = stack.pop();
    var c = stack.pop();
    
    iteratePushPop(stack);
    
    stack.push(a);
    stack.push(b);
    stack.push(c);
})
.add("double-ended-queue", function(){
    var a = deque.pop();
    var b = deque.pop();
    var c = deque.pop();

    iteratePushPop(deque);

    deque.push(a);
    deque.push(b);
    deque.push(c);
})
.add("built-in array", function(){
    var a = builtInArray.pop();
    var b = builtInArray.pop();
    var c = builtInArray.pop();

    iteratePushPop(builtInArray);

    builtInArray.push(a);
    builtInArray.push(b);
    builtInArray.push(c);
})
.on("cycle", function(e) {
    console.log("" + e.target);
})
.run();