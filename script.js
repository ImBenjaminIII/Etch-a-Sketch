const board = document.querySelector('#board');
const colorButton = document.querySelector('.color');
const eraserButton = document.querySelector('.eraser');
const clearButton = document.querySelector('.clear');
const rgbButton = document.querySelector('.rgb');
let sizeSlider = document.querySelector('.slider');
let inputSlider = document.querySelector('#slider-container .input');
let colorPicker = document.querySelector('.colorPicker');
let currentMode = '';
const DEFAULT_COLOR = '#333333';
let currentColor = DEFAULT_COLOR;

colorPicker.oninput = () => {
  setNewColor(colorPicker.value);
};

function setNewColor(newColor) {
  currentColor = newColor;
}

function setupBoard(size) {
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  board.innerHTML = ''; // clear the inner html of board for the new grid size

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div');
    gridElement.classList.add('grid-elements');
    gridElement.style.border = '1px solid black';
    gridElement.addEventListener('mousedown', changeColor);
    gridElement.addEventListener('mouseover', changeColor);
    board.appendChild(gridElement);
  }
}

function setCurrentMode(newMode) {
  activateButtons(newMode);
  currentMode = newMode;
}

function activateButtons(newMode) {
  // unhighlight the button color
  if (currentMode === 'rgbButton') {
    rgbButton.classList.remove('active');
  } else if (currentMode === 'colorButton') {
    colorButton.classList.remove('active');
  } else if (currentMode === 'eraserButton') {
    eraserButton.classList.remove('active');
  } else if (currentMode === 'clearButton') {
    clearButton.classList.remove('active');
  }

  // highlight the button color
  if (newMode === 'rgbButton') {
    rgbButton.classList.add('active');
  } else if (newMode === 'colorButton') {
    colorButton.classList.add('active');
  } else if (newMode === 'eraserButton') {
    eraserButton.classList.add('active');
  } else if (newMode === 'clearButton') {
    clearButton.classList.add('active');
  }
}

rgbButton.onclick = () => {
  setCurrentMode('rgbButton');
};

colorButton.onclick = () => {
  setCurrentMode('colorButton');
};

eraserButton.onclick = () => {
  setCurrentMode('eraserButton');
};

clearButton.onclick = () => {
  const grid = document.querySelectorAll('.grid-elements');
  setCurrentMode('clearButton');
  grid.forEach(item => {
    item.style.backgroundColor = '';
  });
};

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// change the color of the grid elements
function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  if (currentMode === 'eraserButton') {
    this.style.backgroundColor = '';
  } else if (currentMode === 'colorButton') {
    this.style.backgroundColor = currentColor;
  } else if (currentMode === 'rgbButton') {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    this.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  }
}

// change the value of text range input.
sizeSlider.oninput = () => {
  inputSlider.textContent = `${sizeSlider.value} x ${sizeSlider.value}`;
};

// change the size of the grid on change.
sizeSlider.onchange = () => {
  setupBoard(sizeSlider.value);
};

// random color title
const title = document.querySelector('.title').innerHTML.split('');

// Converts integer to hex
const colToHex = c => {
  // Hack so colors are bright enough
  let color = c < 75 ? c + 75 : c;
  let hex = color.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

// uses colToHex to concatenate
// a full 6 digit hex code
const rgbToHex = (r, g, b) => {
  return '#' + colToHex(r) + colToHex(g) + colToHex(b);
};

// Returns three random 0-255 integers
const getRandomColor = () => {
  return rgbToHex(
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256)
  );
};

// This is the prototype function
// that changes the color of each
// letter by wrapping it in a span
// element.
Array.prototype.randomColor = function () {
  let html = '';
  this.map(letter => {
    let color = getRandomColor();
    html += '<span style="color:' + color + '">' + letter + '</span>';
  });
  return html;
};

// Set the text
document.querySelector('.title').innerHTML = title.randomColor();

// set the board size on the opening
window.onload = () => {
  setupBoard(sizeSlider.value);
};
