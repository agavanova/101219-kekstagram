'use strict';
var pictureTemplate = document.getElementById('picture-template').content;
var photoList = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');

var userComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var randomUrl = fillTheArray(1, 25); // заполняем массив значениями от min до max
randomUrl = randomUrl.sort(sortArray); // сортируем массив в случайном порядке
var randomLikes = fillTheArray(15, 200);
randomLikes = randomLikes.sort(sortArray);

function fillTheArray(min, max) { // заполнить массив значениями
  var arr = [];
  for (var i = min; i <= max; i++) {
    arr.push(i);
  }
  return arr;
}

function sortArray() { // случайная сортировка массива
  return Math.random() > 0.5 ? 1 : -1;
}

function getRandomComments(min, max) { // случайная сортировка комментариев
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function getDescriptionPhoto() {
  var descriptionPhoto = []; // массив рандомно созданных обьектов 
  var randomComments = []; // массив рандомных комментариев
  debugger;
  for (var i = 0; i <= randomUrl.length; i++) {
    var randomNumber = getRandomComments(0, userComments.length - 1);
    var comments1 = userComments[randomNumber];

    if (getRandomComments(1, 2) < 2) { // если 1, то генерируем двойной комментарий, если равно 2, то одинарный.
      var comments2 = userComments[getRandomComments(0, userComments.length - 1)];
      randomComments[i] = comments1 + ' ' + comments2;
    } else {
      randomComments[i] = comments1;
    }
    descriptionPhoto[i] = {url: './photos/' + randomUrl[i] + '.jpg', likes: randomLikes[i], comments: randomComments[i]};
  }
  return descriptionPhoto;
}

var photos = getDescriptionPhoto();

var renderPhoto = function (photo) { // в качестве аргумента получаем обьект со именами url likes comments
  var photoElement = pictureTemplate.cloneNode(true); // копируем структуру шаблона со всеми потомками

  photoElement.querySelector('.picture img').src = photo.url; // записываем урл фотографии
  photoElement.querySelector('.picture-likes').textContent = photo.likes; // записываем количество лайков
  photoElement.querySelector('.picture-comments').textContent = photo.comments; // записываем комментарии к фото

  return photoElement;
};

var fragment = document.createDocumentFragment(); // создаем фрагмент для вставки. Фрагмент начинается со первого индекса, нулевой вставляется по дефолду
for (var i = 1; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i])); // прогоняем весь массив и вставляем во фрагмент
}
photoList.appendChild(fragment); // вставляем фрагмент на страницу

galleryOverlay.querySelector('.gallery-overlay-image').src = photos[0].url; // записываем урл фотографии по дефолту
galleryOverlay.querySelector('.likes-count').textContent = photos[0].likes; // записываем количество лайков по дефолту
galleryOverlay.querySelector('.comments-count').textContent = photos[0].comments; // записываем комментарии к фото по дефолту
galleryOverlay.classList.remove('invisible'); // открываем фото по дефолту
