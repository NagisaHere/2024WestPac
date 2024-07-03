// used to target the menu
const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

// I could not tell you whatever the hell this does
menu.addEventListener('click', function() {
    menu.classList.toggle('is-active')
    menuLinks.classList.toggle('active')
});
