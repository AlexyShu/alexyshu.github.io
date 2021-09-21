'use strict';
const slider = function() {

	const delay = 5000; // Set time delay of slider

	// Set variables
	const numImages = $('.img').length;
	let previousImage = numImages;
	let currentImage = 1;
	let nextImage = 2;
	let previewHover = false;

	let sliderWidth = $("#slider").width() + 2; // Find width of container div

	// Give images same width as slider
	const sizeImages = function() {
		$(".img-slider").width(sliderWidth);
	};
	sizeImages();

	// Set initial position of images
	const resetImages = function() {
		$('.img').css({"left": sliderWidth+"px"});
		$('.img').first().css({"left": "0px"});
		$('.1').addClass("active");
	};
	resetImages();

	// Slide to next image
	const slideNextImageLeft = function() {
		$('.image-' + nextImage).css({"left": sliderWidth+"px"});
		$('.image-' + currentImage).animate({left: sliderWidth * -1}, 1000);
		$('.image-' + nextImage).animate({left: "0px"}, 1000);
		currentImage = nextImage;
		increaseImages();
	};

	// Slide to the previous image
	const slidePreviousImageRight = function() {
		$('.image-' + previousImage).css({"left": (sliderWidth * -1)+"px"});
		$('.image-' + currentImage).animate({left: sliderWidth}, 1000);
		$('.image-' + previousImage).animate({left: "0px"}, 1000);
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

	// Set initial slider interval
	let moveImages = setInterval(function() {
		slideNextImageLeft();
	}, delay);

	// When next button is clicked
	$('.next').click(function() {
		clearInterval(moveImages);
		moveImages = setInterval(function() {
			slideNextImageLeft();
		}, delay);
		slideNextImageLeft();
	});

	// When previous button is clicked
	$('.previous').click(function() {
		clearInterval(moveImages);
		moveImages = setInterval(function() {
			slideNextImageLeft();
		}, delay);
		slidePreviousImageRight();
	});



	// Show a preview of next or previous image on hover
	$('.nav').on('mouseenter', function() {
		previewHover = $('.nav').index(this) + 1;
		showPreview();
	}).on('mouseleave', function() {
		previewHover = false;
		$(".preview").css({"background-image": "none"});
	});

	const showPreview = function() {
		let whichSide = previewHover;
		let whichImage;
		if(whichSide === 1) {
			whichImage = previousImage;
		} else {
			whichImage = nextImage;
		}
		let previewImage = $('.image-' + whichImage).find('img').attr("src");
		$(".preview:nth-child(" + whichSide + ")").css({"background-image": "url(" + previewImage + ")", "background-size": "cover"});
	};
};

slider();



