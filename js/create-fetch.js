const DATA_FETCH_URL =  'https://23.javascript.pages.academy/keksobooking/data';

const templateSuccessMessageInput = document.querySelector('#success').content;
const successMessageInput = templateSuccessMessageInput.querySelector('.success');
const succesInput = successMessageInput.cloneNode(true);

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

/**
 * Функции закрытия сообщения об успещной отправке данных
 */
const onSuccessMessageKeydown = (evt) => {
  const popUpInput = mainInput.querySelector('.success');
  evt.preventDefault();
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    popUpInput.remove();
    document.removeEventListener('keydown', onSuccessMessageKeydown);
  }
};

const onSuccessMessageClick = () => {
  const popUpInput = mainInput.querySelector('.success');
  popUpInput.remove();
  succesInput.removeEventListener('click', onSuccessMessageClick);
  document.removeEventListener('keydown', onSuccessMessageKeydown);
};

export {getDataFromServer, sendFormData};
