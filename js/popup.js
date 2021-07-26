import {isEscapeEvent} from './util.js';

const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorMessage = errorPopup.querySelector('.error__message');
const closeErrorButton = errorPopup.querySelector('.error__button');

const showSuccessModal = () => {
  document.body.appendChild(successPopup);
  const onEscKeyDown = (evt) => {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      successPopup.remove();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };
  document.addEventListener('keydown', onEscKeyDown);
  successPopup.addEventListener('click', () => {
    successPopup.remove();
    document.removeEventListener('keydown', onEscKeyDown);
  });
};

const showErrorModal = (message) => {
  errorMessage.textContent = message;
  document.body.appendChild(errorPopup);
  const onEscKeyDown = (evt) => {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      errorPopup.remove();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };
  document.addEventListener('keydown', onEscKeyDown);
  closeErrorButton.addEventListener('click', () => {
    errorPopup.remove();
    document.removeEventListener('keydown', onEscKeyDown);
  });
  errorPopup.addEventListener('click', () => {
    errorPopup.remove();
    document.removeEventListener('keydown', onEscKeyDown);
  });
};

export {showSuccessModal, showErrorModal};

