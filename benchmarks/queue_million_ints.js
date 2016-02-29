var Benchmark = require("benchmark");

var Queue = require("../src/queue.js");
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

console.log('\nBenchmarking queue\'s with 1,000,000 integers...');

function iterateShiftPush(queue) {
    var temp = [];
    for (var i = 0; i < 1000; ++i) {
        temp[i] = queue.shift();
    }
    for (var j = 0; j < 1000; ++j) {
        queue.push(temp[i]);
    }
}

var queue = new Queue();
var deque = new Deque();
var builtInArray = new BuiltInArray();

var l = 1000000;

while(--l) {
    queue.push(l);
    deque.push(l);
    builtInArray.push(l);
}

var suite = new Benchmark.Suite();

suite
.add("simple-queue", function(){
    var a = queue.shift();
    var b = queue.shift();
    var c = queue.shift();
    
    iterateShiftPush(queue);
    
    queue.push(a);
    queue.push(b);
    queue.push(c);
})
.add("double-ended-queue", function(){
    var a = deque.shift();
    var b = deque.shift();
    var c = deque.shift();

    iterateShiftPush(deque);

    deque.push(a);
    deque.push(b);
    deque.push(c);
})
.add("built-in array", function(){
    var a = builtInArray.shift();
    var b = builtInArray.shift();
    var c = builtInArray.shift();

    iterateShiftPush(builtInArray);

    builtInArray.push(a);
    builtInArray.push(b);
    builtInArray.push(c);
})
.on("cycle", function(e) {
    console.log("" + e.target);
})
.run();