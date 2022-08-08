function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(operator,num1,num2){
    let answer = 0;
    if (operator == "+") {
        answer = add(num1,num2);
    } else if (operator == "-") {
        answer = subtract(num1,num2);
    } else if (operator == "*") {
        answer = multiply(num1,num2);
    } else if (operator == "/") {
        answer = divide(num1,num2);
    } else {
        answer = "Error-OpF";
    }
    return answer;
}

const allButtons = document.querySelectorAll('.btn');
console.log(allButtons);
// addEventListener will not work if the first portion of its inputs is wrong (like 'onclick' instead of 'click')
allButtons.forEach(item => {item.addEventListener('click', calculator)}); 

let num1 = undefined;
let num2 = undefined;
let operator = undefined;
let numString = undefined;

const display = document.getElementById("display");
display.innerText = '0';

function resetAll() {
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    numString = undefined;
}

function btnChoice(e){
    let input = e.target.id;
    switch (input){
        // numbers
        case 'btn-0': x = 0; break;
        case 'btn-1': x = 1; break;
        case 'btn-2': x = 2; break;
        case 'btn-3': x = 3; break;
        case 'btn-4': x = 4; break;
        case 'btn-5': x = 5; break;
        case 'btn-6': x = 6; break;
        case 'btn-7': x = 7; break;
        case 'btn-8': x = 8; break;
        case 'btn-9': x = 9; break;
        // operators
        case 'btn-add':     x = '+'; break;
        case 'btn-sub':     x = '-'; break;
        case 'btn-mult':    x = '*'; break;
        case 'btn-div':     x = '/'; break;
        case 'btn-decimal': x = '.'; break;
        case 'btn-equal':   x = '='; break;
        case 'btn-delete':  x = 'Delete'; break;
        case 'btn-clear':   x = 'Clear'; break;
        default: x = 'switchE';
    }
    return x;
}

function calculator(e){
    let x = undefined;
    x = btnChoice(e);
    
    if (Number.isInteger(x) && x == 0 && numString == undefined) {
        // Spamming 0 at start: Do Nothing
    } else if (Number.isInteger(x) && numString == undefined) {
        // First non-zero number
        numString = `${x}`;
        display.innerText = numString;
    } else if (Number.isInteger(x) && numString != undefined) {
        // Any number (including 0) after first non-zero number
        numString += `${x}`;
        display.innerText = numString;
    } else {
        // Operation button pressed
        switch (x){
            case 'Delete':
                if (numString == undefined) {
                    // Do nothing
                } else if (numString.length > 1){
                    numString = numString.slice(0,-1);
                    display.innerText = numString;
                } else if (numString.length == 1) {
                    display.innerText = '0';
                    resetAll();
                } else if (numString.length == 0) {
                    display.innerText = 'Delete Error 1';
                } else {
                    display.innerText = 'Delete Error 2';
                }
                break;
            case 'Clear':
                resetAll();
                display.innerText = '0';
                break;
            case '.':
                // https://www.w3schools.com/jsref/jsref_regexp_test.asp
                if (/\./.test(numString)){
                    // Do nothing if decimal point detected
                } else if (numString == undefined){
                    // Decimal point is first button pressed
                    numString = '0.'
                    display.innerText = numString;
                } else {
                    // Add decimal point
                    numString += '.'
                    display.innerText = numString;
                }
                break;
            case '+':
                break;
            case '-':
                break;
            case '*':
                break;
            case '/':
                break;
            case '=':
                break;
        }
    }
    
    // else if (operator == undefined){
    //     // First time pressing an operator
    //     operator = x;
    //     num1 = parseFloat(numString);
    //     display.innerText = `${num1} & ${operator}`;
    // } else if (x == operator){
    //     // Selecting 
    //     display.innerText = `Same x: ${x} op: ${operator}`;
    // } else if (x != operator) {
    //     display.innerText = `Not Same x: ${x} op: ${operator}`;
    // }
}
