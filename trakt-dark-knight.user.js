// ==UserScript==
// @name        Trak.tv Dark Knight
// @namespace   https://github.com/sergeyhist/trakt-scripts/trakt-dark-knight.user.js
// @match       *://trakt.tv/*
// @version     1.2
// @author      Hist
// @description Enable dark knight mode for trakt.tv
// @run-at      document-start
// @homepageURL https://github.com/sergeyhist/trakt-scripts
// @downloadURL https://github.com/sergeyhist/trakt-scripts/trakt-dark-knight.user.js
// ==/UserScript==

setTimeout(() => {
  !document.body.classList.contains('dark-knight') && document.body.classList.add('dark-knight');
}, 100);
