var SCRIPTS = require('./scripts.js');

/* It is a useful skill, in programming,
to notice when you are working at too low a level of abstraction. */

function repeatLog(n){
    for (let i=0; i<n; i++){
        console.log(i);
    }
}


function repeat(n, action){
    for (let i=0; i<n; i++){
        action(i);
    }
}

repeat(3, console.log);
// -> 0
// -> 1
// -> 2


let labels = [];
repeat(5, i => {
    labels.push(`Unit ${i+1}`);
});
console.log(labels);
// -> ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]


// Functions that operate on other functions are called higher-order functions.
// Higher-order functions allow to abstract over actions not just values.
function greaterThan(n){
    return m => m>n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// -> true


// We can have functions that change other functions
function noisy(f){
    return (...args) => {
        console.log("calling with", args);
        let result = f(...args);
        console.log("called with", args, ", returned", result);
        return result;
    };
}

noisy(Math.min)(3,2,1);
// -> calling with [3,2,1]
// -> called with [3,2,1], returned 1


function unless(test, then){
    if (!test) then();
}

repeat(3,n => {
    unless(n%2 == 1, () => {
        console.log(n, "is even");
    });
});
// -> 0 is even
// -> 2 is even

/* There is a built-in array method, forEach,
that provides something like a for/of loop as a higher-order function. */
["A","B"].forEach(l => console.log(l));
// -> A
// -> B


// The following function filters out the elements in an array that don't pass a test.
function filter(array, test) { // The function uses the argument named test, a function value, to fill a “gap” in the computation—the process of deciding which elements to collect.
    let passed = [];
    for (let element of array) {
        if (test(element)) {
            passed.push(element);
        }
    }
    return passed;
}

console.log(filter(SCRIPTS, script => script.living));
// -> [{name: "Adlam", ...}, ...]

/*
The map method transforms an array by applying a function to all of its elements and building a new array from the returned values.
The new array will have the same length as the input array, but its content will have been mapped to a new form by the function.
 */
function map (array, transform) {
    let mapped = [];
    for (let element of array){
        mapped.push(transform(element)); // The difference with filter is here - function is not used to FILTER, but to TRANSFORM
    }
    return mapped;
}

let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
console.log(map(rtlScripts, s => s.name));
// -> ["Adlam", "Arabic", Imperial Aramaic", ...]


/*
Another common thing to do with arrays is to compute a single value from them.
The higher-order operation that represents this pattern is called reduce (sometimes also called fold).
It builds a value by repeatedly taking a single element from the array and combining it with the current value.
The parameters to reduce are, apart from the array, a combining function and a start value.
 */
function reduce(array, combine, start){
    let current = start;
    for (let element of array){
        current = combine (current,element);
    }
    return current;
}

console.log(reduce([1,2,3,4],(a,b) => a+b, 0));
// -> 10
console.log([1,2,3,4].reduce((a,b) => a+b));
// -> 10

// The characterCount function reduces the ranges assigned to a script by summing their sizes.
function characterCount(script) {
    return script.ranges.reduce((count, [from,to]) => { // Here we are using the builtin reduce function, which doesn't need start parameter if there is at least one element in the array.
        return count + (to - from);
    }, 0);
}

console.log(SCRIPTS.reduce((a, b) => {
    return characterCount(a) < characterCount(b) ? b : a;
}));


/* COMPOSABILITY */

// For simple functions, even writing them without HOF is not an issue
let biggest = null;
for (let script of SCRIPTS) {
    if (biggest == null || characterCount(biggest) < characterCount(script)) {
        biggest = script;
    } 
}
console.log(biggest);
// -> {name: "Han", ...}

// HOF are useful when you need to COMPOSE operations
function average(array){
    return array.reduce((a,b) => a + b) / array.length;
}
console.log(Math.round(average(
    SCRIPTS.filter(s => s.living).map(s => s.year))));
// -> 1165

console.log(Math.round(average(
    SCRIPTS.filter(s => !s.living).map(s => s.year))));
// -> 188

// If we write the same computation in one big loop, it is harder to read.
let total=0, count=0;
for (let script of SCRIPTS){
    if (script.living){
        total += script.year;
        count += 1;
    }
}
console.log(Math.round(total / count));
// -> 1188

function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code < to;
        })) {
            return script;
        }
    }
    return null;
}

console.log(characterScript(121));
// -> {name: "Latin", ...}



function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name == name);
        if (known == -1){
            counts.push({name, count: 1});
        } else {
            counts[known].count++;
        }
    }
    return counts;
}

console.log(countBy([1,2,3,4,5], n => n>2));

function textScripts(text) {
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.name : "none";
    }).filter(({name}) => name != "none");

    let total = scripts.reduce((n, {count}) => n+count, 0);
    if (total == 0) return "No scripts found";

    return scripts.map(({name, count}) => {
        return '${Math.round(count * 100 / total)} % ${name}';
    }).join(", ");
}


/* SUMMARY */
/*
Being able to pass function values to other functions is a deeply useful aspect of JavaScript.
It allows us to write functions that model computations with “gaps” in them.
The code that calls these functions can fill in the gaps by providing function values.

Arrays provide a number of useful higher-order methods.
You can use forEach to loop over the elements in an array.
The filter method returns a new array containing only the elements that pass the predicate function.
Transforming an array by putting each element through a function is done with map.
You can use reduce to combine all the elements in an array into a single value.
The some method tests whether any element matches a given predicate function.
And findIndex finds the position of the first element that matches a predicate.
 */