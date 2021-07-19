const DATA_FETCH_URL =  'https://23.javascript.pages.academy/keksobooking/data';

/**
 * Получаем данные с сервера
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
