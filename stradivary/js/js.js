
// кнопка вверх
const btnScroll = document.querySelector(".scroll-to-top");

window.addEventListener('scroll', function() {
    if (pageYOffset > 400) {
		btnScroll.classList.remove("visually-hidden"); 
	} if (pageYOffset < 400) {
		btnScroll.classList.add("visually-hidden"); 
	}
});