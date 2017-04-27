'use strict';

window.data = (function () {
  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var randomUrl = window.utils.fillTheArray(1, 25).sort(window.utils.sortMethod); // заполняем массив значениями от min до max
  var randomLikes = window.utils.fillTheArray(15, 200).sort(window.utils.sortMethod);
  function getComments() {
    return comments;
  }
  function getrandomUrl() {
    return randomUrl;
  }
  function getrandomLikes() {
    return randomLikes;
  }

  return {
    getComments: getComments,
    getrandomUrl: getrandomUrl,
    getrandomLikes: getrandomLikes
  };
})();
