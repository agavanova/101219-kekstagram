'use strict';

window.slider = function () {
  var filterWraper = document.querySelector('.upload-filter-level');
  var slider = document.querySelector('.upload-filter-level-line');
  var item = slider.querySelector('.upload-filter-level-pin');
  var value = slider.querySelector('.upload-filter-level-val');
  var uploadFilterControls = document.querySelector('.upload-filter-controls');
  var filterImagePreview = document.querySelector('.filter-image-preview');

  var sliderClientCoords = slider.getBoundingClientRect();
  var sliderCoords = {};
  sliderCoords.top = sliderClientCoords.top + pageYOffset;
  sliderCoords.left = sliderClientCoords.left + pageXOffset;

  var newLeftPosition;
  var itemCoords = item.getBoundingClientRect();
  var defaultCoords = itemCoords.left - sliderCoords.left + item.offsetWidth / 2; // дефолтные координаты ползунка
  item.defaultSliderCoords = defaultCoords;

  uploadFilterControls.addEventListener('click', function (evt) {
    if (evt.target.tagName === 'INPUT') {
      defaultFilterValue();
    } else {
      return;
    }
  });

  item.onmousedown = function (e) {
    e.preventDefault();
    var itemClientCoords = item.getBoundingClientRect();
    var itemCoords = {};
    itemCoords.top = itemClientCoords.top + pageYOffset;
    itemCoords.left = itemClientCoords.left + pageXOffset;

    var right = slider.offsetWidth - item.offsetWidth / 2;

    var shiftX = e.pageX - itemCoords.left;

    document.onmousemove = function (evt) {
      evt.preventDefault();
      newLeftPosition = evt.pageX - sliderCoords.left - shiftX;

      if (newLeftPosition < 0)
        newLeftPosition = 0;
      if (newLeftPosition > right)
        newLeftPosition = right;
      
      item.style.left = newLeftPosition + 'px';
      value.style.width = newLeftPosition + 'px';
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };

      switch (uploadFilterControls.currentFilterName) {
        case 'filter-chrome':
          filterImagePreview.style.filter = 'grayscale(' + calculateSliderValue(0, 1, newLeftPosition) + ')';
          break;
        case 'filter-sepia':
          filterImagePreview.style.filter = 'sepia(' + calculateSliderValue(0, 1, newLeftPosition) + ')';
          break;
        case 'filter-marvin':
          filterImagePreview.style.filter = 'invert(' + calculateSliderValue(0, 100, newLeftPosition) + '%)';
          break;
        case 'filter-phobos':
          filterImagePreview.style.filter = 'blur(' + calculateSliderValue(0, 3, newLeftPosition) + 'px)';
          break;
        case 'filter-heat':
          filterImagePreview.style.filter = 'brightness(' + calculateSliderValue(0, 3, newLeftPosition) + ')';
          break;
      }
      return false;
    };
  };

  function calculateSliderValue(min, max, value) {
    if (value === 0) {
      return min;
    } else {
      return value * ((max - min) / (slider.offsetWidth - item.offsetWidth / 2));
    }
  }

  function defaultFilterValue() {
    item.style.left = defaultCoords + 'px';
    value.style.width = defaultCoords + 'px';
    filterImagePreview.style.filter = '';

    if (uploadFilterControls.currentFilterName === 'filter-none') {
      filterWraper.classList.add('hidden');
    } else {
      filterWraper.classList.remove('hidden');
    }

    switch (uploadFilterControls.currentFilterName) {
      case 'filter-chrome':
        filterImagePreview.style.filter = 'grayscale(' + calculateSliderValue(0, 1, defaultCoords) + ')';
        break;
      case 'filter-sepia':
        filterImagePreview.style.filter = 'sepia(' + calculateSliderValue(0, 1, defaultCoords) + ')';
        break;
      case 'filter-marvin':
        filterImagePreview.style.filter = 'invert(' + calculateSliderValue(0, 100, defaultCoords) + '%)';
        break;
      case 'filter-phobos':
        filterImagePreview.style.filter = 'blur(' + calculateSliderValue(0, 3, defaultCoords) + 'px)';
        break;
      case 'filter-heat':
        filterImagePreview.style.filter = 'brightness(' + calculateSliderValue(0, 3, defaultCoords) + ')';
        break;
    }
  }
};
