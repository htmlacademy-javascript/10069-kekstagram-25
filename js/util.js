import { DEBOUNCE_DELAY } from './const.js';


/**
 * Перемешивание элементов массива в случайном порядке.
 *
 * @param {array} array — исходный массив.
 * @return {array} — итоговый массив.
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};


/**
 * debounce для устранения дребезга.
 * Источник - https://www.freecodecamp.org/news/javascript-debounce-example
 *
 * @param {callback} callback — функция, выполнение которой нужно задержать на заданное время.
 * @param {number} timeoutDelay — время в миллисекундах. Пауза перед выполнением переданной функции.
 */
const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


/**
 * Проверка, что нажата клавиша ESC.
 */
const isEscPress = (evt) => (evt.key === ('Escape' || 'Esc'));


/**
 * Проверка, что произведен клик левой клавишей мыши по объекту.
 */
const isMouseClick = (evt) => (evt.type === 'click');


/**
 * Предотвращение "всплытия" события "нажата клавиша ESC".
 */
const stopEscPropagation = (evt) => {
  if (isEscPress(evt)) {
    evt.stopPropagation();
  }
};


export {
  shuffleArray,
  debounce,
  isEscPress,
  isMouseClick,
  stopEscPropagation
};
