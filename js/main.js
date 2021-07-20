import {disableAdForm, disableFiltersForm}from './form.js';
import {addMarkers, activateMap} from './map.js';
import {getDataFromServer} from './create-fetch.js';


disableFiltersForm();
disableAdForm();

getDataFromServer((advertsData) => {
  activateMap();
  addMarkers(advertsData);
}, () => {
  console.log('Ошибка');
})


