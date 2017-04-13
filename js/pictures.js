'use strict';

var pictureTemplate = document.getElementById('picture-template').content; // находим шаблон для фото
var photoList = document.querySelector('.pictures'); // находим контейнер, в который потом вставим фрагмент с фотографиями
var galleryOverlay = document.querySelector('.gallery-overlay'); // находим модальное окно с увеличенным фото
var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
var uploadSelectImage = document.getElementById('upload-select-image'); // форма загрузки фотографии
var uploadFile = uploadSelectImage.querySelector('#upload-file'); // input type="file"
var uploadOverlay = document.querySelector('.upload-overlay'); // скрытое окно с фильтрами

var userComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var randomUrl = fillTheArray(1, 25); // заполняем массив значениями от min до max
randomUrl = randomUrl.sort(sortMethod); // сортируем массив в случайном порядке
var randomLikes = fillTheArray(15, 200);
randomLikes = randomLikes.sort(sortMethod);
var photos = generatePhotos(); // массив с объектами
var fragmentPhotos = document.createDocumentFragment(); // создаем фрагмент для вставки. Фрагмент начинается со первого индекса, нулевой вставляется по дефолду

photos.forEach(function (photo, i) {
  var photoNode = renderPhoto(photo, i);
  fragmentPhotos.appendChild(photoNode);
});

photoList.appendChild(fragmentPhotos); // вставляем фрагмент на страницу
uploadSelectImage.classList.remove('invisible');

uploadOverlay.classList.add('invisible'); // скрываем форму кадрирования изображения

galleryOverlayClose.addEventListener('click', function () {
  closeModal();
});

galleryOverlayClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closeModal();
  }
});

uploadFile.addEventListener('change', function (evt) {
  if (uploadFile.value !== '') {
    openUploadPopap();
  }
  return;
});

uploadSelectImage.querySelector('label').addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    uploadFile.click();
  }
});

document.getElementById('upload-cancel').addEventListener('click', function () { // кликаем на закрытие окна с фильтрами, открывается окно загрузки файла
  closeUploadPopap();
  uploadFile.click();
});

uploadOverlay.querySelector('textarea[name="upload-description"]').addEventListener('keydown', function (evt) { // если в фокусе поле ввода коментария то не срабатывает esc на закрывтие окна
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
});

openModalWindowPhoto(photoList, renderPopupPhoto); // передаем параметры в функцию открытия попап с большим фото

function openModalWindowPhoto(element, cb) { // на входе элемент обертка для всех фото, второй - функция прорисовки модального окна с фоткой
  element.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.nodeName === 'IMG') {
      var idPhoto = target.dataset;
      idPhoto = idPhoto.id;
      cb(idPhoto);
      openModal();
    } else if (target.className === 'picture') {
      idPhoto = target.firstElementChild.dataset;
      idPhoto = idPhoto.id;
      cb(idPhoto);
      openModal();
    } else {
      return;
    }
  });
}

function renderPopupPhoto(idPhoto) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = photos[idPhoto].url; // записываем урл фотографии по дефолту
  galleryOverlay.querySelector('.likes-count').textContent = photos[idPhoto].likes; // записываем количество лайков по дефолту
  galleryOverlay.querySelector('.comments-count').innerHTML = photos[idPhoto].comments.length; // записываем комментарии к фото по дефолту
// Вставка комментариев в модальнике
// var commentListNode = galleryOverlay.querySelector('.gallery-overlay-controls-comments');
// photos[0].comments.forEach(function(comment) {
//  var commentNode = document.createElement('div');
//  commentNode.classList.add('picture-comment');
//  commentNode.innerText = comment;
//  commentListNode.insertBefore(commentNode, commentListNode.querySelector('.comments-count'));
// });
}

function openModal() {
  galleryOverlay.classList.remove('invisible'); // открываем фото по дефолту
  document.addEventListener('keydown', onPopupEscPress);
  galleryOverlayClose.focus();
}

function closeModal() {
  galleryOverlay.classList.add('invisible');
  document.removeEventListener('keydown', onPopupEscPress);
}

function onPopupEscPress(evt) { // при нажатии esc закрываем окно
  if (evt.keyCode === 27) {
    closeModal();
  }
}

function openUploadPopap() {
  uploadOverlay.classList.remove('invisible');
  document.addEventListener('keydown', onUploadPopapEscPress);
}

function closeUploadPopap() {
  uploadOverlay.classList.add('invisible');
  document.removeEventListener('keydown', onUploadPopapEscPress);
}

function onUploadPopapEscPress(evt) { // при нажатии esc закрываем окно
  if (evt.keyCode === 27) {
    closeUploadPopap();
  }
}

function fillTheArray(min, max) { // заполнить массив значениями
  var arr = [];
  for (var i = min; i <= max; i++) {
    arr.push(i);
  }
  return arr;
}

function sortMethod() { // случайная сортировка массива
  return Math.random() > 0.5 ? 1 : -1;
}

function getRandomNumber(min, max) { // случайное число от min до max
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function generatePhotos() {
  var descriptionPhotos = []; // массив рандомно созданных обьектов

  for (var i = 0; i <= randomUrl.length - 1; i++) {
    var photoObject = {
      url: './photos/' + randomUrl[i] + '.jpg',
      likes: randomLikes[i],
      comments: getRandomComments()
    };

    descriptionPhotos.push(photoObject);
  }
  return descriptionPhotos;
}
/*
 * @param {Object} photo
 * @return {HTMLElement}
 */
function renderPhoto(photo, id) { // в качестве аргумента получаем обьект со именами url likes comments
  var photoElement = pictureTemplate.cloneNode(true); // копируем структуру шаблона со всеми потомками
  photoElement.querySelector('.picture img').src = photo.url; // записываем урл фотографии
  photoElement.querySelector('.picture-likes').textContent = photo.likes; // записываем количество лайков
  photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
  photoElement.querySelector('IMG').setAttribute('data-id', id);
  // photoElement.querySelector('IMG').setAttribute('tabindex', 0);
  
  return photoElement;
}

/*
 * @return {Array}
 */
function getRandomComments() {
  var requireComment = getRandomNumber(1, 2);
  var result = [];

  var _userComments = userComments.slice();
  _userComments.sort(sortMethod);

  for (var it = 1; it <= requireComment; it++) {
    result.push(_userComments.pop());
  }

  return result;
}
