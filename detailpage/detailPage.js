const swapTheme = document.querySelector('#themeSwitch')
swapTheme.addEventListener('click', () => {
    document.body.classList.toggle('body--active')
    document.querySelector('.a-header').classList.toggle('a-header--active')
    document.querySelector('.darkMode').classList.toggle('moon-inative')
    document.querySelector('.lightMode').classList.toggle('sun-active')
})