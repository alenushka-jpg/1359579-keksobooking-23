import {disableAdForm, disableFiltersForm, showStatusMessage}from './form.js';
import {addMarkers, activateMap } from './map.js';
import {getDataFromServer} from './create-fetch.js';

disableFiltersForm();
disableAdForm();

getDataFromServer((advertsData) => {
  activateMap();
  addMarkers(advertsData);
}, () => {
  showStatusMessage('error');
});
