// ==UserScript==
// @name        Trak.tv Clickable Info
// @namespace   https://github.com/sergeyhist/trakt-scripts/trakt-dark-knight.user.js
// @match       *://trakt.tv/*
// @version     1.0.1
// @author      Hist
// @description Clickable info on trakt movie/show page
// @run-at      document-start
// @homepageURL https://github.com/sergeyhist/trakt-scripts
// @downloadURL https://github.com/sergeyhist/trakt-scripts/raw/main/trakt-info.user.js
// ==/UserScript==

setInterval(() => {
  const stats = document.querySelector('.additional-stats');
  
  if (stats && !stats.classList.contains('parsed')) {
    const infoItems = stats.querySelectorAll('li');

    function infoParser(block, type, names) {
      if (type == 'network') {
        let name = block.textContent.split(' on ').pop();
        let newBlock = document.createElement('li');
        newBlock.innerHTML = `<label>Network</label><a href='https://trakt.tv/search?networks=${name}'>${name}</a>`;
        block.innerHTML = block.innerHTML.replace(' on '+name, '');
        block.after(newBlock);
      } else {
        block.querySelector('label').remove();
        let blockText = block.innerText;
        block.innerText = '';
        let linkLabel = document.createElement('label');
        blockText.split(', ').length > 1 ? linkLabel.textContent = names[1] : linkLabel.textContent = names[0];
        block.appendChild(linkLabel);
        for (let name of blockText.split(', ')) {
          let delim = document.createTextNode(', ');
          let link = document.createElement('a');
          let linkName = name.replace(/ \+.*more/, '');

          if (type == 'countries') {
            let lang = countryList[linkName]
            link.setAttribute('href', 'https://trakt.tv/search?'+type+'='+lang?.toLowerCase());
          } else if (type == 'languages') {
            let lang = languageList[linkName]
            link.setAttribute('href', 'https://trakt.tv/search?'+type+'='+lang?.toLowerCase());
          } else if (type == 'networks') {
            link.setAttribute('href', 'https://trakt.tv/search?'+type+'='+linkName);
          } else {
            link.setAttribute('href', 'https://trakt.tv/search?'+type+'='+linkName.replace(/[^0-9a-z]/gi, '-').toLowerCase()); 
          };

          link.textContent = linkName;
          block.appendChild(link);
          if (name != blockText.split(', ')[blockText.split(',').length - 1]) {link.after(delim)};
        };
      };
    }

    for (let item of infoItems) {
      let label = item.querySelector('label');
      if (label.textContent.includes('Studio')) {infoParser(item, 'studios', ['Studio', 'Studios'])}
      else if (label.textContent.includes('Genre')) {infoParser(item, 'genres', ['Genre', 'Genres'])}
      else if (label.textContent.includes('Language')) {infoParser(item, 'languages', ['Language', 'Languages'])}
      else if (label.textContent.includes('Countr')) {infoParser(item, 'countries', ['Country', 'Countries'])}
      else if (label.textContent.includes('Network')) {infoParser(item, 'networks', ['Network', 'Networks'])}
      else if (['Airs', 'Premiered', 'Aired'].includes(label.textContent)) {infoParser(item, 'network')};
    };

    stats.classList.add('parsed');
  };
}, 100);

const countryList = {
  Afghanistan: 'AF',
  'Aland Islands': 'AX',
  Albania: 'AL',
  Algeria: 'DZ',
  'American Samoa': 'AS',
  Andorra: 'AD',
  Angola: 'AO',
  Anguilla: 'AI',
  Antarctica: 'AQ',
  'Antigua And Barbuda': 'AG',
  Argentina: 'AR',
  Armenia: 'AM',
  Aruba: 'AW',
  Australia: 'AU',
  Austria: 'AT',
  Azerbaijan: 'AZ',
  Bahamas: 'BS',
  Bahrain: 'BH',
  Bangladesh: 'BD',
  Barbados: 'BB',
  Belarus: 'BY',
  Belgium: 'BE',
  Belize: 'BZ',
  Benin: 'BJ',
  Bermuda: 'BM',
  Bhutan: 'BT',
  Bolivia: 'BO',
  'Bosnia And Herzegovina': 'BA',
  Botswana: 'BW',
  'Bouvet Island': 'BV',
  Brazil: 'BR',
  'British Indian Ocean Territory': 'IO',
  'Brunei Darussalam': 'BN',
  Bulgaria: 'BG',
  'Burkina Faso': 'BF',
  Burundi: 'BI',
  Cambodia: 'KH',
  Cameroon: 'CM',
  Canada: 'CA',
  'Cape Verde': 'CV',
  'Cayman Islands': 'KY',
  'Central African Republic': 'CF',
  Chad: 'TD',
  Chile: 'CL',
  China: 'CN',
  'Christmas Island': 'CX',
  'Cocos (Keeling) Islands': 'CC',
  Colombia: 'CO',
  Comoros: 'KM',
  Congo: 'CG',
  'Congo, Democratic Republic': 'CD',
  'Cook Islands': 'CK',
  'Costa Rica': 'CR',
  "Cote D'Ivoire": 'CI',
  Croatia: 'HR',
  Cuba: 'CU',
  Cyprus: 'CY',
  'Czech Republic': 'CZ',
  Denmark: 'DK',
  Djibouti: 'DJ',
  Dominica: 'DM',
  'Dominican Republic': 'DO',
  Ecuador: 'EC',
  Egypt: 'EG',
  'El Salvador': 'SV',
  'Equatorial Guinea': 'GQ',
  Eritrea: 'ER',
  Estonia: 'EE',
  Ethiopia: 'ET',
  'Falkland Islands (Malvinas)': 'FK',
  'Faroe Islands': 'FO',
  Fiji: 'FJ',
  Finland: 'FI',
  France: 'FR',
  'French Guiana': 'GF',
  'French Polynesia': 'PF',
  'French Southern Territories': 'TF',
  Gabon: 'GA',
  Gambia: 'GM',
  Georgia: 'GE',
  Germany: 'DE',
  Ghana: 'GH',
  Gibraltar: 'GI',
  Greece: 'GR',
  Greenland: 'GL',
  Grenada: 'GD',
  Guadeloupe: 'GP',
  Guam: 'GU',
  Guatemala: 'GT',
  Guernsey: 'GG',
  Guinea: 'GN',
  'Guinea-Bissau': 'GW',
  Guyana: 'GY',
  Haiti: 'HT',
  'Heard Island & Mcdonald Islands': 'HM',
  'Holy See (Vatican City State)': 'VA',
  Honduras: 'HN',
  'Hong Kong': 'HK',
  Hungary: 'HU',
  Iceland: 'IS',
  India: 'IN',
  Indonesia: 'ID',
  'Iran, Islamic Republic Of': 'IR',
  Iraq: 'IQ',
  Ireland: 'IE',
  'Isle Of Man': 'IM',
  Israel: 'IL',
  Italy: 'IT',
  Jamaica: 'JM',
  Japan: 'JP',
  Jersey: 'JE',
  Jordan: 'JO',
  Kazakhstan: 'KZ',
  Kenya: 'KE',
  Kiribati: 'KI',
  Korea: 'KR',
  Kuwait: 'KW',
  Kyrgyzstan: 'KG',
  "Lao People's Democratic Republic": 'LA',
  Latvia: 'LV',
  Lebanon: 'LB',
  Lesotho: 'LS',
  Liberia: 'LR',
  'Libyan Arab Jamahiriya': 'LY',
  Liechtenstein: 'LI',
  Lithuania: 'LT',
  Luxembourg: 'LU',
  Macao: 'MO',
  Macedonia: 'MK',
  Madagascar: 'MG',
  Malawi: 'MW',
  Malaysia: 'MY',
  Maldives: 'MV',
  Mali: 'ML',
  Malta: 'MT',
  'Marshall Islands': 'MH',
  Martinique: 'MQ',
  Mauritania: 'MR',
  Mauritius: 'MU',
  Mayotte: 'YT',
  Mexico: 'MX',
  'Micronesia, Federated States Of': 'FM',
  Moldova: 'MD',
  Monaco: 'MC',
  Mongolia: 'MN',
  Montenegro: 'ME',
  Montserrat: 'MS',
  Morocco: 'MA',
  Mozambique: 'MZ',
  Myanmar: 'MM',
  Namibia: 'NA',
  Nauru: 'NR',
  Nepal: 'NP',
  Netherlands: 'NL',
  'Netherlands Antilles': 'AN',
  'New Caledonia': 'NC',
  'New Zealand': 'NZ',
  Nicaragua: 'NI',
  Niger: 'NE',
  Nigeria: 'NG',
  Niue: 'NU',
  'Norfolk Island': 'NF',
  'Northern Mariana Islands': 'MP',
  Norway: 'NO',
  Oman: 'OM',
  Pakistan: 'PK',
  Palau: 'PW',
  'Palestinian Territory, Occupied': 'PS',
  Panama: 'PA',
  'Papua New Guinea': 'PG',
  Paraguay: 'PY',
  Peru: 'PE',
  Philippines: 'PH',
  Pitcairn: 'PN',
  Poland: 'PL',
  Portugal: 'PT',
  'Puerto Rico': 'PR',
  Qatar: 'QA',
  Reunion: 'RE',
  Romania: 'RO',
  'Russian Federation': 'RU',
  Rwanda: 'RW',
  'Saint Barthelemy': 'BL',
  'Saint Helena': 'SH',
  'Saint Kitts And Nevis': 'KN',
  'Saint Lucia': 'LC',
  'Saint Martin': 'MF',
  'Saint Pierre And Miquelon': 'PM',
  'Saint Vincent And Grenadines': 'VC',
  Samoa: 'WS',
  'San Marino': 'SM',
  'Sao Tome And Principe': 'ST',
  'Saudi Arabia': 'SA',
  Senegal: 'SN',
  Serbia: 'RS',
  Seychelles: 'SC',
  'Sierra Leone': 'SL',
  Singapore: 'SG',
  Slovakia: 'SK',
  Slovenia: 'SI',
  'Solomon Islands': 'SB',
  Somalia: 'SO',
  'South Africa': 'ZA',
  'South Georgia And Sandwich Isl.': 'GS',
  Spain: 'ES',
  'Sri Lanka': 'LK',
  Sudan: 'SD',
  Suriname: 'SR',
  'Svalbard And Jan Mayen': 'SJ',
  Swaziland: 'SZ',
  Sweden: 'SE',
  Switzerland: 'CH',
  'Syrian Arab Republic': 'SY',
  Taiwan: 'TW',
  Tajikistan: 'TJ',
  Tanzania: 'TZ',
  Thailand: 'TH',
  'Timor-Leste': 'TL',
  Togo: 'TG',
  Tokelau: 'TK',
  Tonga: 'TO',
  'Trinidad And Tobago': 'TT',
  Tunisia: 'TN',
  Turkey: 'TR',
  Turkmenistan: 'TM',
  'Turks And Caicos Islands': 'TC',
  Tuvalu: 'TV',
  Uganda: 'UG',
  Ukraine: 'UA',
  'United Arab Emirates': 'AE',
  'United Kingdom': 'GB',
  'United States': 'US',
  'United States Outlying Islands': 'UM',
  Uruguay: 'UY',
  Uzbekistan: 'UZ',
  Vanuatu: 'VU',
  Venezuela: 'VE',
  'Viet Nam': 'VN',
  'Virgin Islands, British': 'VG',
  'Virgin Islands, U.S.': 'VI',
  'Wallis And Futuna': 'WF',
  'Western Sahara': 'EH',
  Yemen: 'YE',
  Zambia: 'ZM',
  Zimbabwe: 'ZW',
  'North Macedonia': 'MK',
  Češka: 'CZ'
}
const languageList = {
  'Abkhaz': 'ab',
  'Afar': 'aa',
  'Afrikaans': 'af',
  'Akan': 'ak',
  'Albanian': 'sq',
  'Amharic': 'am',
  'Arabic': 'ar',
  'Aragonese': 'an',
  'Armenian': 'hy',
  'Assamese': 'as',
  'Avaric': 'av',
  'Avestan': 'ae',
  'Aymara': 'ay',
  'Azerbaijani': 'az',
  'Bambara': 'bm',
  'Bashkir': 'ba',
  'Basque': 'eu',
  'Belarusian': 'be',
  'Bengali': 'bn',
  'Bihari': 'bh',
  'Bislama': 'bi',
  'Bosnian': 'bs',
  'Breton': 'br',
  'Bulgarian': 'bg',
  'Burmese': 'my',
  'Catalan; Valencian': 'ca',
  'Chamorro': 'ch',
  'Chechen': 'ce',
  'Chichewa; Chewa; Nyanja': 'ny',
  'Chinese': 'zh',
  'Chuvash': 'cv',
  'Cornish': 'kw',
  'Corsican': 'co',
  'Cree': 'cr',
  'Croatian': 'hr',
  'Czech': 'cs',
  'Danish': 'da',
  'Divehi; Dhivehi; Maldivian;': 'dv',
  'Dutch': 'nl',
  'English': 'en',
  'Esperanto': 'eo',
  'Estonian': 'et',
  'Ewe': 'ee',
  'Faroese': 'fo',
  'Fijian': 'fj',
  'Finnish': 'fi',
  'French': 'fr',
  'Fula; Fulah; Pulaar; Pular': 'ff',
  'Galician': 'gl',
  'Georgian': 'ka',
  'German': 'de',
  'Greek, Modern': 'el',
  'Guaraní': 'gn',
  'Gujarati': 'gu',
  'Haitian; Haitian Creole': 'ht',
  'Hausa': 'ha',
  'Hebrew (modern)': 'he',
  'Herero': 'hz',
  'Hindi': 'hi',
  'Hiri Motu': 'ho',
  'Hungarian': 'hu',
  'Interlingua': 'ia',
  'Indonesian': 'id',
  'Interlingue': 'ie',
  'Irish': 'ga',
  'Igbo': 'ig',
  'Inupiaq': 'ik',
  'Ido': 'io',
  'Icelandic': 'is',
  'Italian': 'it',
  'Inuktitut': 'iu',
  'Japanese': 'ja',
  'Javanese': 'jv',
  'Kalaallisut, Greenlandic': 'kl',
  'Kannada': 'kn',
  'Kanuri': 'kr',
  'Kashmiri': 'ks',
  'Kazakh': 'kk',
  'Khmer': 'km',
  'Kikuyu, Gikuyu': 'ki',
  'Kinyarwanda': 'rw',
  'Kirghiz, Kyrgyz': 'ky',
  'Komi': 'kv',
  'Kongo': 'kg',
  'Korean': 'ko',
  'Kurdish': 'ku',
  'Kwanyama, Kuanyama': 'kj',
  'Latin': 'la',
  'Luxembourgish, Letzeburgesch': 'lb',
  'Luganda': 'lg',
  'Limburgish, Limburgan, Limburger': 'li',
  'Lingala': 'ln',
  'Lao': 'lo',
  'Lithuanian': 'lt',
  'Luba-Katanga': 'lu',
  'Latvian': 'lv',
  'Manx': 'gv',
  'Macedonian': 'mk',
  'Malagasy': 'mg',
  'Malay': 'ms',
  'Malayalam': 'ml',
  'Maltese': 'mt',
  'Māori': 'mi',
  'Marathi (Marāṭhī)': 'mr',
  'Marshallese': 'mh',
  'Mongolian': 'mn',
  'Nauru': 'na',
  'Navajo, Navaho': 'nv',
  'Norwegian Bokmål': 'nb',
  'North Ndebele': 'nd',
  'Nepali': 'ne',
  'Ndonga': 'ng',
  'Norwegian Nynorsk': 'nn',
  'Norwegian': 'no',
  'Nuosu': 'ii',
  'South Ndebele': 'nr',
  'Occitan': 'oc',
  'Ojibwe, Ojibwa': 'oj',
  'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic': 'cu',
  'Oromo': 'om',
  'Oriya': 'or',
  'Ossetian, Ossetic': 'os',
  'Panjabi, Punjabi': 'pa',
  'Pāli': 'pi',
  'Persian': 'fa',
  'Polish': 'pl',
  'Pashto, Pushto': 'ps',
  'Portuguese': 'pt',
  'Quechua': 'qu',
  'Romansh': 'rm',
  'Kirundi': 'rn',
  'Romanian, Moldavian, Moldovan': 'ro',
  'Russian': 'ru',
  'Sanskrit (Saṁskṛta)': 'sa',
  'Sardinian': 'sc',
  'Sindhi': 'sd',
  'Northern Sami': 'se',
  'Samoan': 'sm',
  'Sango': 'sg',
  'Serbian': 'sr',
  'Scottish Gaelic; Gaelic': 'gd',
  'Shona': 'sn',
  'Sinhala, Sinhalese': 'si',
  'Slovak': 'sk',
  'Slovene': 'sl',
  'Somali': 'so',
  'Southern Sotho': 'st',
  'Spanish; Castilian': 'es',
  'Sundanese': 'su',
  'Swahili': 'sw',
  'Swati': 'ss',
  'Swedish': 'sv',
  'Tamil': 'ta',
  'Telugu': 'te',
  'Tajik': 'tg',
  'Thai': 'th',
  'Tigrinya': 'ti',
  'Tibetan Standard, Tibetan, Central': 'bo',
  'Turkmen': 'tk',
  'Tagalog': 'tl',
  'Tswana': 'tn',
  'Tonga (Tonga Islands)': 'to',
  'Turkish': 'tr',
  'Tsonga': 'ts',
  'Tatar': 'tt',
  'Twi': 'tw',
  'Tahitian': 'ty',
  'Uighur, Uyghur': 'ug',
  'Ukrainian': 'uk',
  'Urdu': 'ur',
  'Uzbek': 'uz',
  'Venda': 've',
  'Vietnamese': 'vi',
  'Volapük': 'vo',
  'Walloon': 'wa',
  'Welsh': 'cy',
  'Wolof': 'wo',
  'Western Frisian': 'fy',
  'Xhosa': 'xh',
  'Yiddish': 'yi',
  'Yoruba': 'yo',
  'Zhuang, Chuang': 'za'
}
