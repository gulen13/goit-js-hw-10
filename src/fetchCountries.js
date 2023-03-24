export {fetchCountries};

const baseUrl = 'https://restcountries.com/v3.1/name/';

function fetchCountries(name) {
  return fetch (`${baseUrl}${name}?fields=name,capital,population,flags,languages`).then (
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
};