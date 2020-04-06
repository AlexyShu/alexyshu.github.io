'use strict';

const navigation = document.querySelector('.nav-info');
const mainNavigation = document.querySelector('.nav-main');
const mainNavigationLink = document.querySelectorAll('.nav-list-link');
const navString = document.querySelector('.nav-info_phone');
const navLink = document.querySelectorAll('.nav-info_list-link');
const entryLink = document.querySelector('.nav-info_entry-link');
const registrationLink = document.querySelector('.nav-info_registration-link');
const logo = document.querySelector('.nav-list_logo');
const logoScroll = document.querySelector('.nav-list_logo-hidden');
const openMenuBtn = document.querySelector('.open-menu_btn');
const closeMenuBtn = document.querySelector('.close-menu_btn');
const littleDisplayNav = document.querySelector('.header_nav-little-display');

window.addEventListener('scroll', function() {
    if (pageYOffset > 1073) {
        navigation.style.background = '#ffffff';
        mainNavigation.style.background = '#ffffff';
        navString.style.color = '#B9B9B9';
        for (let i = 0; i < navLink.length; i++) {
            navLink[i].style.color = '#B9B9B9';
        }
        entryLink.style.color = '#B9B9B9';
        registrationLink.style.color = '#B9B9B9';
        for (let y = 0; y < navLink.length; y++) {
            mainNavigationLink[y].style.color = '#004460';
        }
        logo.style.display='none';
        logoScroll.style.display='block';
    } else {
        navigation.style.background = 'transparent';
        mainNavigation.style.background = 'transparent';
        navString.style.color = 'rgba(255, 255, 255, 0.5);';
        for (let i = 0; i < navLink.length; i++) {
            navLink[i].style.color = 'rgba(255, 255, 255, 0.5);';
        }
        entryLink.style.color = 'rgba(255, 255, 255, 0.5);';
        registrationLink.style.color = 'rgba(255, 255, 255, 0.5);';
        for (let y = 0; y < navLink.length; y++) {
            mainNavigationLink[y].style.color = '#FFFFFF';
        }
        logo.style.display='block';
        logoScroll.style.display='none';
    }
  });


  const openMenu = function () {
    littleDisplayNav.classList.remove('visually-hidden');
    openMenuBtn.classList.add('visually-hidden');
    closeMenuBtn.classList.remove('visually-hidden');
  };

  const closeMenu = function () {
    littleDisplayNav.classList.add('visually-hidden');
    closeMenuBtn.classList.add('visually-hidden');
    openMenuBtn.classList.remove('visually-hidden');
  };

  openMenuBtn.addEventListener('click', function() {
    openMenu();
  });

  closeMenuBtn.addEventListener('click', function() {
    closeMenu();
  });
