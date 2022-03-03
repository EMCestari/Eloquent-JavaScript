//In order to compute digital data, it's necessary to represent it in computer memory
//An ARRAY (or VECTOR) is a a list of values, separated by commas and inserted between brackets
let listOfNumbers = [2,3,5,7,11];
console.log(listOfNumbers[2]);
// -> 5
console.log(listOfNumbers[0]); // First index of an array is zero, not one.
// -> 2
console.log(listOfNumbers[2-1]);
// -> 3


//In JavaScript all values have properties, except from null and undefined. These have no properties
null.length;
// -> Type Error: null has no properties


//value.x RETRIEVES A PROPERTY x of "value" -> so value must have a linked property
//value[x] ATTEMPTS TO CALCULATE expression "x" and use result as property name


/* ************ METHODS *********** */

// Properties that contain functions are generally called methods of the value they belong to, as in “toUpperCase is a method of a string.”
let doh = "Doh";
console.log(typeof doh.toUpperCase());
// -> function
console.log(doh.toUpperCase());
// -> DOH


let sequence = [1, 2, 3];
sequence.push(4); // The push method adds values to the end of an array
sequence.push(5);
console.log(sequence);
// -> [1, 2, 3, 4, 5]
console.log(sequence.pop()); // The pop method removes the last value in the array and returns it
// -> 5
console.log(sequence);
// -> [1, 2, 3, 4]



/* *********** OBJECTS *********** */



//Values of type OBJECT are arbitrary collections of properties.
let day1 = {
    squirrel: false,
    events: ["work", "touched tree", "pizza", "running"]
};
console.log(day1.squirrel);
// -> false
console.log(day1.wolf);
// -> undefined
day1.wolf = false;
console.log(day1.wolf);
// -> false


// braces have two meanings in JavaScript. At the start of a statement, they start a block of statements. In any other position, they describe an object.
let descriptions = {
    work: "Went to work",
    "touched tree": "Touched a tree"
};


// The delete operator is a unary operator that, when applied to an object property, will remove the named property from the object. This is not a common thing to do, but it is possible.
let anObject = {left: 1, right: 2};
console.log(anObject.left);
// -> 1
delete anObject.left; //Truncates a variable from the object
console.log(anObject.left);
// -> undefined
console.log("left" in anObject); // The binary in operator, when applied to a string and an object, tells you whether that object has a property with that name.
// -> false
console.log("right" in anObject);
// -> true

// To find out what properties an object has, you can use the Object.keys function.
console.log(Object.keys{x:0, y:0, z:2});
// -> ["x", "y", "z"]


// There’s an Object.assign function that copies all properties from one object into another.
let objectA = {a:1, b:2};
Object.assign(objectA, {b:3, c:4}); //Object.assign copies all properties from an object to another
console.log(objectA);
// -> {a: 1, b: 3, c: 4}

// Arrays, then, are just a kind of object specialized for storing sequences of things. If you evaluate typeof [], it produces "object".


/* ******** MUTABILITY ********* */

// Object values can be modified. The types of values such as numbers, strings, and Booleans, are all immutable.
// Objects work differently. You can change their properties, causing a single object value to have different content at different times.
// With objects, there is a difference between having two references to the same object and having two different objects that contain the same properties.
let object1 = {value: 10};
let object2 = object1;
let object3 = {value: 10};

console.log(object1 == object2);
// -> true
console.log(object1 == object3);
// -> false

object1.value = 15;
console.log(object2.value);
// -> 15
console.log(object3.value);
// -> 10
// The object1 and object2 bindings grasp the same object, which is why changing object1 also changes the value of object2. They are said to have the same identity.
// The binding object3 points to a different object, which initially contains the same properties as object1 but lives a separate life.


// though a const binding to an object can itself not be changed and will continue to point at the same object, the contents of that object might change.
const score = {visitors:0, home:0};
// This is okay
score.visitors = 1;
// This isn't allowed
score = {visitors:1, home:1};

// When you compare objects with JavaScript’s == operator, it compares by identity: it will produce true only if both objects are precisely the same value. Comparing different objects will return false, even if they have identical properties.
// There is no “deep” comparison operation built into JavaScript, which compares objects by contents, but it is possible to write it yourself

let journal = [];
function addEntry(events, squirrel){
    journal.push({events,squirrel}); //Shortened syntax for {events:events, squirrel:squirrel}
}
addEntry(["work","touched tree","pizza","running","television"],false);
addEntry(["work","ice cream","cauliflower","lasagna","touched tree","brushed tree"],false);
addEntry(["weekend","cycling","break","peanuts","beer"],true);


function phi(table){
    return (table[3] * table[0] - table[2] * table[1]) /
        Math.sqrt((table[2] + table[3]) *
            (table[0] + table[1]) *
            (table[1] + table[3]) *
            (table[0] + table[2]));
}
console.log(phi([76, 9, 4, 1]))
// → 0.068599434

let JOURNAL = require('./jacques_journal.js');
function tableFor(event, journal){
    let table = [0,0,0,0];
    for (let i=0; i<journal.length; i++){
        let entry = journal[i], index=0;
        if (entry.events.includes(event)) index += 1; //It verifies if a certain value exists in the array
        if (entry.squirrel) index += 2;
        table[index] += 1;
    }
    return table;
}
console.log(tableFor("pizza", JOURNAL));
// → [76, 9, 4, 1]

//There is a quicker way to iterate in an array:
for (let entry of JOURNAL){
    console.log(`${entry.events.length} events.`);
}


function journalEvents(journal){
    let events = [];
    for (let entry of journal){
        for (let event of entry.events) {
            if (!events.includes(event)) {
                events.push(event);
            }
        }
    }
    return events;
}
console.log(journalEvents(JOURNAL));
// → ["carrot", "exercise", "weekend", "bread", ...]

for (let event of journalEvents(JOURNAL)) {
    console.log(event + ":", phi(tableFor(event,JOURNAL)));
}
// → carrot: 0.0140970969
// → exercise: 0.0685994341
// → weekend: 0.1371988681
// → bread: -0.0757554019
// → pudding: -0.0648203724
// and so on...

for (let event of journalEvents(JOURNAL)) {
    let correlation = phi(tableFor(event, JOURNAL));
    if(correlation > 0.1 || correlation < -0.1){
        console.log(event + ":", correlation);
    }
}
// → weekend:          0.1371988681
// → brushed teeth: -0.3805211953
// → candy:            0.1296407447
// → work:            -0.1371988681
// → spaghetti:        0.2425356250
// → reading:          0.1106828054
// → peanuts:          0.5902679812


for (let entry of JOURNAL) {
    if (entry.events.includes("peanuts") &&
        !entry.events.includes("brushed teeth")) {
        entry.events.push("peanut teeth");
    }
}
console.log(phi(tableFor("peanut teeth", JOURNAL)));
// -> 1


/* ****** OTHER ARRAY METHODS ****** */

let todoList = [];
function remember(task){
    todoList.push(task);
}
function getTask(){
    return todoList.shift(); // removes task from the beginning of the array
}
function rememberUrgently(task){
    todoList.unshift(task); //add it at the beginning of the array
}
// So:
// push() and pop(): add/remove at the END of the array
// shift() and unshift(): add/remove at the BEGINNING of the array


console.log([1, 2, 3, 2, 1].indexOf(2)); // Search from the beginning
// → 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2)); // Search from the end
// → 3

console.log([0, 1, 2, 3, 4].slice(2, 4)); // Takes start and end indices and returns an array with only the elements in between
// → [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));
// → [2, 3, 4]


// The concat method can be used to glue arrays together to create a new array, similar to what the + operator does for strings.
function remove(array, index) {
    return array.slice(0, index)
        .concat(array.slice(index + 1));
}
console.log(remove(["a", "b", "c", "d", "e"], 2));
// → ["a", "b", "d", "e"]


let kim = "Kim";
kim.age = 88; // Values of type string, number and Boolean are not objects and they don't store new properties
console.log(kim.age);
// -> undefined

// Every string value has a number of methods
console.log("coconuts".slice(4,7));
// -> nut

console.log("coconut".indexOf("u"));
// -> 5

console.log("one two three".indexOf("ee")); // string indexOf method can search for a string containing more than one character
// -> 11

console.log("  okay\n ".trim()); // trim method removes whitespace from the start and end of a string
// -> okay

console.log(String(6).padStart(3, "0"));
// -> 006

let sentence = "Secretarybirds specialize in stomping";
let words = sentence.split(" ");
console.log(words);
// -> ["Secretarybirds","specialize","in","stomping"]
console.log(words.join(". "));
// -> Secretarybirds.specialize.in.stomping

console.log("LA".repeat(3));
// -> LALALA

let string = "abc";
console.log(string.length);
// -> 3
console.log(string[1]);
// -> b




/* ************ REST PARAMETERS ************ */

// A function can accept ANY number of params, using the ... notation - Called the REST Parameter
function max(...numbers){
    let result = -Infinity;
    for (let number of numbers){
        if (number>result){
            result = number;
        }
    }
    return result;
}

console.log(max(4,1,9,-2));
// -> 9

let numbers = [5,1,7];
console.log(max(...numbers));
// -> 7

let words = ["never","fully"];
console.log(["will", ...words, "understand"]);
// -> ["will","never","fully","understand"]

/* ******** THE MATH OBJECT ******** */
// The Math object is used as a container to group a bunch of related functionality.
// There is only one Math object, and it is almost never useful as a value.
// Rather, it provides a namespace so that all these functions and values do not have to be global bindings.
function randomPointOnCircle(radius){
    let angle = Math.random() * 2 * Math.PI;
    return {x: radius * Math.cos(angle), y: radius * Math.sin(angle)};
}
console.log(randomPointOnCircle(2));
// -> {x: xxxx.xxxx, y: yyyy.yyyy}


// Though computers are deterministic machines—they always react the same way if given the same input—it is possible to have them produce numbers that appear random.
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());

console.log(Math.floor(Math.random() * 10)); // Math.floor rounds down to the nearest whole number.
console.log(Math.ceil(Math.random() * 10)); // Math.ceil rounds up to a whole number.
console.log(Math.round(Math.random() * 10)); // Math.ceil rounds up to the nearest whole number.


// DESTRUCTURING

// Rewriting phi function in a "destructured way", using square brackets to "look inside" the value, rather than using an array variable
function phiDestructured([n00,n01,n10,n11]){
    return (n11 * n00 - n10 * n01) /
        Math.sqrt((n10 + n11) * (n00 + n01) *
            (n01 + n11) * (n00 + n10));
}

// This can also be done with objects:
let {name} = {name: "Faraji", age: 23};
console.log(name);
console.log("\n\n");

//JSON
// In order to send data, we SERIALIZE data. We basically convert them in a flat notation. JSON = JavaScript Object Notation
// Two functions are used: JSON.stringify and JSON.parse
let string = JSON.stringify({squirrel:false, events: ["weekend"]}); // stringify takes a JavaScript value and returns a JSON-encoded string
console.log(string);
console.log(JSON.parse(string).events); // parse takes a string and converts it to the value it encodes



/* ******* SUMMARY ******* */
/*
Objects and arrays (which are a specific kind of object) provide ways to group several values into a single value.
Conceptually, this allows us to put a bunch of related things in a bag and run around with the bag, instead of wrapping our arms around all of the individual things and trying to hold on to them separately.

Most values in JavaScript have properties, the exceptions being null and undefined.
Properties are accessed using value.prop or value["prop"].
Objects tend to use names for their properties and store more or less a fixed set of them.
Arrays, on the other hand, usually contain varying amounts of conceptually identical values and use numbers (starting from 0) as the names of their properties.

There are some named properties in arrays, such as length and a number of methods.
Methods are functions that live in properties and (usually) act on the value they are a property of.

You can iterate over arrays using a special kind of for loop—for (let element of array).
 */