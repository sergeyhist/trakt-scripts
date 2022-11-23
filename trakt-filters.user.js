// ==UserScript==
// @name        Trak.tv Filters
// @namespace   https://github.com/sergeyhist/trakt-scripts/trakt-filters.user.js
// @match       *://trakt.tv/search*
// @match       *://trakt.tv/movies*
// @match       *://trakt.tv/shows*
// @version     1.3.2
// @author      Hist
// @description Custom filters on search page
// @run-at      document-start
// @homepageURL https://github.com/sergeyhist/trakt-scripts
// @downloadURL https://github.com/sergeyhist/trakt-scripts/raw/main/trakt-filters.user.js
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @resource    genreJSON https://github.com/sergeyhist/trakt-scripts/raw/main/Data/genre.json
// @resource    countryJSON https://github.com/sergeyhist/trakt-scripts/raw/main/Data/country.json
// @resource    languageJSON https://github.com/sergeyhist/trakt-scripts/raw/main/Data/language.json
// @resource    networkJSON https://github.com/sergeyhist/trakt-scripts/raw/main/Data/network.json
// ==/UserScript==

GM_addStyle(`
.sidenav {
  display: none;
}

.h-filters-nav {
  display: flex;
  justify-content: center;
  height: 700px;
  width: 300px;
  float: left;
  margin-top: 50px;
}

.h-filters-content {
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: fixed;
  width: 300px;
  max-width: 1000px;
  padding: 15px 20px 20px;
  background-color: #1d1d1d;
  color: white;
}

.h-filters-content > h1, .h-filters-content > h2 {
  margin: 0;
  padding: 0;
}

.h-filters-content > h1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 36px;
}

.h-filters-content > h1 > span:nth-child(2) {
  font-size: 25px;
}

.h-filters-content > h2 {
  font-size: 16px;
  margin-block: 5px;
}

.h-filters-wrapper {
  display: flex;
  gap: 10px;
  align-items: center;
}

.h-filters-wrapper > div {
  font-size: 20px;
  margin-top: 6px;
}

.h-filter-selector {
  display: grid;
  gap: 2px;
  position: relative;
  cursor: pointer;
  line-height: 28px;
}

.h-filter-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 7px;
  background: #333;
  overflow: hidden;
  border-radius: 3px;
}

.h-filter-title > span:nth-child(1) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 5px;
}

.h-filter-list {
  z-index: 1;
  background-color: #333;
  border-radius: 3px;
  visibility: hidden;
  opacity: 0;
  transition: .3s;
  max-height: 0;
  overflow-y: scroll;
  overscroll-behavior: contain;
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

.h-filters-buttons {
  display: flex;
  gap: 10px;
}

.h-filters-buttons > button {
  border: 0;
  outline: 0;
  color: #e6e5e5bd;
  border-radius: 3px;
  padding-inline: 10px;
  padding-bottom: 4px;
  width: 100%;
  background-color: #b110109e;
  transition: .5s;
}

.h-filters-buttons > button:hover {
  background-color: #b1101063;
}

.h-visible {
  visibility: visible;
  opacity: 1;
  max-height: 140px;
}

.unselectable {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}

@media (0 < width < 1025px) {
  .h-filters-nav {
    float: none;
    width: auto;
    height: auto;
  }

  .h-filters-block {
    min-height: auto;
  }

  .h-filters-content {
    position: initial;
    width: 100%;
    height: auto;
  }
}

@media (width > 1024px) and (height < 700px) {
  .frame-wrapper .frame {
    margin-left: 0!important;
    margin-top: 0!important;
  }

  .frame-wrapper .frame .no-results {
    position: initial!important;
    transform: none!important;
    -ms-transform: none!important;
    -webkit-transform: none!important;
  }

  .h-filters-nav {
    float: none;
    width: auto;
    height: auto;
  }

  .h-filters-block {
    min-height: auto;
  }

  .h-filters-content {
    position: initial;
    width: 100%;
    height: auto;
  }
}
`);

const genreList = JSON.parse(GM_getResourceText('genreJSON'));
const countryList = JSON.parse(GM_getResourceText('countryJSON'));
const languageList = JSON.parse(GM_getResourceText('languageJSON'));
const networkList = JSON.parse(GM_getResourceText('networkJSON'));
const linkTypes = [
  {
    name: 'Movies',
    slug: 'movies'
  },
  {
    name: 'TV Shows',
    slug: 'shows'
  },
  {
    name: 'Search',
    slug: 'search'
  }
];
const typeList = [
  {
    name: 'Movies',
    slug: 'movies'
  },
  {
    name: 'Shows',
    slug: 'shows'
  },
  {
    name: 'Episodes',
    slug: 'episodes'
  },
  {
    name: 'People',
    slug: 'people'
  },
  {
    name: 'Lists',
    slug: 'lists'
  },
  {
    name: 'Users',
    slug: 'users'
  }
];
const categoryList = [
  {
    name: "Trending",
    slug: "trending"
  },
  {
    name: "Popular",
    slug: "popular"
  },
  {
    name: "Recommended",
    slug: "recommended"
  },
  {
    name: "Watched",
    slug: "watched"
  },
  {
    name: "Collected",
    slug: "collected"
  },
  {
    name: "Anticipated",
    slug: "anticipated"
  }
];
const createList = (block, title, list, url) => {
  let slug = !['All', 'Category'].includes(title) ? document.URL.includes(url+'=') && document.URL.split(url+'=').pop().split('&')[0] : document.URL.split('/')[4] && document.URL.split('/')[4].split('?')[0];

  block.classList.add('h-filter-selector');
  block.tabIndex = 0;
  block.innerHTML = `<div class='h-filter-title unselectable'><span>${title}</span><span class='caret'></span></div><div class='h-filter-list unselectable'>`;
  block.querySelector('.h-filter-list').innerHTML = `<div class='h-filter-option'>None</div>`;

  for (let item of list) {
    let option = document.createElement('div');

    option.classList.add('h-filter-option');
    option.dataset.slug = item.slug ? item.slug : item.code ? item.code : item.name;
    option.textContent = item.name;

    if (slug && encodeURIComponent(option.dataset.slug) == slug) {
      block.querySelector('.h-filter-title > span').textContent = option.textContent;
      block.dataset.slug = option.dataset.slug;
    };

    block.querySelector('.h-filter-list').append(option);
  };

  for (let option of block.querySelectorAll('.h-filter-option')) {
    option.onclick = () => {
      if (option.textContent != 'None') {
        block.querySelector('span').textContent = option.textContent;
        block.dataset.slug = option.dataset.slug;
      } else {
        block.querySelector('span').textContent = title;
      };
    };
  };

  document.addEventListener('click', (e) => {
    if (!block.contains(e.target) || block.querySelector('.h-filter-list').classList.contains('h-visible')) {
      block.querySelector('.h-filter-list').classList.remove('h-visible');
    } else {
      block.querySelector('.h-filter-list').classList.add('h-visible');
    };
  });
};

addEventListener('DOMContentLoaded', async () => {
  const sideNav = document.querySelector('.sidenav-inner');

  if (sideNav && !['trakt', 'tmdb', 'tvdb', 'imdb'].includes(document.URL.split('/')[4]?.split('?')[0])) {
    const searchTitle = sideNav.querySelector('h1')?.cloneNode(true);
    const searchInfo = sideNav.querySelector('h2')?.cloneNode(true);
    const prevElement = searchTitle.querySelector('.prev')?.cloneNode(true);
    const nextElement = searchTitle.querySelector('.next')?.cloneNode(true);
    const dropdownElement = searchTitle.querySelector('span.dropdown.filter-dropdown')?.cloneNode(true);

    searchTitle.innerHTML = `<span class="h-filters-wrapper">`;
    searchTitle.append(dropdownElement);
    prevElement && searchTitle.querySelector('.h-filters-wrapper').append(prevElement);
    searchTitle.querySelector('.h-filters-wrapper').append(document.createTextNode((linkTypes.find(element => element.slug == document.URL.split('/')[3].split('?')[0]).name)));
    nextElement && searchTitle.querySelector('.h-filters-wrapper').append(nextElement);

    let filtersNav = document.createElement('div');
    let filtersContent = document.createElement('div');
    let searchString = document.createElement('div');
    let typeFilter = document.createElement('div');
    let categoryFilter = document.createElement('div');
    let genreFilter = document.createElement('div');
    let countryFilter = document.createElement('div');
    let languageFilter = document.createElement('div');
    let networkFilter = document.createElement('div');
    let yearFilter = document.createElement('div');
    let studioFilter = document.createElement('div');
    let buttonsBlock = document.createElement('div');
    let submitButton = document.createElement('button');
    let resetButton = document.createElement('button');

    filtersNav.classList.add('h-filters-nav');
    filtersContent.classList.add('h-filters-content');
    searchString.innerHTML = `<input id='h-search' class="sidenav-text-field" type="text" placeholder="What are you looking for?">`;
    searchString.querySelector('input').value = document.URL.includes('query=') ? decodeURIComponent(document.URL.split('query=').pop().split('&')[0]?.replace(/\+/g, '%20')) : '';
    yearFilter.innerHTML = `<input id='h-year' class="sidenav-text-field" type="text" placeholder="Years (e.g. 2019 or 2019-2022)">`;
    yearFilter.querySelector('input').value = document.URL.includes('years=') ? document.URL.split('years=').pop().split('&')[0] : '';
    studioFilter.innerHTML = `<input id='h-studio' class="sidenav-text-field" type="text" placeholder="Studio name (e.g. Amazon Studios)">`;
    studioFilter.querySelector('input').value = document.URL.includes('studios=') ? document.URL.split('studios=').pop().split('&')[0] : '';
    buttonsBlock.classList.add('h-filters-buttons');
    submitButton.textContent = 'Apply';
    resetButton.textContent = 'Reset';

    createList(typeFilter, 'All', typeList);
    createList(categoryFilter, 'Category', categoryList);
    createList(genreFilter, 'Genre', genreList, 'genres');
    createList(countryFilter, 'Country', countryList, 'countries');
    createList(languageFilter, 'Language', languageList, 'languages');
    createList(networkFilter, 'Network', networkList, 'networks')

    filtersContent.append(searchTitle);
    filtersContent.append(searchInfo);
    filtersContent.append(searchString);

    if (document.URL.includes('/search')) {
      filtersContent.append(typeFilter);
    } else {
      filtersContent.append(categoryFilter);
    };

    submitButton.onclick = () => {
      let contentType;
      let searchStringElements = [];
      let studioElement = studioFilter.querySelector('input').value.toLowerCase().replace(/[^a-z0-9]/gi, '-').replace(/\-+/g, '-');

      studioElement = studioElement[studioElement.length - 1] == '-' ? studioElement.slice(0,-1) : studioElement;
      studioElement = studioElement[0] == '-' ? studioElement.slice(1) : studioElement;

      if (document.URL.includes('/search')) {
        contentType = typeFilter.querySelector('span').textContent != 'All' ? '/search/' + typeFilter.dataset.slug : '/search';
      } else {
        contentType = '/' + document.URL.split('/')[3] + '/' + categoryFilter.dataset.slug;
      };

      searchString.querySelector('input').value && searchStringElements.push('query=' + encodeURIComponent(searchString.querySelector('input').value).replace(/%20/g, '+'));
      if (!['lists', 'users', 'people'].includes(contentType?.split('/')[2])) {
        genreFilter.querySelector('span').textContent != 'Genre' && searchStringElements.push('genres=' + genreFilter.dataset.slug);
        countryFilter.querySelector('span').textContent != 'Country' && searchStringElements.push('countries=' + countryFilter.dataset.slug);
        languageFilter.querySelector('span').textContent != 'Language' && searchStringElements.push('languages=' + languageFilter.dataset.slug);
        !document.URL.split('?')[0].includes('movies') && networkFilter.querySelector('span').textContent != 'Network' && searchStringElements.push('networks=' + networkFilter.dataset.slug);
        yearFilter.querySelector('input').value && searchStringElements.push('years=' + yearFilter.querySelector('input').value);
        studioFilter.querySelector('input').value && searchStringElements.push('studios=' + encodeURIComponent(studioElement));
      };

      window.open('https://trakt.tv' + contentType + '?' + searchStringElements.join('&'), '_self');
    };

    resetButton.onclick = () => {
      if (document.URL.includes('/search')) {
        window.open('https://trakt.tv/search', '_self');
      } else {
        window.open('https://trakt.tv/' + document.URL.split('/')[3] + '/trending', '_self');
      };
    };

    document.addEventListener('keydown', (e) => {
      if (e.key == 'Enter' && filtersContent.contains(e.target)) {
        submitButton.dispatchEvent(new Event('click'));
      };
    });

    buttonsBlock.append(submitButton);
    if (!['lists', 'users', 'people'].includes(document.URL.split('/')[4]?.split('?')[0])) {
      buttonsBlock.append(resetButton);
      filtersContent.append(genreFilter);
      filtersContent.append(countryFilter);
      filtersContent.append(languageFilter);
      !document.URL.split('?')[0].includes('movies') && filtersContent.append(networkFilter);
      filtersContent.append(yearFilter);
      filtersContent.append(studioFilter);
    };
    filtersContent.append(buttonsBlock);
    filtersNav.append(filtersContent);
    sideNav.parentElement.before(filtersNav);
  };
})
