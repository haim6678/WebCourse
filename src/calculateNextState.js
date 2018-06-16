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
	console.log('hey calc');
    //if it's the first input to the program
    if (calculatorState === null || calculatorState === undefined) {
        // If the first input is a number
        if (isNumber(currentInput)) {
            newCalculatorState = {lastNumber: 0, currNumber: currentInput, operator: null};
            display = currentInput;
        } else if (isOperator(currentInput)) {
            newCalculatorState = {lastNumber: 0, currNumber: 0, operator: null};
            display = '';
        } else if (isEquals(currentInput)) {
            newCalculatorState = {lastNumber: 0, currNumber: 0, operator: null};
            display = '';
        }
    }

    //check if the input is a number
    else {
        const lastNumber = calculatorState.calculatorState.lastNumber;
        const currNumber = calculatorState.calculatorState.currNumber;
        const operator = calculatorState.calculatorState.operator;

        if (isNumber(currentInput)) {
            newCalculatorState = {
                lastNumber: isEquals(operator) ? 0 : lastNumber,
                currNumber: isEquals(operator) ? currentInput : parseInt(currNumber) * 10 + parseInt(currentInput),
                operator: operator
            };
            display = isEquals(operator) ? parseInt(currentInput) : parseInt(currNumber) * 10 + parseInt(currentInput);
        }

        //check if the input is operation
        else if (isOperator(currentInput)) {
            let res = operator ? isEquals(operator) ? lastNumber : calculate(calculatorState) : parseInt(currNumber);
            newCalculatorState = {lastNumber: res, currNumber: 0, operator: currentInput};
            display = res;
        }

        else if (isEquals(currentInput)) {
            const result = operator ? isEquals(operator) ? parseInt(currNumber) : calculate(calculatorState) : parseInt(currNumber);
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
    const lastNumber = parseInt(calculatorState.calculatorState.lastNumber);
    const currNumber = parseInt(calculatorState.calculatorState.currNumber);
    const operator = calculatorState.calculatorState.operator;

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
