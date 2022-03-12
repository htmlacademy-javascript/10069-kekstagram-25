import {
  isEscPress,
  isMouseClick
} from './util.js';


const bodyElement = document.querySelector('body');
const imageUploadButton = document.querySelector('.img-upload__start input[type=file]');
const imageUploadModal = document.querySelector('.img-upload__overlay');


const imgUploadCancel = imageUploadModal.querySelector('.img-upload__cancel');


const hideImageUploadModalHandler = (evt) => {
  evt.preventDefault();
  if (isEscPress(evt) || isMouseClick(evt)) {
    imageUploadModal.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    window.removeEventListener('keydown', hideImageUploadModalHandler);
    imgUploadCancel.removeEventListener('click', hideImageUploadModalHandler);

    imageUploadButton.value = '';
  }
};

/**
 * Показ модального окна с загрузкой своей фотографии и наложением эффектов.
 * Скрытие модалки происходит при клипе на кнопку закрытия и нажатие клавиши "Escape".
 *
 * @param {object} data — объект с данными фотографии и комментариев.
 */
const showImageUploadModal = () => {
  bodyElement.classList.add('modal-open');
  imageUploadModal.classList.remove('hidden');

  window.addEventListener('keydown', hideImageUploadModalHandler);
  imgUploadCancel.addEventListener('click', hideImageUploadModalHandler);
};

const imageUploadHandler = () => {
  showImageUploadModal();
};

imageUploadButton.addEventListener('change', imageUploadHandler);
