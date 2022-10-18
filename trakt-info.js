// ==UserScript==
// @name        Trak.tv Clickable Info
// @namespace   https://github.com/sergeyhist/trakt-scripts/trakt-dark-knight.user.js
// @match       *://trakt.tv/*
// @version     0.2
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

    for (let item of infoItems) {
      let label = item.querySelector('label');
      if (label.textContent.includes('Studio')) {
        let itemText = item.textContent;
        item.textContent = '';
        let linkLabel = document.createElement('label');
        itemText.split(', ').length > 1 ? linkLabel.textContent = 'Studios' : linkLabel.textContent = 'Studio';
        item.appendChild(linkLabel);
        for (let studio of itemText.split(', ')) {
          let delim = document.createTextNode(', ');
          let link = document.createElement('a');
          let linkName = studio.replace('Studios','').replace('Studio', '').replace(/ \+.*more/, '');
          link.setAttribute('href', 'https://trakt.tv/search?studios='+linkName.replace(/ |\:|\./g, '-').toLowerCase());
          link.textContent = linkName;
          item.appendChild(link);
          if (studio != itemText.split(', ')[itemText.split(',').length - 1]) {link.after(delim)};
        };
      }
      else if (label.textContent.includes('Genres')) {
        let itemText = item.textContent;
        item.textContent = '';
        let linkLabel = document.createElement('label');
        itemText.split(', ').length > 1 ? linkLabel.textContent = 'Genres' : linkLabel.textContent = 'Genre';
        item.appendChild(linkLabel);
        for (let studio of itemText.split(', ')) {
          let delim = document.createTextNode(', ');
          let link = document.createElement('a');
          let linkName = studio.replace('Genres','').replace('Genre', '').replace(/ \+.*more/, '');
          link.setAttribute('href', 'https://trakt.tv/search?genres='+linkName.replace(/ |\:|\./g, '-').toLowerCase());
          link.textContent = linkName;
          item.appendChild(link);
          if (studio != itemText.split(', ')[itemText.split(',').length - 1]) {link.after(delim)};
        };
      }
      else if (label.textContent.includes('Language')) {
        let itemText = item.textContent;
        item.textContent = '';
        let linkLabel = document.createElement('label');
        itemText.split(', ').length > 1 ? linkLabel.textContent = 'Languages' : linkLabel.textContent = 'Language';
        item.appendChild(linkLabel);
        for (let studio of itemText.split(', ')) {
          let delim = document.createTextNode(', ');
          let link = document.createElement('a');
          let linkName = studio.replace('Languages','').replace('Language', '').replace(/ \+.*more/, '');
          link.setAttribute('href', 'https://trakt.tv/search?languages='+metaLang);
          link.textContent = linkName;
          item.appendChild(link);
          if (studio != itemText.split(', ')[itemText.split(',').length - 1]) {link.after(delim)};
        }; 
      }
      else if (label.textContent.includes('Country')) {
        let itemText = item.textContent;
        item.textContent = '';
        let linkLabel = document.createElement('label');
        itemText.split(', ').length > 1 ? linkLabel.textContent = 'Countries' : linkLabel.textContent = 'Country';
        item.appendChild(linkLabel);
        for (let studio of itemText.split(', ')) {
          let delim = document.createTextNode(', ');
          let link = document.createElement('a');
          let linkName = studio.replace('Countries','').replace('Country', '').replace(/ \+.*more/, '');
          link.setAttribute('href', 'https://trakt.tv/search?countries='+metaLang);
          link.textContent = linkName;
          item.appendChild(link);
          if (studio != itemText.split(', ')[itemText.split(',').length - 1]) {link.after(delim)};
        }; 
      }
    };
  };
});
