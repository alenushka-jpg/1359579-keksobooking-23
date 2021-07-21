import {adForm, formReset} from './form.js';

const DATA_FETCH_URL =  'https://23.javascript.pages.academy/keksobooking/data';
const DATA_SEND_URL =  'https://23.javascript.pages.academy/keksobooking/';

const templateSuccessMessageInput = document.querySelector('#success').content;
const templateErrorMessageInput = document.querySelector('#error').content;
const successMessageInput = templateSuccessMessageInput.querySelector('.success');
const errorMessageInput = templateErrorMessageInput.querySelector('.error');
const mainInput = document.querySelector('main');
const successInput = successMessageInput.cloneNode(true);
const errorInput = errorMessageInput.cloneNode(true);

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
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError();
    });
};

/**
 * sendFormData - функ-ия отправления данных формы
 */
const sendFormData = (data, onSuccess, onError) => {
  fetch(
    DATA_SEND_URL,
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
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });
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
  successInput.removeEventListener('click', onSuccessMessageClick);
  document.removeEventListener('keydown', onSuccessMessageKeydown);
};

/**
 * Функции закрытия сообщения об не успешной отправке данных
 */
const onErrorMessageKeydown = (evt) => {
  const popUpInput = mainInput.querySelector('.error');
  evt.preventDefault();
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    popUpInput.remove();
    document.removeEventListener('keydown', onErrorMessageKeydown);
  }
};

const onErrorMessageClick = () => {
  const popUpInput = mainInput.querySelector('.error');
  popUpInput.remove();
  errorInput.removeEventListener('click', onErrorMessageClick);
  document.removeEventListener('keydown', onErrorMessageKeydown);
};

/**
 * Создаем сообщение об успешной отправке данных
 */
function createSuccessMessage () {
  mainInput.appendChild(successInput);
  document.addEventListener('keydown', onSuccessMessageKeydown);
  successInput.addEventListener('click', onSuccessMessageClick);
}

function createErrorMessage () {
  mainInput.appendChild(errorInput);
  document.addEventListener('keydown', onErrorMessageKeydown);
  successInput.addEventListener('click', onErrorMessageClick);
}


// adForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   sendFormData(
//     new FormData(evt.target), // данные формы
//     () => {
//       formReset(); // сброс карты и формы в изначальное состояние
//       createSuccessMessage(); // показ попапа об успехе
//     },
//     () => {
//       createErrorMessage(); // показ попапа в случае ошибок
//     },
//   );
// });


export {getDataFromServer, sendFormData, onSuccessMessageKeydown};
