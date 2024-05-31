// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
const btn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const timer = document.querySelector('.timer');
btn.addEventListener('click', onStartBtnClick);
let userSelectedDate = null;
btn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      return alert('Please choose a date in the future');
    }
    btn.disabled = false;
    userSelectedDate = selectedDates[0];
  },
};
flatpickr(input, options);
function onStartBtnClick() {
  btn.disabled = true;
  input.disabled = true;
  const intervalId = setInterval(() => {
    const currentDate = Date.now();
    const diff = userSelectedDate - currentDate;
    if (diff <= 1000) {
      clearInterval(intervalId);
    }
    const { days, hours, minutes, seconds } = convertMs(diff);
    timer.querySelector('[data-days]').textContent = addZero(days);
    timer.querySelector('[data-hours]').textContent = addZero(hours);
    timer.querySelector('[data-minutes]').textContent = addZero(minutes);
    timer.querySelector('[data-seconds]').textContent = addZero(seconds);
  }, 1000);
}
function addZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
