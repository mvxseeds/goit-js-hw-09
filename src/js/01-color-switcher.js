const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}

const SWITCH_DELAY = 1000;

let isSwitching = false;
let switchTimerId = null;

refs.startBtn.addEventListener('click', onStart); 
refs.stopBtn.addEventListener('click', onStop);

// rewrite using classes for training
function onStart() {
  if (isSwitching) {
    return;
  } else {
    switchTimerId = setInterval(switchColor, SWITCH_DELAY);
    isSwitching = true;
  }
}

function onStop() {
  clearInterval(switchTimerId);
  isSwitching = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function switchColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
