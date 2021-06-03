/* Function to insert comma between the numbers of populations */
import insertCommaBetweenNumbers from './module.js'
/* Global variables */
const img = document.querySelector('#img')
const countryName = document.querySelector('#name')
const nativeName = document.querySelector('#nativeName')
const population = document.querySelector('#population')
const region = document.querySelector('#region')
const subRegion = document.querySelector('#subRegion')
const capital = document.querySelector('#capital')
const topLevelDomain = document.querySelector('#topLevelDomain')
const currencies = document.querySelector('#currencies')
const languages = document.querySelector('#languages')
/* Color switch */
const swapTheme = document.querySelector('#themeSwitch')
swapTheme.addEventListener('click', () => {
    document.body.classList.toggle('body--active')
    document.querySelector('.a-header').classList.toggle('a-header--active')
    document.querySelector('.darkMode').classList.toggle('moon-inative')
    document.querySelector('.lightMode').classList.toggle('sun-active')
    const [...spans] = document.querySelectorAll('.borderCountries')
    spans.forEach(v => {
        v.classList.toggle('borderCountries--active')
    })
    document.querySelector('.b-country a').classList.toggle('back--active')
})
/* Fetch to show the details */
const countryNameToFetch = sessionStorage.getItem('countryNameToFetch')
const fetchCountries = async function () {
    const response = await fetch('https://restcountries.eu/rest/v2/all')
    const JSON = await response.json()
    return JSON
}
const errorTreatment = async function (countryNameToFetch) {
    try {
        const countries = await fetchCountries()
        filteringInfos(countries, countryNameToFetch)
    }
    catch (err) {
        console.error(err.message)
    }
}
errorTreatment(countryNameToFetch)
/* Span creator for border countries */
class createSpan {
    constructor() {
        this.span = document.createElement('span')
        this.createClass()
    }
    createClass() {
        this.span.classList.add('borderCountries')
        document.querySelector('.spanWrapper').append(this.span)
    }
}
/* Filtering and inserting data */
function insertingInfos(data, tlv, curr, lang, border) {
    img.src = data[0]
    img.alt = data[1]
    countryName.innerHTML = data[1]
    nativeName.innerHTML = data[2]
    population.innerHTML = data[3]
    region.innerHTML = data[4]
    subRegion.innerHTML = data[5]
    capital.innerHTML = data[6]
    tlv.forEach(v => {
        topLevelDomain.innerHTML += v
    })
    curr.forEach(v => {
        currencies.innerHTML += v
    })
    lang.forEach(v => {
        languages.innerHTML += `${v}`
    })
    for(let x in border) new createSpan()
    const [...spans] = document.querySelectorAll('.borderCountries')
    border.forEach((v, i) => spans[i].innerHTML = v)
}
function filteringInfos(countries, countryNameToFetch) {
    const filteredCountries = countries.filter(v => v.name.includes(countryNameToFetch))
    const borderCountries = filteredCountries.map(v => {
        return v.borders
    })
    const alphaCodes = []
    borderCountries.map(v => {
        v.forEach(v => {
            alphaCodes.push(v)
        })
    })
    const filteredBorderCountries = []
    countries.filter(a => {
        alphaCodes.forEach(v => {
           a.alpha3Code.includes(v) ? filteredBorderCountries.push(a) : false
        })
    })
    const borderNames = filteredBorderCountries.map(v => v.name)
    const neededData = []
    filteredCountries.map(v => {
        neededData.push(v.flag, v.name, v.nativeName, insertCommaBetweenNumbers(v.population),
            v.region, v.subregion, v.capital)
    })
    const topLevelDomain = []
    filteredCountries.map((v, i) => {
        topLevelDomain.push(v.topLevelDomain[i])
    })
    const currencies = []
    filteredCountries.map((v, i) => {
        currencies.push(v.currencies[i].name)
    })
    const languages = []
    filteredCountries.map(v => {
        languages.push(v.languages)
    })
    const languagesFiltered = []
    languages.map(v => {
        v.map((v) => {
            languagesFiltered.push(`${v.name} `)
        })
    })
    insertingInfos(neededData, topLevelDomain, currencies, languagesFiltered, borderNames)
}