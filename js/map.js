import {renderCard} from './card.js';
import {initializationAdd, getAddressCoordinates, adForm, avatarPreview,
  formPhotoHolder, onTypeChange, mapFilters} from './form.js';

const UNIT_LAT = 35.67673;
const UNIT_LNG = 139.74633;
const UNIT_ZOOM = 13;
const NUMBER_AFTER_POINT = 5;
const IMG_DEFAULT = 'img/muffin-grey.svg';

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);
const formAddress = document.querySelector('#address');

/**
 * Настраиваем библиотеку leaflet
 * initializationAdd- Функция перевода страницы в активное состояние при успешной загрузке карты
 * L.tileLayer - загружаем карту на страницу
 */
const activateMap = () => {
  map.on('load', () => {
    initializationAdd(),
    getAddressCoordinates(
      {
        lat: UNIT_LAT,
        lng: UNIT_LNG,
      },
    );
  })
    .setView(
      {
        lat: UNIT_LAT,
        lng: UNIT_LNG,
      }, UNIT_ZOOM,
    );

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

/**
 * Добавляем на карту специальную метку
 */
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

/**
 * Реализуем выбор адреса путём перемещения главной метки
 */
const mainPinMarker = L.marker(
  {
    lat: UNIT_LAT,
    lng: UNIT_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

/**
 * Функция определения координат
 */
const mainCoordinatesPin = () => mainPinMarker.on('move', (evt) => {
  const addressMarker = evt.target.getLatLng();
  formAddress.value = `${addressMarker.lat.toFixed(NUMBER_AFTER_POINT)}, ${addressMarker.lng.toFixed(NUMBER_AFTER_POINT)}`;
});

/**
 * Создаем метку похожего объявления
 */
const createMarker = (ad) => {
  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const cardMarker = L.marker(
    ad.location,
    {
      icon,
    },
  );

  cardMarker
    .addTo(markerGroup)
    .bindPopup(
      () => renderCard(ad),
      {
        keepInView: true,
      },
    );
};

const addPinsToMap = (pinsData) => {
  pinsData.forEach((pin) => {
    createMarker(pin);
  });
};

const clearMarker = () => markerGroup.clearLayers();

/**
 * Функция перехода формы и карты в дефолтное состояние
 */
const resetPage  = () => {
  mainPinMarker.setLatLng({
    lat: UNIT_LAT,
    lng: UNIT_LNG,
  });
  map.setView({
    lat: UNIT_LAT,
    lng: UNIT_LNG,
  }, UNIT_ZOOM);
  adForm.reset();
  avatarPreview.src = IMG_DEFAULT;
  formPhotoHolder.innerHTML = '';

  const adFormInputs = adForm.querySelectorAll('input');
  adFormInputs.forEach((input) => input.style.borderColor = '');
  const resetMainPin = mainPinMarker.getLatLng();
  getAddressCoordinates(resetMainPin);
  mapFilters.reset();
  onTypeChange();
  clearMarker();
};

export  {UNIT_LAT, UNIT_LNG, activateMap, createMarker, mainCoordinatesPin, resetPage, clearMarker, addPinsToMap};

