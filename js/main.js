import './pictures.js';
import './modal-big-picture.js';
import './modal-upload-image.js';
import './image-scale.js';
import './effects.js';
import './validate.js';

import { getData } from './fetch.js';
import {
  renderPhotosList,
  getSelectedImageCard
} from './pictures.js';

getData(
  (data) => {
    renderPhotosList(data);
    getSelectedImageCard(data);
  },
);
