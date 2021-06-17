const TIMES = ['12:00', '13:00', '14:00'];
const TYPES = ['palace', 'flat', 'house', 'hotel'];
const FEAUTURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const PRICE_MIN = 0;
const PRICE_MAX = 40000;
const ROOMS_MIN = 1;
const ROOMS_MAX = 4;
const GUESTS_MIN = 1;
const GUESTS_MAX = 5;
/**
 * Генерация случайного числа с плавающей точкой из диапазона
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

getRandomNumber(0.5, 3.5);
// Генерация случайное целое число
function getRandomInteger(min, max) {
  return getRandomNumber(min, max);
}

getRandomInteger(1, 5);
/**
 * Получение случайного элемента массива
 * @param {Number} array - это передаваемое число от 1 до 10
 */
function  getRandomArray(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

getRandomArray(5);

/**
 * Генерируем объявление
 * @param {Number} index - это передаваемое число от 1 до 10
 */
const generateAdvert =  function(index) {
  const advert = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },

    offer: {
      title: 'Заголовок объявления',
      address: locationLat + ', ' + locationIng,
      price: getRandomInteger(PRICE_MIN, PRICE_MAX),
      type: getRandomArray(TYPES),
      rooms: getRandomInteger(ROOMS_MIN, ROOMS_MAX),
      guests: getRandomInteger(GUESTS_MIN, GUESTS_MAX),
      checkin: getRandomArray(TIMES),
      checkout: getRandomArray(TIMES),
    },
  };
};

generateAdvert(6);
