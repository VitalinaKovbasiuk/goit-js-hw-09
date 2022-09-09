
// HTML містить розмітку форми, в поля якої користувач буде вводити першу затримку в мілісекундах, 
// крок збільшення затримки для кожного промісу після першого і кількість промісів, яку необхідно створити.

// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) 
// стільки разів, скільки ввели в поле amount. Під час кожного виклику передай їй номер промісу (position), 
// що створюється, і затримку, враховуючи першу затримку (delay), введену користувачем, і крок (step).
// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     Fulfill
//   } else {
//     Reject
//   }
// }
// Доповни код функції createPromise таким чином, щоб вона повертала один проміс, 
// який виконується або відхиляється через delay часу. Значенням промісу повинен бути об'єкт, 
// в якому будуть властивості position і delay зі значеннями однойменних параметрів. 
// Використовуй початковий код функції для вибору того, 
// що потрібно зробити з промісом - виконати або відхилити.
// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

// Для відображення повідомлень користувачеві, замість console.log(), використовуй бібліотеку notiflix.


import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector(`.form`);
let delayRef = document.querySelector('[name=delay]');
let stapRef = document.querySelector('[name=step]');
let amountRef = document.querySelector('[name=amount]');

formRef.addEventListener(`submit`, onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  delayRef = Number(event.currentTarget.delay.value);
  stapRef = Number(event.currentTarget.step.value);
  amountRef = Number(event.currentTarget.amount.value);
 
for (let i =1; i <= amountRef; i++) {   
     createPromise(i, delayRef)   
   .then(({ position, delay }) => {    
       Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
     })

   .catch(({ position, delay }) => {   
       Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
     })
   delayRef += stapRef;
}
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) =>
   {    setTimeout(() => {
  const shouldResolve = Math.random() > 0.3; 
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    });
  })
}
