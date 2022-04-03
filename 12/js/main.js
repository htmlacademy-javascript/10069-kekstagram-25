import './pictures.js';
import './modal-big-picture.js';
import './modal-upload-image.js';
import './image-scale.js';
import './filter.js';

import { getData } from './fetch.js';
import {
  renderPhotosList,
  getSelectedImageCard
} from './pictures.js';
import { renderFilteredPhotos } from './filter.js';
import { showErrorLoadingModal } from './modal-messages.js';


getData(
  (data) => {
    renderPhotosList(data);
    renderFilteredPhotos(data);
    getSelectedImageCard(data);
  },
  showErrorLoadingModal
);
