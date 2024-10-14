const screen = document.getElementById('screen');
let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetScreen = false;

function updateScreen(value) {
  screen.value = value;
}

function resetScreen() {
  currentInput = '0';
  previousInput = '';
  operator = '';
  updateScreen(currentInput);
  shouldResetScreen = false;
}

function inputNumber(value) {
  if (shouldResetScreen) {
    currentInput = value;
    shouldResetScreen = false;
  } else {
    if (currentInput === '0' && value !== '.') {
      currentInput = value;
    } else {
      currentInput += value;
    }
  }

  // Tampilkan operasi saat ini
  updateScreen(previousInput + ' ' + operator + ' ' + currentInput);
}

function setOperator(op) {
  if (operator !== '') calculate();  // Jika sudah ada operator, hitung dulu
  previousInput = currentInput; // Simpan nilai input sebelumnya
  operator = op; // Simpan operator
  currentInput = ''; // Reset input untuk angka selanjutnya
  shouldResetScreen = false;

  // Tampilkan operasi dengan operator
  updateScreen(previousInput + ' ' + operator);
}

function calculate() {
  if (operator === '' || currentInput === '') return;  // Pastikan ada operator dan input

  let result = '';
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    case '%':
      result = prev % current;  // Menggunakan modulus untuk sisa pembagian
      break;
    case '^':
      result = Math.pow(prev, current);
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = '';
  previousInput = '';
  updateScreen(currentInput);  // Tampilkan hasil akhir
  shouldResetScreen = true;
}

function clearAll() {
  resetScreen();
}

document.querySelectorAll('.calculator-keys button').forEach(button => {
  button.addEventListener('click', (event) => {
    const value = event.target.value;

    if (value === 'clear') {
      clearAll();
    } else if (['+', '-', '*', '/', '%', '^'].includes(value)) {
      setOperator(value);
    } else if (value === '=') {
      calculate();
    } else {
      inputNumber(value);
    }
  });
});

resetScreen();
