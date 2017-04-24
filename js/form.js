'use strict';

(function () {
  var uploadSelectImage = document.getElementById('upload-select-image'); // форма загрузки фотографии
  var uploadFile = uploadSelectImage.querySelector('#upload-file'); // input type="file"
  var uploadOverlay = document.querySelector('.upload-overlay'); // скрытое окно с фильтрами
  var uploadFilterControls = document.querySelector('.upload-filter-controls'); // контейнер со всеми фильтрами
  var filterImagePreview = document.querySelector('.filter-image-preview');
  var uploadResizeControls = uploadOverlay.querySelector('.upload-resize-controls'); // форма с кнопками ресайза картинки
  var formTextarea = document.forms['upload-filter']['upload-description'];
  var slider = document.querySelector('.upload-filter-level-line');
  var item = slider.querySelector('.upload-filter-level-pin');
  var value = slider.querySelector('.upload-filter-level-val');
  var filterWraper = document.querySelector('.upload-filter-level');

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

  uploadFilterControls.addEventListener('click', function (evt) {
    if (evt.target.tagName === 'INPUT') {
      var className = evt.target.id;
    } else {
      return;
    }
    className = className.replace('upload-', '');
    removeClassFilterImage();
    filterImagePreview.classList.add(className);
    uploadFilterControls.currentFilterName = className;
  });

  document.querySelector('#upload-submit').addEventListener('click', function (evt) {
    if (validate() === 'false') {
      evt.preventDefault();
    }
  });

  function openUploadPopap() {
    uploadOverlay.classList.remove('invisible');
    document.addEventListener('keydown', onUploadPopapEscPress);
    window.slider();
  }

  function closeUploadPopap() {
    uploadOverlay.classList.add('invisible');
    document.removeEventListener('keydown', onUploadPopapEscPress);
    removeClassFilterImage();
    removeResizeValue();
    defaultFilterValue();
  }

  function onUploadPopapEscPress(evt) { // при нажатии esc закрываем окно
    if (evt.keyCode === 27) {
      closeUploadPopap();
    }
  }

  function removeClassFilterImage() {
    var classFilterImage = filterImagePreview.classList.value.split(' ');
    for (var i = 1; i < classFilterImage.length; i++) {
      filterImagePreview.classList.remove(classFilterImage[i]);
    }
  }

  function removeResizeValue() {
    var inputResize = uploadResizeControls.querySelector('.upload-resize-controls-value');
    inputResize.value = '100%';
    filterImagePreview.style.transform = 'scale(1)';
  }

  (function () { // функция масштабирования загружаемого изображения
    var plus = uploadResizeControls.querySelector('.upload-resize-controls-button-inc');
    var minus = uploadResizeControls.querySelector('.upload-resize-controls-button-dec');
    var inputResize = uploadResizeControls.querySelector('.upload-resize-controls-value');
    var inputResizeStep = parseInt(inputResize.attributes.step.value, 10);
    var inputResizeMaxLenght = parseInt(inputResize.attributes.maxlenght.value, 10);
    var inputResizeMinLenght = parseInt(inputResize.attributes.minlength.value, 10);

    uploadResizeControls.addEventListener('click', function (evt) {
      var target = evt.target;
      var targetValue = parseInt(inputResize.value, 10);
      if (target === plus && targetValue < inputResizeMaxLenght) {
        targetValue = targetValue + inputResizeStep;
        inputResize.value = targetValue + '%';
      } else if (target === minus && targetValue > inputResizeMinLenght) {
        targetValue = targetValue - inputResizeStep;
        inputResize.value = targetValue + '%';
      } else {
        return;
      }
      filterImagePreview.style.transform = 'scale(' + targetValue / 100 + ')';
    });
  })();

  function validate() {
    if (formTextarea.value === '' || formTextarea.attributes.minlength.value > formTextarea.textLength) {
      formTextarea.style.outline = 'solid red 2px';
      setTimeout(function () {
        formTextarea.style.outline = '';
      }, 1000);
      return false;
    } else {
      return true;
    }
  }
  function defaultFilterValue () {
    item.style.left = item.defaultSliderCoords + 'px';
    value.style.width = item.defaultSliderCoords + 'px';
    filterImagePreview.style.filter = '';
    filterWraper.classList.add('hidden');
  }
})();
