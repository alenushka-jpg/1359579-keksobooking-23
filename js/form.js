import {sendFormData} from './create-fetch.js';
import {UNIT_LAT, UNIT_LNG, resetPage} from './map.js';
import {showSuccessModal, showErrorModal} from './popup.js';

const FILE_TYPES = ['jpg', 'png'];
const PHOTO_WIDTH = 70;
const PHOTO_HEIGHT = 70;
const MIN_LENGTH = 30;
const MAX_LENGTH = 100;
const MAX_PRICE = 1000000;

const adForm = document.querySelector('.ad-form');
const formReset = document.querySelector('.ad-form__reset');

const mapFilters = document.querySelector('.map__filters');
const formCapacity = document.querySelector('#capacity');
const formRoomNumber = document.querySelector('#room_number');
const formTitle = document.querySelector('#title');
const formType = document.querySelector('#type');
const formPrice = document.querySelector('#price');
const formTimeIn = document.querySelector('#timein');
const formTimeOut = document.querySelector('#timeout');
const formAddress = document.querySelector('#address');

const formAvatarHolder = document.querySelector('.ad-form-header__preview');
const avatarPreview = formAvatarHolder.querySelector('img').cloneNode(true);
const formPhotoHolder = document.querySelector('.ad-form__photo');
const formAvatar = document.querySelector('#avatar');
const formPhoto = document.querySelector('#images');

const typePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

/**
 * Функция выбрать фотографию
 */
const renderPhoto = (chooseFile, sub) => {
  chooseFile.addEventListener('change', () => {
    const file = chooseFile.files[0];
    const fileName = file.name.toLowerCase();
    const matchup = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matchup) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const result = reader.result;
        sub(result);
      });
      reader.readAsDataURL(file);
    }
  });
};

/**
 * Функция создания превью фотографии пользователя
 */
const getAvatar = (result) => {
  const avatarFragment = document.createDocumentFragment();
  avatarPreview.src = result;
  avatarFragment.appendChild(avatarPreview);
  formAvatarHolder.innerHTML = '';
  formAvatarHolder.appendChild(avatarFragment);
};

/**
 * Функция создания превью фотографии жилья
 */
const getPhoto = (result) => {
  formPhotoHolder.innerHTML = '';
  const photoFragment = document.createDocumentFragment();
  const element = document.createElement('img');
  element.src = result;
  element.alt = 'Фото жилья';
  element.width = PHOTO_WIDTH;
  element.height = PHOTO_HEIGHT;
  photoFragment.appendChild(element);
  formPhotoHolder.appendChild(photoFragment);
};

/**
 * Функция создания фотографии жилья
 */
const createPhotos = (photos) => {
  const fragmentPhotos = document.createDocumentFragment();

  photos.forEach((photoSrc) => {
    const newPhoto = document.createElement('img');
    newPhoto.src = photoSrc;
    newPhoto.classList.add('popup__photo');
    newPhoto.alt = 'Фотография жилья';
    newPhoto.setAttribute('width', '45');
    newPhoto.setAttribute('height', '40');
    fragmentPhotos.appendChild(newPhoto);
  });
  return fragmentPhotos;
};

const getAvatarPreview = () => renderPhoto(formAvatar, getAvatar);
const getPhotoPreview = () => renderPhoto(formPhoto, getPhoto);

/**
 * Функция на получение окончаний комнат
 */
const getEndingRooms = (roomCount) => {
  switch (roomCount) {
    case 1:
      return 'комната';
    case 2:
    case 3:
    case 4:
      return 'комнаты';
    default:
      return 'комнат';
  }
};

/**
 * Функция на получение окончаний гостей
 */
const getEndingGuests = (guestCount) => {
  if (guestCount === 0) {
    return 'не для гостей';
  }
  if (guestCount > 1) {
    return `для ${guestCount} гостей`;
  }
  return `для ${guestCount} гостя`;
};

/**
 * Функция ограничения на допустимые варианты выбора количества гостей
 */
const onRoomsAndGuestsChange = () => {
  if (formRoomNumber.value === '1' && formCapacity.value !== '1') {
    formCapacity.setCustomValidity('В 1 комнате можно разместить только 1 гостя');
  } else if (formRoomNumber.value === '2' && formCapacity.value !== '1' && formCapacity.value !== '2') {
    formCapacity.setCustomValidity('В 2 комнатах можно разместить только от 1 до 2 гостей');
  } else if (formRoomNumber.value === '3' && formCapacity.value === '0') {
    formCapacity.setCustomValidity('В 3 комнатах можно разместить только от 1 до 3 гостей');
  } else if (formRoomNumber.value === '100' && formCapacity.value !== '0') {
    formCapacity.setCustomValidity('100 комнат не для гостей');
  } else {
    formCapacity.setCustomValidity('');
  }
  formCapacity.reportValidity();
};

/**
 * Функция ограничения о вводе допустимого кол-ва символов в поле «Заголовок объявления»
 */
const onTitleInput = () => {
  const titleLength = formTitle.value.length;
  if (titleLength < MIN_LENGTH) {
    formTitle.style.borderColor = 'red';
    formTitle.setCustomValidity(`Напишите ещё ${MIN_LENGTH - titleLength} символов`);
  } else if (titleLength > MAX_LENGTH) {
    formTitle.style.borderColor = 'red';
    formTitle.setCustomValidity(`Удалите ${titleLength - MAX_LENGTH} лишних символов`);
  } else {
    formTitle.style.borderColor = 'white';
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
};

/**
//  * Функция, на изменения поля «Тип жилья» на минимальное значение поля «Цена за ночь»
//  */
const onTypeChange = () => {
  formPrice.placeholder = typePrice[formType.value];
  formPrice.min = typePrice[formType.value];
};

/**
//  * Функция, на указание допустимой цены в поле «Цена за ночь»
//  */
const onPriceInput = () => {
  const valuePrice = formPrice.value;
  if (valuePrice < typePrice[formType.value]) {
    formPrice.style.borderColor = 'red';
  } else if (valuePrice > MAX_PRICE) {
    formPrice.style.borderColor = 'red';
    formPrice.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE}.`);
  } else {
    formPrice.style.borderColor = 'white';
    formPrice.setCustomValidity('');
  }
  formPrice.reportValidity();
};

/**
//  * Функция, на синхронизацию поля «Время выезда» изменения значения «Время заезда»
//  */
const onTimeInChange = () => {
  formTimeOut.value = formTimeIn.value;
};

const onTimeOutChange = () => {
  formTimeIn.value = formTimeOut.value;
};

const addValidationForm = () => {
  formRoomNumber.addEventListener('change', onRoomsAndGuestsChange);
  formCapacity.addEventListener('change', onRoomsAndGuestsChange);
  formTitle.addEventListener('input', onTitleInput);
  formType.addEventListener('change', onTypeChange);
  formPrice.addEventListener('input', onPriceInput);
  formTimeIn.addEventListener('change', onTimeInChange);
  formTimeOut.addEventListener('change', onTimeOutChange);
};

/**
 * Функция неактивного состояния страницы
 */
const disablePage = () => {
  adForm.classList.add('ad-form--disabled');
  const arrayFormElements = Array.from(adForm.children);

  arrayFormElements.forEach((el) => {
    el.setAttribute('disabled', 'disabled');
  });
};

/**
 * Функция неактивного состояния фильтра
 */
const disableMapFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  const arrayFiltersElements = Array.from(mapFilters.children);
  arrayFiltersElements.forEach((el) => {
    el.setAttribute('disabled', 'disabled');
  });
};

/**
 * Функция активного состояния фильтра
 */
const enableMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  const arrayFiltersElements = Array.from(mapFilters.children);
  arrayFiltersElements.forEach((el) => {
    el.removeAttribute('disabled', 'disabled');
  });
};

/**
 * Функция, которая переводит страницу в активное состояние
 */
const initializationAdd = () =>{
  adForm.classList.remove('ad-form--disabled');
  const arrayFormElements = Array.from(adForm.children);

  arrayFormElements.forEach((el) => {
    el.removeAttribute('disabled', 'disabled');
  });
};

/**
 * Функция передачи координат главной метки
 */
const getAddressCoordinates = () => {
  formAddress.value = `${UNIT_LAT}, ${UNIT_LNG}`;
};

/**
 * Функция на отправку объявления по кнопке "опубликовать"
 */
const publishAdSubmit = (sub) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendFormData(
      formData,
      () => {
        showSuccessModal();
        resetPage();
        sub();
      },
      showErrorModal);
  });
};

// Нажатие на кнопку "очистить" (reset-форма)
const onButtonReset = (sub) => {
  formReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetPage();
    sub();
  });
};

export {adForm, mapFilters, formPhotoHolder, avatarPreview, disablePage, disableMapFilters, initializationAdd, getAddressCoordinates, publishAdSubmit,
  onButtonReset, onTypeChange, createPhotos, getEndingRooms, getEndingGuests, getAvatarPreview, getPhotoPreview, enableMapFilters, addValidationForm};
