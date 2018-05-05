function isEquals(str) {
    return str === '=';
}

function isOperator(str) {
    return /^[+-/*^]$/.test(str);
}

function isNumber(str) {
    return !isNaN(str);
}

function calculateNextState(calculatorState, currentInput) {
    let newCalculatorState = {};
    let display = null;

    //if it's the first input to the program
    if (calculatorState === null) {
        // If the first input is a number
        if (isNumber(currentInput)) {
            newCalculatorState = {lastNumber: 0, currNumber: currentInput, operator: null};
            display = currentInput;
        } else if (isOperator(currentInput)) {
            newCalculatorState = {lastNumber: 0, currNumber: 0, operator: currentInput};
            display = '';
        } else if (isEquals(currentInput)) {
            newCalculatorState = {lastNumber: 0, currNumber: 0, operator: null};
            display = '';
        }
    }

    //check if the input is a number
    else {
        const lastNumber = calculatorState.lastNumber;
        const currNumber = calculatorState.currNumber;
        const operator = calculatorState.operator;

        if (isNumber(currentInput)) {
            newCalculatorState = {
                lastNumber: isEquals(operator) ? 0 : lastNumber,
                currNumber: isEquals(operator) ? currentInput : parseInt(currNumber) * 10 + parseInt(currentInput),
                operator: operator
            };
            display = isEquals(operator) ? currentInput : parseInt(currNumber) * 10 + parseInt(currentInput);
        }

        //check if the input is operation
        else if (isOperator(currentInput)) {
            let res = operator ? isEquals(operator) ? lastNumber : calculate(calculatorState) : currNumber;
            newCalculatorState = {lastNumber: res, currNumber: 0, operator: currentInput};
            display = currNumber;
        }

        else if (isEquals(currentInput)) {
            const result = operator ? calculate(calculatorState) : parseInt(currNumber);
            newCalculatorState = {lastNumber: result, currNumber: 0, operator: currentInput};
            display = result;
        }
    }

    return {
        calculatorState: newCalculatorState,
        display: display
    }
    //fixme handle different input (wrong inputs)
}

function calculate(calculatorState) {
    const lastNumber = parseInt(calculatorState.lastNumber);
    const currNumber = parseInt(calculatorState.currNumber);
    const operator = calculatorState.operator;

    switch (operator) {
        case '+':
            return lastNumber + currNumber;
        case '-':
            return lastNumber - currNumber;
        case '*':
            return lastNumber * currNumber;
        case '/':
            return lastNumber / currNumber;
        case '^':
            return Math.pow(lastNumber, currNumber);
        default:
            return null;
    }
}

module.exports = calculateNextState;
