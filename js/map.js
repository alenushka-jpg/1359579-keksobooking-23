import {renderCard} from './card.js';

const UNIT_LON = 56.4444;
const UNIT_LAT = 56.4444;
const UNIT_ZOOM = 17;

const map = L.map('map', {
  center: [UNIT_LON, UNIT_LAT],
  zoom: UNIT_ZOOM,
});

const appendPinsToMap = function(pinsData) {
  pinsData.forEach((pinData) => {
    renderCard(pinData);
  });
};

export {appendPinsToMap};

