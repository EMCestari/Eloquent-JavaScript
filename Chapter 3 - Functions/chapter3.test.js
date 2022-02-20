test("0 and 10 returns 0", () => {
    expect(min(10,0)).toBe(0);
});

test("0 and 0 returns Equals", () => {
    expect(min(0,0)).toBe("Equals");
});

test("100 and 10 returns 10", () => {
    expect(min(100,10)).toBe(10);
});

test("0 is even", () => {
    expect(isEven(0)).toBe(true);
});

test("1 is not even", () => {
    expect(isEven(1)).toBe(false);
});

test("2 is even", () => {
    expect(isEven(2)).toBe(true);
});

test("50 is even", () => {
    expect(isEven(50)).toBe(true);
});

test("75 is not even", () => {
    expect(isEven(75)).toBe(false);
});

test("abcd contains 0 Bs", () => {
    expect(countBs("abcd")).toBe(0);
});

test("aBcd contains 1 B", () => {
    expect(countBs("aBcd")).toBe(1);
});

test("aBcdeBfgB contains 3 Bs", () => {
    expect(countBs("aBcdeBfgB")).toBe(3);
});

test("aBxcdxeBfxgB contains 3 xs", () => {
    expect(countChar("aBxcdxeBfxgB","x")).toBe(3);
});

// FROM
const min = function(a,b){
    if(a<b){
        return a;
    } else if (a>b){
        return b;
    } else {
        return "Equals";
    }
}

// TO
const min2 = function(a,b){
    if (a == b){
        return "Equals";
    }
    if (a<b) return a
    else return b;
}

// TO
const min3 = function(a,b){
    if (a != b){
        return (a <= b) ? a : b;
    } else return "Equals";
}


function isEven(num){
    num = Math.abs(num); // Without this line, the solution only works with natural numbers, as with a negative number recursion will never end (e.g. if it starts from -1, it will never reach 0)

    if(num==0){
        return true;
    } else if (num==1){
        return false;
    } else {
        return isEven(num-2);
    }
}


const countBs = (sentence) => {
    numberOfBs = 0;
    for (let count=0; count<sentence.length; count++){
        if (sentence[count] == 'B'){
            numberOfBs += 1;
        }
    }
    return numberOfBs;
}

const countChar = (sentence, character) => {
    numberOfChars = 0;
    for (let count=0; count<sentence.length; count++){
        if (sentence[count] == character){
            numberOfChars += 1;
        }
    }
    return numberOfChars;
}

const optimizedCountBs = (sentence) => {
    return countChar(sentence, 'B');
}