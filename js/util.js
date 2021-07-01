/**
 * getRandomNumber - Возвращает случайное число с плавающей точкой из диапазона
 * @param {Number} min - минимальное значение
 * @param {Number} max - максимальное значение
 * @param {Number} num - количеством знаков после запятой
 * @return {Number} - случайное число
 */
function getRandomNumber(min, max, num = 0) {
  if (min < 0 || max < 0) {
    return 'Числа не могут быть отрицательными';
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  const number = +(min - 0.5 + Math.random() * (max - min + 1)).toFixed(num);
  return number;
}
/**
 * getRandomElement - Возвращает случайный элемент массива.
 * @param {Number} array - это передаваемое число от 1 до 10
 */
function  getRandomElement(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

const generateAdverts = function(number) {
  const adverts = [];

  for (let i = 0; i < number; i++) {
    adverts.push(generateAdvert(i));
  }
  return adverts;
};

const advertisementArray = generateAdverts(NUMBER_OF_ADS);