/* Function to insert comma between the numbers of populations */
import insertCommaBetweenNumbers from './module.js'
/* Global Variables */
/* Theme switch */
const swapTheme = document.querySelector('#themeSwitch')
/* Inputs */
const input = document.querySelector('#search')
const filter = document.querySelector('#filter')
const search = document.querySelector('.fa-search')
/* Place to display if no item was found */
const exceptionBox = document.querySelector('.c-countries__exception')
/* Countries list */
const countriesList = document.querySelector('.c-countries__list')
/* Variables to store search mechanism values */
let searchWord = ''
let regionFilter = ''
/* Class for item creation */
class Item {
  constructor() {
    this.li = document.createElement('li')
    this.img = document.createElement('img')
    this.countryName = document.createElement('h3')
    this.population = document.createElement('p')
    this.region = document.createElement('p')
    this.capital = document.createElement('p')
    this.insertAttributesInsideImg()
    this.insertItemsInsideLi()
    this.insertClass()
  }
  insertClass() {
    this.countryName.classList.toggle('countryName')
  }
  insertAttributesInsideImg() {
    this.img.setAttribute('src', ' ')
    this.img.setAttribute('alt', ' ')
  }
  insertItemsInsideLi() {
    this.li.append(
      this.img,
      this.countryName,
      this.population,
      this.region,
      this.capital
    )
    countriesList.appendChild(this.li)
  }
}
/* Requests */
const fetchCountries = async function () {
  const response = await fetch('https://restcountries.com/v2/all')
  const JSON = await response.json()
  return JSON
}
const errorTreatment = async function () {
  try {
    const countries = await fetchCountries()
    while (countriesList.firstChild) {
      countriesList.removeChild(countriesList.firstChild)
    }
    if (exceptionBox.classList.contains('c-countries__exception--active')) {
      exceptionBox.innerHTML = ''
      exceptionBox.classList.remove('c-countries__exception--active')
    }
    gettingDataFiltered(countries)
  } catch (err) {
    console.error(err.message)
    window.alert('An error happened!')
  }
}
/* Search mechanisms */
/* Through search box */
search.addEventListener('click', () => {
  searchWord = input.value
  errorTreatment()
})
input.addEventListener('blur', () => {
  searchWord = input.value
  errorTreatment()
})
input.addEventListener('keydown', key => {
  if (key.keyCode === 13) {
    searchWord = input.value
    errorTreatment()
  }
})
/* Through filter */
filter.addEventListener('click', () => {
  document.querySelector('.dropdown').classList.add('dropdown--display')
})
const [...options] = document.querySelectorAll('.option')
options.forEach(v => {
  v.addEventListener('click', lookForRegion)
})
function lookForRegion(e) {
  regionFilter = e.target.innerHTML === 'None' ? '' : e.target.innerHTML
  filter.innerHTML = regionFilter ? regionFilter : 'Filter by Region'
  errorTreatment()
  document.querySelector('.dropdown').classList.remove('dropdown--display')
}
/* Insert Information */
function insertingInfos(v, i, neededData) {
  v[0].src = neededData[i][0]
  v[0].alt = neededData[i][1]
  v[1].innerHTML = neededData[i][1]
  v[2].innerHTML = `<strong>Population: </strong>${neededData[i][2]}`
  v[3].innerHTML = `<strong>Region: </strong>${neededData[i][3]}`
  v[4].innerHTML = `<strong>Capital: </strong>${neededData[i][4]}`
}
/* Filtering data */
function gettingDataFiltered(countries) {
  let lowerCase = ''
  let firstLetterUpperCased = ''
  const filterCountries = countries.filter(v => {
    if (!searchWord && !regionFilter) return v
    else if (searchWord && regionFilter) {
      lowerCase = searchWord.slice(+1).toLowerCase()
      firstLetterUpperCased = searchWord.charAt(0).toUpperCase()
      if (
        v.region === regionFilter &&
        v.name.includes(`${firstLetterUpperCased}${lowerCase}`)
      ) {
        return v
      } else return false
    } else if (regionFilter === v.region) {
      return v
    } else {
      if (searchWord) {
        lowerCase = searchWord.slice(+1).toLowerCase()
        firstLetterUpperCased = searchWord.charAt(0).toUpperCase()
        if (v.name.includes(`${firstLetterUpperCased}${lowerCase}`)) return v
        else return false
      }
    }
  })
  if (!filterCountries.length) {
    exceptionBox.innerHTML = 'No country was found!'
    exceptionBox.classList.add('c-countries__exception--active')
    return
  }
  for (let x in filterCountries) new Item()
  const [...addingEvents] = document.querySelectorAll('.countryName')
  addingEvents.forEach(v => {
    v.addEventListener('click', e => {
      if (typeof Storage !== 'undefined') {
        const name = e.target.innerHTML
        sessionStorage.setItem('countryNameToFetch', name)
        window.location.assign('./detailPage.html')
      } else alert("Sorry, but your browser doesn't support HTML5 web storage")
    })
  })
  const neededData = []
  filterCountries.map(v =>
    neededData.push([
      v.flag,
      v.name,
      insertCommaBetweenNumbers(v.population),
      v.region,
      v.capital
    ])
  )
  const [...iterateItems] = countriesList.children
  const li = []
  iterateItems.map(v => li.push([...v.children]))
  li.forEach((v, i) => {
    v.forEach(() => insertingInfos(v, i, neededData))
  })
}
/* Theme switch */
let theme = 'light'

function changeTheme() {
  theme === 'light' ? (theme = 'dark') : (theme = 'light')
  localStorage.setItem('theme', theme)
  document.body.classList.toggle('body--active')
  document.querySelector('.a-header').classList.toggle('a-header--active')
  countriesList.classList.toggle('c-countries__list--active')
  input.classList.toggle('input--active')
  filter.classList.toggle('filter--active')
  document.querySelector('.dropdown').classList.toggle('dropdown--active')
  /* Change icon for sun and span text for light mode */
  document.querySelector('.darkMode').classList.toggle('moon-inative')
  document.querySelector('.lightMode').classList.toggle('sun-active')
}

window.addEventListener('load', () => {
  const theme = localStorage.getItem('theme')
  errorTreatment()
  if (theme === 'dark') {
    changeTheme()
  }
})
swapTheme.addEventListener('click', changeTheme)
