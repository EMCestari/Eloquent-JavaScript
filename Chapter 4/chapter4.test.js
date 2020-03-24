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

test("Launcher", () => {
    expect(launcher()).toEqual(1);
});

test("DeepEqualLauncher", () => {
    expect(deepEqualLauncher()).toEqual(true);
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


function prepend(elem, list){
    let newList = {
        value: elem,
        rest: list
    }
    return newList;
}

function arrayToList(myArray){
    let list = {
        value: myArray[myArray.length-1],
        rest: null
    };

    for(let counter=myArray.length-2; counter>=0; counter--){
        list = prepend(myArray[counter],list); 
    }

    return list;
}

function nth(list, position){
    if (list == null){
        return undefined;
    }

    if(position == 1){
        return list.value;
    } else return nth(list.rest, position-1);
}

function listToArray(list){
    let newArray = [];
    let scrapeList = true;
    let position = 1;

    while(scrapeList){
        let currentValue = nth(list, position);
        if (currentValue != undefined) {
            newArray.push(currentValue);
            position++; 
        } else {
            scrapeList = false;
        }
    }

    return newArray;
}

function launcher(){
 
    let list = {
        value: 5,
        rest: {
            value: 4,
            rest: {
                value: 3,
                rest: {
                    value: 2,
                    rest: {
                        value: 1,
                        rest: null
                    }
                }
            }
        }
    };

    console.log(listToArray(list));

    return 1;
}


function deepEqual(firstValue, secondValue){


    if ( (typeof(firstValue) == "object") && (firstValue != null) && (typeof(secondValue) == "object") && (secondValue != null ) ){
        if (Object.keys(firstValue) == Object.keys(secondValue)){
            return false;
        } else {
            for (let prop in firstValue){
                if (!prop in secondValue || !deepEqual(firstValue[prop],secondValue[prop])){
                    return false;
                }
            }
            return true;
        }
    } else {
        return firstValue === secondValue;
    }
}

function deepEqualLauncher(){
    let obj1 = {
        value1: "Ciao",
        value2: 3,
        value3: 5
    };

    let obj2 = {
        value1: "Ciao",
        value2: 3,
        value3: 5
    }

    let obj3 = {
        value1: "iao",
        value2: 3,
        value3: 5
    }

    let obj4 = {
        value1: "Ciao",
        value2: 1,
        value3: 5
    }

    console.log(deepEqual(obj1,obj1)); //Expected: True
    console.log(deepEqual(obj1,obj2)); //Expected: True
    console.log(deepEqual(obj1,obj3)); //Expected: False
    console.log(deepEqual(obj1,obj4)); //Expected: False
    console.log(deepEqual(obj3,obj4)); //Expected: False
    console.log(deepEqual(null,obj1)); //Expected: False
    console.log(deepEqual(5,5)); //Expected: True
    console.log(deepEqual(4,5)); //Expected: False

    return true;
}