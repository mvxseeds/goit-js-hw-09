import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  submit: document.querySelector('button[type="submit"]')
}

refs.submit.addEventListener('click', onSubmit);


function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });

  return promise;
}


// refactor adding more functions + destructuring of refs items
function onSubmit(e) {
  e.preventDefault();

  let delay = Number(refs.delay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);

  let promisesCnt = 0;

  while (promisesCnt !== amount) {
    promisesCnt += 1;
    const promise = createPromise(promisesCnt, delay);
    delay += step;

    promise
      .then(value => Notify.success(value))
      .catch(error => Notify.failure(error));
  }
}
