import {createMarker, clearMarker} from './map.js';

const MAX_OFFERS_COUNT = 10;

const priceMap = {
  low: {
    start: 0,
    end: 10000,
  },
  middle: {
    start: 10000,
    end: 50000,
  },
  high: {
    start: 50000,
    end: Infinity,
  },
};
const formFilterElement = document.querySelector('.map__filters');
const fieldFilterElements = formFilterElement.children;
const typeFilter = formFilterElement.querySelector('#housing-type');
const roomsFilter = formFilterElement.querySelector('#housing-rooms');
const priceFilter = formFilterElement.querySelector('#housing-price');
const guestsFilter = formFilterElement.querySelector('#housing-guests');

const filterOffers = ({offer}) => {
  const checkedFeatures = fieldFilterElements.querySelectorAll('input[type="checkbox"]:checked');

  const checkFeature = () => {
    if (offer.features) {
      return [...checkedFeatures].every((feature) => (offer.features.includes(feature.value)));
    }
  };

  const checkType = () => offer.type === typeFilter.value || typeFilter.value === 'any';
  const checkRooms = () => offer.rooms === +roomsFilter.value || roomsFilter.value === 'any';
  const checkGuests = () => offer.guests === +guestsFilter.value || guestsFilter.value === 'any';
  const checkPrice = () => priceFilter.value === 'any' ? true :
    offer.price >= priceMap[priceFilter.value].start && offer.price < priceMap[priceFilter.value].end;

  if (
    checkType() &&
    checkRooms() &&
    checkGuests() &&
    checkPrice() &&
    checkFeature()
  ) {
    return true;
  }
};

const renderPinList = (offers) => {
  clearMarker();
  offers
    .slice()
    .filter(filterOffers)
    .slice(0, MAX_OFFERS_COUNT)
    .forEach((offer) => {
      createMarker(offer);
    });
};

const setFilterChange = (cb) => {
  formFilterElement.addEventListener('change', () => {
    cb();
  });
};

const resetFilter = () => {
  formFilterElement.reset();
};

export {renderPinList, setFilterChange, resetFilter };
