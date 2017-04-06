'use strict';

var pictureTemplate = document.getElementById('picture-template').content; // находим шаблон для фото
var photoList = document.querySelector('.pictures'); // находим контейнер, в который потом вставим фрагмент с фотографиями
var galleryOverlay = document.querySelector('.gallery-overlay'); // находим модальное окно с увеличенным фото

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

photos.forEach(function (photo) {
  var photoNode = renderPhoto(photo);
  fragmentPhotos.appendChild(photoNode);
});

photoList.appendChild(fragmentPhotos); // вставляем фрагмент на страницу

document.querySelector('.upload-overlay').classList.add('invisible'); // скрываем форму кадрирования изображения 
galleryOverlay.querySelector('.gallery-overlay-image').src = photos[0].url; // записываем урл фотографии по дефолту
galleryOverlay.querySelector('.likes-count').textContent = photos[0].likes; // записываем количество лайков по дефолту
galleryOverlay.querySelector('.comments-count').innerHTML = photos[0].comments.length; // записываем комментарии к фото по дефолту
// Вставка комментариев в модальнике
//var commentListNode = galleryOverlay.querySelector('.gallery-overlay-controls-comments');
//photos[0].comments.forEach(function(comment) {
//  var commentNode = document.createElement('div');
//  commentNode.classList.add('picture-comment');
//  commentNode.innerText = comment;
//  
//  commentListNode.insertBefore(commentNode, commentListNode.querySelector('.comments-count'));
//});

galleryOverlay.classList.remove('invisible'); // открываем фото по дефолту

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
/**
 * @param {Object} photo
 * @returns {HTMLElement}
 */
function renderPhoto(photo) { // в качестве аргумента получаем обьект со именами url likes comments
  var photoElement = pictureTemplate.cloneNode(true); // копируем структуру шаблона со всеми потомками

  photoElement.querySelector('.picture img').src = photo.url; // записываем урл фотографии
  photoElement.querySelector('.picture-likes').textContent = photo.likes; // записываем количество лайков
  photoElement.querySelector('.picture-comments').textContent = photo.comments.length;

  return photoElement;
}

/**
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
