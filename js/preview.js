'use strict';

window.preview = function () {
  var photos = document.querySelectorAll('.picture');
  var galleryOverlay = document.querySelector('.gallery-overlay'); // находим модальное окно с увеличенным фото
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  galleryOverlayClose.addEventListener('click', function () {
    closeModal();
  });

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      closeModal();
    }
  });

  Array.prototype.forEach.call(photos, function (photo) {
    photo.addEventListener('click', function (evt) {
      evt.preventDefault();
      galleryOverlay.querySelector('.gallery-overlay-image').src = this.data.url; // записываем урл фотографии по дефолту
      galleryOverlay.querySelector('.likes-count').textContent = this.data.likes; // записываем количество лайков по дефолту
      galleryOverlay.querySelector('.comments-count').innerHTML = this.data.comments.length; // записываем комментарии к фото по дефолту
      // Вставка комментариев в модальнике
      // var commentListNode = galleryOverlay.querySelector('.gallery-overlay-controls-comments');
      // photos[0].comments.forEach(function(comment) {
      //  var commentNode = document.createElement('div');
      //  commentNode.classList.add('picture-comment');
      //  commentNode.innerText = comment;
      //  commentListNode.insertBefore(commentNode, commentListNode.querySelector('.comments-count'));
      // });
      openModal();
    });
  });

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
};