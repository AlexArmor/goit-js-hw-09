import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputForm = document.querySelector('.form');

inputForm.addEventListener('submit', onSubmitClick);

function onSubmitClick(event) {
  event.preventDefault();
  let delay = Number(inputForm.elements.delay.value);
  const step = Number(inputForm.elements.step.value);
  const amount = Number(inputForm.elements.amount.value);
  for (let i = 0; i < amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position + 1} in ${delay}ms`);
      });
    delay += step;
  }
  this.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
