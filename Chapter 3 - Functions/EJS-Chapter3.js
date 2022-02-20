//Defining a function is like defining a variable, where the value of the variable is the function
const square = function(x){
    return x*x;
};

console.log("Square of 12 is " + square(12));
// -> Square of 12 is 144

// A function can have multiple parameters or... No parameters at all!
const makeNoise = function() {
    console.log("Pling!");
}

makeNoise();
// -> Pling!

const power = function(base, exponent) {
    let result = 1;
    for (let count = 0; count < exponent; count++) {
        result *= base;
    }
    return result;
};

console.log("2^10 = " + power(2,10));
// -> 2^1' = 1024


// BINDINGS AND SCOPES

//Each variable has a SCOPE (Ambito di visibilità) 
//Variables outside functions or blocks, the scope is the program -> These are GLOBAL variables
//Variables inside functions or passed as parameters are used only in those functions -> These are LOCAL variables
//Variables declared with "let" and "const" are local to the block in which they are declared
//In JavaScript before 2015 only funcs could create new scopes -> Variables declared with "var" are visible in all the function, or in global scope, if not inside a function

let x=10;
if(true) {
    let y = 20;
    var z = 30;
    console.log (x + y + z)
    // -> 60
}
// here y is NOT visible
// console.log(x+y) would throw an error
// but z IS visible
console.log(x+z);
// -> 40


// If more variables have the same name, code can only see the inner one
const halve = function(n){
    return n/2;
}

let n=10;
console.log(halve(100));
// -> 50
console.log(n);
// -> 10


// Blocks and functions can be created INSIDE other blocks and functions (Nested Scope). There are different levels of scope.
const hummus = function(factor){
    const ingredient = function(amount, unit, name){
        let ingredientAmount = amount * factor;
        if (ingredientAmount > 1) {
            unit += "s";
        }
        console.log(ingredientAmount + " " + unit + " " + name);
    };
    ingredient(1, "can", "chickpeas");
    ingredient(0.25, "cup", "tahini");
    ingredient(0.25, "cup", "lemon juice");
    ingredient(1, "clove", "garlic");
};
hummus(5);

// A function binding is just a name for some parts of the program. It's a regular binding and, if not constant, it can be assigned a new value.
let launchMissiles = function() {
    console.log("\n\nLaunch!!!");
};

if (safeMode) {
    launchMissiles = function () {/* do nothing */};
}

//There is a workaround to create a variable for a function: we can use the keyword function at the beginning of the declaration.
function squareFunction(x){
    return x*x;
} //It doesn't require the semicolon after the function

console.log("Future says: ", future());
// This code works, even if the function is defined below. Functions declarations are conceptually positioned at the highest point in the scope, and can be used from all the code in that level
function future(){
    return "We haven\'t flying cars yet";
}


//Then, there is a THIRD NOTATION: the ARROW FUNCTION (=>)
const powerArrowFunction = (base,exponent) => {
    let result = 1;
    for (let count=0; count<exponent; count++){
        result *= base;
    }
    return result;
}
console.log(powerArrowFunction(4,4));
//If there is only one parameter, these notation can also be used:
const squareArrow1 = (x) => {return x*x};
const squareArrow2 = x => x*x;
console.log(squareArrow1(2) == squareArrow2(2));
//And if there's no parameter, then parameter list is just an empty set of parentheses
const horn = () => {
    console.log("Toot");
}

function greet(who){
    console.log("Hello " + who);
}
greet("Harry"); // Computer must remember the context from which the call happens, since it will return here after function execution. The place is the "Call Stack".
console.log("Bye");

// Stack means memory - DO NOT EXECUTE THIS CODE:
function chicken(){
    return egg();
}
function egg(){
    return chicken();
}
console.log(chicken() + " came first.");
// -> ??
// This code will start an "infinite" loop - it WOULD be infinite IF the computer had infinite memory. Actual result is "out of stack space" or "too much recursion".

// JavaScript allows great flexibility when it comes to parameters definition
// Here function is defined with 1 argument, but when called it accepts the extra ones, and simply ignores them
function square(x) { return x * x; }
console.log(square(4, true, "hedgehog"));
// -> 16

// Upside is also true - a function can be defined with more arguments and then just called with less.
function minus(a, b){
    if (b === undefined) return -a;
    else return a-b;
}
console.log(minus(10));
// -> -10
console.log(minus(10,5));
// -> 5

//A default value can be assigned to a parameter, it is used if no other parameter is passed:
function powerWithDefault(base, exponent = 2){
    let result = 1;
    for (let count=0; count<exponent; count++){
        result *= base;
    }
    return result;
}
console.log(powerWithDefault(4));
// -> 16
console.log(powerWithDefault(2,6));
// -> 64


/* -------------- QUICK RECAP ------------- */
/*
Three ways to write functions:
1) const functionName = function(args){ body of the function };   [Semicolon needed here]
2) function functionName(args) { body of the function }           [Semicolon optional BUT good practice]
3) const functionName = (args) => { body of the function }        [Semicolon optional BUT good practice]

Each binding has a SCOPE, which is the part of the program in which the binding is visible.
The difference between "var" and "let" is in the scope:
a) let bindings are local to the block they are created in
b) var bindings are visible in the whole function they appear in OR throughout the global scope, if not in a function

JavaScript is very flexible with arguments:
a) a function can be called with more arguments than defined - the extra ones will be ignored
b) a function can be called with less arguments than defined, provided that it deals with "undefined" bindings


 */

//CLOSURE
//What happens to local variables, when the function is no more active?
function wrapValue(n){
    let local = n; //creates a local value
    return () => local; //returned value is a function that accesses and returns local binding
}

let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);
console.log(wrap1());
// -> 1
console.log(wrap2());
// -> 2

//Closure: being able to reference a specific instance of a local variable, in an enclosing scope
// A function that closes "upon" a local variable is defined A closure.

function multiplier(factor){
    return number => number * factor;
}
let twice = multiplier(2);
console.log(twice(5));
// -> 10

//Mental model: function values can be thought as if they contain both code of body AND the environment in which they are created. When called,  body of function sees the environment in which it has been created, not the one in which it has been called.


// RECURSION
//Functions can call themselves (until they saturate stack)
function powerRecursive(base, exponent){
    if (exponent == 0) {
        return 1;
    } else {
        return base * powerRecursive(base, exponent - 1);
    }
}
console.log(powerRecursive(2,3));
// -> 8
//It's a great style, but it costs in terms of performance!!! In JavaScript, it is 3 times slower than cyclic function


function findSolution(target){
    function find(current,history){
        if (current == target){
            return history;
        } else if (current > target) {
            return null;
        } else {
            return find(current + 5, "(" + history + " + 5)") ||
                   find(current * 3, "(" + history + " * 3)");
        }
    }
    return find(1, "1");
}
console.log(findSolution(24));
// -> (((1*3) + 5) * 3)

/*
// -> (((1*3) + 5) * 3)7
To better understand how this function produces the effect we’re looking for, let’s look at all the calls to find that are made when searching for a solution for the number 13.
find(1, "1")
  find(6, "(1 + 5)")
    find(11, "((1 + 5) + 5)")
      find(16, "(((1 + 5) + 5) + 5)")
        too big
      find(33, "(((1 + 5) + 5) * 3)")
        too big
    find(18, "((1 + 5) * 3)")
      too big
  find(3, "(1 * 3)")
    find(8, "((1 * 3) + 5)")
      find(13, "(((1 * 3) + 5) + 5)")
        found!
 */



// GROWING FUNCTIONS

function printFarmInventory(cows, chickens){
    let cowString = String(cows);
    while (cowString.length < 3){
        cowString = "0" + cowString;
    }
    console.log(`${cowString} Cows`);
    let chickenString = String(chickens);
    while(chickenString.length < 3){
        chickenString = "0" + chickenString;
    }
    console.log(`${chickenString} Chickens`);
}
printFarmInventory(7,11);

/*
Mission accomplished! But just as we are about to send the farmer the code (along with a hefty invoice), she calls and tells us she’s also started keeping pigs, and couldn’t we please extend the software to also print pigs?

We sure can. But just as we’re in the process of copying and pasting those four lines one more time, we stop and reconsider. There has to be a better way. Here’s a first attempt:
 */
function printZeroPaddedWithLabel(number, label){
    let numberString = String(number);
    while(numberString.length < 3){
        numberString = "0" + numberString;
    }
    console.log(`${numberString} ${label}`);
}

function printFarmInventory(cows, chickens, pigs){
    printZeroPaddedWithLabel(cows, "Cows");
    printZeroPaddedWithLabel(chickens, "Chickens");
    printZeroPaddedWithLabel(pigs, "Pigs");
}

printFarmInventory(7,11,13);

/*
It works! But that name, printZeroPaddedWithLabel, is a little awkward. It conflates three things—printing, zero-padding, and adding a label—into a single function.

Instead of lifting out the repeated part of our program wholesale, let’s try to pick out a single concept.
 */

function zeroPad(number, width){
    let string = String(number);
    while (string.length < width){
        string = "0" + string;
    }
    return string;
}

function printFarmInventory(cows, chickens, pigs){
    console.log(`${zeroPad(cows,3)} Cows`);
    console.log(`${zeroPad(chickens, 3)} Chickens`);
    console.log(`${zeroPad(pigs, 3)} Pigs`);
}

printFarmInventory(7, 16, 3);


// SUMMARY

/*
The function keyword, when used as an expression, can create a function value.
When used as a statement, it can be used to declare a binding and give it a function as its value.
Arrow functions are yet another way to create functions.
 */
// Define f to hold a function value
const f = function(a) {
    console.log(a + 2);
};

// Declare g to be a function
function g(a, b) {
    return a * b * 3.5;
}

// A less verbose function value
let h = a => a % 3;

/*
A key aspect in understanding functions is understanding scopes.
Each block creates a new scope.
Parameters and bindings declared in a given scope are local and not visible from the outside.
Bindings declared with var behave differently—they end up in the nearest function scope or the global scope.

Separating the tasks your program performs into different functions is helpful.
You won’t have to repeat yourself as much, and functions can help organize a program by grouping code into pieces that do specific things.
 */