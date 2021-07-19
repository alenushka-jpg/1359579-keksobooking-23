/**
 * Модуль генерации карточки объявления
 */
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const types = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
/**
 * renderCard - Возвращает DOM-элемент 'Карточка объявления'
 * @param {Object} ad Объявление
 * @param {Object} - Карточка объявления
 */
const renderCard = function (ad) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${ad.offer.price  }7500 ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = types[ad.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms  } комнаты для ${  ad.offer.guests  } гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${  ad.offer.checkin  }, выезд до ${  ad.offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = ad.offer.features;
  cardElement.querySelector('.popup__photos').src = ad.offer.photos;
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  return cardElement;
};

export {renderCard};
