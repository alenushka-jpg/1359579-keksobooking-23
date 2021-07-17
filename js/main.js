import {generateAdverts} from './data.js';
import {disableAdForm}from './form.js';
import {disableFiltersForm} from './form.js';
import {addMarkers} from './map.js';
import {activateMap} from './map.js';

const AD_COUNT = 23;

disableFiltersForm();
disableAdForm();

const advertsData = generateAdverts(AD_COUNT);

activateMap();
addMarkers(advertsData);
