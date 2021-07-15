const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

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
  mapFiltersForm.classList.add('map__filters--disabled');
  const arrayFiltersElements = Array.from(mapFiltersForm.children);

  arrayFiltersElements.forEach((el) => {
    el.setAttribute('disabled', 'disabled');
  });
};

/**
 * Функция, которая переводит страницу в активное состояние
 */
const initializationMap = () =>{
  adForm.classList.remove('ad-form--disabled');
  mapFiltersForm.classList.remove('map__filters--disabled');
  const arrayFormElements = Array.from(adForm.children);
  const arrayFiltersElements = Array.from(mapFiltersForm.children);

  arrayFormElements.forEach((el) => {
    el.removeAttribute('disabled', 'disabled');
  });

  arrayFiltersElements.forEach((el) => {
    el.removeAttribute('disabled', 'disabled');
  });
};

export {disableFiltersForm};
export {disableAdForm};
export {initializationMap};
