'use strict';

window.picture = function () {
  var pictureTemplate = document.getElementById('picture-template').content; // находим шаблон для фото
  var photoList = document.querySelector('.pictures'); // находим контейнер, в который потом вставим фрагмент с фотографиями

  var randomUrl = window.utils.fillTheArray(1, 25).sort(window.utils.sortMethod); // заполняем массив значениями от min до max
  var randomLikes = window.utils.fillTheArray(15, 200).sort(window.utils.sortMethod);

  var photos = generatePhotos(); // массив с объектами
  var fragmentPhotos = document.createDocumentFragment(); // создаем фрагмент для вставки. Фрагмент начинается со первого индекса, нулевой вставляется по дефолду

  photos.forEach(function (photo, i) {
    var photoNode = renderPhoto(photo, i);
    photoNode.data = photos[i];
    fragmentPhotos.appendChild(photoNode);
  });

  photoList.appendChild(fragmentPhotos); // вставляем фрагмент на страницу

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

  function getRandomComments() {
    var requireComment = window.utils.getRandomNumber(1, 2);
    var result = [];

    var _userComments = window.data.getComments().slice();
    _userComments.sort(window.utils.sortMethod);

    for (var it = 1; it <= requireComment; it++) {
      result.push(_userComments.pop());
    }

    return result;
  }

  function renderPhoto(photo, id) { // в качестве аргумента получаем обьект со именами url likes comments
    var photoElement = pictureTemplate.cloneNode(true).querySelector('a'); // копируем структуру шаблона со всеми потомками
    photoElement.querySelector('.picture img').src = photo.url; // записываем урл фотографии
    photoElement.querySelector('.picture-likes').textContent = photo.likes; // записываем количество лайков
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
    photoElement.querySelector('IMG').setAttribute('data-id', id);
    // photoElement.querySelector('IMG').setAttribute('tabindex', 0);
    return photoElement;
  }
};
