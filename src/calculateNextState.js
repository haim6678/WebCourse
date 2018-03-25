function calculateNext(prevState, currentInput) {
	return getNextDisplay(prevState, currentInput);
}

function checkIfOperation(str) {
	return /^[+-/*^]$/.test(str);
};

function getNextDisplay(prevState, currentInput) {
	//if it's the first input to the program
	if (prevState === null) {
		return {
			calculatorState: currentInput,
			display: checkIfOperation(currentInput) ? '' : currentInput,
			lastInput: currentInput
		};
	}

	//check if the input it's a number
	if (!isNaN(currentInput)) {
		//if the prev was also a number
		return {
			calculatorState: prevState.lastInput === '=' ? currentInput : prevState.state + currentInput,
			display: (checkIfOperation(prevState.lastInput) || prevState.lastInput === '=') ? currentInput : prevState.display + currentInput,
			lastInput: currentInput
		};
	}

	//check if the input is operation
	else if (checkIfOperation(currentInput)) {
		return {
			calculatorState: checkIfOperation(prevState.lastInput) ? prevState.state.substring(0, prevState.state.length - 1) + currentInput : prevState.state + currentInput,
			display: prevState.display,
			lastInput: currentInput
		};
	}

	else if (currentInput === '=') {
		let result = calcResult(prevState);
		return {calculatorState: result.toString(), display: result.toString(), lastInput: '='};
	}
	//fixme handle different input (wrong inputs)
};

//calculate the arithmetic result
function calcResult(prevState) {
	const array = prevState.calculatorState.split('');
	let lastNum = 0;
	let lastStrNum = '';
	let lastOperation = '';

	array.forEach((character, index) => {
		if (checkIfOperation(character) || index === array.length) {
			let temp = lastStrNum === '' ? 0 : parseInt(lastStrNum);
			lastStrNum = '';
			lastNum = lastOperation !== '' ? calcOperation(lastOperation, lastNum, temp) : temp;
			lastOperation = character;
		} else {
			lastStrNum += character;
		}
	});

	lastNum = lastOperation !== '' ? calcOperation(lastOperation, lastNum, parseInt(lastStrNum)) : parseInt(lastStrNum);
	return lastNum;
};

//perform the requested operator
function calcOperation(operation, firstNum, secNum) {
	switch (operation) {
		case '+':
			return firstNum + secNum;
			break;
		case '-':
			return firstNum - secNum;
			break;
		case '*':
			return firstNum * secNum;
			break;
		case '/':
			return firstNum / secNum;
			break;
		case '^':
			return Math.pow(firstNum, secNum);
			break;
	}
	return firstNum;
};

module.exports.calculateNextState = calculateNext;
