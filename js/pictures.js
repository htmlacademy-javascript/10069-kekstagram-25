import { createPhotosList } from './data.js';

const picturesElement = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photosList = createPhotosList();

const picturesFragment = document.createDocumentFragment();

photosList.forEach(( {url, comments, likes} ) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  picturesFragment.appendChild(pictureElement);
});

picturesElement.appendChild(picturesFragment);
