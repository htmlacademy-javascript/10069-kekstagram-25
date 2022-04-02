import { RANDOM_PHOTOS_COUNT } from './const.js';
import { shuffleArray } from './util.js';
import { renderPhotosList } from './pictures.js';
import { debounce } from './util.js';

const imageFilter = document.querySelector('.img-filters');

imageFilter.classList.remove('img-filters--inactive');


const removeActiveClass = () => {
  const activeFilterButton = document.querySelector('.img-filters__button--active');
  activeFilterButton.classList.remove('img-filters__button--active');
};

const removePhotos = () => {
  const images = document.querySelectorAll('.picture');
  if (images) {
    images.forEach((element) => {
      element.remove();
    });
  }
};

/**
 * Сортировка фотографий по заданным правилам.
 * Перерисовка превьюшек на основе отсортированного массива фотографий.
 *
 * @param {array} photosArray — массив с данными по каждой фотографии.
 */
const renderFilteredPhotos = (photosArray) => {
  const filter = {
    'filter-default': () => (
      photosArray.slice()
    ),
    'filter-random': () => (
      shuffleArray(photosArray.slice()).slice(0, RANDOM_PHOTOS_COUNT)
    ),
    'filter-discussed': () => (
      photosArray.slice().sort((photoA, photoB) => (
        photoB.comments.length - photoA.comments.length)
      )
    )
  };

  const imageFilterClickHandler = (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      removeActiveClass();
      evt.target.classList.add('img-filters__button--active');
      removePhotos();
      renderPhotosList(filter[evt.target.id]());
    }
  };

  imageFilter.addEventListener('click', debounce(imageFilterClickHandler));
};


export {
  renderFilteredPhotos
};
