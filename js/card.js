import {getEndingRooms, getEndingGuests, createPhotos} from './form.js';

const TYPES_OF_HOUSING = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

/**
 * Модуль генерации карточки объявления
 */
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

/**
 * Функция на отрисовку иконок удобств
 */
const createFeatures = (features) => {
  const featuresFragment = document.createDocumentFragment();
  features.forEach((element) => {
    const feature = document.createElement('li');
    feature.classList.add('popup__feature', `popup__feature--${element}`);
    featuresFragment.appendChild(feature);
  });
  return featuresFragment;
};

/**
 * renderCard - Возвращает DOM-элемент 'Карточка объявления'
 * @param {Object} ad Объявление
 * @param {Object} - Карточка объявления
 */
const renderCard = ({
  offer,
  author,
}) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title || '';
  cardElement.querySelector('.popup__text--address').textContent = offer.address || '';
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price}₽/ночь` || '';
  cardElement.querySelector('.popup__type').textContent = TYPES_OF_HOUSING[offer.type] || '';
  cardElement.querySelector('.popup__text--capacity').textContent = (!offer.rooms || !Number.isInteger(offer.guests))
    ? '' : `${offer.rooms} ${getEndingRooms(offer.rooms)} ${getEndingGuests(offer.guests)}`;
  cardElement.querySelector('.popup__text--time').textContent = (!offer.checkin || !offer.checkout)
    ? '' : `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = offer.description || '';
  cardElement.querySelector('.popup__avatar').src = author.avatar || '';

  const photosCard = cardElement.querySelector('.popup__photos');
  photosCard.innerHTML = '';
  if (offer.photos) {
    const newPhotoCards = createPhotos(offer.photos);
    photosCard.appendChild(newPhotoCards);
  } else {
    photosCard.remove();
  }
  const cardFeatures = cardElement.querySelector('.popup__features');
  cardFeatures.innerHTML = '';
  if (offer.features) {
    const newFeatureCards = createFeatures(offer.features);
    cardFeatures.appendChild(newFeatureCards);
  } else {
    cardFeatures.remove();
  }
  return cardElement;
};

export {renderCard};
