const calculatorButtons = [
    {
        name: 'delete',
        symbol: 'DEL',
        formula: false,
        type: 'key',
    },
    {
        name: 'clear',
        symbol: 'C',
        formula: false,
        type: 'key',
    },
    {
        name: 'percent',
        symbol: '%',
        formula: '/100',
        type: 'number',
    },
    {
        name: 'division',
        symbol: '÷',
        formula: '/',
        type: 'operator',
    },
    {
        name: '7',
        symbol: '7',
        formula: '7',
        type: 'number',
    },
    {
        name: '8',
        symbol: 8,
        formula: 8,
        type: 'number',
    },
    {
        name: '9',
        symbol: 9,
        formula: 9,
        type: 'number',
    },
    {
        name: 'multiplication',
        symbol: 'x',
        formula: '*',
        type: 'operator',
    },
    {
        name: '4',
        symbol: 4,
        formula: 4,
        type: 'number',
    },
    {
        name: '5',
        symbol: 5,
        formula: 5,
        type: 'number',
    },
    {
        name: '6',
        symbol: 6,
        formula: 6,
        type: 'number',
    },
    {
        name: 'addition',
        symbol: '+',
        formula: '+',
        type: 'operator',
    },
    {
        name: '1',
        symbol: 1,
        formula: 1,
        type: 'number',
    },
    {
        name: '2',
        symbol: 2,
        formula: 2,
        type: 'number',
    },
    {
        name: '3',
        symbol: 3,
        formula: 3,
        type: 'number',
    },
    {
        name: 'subtraction',
        symbol: '-',
        formula: '-',
        type: 'operator',
    },
    {
        name: '0',
        symbol: 0,
        formula: 0,
        type: 'number',
    },
    {
        name: 'comma',
        symbol: '.',
        formula: '.',
        type: 'number',
    },
    {
        name: 'calculate',
        symbol: '=',
        formula: '=',
        type: 'calculate',
    },
]

// number of buttons each row
buttonPerRow = 4;
// counter will be used to check if each row has 4 buttons
addedButtons = 0;

// data object will store operations and results
const data = {
    operation: [],
    result: [],
}

// loop each button
calculatorButtons.forEach( (button) => {

    // check if buttons equal to zero
    if(addedButtons % 4 == 0) {

        // insert a new row
        const inputContainer = document.querySelector('.input');
        inputContainer.innerHTML += `<div class="row"></div>`
    }

    // get row HTML DOM element
    const row = document.querySelector('.row:last-child');

    // create a new button on row element
    row.innerHTML +=
    `
    <button id="${button.name}">
        ${button.symbol}
    </button>
    `

    // increament number of buttons
    addedButtons++;
});


// button event listener
window.addEventListener('click', (e) => {
    
    // assign button id
    const target = e.target.id;
    
    // loop each button
    calculatorButtons.forEach( (button) => {

        // if target is equal to a button
        if(target === button.name) {

            // calculate button
            calculator(button);
        }
    })
});

// calculator function
const calculator = (button) => {

    // check if button type is number
    if(button.type === 'number') {

        // push number into arrays
        data.operation.push(button.symbol);
        data.result.push(button.formula);

    // check if button type is operator
    } else if(button.type === 'operator') {

        // push operators into array
        data.operation.push(button.symbol);
        data.result.push(button.formula);
    
    // check if button type is key
    } else if(button.type === 'key') {

        // check if button id is clear
        if(button.name === 'clear') {

            // empty array
            data.operation = [];
            data.result = [];

            // show output result as 0
            updateOutputResult(0);
        
        // if button id is delete
        } else if (button.name === 'delete') {

            // pop off last item on the array
            data.operation.pop();
            data.result.pop();

        }
    
    // check if button type is calculate
    } else if(button.type === 'calculate') {

        // join result array
        let joinResult = data.result.join('');
        let result;
        
        // to evaluate joinResult
        try {
            result = eval(joinResult);

        // catch error
        } catch (error) {

            // if error is instace of SyntaxError
            if (error instanceof SyntaxError) {

                // show Syntax Error
                result = 'Syntax Error!';
                updateOutputResult(result);
                return;
            }
        }

        // format result
        result = formatResult(result);

        // show output result
        updateOutputResult(result);

        // empty arrays
        data.operation = [];
        data.result = [];

        // push result into arrays
        data.operation.push(result);
        data.result.push(result);

        return;
    }

    // show output operation
    updateOutputOperation();
};

// show output operation function
const updateOutputOperation = () => {

    // assign HTML DOM element
    const operation = document.querySelector('.operation');

    // join data operation array and change inner HTML
    operation.innerHTML = data.operation.join('');
};

// show output result function
const updateOutputResult = (result) => {

    // assign HTML DOM element
    const value = document.querySelector('.value');

    // change inner HTML
    value.innerHTML = result;
}

// format result function
const formatResult = (result) => {

    // assign maximum number length;
    const maxOutputNumberLength = 10;

    // assign maximum number of decimal places
    const outputPrecision = 5;

    // check if result is greater than maximum number length
    if (digitCounter(result) > maxOutputNumberLength){

        // check if result is float
        if(isFloat(result)) {
            
            // convert string into integer
            const resultInt = parseInt(result); 

            // assign length of result
            const resultIntLength = digitCounter(resultInt);
            
            // if result length is greater than maximum number length
            if (resultIntLength > maxOutputNumberLength) {

                // return result with 5 digit precision
                return result.toPrecision(outputPrecision);

            // if result is less than the maximum number length
            } else {

                // declare number of digits after decimal point
                const numberOfDigistAfterPoint = maxOutputNumberLength - resultIntLength;

                // return result with fixed number of decimal point
                return result.toFixed(numberOfDigistAfterPoint)
            }

        // if result is not float return result with 5 digit precision
        } else {
            return result.toPrecision(outputPrecision);
        }

    // if result is less than maximum number length return result
    } else {
        return result;
    }
};  

// function to count number length
const digitCounter = (number) => {
    return number.toString().length;
};

// function to check if number is float
const isFloat = (number) => {
    return number % 1 != 0;
};