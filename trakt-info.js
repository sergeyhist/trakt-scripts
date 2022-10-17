// ==UserScript==
// @name        Trak.tv Clickable Info
// @namespace   https://github.com/sergeyhist/trakt-scripts/trakt-dark-knight.user.js
// @match       *://trakt.tv/*
// @version     0.1
// @author      Hist
// @description 
// @run-at      document-start
// @homepageURL https://github.com/sergeyhist/trakt-scripts
// @downloadURL 
// ==/UserScript==

addEventListener('DOMContentLoaded', () => {
  const statsElememnts = document.querySelectorAll('.additional-stats');

  for (let element of statsElememnts) {
    const infoItems = element.querySelectorAll('li');
    for (let item of infoItems) {
      let label = item.querySelector('label');
      if (label.textContent.includes('Studio')) {
        let itemText = item.textContent;
        item.textContent = '';
        let linkLabel = document.createElement('label');
        itemText.split(', ').length > 1 ? linkLabel.textContent = 'Studios' : linkLabel.textContent = 'Studio';
        item.appendChild(linkLabel);
        for (let studio of itemText.split(', ')) {
          let link = document.createElement('a');
          let linkName = studio.replace('Studios','').replace('Studio', '').replace(/ \+.*more/, '');
          link.setAttribute('href', 'https://trakt.tv/search?studios='+linkName.replace(/ |\:|\./g, '-').toLowerCase());
          studio != itemText.split(', ')[itemText.split(',').length - 1] ? link.textContent = linkName+', ' : link.textContent = linkName;
          item.appendChild(link);
        };
      };
    };
  };
});
