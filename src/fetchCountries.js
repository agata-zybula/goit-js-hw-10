const countriesLink = 'https://restcountries.com/v3.1';

function fetchCountries(name) {
  return fetch(
    `${countriesLink}/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));
}

export { fetchCountries };

// name.official - pełna nazwa kraju
// capital - stolica
// population - liczba ludności
// flags.svg - link do ilustracji przedstawiającej flagę
// languages - tablica języków
