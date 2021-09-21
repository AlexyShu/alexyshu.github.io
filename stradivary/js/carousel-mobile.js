'use strict';

const sliderForModile = function() {
	// Set variables
	const numImages = $(".event-img-mobile").length;
	let previousImage = numImages;
	let currentImage = 1;
	let nextImage = 2;
	let previewHover = false;

	let sliderWidth = $("#event-slider-mobile").width() + 2; // Find width of container div

	// Give images same width as slider
	const sizeImages = function() {
		$(".carousel_item-mobile").width(sliderWidth);
	};
	sizeImages();

	// Set initial position of images
	const resetImages = function() {
		$(".event-img-mobile").css({"left": sliderWidth+"px"});
		$(".event-img-mobile").first().css({"left": "0px"});
		$('.1').addClass("active");
	};
	resetImages();

	// Slide to next image
	const slideNextImageLeft = function() {
		$('.event-image-mobile-' + nextImage).css({"left": sliderWidth+"px"});
		$('.event-image-mobile-' + currentImage).animate({left: sliderWidth * -1}, 1000);
		$('.event-image-mobile-' + nextImage).animate({left: "0px"}, 1000);
		currentImage = nextImage;
		increaseImages();
	};

	// Slide to the previous image
	const slidePreviousImageRight = function() {
		$('.event-image-mobile-' + previousImage).css({"left": (sliderWidth * -1)+"px"});
		$('.event-image-mobile-' + currentImage).animate({left: sliderWidth}, 1000);
		$('.event-image-mobile-' + previousImage).animate({left: "0px"}, 1000);
		currentImage = previousImage;
		increaseImages();
	};

	// Shift which images are next and previous
	const increaseImages = function() {
		if(currentImage === numImages) {
			nextImage = 1;
			previousImage = currentImage - 1;
		} else {
			nextImage = currentImage + 1;
			if(currentImage === 1) {
				previousImage = numImages;
			} else {
				previousImage = currentImage - 1;
			}
		}
		if(previewHover !== false) {
			showPreview();
		}
	};

	// When next button is clicked
	$('.event-next-mobile').click(function() {
		slideNextImageLeft();
	});

	// When previous button is clicked
	$('.event-previous-mobile').click(function() {
		slidePreviousImageRight();
	});

	// Show a preview of next or previous image on hover
	$('.event-nav-mobile').on('mouseenter', function() {
		previewHover = $('.event-nav-mobile').index(this) + 1;
		showPreview();
	}).on('mouseleave', function() {
		previewHover = false;
		$(".event-preview-mobile").css({"background-image": "none"});
	});

	const showPreview = function() {
		let whichSide = previewHover;
		let whichImage;
		if(whichSide === 1) {
			whichImage = previousImage;
		} else {
			whichImage = nextImage;
		}
		let previewImage = $('.event-image-mobile-' + whichImage).find('img').attr("src");
		$(".preview-mobile:nth-child(" + whichSide + ")").css({"background-image": "url(" + previewImage + ")", "background-size": "cover"});
	};
};

sliderForModile();