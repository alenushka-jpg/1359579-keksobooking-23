import {generateAdverts} from './data.js';
import {disableAdForm}from './form.js';
import {disableFiltersForm} from './form.js';
import {appendPinsToMap} from './map.js';
import {initializationMap} from './form.js';

const AD_COUNT = 23;

disableFiltersForm();
disableAdForm();

const advertsData = generateAdverts(AD_COUNT);
const mapContainer = document.querySelector('.map__canvas');

appendPinsToMap(advertsData, mapContainer);

initializationMap();
