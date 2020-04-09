var SCRIPTS = require('./scripts.js');

function flattener(array){
    let flattened = array.reduce(
        function (accumulator, currentValue){
            return accumulator.concat(currentValue);
        }
    )
    console.log(flattened);
};

flattener([[1,2],[3,4],[5,6]]);
flattener([[1,2,3],[4,5,6],[2,3]]);


function simiLoop(value, verifyFunc, updateFunc, bodyFunc){
    let iterator = value;
    while(verifyFunc(iterator)){
        bodyFunc(iterator);
        iterator = updateFunc(iterator);
    }
}

simiLoop(3, n => n>0, n=>n-1, console.log);

console.log("\n\n");

function similEvery(array, everyFunc){
    let result = true;
    for (let element in array){
        if (everyFunc(array[element]) == false){
            result = false;
        }
    }
    return result;
}

console.log(similEvery([1, 3, 5], n => n < 10));
// → true
console.log(similEvery([2, 4, 16], n => n < 10));
// → false
console.log(similEvery([], n => n < 10));
// → true
console.log("\n\n");

// De Morgan's Laws -> a && b equals !(!a || !b)
function similEveryWithSome(array, everyFunc){
    // array.some(element => everyFunc(element)); -> Returns true if AT LEAST one element is true
    // array.some(element => !everyFunc(element)); -> Returns true if AT LEAST one element is false
    // !array.some(element => !everyFunc(element)); -> Returns false if AT LEAST one element is false --> WHAT WE WANT TO GET
    return !array.some(element => !everyFunc(element));
}

console.log(similEveryWithSome([1, 3, 5], n => n < 10));
// → true
console.log(similEveryWithSome([2, 4, 16], n => n < 10));
// → false
console.log(similEveryWithSome([], n => n < 10));
// → true

console.log("\n\n");


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

function dominantDirection(text){
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : "none";
    }).filter(({name}) => name != "none");

    if (scripts.length == 0) return "ltr";

    return scripts.reduce( (a,b) => a.count > b.count ? a : b).name;
};

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl