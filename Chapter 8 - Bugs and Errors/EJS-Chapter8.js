/* STRICT MODE */
// Putting "use strict" at the top of your program rarely hurts and might help you spot a problem.

function canYouSpotTheProblem() {
    "use strict";
    for (counter=0; counter < 10; counter++){
        console.log("Happy happy");
    }
}

canYouSpotTheProblem();
// -> Reference error: counter is not defined


function Person(name) {this.name = name;}
let ferdinand = Person("Ferdinand"); // oops
console.log(name);
// -> Ferdinand

"use strict";
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // forgot new
// → TypeError: Cannot set property 'name' of undefined


/* TESTING */
// Tests usually take the form of little labeled programs that verify some aspect of your code.
function test(label, body) {
    if (!body()) console.log(`Failed: ${label}`);
}

test("convert Latin text to uppercase", () => {
    return "hello".toUpperCase() == "HELLO";
});
test("convert Greek text to uppercase", () => {
    return "".toUpperCase() == "";
});
test("don't convert case-less characters", () => {
    return "    ".toUpperCase() == "    ";
});



/* DEBUGGING */
function numberToString(n, base = 10) {
    let result = "", sign = "";
    if (n < 0) {
        sign = "-";
        n = -n;
    }
    do {
        result = String(n % base) + result;
        n /= base;
    } while (n > 0);
    return sign + result;
}
console.log(numberToString(13, 10));
// → 1.5e-3231.3e-3221.3e-3211.3e-3201.3e-3191.3e-3181.3...

// resist the urge to start making random changes to the code to see whether that makes it better. Instead, think
// Putting a few strategic console.log calls into the program is a good way to get additional information about what the program is doing.
// use the debugger capabilities of your browser. Browsers come with the ability to set a breakpoint on a specific line of your code.


/* ERROR PROPAGATION */

function promptNumber(question) {
    let result = Number(prompt(question));
    if (Number.isNaN(result)) return null;
    else return result;
}

console.log(promptNumber("How many trees do you see?"));


function lastElement(array) {
    if (array.length == 0) {
        return {failed: true};
    } else {
        return {element: array[array.length - 1]};
    }
}


/* EXCEPTIONS */

function promptDirection(question) {
    let result = prompt(question);
    if (result.toLowerCase() == "left") return "L";
    if (result.toLowerCase() == "right") return "R";
    throw new Error("Invalid direction: " + result);
}

function look() {
    if (promptDirection("Which way?") == "L") {
        return "a house";
    } else {
        return "two angry bears";
    }
}

try {
    console.log("You see", look());
} catch (error) {
    console.log("Something went wrong: " + error);
}

/* CLEANING UP AFTER EXCEPTIONS */

const accounts = {
    a: 100,
    b: 0,
    c: 20
};

function getAccount() {
    let accountName = prompt("Enter an account name");
    if (!accounts.hasOwnProperty(accountName)) {
        throw new Error(`No such account: ${accountName}`); // If an exception happens, money just disappears!
    }
    return accountName;
}

function transfer(from, amount) {
    if (accounts[from] < amount) return;
    accounts[from] -= amount; // BAD!!! transfer first removes the money from the account and then calls getAccount before it adds it to another account
    accounts[getAccount()] += amount;
}


// Improved version with try...catch...finally
function transfer(from, amount) {
    if (accounts[from] < amount) return;
    let progress = 0;
    try {
        accounts[from] -= amount;
        progress = 1;
        accounts[getAccount()] += amount;
        progress = 2;
    } finally { // No matter what happens, this code will be run after trying the code in the try block
        if (progress == 1) {
            accounts[from] += amount;
        }
    }
}


/* SELECTIVE CATCHING */
for (;;) {
    try {
        let dir = promtDirection("Where?"); // → typo!
        console.log("You chose ", dir);
        break;
    } catch (e) {
        console.log("Not a valid direction. Try again.");
    }
}




class InputError extends Error {}

function promptDirection(question) {
    let result = prompt(question);
    if (result.toLowerCase() == "left") return "L";
    if (result.toLowerCase() == "right") return "R";
    throw new InputError("Invalid direction: " + result);
}


for (;;) {
    try {
        let dir = promptDirection("Where?");
        console.log("You chose ", dir);
        break;
    } catch (e) {
        if (e instanceof InputError) {
            console.log("Not a valid direction. Try again.");
        } else {
            throw e;
        }
    }
}


/* ASSERTIONS */

function firstElement(array) {
    if (array.length == 0) {
        throw new Error("firstElement called with []");
    }
    return array[0];
}

