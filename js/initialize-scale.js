'use strict';

window.initializeScale = function (targetElement, cb) {
  var uploadResizeControls = document.querySelector('.upload-resize-controls'); // форма с кнопками ресайза картинки
  var plusButton = uploadResizeControls.querySelector('.upload-resize-controls-button-inc');
  var minusButton = uploadResizeControls.querySelector('.upload-resize-controls-button-dec');
  var inputResizeValue = uploadResizeControls.querySelector('.upload-resize-controls-value');

  var step = parseInt(inputResizeValue.attributes.step.value, 10);
  var maxValue = parseInt(inputResizeValue.attributes.maxlenght.value, 10);
  var minValue = parseInt(inputResizeValue.attributes.minlength.value, 10);

  var currentScaleValue = parseInt(inputResizeValue.value, 10);
  var nextScaleValue = currentScaleValue;

  // если нажали +
  if (targetElement === plusButton && currentScaleValue < maxValue) {
    nextScaleValue = currentScaleValue + step;
  }

  // если нажали -
  if (targetElement === minusButton && currentScaleValue > minValue) {
    nextScaleValue = currentScaleValue - step;
  }

  // если значение такое же, то ререндера не будет
  if (currentScaleValue !== nextScaleValue) {
    cb(nextScaleValue);
  }
};
