/* OBJECT-ORIENTED PROGRAMMING */
/*
Object-oriented programming is a set of techniques that use objects (and related concepts) as the central principle of
program organization.
 */

/* ENCAPSULATION */
/*
The core idea in object-oriented programming is to divide programs into smaller pieces and make each piece responsible
for managing its own state.

Different pieces of such a program interact with each other through interfaces, limited sets of functions or bindings
that provide useful functionality at a more abstract level, hiding their precise implementation.
Such program pieces are modeled using objects.
Their interface consists of a specific set of methods and properties.
Properties that are part of the interface are called public.
The others, which outside code should not be touching, are called private.
Separating interface from implementation is a great idea. It is usually called encapsulation.
*/

/* METHODS */
/* Methods are just properties that hold function values */
let rabbit = {};
rabbit.speak = function(line){
    console.log(`The rabbit says '${line}'`);
};

rabbit.speak("I'm alive.");
// -> The rabbit says 'I'm alive.'

/* The binding called "this" automatically points at the object that it was called on. */
function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my ears and whiskers, " + "how late it's getting!");
// The white rabbit says 'Oh my ears and whiskers, how late it's getting!'

hungryRabbit.speak("I could use a carrot right now.");
// -> The hungry rabbit says 'I could use a carrot right now.'

/*
You can think of this as an extra parameter that is passed in a different way.
If you want to pass it explicitly, you can use a function’s call method,
takes the this value as its first argument and treats further arguments as normal parameters.
*/
speak.call(hungryRabbit, "Burp!");
// → The hungry rabbit says 'Burp!'

/*
Arrow functions are different.
They do not bind their own this but can see the this binding of the scope around them.
 */
function normalize() {
    console.log(this.coords.map(n=>n/this.length));
}
normalize.call({coords: [0,2,3],length:5});
// -> [0,0.4,0.6]


/* PROTOTYPES */
/*
Most objects also have a prototype.
A prototype is another object that is used as a fallback source of properties.
When an object gets a request for a property that it does not have, its prototype will be searched for the property, then the prototype’s prototype, and so on.
The prototype of an empty object is the entity behind almost all objects, Object.prototype.
 */
let empty = {};
console.log(empty.toString);
// → function toString(){...}
console.log(empty.toString());
// → [object Object]

/*
Many objects don’t directly have Object.prototype as their prototype but instead have another object that provides a different set of default properties.
Functions derive from Function.prototype, and arrays derive from Array.prototype.
 */
console.log(Object.getPrototypeOf(Math.max) ==
    Function.prototype);
// → true
console.log(Object.getPrototypeOf([]) ==
    Array.prototype);
// → true

/* You can use Object.create to create an object with a specific prototype. */
let protoRabbit = {
    speak(line){
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEEE!");
// The killer rabbit says 'SKREEEEE!'



/* CLASSES */
/*
A class defines the shape of a type of object—what methods and properties it has.
Such an object is called an instance of the class.
Prototypes are useful for defining properties for which all instances of a class share the same value.
Properties that differ per instance, need to be stored directly in the objects themselves.
A CONSTRUCTOR FUNCTION ensures that an object, derived from the proper prototype, also has the properties that instances
of that class are supposed to have.
 */
function makeRabbit(type){
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
}

/*
If you put the keyword new in front of a function call, the function is treated as a constructor.
 */
function Rabbit(type){
    this.type = type;
}
Rabbit.prototype.speak = function(line){
    console.log(`The ${this.type} rabbit says '${line}'`);
};

let weirdRabbit = new Rabbit("weird");

/*
It’s important to understand the distinction between the way a prototype is associated with a constructor (through its prototype property) and the way objects have a prototype (which can be found with Object.getPrototypeOf).
The actual prototype of a constructor is Function.prototype since constructors are functions.
Its prototype property holds the prototype used for instances created through it.
 */
console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
// -> true
console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype);
// -> true

/* Class Notation */
/*
JavaScript classes are constructor functions with a prototype property.
Since 2015, there's a better notation for them.
 */
class Rabbit { // class keyword starts a "class" declaration
    // we can define a constructor and a set of methods in a single place
    constructor(type){ // the method named constructor is treated specially as it provides the actual constructor function
        this.type = type;
    }

    speak(line){
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");

/*
class can be used both in statements and expressions.
*/
let object = new class {getWord() {return "hello";}};
console.log(object.getWord());
// -> hello


/* OVERRIDING DERIVED PROPERTIES */
/*
A prototype lies behind an object like a backdrop,
where properties that aren't found in the object itself can be looked up.

Overriding is useful to express exceptional properties in instances of a more generic class
of objects. Nonexceptional objects take the standard values from their prototype.
 */
Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// -> small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// -> long, sharp, and bloody
console.log(blackRabbit.teeth);
// -> small
console.log(Rabbit.prototype.teeth);
// -> small

/* Overriding is frequently used with the toStringmethod of the object. */
console.log(Array.prototype.toString== Object.prototype.toString);
// -> false
console.log([1,2].toString());
// -> 1,2

console.log(Object.prototype.toString.call([1,2])); // This function doesn't know about arrays
// -> [object Array]


/* MAPS */
/*
A map (noun) is a data structure that associates values (the keys) with other values.
Objects can definitely be used for that - but it has to be done with care.
*/
let ages = {
    Boris: 39,
    Liang: 22,
    Julia: 62
};
console.log(`Julia is ${ages["Julia"]}`);
// → Julia is 62
console.log("Is Jack's age known?", "Jack" in ages);
// → Is Jack's age known? false
console.log("Is toString's age known?", "toString" in ages); // Remember that plain objects derive from Object.prototype, so it looks like the property is there.
// → Is toString's age known? true

// First solution: create an object with NO prototype:
console.log("toString" in Object.create(null));
// -> false

// Also, object property names MUST be strings.
// JavaScript comes with a class called Map that can be used to avoid these issues
let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Julia", 62);

console.log(`Julia is ${ages.get("Júlia")}`);
// → Julia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// → Is Jack's age known? false
console.log(ages.has("toString"));
// → false

// The methods set, get, and has are part of the interface of the Map object.

// Useful to know:
// - Object.keys returns only an object’s own keys, not those in the prototype.
// - You can use the hasOwnProperty method, which ignores the object’s prototype.
console.log({x:1}.hasOwnProperty("x"));
// -> true
console.log({x:1}.hasOwnProperty("toString"));
// -> false


/* POLYMORPHISM */
/*
When you call the String function (which converts a value to a string) on an object,
it will call the toString method on that object to try to create a meaningful string from it.
It can be useful to define your own toString method for your objects.
 */
Rabbit.prototype.toString = function() {
    return `a ${this.type} rabbit`;
};
console.log(String(blackRabbit));
// -> a black rabbit

/*
When a piece of code is written to work with objects that have a certain interface,
any kind of object that happens to support this interface can be plugged into the code,
and it will just work.

This technique is called polymorphism.
Polymorphic code can work with values of different shapes,
as long as they support the interface it expects.
*/


/* SYMBOLS */
/*
Symbols are values created with the Symbol function.
Unlike strings, newly created symbols are unique—you cannot create the same symbol twice.
 */
let sym = Symbol("name");
console.log(sym == Symbol("name"));
// -> false
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);
// -> 55

/*
Being both unique and usable as property names makes symbols suitable for defining interfaces that can peacefully
live alongside other properties, no matter what their names are.
 */
const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function(){
    return `${this.length} cm of blue yarn`;
};

console.log([1,2].toString());
// -> 1,2
console.log([1,2][toStringSymbol]());
// -> 2 cm of blue yarn

/*
It is possible to include symbol properties in object expressions and classes
by using square brackets around the property name. That causes the property name to be evaluated,
much like the square bracket property access notation,
which allows us to refer to a binding that holds the symbol.
 */
let stringObject = {
    [toStringSymbol]() {return "a jute rope";}
};
console.log(stringObject[toStringSymbol]());
// -> a jute rope


/* THE ITERATOR INTERFACE */
/*
The object given to a for/of loop is expected to be iterable.
This means it has a method named with the Symbol.iterator symbol
(a symbol value defined by the language, stored as a property of the Symbol function).


 */

let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// -> {value: "O", done: false} --- it returns the next result (in value property), plus a done property, which is true only if no additional values are present
console.log(okIterator.next());
// -> {value: "K", done: false}
console.log(okIterator.next());
// -> {value: undefined, done: true}


class Matrix{
    constructor(width, height, element = (x,y) => undefined) {
        this.width = width;
        this.height = height;
        this.content = [];

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.content[y * width + x] = element(x, y);
            }
        }
    }

    get(x,y){
        return this.content[y * this.width + x];
    }

    set(x,y,value) {
        this.content[y * this.width + x] = value;
    }
}

class MatrixIterator {
    constructor(matrix) {
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }

    next() {
        if (this.y == this.matrix.height) return {done: true}; // Checks whether the bottom of the matrix has been reached

        // First, create an object holding the current value...
        let value = {
            x: this.x,
            y: this,
            value: this.matrix.get(this.x, this.y)};

        // ... Then, update the position and move to next row if necessary
        if (this.x == this.matrix.width) {
            this.x = 0;
            this.y++;
        }

        return {value, done:false};
    }
}

// To make the Matrix class iterable:
Matrix.prototype[Symbol.iterator] = function() {
    return new MatrixIterator(this);
}

let matrix = new Matrix(2, 2, (x,y) => `value ${x},${y}`);
for (let {x,y, value} of matrix) {
    console.log(x,y,value);
}
// -> 0 0 value 0,0
// -> 1 0 value 1,0
// -> 0 1 value 0,1
// -> 1 1 value 1,1



/* GETTERS, SETTERS, AND STATICS */
/*
Properties that are accessed directly may hide a method call.
Such methods are called getters, and they are defined by writing get in front of the method name in an object expression or class declaration.
 */

let varyingSize = {
    get size(){
        return Math.floor(Math.random() * 100);
    }
};

console.log(varyingSize.size);
// -> 73
console.log(varyingSize.size);
// -> 49

/*
Similar approach can be applied to writing properties: setters.
 */
class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }

    get fahrenheit() {
        return this.celsius * 1.8 + 32;
    }

    set fahrenheit(value) {
        this.celsius = (value - 32) / 1.8;
    }

    static fromFahrenheit(value) { // methods that have static written before their name are stored on the constructor.
        return new Temperature((value - 32) / 1.8);
    }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// → 30



/* INHERITANCE */
/*
Inheritance is deriving some properties from an old prototype but adding new definitions for some properties.
The new class inherits properties and behavior from the old class.
 */

class SymmetricMatrix extends Matrix{ // extends means that the class is based on the superclass
    constructor(size, element = (x,y) => undefined) {
        super(size, size, (x,y) => {
            if (x < y) return element(y,x);
            else return element(x,y);
        });
    }

    set(x,y,value){
        super.set(x,y,value);
        if (x != y) {
            super.set(y,x,value);
        }
    }
}

let matrix = new SymmetricMatrix(5, (x,y) => `${x},${y}`);
console.log(matrix.get(2,3));
// -> 3,2

// instanceOf operator allows to know whether an object was derived from a specific class:
console.log(new SymmetricMatrix(2) instanceof SymmetricMatrix);
// -> true
console.log(new SymmetricMatrix(2) instanceof SymmetricMatrix);
// -> true
console.log(new Matrix(2,2) instanceof SymmetricMatrix);
// -> false
console.log([1] instanceof Array);
// -> true


/* ---- SUMMARY ---- */
/*
- Objects hold their own properties.
- They have prototypes, which are other objects.
- They’ll act as if they have properties they don’t have as long as their prototype has that property.
- Simple objects have Object.prototype as their prototype.

- Constructors are functions whose names usually start with a capital letter
- They can be used with the new operator to create new objects.
- The new object’s prototype will be the object found in the prototype property of the constructor.
- You can make good use of this by putting the properties that all values of a given type share into their prototype.
- There’s a class notation that provides a clear way to define a constructor and its prototype.

- You can define getters and setters to secretly call methods every time an object’s property is accessed.
- Static methods are methods stored in a class’s constructor, rather than its prototype.

- The instanceof operator can, given an object and a constructor, tell you whether that object is an instance of that constructor.

- One useful thing to do with objects is to specify an interface for them and tell everybody that they are supposed to talk to your object only through that interface.
- The rest of the details that make up your object are now encapsulated, hidden behind the interface.

- More than one type may implement the same interface.
- Code written to use an interface automatically knows how to work with any number of different objects that provide the interface.
- This is called polymorphism.

- When implementing multiple classes that differ in only some details, it can be helpful to write the new classes as subclasses of an existing class, inheriting part of its behavior.
 */