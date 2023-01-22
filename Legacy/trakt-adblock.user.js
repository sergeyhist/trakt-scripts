// ==UserScript==
// @name        Trak.tv AdBlock
// @namespace   https://github.com/sergeyhist/trakt-scripts/trakt-adblock.user.js
// @match       *://trakt.tv/*
// @version     1.3.1
// @author      Hist
// @description Block ads on trakt.tv
// @run-at      document-start
// @homepageURL https://github.com/sergeyhist/trakt-scripts
// @downloadURL https://github.com/sergeyhist/trakt-scripts/raw/main/trakt-adblock.user.js
// ==/UserScript==

setInterval(() => {
  for (let element of document.querySelectorAll('.snigel')) {
    !element.parentElement.classList.contains('hidden') && element.parentElement.classList.add('hidden');
  };

  for (let element of document.querySelectorAll('.playwire')) {
    !element.parentElement.classList.contains('hidden') && element.parentElement.classList.add('hidden');
  };

  for (let element of document.querySelectorAll('[class^="snigel-adhesive"]')) {
    !element.classList.contains('hidden') && element.classList.add('hidden');
  };

  for (let element of document.querySelectorAll('.replace-xlg')) {
    !element.classList.contains('hidden') && element.classList.add('hidden');
  };
}, 100)
