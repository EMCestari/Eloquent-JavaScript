/*
Retry
- You have a function primitiveMultiply: in 20 percent of cases multiplies two numbers and in the other 80 percent
of cases raises an exception of type MultiplicatorUnitFailure
- Write a function that wraps this clunky function and just keeps trying until a call succeeds,
after which it returns the result.

Make sure you handle only the exceptions you are trying to handle.
 */

const primitiveMultiply = (numberOne, numberTwo) => {
    let randomPercentage = Math.floor(Math.random() * 100) + 1;
    if (randomPercentage <= 20) { return numberOne * numberTwo }
    else throw new Error("MultiplicatorUnitFailure");
};

const retry = () => {
    let result = undefined;
    while (result === undefined){
        try{
            result = primitiveMultiply(2,4);
        } catch(error){
            if(error === "MultiplicatorUnitFailure");
            continue;
        }
    }
    return result;
}