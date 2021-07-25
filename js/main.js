import {disablePage, publishAdSubmit, onButtonReset, getAvatarPreview, getPhotoPreview, disableMapFilters, enableMapFilters, addValidationForm}from './form.js';
import {getDataFromServer} from './create-fetch.js';
import {activateMap, mainCoordinatesPin, addPinsToMap} from './map.js';
import {setFilterChange, renderPinList} from './filter.js';

const NUMBER = 10;

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
  addPinsToMap(advertsData.slice(0, NUMBER));
  setFilterChange(
    () => renderPinList(advertsData)
  );
  enableMapFilters();
  onButtonReset(() => {
    addPinsToMap(advertsData.slice(0, NUMBER));
  });
});
