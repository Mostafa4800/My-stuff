const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

// Display Mobile Menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
    const elem = document.querySelector('.highlight');
    const aboutMenu = document.querySelector('#about-page');
    const productsMenu = document.querySelector('#products-page');
    const shopMenu = document.querySelector('#shop-page');
    const contactMenu = document.querySelector('#contact-page');

    let scrollPos = window.scrollY;
console.log(scrollPos);

    // adds 'highlight' class to my menu items
    if (window.innerWidth > 960 && scrollPos < 900) {
        aboutMenu.classList.remove('highlight');
        productsMenu.classList.remove('highlight');
        shopMenu.classList.remove('highlight');
        contactMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 1828) {
        aboutMenu.classList.add('highlight');
        productsMenu.classList.remove('highlight');
        shopMenu.classList.remove('highlight');
        contactMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 3056) {
        productsMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
        shopMenu.classList.remove('highlight');
        contactMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 3905) {
        shopMenu.classList.add('highlight');
        productsMenu.classList.remove('highlight');
        aboutMenu.classList.remove('highlight');
        contactMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 5000) {
        contactMenu.classList.add('highlight');
        shopMenu.classList.remove('highlight');
        productsMenu.classList.remove('highlight');
        aboutMenu.classList.remove('highlight');
        return;
    }

    if ((elem && window.innerWIdth < 960 && scrollPos < 600) || elem) {
        elem.classList.remove('highlight');
    }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

//  Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active');
    if (window.innerWidth <= 768 && menuBars) {
        menu.classList.toggle('is-active');
        menuLinks.classList.remove('active');
    }
};

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

