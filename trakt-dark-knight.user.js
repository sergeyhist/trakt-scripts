// ==UserScript==
// @name        Trak.tv Dark Knight
// @namespace   https://github.com/sergeyhist/trakt-scripts/trakt-dark-knight.user.js
// @match       *://trakt.tv/*
// @version     1.3.1
// @author      Hist
// @description Enable dark knight mode for trakt.tv
// @run-at      document-start
// @homepageURL https://github.com/sergeyhist/trakt-scripts
// @downloadURL https://github.com/sergeyhist/trakt-scripts/raw/main/trakt-dark-knight.user.js
// ==/UserScript==

setInterval(() => {
  if (document.body) {
    if (!document.body.classList.contains('dark-knight')) {
      document.body.classList.add('dark-knight');
    };

    if (document.querySelector('.light')) {
      for (let element of document.querySelectorAll('.light')) {
        element.style.backgroundColor = '#1d1d1d';
      };
    };

    if (document.querySelector('*[id*="-content-page"]')) {
      for (let element of document.querySelectorAll('*[id*="-content-page"]')) {
        element.style.backgroundColor = '#1d1d1d';
      };
    };
  };
}, 100);
