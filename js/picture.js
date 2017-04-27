'use strict';

window.picture = function () {
  var pictureTemplate = document.getElementById('picture-template').content; // находим шаблон для фото
  var photoList = document.querySelector('.pictures'); // находим контейнер, в который потом вставим фрагмент с фотографиями

  function insertPhotosFragment(data) {
    var fragmentPhotos = document.createDocumentFragment(); // создаем фрагмент для вставки. Фрагмент начинается со первого индекса, нулевой вставляется по дефолду
    data.forEach(function (photo, i) {
      var photoNode = renderPhoto(photo, i);
      photoNode.data = data[i];
      fragmentPhotos.appendChild(photoNode);
    });
    return fragmentPhotos;
  }
  function insertPhotosSite(fragment) {
    photoList.appendChild(fragment); // вставляем фрагмент на страницу
  }

  function renderPhoto(photo, id) { // в качестве аргумента получаем обьект со именами url likes comments
    var photoElement = pictureTemplate.cloneNode(true).querySelector('a'); // копируем структуру шаблона со всеми потомками
    photoElement.querySelector('.picture img').src = photo.url; // записываем урл фотографии
    photoElement.querySelector('.picture-likes').textContent = photo.likes; // записываем количество лайков
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
    // photoElement.querySelector('IMG').setAttribute('data-id', id);
    // photoElement.querySelector('IMG').setAttribute('tabindex', 0);
    return photoElement;
  }
  return {
    insertPhotosFragment: insertPhotosFragment,
    insertPhotosSite: insertPhotosSite
  };
};
