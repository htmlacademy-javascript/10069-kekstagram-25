import {
  SCALE_MIN,
  SCALE_MAX,
  SCALE_STEP
} from './const.js';

const imageUploadPreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadScale = document.querySelector('.img-upload__scale');

let scaleValue = 100;

const imageScaleHandler = (evt) => {
  if (evt.target.classList.contains('scale__control--smaller')) {
    scaleValue -= SCALE_STEP;
  }

  if (evt.target.classList.contains('scale__control--bigger')) {
    scaleValue += SCALE_STEP;
  }

  if (scaleValue < 25) {
    scaleValue = SCALE_MIN;
  }

  if (scaleValue > SCALE_MAX) {
    scaleValue = SCALE_MAX;
  }

  scaleControlValue.value = `${scaleValue}%`;
  scaleControlValue.setAttribute('value', `${scaleValue}%`);
  imageUploadPreview.style.transform = `scale(${(scaleValue / 100)})`;
};


export {
  imageUploadScale,
  imageScaleHandler
};
