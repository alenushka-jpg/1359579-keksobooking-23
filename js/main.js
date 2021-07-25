import {disablePage, publishAdSubmit, onButtonReset, getAvatarPreview, getPhotoPreview, disableMapFilters, enableMapFilters, addValidationForm}from './form.js';
import {getDataFromServer} from './create-fetch.js';
import {activateMap, mainCoordinatesPin, addPinsToMap} from './map.js';

disablePage();
disableMapFilters();
activateMap();
mainCoordinatesPin();
getAvatarPreview();
getPhotoPreview();
publishAdSubmit();
addValidationForm();

getDataFromServer((advertsData) => {
  activateMap();
  mainCoordinatesPin;
  addPinsToMap(advertsData.slice(0,10));
  enableMapFilters();
  onButtonReset();
});
