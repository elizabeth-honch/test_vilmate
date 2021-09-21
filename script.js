'use-strict';

let queu = []; //Черга

const FIRST_COUNTER = document.querySelector('.counter__one');
const SECOND_COUNTER = document.querySelector('.counter__two');
const THIRD_COUNTER = document.querySelector('.counter__three');

FIRST_COUNTER.innerHTML = 0;
SECOND_COUNTER.innerHTML = 0;
THIRD_COUNTER.innerHTML = 0;

const FIRST_INDICATOR = document.querySelector('.indicator__one');
const SECOND_INDICATOR = document.querySelector('.indicator__two');
const THIRD_INDICATOR = document.querySelector('.indicator__three');

let intervalGenerator;
let intervalGetter;

let countsClick = 0;
let counterClicks = 0;
let delayForCounters = 0;
let prevLength = 0;

let currentIndex = 0;

function generateAndStopObjects() {
  countsClick++; // Кількість натисків на кнопку
  if (countsClick % 2 !== 0) { // Якщо вони не кратні 2 - то запустити генератор
    generateObjects();
  } else { // Якщо вони кратні 2 - то зупинити генератор генератор
    FIRST_INDICATOR.classList.contains('green') ? FIRST_INDICATOR.classList.replace('green', 'red') : FIRST_INDICATOR.classList.contains('red') ? '' : FIRST_INDICATOR.classList.add('red'); //Проставляємо клас
    console.log('stop timer!')
    clearTimeout(intervalGenerator); //Видаляємо таймер
  }
}

function generateObjects() {
  let randomNumberDelay = Math.floor(Math.random() * 10000) + 1000; // Рандомні секунди
  let randomNumberData = Math.floor(Math.random() * 100) + 1;
  FIRST_INDICATOR.classList.contains('red') ? FIRST_INDICATOR.classList.replace('red','green') : FIRST_INDICATOR.classList.contains('green') ? '' : FIRST_INDICATOR.classList.add('green');
  intervalGenerator = setTimeout(() => {
    // Створюємо новий обєкт
    let obj = {
      data: randomNumberData
    };
    queu.push(obj); // Додаємо новий обєкт в кінець в масиву
    console.log(queu);
    console.log(`delay - ${randomNumberDelay}`);
    console.log(new Date().toLocaleString());
    generateObjects(); //Запускаємо ф-цію для створення нового обєкту з новими рандомними числами
  }, 1000); //randomNumberDelay
}

function setCounters() {
  counterClicks++;
  SECOND_INDICATOR.classList.contains('red') ? SECOND_INDICATOR.classList.replace('red','green') : SECOND_INDICATOR.classList.contains('green') ? '' : SECOND_INDICATOR.classList.add('green');
  if (
    counterClicks % 2 !== 0 && queu.length > 0 && prevLength === 0 || 
    counterClicks % 2 !== 0 && queu.length > 0 && prevLength === queu.length
  ) { //Якщо натиснуто на запуск і черга не пуста, якщо попередня довжина або = 0 ( ще не запускалась відмальовування счетчиків), або дорівнює попередній довжині, якщо черга не пройшла до кінця і натиснули на паузу
    delayForCounters = 2000;
    setDataFromGenerator(delayForCounters, currentIndex);
  } else if (counterClicks % 2 !== 0 && prevLength !== queu.length) { // Якщо зявились нові обєкти в черзі
    delayForCounters += 1000;
    setDataFromGenerator(delayForCounters, currentIndex);
  } else if (counterClicks % 2 == 0) { //Якщо натиснуто на паузу, то змінюємо клас і викликаємо ф-цію видалення таймеру
    SECOND_INDICATOR.classList.contains('green') ? SECOND_INDICATOR.classList.replace('green', 'red') : SECOND_INDICATOR.classList.contains('red') ? '' : SECOND_INDICATOR.classList.add('red');
    stopGetDataFromGenerator();
  }
}

function setDataFromGenerator(delay, index) {
  currentIndex = index; // Поточний індекс
  prevLength = queu.length; // Попередня довжина черги
  intervalGetter = setTimeout(() => {
    if (index < queu.length) { // Ітерація по елемента масиву
      console.log(queu[index]);
      if (queu[index].data < 30) {
        +FIRST_COUNTER.innerHTML++;
      } else if (queu[index].data >= 30 && queu[index].data < 70) {
        +SECOND_COUNTER.innerHTML++;
      } else if (queu[index].data >= 70) {
        +THIRD_COUNTER.innerHTML++;
      }
      index++;
      setDataFromGenerator(delay, index); //Визов ф-ції з наступним індексом
    }
  }, delay);
}

function stopGetDataFromGenerator() {
  console.log('stop timer!');
  clearTimeout(intervalGetter); //Видаляємо таймер
}

function resetCounters() {
  // Очищення черги, поточного індексу і счетчиків
  queu = [];
  currentIndex = 0;
  FIRST_COUNTER.innerHTML = 0;
  SECOND_COUNTER.innerHTML = 0;
  THIRD_COUNTER.innerHTML = 0;
}