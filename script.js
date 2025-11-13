const resultDisplay = document.querySelector('input');
const  buttonsNumber = document.querySelectorAll('.number');
const  clearButton = document.querySelector('.clear');
const buttonsAction = document.querySelectorAll('.action');
const buttonResult = document.querySelector('.equals');
const buttonPlusMinus = document.querySelector('.plus-minus');
const buttonPersent = document.querySelector('.persent');
const arrayKeys =['1','2','3','4','5','6','7','8','9','0','-','+','*','/','.','Enter','Backspace'];
const operators = ['+', '-', '×', '÷', '*', '/', '.','+/-','%','Math.sqrt'];



clearButton.addEventListener('click', () => {
    resultDisplay.value = '0';
});

resultDisplay.addEventListener('keydown', (e) => {
    if (arrayKeys.includes(e.key)) {

        if (e.key === 'Enter') {
            e.preventDefault();
            calculateResultDisplay(resultDisplay);
            return;
        }

        if (e.key === 'Backspace') {
            return;
        }
        e.preventDefault();

        if (resultDisplay.value === '0' && e.key !== '.') {
            resultDisplay.value = e.key;
        } else {
            resultDisplay.value += e.key;
        }
    } else {
        e.preventDefault();
    }
});

buttonsNumber.forEach((button) => {
    button.addEventListener('click',  () => {
        if (resultDisplay.value === '0') {
            resultDisplay.value = button.textContent;

        } else {
            resultDisplay.value += button.textContent;

        }

    });
});

buttonsAction.forEach((button) => {
    button.addEventListener('click',  () => {
        const lastSymbolInResultDisplay = resultDisplay.value[resultDisplay.value.length - 1];
        if (lastSymbolIsOperator(resultDisplay.value)) {
            resultDisplay.value += button.textContent;
        } else if (operators.includes(lastSymbolInResultDisplay)) {
            resultDisplay.value = resultDisplay.value.slice(0,-1);
            resultDisplay.value += button.textContent;
        }
    });
});

buttonPlusMinus.addEventListener('click', () => {
    if (resultDisplay.value === '0') {
        resultDisplay.value = '-';
    } else if (resultDisplay.value.startsWith('-')) {
        resultDisplay.value = resultDisplay.value.slice(1);
    } else {
        resultDisplay.value = '-' + resultDisplay.value;
    }
})


buttonResult.addEventListener('click', () => {
        calculateResultDisplay(resultDisplay);
        if (resultDisplay.value === 'NaN') {
            resultDisplay.value = '0';
        }
});


function normalizeExpression(expression) {
    return expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/%/g, '/100');
}
    function calculateResultDisplay(resultDisplay) {
        const normalExpression = normalizeExpression(resultDisplay.value);
        return resultDisplay.value = new Function('return ' + normalExpression)();

    }

    function lastSymbolIsOperator(expression) {

        if (expression.length === 0) {
            return false;
        }
        const lastSymbol = expression[expression.length - 1];


        return !operators.includes(lastSymbol);
    }












