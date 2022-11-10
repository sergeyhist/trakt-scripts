// ==UserScript==
// @name        Trak.tv Hidden Items
// @namespace   https://github.com/sergeyhist/trakt-scripts/trakt-hidden.user.js
// @match       *://trakt.tv/*
// @version     1.1
// @author      Hist
// @description Add menu elements with hidden items
// @run-at      document-start
// @homepageURL https://github.com/sergeyhist/trakt-scripts
// @downloadURL https://github.com/sergeyhist/trakt-scripts/raw/main/trakt-hidden.user.js
// ==/UserScript==

const linkElements = ['#links-wrapper'];
const listElements = ['#user-menu', '#mobile-nav'];


addEventListener('DOMContentLoaded', () => {
  for (let element of linkElements) {
    if (document.querySelector(element)) {
      for (let item of document.querySelectorAll(element)) {
        let link = document.createElement('a');

        link.href = '/settings/hidden';
        link.textContent = 'Hidden Items';

        item.querySelector('.container').append(link);
      };
    };
  };

  for (let element of listElements) {
    if (document.querySelector(element)) {
      for (let item of document.querySelectorAll(element)) {
        let li = document.createElement('li');

        li.innerHTML = `<a href="/settings/hidden">Hidden Items</a>`;

        item.querySelector('.separator') ? item.querySelector('.separator').before(li) : item.querySelector('ul').append(li);
      };
    };
  };
})
