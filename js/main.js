import {generateAdverts} from './data.js';
import {renderCard} from './card.js';
import {disableAdForm}from '/.form.js';
import {disableFiltersForm} from '/.form.js';

const AD_COUNT = 3;

const advertsData = generateAdverts(AD_COUNT);

const mapContainer = document.querySelector('.map__canvas');
const cardElement = renderCard(advertsData[0]);

mapContainer.appendChild(cardElement);

disableFiltersForm();
disableAdForm();
