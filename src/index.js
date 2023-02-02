import './css/styles.css';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

var _ = require('lodash');
// var debounce = require('lodash.debounce');

let clearCountries = () => {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
};

let searchCountry = () => {
  let newInput = input.value.trim();
  clearCountries();
  if (newInput === '') {
    return;
  } else {
    fetchCountries(newInput).then(data => {
      console.log(data);
      filteredArray(data);
    });
  }
};

let filteredArray = data => {
  if (data.length > 10) {
    clearCountries();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1) {
    clearCountries();
    countryList.insertAdjacentHTML(
      'beforeend',
      data.map(el => `<ul class="list-style flex"><li class="list-item"><img src="${el.flags.svg}" width="50"/></li><li class="list-item">${el.name.official}</li></ul>`).join('')
    ); //tworzenie li dla kazdego panstwa
  } else if (data.length === 1) {
    clearCountries();
   countryInfo.insertAdjacentHTML(
     //wszystkie informacje o danym panstwie
     'beforeend',
     `<ul class="list-style"><li class="list-item country-style">${
       data[0].name.official
     }</li><li class="list-item"><img src="${
       data[0].flags.svg
     }" alt="Flag" width="150"/></li><li class="list-item">Capital: ${
       data[0].capital
     }</li><li class="list-item">Population: ${
       data[0].population
     }</li><li class="list-item">Languages: ${Object.values(
       data[0].languages
     ).join(', ')}</li></ul>`
   );
  } else data.status === 404;
  Notiflix.Notify.failure('Oops, there is no country with that name');
};

input.addEventListener('input', _.debounce(searchCountry, DEBOUNCE_DELAY));
