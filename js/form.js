const adForm = document.querySelector('.ad-form');
const adFormElement = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFeatures = document.querySelectorAll('.map__features');
const elementsDisabled = [adFormElement, mapFeatures];

adForm.classList.toggle('ad-form--disabled');
mapFilters.classList.toggle('map__filters--disabled');

elementsDisabled.forEach((el) => {
  el.setAttribute('disabled', 'disabled');
});


const map = L.map('map', {
  center: [56.4444, 56.4444],
  zoom: 15,
});

