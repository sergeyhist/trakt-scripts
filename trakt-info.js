// ==UserScript==
// @name        Trak.tv Clickable Info
// @namespace   https://github.com/sergeyhist/trakt-scripts/trakt-dark-knight.user.js
// @match       *://trakt.tv/*
// @version     0.3
// @author      Hist
// @description Clickable info on trakt movie/show page
// @run-at      document-start
// @homepageURL https://github.com/sergeyhist/trakt-scripts
// @downloadURL https://github.com/sergeyhist/trakt-scripts/raw/main/trakt-info.js
// ==/UserScript==

addEventListener('DOMContentLoaded', () => {
  const statsElememnts = document.querySelectorAll('.additional-stats');

  for (let element of statsElememnts) {
    const infoItems = element.querySelectorAll('li');
    const metaLang = element.querySelector('meta[itemprop="name"]').getAttribute('content');

    function infoParser(block, type, names) {
      let lang;
      if (type == 'languages' && ['us', 'uk'].includes(metaLang)) {
        lang = 'en';
      } else {
        lang = metaLang;
      };
      block.querySelector('label').remove();
      let blockText = block.textContent;
      block.textContent = '';
      let linkLabel = document.createElement('label');
      blockText.split(', ').length > 1 ? linkLabel.textContent = names[1] : linkLabel.textContent = names[0];
      block.appendChild(linkLabel);
      for (let studio of blockText.split(', ')) {
        let delim = document.createTextNode(', ');
        let link = document.createElement('a');
        let linkName = studio.replace(/ \+.*more/, '');
        if (['languages', 'countries'].includes(type)) {
          link.setAttribute('href', 'https://trakt.tv/search?'+type+'='+lang);
        } else {
          link.setAttribute('href', 'https://trakt.tv/search?'+type+'='+linkName.replace(/ |\:|\./g, '-').toLowerCase()); 
        };
        link.textContent = linkName;
        block.appendChild(link);
        if (studio != blockText.split(', ')[blockText.split(',').length - 1]) {link.after(delim)};
      };
    }

    for (let item of infoItems) {
      let label = item.querySelector('label');
      if (label.textContent.includes('Studio')) {infoParser(item, 'studios', ['Studio', 'Studios'])}
      else if (label.textContent.includes('Genres')) {infoParser(item, 'genres', ['Genre', 'Genres'])}
      else if (label.textContent.includes('Language')) {infoParser(item, 'languages', ['Language', 'Languages'])}
      else if (label.textContent.includes('Country')) {infoParser(item, 'countries', ['Country', 'Countries'])};
    };
  };
});
