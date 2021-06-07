/**
 * Генерация случайного числа из диапазона
 * @param {Number} min - минимальное значение
 * @param {Number} max - максимальное значение
 *  @param {Number} num - количество знаков после запятой
 * @return {Number} - случайное число
 */

function randomNumber(min, max, num) {
  // получить случайное число от (min-0.5) до (max+0.5)
  const number = min - 0.5 + Math.random() * (max - min + 1);

  num = 1.22;
  num.toFixed(3);

  if (min > max) {
    [min, max] = [max, min];
  } return Math.random(number);
}

randomNumber(0.5, 1.5);

/**
 * Генерация случайного целого числа из диапазона
 * @param {Number} min - минимальное значение
 * @param {Number} max - максимальное значение
 * @return {Number} - случайное целое число
 */

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);


  if (min > max) {
    [min, max] = [max, min];
  } return Math.floor(rand);
}

randomInteger(1, 5);
