'use strict';

window.preview = function () {
  var photoNodeList = document.querySelectorAll('.picture');
  var galleryOverlay = document.querySelector('.gallery-overlay'); // находим модальное окно с увеличенным фото
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var commentListNode = galleryOverlay.querySelector('.gallery-overlay-controls-comments');

  galleryOverlayClose.addEventListener('click', function () {
    closeModal();
  });

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      closeModal();
    }
  });

  photoNodeList.forEach(function (photoNode) {
    photoNode.addEventListener('click', function (e) {
      e.preventDefault();

      galleryOverlay.querySelector('.gallery-overlay-image').src = photoNode.data.url; // записываем урл фотографии по дефолту
      galleryOverlay.querySelector('.likes-count').textContent = photoNode.data.likes; // записываем количество лайков по дефолту
      galleryOverlay.querySelector('.comments-count').innerHTML = photoNode.data.comments.length; // записываем комментарии к фото по дефолту

      // Вставка комментариев в модальнике
      photoNode.data.comments.forEach(function (comment, i) {
        var commentNode = document.createElement('div');
        commentNode.classList.add('picture-comment');
        commentNode.innerText = ++i + '.  ' + comment;
        commentListNode.insertBefore(commentNode, commentListNode.querySelector('.comments-count'));
      });

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
    window.utils.clearElements('.picture-comment', commentListNode);
  }

  function onPopupEscPress(evt) { // при нажатии esc закрываем окно
    if (evt.keyCode === 27) {
      closeModal();
    }
  }
};
