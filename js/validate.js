import { stopEscPropagation } from './util.js';
import {
  HASHTAGS_MAX_COUNT,
  HASHTAGS_MIN_SYMBOLS,
  HASHTAGS_MAX_SYMBOLS,
  HASHTAGS_REGEX,
  COMMENT_MAX_LENGTH,
} from './const.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const hashtagsElement = imageUploadForm.querySelector('.text__hashtags');
const commentElement = imageUploadForm.querySelector('.text__description');

hashtagsElement.addEventListener('keydown', stopEscPropagation);
commentElement.addEventListener('keydown', stopEscPropagation);


/**
 * Разбиение строки с хэштегами на массив из отдельных хэштегов.
 * Все символы в строке переводятся в нижний регистр для более корректного сравнения хэштегов друг с другом.
 * Разделение хэштегов друг от друга происходит по символу пробела.
 * Удаляются, если есть, пробелы по краям и следующие подряд друг за другом.
 *
 * @param {string} hashtagsString — строка из хэштегов.
 * @return {array} — массив из отдельных хэштегов.
 */
const splitHashtags = (hashtagsString) => (
  hashtagsString.trim().toLowerCase().split(' ').filter((tag) => (tag !== ''))
);

/**
 * Проверка, начинается ли хэштег с символа решетки (#).
 */
const validateStartHash = (value) => (
  splitHashtags(value).every((tag) => (tag.startsWith('#')))
);

/**
 * Проверка, не состоит ли хэштег только из символа решетки (#).
 */
const validateTagOnlyHash = (value) => (
  !(splitHashtags(value).some((tag) => (tag.startsWith('#') && tag.length === 1)))
);

/**
 * Проверка на превышение количества хэштегов.
 */
const validateTagsCount = (value) => (
  splitHashtags(value).length <= HASHTAGS_MAX_COUNT
);

/**
 * Проверка на наличие повторяющихся хэштегов.
 */
const validateTagsDuplicate = (value) => {
  const hashtags = splitHashtags(value);
  return !(hashtags.some((tag, index) => hashtags.indexOf(tag) !== index));
};

/**
 * Проверка на минимальную и максимальну длину хэштега.
 */
const validateTagLength = (value) => (
  splitHashtags(value).every((tag) => (tag.length >= HASHTAGS_MIN_SYMBOLS && tag.length <= HASHTAGS_MAX_SYMBOLS))
);

/**
 * Проверка хэштегов на соответствие регулярному выражению.
 */
const validateTagRegEx = (value) => (
  splitHashtags(value).every((tag) => (tag.match(HASHTAGS_REGEX)))
);

/**
 * Проверка комментария на максимальное количество символов.
 */
const validateCommentLength = (value) => (
  value.length <= COMMENT_MAX_LENGTH
);


const pristine = new Pristine(imageUploadForm, {
  classTo: 'text__text',
  errorClass: 'text__text--invalid',
  successClass: 'text__text--valid',
  errorTextParent: 'text__text',
  errorTextTag: 'span',
  errorTextClass: 'text__error'
});

const activatePristine = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const destroyPristine = () => {
  pristine.destroy();
};


pristine.addValidator(hashtagsElement, validateStartHash, 'Хэштег должен начинаться с символа решётки (#)');
pristine.addValidator(hashtagsElement, validateTagOnlyHash, 'Хэштег не должен состоять только из символа решётки (#)');
pristine.addValidator(hashtagsElement, validateTagsCount, `Не больше ${HASHTAGS_MAX_COUNT} хэштегов`);
pristine.addValidator(hashtagsElement, validateTagsDuplicate, 'Хэштеги не должны повторяться');
pristine.addValidator(hashtagsElement, validateTagLength, `Длина хэштега - от ${HASHTAGS_MIN_SYMBOLS} до ${HASHTAGS_MAX_SYMBOLS} символов, включая решётку`);
pristine.addValidator(hashtagsElement, validateTagRegEx, 'Хештег должен состоять только из букв и цифр');
pristine.addValidator(commentElement, validateCommentLength, `Максимальная длина комментария - ${COMMENT_MAX_LENGTH} символов`);


export {
  activatePristine,
  destroyPristine
};
