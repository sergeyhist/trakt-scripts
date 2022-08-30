// ==UserScript==
// @name        Trak.tv AdBlock
// @namespace   https://github.com/sergeyhist/trakt-scripts/trakt-adblock.user.js
// @match       *://trakt.tv/*
// @grant       GM_addStyle
// @version     1
// @author      Hist
// @description Block ads and vip banners for trakt.tv
// @run-at      document-start
// @homepageURL https://github.com/sergeyhist/trakt-scripts
// @downloadURL https://github.com/sergeyhist/trakt-scripts/raw/main/trakt-adblock.user.js
// ==/UserScript==
//
const adBlock=`
    *[id*='e20df'], *[class*='e20df'] {
      display: none!important;
    }
`;

GM_addStyle(adBlock);
