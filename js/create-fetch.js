const DATA_FETCH_URL =  'https://23.javascript.pages.academy/keksobooking/data';

/**
 * getDataFromServer - функ-ия получения данных с сервера
 */
const getDataFromServer = (onSuccess, onError) => {
  fetch(
    DATA_FETCH_URL,
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then(onSuccess)
    .catch(onError);
};

/**
 * sendFormData - функ-ия отправления данных формы
 */
const sendFormData = (address, data, onSuccess, onError) => {
  fetch(
    address,
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then(onSuccess)
    .catch(onError);
};

export {getDataFromServer, sendFormData};
