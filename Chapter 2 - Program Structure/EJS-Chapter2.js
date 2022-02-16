/* BINDING */

let caught = 5*5; //This is a BINDING called 'caught' and it grabs hold of the number produced by multiplying 5 by 5.

let ten = 10;
console.log(ten * ten); // After a binding has been defined, its name can be used as an expression.
// -> 100

let mood = "light";
console.log(mood);
// -> light
mood = "dark"; // When a binding points a value, it must not necessarily be forever.
console.log(mood);
// -> dark

let luigisDebt = 140;
luigisDebt = luigisDebt-35;
console.log(luigisDebt);
// -> 105

let one=1, two=2;
console.log(one + two);
// -> 3

// Words var and const can also be used to create bindings.
var name = "Ayda"; // This is how bindings were declared in pre-2015 JavaScript
const greeting = "Hello"; // const stands for "Constant". It defines a constant binding, which points at the same value for as long as it lives.
console.log(greeting + name);
// -> Hello Ayda

//FUNCTIONS

// A function is a piece of program wrapped in a value.
prompt("Enter passcode"); // The binding prompt holds a function that shows a dialog box.

// Executing a function is called invoking, calling, or applying it.

console.log(Math.max(2,4));
// -> 4

console.log(Math.min(2,4) + 100);
// -> 102

// CONTROL FLOW

let theNumber = Number(prompt("Pick a number"));
console.log("Your number is the square root of " + theNumber*theNumber);

// Not all programs are straight roads:

let theNumber = Number(prompt("Pick a number"));
// The if keyword executes or skips a statement depending on the value of a Boolean expression.
if(!Number.isNaN(theNumber)){ // Number.isNaN is a standard JS function returning true only if the given argument is NaN (string that doesn't represent a valid number).
    console.log("Your number is the square root of " + theNumber * theNumber);
} // The statement after the if is wrapped in braces ({ and }) in this example. The braces can be used to group any number of statements into a single statement, called a block.

// Wrapping into a block is not necessary for a single statement
if (1+1 ==2) console.log("It's true");
// -> It's true

// Else keyword creates a separate, alternative execution path
let theNumber = Number(prompt("Pick a number"));
if (!Number.isNaN(theNumber)) {
    console.log("Your number is the square root of " +
        theNumber * theNumber);
} else {
    console.log("Hey. WHy didn't you give me a number?");
}

// You can also chain multiple if/else pairs together:
let num = Number(prompt("Pick a number"));

if (num<10) {
    console.log("Small");
} else if (num < 100) {
    console.log("Medium");
} else {
    console.log("Large");
}

// WHILE AND DO LOOPS
let number = 0;
while (number <= 12) { // A statement starting with keyword while creates a loop.
    console.log(number);
    number = number + 2;
}
// -> 0
// -> 2
// ... etc.

let result = 1;
let counter = 0;
while (counter < 10){
    result = result*2;
    counter = counter+1;
}
console.log(result);
// -> 1024

let yourName;
do {
    yourName = prompt("Who are you?");
} while (!yourName);
console.log(yourName);

// INDENTATION - The role of indentation inside blocks is to make the structure of the code stand out.
if (false != true) {
    console.log("That makes sense.");
    if (1<2) {
        console.log("No surprise there.");
    }
}

// FOR LOOPS
for (let number = 0; number <= 12; number = number+2){ // Three parts separated by semicolons: 1) Initializes the loop - 2) Checks whether the loop must continue - 3) Updates the state of the loop after every iteration.
    console.log(number);
}
// -> 0
// -> 2
// ... etc.

let result=1;
for (let counter = 0; counter < 10; counter = counter+1){
    result = result * 2;
}
console.log(result);
// -> 1024

for (let current=20;;current=current+1){
    if (current %7 == 0){ // % is the remainder operator
        console.log(current);
        break; // break statement has the effect of immediately jumping out of the enclosing loop.
        // Be careful here: removing the break statement results in an INFINITE LOOP.
        // There is another keyword: continue - it jumps out of the body and continues with loop next iteration.
    }
}
// -> 21



// UPDATING BINDINGS SUCCINCTLY

counter = counter + 1;
// or
counter += 1;
// same idea with other operators, such as *=, -=, etc.
// for += 1 and -=1 there are even shorter forms: ++ and --

for (let number = 0; number <= 12; number += 2){
    console.log(number);
}

// SWITCH Construct

/* To avoid this kind of code:

if (x == "value1") action1();
else if (x == "value2") action2();
else if (x == "value3") action3();
else defaultAction();

There is the switch construct
 */

switch (prompt("What is the weather like?")){
    case "rainy":
        console.log("Remember to bring an umbrella.");
        break;
    case "sunny":
        console.log("Dress lightly.");
    case "cloudy":
        console.log("Go outside.");
        break;
    default:
        console.log("Unknown weather type!");
        break;
}


// Capitalization and Standards
/*
fuzzylittleturtle
fuzzy_little_turtle
FuzzyLittleTurtle
fuzzyLittleTurtle

The first style can be hard to read.
The standard JavaScript functions, and most JavaScript programmers, follow the bottom style.
They capitalize every word except the first.
 */


// Comments
let accountBalance = calculateBalance(account);
// It's a green hollow where a river sings
accountBalance.adjust();
// Madly catching white tatters in the grass.
let report = new Report();
// Where the sun on the proud mountain rings:
addToReport(accountBalance, report);
// It's a little valley, foaming like light in a glass.

// A // comment goes only to the end of the line. A section of text between /* and */ will be ignored in its entirety, regardless of whether it contains line breaks. This is useful for adding blocks of information about a file or a chunk of program.

/*
  I first found this number scrawled on the back of
  an old notebook. Since then, it has often dropped by,
  showing up in phone numbers and the serial numbers of
  products that I've bought. It obviously likes me, so I've
  decided to keep it.
*/
const myNumber = 11213;