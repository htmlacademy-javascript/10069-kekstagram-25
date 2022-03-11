import { createPopupCommentTemplate } from './templates.js';


const bodyElement = document.querySelector('body');
const popupElement = document.querySelector('.big-picture');
const bigPictureCancel = popupElement.querySelector('.big-picture__cancel');
const popupImage = popupElement.querySelector('.big-picture__img').querySelector('img');
const photoCaption = popupElement.querySelector('.social__caption');
const popupLikesCount = popupElement.querySelector('.likes-count');
const popupCommentsCount = popupElement.querySelector('.comments-count');
const commentsContainer = popupElement.querySelector('.social__comments');
const commentCount = popupElement.querySelector('.social__comment-count');
const commentsLoader = popupElement.querySelector('.comments-loader');

const isEscPress = (evt) => (evt.key === ('Escape' || 'Esc'));
const isMouseClick = (evt) => (evt.type === 'click');

const hidePopupHandler = (evt) => {
  evt.preventDefault();
  if (isEscPress(evt) || isMouseClick(evt)) {
    popupElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    window.removeEventListener('keydown', hidePopupHandler);
    bigPictureCancel.removeEventListener('click', hidePopupHandler);
  }
};

/**
 * Показ попапа с большой фотографией и списком комментариев.
 * Скрытие попапа происходит при клипе на кнопку закрытия и нажатие клавиши Escape.
 *
 * @param {object} data — объект с данными фотографии и комментариев.
 */
const showPopup = ( {url, description, likes, comments} ) => {
  const commentsList = comments.map((comment) => (createPopupCommentTemplate(comment))).join('');

  popupImage.src = url;
  popupImage.alt = description;
  photoCaption.textContent = description;
  popupLikesCount.textContent = likes;
  popupCommentsCount.textContent = comments.length;
  commentsContainer.innerHTML = commentsList;

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bodyElement.classList.add('modal-open');
  popupElement.classList.remove('hidden');

  window.addEventListener('keydown', hidePopupHandler);
  bigPictureCancel.addEventListener('click', hidePopupHandler);
};


export {
  showPopup
};
