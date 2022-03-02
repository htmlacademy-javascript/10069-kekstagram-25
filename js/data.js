import {
  getRandomIntegerInRange,
  isStringNotOverLimit,
  createArrayConsistentNumbers,
  shuffleArray,
  getRandomArrayElement,
  getRandomCountArrayElements
} from './util.js';


const PHOTOS_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MAX_COMMENTS_COUNT = 10;
const AVATAR_COUNT = 6;


const NAMES = [
  'Луи Дагер',
  'Ирвин Пенн',
  'Ги Бурден',
  'Ричард Аведон',
  'Анри Картье-Брессон',
  'Хельмут Ньютон',
  'Андреас Гурский',
  'Энни Лейбовиц',
  'Себастьян Салгаду',
  'Уильям Юджин Смит',
  'Виджи (Артур Феллиг)',
  'Александр Родченко',
  'Стивен Майзел',
  'Диана Арбус',
  'Дэвид Лашапель',
  'Марк Рибу',
  'Эллиотт Эрвитт',
  'Патрик Демаршелье',
  'Мартин Парр',
  'Ричард Керн'
];

const DESCRIPTIONS = [
  'Бездна удовольствия',
  'Когда мне говорят идти на пляж, я не смею отказаться',
  'Вход в море для интровертов',
  'Вообще-то я хотела похвастаться своей новой камерой',
  'Вот и как теперь такую красоту есть?',
  'На таком не стыдно и за хлебушком сгонять. В Италию',
  'Всё целиком я не осилю, оставлю половинку на завтра',
  'Две кружки смородинового морса в день - и никакая простуда не страшна',
  '- Сфоткай меня, как будто я самолет поймала',
  'Домашняя парковка для туфелек',
  'Чтобы добраться до пляжа, каждый раз приходится проходить лабиринт',
  'Первый парень на селе',
  'Голодным лучше не смотреть',
  'Котики украсят любое блюдо',
  'Космические ботиночки - для космических красоточек',
  'Пролетая над Крышей Мира',
  'Вот и прошла генеральная репетиция завтрашнего концерта',
  '"Народный гараж" по-американски',
  'Вот, нашла себе, в чем ходить на ночные свидания с холодильником',
  'Главное - не заблудиться среди этих пальм',
  'Мой обычный обед в школе',
  'При виде такой красоты и утонуть не страшно',
  'Мистер Юджин Гарольд Краб приветствует вас!',
  'Раз, два, три, четыре! Руки выше, ноги шире!',
  `А в Африке,
  А в Африке,
  На чёрной Лимпопо,
  Сидит и плачет
  В Африке
  Печальный Гиппопо`
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


/**
* Заполнение одного комментария-объекта данными. Используется глобальный счетчик ID, чтобы не было комментариев с одинаковым идентификатором.
* @return {object} — комментарий-объект
*/

let commentID = 0;
const createComment = () => (
  {
    id: commentID++,
    avatar: `img/avatar-${getRandomIntegerInRange(1, AVATAR_COUNT)}.svg`,
    message: getRandomCountArrayElements(COMMENTS, 1, 2).join(' '),
    name: getRandomArrayElement(NAMES),
  }
);


/**
* Создание массива из комментариев-объектов.
* @param {number} count — количество комментариев в массиве. По-умолчанию равно глобальной константе "MAX_COMMENTS_COUNT"
* @return {array} — массив из комментариев-объектов
*/

const createCommentsList = (count = MAX_COMMENTS_COUNT) => (
  Array.from({length: getRandomIntegerInRange(1, count)}, createComment)
);


/**
* Заполнение одного элемента-объекта с данными для одной фотографии.
* @param {number} id — идентификатор фотографии из общего массива фотографий
* @return {object} — объект с данными для одной фотографии
*/

const createPhoto = (id) => (
  {
    id: id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[id - 1],
    likes: getRandomIntegerInRange(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: createCommentsList(),
  }
);


const photosRandomIdArray = shuffleArray(createArrayConsistentNumbers(1, PHOTOS_COUNT));

/**
* Создание массива из описаний фотографий.
* @return {array} — массив из описаний фотографий
*/

const createPhotosList = () => (
  photosRandomIdArray.map((id) => (
    createPhoto(id)
  ))
);

isStringNotOverLimit('test test test test', 10);

export {
  createPhotosList
};
