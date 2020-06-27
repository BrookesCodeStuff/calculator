let operation = [],
    currentValue = '',
    previousValue = '',
    result = '';
const display = document.querySelector('#display'),
      currentOperation = document.querySelector('#current-operation'),
      buttons = document.querySelectorAll('button');

function init() {
  previousValue = '';
  currentValue = '';
  operation = [];
  display.innerHTML = '0';
  currentOperation.innerHTML = '';
  buttons.forEach(attachListener);
  console.log('Clear');
}

function attachListener(button) {
  button.addEventListener('click', handleClick);
};

function handleClick(event) {
  let e = event.currentTarget;
  if (e.value === 'equals') {
    handleOperation();
  } else if (e.value === 'clear') {
    init();
  } else if (e.classList.contains('operator')) {
    handleOperator(e);
  } else if (e.classList.contains('function')) {
    handleFunction(e);
  } else {
    handleNumbers(e.value);
  }
};

function handleOperation() {
  if (!previousValue) {
    return;
  };
  operation.push(parseInt(currentValue));
  currentOperation.innerHTML += currentValue;
  while (operation.length > 1) {
    console.log(`Report: ${operation}`);
    if (operation.includes('multiply')) {
      let m = operation.indexOf('multiply');
      console.log(operation);
      operation.splice(m - 1, 3, multiply(operation[m - 1], operation[m + 1]));
    } else if (operation.includes('divide')) {
      let d = operation.indexOf('divide');
      console.log(operation);
      operation.splice(d - 1, 3, divide(operation[d - 1], operation[d + 1]));
    } else if (operation.includes('add')) {
      let a = operation.indexOf('add');
      console.log(operation);
      operation.splice(a - 1, 3, add(operation[a - 1], operation[a + 1]));
    } else {
      let s = operation.indexOf('subtract');
      console.log(operation);
      operation.splice(s - 1, 3, subtract(operation[s - 1], operation[s + 1]));
    }
  }
  currentValue = operation[0];
  previousValue = '';
  operation = [];
  display.innerHTML = currentValue;
}

function handleOperator(operator) {
  if (!currentValue) {
    return;
  } 
  !previousValue ? currentOperation.innerHTML = `${currentValue} ${operator.textContent} ` : currentOperation.innerHTML += `${currentValue} ${operator.textContent} `; 
  previousValue = Number(currentValue);
  operation.push(previousValue);
  operation.push(operator.value);
  currentValue = '';
  display.innerHTML = '';
}

function handleFunction(key) {
  switch(key.value) {
    case 'percent':
      currentValue = percent(currentValue);
      display.innerHTML = `${currentValue} `
      break;
    case 'sign':
      currentValue = sign(currentValue);
      display.innerHTML = `${currentValue} `
      break;
  }
}

function handleNumbers(num) {
  currentValue += num;
  display.innerHTML = `${currentValue} `
}

function add() {
  return arguments[0] + arguments[1];
}

function subtract() {
  return arguments[0] - arguments[1];
}

function multiply() {
  return arguments[0] * arguments[1];
}

function divide() {
  return arguments[1] === 0 ? "Can't divide by 0" : arguments[0] / arguments[1];
}

function percent(num) {
  return num/100;
}

function sign(num) {
  return num * -1;
}

init();