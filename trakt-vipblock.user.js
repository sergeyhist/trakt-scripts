// ==UserScript==
// @name        Trak.tv VipBlock
// @namespace   https://github.com/sergeyhist/trakt-scripts/trakt-vipblock.user.js
// @match       *://trakt.tv/*
// @version     1.2
// @author      Hist
// @description Block vip banners and alerts on trakt.tv
// @run-at      document-start
// @homepageURL https://github.com/sergeyhist/trakt-scripts
// @downloadURL https://github.com/sergeyhist/trakt-scripts/raw/main/trakt-vipblock.user.js
// ==/UserScript==

addEventListener('DOMContentLoaded', () => {
  const adsIds = ['a[href="/vip"]'];
  const adsLinks = ['a[href="/users/sergeyhist/year"]', 'a[href="/users/sergeyhist/year/all"]', '.show-advanced-filters-link'];
  let adsNodes = [];

  for (let adsLink of adsLinks) {
    for (let link of document.querySelectorAll(adsLink)) {
      link.classList.add('hidden');
    };
  };

  for (let id of adsIds) {
    for (let element of document.querySelectorAll(id)) {
      adsNodes.push(element);
    };
  };

  for (let node of adsNodes) {
    node.parentElement.classList.add('hidden');
  };

  if (document.querySelector('.brand-right')) {
    document.querySelector('.brand-right').innerHTML += `<li><a href="/search">Search</a></li>`;
  };

  for (let node of document.querySelectorAll('.alert-vip-required')) {
    node.classList.add('hidden');
  };
})
