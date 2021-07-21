import {onSuccessMessageKeydown, sendFormData} from './create-fetch.js';
import {setInitMap} from './map.js';


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

const typePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const MAX_ROOMS = 100;
const MIN_CAPACITY = 0;

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
}

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
const resetFormAndMap = () => {
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

adForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(adForm);
  sendFormData(
    formData,
    () => {
      console.log('Успех!');
      resetFormAndMap();
    },
    () => {
      console.log('Ошибка')
    }
  );
});

formReset.addEventListener('click', (e) => {
  e.preventDefault();
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

  formTitleContainer.reportValidity();
});

/**
 * Добавлен обработчик события на тип жилья
 */
formType.addEventListener('change', () => {
  const typeMinPrice = typePrice[formType.value];

  formPrice.min = typeMinPrice;
  formPrice.placeholder = typeMinPrice;
});

export {disableFiltersForm, disableAdForm, initializationMap};
