import {renderCard} from './card.js';
import {initializationMap} from './form.js';

const UNIT_LAT = 35.67673;
const UNIT_LNG = 139.74633;
const UNIT_ZOOM = 13;
const NUMBER_AFTER_POINT = 5;

const addressInput = document.querySelector('#address');

const map = L.map('map-canvas');
const markerGroup = L.layerGroup();

/**
 * Настраиваем библиотеку leaflet
 * initializationMap - Функция перевода страницы в активное состояние при успешной загрузке карты
 * L.tileLayer - загружаем карту на страницу
 */
const activateMap = () => {
  map.on('load', () => {
    initializationMap();
    markerGroup.addTo(map);
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
 * Координаты начального положения метки
 */
addressInput.value = `${UNIT_LAT}, ${UNIT_LNG}`;

/**
 * Обработчик для получения координат
 */
mainPinMarker.addEventListener('move', (evt) => {
  const addressMarker = evt.target.getLatLng();
  addressInput.value = `${addressMarker.lat.toFixed(NUMBER_AFTER_POINT)}, ${addressMarker.lng.toFixed(NUMBER_AFTER_POINT)}`;
});

/**
 * Создаем метку похожего объявления
 */
const createMarker = (ad) => {
  const icon = L.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
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

const addMarkers = (ads) => {
  markerGroup.clearLayers();

  ads.forEach((ad) => {
    createMarker(ad);
  });
};

/**
 * Функция активации карты
 */
const setInitMap  = () => {
  mainPinMarker.setLatLng({
    lat: UNIT_LAT,
    lng: UNIT_LNG,
  });

  mainPinMarker.fire('move');

  map.setView({
    lat: UNIT_LAT,
    lng: UNIT_LNG,
  }, UNIT_ZOOM);
};

export {addMarkers, activateMap, setInitMap};
