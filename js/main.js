/**
 * Генерация случайного числа из диапазона
 * @param {Number} min - минимальное значение
 * @param {Number} max - максимальное значение
 * @return {Number} - случайное число
 */

function randomNumber(min, max, num) {
  // получить случайное число от (min-0.5) до (max+0.5)
  const number = min - 0.5 + num + Math.random() * (max - min + 1 + num);

  num = 1.22;
  num.toFixed(3);

  if (min > max) {
    [min, max] = [max, min];
  } return Math.random(number);
}

randomNumber(0.5, 1.5);
