test("Function range between 5 and 10", () => {
    expect(myRange(5,10)).toEqual([5,6,7,8,9,10]);
});

test("Function myRange between 1 and 10", () => {
    expect(myRange(1,10)).toEqual([1,2,3,4,5,6,7,8,9,10]);
});

test("Function mySum for array [1..10]", () => {
    expect(mySum([1,2,3,4,5,6,7,8,9,10])).toEqual(55);
});

test("Function mySum with myRange(1..10)", () => {
    expect(mySum(myRange(1,10))).toEqual(55);
});

test("Function myRange with step=2", () => {
    expect(myRange(1,10,2)).toEqual([1,3,5,7,9]);
});

test("Function myRange with step=-2", () => {
   expect(myRange(5,1,-1)).toEqual([5,4,3,2,1]); 
});

test("Reverse array - new", () => {
    expect(reverseArray([1,2,3,4,5])).toEqual([5,4,3,2,1]);
});

test("Reverse array - same, even", () => {
    expect(reverseArrayInPlace([1,2,3,4,5,6])).toEqual([6,5,4,3,2,1]);
});

test("Reverse array - same, odd", () => {
    expect(reverseArrayInPlace([1,2,3,4,5])).toEqual([5,4,3,2,1]);
});

function myRange(start, end, step=1){
    result = [];
    let counter = 0;

    if (step>0){
        for (counter=start; counter<=end; counter+=step){
            result.push(counter);
        }
    } else {
        for (counter=start; counter>=end; counter+=step){
            result.push(counter);
        }
    }



    return result;
}

const mySum = function(numbers){
    result = 0;
    for (let entry of numbers){
        result += entry;
    }
    return result;
}

const reverseArray = (numbers) => {
    revertedNumbers = [];
    for (let i=numbers.length-1; i>=0; i--){
        revertedNumbers.push(numbers[i]);
    }
    return revertedNumbers;
}

function reverseArrayInPlace(numbers){
    
    let arrayLength = numbers.length;
    let stopPosition = 0;

    if(arrayLength %2 == 0) {
        //Is even
        stopPosition = arrayLength/2;
    } else {
        //Is odd
        stopPosition = (arrayLength-1)/2;
    }

    for (let i=0; i<stopPosition; i++){
            let temporary = numbers[arrayLength-i-1];
            numbers[arrayLength-i-1] = numbers[i];
            numbers[i] = temporary;
    }
    
    return numbers;
}