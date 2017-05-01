'use strict';

(function () {
  var url = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  var fitersForm = document.querySelector('.filters');
  var pictures = document.querySelector('.pictures');
  var defaultData;

  window.load(url, onLoad, onError);

  fitersForm.addEventListener('click', function (evt) {
    var target = evt.target;

    clearOldPhotos();

    switch (target.id) {
      case 'filter-popular':
        window.debounce(showDefaultPhoto);
        break;
      case 'filter-new':
        window.debounce(showNewPictures);
        break;
      case 'filter-discussed':
        window.debounce(showDiscussedPictures);
        break;
    }
  });

  function onLoad(data) {
    renderPictures(data);
    window.preview();
    filtersFormShow();
    defaultData = data;
  }

  function onError(errorMessage) {
    var node = document.createElement('div');
    node.classList.add('errorMessage');
    node.textContent = 'WTF? ' + errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function filtersFormShow() {
    fitersForm.classList.remove('hidden');
  }

  function showDefaultPhoto() {
    renderPictures(defaultData);
    window.preview();
  }

  function showNewPictures() {
    var randomElements = window.utils.randomElements(defaultData);
    renderPictures(randomElements);
    window.preview();
  }

  function showDiscussedPictures() {
    var copyDefaultData = defaultData.slice();
    renderPictures(copyDefaultData.sort(sortNumberDescending));
    window.preview();
  }

  function renderPictures(data) {
    var insertPhotosFragment = window.picture().insertPhotosFragment(data);
    window.picture().insertPhotosSite(insertPhotosFragment);
  }

  function sortNumberDescending(left, right) {
    return right.comments.length - left.comments.length;
  }

  function clearOldPhotos() {
    window.utils.clearElements('.picture', pictures);
  }

})();
