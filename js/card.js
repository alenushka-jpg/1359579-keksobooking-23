/**
 * Модуль генерации карточки объявления
 * renderCard - Возвращает DOM-элемент 'Карточка объявления'
 * @param {Object} ad Объявление
 * @param {element} templateElement - элемент, в который вставляем данные
 */
let cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
let cardElement = cardTemplate.cloneNode(true);

let TYPES = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

let renderCard = function (ad, templateElement) {
  var cardElementTitle = templateElement.querySelector('.popup__title');
  var cardElementAddress = templateElement.querySelector('.popup__text--address');
  var cardElementPrice = templateElement.querySelector('.popup__text--price');
  var cardElementType = templateElement.querySelector('.popup__type');
  var cardElementRoomsAndGuests = templateElement.querySelector('.popup__text--capacity');
  var cardElementTime = templateElement.querySelector('.popup__text--time');
  var cardElementFeatures = templateElement.querySelector('.popup__features');
  var cardElementPhotos = templateElement.querySelector('.popup__photos');
  var cardElementDescription = templateElement.querySelector('.popup__description');
  var cardElementAvatar = templateElement.querySelector('.popup__avatar');

  cardElementTitle.textContent = ad.offer.title;
  cardElementAddress.textContent = ad.offer.address;
  cardElementPrice.textContent = ad.offer.price + '7500 ₽/ночь';
  cardElementType.textContent = TYPES[ad.offer.type];
  cardElementRoomsAndGuests.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElementTime.textContent =  'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  cardElementFeatures.textContent = ad.offer.features;
  cardElementPhotos.src = ad.offer.photos;
  cardElementDescription.textContent = ad.offer.description;
  cardElementAvatar.src = ad.author.avatar;

  return templateElement;
};