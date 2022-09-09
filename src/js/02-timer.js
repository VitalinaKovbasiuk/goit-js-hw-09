// Виконуй це завдання у файлах 02-timer.html і 02-timer.js. 
// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. 
// Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, 
// під час технічного обслуговування тощо. Подивися демо-відео роботи таймера.
// HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку, 
// по кліку на яку, таймер повинен запускатися. 
// Додай мінімальне оформлення елементів інтерфейсу.
/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script> */
// # using npm install
// npm i flatpickr --save

// npm i notiflix




/* 
 const millisecondsInSecond = 1000;
 const secondsInMinute = 60;
 const minutesInHour = 60;
 const hoursInDay = 24;

 const timer = (targetDate) => {
    setInterval(() => {
        const delta = new Date(targetDate) - new Date();

        const seconds = Math.floor((delta / millisecondsInSecond) % secondsInMinute);
        const minutes = Math.floor((delta / (millisecondsInSecond * secondsInMinute)) % minutesInHour);
        const hours = Math.floor((delta / (millisecondsInSecond * secondsInMinute * minutesInHour)) % hoursInDay);
        const days = Math.floor(delta / (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay));


        const timerFormat = `${days}day ${hours}:${minutes}:${seconds}`;

        renderTimer(timerFormat);
    }, 1000);
};

const renderTime = (string) => {
    document.querySelector('span').innerText = string;
}

timer(new Date('2023/08/02')); */


// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// // import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const refs = {
//     inputDate: document.querySelector('#datetime-picker'),
//     startBtn: document.querySelector('button[data-start]'),
//     seconds: document.querySelector('[data-seconds]'),
//     minutes: document.querySelector('[data-minutes]'),
//     hours: document.querySelector('[data-hours]'),
//     days: document.querySelector('[data-days]'),
// }
// //   window.alert("Please choose a date in the future");



//   let selectedTime = null;

//   class Timer {
//     constructor({onTick}) {
//       this.intervalId = null;
//       this.isActive = false;
//       refs.startBtn.disabled = false;
//       refs.inputDate.disabled = false;
//       this.onTick = onTick;
//     }
//     start() {
//       if(this.isActive) {
//           return;
//       }
     
//       this.isActive = true;
//       refs.startBtn.disabled = true;
//       refs.inputDate.disabled = true;
  
//       this.intervalId = setInterval(() => {
//           const currentTime = Date.now();
//           const deltaTime = selectedTime - currentTime;
//           const time = this.convertMs(deltaTime);
//           this.onTick(time);
     
//           if (deltaTime <= 1000) {
//               this.isActive = false;
//               clearInterval(this.intervalId);
             
//               console.log( `Finish!`)
//           }
//       }, 1000);
//   }
   
//   convertMs(ms) {
    
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;
  
    
//     const days = this.pad(Math.floor(ms / day));
//     const hours = this.pad(Math.floor((ms % day) / hour));
//     const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
//     const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));
  
//     return { days, hours, minutes, seconds };
//   }
  
//   pad(value) {
//     return String(value).padStart(2, '0');
//   }
//   }

// refs.startBtn.addEventListener('click', () => {
//     timer.start();

// })


// const timer = new Timer({
//     onTick: updateClockface, 
//   });


// const options = {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,
//     minDate: "today",
//     onClose(selectedDates) {        
//         if (selectedDates[0] < Date.now()) {
//        Notify.failure('Please choose a date in the future');
//          selectedDates[0] = new Date();
//        } else {
//          refs.startBtn.disabled = false;
//          selectedTime = selectedDates[0];
//        }
//       }
//        };

       
// function updateClockface({ days, hours, minutes, seconds}) {
//         refs.days.textContent = days;
//         refs.hours.textContent = hours;
//         refs.minutes.textContent = minutes;
//         refs.seconds.textContent = seconds;
//       }

// flatpickr(refs.inputDate, options);



// библиотека flatpickr
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_orange.css';
// библиотека notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');

let selectedTime = null;

const options = {
  enableTime: true, 
  time_24hr: true, 
  defaultDate: new Date(), 
  minuteIncrement: 1, 
  minDate: 'today', 
  
  onReady() {
    startBtn.setAttribute('disabled', true);
  },

  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();

    if (startBtn.hasAttribute('disabled')) {
      Notify.success('Thank you.'); 
      startBtn.removeAttribute('disabled');
    }
  },
};

startBtn.addEventListener('click', onStartBtnClick);

flatpickr('#datetime-picker', options);

function onStartBtnClick() {
  startBtn.setAttribute('disabled', true);

  const intervalId = setInterval(() => {
    if (selectedTime - Date.now() < 0) {
      clearInterval(intervalId);
      return;
    }

    const toSelectedDate = convertMs(selectedTime - Date.now());
    updateDate(toSelectedDate);
  }, 1000);
}

function convertMs(Ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(Ms / day);
  const hours = Math.floor((Ms % day) / hour);
  const minutes = Math.floor(((Ms % day) % hour) / minute);
  const seconds = Math.floor((((Ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function updateDate({ days, hours, minutes, seconds }) {
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}