const setImageScale = () => {
  const scaleControlValue = document.querySelector('.scale__control--value');
  const imgUploadScale = document.querySelector('.img-upload__scale');
  const imgUploadPreview = document.querySelector('.img-upload__preview img');

  const SCALE_MIN = 25;
  const SCALE_MAX = 100;
  const SCALE_STEP = 25;
  let scaleValue = 100;

  scaleControlValue.value = `${scaleValue}%`;

  const imageScaleHandler = (evt) => {
    if (evt.target.classList.contains('scale__control--smaller')) {
      scaleValue -= SCALE_STEP;
    }

    if (evt.target.classList.contains('scale__control--bigger')) {
      scaleValue += SCALE_STEP;
    }

    if (scaleValue < SCALE_MIN) {
      scaleValue = SCALE_MIN;
    }

    if (scaleValue > SCALE_MAX) {
      scaleValue = SCALE_MAX;
    }

    scaleControlValue.value = `${scaleValue}%`;
    imgUploadPreview.style.transform = `scale(${(scaleValue / 100)})`;
  };
  imgUploadScale.addEventListener('click', imageScaleHandler);
};

setImageScale();
