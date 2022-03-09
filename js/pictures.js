import { createPhotosList } from './data.js';
import { createPictureTemplate } from './templates.js';

const picturesElement = document.querySelector('.pictures');

const photos = createPhotosList()
  .map((photo) => (createPictureTemplate(photo)))
  .join('');

picturesElement.insertAdjacentHTML('beforeEnd', photos);
