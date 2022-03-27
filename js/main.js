import './pictures.js';
import './modal-big-picture.js';
import './modal-upload-image.js';
import './image-scale.js';

import {
  renderPhotosList,
  getSelectedImageCard
} from './pictures.js';

import { getData } from './fetch.js';
import { showErrorLoadingModal } from './modal-messages.js';


getData(
  (data) => {
    renderPhotosList(data);
    getSelectedImageCard(data);
  },
  showErrorLoadingModal
);
