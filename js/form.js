const adForm = document.querySelector('.ad-form');
const adFormElement = document.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFeatures = document.querySelectorAll('.map__features');

/**
 * Функция, которая выключает фильтры
 */
const disableFiltersForm = function () {
  mapFiltersForm.classList.add('map__filters--disabled');
  const arrayElements = Array.from(mapFiltersForm.children);

  arrayElements.forEach((el) => {
    el.setAttribute('disabled', 'disabled');
  })
};

export {disableFiltersForm};

adForm.classList.add('ad-form--disabled');


// const map = L.map('map', {
//   center: [56.4444, 56.4444],
//   zoom: 15,
// });

