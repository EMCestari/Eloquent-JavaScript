//In order to compute digital data, it is firstly needed to find a way to represent them in computer memory
//An ARRAY (or VECTOR) is a a list of values, separated by commas and inserted between brackets
let listOfNumbers = [2,3,5,7,11];
console.log(listOfNumbers[2]);
console.log(listOfNumbers[0]);
console.log(listOfNumbers[2-1]);
console.log("\n\n")

//In JavaScript all values have properties, except from null and undefined. These have no properties
//value.x RETRIEVES A PROPERTY x of "value" -> so value must have a linked property
//value[x] ATTEMPTS TO CALCULATE expression "x" and use result as property name

//Values of type OBJECT are arbitrary collections of properties.
//It is possible to create objects with a notation between parentheses
let day1 = {
    squirrel: false,
    events: ["work", "touched tree", "pizza", "running"]
};
console.log(day1.squirrel);
console.log(day1.wolf);
day1.wolf = false;
console.log(day1.wolf);
console.log("\n\n");

let descriptions = {
    work: "Sono andato a lavorare",
    "touched tree": "Ho toccato un albero"
};

let anObject = {left: 1, right: 2};
console.log(anObject.left);
console.log(Object.keys(anObject));
delete anObject.left; //Truncates a variable from the object
console.log(anObject.left);
console.log("left" in anObject); // Writes "false"
console.log("right" in anObject); // Writes "true"
console.log(Object.keys(anObject));
console.log("\n\n");

let objectA = {a:1, b:2};
Object.assign(objectA, {b:3, c:4}); //Object.assign copies all properties from an object to another
console.log(objectA);
console.log("\n\n");

let object1 = {value: 10};
let object2 = object1;
let object3 = {value: 10};
console.log(object1 == object2); // TRUE
console.log(object1 == object3); // FALSE
object1.value = 15;
// Variables object1 and object2 access the same object, so if we change 1 also 2 changes. Object3 variable points to another object.
console.log(object2.value);
console.log(object3.value);
console.log("\n\n");

const score = {visitors:0, home:0};
score.visitors = 1; //This is good
// score = {visitors:1, home:1}; THIS IS FORBIDDEN

let myJournal = [];
function addEntry(events, squirrel){
    myJournal.push({events,squirrel}); //Shortened syntax for {events:events, squirrel:squirrel}
}
addEntry(["work","touched tree","pizza","running","television"],false);
addEntry(["work","ice cream","cauliflower","lasagna","touched tree","brushed tree"],false);
addEntry(["weekend","cycling","break","peanuts","beer"],true);
console.log(myJournal);

function phi(table){
    return (table[3] * table[0] - table[2] * table[1]) /
        Math.sqrt((table[2] + table[3]) *
                  (table[0] + table[1]) *
                  (table[1] + table[3]) *
                  (table[0] + table[2]));
}
console.log(phi([76, 9, 4, 1]))

var journal = require('./jacques_journal.js');
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
console.log(tableFor("pizza", journal));

//There is a quicker way to iterate in an array:
for (let entry of journal){
    //console.log('${entry.events.length} events.');
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
console.log(journalEvents(journal));

for (let event of journalEvents(journal)) {
    console.log(event + ":", phi(tableFor(event,journal)));
}


console.log("\n\n")

for (let event of journalEvents(journal)) {
    let correlation = phi(tableFor(event, journal));
    if(correlation > 0.1 || correlation < -0.1){
        console.log(event + ":", correlation);
    }

}

console.log("\n\n");

for (let entry of journal) {
    if (entry.events.includes("peanuts") && 
        !entry.events.includes("brushed teeth")) {
            entry.events.push("peanut teeth");
        }
}
console.log(phi(tableFor("peanut teeth", journal)));

let todoList = [];
function remember(task){
    todoList.push(task);
}
function getTask(){
    return todoList.shift();
}
function rememberUrgently(task){
    todoList.unshift(task); //add it at the beginning of the array
}


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
console.log("\n\n");

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
let string = JSON.stringify({squirrel:false, events: ["weekend"]});
console.log(string);
console.log(JSON.parse(string).events);