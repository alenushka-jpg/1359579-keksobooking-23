import {onSuccessMessageKeydown, sendFormData} from './create-fetch.js';
import {setInitMap} from './map.js';

const MAX_ROOMS = 100;
const MIN_CAPACITY = 0;
const FILE_TYPES = ['jpg', 'png'];
const AVATAR_WIDTH = 40;
const AVATAR_HEIGHT = 44;
const PHOTO_WIDTH = 70;
const PHOTO_HEIGHT = 70;

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const formReset = document.querySelector('.ad-form__reset');
const messageContainer = {
  success: document.querySelector('#success').content.querySelector('.success'),
  error: document.querySelector('#error').content.querySelector('.error'),
};

const formAvatarHolder = document.querySelector('.ad-form-header__preview');
const formPhotoHolder = document.querySelector('.ad-form__photo');

const formCapacity = document.querySelector('#capacity');
const formRoomNumber = document.querySelector('#room_number');
const formTitle = document.querySelector('#title');
const formType = document.querySelector('#type');
const formPrice = document.querySelector('#price');
const formTimeIn = document.querySelector('#timein');
const formTimeOut = document.querySelector('#timeout');
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
 * Функция ограничения на допустимые варианты выбора количества гостей
 */
const  onRoomsAndGuestsChange = () => {
  const capacityValue = +formCapacity.value;
  const roomValue = +formRoomNumber.value;

  if (roomValue !== MAX_ROOMS && (capacityValue > roomValue || capacityValue === MIN_CAPACITY)) {
    formCapacity.setCustomValidity(`Для данного количества комнат возможное количество гостей: не меньше 1 и не больше ${roomValue}`);
  } else if (roomValue === MAX_ROOMS && capacityValue !== MIN_CAPACITY) {
    formCapacity.setCustomValidity('100 комнат не для гостей');
  } else {
    formCapacity.setCustomValidity('');

    formCapacity.reportValidity();
  }
};

const addCheckHandlers = () => {
  formCapacity.addEventListener('change', onRoomsAndGuestsChange);
  formRoomNumber.addEventListener('change', onRoomsAndGuestsChange);
};

/**
 * Функции, которые выключают фильтры
 */
const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  const arrayFormElements = Array.from(adForm.children);

  arrayFormElements.forEach((el) => {
    el.setAttribute('disabled', 'disabled');
  });
};

const disableFiltersForm = () => {
  mapFilters.classList.add('map__filters--disabled');
  const arrayFiltersElements = Array.from(mapFilters.children);

  arrayFiltersElements.forEach((el) => {
    el.setAttribute('disabled', 'disabled');
  });
};

/**
 * Функция, которая переводит страницу в активное состояние
 */
const initializationMap = () =>{
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  const arrayFormElements = Array.from(adForm.children);
  const arrayFiltersElements = Array.from(mapFilters.children);

  arrayFormElements.forEach((el) => {
    el.removeAttribute('disabled', 'disabled');
  });

  arrayFiltersElements.forEach((el) => {
    el.removeAttribute('disabled', 'disabled');
  });
  addCheckHandlers();
};

/**
 * Функция показа статуса сообщения
 */
const showStatusMessage = (status) => {
  const message = messageContainer[status];

  if (!message) {
    return;
  }

  document.querySelector('body').appendChild(message);
  document.addEventListener('keydown', onSuccessMessageKeydown);

  message.addEventListener('click', () => {
    message.remove();
  });
};

/**
 * Функция сброса формы и карты
 */
const resetFormsAndMap = () => {
  adForm.reset();
  mapFilters.reset();
  // formAvatarHolder.replaceChildren();
  // formPhotoHolder.replaceChildren();
  setInitMap();
};

/**
 * Функция, которая вставляет изображение
 */
const insertImage = (file, container, sizes) => {
  const fileName = file.name.toLowerCase();

  const isCorrectType = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (isCorrectType) {
    const reader = new FileReader();
    const image = document.createElement('img');
    image.width = sizes.width;
    image.height = sizes.height;

    reader.addEventListener('load', () => {
      image.src = reader.result;
      container.replaceChildren(image);
    });

    reader.readAsDataURL(file);
  }

  return isCorrectType;
};

/**
 * Добавлен обработчик соб-ия на показ статуса сообщения
 */
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(adForm);
  sendFormData(
    formData,
    () => {
      showStatusMessage('success');
      resetFormsAndMap();
    },
    () => {
      showStatusMessage('error');
    },
  );
});

formReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetFormsAndMap();
});

/**
 * Добавлен обработчик события на мин-макс кол-во символов
 */
formTitle.addEventListener('input', () => {
  const valueLength = formTitle.value.length;
  const minValueLength = +formTitle.minLength;
  const maxValueLength = +formTitle.maxLength;

  if (valueLength < minValueLength) {
    formTitle.setCustomValidity(`Ещё ${minValueLength - valueLength} симв.`);
  } else if (valueLength > maxValueLength) {
    formTitle.setCustomValidity(`Удалите лишние ${valueLength - maxValueLength} симв.`);
  } else {
    formTitle.setCustomValidity('');
  }

  formTitle.reportValidity();
});

/**
 * Добавлен обработчик события на тип жилья
 */
formType.addEventListener('change', () => {
  const typeMinPrice = typePrice[formType.value];

  formPrice.min = typeMinPrice;
  formPrice.placeholder = typeMinPrice;
});

/**
 * Добавлен обработчик события на прайс
 */
formPrice.addEventListener('input', () => {
  const value = +formPrice.value;
  const minValue = +formPrice.min;
  const maxValue = +formPrice.max;

  if (value < minValue) {
    formPrice.setCustomValidity(`Минимальная цена - ${minValue} руб.`);
  } else if (value > maxValue) {
    formPrice.setCustomValidity(`Максимальная цена - ${maxValue} руб.`);
  } else {
    formPrice.setCustomValidity('');
  }

  formPrice.reportValidity();
});

/**
 * Добавлен обработчик события на время выезда и заезда
 */
formTimeIn.addEventListener('change', () => {
  formTimeOut.value = formTimeIn.value;
});

formTimeOut.addEventListener('change', () => {
  formTimeIn.value = formTimeOut.value;
});

/**
 * Добавлен обработчик события на загрузку фотографии
 */
formAvatar.addEventListener('change', () => {
  const fileAvatar = formAvatar.files[0];

  if (!insertImage(fileAvatar, formAvatarHolder, {width: AVATAR_WIDTH, height: AVATAR_HEIGHT})) {
    formAvatar.setCustomValidity(`Можно загружать только файлы в формате: ${FILE_TYPES.join(', ')}`);
  } else {
    formAvatar.setCustomValidity('');
  }

  formAvatar.reportValidity();
});

/**
 * Добавлен обработчик события на загрузку картинки
 */
formPhoto.addEventListener('change', () => {
  const filePhoto = formPhoto.files[0];

  if (!insertImage(filePhoto, formPhotoHolder, {width: PHOTO_WIDTH, height: PHOTO_HEIGHT})) {
    formPhoto.setCustomValidity(`Можно загружать только файлы в формате: ${FILE_TYPES.join(', ')}`);
  } else {
    formPhoto.setCustomValidity('');
  }

  formPhoto.reportValidity();
});


export {disableFiltersForm, disableAdForm, initializationMap, showStatusMessage};
