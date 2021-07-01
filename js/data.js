import {getRandomNumber} from './util.js';
import {getRandomElement} from './util.js';

const NUMBER_OF_ADS = 10;
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
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
/**
 * Получение случайной длины массива
 * @param {Number} array - это массив на основе которого формируется новый массив
 */
const requestArray = function(array) {
  return array.slice(0, getRandomNumber(1, array.length));
};
/**
 * Генерируем объявление
 * @param {Number} index - это передаваемое число от 1 до 10
 */
const coordinates = {
  lat: getRandomNumber(MIN_LON, MAX_LON, 5),
  lng: getRandomNumber(MIN_LNG, MAX_LNG, 5),
};
const generateAdvert =  function(index) {
  const advert = {
    author: {
      avatar: `img/avatars/user0${index + 1}.png`,
    },
    offer: {
      title: 'Заголовок объявления',
      address: `${coordinates.lon}, ${coordinates.lng}`,
      price: getRandomNumber(PRICE_MIN, PRICE_MAX),
      type: getRandomElement(TYPES),
      rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
      guests: getRandomNumber(GUESTS_MIN, GUESTS_MAX),
      checkin: getRandomElement(TIMES),
      checkout: getRandomElement(TIMES),
      features: requestArray(FEAUTURES),
      description: 'Описание объявления',
      photos: requestArray(PHOTOS),
    },
    location: {
      latitude : `${coordinates.lon}`,
      longitude: `${coordinates.lng}`,
    },
  };
return advert;
};

generateAdvert(6);
