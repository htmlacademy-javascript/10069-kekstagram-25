/**
 * Получение случайного целого числа из переданного диапазона включительно.
 * Для исключения отрицательного значения числа приводятся к абсолютному значению.
 *
 * @param {number} min — нижняя граница диапазона.
 * @param {number} max — верхняя граница диапазона.
 * @return {number} — полученное случайное целое из диапазона.
 */
const getRandomIntegerInRange = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


/**
 * Проверка длины строки на превышение лимита количества символов.
 * Пробелы в по обоим концам строки не учитываются в подсчете.
 *
 * @param {string} string — проверяемая строка.
 * @param {number} limit — лимит символов.
 * @return {boolean} — результат проверки превышения лимита (true - лимит не превышен/ false - лимит превышен).
 */
const isStringNotOverLimit = (string, limit = 140) => (
  string.trim().length <= limit
);


/**
 * Создание массива из последовательных чисел в заданном диапазоне.
 *
 * @param {number} start — стартовое число диапазона.
 * @param {number} finish — конечное число диапазона.
 * @return {array} — итоговый массив последовательных чисел.
 */
const createArrayConsistentNumbers = (start, finish) => {
  const array = [];
  for (let i = start; i <= finish; i++) {
    array.push(i);
  }
  return array;
};


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
 * Получение случайного элемента массива.
 *
 * @param {array} array — исходный массив.
 * @return {string|number|object} — значение массива со случайным индексом.
 */
const getRandomArrayElement = (array) => (
  array[Math.floor(Math.random() * array.length)]
);


/**
 * Получение случайного количества случайных элементов массива в указанном диапазоне.
 * По-умолчанию, нижняя граница - 1 элемент, верхняя граница - общее количество элементов массива.
 *
 * @param {array} array — исходный массив.
 * @param {number} min — нижняя граница диапазона.
 * @param {number} max — верхняя граница диапазона.
 * @return {array} — итоговый массив.
 */
const getRandomCountArrayElements = (array, min = 1, max = array.length) => (
  shuffleArray(array).slice(0, getRandomIntegerInRange(min, max))
);


/**
 * Проверка, что нажата клавиша "Escape".
 */
const isEscPress = (evt) => (evt.key === ('Escape' || 'Esc'));


/**
 * Проверка, что произведен клик левой клавишей мыши по объекту.
 */
const isMouseClick = (evt) => (evt.type === 'click');


/**
 * Предотвращение "всплытия" события нажатия клавиши "Escape".
 */
const stopEscPropagation = (evt) => {
  if (isEscPress(evt)) {
    evt.stopPropagation();
  }
};


export {
  getRandomIntegerInRange,
  isStringNotOverLimit,
  createArrayConsistentNumbers,
  shuffleArray,
  getRandomArrayElement,
  getRandomCountArrayElements,
  isEscPress,
  isMouseClick,
  stopEscPropagation
};
