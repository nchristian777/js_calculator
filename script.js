let currentTotal = 0;
let newInput = true;
let currentAction = false;
let previousTotal = false;
let initialValue = true;
let currentInput = 0;
let screen = null;

function checkForDecimal(value) {
  if (currentInput.match(/\./) && value === '.') {
    return true;
  }
  return false;
}

function plusMinus() {
  if (currentInput > 0) {
    screen.innerHTML = 0 - currentInput;
  } else {
    screen.innerHTML = currentInput - (currentInput * 2);
  }
  currentInput = screen.innerHTML;
}

function clear() {
  screen.innerHTML = '';
  currentTotal = 0;
  newInput = true;
  currentAction = false;
  previousTotal = false;
  initialValue = true;
}

function getPrecent() {
  screen.innerHTML = currentInput / 100;
}

function add() {
  if (!newInput) {
    currentTotal += Number(currentInput);
    currentAction = 'addButton';
    newInput = true;
    initialValue = false;
  }
}

function subtraction() {
  if (initialValue) {
    currentTotal = currentInput;
    currentAction = 'subtractButton';
  } else if (!newInput) {
    currentTotal -= Number(currentInput);
    currentAction = 'subtractButton';
  }
  newInput = true;
  initialValue = false;
}

function multiply() {
  if (currentInput === 0 && !newInput) {
    currentTotal = 0;
  }
  if (initialValue) {
    currentTotal = currentInput;
    currentAction = 'multiplyButton';
  } else if (!newInput) {
    currentTotal *= Number(currentInput);
    currentAction = 'multiplyButton';
  }
  newInput = true;
  initialValue = false;
}

function divide() {
  if (currentInput === 0 && !initialValue) {
    screen.innerHTML = 'error divide by zero';
  }
  if (initialValue) {
    currentTotal = currentInput;
    currentAction = 'divideButton';
  } else if (!newInput) {
    currentTotal /= Number(currentInput);
    currentAction = 'divideButton';
  }
  newInput = true;
  initialValue = false;
}

function displayTotal() {
  if (currentTotal === 0 && currentInput !== 0) {
    screen.innerHTML = currentInput;
  } else {
    if (currentAction) {
      selectAction(currentAction);
      currentAction = false;
    }
    screen.innerHTML = currentTotal;
    previousTotal = true;
  }
}

function selectAction(buttonId) {
  switch (buttonId) {
    case 'clearButton':
      clear();
      break;
    case 'posNegButton':
      plusMinus();
      break;
    case 'precentButton':
      getPrecent();
      break;
    case 'addButton':
      add();
      break;
    case 'subtractButton':
      subtraction();
      break;
    case 'equalButton':
      displayTotal();
      break;
    case 'multiplyButton':
      multiply();
      break;
    case 'divideButton':
      divide();
      break;
    default:
      break;
  }
}

function insert(clicked) {
  const currentInputLength = screen.innerHTML.length;
  const value = document.getElementById(clicked).innerHTML;
  if (currentInputLength !== 14 && !checkForDecimal(value)) {
    if (newInput) {
      screen.innerHTML = value;
      newInput = false;
    } else {
      screen.innerHTML += value;
    }
    currentInput = screen.innerHTML;
  }
}

function input(selected) {
  const isOperator = selected.target.classList.contains('operator');
  if (selected.target !== selected.currentTarget) {
    if (isOperator === false) {
      insert(selected.target.id);
    } else if (previousTotal === true && selected.target.id !== 'clearButton') {
      currentAction = selected.target.id;
      newInput = true;
      previousTotal = false;
    } else {
      selectAction(selected.target.id);
    }
  }
  selected.stopPropagation();
}

function init() {
  document.querySelector('.calculator-buttons').addEventListener('click', input);
  screen = document.getElementById('screenDisplay');
  currentInput = screen.innerHTML;
}

window.addEventListener('load', init);
