'use strict';

(function () {
  var url = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  var fitersForm = document.querySelector('.filters');
  var pictures = document.querySelector('.pictures');
  var defaultData;

  window.load(url, onLoad, onError);

  fitersForm.addEventListener('click', function (evt) {
    var target = evt.target;
    switch (target.id) {
      case 'filter-popular':
        clearOldPhotos();
        window.debounce(showDefaultPhoto);
        break;
      case 'filter-new':
        clearOldPhotos();
        window.debounce(showNewPictures);
        break;
      case 'filter-discussed':
        clearOldPhotos();
        window.debounce(showDiscussedPictures);
        break;
    }
  });

  function onLoad(data) {
    renderPictures(data);
    window.preview();
    filtersFormShow();
    defaultData = data;
    return defaultData;
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
  }

  function showNewPictures() {
    var randomElements = window.utils.randomElements(defaultData);
    renderPictures(randomElements);
    window.hangClickOnThePictures(randomElements);
  }

  function showDiscussedPictures() {
    var copyDefaultData = defaultData.slice();
    copyDefaultData = renderPictures(copyDefaultData.sort(sortNumberDescending));
    window.hangClickOnThePictures(copyDefaultData);
  }

  function renderPictures(data) {
    var insertPhotosFragment = window.picture().insertPhotosFragment(data);
    window.picture().insertPhotosSite(insertPhotosFragment);
    window.preview();
  }

  function sortNumberDescending(left, right) {
    return right.comments.length - left.comments.length;
  }

  function clearOldPhotos() {
    window.utils.clearElements('.picture', pictures);
  }

})();
