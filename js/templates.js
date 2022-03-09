/**
* Вывод шаблона изображения случайного пользователя
* @param {number} id — идентификатор пользователя
* @return {string} — шаблонная строка с HTML-шаблоном изображения
*/

const createPictureTemplate = ({ url, description, comments, likes }) => (
  `<a href="#" class="picture">
    <img class="picture__img" src="${url}" width="182" height="182" alt="${description}">
    <p class="picture__info">
      <span class="picture__comments">${comments.length}</span>
      <span class="picture__likes">${likes}</span>
    </p>
  </a>`
);

export {
  createPictureTemplate
};
