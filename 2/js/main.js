/**
 * Получение случайного целого числа из переданного диапазона включительно. Для исключения отрицательного значения при возврате из функции число приводится к абсолютному значению.
 * @param {number} min — нижняя граница диапазона
 * @param {number} max — верхняя граница диапазона
 * @return {number} — полученное случайное целое из диапазона
 */
const getRandomIntegerInRange = (min, max) => (
  Math.abs(Math.floor(min + Math.random() * (max - min + 1)))
);


/**
 * Проверка длины строки на превышение лимита количества символов. Пробелы в по обоим концам строки не учитываются в подсчете.
 * @param {string} string — проверяемая строка
 * @param {number} limit — лимит символов
 * @return {boolean} — результат проверки превышения лимита (true - лимит не превышен/ false - лимит превышен)
 */
const isStringNotOverLimit = (string, limit = 140) => (
  string.trim().length <= limit
);

getRandomIntegerInRange(0, 0);
isStringNotOverLimit('test test test test', 10);
