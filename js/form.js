const adForm = document.querySelector('.ad-form');
const adFormHeader = document.querySelectorAll('.ad-form-header');
const mapFilters = document.querySelector('.map__filters');
const mapFeatures = document.querySelectorAll('.map__features');


adForm.classList.toggle('ad-form--disabled');
mapFilters.classList.toggle('map__filters--disabled');
adFormHeader.attr('disabled');
mapFeatures.attr('disabled');
