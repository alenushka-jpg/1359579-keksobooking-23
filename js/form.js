const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

/**
 * Функции, которые выключают фильтры
 */
const disableAdForm = function () {
  adForm.classList.add('ad-form--disabled');
  const arrayFormElements = Array.from(adForm.children);

  arrayFormElements.forEach((el) => {
    el.setAttribute('disabled', 'disabled');
  });
};

const disableFiltersForm = function () {
  mapFiltersForm.classList.add('map__filters--disabled');
  const arrayFiltersElements = Array.from(mapFiltersForm.children);

  arrayFiltersElements.forEach((el) => {
    el.setAttribute('disabled', 'disabled');
  });
};

/**
 * Функция, которая переводит страницу в активное состояние
 */
const initializationMap = function () {
  adForm.classList.remove('ad-form--disabled');
  
  arrayFormElements.forEach((el) => {
    el.removeAttribute('disabled', 'disabled');
  });
}

export {disableFiltersForm};
export {disableAdForm};
export {initializationMap};

