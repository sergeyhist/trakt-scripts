// ==UserScript==
// @name        Trak.tv Hidden Items
// @namespace   https://github.com/sergeyhist/trakt-scripts/trakt-hidden.user.js
// @match       *://trakt.tv/*
// @version     1.0
// @author      Hist
// @description Add menu elements with hidden items
// @run-at      document-start
// @homepageURL https://github.com/sergeyhist/trakt-scripts
// @downloadURL https://github.com/sergeyhist/trakt-scripts/raw/main/trakt-hidden.user.js
// ==/UserScript==

const linkElements = ['#links-wrapper'];
const listElements = ['#user-menu', '#mobile-nav']

addEventListener('DOMContentLoaded', () => {
  for (let element of linkElements) {
    let link = document.createElement('a');

    link.href = '/settings/hidden';
    link.textContent = 'Hidden Items';

    document.querySelector(element).querySelector('.container').append(link);
  };

  for (let element of listElements) {
    let li = document.createElement('li');
    
    li.innerHTML = `<a href="/settings/hidden">Hidden Items</a>`;

    document.querySelector(element).querySelector('.separator') ? document.querySelector(element).querySelector('.separator').before(li) : document.querySelector(element).querySelector('ul').append(li);
  };
})
