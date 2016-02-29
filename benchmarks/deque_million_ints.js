var Benchmark = require("benchmark");

var Deque = require("../src/deque.js");
var DoubleEnded = require("double-ended-queue");
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

console.log('\nBenchmarking deque\'s with 1,000,000 integers...');

function iterateShiftUnshift(deque) {
    var temp = [];
    for (var i = 0; i < 1000; ++i) {
        temp[i] = deque.shift();
    }
    for (var j = 0; j < 1000; ++j) {
        deque.unshift(temp[i]);
    }
}

var deque = new Deque();
var double = new DoubleEnded();
var builtInArray = new BuiltInArray();

var l = 1000000;

while(--l) {
    deque.push(l);
    double.push(l);
    builtInArray.push(l);
}

var suite = new Benchmark.Suite();

suite
.add("simple-deque", function(){
    var a = deque.shift();
    var b = deque.shift();
    var c = deque.shift();
    
    iterateShiftUnshift(deque);
    
    deque.unshift(a);
    deque.unshift(b);
    deque.unshift(c);
})
.add("double-ended-queue", function(){
    var a = double.shift();
    var b = double.shift();
    var c = double.shift();

    iterateShiftUnshift(double);

    double.unshift(a);
    double.unshift(b);
    double.unshift(c);
})
.add("built-in array", function(){
    var a = builtInArray.shift();
    var b = builtInArray.shift();
    var c = builtInArray.shift();

    iterateShiftUnshift(builtInArray);

    builtInArray.unshift(a);
    builtInArray.unshift(b);
    builtInArray.unshift(c);
})
.on("cycle", function(e) {
    console.log("" + e.target);
})
.run();