// ==UserScript==
// @name        Trak.tv AdBlock
// @namespace   https://github.com/sergeyhist/trakt-scripts/trakt-adblock.user.js
// @match       *://trakt.tv/*
// @version     1.2
// @author      Hist
// @description Block ads on trakt.tv
// @run-at      document-start
// @homepageURL https://github.com/sergeyhist/trakt-scripts
// @downloadURL https://github.com/sergeyhist/trakt-scripts/raw/main/trakt-adblock.user.js
// ==/UserScript==

addEventListener('DOMContentLoaded', () => {
  const adsIds = ['.playwire', '.snigel'];
  let adsNodes = [];

  for (let id of adsIds) {
    for (let element of document.querySelectorAll(id)) {
      adsNodes.push(element);
    };
  };

  for (let node of adsNodes) {
    node.parentElement.classList.add('hidden');
  };

  for (let node of document.querySelectorAll('.replace-xlg')) {
    node.classList.add('hidden');
  };
})
