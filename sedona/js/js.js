var btn = document.querySelector(".hotels-search");
var popup = document.querySelector(".hotels-search-form");
var data1 = document.querySelector(".appointment-item-date1");
var data2 = document.querySelector(".appointment-item-date2");


btn.addEventListener("click", function(evt) {
	evt.preventDefault();
	popup.classList.toggle("modal-show");
	popup.classList.add("modal-show-animation");  
});

popup.addEventListener("animationend", function() {
	popup.classList.remove("modal-show-animation");
	popup.classList.remove("modal-error");
});

popup.addEventListener("submit", function(evt) {
	if (!data1.value || !data2.value) { 
	    evt.preventDefault(); 
		popup.classList.add("modal-error");  	
   }
});