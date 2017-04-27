'use strict';

window.utils = (function () {
  function fillTheArray(min, max) { // заполнить массив значениями
    var arr = [];
    for (var i = min; i <= max; i++) {
      arr.push(i);
    }
    return arr;
  }

  function sortMethod() { // случайная сортировка массива
    return Math.random() > 0.5 ? 1 : -1;
  }

  function getRandomNumber(min, max) { // случайное число от min до max
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  function randomElements(elements) {
    var getRandomElements = elements.slice().sort(sortMethod).slice(0, 10);
    return getRandomElements;
  }

  function clearElements(elements, wrapper) {
    var allElements = wrapper.querySelectorAll(elements);
    for (var i = 0; i < allElements.length; i++) {
      allElements[i].parentNode.removeChild(allElements[i]);
    }
  }

  return {
    fillTheArray: fillTheArray,
    sortMethod: sortMethod,
    getRandomNumber: getRandomNumber,
    randomElements: randomElements,
    clearElements: clearElements
  };
})();
