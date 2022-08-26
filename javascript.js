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

let maxInputLength = 8;
let maxOutputLength = 8;

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
    } else {
        answer = "Error-Operate";
    }
    
    // Issues with too many trailing zeros or outputting too large a number
    // force round to a specific number of significant digits:
    // https://www.w3schools.com/jsref/jsref_toprecision.asp
    // eliminate trailing zeros (change '6.0000' to just '6'):
    // https://stackoverflow.com/questions/16471419/javascript-trim-toprecision-trailing-zeros
    // to detect an exponential:
    // https://regexr.com/
    // console.log(`Answer Before: ${answer} TypeOf: ${typeof answer}`);
    answer = answer.toPrecision(maxOutputLength);
    
    if (!/e/.test(answer)) {
        // console.log(`Before eliminating Zeros: answer: ${answer} num1: ${num1} num2: ${num2}`);
        answer *= 1;
        // console.log(`After  eliminating Zeros: answer: ${answer} num1: ${num1} num2: ${num2}`);
    } else {
        // console.log(`Exponential: answer: ${answer} num1: ${num1} num2: ${num2}`);
    }
    // console.log(`Answer After:  ${answer} TypeOf: ${typeof answer}`);
    return answer;
}


// Detecting keyboard buttons in javascript
// https://stackoverflow.com/questions/16089421/how-do-i-detect-keypresses-in-javascript
// https://www.techcoil.com/blog/how-to-detect-keyboard-presses-made-to-the-browser-screen-with-javascript/
// https://howtodoinjava.com/jquery/jquery-difference-between-keypress-and-keydown-events/

const allButtons = document.querySelectorAll('.btn');
allButtons.forEach(item => {item.addEventListener('click', calculator)}); 

document.addEventListener('keydown', calculator);

// ISSUE: Entering browser numbers and operators and then executing them with the numpad
// 'Enter' key seems to do another redundant execution of the 'calculator' function but
// with not values for 'e.target.id' or 'e.key' thus executing the 'switchE' case

function btnChoice(e){
    let input;
    let shiftPressed;
    // console.log(`**********`);
    // console.log(`e.target.id: ${e.target.id}`);
    // console.log(`e.key: ${e.key}`);
    // console.log(`e.shiftKey: ${e.shiftKey}`);
    if (e.target.id) {
        input = e.target.id;
        // console.log(`Browser Button: ${input}`);
    }
    // Keyboard input needs to be in its own if statement or button inputs always overwrite
    if (e.key) {
        input = e.key;
        shiftPressed = e.shiftKey;
        // console.log(`Numpad  Button: ${input}`);
        // If e.target.id is not reset WITHIN THIS CODE then
        // the 'btnChoice' function executes a second time and you can't go between
        // browser and keyboard input without bugy behavior (can't reuse calculated answers, etc.)
        e.target.id = undefined;
    }
    
    switch (input){
        // numbers
        case 'btn-0':       case '0':           x = 0;          break;
        case 'btn-1':       case '1':           x = 1;          break;
        case 'btn-2':       case '2':           x = 2;          break;
        case 'btn-3':       case '3':           x = 3;          break;
        case 'btn-4':       case '4':           x = 4;          break;
        case 'btn-5':       case '5':           x = 5;          break;
        case 'btn-6':       case '6':           x = 6;          break;
        case 'btn-7':       case '7':           x = 7;          break;
        case 'btn-8':       case '8':           x = 8;          break;
        case 'btn-9':       case '9':           x = 9;          break;
        // operators
        case 'btn-sign':    case shiftPressed && '-':       x = 'Sign';     break;
        case 'btn-add':     case '+':           x = '+';        break;
        case 'btn-sub':     case '-':           x = '-';        break;
        case 'btn-mult':    case '*':           x = '*';        break;
        case 'btn-div':     case '/':           x = '/';        break;
        case 'btn-decimal': case '.':           x = '.';        break;
        case 'btn-equal':   case 'Enter':       x = '=';        break;
        case 'btn-delete':  case 'Delete':
        case 'Backspace':                       x = 'Delete';   break;
        case 'btn-clear':   case 'Backspace':   x = 'Clear';    break;
        // invalid cases
        default:
            x = 'switchE';
            // console.log('switch invalid');
    }
    // console.log(`Input: ${input}`);
    return x;
}

const display = document.getElementById("display");
display.innerText = 0;

let num1 = 0;
let num2 = 0;
let numString = '';
let op =  undefined;

function resetAll(){
    num1 = 0;
    num2 = 0;
    numString = '';
    op = undefined;
}

// how to display unique characters
// https://www.fileformat.info/info/unicode/char/23fb/index.htm
function divZeroError() {
    display.innerText = '2 \u221E & B ' + `\u23FB D`;
}

function calculator(e){
    let x;
    x = btnChoice(e);
    // console.log(`Before ALL op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
    // console.log(`After  x: ${x}`);
    if (x === 0 && numString === '' && op === undefined) {
        // Prevents spamming 0's at the beginning
    } else if (Number.isInteger(x)) {
        if (numString.length < maxInputLength) {
            numString += `${x}`;
            display.innerText = numString;
            //console.log(`extend string with ${x}`);            
        }
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
                // console.log(`Before Sign Change op: ${op} num1: ${num1} num2: ${num2} numString: ${numString} typeOf numstring: ${typeof numString}`);
                // Make sure it is a string or errors occur
                numString = numString.toString();
                if (numString === '0' || (numString === '' && num1 === 0)) {
                    // console.log('Sign: do nothing');
                } else if (/\-/.test(numString)){
                    numString = numString.slice(1);
                    display.innerText = numString;
                    // console.log('Sign: sign remove');
                } else if (numString !== '') {
                    numString = '-' + numString;
                    display.innerText = numString;
                    // console.log('Sign: sign add');
                } else if (num1 != 0) {
                    // Sign change on previously calculated answer
                    numString = num1 * -1;
                    numString = numString.toString();
                    display.innerText = numString;
                    // console.log('Sign: use previous answer and change sign');
                } else {
                    // console.log('Sign: else');
                }
                // console.log(`After Sign Change op: ${op} num1: ${num1} num2: ${num2} numString: ${numString} typeOf numstring: ${typeof numString}`);
                break;
            case 'Delete':
                // console.log(`Before Delete op: ${op} num1: ${num1} num2: ${num2} numString: ${numString} typeOf numstring: ${typeof numString}`);
                if (numString === '' || numString === '0') {
                    // console.log('Delete: no number');
                } else if(/e/.test(numString)) {
                    // If there is an exponent in numstring do nothing
                   /*
                    if (/e/.test(num1)) {
                        console.log('Detected exponent in num1');
                    }
                    console.log('Exponential detected');
                    */
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
                // console.log(`After Delete op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                break;
            case 'Clear':
                resetAll();
                display.innerText = '0';
                //console.log('Clear');
                break;
            case '=':
                if (op === undefined) {
                    // console.log('= 01');
                    if (numString !== '') {
                        // nothing
                        // console.log('no op yet');
                    }
                } else if (op !== undefined) {
                    // console.log('= 02');
                    
                    if (numString === '') {
                        num2 = num1;
                        // console.log('no numString');
                    } else {
                        num2 = parseFloat(numString);
                        // console.log('yes numString');
                    }
                    
                    // console.log(`Before = op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                    
                    num1 = operate(op,num1,num2);
                    
                    // Catches divide by zero
                    if (op === '/' && num2 === 0) {
                        divZeroError();
                        numString = '';
                        // console.log('Divide by zero after = operation');
                    } else {
                        display.innerText = num1;
                        numString = `${num1}`;
                        // console.log('Normal solution after = operation');
                        // Edge case where you can get a leading 0
                        if (numString === '0') {
                            numString = '';
                        }
                    }
                    
                    op = undefined;
                    // numString='';
                    // console.log(`After = op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                } else {
                    // console.log('Error in = code');
                }
                break;

            // Limit the length of result calculated
            case '+':
            case '*':
            case '/':
            case '-':
                
                if (op === undefined) {
                    if (numString === '') {
                        numString = '0';
                        // console.log('Numstring set to 0');
                    }
                    op = x;
                    // console.log(`sign defined as ${op}`);
                    num1 = parseFloat(numString);
                    numString = '';
                } else {
                    // console.log(`01 op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                    if (numString === '') {
                        num2 = num1;
                        // console.log('A');
                    }
                    else {
                        num2 = parseFloat(numString);
                        // console.log('B');
                    }
                    // console.log(`02 op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                    num1 = operate(op,num1,num2);
                    // console.log(`03 op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);

                    // Catches dividing by zero and the edge case of num1 = NaN
                    if (x === '/' && num2 === 0) {
                        divZeroError();
                        // console.log('Divide by zero');
                        num1 = 0;
                        num2 = 0;
                        resetAll();
                    } else {
                        // console.log('Not divide by zero');
                        display.innerText = num1;
                        op = x; // Allows stringing together multiple operators without using "="
                    }
                    
                    numString = '';
                    // console.log(`Next sign: ${op}`);
                    // console.log(`04 op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
                }
                break;
            default:
                // console.log('Calculator did nothing');
        }
    }
    // console.log(`After ALL op: ${op} num1: ${num1} num2: ${num2} numString: ${numString}`);
}


