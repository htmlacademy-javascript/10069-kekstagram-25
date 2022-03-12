import { createPhotosList } from './data.js';
import { createPictureTemplate } from './templates.js';
import { showPopup } from './popup.js';

const picturesElement = document.querySelector('.pictures');

const photosList = createPhotosList();

const photos = photosList.map((photo) => (createPictureTemplate(photo))).join('');

picturesElement.insertAdjacentHTML('beforeEnd', photos);

/**
 * Проверка, какому объекту в массиве с фотографиями соответствует миниатюра, на которую был произведен клик.
 * Дополнительная проверка, что был произведен клик именно по миниатюре фотографии, а не другому объекту модалки.
 * Показ соответствующей фотографии в большом размере.
 * При нахождении равенства идентификаторов использовано приведение к строке, чтобы:
 *  1) иметь возможность использовать строгое равенство (этого требует линтер);
 *  2) предусмотреть случаи, когда идентификатор может содержать не только цифры.
 */
const pictureClickHandler = (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    const photoData = photosList.find((photo) => (photo.id.toString() === evt.target.dataset.id));
    showPopup(photoData);
  }
};

picturesElement.addEventListener('click', pictureClickHandler);
