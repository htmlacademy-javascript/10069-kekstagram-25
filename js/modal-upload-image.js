import {
  isEscPress,
  isMouseClick
} from './util.js';

import {
  FILE_TYPES,
  DEFAULT_PHOTO_URL
} from './const.js';

import {
  imageUploadScale,
  imageScaleClickHandler
} from './image-scale.js';

import {
  effectsList,
  effectsListChangeHandler
} from './effects.js';

import {
  activatePristine,
  destroyPristine
} from './validate.js';

const bodyElement = document.querySelector('body');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadButton = imageUploadForm.querySelector('.img-upload__start input[type=file]');
const imageUploadModal = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadPreview = imageUploadModal.querySelector('.img-upload__preview img');
const imageUploadModalCloseButton = imageUploadModal.querySelector('.img-upload__cancel');
const scaleControlValue = document.querySelector('.scale__control--value');
const effectLevelSlider = document.querySelector('.effect-level__slider');


/**
 * Загрузка собственного изображения и подстановка в модальное окно.
 * При выборе файла с неподходящим разрешением показывается фото-заглушка.
 */
const uploadPhoto = () => {
  const file = imageUploadButton.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => (fileName.endsWith(it)));
  if (matches) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      imageUploadPreview.src = reader.result;
    });
  } else {
    imageUploadPreview.src = DEFAULT_PHOTO_URL;
  }
};


/**
 * Закрытие модального окна и очищение полей формы до состояния по-умолчанию.
 */
const closeUploadImageModal = (evt) => {
  if (isEscPress(evt) || isMouseClick(evt)) {
    imageUploadModal.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', closeUploadImageModal);
    imageUploadModalCloseButton.removeEventListener('click', closeUploadImageModal);
    imageUploadForm.removeEventListener('submit', activatePristine);
    destroyPristine();
    imageUploadScale.removeEventListener('click', imageScaleClickHandler);
    effectsList.removeEventListener('change', effectsListChangeHandler);
    imageUploadButton.removeEventListener('change', uploadPhoto);
    imageUploadForm.reset();
    imageUploadButton.value = '';
    imageUploadPreview.style = '';
    imageUploadPreview.classList = '';
  }
};


/**
 * Показ модального окна с загрузкой своей фотографии и наложением эффектов.
 * Скрытие модалки происходит при клипе на кнопку закрытия и нажатие клавиши ESC.
 */
const showUploadImageModal = () => {
  bodyElement.classList.add('modal-open');
  imageUploadModal.classList.remove('hidden');
  document.addEventListener('keydown', closeUploadImageModal);
  imageUploadModalCloseButton.addEventListener('click', closeUploadImageModal);
  imageUploadForm.addEventListener('submit', activatePristine);
  imageUploadScale.addEventListener('click', imageScaleClickHandler);
  effectsList.addEventListener('change', effectsListChangeHandler);
  scaleControlValue.value = '100%';
  scaleControlValue.setAttribute('value', '100%');
  imageUploadPreview.style.transform = 'scale(1)';
  effectLevelSlider.classList.add('hidden');
};

imageUploadButton.addEventListener('change', uploadPhoto);
imageUploadButton.addEventListener('change', showUploadImageModal);
