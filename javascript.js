function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}

function operate(operator,num1,num2){
    let answer = 0;
    if (operator === "+") {
        answer = add(num1,num2);
    } else if (operator === "-") {
        answer = subtract(num1,num2);
    } else if (operator === "*") {
        answer = multiply(num1,num2);
    } else if (operator === "/") {
        answer = divide(num1,num2);
    } else if (operator === "=") {
        answer = num1;
        console.log("Operator =");
    } else {
        answer = "Error-Operate";
    }
    return answer;
}

const allButtons = document.querySelectorAll('.btn');
console.log(allButtons);
// addEventListener will not work if the first portion of its inputs is wrong (like 'onclick' instead of 'click')
allButtons.forEach(item => {item.addEventListener('click', calculator)}); 

const display = document.getElementById("display");
display.innerText = 0;

let num1 = undefined;
let num2 = undefined;
let numString = '';
let op =  undefined;

function resetAll(){
    num1 = undefined;
    num2 = undefined;
    numString = '';
    op = undefined;
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
        case 'btn-sign':    x = 'Sign'; break;
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
    let x = btnChoice(e);
    
    if (x === 0 && numString === '' && op === undefined) {
    } else if (Number.isInteger(x)) {
        numString += `${x}`;
        display.innerText = numString;
        console.log(`extend string with ${x}`);
    } else {
        switch (x){
            case '.':
                if (/\./.test(numString)) {
                } else if (numString === '') {
                    numString = '0.';
                    display.innerText = numString;
                } else {
                    numString += '.';
                    display.innerText = numString;
                }
                break;
            case 'Sign':
                if (numString === '0' || (numString === '' && num1 === 0)) {
                    console.log('Sign: do nothing');
                } else if (/\-/.test(numString)){
                    numString = numString.slice(1);
                    display.innerText = numString;
                    console.log('Sign: sign remove');
                } else if (numString !== '') {
                    numString = '-' + numString;
                    display.innerText = numString;
                    console.log('Sign: sign add');
                } else {
                    // Sign change on previously calculated answer
                    num1 *= -1;
                    display.innerText = num1;
                    console.log('Sign: else');
                }
                break;
            case 'Delete':
                if (numString === '' || numString === '0') {
                    console.log('Delete: no number');
                } else if (/\-/.test(numString)) {
                    if (numString.length > 2){
                        numString = numString.slice(0,-1);
                        display.innerText = numString;
                        console.log('Delete (-): > 2 length');
                    } else {
                        numString = '';
                        display.innerText = '0';
                        console.log('Delete (-): <= 2 length');
                    }
                } else {
                    if (numString.length > 1) {
                        numString = numString.slice(0,-1);
                        display.innerText = numString;
                        console.log('Delete (+): > 1 length');
                    } else {
                        numString = '';
                        display.innerText = '0';
                        console.log('Delete (+): <= 1 length');
                    }
                }
                break;
            case 'Clear':
                resetAll();
                display.innerText = '0';
                console.log('Clear');
                break;
            case '=':
                if (op === undefined) {
                    console.log('= 01');
                    if (numString !== '') {
                        // nothing
                        console.log('no op yet');
                    }
                } else if (op !== undefined) {
                    console.log('= 02');
                    
                    if (numString === '') {
                        num2 = num1;
                        console.log('no numString');
                    } else {
                        num2 = parseFloat(numString);
                        console.log('yes numString');
                    }
                    console.log(`Before = op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                    num1 = operate(op,num1,num2);
                    display.innerText = num1;
                    
                    numString = `${num1}`;
                    op = undefined;
                    num1 = undefined;
                    num2 = undefined;
                    console.log(`After = op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                } else {
                    console.log('Error in = code');
                }
                break;
                
            // Determine desired functionality of Divide by Zero
            // place same error into = code (or a function that can work in both)
            // Limit the length of result calculated
            // Basic funtionality seems to work
            case '+':
            case '*':
            case '/':
            case '-':
                
                if (op === undefined) {
                    if (numString === '') {
                        numString = '0';
                    }
                    op = x;
                    console.log(`sign defined as ${op}`);
                    num1 = parseFloat(numString);
                    numString = '';
                } else {
                    console.log(`01 op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                    if (numString === '') {
                        num2 = num1;
                        console.log('A');
                    }
                    else {
                        num2 = parseFloat(numString);
                        console.log('B');
                    }
                    console.log(`02 op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                    num1 = operate(op,num1,num2);
                    console.log(`03 op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                    
                    // SHOULD be copied in = section ***** MAKE SURE TO UPDATE
                    // divide by zero error
                    // Catches dividing by zero and the edge case of num1 = NaN
                    if ((x === '/' && Number.isNaN(num1)) || Number.isNaN(num1) || num1 === Infinity) {
                        display.innerText = 'Divided by Zero';
                        console.log('Divide by zero');
                        num1 = 0;
                        num2 = 0;
                        resetAll();
                    } else {
                        console.log('Not divide by zero');
                        display.innerText = num1;
                        op = x; // Allows stringing together multiple operators without using "="
                    }
                    
                    numString = '';
                    console.log(`Next sign: ${op}`);
                    console.log(`04 op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                }
                break;
        }
    }
}

/*
                // op being undefined/defined determines whether the calculation goes through
                if (op === undefined) {
                    if (numString === '') {
                        numString = '0';
                        console.log('set numString to 0');
                    }
                    op = x;
                    num1 = parseFloat(numString);
                    
                    console.log(`Setting up 01 op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                    num2 = num1;
                    numString = '';
                    console.log(`Setting up 02 op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                } else {
                    if (num1 === undefined) {num1 = 0;}
                    if (num2 === undefined) {num2 = 0;}
                    if (numString === '') {
                        numString = '0';
                        console.log('set numString to 0');
                    }
                    op = x;
                    num2 = parseFloat(numString);
                    console.log(`Before Calc op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                    
                    num1 = operate(op,num1,num2);
                    display.innerText = num1;
                    numString = `${num1}`;
                    console.log(`After Calc op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                    
                    op = '';
                    numString = '';
                    console.log(`Reset Calc op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                }
                break;
*/