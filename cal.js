let currentValue = '0';
let memory = 0;
let history = [];
let resetDisplay = false;

function clearDisplay() {
  currentValue = '0';
  document.getElementById('display').value = currentValue;
}

function deleteLast() {
  if (currentValue.length > 1) {
    currentValue = currentValue.slice(0, -1);
  } else {
    currentValue = '0';
  }
  document.getElementById('display').value = currentValue;
}

function appendToDisplay(value) {
  if (resetDisplay) {
    currentValue = value;
    resetDisplay = false;
  } else {
    if (currentValue === '0' && value !== '.') {
      currentValue = value;
    } else {
      currentValue += value;
    }
  }
  document.getElementById('display').value = currentValue;
}

function calculate() {
  try {
    let result = eval(currentValue);
    currentValue = result.toString();
    document.getElementById('display').value = currentValue;
    history.push(`${currentValue}`);
    updateHistory();
    resetDisplay = true;
  } catch (error) {
    document.getElementById('display').value = 'Error';
  }
}

function turnOff() {
  currentValue = '0';
  memory = 0;
  history = [];
  document.getElementById('display').value = currentValue;
  updateHistory();
}

function memoryRecall() {
  currentValue = memory.toString();
  document.getElementById('display').value = currentValue;
}

function memoryAdd() {
  memory += parseFloat(currentValue);
}

function memorySubtract() {
  memory -= parseFloat(currentValue);
}

function calculateSquareRoot() {
  currentValue = Math.sqrt(parseFloat(currentValue)).toString();
  document.getElementById('display').value = currentValue;
}

function updateHistory() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';
  history.forEach(item => {
    let listItem = document.createElement('li');
    listItem.textContent = item;
    historyList.appendChild(listItem);
  });
}

// Add active class to clicked button
function buttonClicked(button) {
  // Remove 'active' class from all buttons
  const allButtons = document.querySelectorAll('button');
  allButtons.forEach(btn => btn.classList.remove('active'));

  // Add 'active' class to the clicked button
  button.classList.add('active');
}

// Add event listener to each button to handle the active state
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', function() {
    buttonClicked(button);
  });
});
