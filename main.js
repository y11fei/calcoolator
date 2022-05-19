//get da doms
const numberBts = document.querySelectorAll('[data-number]');
const operationBts = document.querySelectorAll('[data-operator');
const equalsBtn = document.querySelector('[data-equals');
const deleteBtn = document.querySelector('[data-delete');
const clearBtn = document.querySelector('[data-clear]');
const previousNum = document.querySelector('[data-previous]');
const currentNum = document.querySelector('[data-current]');

let firstOperand = 0;
let currentOperand = 0;
let currentOperation = null;
let result = 0;

//event listeners
window.addEventListener('keydown', keyboardFunc);

numberBts.forEach(button => {
    button.addEventListener('click', () => appendNum(button.textContent));
})

operationBts.forEach(button => {
    button.addEventListener('click', () => appendOperation(button.textContent));
})

equalsBtn.addEventListener('click', equalsFunc);

clearBtn.addEventListener('click', resetFunc)

deleteBtn.addEventListener('click', deleteNum)

//number 
function appendNum(num) {   
    if (currentNum.textContent == 0 || currentOperand === 0) {
        currentNum.textContent = num;
        currentOperand = num;
    }
    else { currentNum.textContent += num;
        currentOperand += num;
    }
    if (currentOperand > 999999999999) {
            currentOperand.toString()
            currentOperand = currentOperand.slice(0,12);
            currentNum.textContent = currentOperand;
        }

    console.log('current = ' + currentOperand);
    if (firstOperand != 0) {
        currentOperand = currentNum.textContent
        result =  solve(firstOperand, currentOperand);
        currentOperand = result;
        console.log('current/answer after solving = '+ currentOperand);
    }
}

//operator
function appendOperation(operation) {
    currentOperation = operation;
    firstOperand = currentOperand;
    previousNum.textContent = `${currentOperand}${operation}`
    currentNum.textContent = currentOperand;
    currentOperand = 0;
    console.log('previous/answer = ' + currentOperand);
    console.log('previous = ' + firstOperand + ' operation = ' + operation)
}

//evaluations
function solve(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    let answer =""
    if (num2 === 0 && currentOperation == "÷") {
        answer = "lmao";
    }
    else if (currentOperation == "+") {
        answer = add(num1, num2);   
    }
    else if (currentOperation == "-") {
        answer = substract(num1, num2)
    }
    else if (currentOperation == "×") {
        answer = multiply(num1, num2);
    } 
    else if (currentOperation = "÷") {
        answer = divide(num1, num2);
    }
    return answer;
}

//when "="
function equalsFunc() {
    result = currentOperand;
    if (currentOperation != null) {
    previousNum.textContent = `${firstOperand}${currentOperation}${currentNum.textContent}${"="}`;
    }
    previousNum.textContent = `${result}`
    console.log('result = ' + result);
    currentNum.textContent = result;
}

//reset
function resetFunc() {
    currentOperand = 0;
    firstOperand = 0;
    currentOperation = "";
    currentNum.textContent = "0";
    previousNum.textContent = "";
}

//delete digit
function deleteNum() {
    currentOperand.toString();
    currentOperand = currentOperand.slice(0, -1);
    currentNum.textContent = currentOperand;
}


//operations
function add(a, b) {
    return a + b;
}
function substract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

//add keyboard
function keyboardFunc(e) {
    if (e.key >= 0 && e.key <= 9) appendNum(e.key)
    if (e.key == "+" || e.key == "-") appendOperation(e.key)
    if (e.key == "*") appendOperation("×");
    if (e.key == "/") appendOperation("+")
    if (e.key == 'Backspace') deleteNum;
    if (e.key == 'Escape') resetFunc;
    if (e.key == "=" || e.key == 'Return') equalsFunc;
}