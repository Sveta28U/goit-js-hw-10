// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);
function onSubmit(event) {
  event.preventDefault();
  const delay = Number(event.currentTarget.elements.delay.value);
  const radioBtn = event.currentTarget.elements.state.value;

  createPromise(radioBtn, delay)
    .then(res => {
      iziToast.success({
        position: 'topRight',
        message: `✅ Fulfilled promise in ${res.delay}ms`,
      });
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        message: `❌ Rejected promise in ${error.delay}ms`,
      });
    });
  event.currentTarget.reset();
}
function createPromise(btn, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (btn === 'fulfilled') {
        resolve({ delay });
      } else if (btn === 'rejected') {
        reject({ delay });
      }
    }, delay);
  });
}
