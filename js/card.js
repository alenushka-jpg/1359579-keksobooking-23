/**
 * Модуль генерации карточки объявления
 */
const cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
const cardElement = cardTemplate.cloneNode(true);

const TYPES = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};
/**
* renderCard - Возвращает DOM-элемент 'Карточка объявления'
* @param {Object} ad Объявление
*/
const renderCard = function (ad) {
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${ad.offer.price  }7500 ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = TYPES[ad.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms  } комнаты для ${  ad.offer.guests  } гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${  ad.offer.checkin  }, выезд до ${  ad.offer.checkout}`;
  cardElement.querySelector('.popup__features') = ad.offer.features;
  cardElement.querySelector('.popup__photos').src = ad.offer.photos;
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
};

export {renderCard};
