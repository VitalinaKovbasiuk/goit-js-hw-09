
// Напиши скрипт, який після натискання кнопки «Start», 
// раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль. 
// Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

// !УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. 
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.


  const buttonStart = document.querySelector('button[data-start]');
  const buttonStop = document.querySelector('button[data-stop]');
//   console.log(buttonStart, buttonStop);
   
  buttonStart.addEventListener('click', onStartClick);
  buttonStop.addEventListener('click', onStopClick);
  
  let timerId = null;

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function onStartClick() {
    timerId = setInterval(
      () => (document.body.style.backgroundColor = getRandomHexColor()),
      1000
    );
  
    buttonStart.setAttribute('disabled', true);
    buttonStop.removeAttribute('disabled');
  }
  
  function onStopClick() {
    buttonStop.setAttribute('disabled', true);
    buttonStart.removeAttribute('disabled', false);
  
    clearInterval(timerId);
  }
