/* Global Variables */
/* Theme switch */
const swapTheme = document.querySelector('#themeSwitch')
/* Inputs */
const input = document.querySelector('#search')
const filter = document.querySelector('#filter')
const search = document.querySelector('.fa-search')
/* Countries list */
const countriesList = document.querySelector('.c-countries__list')
/* Class for item creation */
class item {
    constructor() {
        this.li = document.createElement('li')
        this.img = document.createElement('img')
        this.countryName = document.createElement('h3')
        this.population = document.createElement('p')
        this.region = document.createElement('p')
        this.capital = document.createElement('p')
        this.insertAttributesInsideImg()
        this.insertItemsInsideLi()
    }
    insertAttributesInsideImg() {
        this.img.setAttribute('src', " ")
        this.img.setAttribute('alt', " ")
    }
    insertItemsInsideLi() {
        this.li.append(this.img, this.countryName, this.population, this.region, this.capital)
        countriesList.appendChild(this.li)
    }
}
/* Requests */
const fetchCountries = async function () {
    const response = await fetch('https://restcountries.eu/rest/v2/all')
    const JSON = await response.json()
    return JSON
}
const errorTreatment = async function (searchWord) {
    try {
        const countries = await fetchCountries()
        console.log(countries)
        gettingDataFiltered(countries, searchWord)
    }
    catch (err) {
        console.error(err.message)
    }
}
/* Search mechanisms */
/* Through search box */
search.addEventListener('click', () => {
    while (countriesList.firstChild) {
        countriesList.removeChild(countriesList.firstChild)
    }
    let string = input.value
    errorTreatment(string)
})
input.addEventListener('blur', () => {
    while (countriesList.firstChild) {
        countriesList.removeChild(countriesList.firstChild)
    }
    let string = input.value
    errorTreatment(string)
})
input.addEventListener('keydown', (key) => {
    if (key.keyCode === 13) {
        while (countriesList.firstChild) {
            countriesList.removeChild(countriesList.firstChild)
        }
        let string = input.value
        errorTreatment(string)
    }
})
/* Through filter */
filter.addEventListener('click', () => {
    filter.addEventListener('click', lookForRegion)
    filter.addEventListener('blur', () => {
        filter.removeEventListener('click', lookForRegion)
    })
})
function lookForRegion() {
    while (countriesList.firstChild) {
        countriesList.removeChild(countriesList.firstChild)
    }
    const option = filter.options[filter.selectedIndex].text
    errorTreatment(option)
    filter.removeEventListener('click', lookForRegion)
}
/* Insert Information */
function insertingInfos(v, i, neededData) {
    v[0].src = neededData[i][0]
    v[1].innerHTML = neededData[i][1]
    v[2].innerHTML = `<strong>Population: </strong>${neededData[i][2]}`
    v[3].innerHTML = `<strong>Region: </strong>${neededData[i][3]}`
    v[4].innerHTML = `<strong>Capital: </strong>${neededData[i][4]}`
}
/* Filtering data */
function gettingDataFiltered(countries, searchWord) {
    let lowerCase = ''
    let firstLetterUpperCased = ''
    const filterCountries = countries.filter((v) => {
        if (searchWord == filter.options[filter.selectedIndex].text) {
            if (v.region.includes(searchWord)) return v
            else return false
        } else {
            lowerCase = searchWord.slice(+1).toLowerCase()
            firstLetterUpperCased = searchWord.charAt(0).toUpperCase()
            if (v.name.includes(`${firstLetterUpperCased}${lowerCase}`)) return v
            else return false
        }
    })
    for (let x in filterCountries) new item()
    const neededData = []
    filterCountries.map(v => neededData.push([v.flag, v.name, v.population, v.region, v.capital]))
    const [...iterateItems] = countriesList.children
    const li = []
    iterateItems.map(v => li.push([...v.children]))
    li.forEach((v, i) => {
        v.forEach(() => insertingInfos(v, i, neededData))
    })
}
/* Theme switch */
swapTheme.addEventListener('click', () => {
    /* Change elements back, body back, and body text */
    document.body.classList.toggle('body--active')
    document.querySelector('.a-header').classList.toggle('a-header--active')
    countriesList.classList.toggle('c-countries__list--active')
    input.classList.toggle('input--active')
    filter.classList.toggle('filter--active')
    /* Change icon for sun and span text for light mode */
    document.querySelector('.darkMode').classList.toggle('moon-inative')
    document.querySelector('.lightMode').classList.toggle('sun-active')
})