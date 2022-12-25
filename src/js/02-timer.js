import flatpickr from "flatpickr";
// Additional styles import
import "flatpickr/dist/flatpickr.min.css";


const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dtPickerSelector: "input#datetime-picker",
  dd: document.querySelector('.value[data-days]'),
  dh: document.querySelector('.value[data-hours]'),
  dm: document.querySelector('.value[data-minutes]'),
  ds: document.querySelector('.value[data-seconds]'),
}

let selectedDate = null;

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartBtnClick);


// flatpickr config
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (timer.isActive) {
      return;
    } else {
    selectedDate = selectedDates[0];
    handleDate(selectedDate);
    }
  },
};

// flatpickr instance
flatpickr(refs.dtPickerSelector, options);

// timer instance (update to use class?)
const timer = {
  isActive: false,
  intervalId: null,

  start() {
    if (this.isActive) {
      return;
    }

    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      this.isActive = true;

      const deltaTime = selectedDate - startTime;
      const time = convertMs(deltaTime);
    
      if (Number(time.seconds) === 0) {
        this.stop();
      }
      updateTimer(time);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  }
}


function handleDate(date) {
  if (isValidDate(date)) {
    refs.startBtn.disabled = false;
  } else {
    refs.startBtn.disabled = true;
    window.alert("Please choose a date in the future");
  }
}


function isValidDate(date) {
  return (date.getTime() - Date.now()) > 0 
        ? true 
        : false;
}


function onStartBtnClick() {
  refs.dtPickerSelector.disabled = true;
  timer.start();
}


function updateTimer({days, hours, minutes, seconds}) {
  const { dd, dh, dm, ds } = refs;

  dd.textContent = days;
  dh.textContent = hours;
  dm.textContent = minutes;
  ds.textContent = seconds;
}


function pad(value) {
    return String(value).padStart(2, '0');
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Added pad wrapper for leading zero's
  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
