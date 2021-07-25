import {disablePage, publishAdSubmit, onButtonReset, getAvatarPreview, getPhotoPreview}from './form.js';
import {getDataFromServer} from './create-fetch';
import {activateMap, mainCoordinatesPin} from './map.js';

disablePage();
activateMap();
mainCoordinatesPin();
getAvatarPreview();
getPhotoPreview();

// getDataFromServer((advertsData) => {
//   activateMap();
//   mainCoordinatesPin(advertsData);
//   publishAdSubmit();
//   onButtonReset();
// });
