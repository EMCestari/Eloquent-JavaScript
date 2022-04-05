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

