// You can use JavaScript functions to create local scopes and objects to represent module interfaces

const weekDay = function(){
    const names = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    return{
        name(number) { return names[number]; },
        number(name) {return names.indexOf(name);}
    };
}();

console.log(weekDay.name(weekDay.number("Sunday")));
// -> Sunday



// Special operator eval will execute a string in the current scope.
// This is usually a bad idea because it breaks some properties that scopes have, such easy predictability.

const x = 1;
function evalAndReturnX(code) {
    eval(code);
    return x;
}

console.log(evalAndReturnX("var x = 2"));
// -> 2
console.log(x);
// -> 1


// A less scary way of interpreting data as code is to use the Function constructor.
let plusOne = Function("n", "return n + 1;");
console.log(plusOne(4));
// -> 5



// The most widely used approach is called CommonJS modules.
// Node.js uses it and is the system used by most packages on NPM.
const ordinal = require("ordinal");
const {days, months} = require("date-names");

exports.formatDate = function(date, format) {
    return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
        if (tag == "YYYY") return date.getFullYear();
        if (tag == "M") return date.getMonth();
        if (tag == "MMMM") return months[date.getMonth()];
        if (tag == "D") return date.getDate();
        if (tag == "Do") return ordinal(date.getDate());
        if (tag == "dddd") return days[date.getDay()];
    });
};

const {formatDate} = require("./format-date");

console.log(formatDate(new Date(2019, 8, 13),
    "dddd the Do"));
// → Friday the 13th


// We can define require, in its most minimal form, like this:
require.cache = Object.create(null);

function require(name) {
    if (!(name in require.cache)) {
        let code = readFile(name);
        let module = {exports: {}};
        require.cache[name] = module;
        let wrapper = Function("require, exports, module", code);
        wrapper(require, module.exports, module);
    }
    return require.cache[name].exports;
}


const {parse} = require("ini");

console.log(parse("x = 10\ny = 20"));
// → {x: "10", y: "20"}


// ES stands for ECMAScript.
// The notation is now integrated into the language.
// Instead of calling a function to access a dependency, you use a special import keyword.

import ordinal from "ordinal";
import {days, months} from "date-names";

export function formatDate(date, format) { /* ... */ }


// The export keyword is used to export things.
// It may appear in front of a function, class, or binding definition (let, const, or var).

export default ["Winter", "Spring", "Summer", "Autumn"];

import {days as dayNames} from "date-names";

console.log(dayNames.length);
// → 7
