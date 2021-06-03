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