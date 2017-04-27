'use strict';

window.initializeScale = function (targetElement, cb) {
  var uploadResizeControls = document.querySelector('.upload-resize-controls'); // форма с кнопками ресайза картинки
  var plusButton = uploadResizeControls.querySelector('.upload-resize-controls-button-inc');
  var minusButton = uploadResizeControls.querySelector('.upload-resize-controls-button-dec');
  var inputResizeValue = uploadResizeControls.querySelector('.upload-resize-controls-value');
  var step = parseInt(inputResizeValue.attributes.step.value, 10);
  var MaxValue = parseInt(inputResizeValue.attributes.maxlenght.value, 10);
  var MinValue = parseInt(inputResizeValue.attributes.minlength.value, 10);

  var scaleValue = parseInt(inputResizeValue.value, 10);

  if (targetElement === plusButton && scaleValue < MaxValue) {
    scaleValue = scaleValue + step;
  } else if (targetElement === minusButton && scaleValue > MinValue) {
    scaleValue = scaleValue - step;
  } else {
    return;
  }
  cb(scaleValue);
};