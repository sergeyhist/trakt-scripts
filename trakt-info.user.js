// ==UserScript==
// @name        Trak.tv Clickable Info
// @namespace   https://github.com/sergeyhist/trakt-scripts/trakt-dark-knight.user.js
// @match       *://trakt.tv/shows*
// @match       *://trakt.tv/movies*
// @version     2.0
// @author      Hist
// @description Clickable info on trakt movie/show page
// @run-at      document-start
// @homepageURL https://github.com/sergeyhist/trakt-scripts
// @downloadURL https://github.com/sergeyhist/trakt-scripts/raw/main/trakt-info.user.js
// @grant       GM_getResourceText
// @resource    genreJSON https://github.com/sergeyhist/trakt-scripts/raw/main/Data/genre.json
// @resource    countryJSON https://github.com/sergeyhist/trakt-scripts/raw/main/Data/country.json
// @resource    languageJSON https://github.com/sergeyhist/trakt-scripts/raw/main/Data/language.json
// @resource    networkJSON https://github.com/sergeyhist/trakt-scripts/raw/main/Data/network.json
// ==/UserScript==

const genreList = JSON.parse(GM_getResourceText('genreJSON'));
const countryList = JSON.parse(GM_getResourceText('countryJSON'));
const languageList = JSON.parse(GM_getResourceText('languageJSON'));
const networkList = JSON.parse(GM_getResourceText('networkJSON'));
const type = document.URL.split('/')[3];
const id = document.URL.split('/')[4];
const traktApiKey = 'd87cd4dc7419e7be1f670003b112ccbd66c4a67e8f360c71abd7a9aef8f46e8d';
const traktApiHeaders = {
  'Content-Type': 'application/json',
  'trakt-api-version': '2',
  'trakt-api-key': traktApiKey
};
const createInfo = (array, type, list, block) => {
  for (let element of array) {
    let link = document.createElement('a');

    link.href = `/search?${type}=${encodeURIComponent(element)}`;
    link.textContent = list.find(item => (item.slug ? item.slug : item.code ? item.code : item.name) == element)?.name;
    block.append(link);
    element != array.slice(-1)[0] && block.append(document.createTextNode(', '));
  };
};

addEventListener('DOMContentLoaded', () => {
  const info = document.querySelector('.additional-stats');
  const infoLabels = info.querySelectorAll('label');

  for (let label of infoLabels) {['Genres', 'Country', 'Language', 'Studios', 'Network'].includes(label.textContent) && label.parentNode.remove()};
});

await fetch(`https://api.trakt.tv/${type}/${id}?extended=full`, {method: 'GET', headers: traktApiHeaders})
.then(response => response.json())
.then(data => {
  const info = document.querySelector('.additional-stats');
  let yearInfo = document.createElement('li');
  let genreInfo = document.createElement('li');
  let countryInfo = document.createElement('li');
  let languageInfo = document.createElement('li');
  let networkInfo = document.createElement('li');
  
  yearInfo.innerHTML = `<label>Year</label><a href="/search?years=${data.year}">${data.year}</a>`;
  genreInfo.innerHTML = `<label>Genres</label>`;
  countryInfo.innerHTML = `<label>Country</label>`;
  languageInfo.innerHTML = `<label>Language</label>`;
  networkInfo.innerHTML = `<label>Network</label>`;

  createInfo(data.genres, 'genres', genreList, genreInfo);
  createInfo([data.country], 'countries', countryList, countryInfo);
  createInfo([data.language], 'languages', languageList, languageInfo);
  createInfo([data.network], 'networks', networkList, networkInfo);

  info.append(yearInfo);
  info.append(genreInfo);
  info.append(countryInfo);
  info.append(languageInfo);
  info.append(networkInfo);
});

fetch(`https://api.trakt.tv/${type}/${id}/studios`, {method: 'GET', headers: traktApiHeaders})
.then(response => response.json())
.then(data => {
  console.log(data);
  const info = document.querySelector('.additional-stats');
  let studioInfo = document.createElement('li');

  studioInfo.innerHTML = `<label>Studio${data.length > 1 ? 's': ''}</label>`;

  for (let studio of data) {
    let link = document.createElement('a');

    link.href = `/search?studios=${studio.ids.slug}`;
    link.textContent = studio.name;

    studioInfo.append(link);

    studio != data.slice(-1)[0] && studioInfo.append(document.createTextNode(', '));
  };

  info.append(studioInfo);
});
