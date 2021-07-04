import {generateAdverts} from './data.js';
import {renderCard} from './card.js';

const AD_COUNT = 3;

const advertsData = generateAdverts(AD_COUNT);
renderCard(advertsData[0]);
