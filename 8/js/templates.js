/**
 * Вывод шаблона изображения случайного пользователя.
 *
 * @param {object} data — объект с данными фотографии пользователя.
 * @return {string} — шаблонная строка с HTML-шаблоном изображения.
 */
const createPictureTemplate = ( {url, description, id, comments, likes} ) => (
  `<a href="#" class="picture">
    <img class="picture__img" src="${url}" width="182" height="182" alt="${description}" data-id="${id}">
    <p class="picture__info">
      <span class="picture__comments">${comments.length}</span>
      <span class="picture__likes">${likes}</span>
    </p>
  </a>`
);


/**
 * Вывод шаблона комментария из списка комментариев при просмотре большой фотографии.
 *
 * @param {object} data — объект с данными комментария пользователя.
 * @return {string} — шаблонная строка с HTML-шаблоном комментария.
 */
const createPopupCommentTemplate = ( {avatar, name, message} ) => (
  `<li class="social__comment">
    <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text">${message}</p>
</li>`
);


export {
  createPictureTemplate,
  createPopupCommentTemplate
};
