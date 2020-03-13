//Defining a function is like defining a variable, where the value of the variable is the function
const square = function(x){
    return x*x;
};

console.log("Square of 12 is " + square(12));

const power = function(base, exponent) {
    let result = 1;
    for (let count = 0; count < exponent; count++) {
        result *= base;
    }
    return result;
};

console.log("2^10 = " + power(2,10));

//Each variable has a SCOPE (Ambito di visibilità) 
//Variables outside functions or blocks, the scope is the program -> These are GLOBAL variables
//Variables inside functions or passed as parameters are used only in those functions -> These are LOCAL variables
//Variables declared with "let" and "const" are local to the block in which they are declared
//In JavaScript before 2015 only funcs could create new scopes -> Variables declared with "var" are visible in all the function, or in global scope, if not inside a funciton

let x=10;
if(true) {
    let y = 20;
    var z = 30;
    console.log (x + y + z)
    // Expected: 60
}
// here y is NOT visible
// console.log(x+y) would throw an error
// but z IS visible
console.log(x+z);
// Expected: 40


// If more variables have the same name, code can only see the inner one
const halve = function(n){
    return n/2;
}

let n=10;
console.log(halve(100));
// Expected: 50
console.log(n+"\n\n");
// Expected: 10


//There are different levels of scope.
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

//A function variable is just a name for some parts of the program. A function value can do everything the other values do.
let launchMissiles = function() {
    console.log("\n\nLaunch!!!");
};
launchMissiles();
//At the same time, a variable containing a function is just a normal variable: if it's not a constant, it is possible to assign it a new value:
launchMissiles = function() {console.log("\n\n")};
launchMissiles();

//There is a workaround to create a variable for a function: we can use the keyword function at the beginning of the declaration.
function squareFunction(x){
    return x*x;
} //It doesn't require ;

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
horn();


//JavaScript allows great flexibility when it comes to parameters definition
function minus(a, b){
    if (b === undefined) return -a;
    else return a-b;
}
console.log("\n\n")
console.log(minus(10));
console.log(minus(10,5));
console.log("\n\n")

//A default value can be assigned to a parameter, it is used if no other parameter is passed:
function powerWithDefault(base, exponent = 2){
    let result = 1;
    for (let count=0; count<exponent; count++){
        result *= base;
    }
    return result;
}
console.log(powerWithDefault(4)); //Expected: 16
console.log(powerWithDefault(2,6)); // Epxected: 64

//CLOSURE
//What happens to local variables, when the function is no more active?
function wrapValue(n){
    let local = n; //creates a local value)
    return () => local; //returned value is a function that accesses the function and returns local value
}
let wrap1 = wrapValue(1); //Expected: 1
let wrap2 = wrapValue(2); //Expected: 2
console.log(wrap1());
console.log(wrap2());
//Closure: being able to reference a specific instance of a local variable, in a scope that envelopes it
// A function that closes "upon" a local variable is defined A closure.

function multiplier(factor){
    return number => number * factor;
}
let twice = multiplier(2);
console.log(twice(5));
//Mental model: function values can be thought as if they contain both code of body AND the environment in which they are created. When called,  body of function sees the environment in which it has been created, not the one in which it has been called.

//Functions can call themselves (until they saturate stack)
function powerRecursive(base, exponent){
    if (exponent == 0) {
        return 1;
    } else {
        return base * powerRecursive(base, exponent - 1);
    }
}
console.log(powerRecursive(2,3)); //Expected: 8
//It's a great style, but it costs in terms of performance!!! In JavaScript, it is 3 times slower than cyclic function

console.log("\n\n");

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
console.log(findSolution(24)); //Expected: (((1*3) + 5) * 3)

console.log("\n\n")

function printFarmInventory(vacche, polli){
    let cowString = String(vacche);
    while (cowString.length < 3){
        cowString = "0" + cowString;
    }
    console.log(cowString + " Vacche");
    let chickenString = String(polli);
    while(chickenString.length < 3){
        chickenString = "0" + chickenString;
    }
    console.log(chickenString + " Polli");
}
printFarmInventory(7,11);
console.log("\n\n")


console.log("\n\n")