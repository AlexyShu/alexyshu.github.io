const popup = document.querySelector(".popup");
const callBtn = document.querySelector(".header-callback");
const requestBtn = document.querySelector(".request");
const closeBtn = document.querySelector(".btn-close");

const kioskPopup = document.querySelector(".kiosk-popup");
const kioskRequestBtn = document.querySelector(".kiosk-request");
const closeKioskBtn = document.querySelector(".btn-kiosk-close");

const infoPopup = document.querySelector(".info-popup");
const infoRequestBtn = document.querySelector(".info-request");
const closeInfoBtn = document.querySelector(".btn-info-close");

const contactsPopup = document.querySelector(".contacts-popup");
const contactsRequestBtn = document.querySelector(".contacts-request");
const closeContactsBtn = document.querySelector(".btn-contacts-close");

const pricePopup = document.querySelector(".price-popup");
const priceRequestBtnFirst = document.querySelector(".price-request_first");
const priceRequestBtnSecond = document.querySelector(".price-request_second");
const priceRequestBtnThird = document.querySelector(".price-request_third");
const closePriceBtn = document.querySelector(".btn-price-close");

function closePricePopup() {
	pricePopup.classList.add("visually-hidden");
	pricePopup.classList.remove("modal-show-animation"); 
};

function showPricePopup() {
	pricePopup.classList.remove("visually-hidden"); 
	pricePopup.classList.add("modal-show-animation");
};

function closeContactsPopup() {
	contactsPopup.classList.add("visually-hidden");
	contactsPopup.classList.remove("modal-show-animation"); 
};

function showContactsPopup() {
	contactsPopup.classList.remove("visually-hidden"); 
	contactsPopup.classList.add("modal-show-animation");
};

function closeInfoPopup() {
	infoPopup.classList.add("visually-hidden");
	infoPopup.classList.remove("modal-show-animation"); 
};

function showInfoPopup() {
	infoPopup.classList.remove("visually-hidden"); 
	infoPopup.classList.add("modal-show-animation");
};

function closeKioskPopup() {
	kioskPopup.classList.add("visually-hidden");
	kioskPopup.classList.remove("modal-show-animation"); 
};

function showKioskPopup() {
	kioskPopup.classList.remove("visually-hidden"); 
	kioskPopup.classList.add("modal-show-animation");
};

function closePopup() {
	popup.classList.add("visually-hidden");
	popup.classList.remove("modal-show-animation"); 
};

function showPopup() {
	popup.classList.remove("visually-hidden"); 
	popup.classList.add("modal-show-animation");
};

callBtn.addEventListener("click", function(evt) {
	evt.preventDefault();
	showPopup(); 
});

requestBtn.addEventListener("click", function(evt) {
	evt.preventDefault();
	showPopup(); 
});

closeBtn.addEventListener("click", function(evt) {
	evt.preventDefault();
	closePopup(); 
});

kioskRequestBtn.addEventListener("click", function(evt) {
	evt.preventDefault();
	showKioskPopup(); 
});

closeKioskBtn.addEventListener("click", function(evt) {
	evt.preventDefault();
	closeKioskPopup(); 
});

infoRequestBtn.addEventListener("click", function(evt) {
	evt.preventDefault();
	showInfoPopup(); 
});

closeInfoBtn.addEventListener("click", function(evt) {
	evt.preventDefault();
	closeInfoPopup(); 
});

contactsRequestBtn.addEventListener("click", function(evt) {
	evt.preventDefault();
	showContactsPopup(); 
});

closeContactsBtn.addEventListener("click", function(evt) {
	evt.preventDefault();
	closeContactsPopup(); 
});

priceRequestBtnFirst.addEventListener("click", function(evt) {
	evt.preventDefault();
	showPricePopup(); 
});

priceRequestBtnSecond.addEventListener("click", function(evt) {
	evt.preventDefault();
	showPricePopup(); 
});

priceRequestBtnThird.addEventListener("click", function(evt) {
	evt.preventDefault();
	showPricePopup(); 
});

closePriceBtn.addEventListener("click", function(evt) {
	evt.preventDefault();
	closePricePopup(); 
});