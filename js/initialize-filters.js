'use strict';

window.initializeFilters = function (targetElement, cb) {
  var filterImagePreview = document.querySelector('.filter-image-preview');
  var uploadFilterControls = document.querySelector('.upload-filter-controls');

  var target = targetElement.target;

  if (target.tagName === 'INPUT') {
    var newFilter = target.id.replace('upload-', '');
    uploadFilterControls.currentFilterName = newFilter;

    if (filterImagePreview.classList[1]) {
      var oldFilter = filterImagePreview.classList[1];
    }
    cb(newFilter, oldFilter);
  }
};
