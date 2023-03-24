import './css/styles.css';
import {fetchCountries} from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector("#search-box");
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

const cleanMarkup = ref => (ref.innerHTML = '');

const handleSearchCountyes = event => {
  let searchCountry = event.target.value.trim();

  if (!searchCountry) {
    cleanMarkup(countryList);
    cleanMarkup(countryInfo);
    return;
  }

  fetchCountries(searchCountry).
  then(data => {
    console.log(data);
    if (data.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name');
      return;
    }
    renderMarkup(data);
  })
  .catch(err => {
    cleanMarkup(countryList);
    cleanMarkup(countryInfo);
    Notify.failure('Oops, there is no country with that name');
  });
}

const renderMarkup = data => {
  if (data.length === 1) {
    cleanMarkup(countryList);
    const markupInfo = createInfoMarkup(data);
    countryInfo.innerHTML = markupInfo;
  } else {
    cleanMarkup(countryInfo);
    const markupList = createListMarkup(data);
    countryList.innerHTML = markupList;
  }
}

const createInfoMarkup = data => {
  return data.map(({ capital, flags, languages, name, population }) => 
  `<img src="${flags.svg}" alt="${name.official}" width="200" height="100">
  <h1>${name.official}</h1>
  <p>Capital: ${capital}</p>
  <p>Population: ${population}</p>
  <p>Languages: ${Object.values(languages)}</p>`);
};

const createListMarkup = data => {
  return data.map(({ flags, name }) => 
`<li class=list-item><img src="${flags.svg}" alt="${name.official}" width="60" height="40"><span class=span>${name.official}<span></li>`
  ).join('');
};



input.addEventListener("input", debounce(handleSearchCountyes, DEBOUNCE_DELAY));