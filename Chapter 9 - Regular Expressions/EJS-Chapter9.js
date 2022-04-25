/* CREATING A REGULAR EXPRESSION */

// A regular expression is a type of object.
// It can be constructed with:
// 1) RegExp constructor
// 2) Written as a literal value by enclosing a pattern in forward slash (/) characters

let re1 = new RegExp("abc");
let re2 = /abc/;

// When using the RegExp constructor, the pattern is written as a normal string,
// so the usual rules apply for backslashes.

// With the second notation we need to put a backslash before any forward
// slash that we want to be part of the pattern
let eighteenPlus = /eighteen\+/;


/* TESTING FOR MATCHES */

// Regular expressions come with methods.
// The simplest one is test. If you pass it a string, it will return a Boolean,
// telling you whether the string contains a match of the pattern in the expression.
console.log(/abc/.test("abcde"));
// -> true
console.log(/abc/.test("abxde"));
// -> false

// Note: the sequence can happen anywhere in the string, not necessarily at the beginning:
console.log(/abc/.test("edabc123"));
// -> true



/* SETS OF CHARACTERS */

// Putting a set of characters between square brackets makes that part of the expression
// match any of the characters between the brackets.
console.log(/[0123456789]/.test("in 1992"));
// -> true

// Within square brackets, a hyphen (-) between two characters can be used to indicate
// a range of characters.
console.log(/[0-9]/.test("in 1992"));
// -> true

// A number of common character groups have their own built-in shortcuts:
// \d -> Any digit character (it means the same thing as [0-9])
// \w -> An alphanumeric character (“word character”)
// \s -> Any whitespace character (space, tab, newline, and similar)
// \D -> A character that is not a digit
// \W -> A nonalphanumeric character
// \S -> A nonwhitespace character
//  . -> Any character except for newline

let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/; // Correct, but awful
console.log(dateTime.test("01-30-2003 15:20"));
// -> true
console.log(dateTime.test("30-jan-2003 15:20"));
// -> false


// To invert a set of characters (match any character except the ones in the set)
// you can write a caret (^) character after the opening square bracket.
let notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));
// -> false
console.log(notBinary.test("1100100010200110"));
// -> true


/* REPEATING PARTS OF A PATTERN */

// When you put a plus sign (+) after something in a regular expression,
// it indicates that the element may be repeated more than once.

console.log(/'\d+'/.test("'123'"));
// -> true
console.log(/'\d+'/.test("''"));
// -> false

// The star (*) has a similar meaning but also allows the pattern to match zero times.
console.log(/'\d*'/.test("'123'"));
// -> true
console.log(/'\d*'/.test("''"));
// -> true

// A question mark makes a part of a pattern optional, meaning it may occur zero times or one time
let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));
// → true
console.log(neighbor.test("neighbor"));
// → true

// To indicate that a pattern should occur a precise number of times, use braces
let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("1-30-2003 8:45"));
// → true


/* GROUPING SUBEXPRESSIONS */

// To use an operator like * or + on more than one element at a time, you have to use parentheses.
// A part of a regular expression that is enclosed in parentheses counts as a single element
// as far as the operators following it are concerned.
let cartoonCrying = /boo+(hoo+)+/i; // i at the end makes the regex case insensitive
console.log(cartoonCrying.test("Boohooooooohoohooooooo"));
// -> true
console.log(cartoonCrying.test("booooooooohooooooohoohooooooo"));
// -> true
console.log(cartoonCrying.test("booaoohooooooohoohooooooo"));
// -> false
console.log(cartoonCrying.test("booaoohoooooooboohooCooooooo"));
// -> true


/* MATCHES AND GROUPS */

// Regular expressions also have an exec (execute) method that will return null
// if no match was found and return an object with information about the match otherwise.
let match = /\d+/.exec("one two 100");
console.log(match);
// -> ["100"]
console.log(match.index); // object returned from exec has an index property that tells us where in the string the successful match begins
// -> 8

// String values have a match method that behaves similarly:
console.log("one two 100".match(/\d+/));
// -> ["100"]


// When the regular expression contains subexpressions grouped with parentheses,
// the text that matched those groups will also show up in the array.
// The whole match is always the first element.
// The next element is the part matched by the first group, then the second group, and so on.
let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));
// -> ["'hello'","hello"]


// When a group does not end up being matched at all its position in the output array will hold undefined.
// Similarly, when a group is matched multiple times, only the last match ends up in the array.
console.log(/bad(ly)?/.exec("bad"));
// → ["bad", undefined]
console.log(/(\d)+/.exec("123"));
// → ["123", "3"]


/* THE DATE CLASS */

// JavaScript has a standard class for representing dates—or, rather, points in time.
// It is called Date.
console.log(new Date());
// -> print current system time

console.log(new Date(2009, 11, 9));
// → Wed Dec 09 2009 00:00:00 GMT+0100 (CET)
console.log(new Date(2009, 11, 9, 12, 59, 59, 999));
// → Wed Dec 09 2009 12:59:59 GMT+0100 (CET)

// PAY ATTENTION: JavaScript uses a convention where month numbers start at zero

// Timestamps are stored as the number of milliseconds since the start of 1970, in the UTC time zone.
console.log(new Date(2013, 11, 19).getTime());
// → 1387407600000
console.log(new Date(1387407600000)); // If you give the Date constructor a single argument, it is treated as such a millisecond count.
// → Thu Dec 19 2013 00:00:00 GMT+0100 (CET)


function getDate(string) {
    let [_, month, day, year] =
        /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
    return new Date(year, month - 1, day);
}
console.log(getDate("1-30-2003"));
// → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)



/* WORD AND STRING BOUNDARIES */

// If we want to enforce that the match must span the whole string, we can add the markers ^ and $.

// If, on the other hand, we just want to make sure the date starts and ends on a word boundary, we can use the marker \b
console.log(/cat/.test("concatenate"));
// → true
console.log(/\bcat\b/.test("concatenate"));
// → false
console.log(/\bcon/.test("concatenate"));
// → true
console.log(/\bcon\b/.test("concatenate"));
// → false
console.log(/\bate/.test("concatenate"));
// → false
console.log(/ate\b/.test("concatenate"));
// → true


/* CHOICE PATTERNS */

// The pipe character (|) denotes a choice between the pattern to its left and the pattern to its right.
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));
// → true
console.log(animalCount.test("15 pigchickens"));
// → false



/* THE REPLACE METHOD */

// String values have a replace method that can be used to replace part of the string with another string
console.log("papa".replace("p","m"));
// -> mapa
console.log("Borobudur".replace(/[ou]/,"a")); // only final instance replaced
// -> Barobudur
console.log("Borobudur".replace(/[ou]/g,"a")); // with "g", ALL the instances are replaced
// -> Barabadar

// Real power of using regular expressions with replace comes from the fact that
// we can refer to matched groups in the replacement string.
console.log(
    "Liskov, Barbara\nMcCarthy, John\nWadler, Philip"
        .replace(/(\w+), (\w+)/g, "$2 $1")); // $1 and $2 refer to parenthesized groups in pattern
// -> Barbara Liskov
// John McCarthy
// Philip Wadler

// It is possible to pass a function—rather than a string—as the second argument to replace.
let s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g,
    str => str.toUpperCase()));
// -> the CIA and FBI

let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
    amount = Number(amount) - 1;
    if (amount == 1) { // only one left, remove the 's'
        unit = unit.slice(0, unit.length - 1);
    } else if (amount == 0) {
        amount = "no";
    }
    return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// -> no lemon, 1 cabbage, and 100 eggs

/* GREED */

// It is possible to use replace to write a function that removes all comments from a piece of JavaScript code.
function stripComments(code) {
    return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3"));
// -> 1 + 3
console.log(stripComments("x = 10;// ten!"));
// -> x = 10;
console.log(stripComments("1 /* a */+/* b */ 1"));
// -> 1 1

// The repetition operators (+, *, ?, and {}) are greedy, meaning they match as much as they can and backtrack
// from there. If you put a question mark after them (+?, *?, ??, {}?), they become nongreedy and start by
// matching as little as possible, matching more only when the remaining pattern does not fit the smaller match.

function stripComments(code) {
    return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments("1 /* a */+/* b */ 1"));
// -> 1 + 1



/* DINAMICALLY CREATING REGEXP OBJECTS */

let name = "harry";
let text = "Harry is a suspicious character.";
let regexp = new RegExp("\\b(" + name + ")\\b","gi");
console.log(text.replace(regexp,"_$1_"));
// -> _Harry_ is a suspicious character.


let name2 = "dea+hl[]rd";
let text2 = "This dea+hl[]rd guy is super annoying.";
let escaped = name2.replace(/[\\[-+*?(){|^$]/g,"\\$&");
let regexp2 = new RegExp("\\b" + escaped + "\\b","gi");
console.log(text.replace(regexp2,"_$&_"));
// -> This _dea+hl[]rd_guy is super annoying.


/* THE SEARCH METHOD */

// There is another method, search, that does expect a regular expression:
console.log("   word".search(/\S/));
// → 2
console.log("     ".search(/\S/));
// → -1

// No way to indicate that the match should start at a given offset


/* THE LAST INDEX PROPERTY */

// The exec method similarly does not provide a convenient way to start searching from a given position in the string.
// But it does provide an inconvenient way.

let pattern = /y/g;
pattern.lastIndex = 3;
let match = pattern.exec("xyzzy");
console.log(match.index);
// -> 4
console.log(pattern.lastIndex);
// -> 5

// Sticky option: match will succeed only if it starts directly at lastIndex
// Global option: match will search ahead for a position where a match can start
let global = /abc/g;
console.log(gobal.exec("xyz abc"));
// -> ["abc"]
let sticky = /abc/y;
console.log(sticky.exec("xyz abc"));
// -> null


let digit = /\d/g;
console.log(digit.exec("here it is: 1"));
// -> ["1"]
console.log(digit.exec("and now: 1"));
// -> null


console.log("Banana".match(/an/g));
// -> ["an", "an"]


/* LOOPING OVER MATCHES */

// We can scan through all occurrences of a pattern ina string, by using lastIndex and exec.
let input = "A string with 3 numbers in it... 42 and 88.";
let number = /\b\d+\b/g;
let match;
while (match = number.exec(input)){
    console.log("Found", match[0], "at", match.index);
}
// -> Found 3 at 14
// Found 42 at 33
// Found 88 at 40


/* PARSING AN INI FILE */

function parseINI(string) {
    // Start with an object to hold the top-level fields
    let result = {};
    let section = result;
    string.split(/\r?\n/).forEach(line => {
        // Since the format has to be processed line by line, splitting up the file into separate lines is a good start
        // Some OSs use not just a newline character but a carriage return character followed by a newline ("\r\n").
        let match;
        if (match = line.match(/^(\w+)=(.*)$/)) {
            section[match[1]] = match[2];
        } else if (match = line.match(/^\[(.*)\]$/)) {
            section = result[match[1]] = {};
        } else if (!/^\s*(;.*)?$/.test(line)) {
            // If a line is not a section header or a property, the function checks whether
            // it is a comment or an empty line using the expression /^\s*(;.*)?$/.
            throw new Error("Line '" + line + "' is not valid.");
        }
    });
    return result;
}

console.log(parseINI(`
name=Vasilis
[address]
city=Tessaloniki`));
// → {name: "Vasilis", address: {city: "Tessaloniki"}}


/* INTERNATIONAL CHARACTERS */

// it is possible to use \p in a regular expression (that must have the Unicode option enabled) to match all
// characters to which the Unicode standard assigns a given property.
console.log(/\p{Script=Greek}/u.test(""));
// → true
console.log(/\p{Script=Arabic}/u.test(""));
// → false
console.log(/\p{Alphabetic}/u.test(""));
// → true
console.log(/\p{Alphabetic}/u.test("!"));
// → false