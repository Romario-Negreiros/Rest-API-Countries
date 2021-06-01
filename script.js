/* Global Variables */

/* Inputs */
const input = document.querySelector('#search')
const filter = document.querySelector('#filter')
/* Countries list */

const countriesList = document.querySelector('.c-countries__list')

/* Countries list item */
const item = Array.from(document.querySelectorAll('.c-countries__list li'))

/* Item data */
const img = document.querySelector('#images')
const countryName = document.querySelector('#name')
const population = document.querySelector('#population')
const region = document.querySelector('#region')
const capital = document.querySelector('#capital')
/* Requests */

const fetchCountries = async function (url) {
    const response = await fetch(url)
    const JSON = await response.json()
    return JSON
}
const errorTreatment = async function (url) {
    try {
        const countries = await fetchCountries(url)
        console.log(countries)
        insertInfos(countries)
    }
    catch(err) {
        console.error(err.message)
    }
}
errorTreatment('https://restcountries.eu/rest/v2/all')

/* Insert Information */

function insertInfos(countries) {
    img.src = countries[0].flag
    countryName.innerHTML = countries[0].name
    population.innerHTML = `<strong>Population:</strong> ${countries[0].population}`
    region.innerHTML = `<strong>Region:</strong> ${countries[0].region}`
    capital.innerHTML = `<strong>Capital:</strong> ${countries[0].capital}`
}