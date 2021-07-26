import {disablePage, publishAdSubmit, onButtonReset, getAvatarPreview, getPhotoPreview, disableMapFilters, enableMapFilters, addValidationForm}from './form.js';
import {getDataFromServer} from './create-fetch.js';
import {activateMap, mainCoordinatesPin, addPinsToMap} from './map.js';
import {setFilterChange, renderPinList} from './filter.js';
import {showErrorModal} from './popup.js';

const NUMBER = 10;

disablePage();
disableMapFilters();
activateMap();
mainCoordinatesPin();
getAvatarPreview();
getPhotoPreview();
addValidationForm();

getDataFromServer((advertsData) => {
  activateMap();
  addPinsToMap(advertsData.slice(0, NUMBER));
  setFilterChange(
    () => renderPinList(advertsData),
  );
  publishAdSubmit(
    () => renderPinList(advertsData),
  );
  enableMapFilters();
  onButtonReset(() => {
    addPinsToMap(advertsData.slice(0, NUMBER));
  });
}, () => {
  showErrorModal('Ошибка загрузки данных');
});
