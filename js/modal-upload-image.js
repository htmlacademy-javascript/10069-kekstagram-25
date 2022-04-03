import {
  isEscPress,
  isMouseClick
} from './util.js';
import {
  FILE_TYPES,
  DEFAULT_PHOTO_URL
} from './const.js';
import { sendData } from './fetch.js';
import {
  showSuccessModal,
  showErrorModal
} from './modal-messages.js';
import {
  imageUploadScale,
  imageScaleClickHandler
} from './image-scale.js';
import {
  effectsList,
  effectsListChangeHandler
} from './effects.js';
import { validatePristine } from './validate.js';


const bodyElement = document.querySelector('body');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadSubmitButton = document.querySelector('.img-upload__submit');
const imageUploadButton = imageUploadForm.querySelector('.img-upload__start input[type=file]');
const imageUploadModal = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadPreview = imageUploadModal.querySelector('.img-upload__preview img');
const imageUploadModalCloseButton = imageUploadModal.querySelector('.img-upload__cancel');
const scaleControlValue = document.querySelector('.scale__control--value');
const effectLevelSlider = document.querySelector('.effect-level__slider');


/**
 * Блокировка кнопки Submit на время отправки данных на сервер.
 * Отображение надписи для уведомления пользователя о прочессе отправки.
 */
const blockSubmitButton = () => {
  imageUploadSubmitButton.disabled = true;
  imageUploadSubmitButton.textContent = 'Отправляется...';
};


/**
 * Разблокировка кнопки Submit на время отправки данных на сервер.
 * Как при удачной отправке данных, так и при неудачной.
 */
const unblockSubmitButton = () => {
  imageUploadSubmitButton.disabled = false;
  imageUploadSubmitButton.textContent = 'Опубликовать';
};


/**
 * Загрузка собственного изображения и подстановка в модальное окно.
 * При выборе файла с неподходящим расширением показывается фото-заглушка.
 */
const uploadPhoto = () => {
  const file = imageUploadButton.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => (fileName.endsWith(it)));

  if (matches) {
    imageUploadPreview.src = URL.createObjectURL(file);
  } else {
    imageUploadPreview.src = DEFAULT_PHOTO_URL;
  }
};


/**
 * Приведение модального окна и полей формы в состояние по-умолчанию.
 */
const setUploadImageModalDefault = () => {
  imageUploadModal.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  unblockSubmitButton();
  imageUploadForm.reset();
  imageUploadButton.value = '';
  imageUploadPreview.style = '';
  imageUploadPreview.classList = '';
  scaleControlValue.value = '100%';
  scaleControlValue.setAttribute('value', '100%');
  imageUploadPreview.style.transform = 'scale(1)';
};


/**
 * Проверка полей формы на валидность.
 * Показ модального окна с сообщением об успешной/неуспешной отправке данных на сервер.
 * Приведение модального окна и полей формы в состояние по-умолчанию.
 */
const setFormSubmitHandler = (evt) => {
  evt.preventDefault();
  if (validatePristine()) {
    blockSubmitButton();
    sendData(
      () => {
        showSuccessModal();
        setUploadImageModalDefault();
      },
      () => {
        showErrorModal();
        setUploadImageModalDefault();
      },
      new FormData(evt.target),
    );
  }
};


/**
 * Закрытие модального окна и очищение полей формы до состояния по-умолчанию.
 */
const closeUploadImageModal = (evt) => {
  if (isEscPress(evt) || isMouseClick(evt)) {
    document.removeEventListener('keydown', closeUploadImageModal);
    imageUploadModalCloseButton.removeEventListener('click', closeUploadImageModal);
    imageUploadForm.removeEventListener('submit', setFormSubmitHandler);
    imageUploadScale.removeEventListener('click', imageScaleClickHandler);
    effectsList.removeEventListener('change', effectsListChangeHandler);
    setUploadImageModalDefault();
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
  imageUploadForm.addEventListener('submit', setFormSubmitHandler);
  imageUploadScale.addEventListener('click', imageScaleClickHandler);
  effectsList.addEventListener('change', effectsListChangeHandler);
  effectLevelSlider.classList.add('hidden');
};

imageUploadButton.addEventListener('change', uploadPhoto);
imageUploadButton.addEventListener('change', showUploadImageModal);
