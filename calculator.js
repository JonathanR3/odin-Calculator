let buttons = document.querySelectorAll(".key");
let display = document.querySelector(".display");
let result = 0;
let numbers = [];
let operators = [];
let operatorFlag = false;

display.addEventListener("wheel", (event) => {
    event.preventDefault();
    display.scrollLeft += event.deltaY;
})

buttons.forEach(button => {
    button.addEventListener("click", () => {
    if (display.innerHTML === "00000000") {
        display.innerHTML = '';
    }
    if (button.innerHTML === "C") {
        clear();
    }
    else if (button.innerHTML === "=") {
        if (numbers.length >= 2 && operators.length >= 1 && numbers.length-1 == operators.length) {
            equals();
        }
    }
    else if (!isNaN(parseFloat(button.innerHTML))) {
        if (operatorFlag || numbers.length === 0 || (result != 0 && numbers.length == 1)) {
            numbers.push(button.innerHTML);
            operatorFlag = false;
        }
        else {
            numbers[numbers.length-1] += button.innerHTML;
        }
        display.innerHTML = display.innerHTML + button.innerHTML;
        display.scrollLeft = display.scrollWidth;
    }
    else {
        operatorFlag = true;
        operators.push(button.innerHTML);
        display.innerHTML = display.innerHTML + button.innerHTML;
        display.scrollLeft = display.scrollWidth;
    }
});
});

function operate() {
    for (let i = 0; i < operators.length; i++) {
        let operation = operators[i];
        let num1 = numbers[i];
        let num2 = numbers[i+1];
        console.log(num1);
        if (operation === "/") {
            result = num1 / num2;
        }
        else if (operation === "x") {
            result = num1 * num2;
        }
        else if (operation === "-") {
            result = num1 - num2;
        }
        else if (operation === "+") {
            result = parseFloat(num1) + parseFloat(num2);
        }
        numbers[i+1] = result;
    }
}

function clear() {
    result = 0;
    numbers = [];
    operators = [];
    display.innerHTML = '';
}

function equals() {
    display.scrollLeft = 0;
    operate();
    numbers = [result];
    operators = [];
    display.innerHTML = result;
}