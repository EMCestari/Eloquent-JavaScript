test("print 10 numbers", () => {
    expect(printNumbers(10)).toBe("1\n2\n3\n4\n5\n6\n7\n8\n9\n10");
});
test("print 15 numbers with Fizz", () => {
    expect(printNumbersFizz(15)).toBe("1\n2\nFizz\n4\n5\nFizz\n7\n8\nFizz\n10\n11\nFizz\n13\n14\nFizz")
});
test("print 15 numbers with Buzz", () => {
    expect(printNumbersBuzz(15)).toBe("1\n2\n3\n4\nBuzz\n6\n7\n8\n9\nBuzz\n11\n12\n13\n14\nBuzz")
});
test("print 15 numbers with FizzBuzz", () => {
    expect(printNumbersFizzBuzz(15)).toBe("1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz")
});

function printNumbers(len){
    var fizzbuzzResult = "";
    for(currentNum=1; currentNum<=len; currentNum++){
        fizzbuzzResult += currentNum + "\n";
    }
    return fizzbuzzResult.trim();
}

function printNumbersFizz(len){
    var fizzbuzzResult = "";
    for(currentNum=1; currentNum<=len; currentNum++){
        if (currentNum %3 == 0){
            fizzbuzzResult += "Fizz";
        } else {fizzbuzzResult += currentNum;}
        fizzbuzzResult += "\n";
    }
    return fizzbuzzResult.trim();
}

function printNumbersBuzz(len){
    var fizzbuzzResult = "";
    for(currentNum=1; currentNum<=len; currentNum++){
        if (currentNum %5 == 0){
            fizzbuzzResult += "Buzz";
        } else {fizzbuzzResult += currentNum;}
        fizzbuzzResult += "\n";
    }
    return fizzbuzzResult.trim();
}

function printNumbersFizzBuzz(len){
    let fizzbuzzResult = "";
    for (currentNum=1; currentNum<=len; currentNum++){
        if(currentNum %15 == 0){
            fizzbuzzResult += "FizzBuzz\n";
        } else if(currentNum %5 == 0){
            fizzbuzzResult += "Buzz\n";
        } else if (currentNum %3 ==0){
            fizzbuzzResult += "Fizz\n";
        } else {
            fizzbuzzResult += currentNum+"\n";
        }
    }
}