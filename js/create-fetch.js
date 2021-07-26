const DATA_FETCH_URL =  'https://23.javascript.pages.academy/keksobooking/data';
const DATA_SEND_URL =  'https://23.javascript.pages.academy/keksobooking/';

/**
 * getDataFromServer - функ-ия получения данных с сервера
 */
const getDataFromServer = (onSuccess, onError) => {
  fetch(DATA_FETCH_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      onError(`${response.status} ${response.statusText}`);
    })
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      onError(`Ошибка загрузки данных ${error}`);
    });
};

/**
 * sendFormData - функ-ия отправления данных формы
 */
const sendFormData = (body, onSuccess, onError) => {
  fetch(
    DATA_SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess('Ваше объявление успешно размещено!');
      }
      else {
        onError('Не удалось отправить форму. Попробуйте ещё раз!');
      }
    })
    .catch(() => {
      onError('Не удалось отправить форму. Попробуйте ещё раз!');
    });
};

export {getDataFromServer, sendFormData};
