import { createPopupCommentTemplate } from './templates.js';
import { COMMENTS_PORTION } from './const.js';
import {
  isEscPress,
  isMouseClick
} from './util.js';


const bodyElement = document.querySelector('body');
const bigPictureModal = document.querySelector('.big-picture');
const modalCloseButton = bigPictureModal.querySelector('.big-picture__cancel');
const bigPicture = bigPictureModal.querySelector('.big-picture__img img');
const photoDescription = bigPictureModal.querySelector('.social__caption');
const likesCounter = bigPictureModal.querySelector('.likes-count');
const commentsShownCounter = bigPictureModal.querySelector('.comments-shown');
const commentsTotalCounter = bigPictureModal.querySelector('.comments-total');
const commentsContainer = bigPictureModal.querySelector('.social__comments');
const showMoreCommentsButton = bigPictureModal.querySelector('.social__comments-loader');

let SHOWN_COMMENTS_COUNT = 0;


/**
 * Показ попапа с большой фотографией и списком комментариев.
 * Скрытие попапа происходит при клипе на кнопку закрытия и нажатие клавиши Escape.
 *
 * @param {object} data — объект с данными фотографии и комментариев.
 */
const showPopup = ( {url, description, likes, comments} ) => {

  const commentsList = comments.slice();

  const renderComments = () => {
    commentsList.slice(SHOWN_COMMENTS_COUNT, SHOWN_COMMENTS_COUNT + COMMENTS_PORTION)
      .forEach((comment) => {
        commentsContainer.insertAdjacentHTML('beforeEnd', createPopupCommentTemplate(comment));
      });
  };

  const showMoreCommentsHandler = () => {
    renderComments();
    SHOWN_COMMENTS_COUNT += COMMENTS_PORTION;
    if (SHOWN_COMMENTS_COUNT >= commentsList.length) {
      SHOWN_COMMENTS_COUNT = commentsList.length;
      showMoreCommentsButton.classList.add('hidden');
    }
    commentsShownCounter.textContent = SHOWN_COMMENTS_COUNT;
  };

  const hidePopupHandler = (evt) => {
    evt.preventDefault();
    if (isEscPress(evt) || isMouseClick(evt)) {
      bigPictureModal.classList.add('hidden');
      bodyElement.classList.remove('modal-open');
      document.removeEventListener('keydown', hidePopupHandler);
      showMoreCommentsButton.removeEventListener('click', showMoreCommentsHandler);
      modalCloseButton.removeEventListener('click', hidePopupHandler);
      SHOWN_COMMENTS_COUNT = 0;
    }
  };

  const showMoreComments = () => {
    if (commentsList.length > COMMENTS_PORTION) {
      SHOWN_COMMENTS_COUNT = COMMENTS_PORTION;
      showMoreCommentsButton.classList.remove('hidden');
      showMoreCommentsButton.addEventListener('click', showMoreCommentsHandler);
    }
  };

  bigPicture.src = url;
  bigPicture.alt = description;
  photoDescription.textContent = description;
  likesCounter.textContent = likes;
  commentsContainer.textContent = '';

  showMoreCommentsButton.classList.add('hidden');

  renderComments(commentsList);
  showMoreComments(commentsList);

  commentsShownCounter.textContent = commentsList.length <= COMMENTS_PORTION ? commentsList.length : SHOWN_COMMENTS_COUNT;
  commentsTotalCounter.textContent = commentsList.length;

  bodyElement.classList.add('modal-open');
  bigPictureModal.classList.remove('hidden');

  document.addEventListener('keydown', hidePopupHandler);
  modalCloseButton.addEventListener('click', hidePopupHandler);
};


export {
  showPopup
};
