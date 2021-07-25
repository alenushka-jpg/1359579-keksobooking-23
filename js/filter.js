const ANY = 'any';

const houseType = document.querySelector('#housing-type');
const housePrice = document.querySelector('#housing-rooms');
const houseRooms = document.querySelector('#room_number');
const houseGuests = document.querySelector('#housing-guests');

const onChangeHandler = () => {
  const houseType = selectHouseType.value;
  const housePrice = selectHousePrice.value;
  const houseRooms = selectHouseRooms.value.toString();
  const houseGuests = selectHouseGuests.value.toString();

  const filteredArray = () => {
    const isType = true;
    const isRooms = true;
    const isGuests = true;
    const isPrice = true;
    const isFeatures = true;

    const checkedFeatures = document.querySelectorAll('input[name="features"]:checked');
    if (checkedFeatures.length) {
      checkedFeatures.forEach((feature) => {
        if (element.offer.features.indexOf(feature.value) === -1) {
          isFeatures = false;
        }
      });
    };
    if (houseType !== ANY) {
      isType = element.offer.type === houseType;
    }
    if (houseRooms !== ANY) {
      isRooms = element.offer.rooms.toString() === houseRooms;
    }
    if (houseGuests !== ANY) {
      isGuests = element.offer.guests.toString() === houseGuests;
    }
    if (housePrice !== ANY) {
      const elementPrice = element.offer.price.toString();
      const price
      if (elementPrice < window.data.price.min) {
        price = HousePriceValue.LOW;
      }
      if (elementPrice > window.data.price.max) {
        price = HousePriceValue.HIGH;
      }
      if (elementPrice < window.data.price.max && elementPrice > window.data.price.min) {
        price = HousePriceValue.MIDDLE;
      }
      isPrice = price === housePrice;
    }
    return isType && isRooms && isGuests && isPrice && isFeatures;
  };
  render(loadedPins.filter(filteredArray));
};
