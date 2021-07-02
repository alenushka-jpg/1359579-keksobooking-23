/**
 * Модуль генерации карточки объявления
 * renderCard - Возвращает DOM-элемент 'Карточка объявления'
 * @param {Object} ad Объявление
 */
let cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

let TYPES = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

let renderCard = function (ad) {
  let cardElement = cardTemplate.cloneNode(true);
  let paragraphs = cardElement.querySelectorAll('.popup__text');
  let featureList = cardElement.querySelector('.popup__features');
  let pictureList = cardElement.querySelector('.popup__pictures');

  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '7500 ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPES[ad.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent =  'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  cardElement.querySelectorAll('.popup__features').textContent = ad.offer.features;
  cardElement.querySelectorAll('.popup__photos').src = ad.offer.photos;
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
}