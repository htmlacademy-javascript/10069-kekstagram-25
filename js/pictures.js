import { createPictureTemplate } from './templates.js';
import { showBigPictureModal } from './modal-big-picture.js';


const picturesContainer = document.querySelector('.pictures');


/**
 * Рендер (показ) превьюшек фотографий на странице на основании массива с данными для фотографий.
 *
 * @param {array} photosArray — массив с данными по каждой фотографии.
 */
const renderPhotosList = (photosArray) => {
  const photos = photosArray.map((photo) => (createPictureTemplate(photo))).join('');
  picturesContainer.insertAdjacentHTML('beforeEnd', photos);
};


/**
 * Проверка, какому объекту в массиве с фотографиями соответствует миниатюра, на которую был произведен клик.
 * Дополнительная проверка, что был произведен клик именно по миниатюре фотографии, а не другому объекту модалки.
 * Показ соответствующей фотографии в большом размере.
 * При нахождении равенства идентификаторов использовано приведение к строке, чтобы:
 *  1) иметь возможность использовать строгое равенство (этого требует линтер);
 *  2) предусмотреть случаи, когда идентификатор может содержать не только цифры.
 * @param {array} photosArray — массив с данными по каждой фотографии.
 */
const getSelectedImageCard = (photosArray) => {
  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      const photoCard = photosArray.find((photo) => (photo.id.toString() === evt.target.dataset.id));
      showBigPictureModal(photoCard);
    }
  });
};


export {
  renderPhotosList,
  getSelectedImageCard
};
