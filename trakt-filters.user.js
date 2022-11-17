// ==UserScript==
// @name        Trak.tv Filters
// @namespace   https://github.com/sergeyhist/trakt-scripts/trakt-hidden.user.js
// @match       *://trakt.tv/*
// @version     0.1
// @author      Hist
// @description Custom filters on search page
// @run-at      document-start
// @homepageURL https://github.com/sergeyhist/trakt-scripts
// @downloadURL https://github.com/sergeyhist/trakt-scripts/raw/main/trakt-hidden.user.js
// @grant       GM_addStyle
// @grant       GM_addResourceText
// @require     
// ==/UserScript==

GM_addStyle(`
.h-filters-block {
  display: grid;
  gap: 10px;
  margin-block: 30px;
}

.h-filters-button {
  border: 0;
  outline: 0;
}

.h-filter-selector {
  display: grid;
  gap: 2px;
  position: relative;
  cursor: pointer;
  background: #333;
  height: 28px;
  line-height: 28px;
  border-radius: 3px;
}

.h-filter-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 7px;
}

.h-filter-list {
  z-index: 1;
  background-color: #333;
  border-radius: 3px;
  visibility: hidden;
  opacity: 0;
  transition: .3s;
  height: 200px;
  overflow-y: scroll;
}

.h-filter-list > div:not(:last-child) {
  border-bottom: 1px solid #393939;
}

.h-filter-list > div {
  padding-inline: 7px;
}

.h-filter-list > div:hover {
  background-color: #6c6c6c;
  cursor: pointer;
}

.h-filters-button {
  color: #e6e5e5bd;
  background: linear-gradient(to bottom,#b71111b0,#131212);
  border-radius: 3px;
  padding-inline: 10px;
  padding-bottom: 4px;
  width: 100%;
}

.h-filters-button:hover {
  background: linear-gradient(to bottom,#db6b6bb0,#131212);
}

.h-visible {
  visibility: visible;
  opacity: 1;
}

.unselectable {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}
`)

const traktApiKey = 'd87cd4dc7419e7be1f670003b112ccbd66c4a67e8f360c71abd7a9aef8f46e8d';
const traktApiHeaders = {
  'Content-Type': 'application/json',
  'trakt-api-version': '2',
  'trakt-api-key': traktApiKey
};
const traktGetList = async (url, array) => {
  await fetch(url, {method: 'GET', headers: traktApiHeaders})
  .then(response => response.json())
  .then(data => {
    for (let item of data) {
      !array.includes(item) && array.push(item);
    };
  });
}

addEventListener('DOMContentLoaded', async () => {
  if (document.querySelector('.sidenav-inner')) {
    const sideBar = document.querySelector('.sidenav-inner');
    const createList = (block, title, list) => {
      block.classList.add('h-filter-selector');
      block.innerHTML = `<div class='h-filter-title unselectable'><span>${title}</span><span class='caret'></span></div><div class='h-filter-list'>`;
      block.querySelector('.h-filter-list').innerHTML = `<div class='h-filter-option'>None</div>`;

      for (let item of list) {
        let option = document.createElement('div');

        option.classList.add('h-filter-option');
        option.dataset.slug = item.slug ? item.slug : item.code ? item.code : '';
        option.textContent = item.name;
        
        block.querySelector('.h-filter-list').append(option);
      };

      const options = block.querySelectorAll('.h-filter-option');

      for (let option of options) {
        option.onclick = () => {
          if (option.textContent != 'None') {
            block.querySelector('span').textContent = option.textContent;
            block.dataset.slug = option.dataset.slug;
          } else {
            block.querySelector('span').textContent = title;
          };
        };
      };

      block.onclick = () => {
        if (block.querySelector('.h-filter-list').classList.contains('h-visible')) {
          block.querySelector('.h-filter-list').classList.remove('h-visible');
        } else {
          block.querySelector('.h-filter-list').classList.add('h-visible');
        };
      };
    };

    let languageList = [];
    let countryList = [];
    let genreList = [];

    await traktGetList('https://api.trakt.tv/languages/movies', languageList);
    await traktGetList('https://api.trakt.tv/languages/shows', languageList);
    await traktGetList('https://api.trakt.tv/countries/movies', countryList);
    await traktGetList('https://api.trakt.tv/countries/shows', countryList);
    await traktGetList('https://api.trakt.tv/genres/movies', genreList);
    await traktGetList('https://api.trakt.tv/genres/shows', genreList);

    let filtersBlock = document.createElement('div');
    let languageFilter = document.createElement('div');
    let countryFilter = document.createElement('div');
    let genreFilter = document.createElement('div');
    let yearFilter = document.createElement('div');
    let submitButton = document.createElement('button');

    filtersBlock.classList.add('h-filters-block');
    filtersBlock.innerHTML = `<h1 class='h-filters-title'>Filters</h1>`;
    yearFilter.innerHTML = `<input id='h-year' class="sidenav-text-field" type="text" placeholder="Years (e.g. 2019 or 2019-2022)">`;
    submitButton.classList.add('h-filters-button');
    submitButton.textContent = 'Apply Filters';

    submitButton.onclick = () => {
      let searchStringElements = ['https://trakt.tv/search?'];

      yearFilter.querySelector('input').value && searchStringElements.push('years='+yearFilter.querySelector('input').value);
      genreFilter.querySelector('span').textContent != 'Genre' && searchStringElements.push('genres='+genreFilter.dataset.slug);
      countryFilter.querySelector('span').textContent != 'Country' && searchStringElements.push('countries='+countryFilter.dataset.slug);
      languageFilter.querySelector('span').textContent != 'Language' && searchStringElements.push('languages='+languageFilter.dataset.slug);

      window.open(searchStringElements.join('&').replace('&', ''), '_self');
    };
    
    createList(languageFilter, 'Language', languageList);
    createList(countryFilter, 'Country', countryList);
    createList(genreFilter, 'Genre', genreList);

    filtersBlock.append(yearFilter);
    filtersBlock.append(genreFilter);
    filtersBlock.append(countryFilter);
    filtersBlock.append(languageFilter);
    filtersBlock.append(submitButton);
    sideBar.append(filtersBlock);
  };
})
