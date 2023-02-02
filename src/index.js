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


let searchCountry = () => {
    let newInput = input.value.trim();
    if (newInput === '') {
        let clearCountries = () => {
            countryList.innerHtml = '';
            countryInfo.innerHtml = '';
        };
    } else {
        fetchCountries(newInput).then(data => {
          console.log(data);
        });
    }
};

let filteredArray = () => {
    if (data.length > 10) {
        Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
        );
        clearCountries();
    } else if (data.length > 1) {
    
    } else if (data.length === 1) {

    } else (data.status === 404) 
        Notiflix.Notify.failure('Oops, there is no country with that name');
};

input.addEventListener('input', _.debounce(searchCountry, DEBOUNCE_DELAY));