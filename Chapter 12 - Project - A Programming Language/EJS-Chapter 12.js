/* 
 A parser is a program that reads a piece of text and produces a data structure that reflects 
 the structure of the program contained in that text.

 Syntax tree. If you imagine the objects as dots and the links between them as lines between those dots, it has a treelike shape.
 
 We define a function parseExpression, which takes a string as input and returns an object containing the data structure for the expression at the start of the string, 
 along with the part of the string left after parsing this expression.
*/

function parseExpression(program) {
    program = skipSpace(program);
    let match, expr;
    if (match = /^"([^"]*)"/.exec(program)){
        expr = {type: "value", value: match[1]};
    } else if (match = /^\d+\b/.exec(program)) {
        expr = {type: "value", value: Number(match[0])};
    } else if (match = /^[^\s(),#"]+/.exec(program)) {
        expr = {type: "word", name: match[0]};
    } else {
        throw new SyntaxError("Unexpected syntax: " + program);
    }

    return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string) {
    let first = string.search(/\S/);
    if (first == -1) return "";
    return string.slice(first);
}

/*
 ParseApply, which checks whether the expression is an application. If so, it parses a parenthesized list of arguments.
*/

function parseApply(expr, program) {
    program = skipSpace(program);

    if (program[0] != "(") {
        return {expr: expr, rest: program};
    }

    program = skipSpace(program.slice(1));
    expr = {type: "apply", operator: expr, args: []};
    while (program[0] != ")") {
        let arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ",") {
            program = skipSpace(program.slice(1));
        } else if (program[0] != ")") {
            throw new SyntaxError("Expected ',' or ')'");
        }
    }
    return parseApply(expr, program.slice(1));
}

/*
We wrap it in a convenient parse function that verifies that it has reached the end of the input string after 
parsing the expression (an Egg program is a single expression), and that gives us the program’s data structure.
*/
function parse(program){
    let {expr, rest} = parseExpression(program);
    if (skipSpace(rest).length > 0) {
        throw new SyntaxError("Unexpected text after program");
    }
    return expr;
}

console.log(parse("+(a,10)"));
// → {type: "apply",
//    operator: {type: "word", name: "+"},
//    args: [{type: "word", name: "a"},
//           {type: "value", value: 10}]}