function add(a,b){
    return a+b;
}

function subtact(a,b){
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
        answer = subtact(num1,num2);
    } else if (operator == "*") {
        answer = multiply(num1,num2);
    } else if (operator == "/") {
        answer = divide(num1,num2);
    } else {
        answer = "Error";
    }
    return answer;
}

let num1 = 1;
let num2 = 2;
let operator = '-';

const allButtons = document.querySelectorAll('.btn');
console.log(allButtons);
// addEventListener will not work if the first portion of its inputs is wrong (like 'onclick' instead of 'click')
allButtons.forEach(item => {item.addEventListener('click', getValue)}); 

let output = '';

function getValue(e){
    let elementValue = e.target.dataset.value;
    console.log(elementValue);
    output += elementValue;
    display.innerHTML = output;
}

const display = document.getElementById("display");
