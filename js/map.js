import {renderCard} from './card.js';
import {initializationMap} from './form.js';

const UNIT_LON = 35.68283;
const UNIT_LAT = 139.75945;
const UNIT_ZOOM = 17;
const addressNode = document.querySelector('#address');
const NUMBER_AFTER_POINT = 5;

/**
 * map - настраиваем библиотеку leaflet
 * initializationMap - Функция перевода страницы в активное состояние при успешной загрузке карты
 * L.tileLayer - загружаем карту на страницу
 */
const map = L.map('map-canvas');
map.on('load', () => {
  initializationMap();
})
  .setView(
    {
      lat: UNIT_LAT,
      lng: UNIT_LON,
    }, UNIT_ZOOM,
  );

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: UNIT_LON,
    lng: UNIT_LAT,
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
addressNode.value = `${UNIT_LON}, ${UNIT_LAT}`;

mainPinMarker.addEventListener('moveend', (evt) => {
  const addressMarker = evt.target.getLatLng();
  addressNode.value = `${addressMarker.lat.toFixed(NUMBER_AFTER_POINT)}, ${addressMarker.lng.toFixed(NUMBER_AFTER_POINT)}`;
});

const appendPinsToMap = (pinsData) => {
  pinsData.forEach((pinData) => {
    renderCard(pinData);
  });
};

export {appendPinsToMap};
