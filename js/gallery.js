'use strict';

(function () {
  var url = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  
  window.load(url, onLoad, onError);

  function onLoad(data) {
    var insertPhotosFragment = window.picture().insertPhotosFragment(data);
    window.picture().insertPhotosSite(insertPhotosFragment);
    window.preview();
  }

  function onError(errorMessage) {
    var node = document.createElement('div');
    node.classList.add('errorMessage');    
    node.textContent = 'WTF? ' + errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }  
})();
