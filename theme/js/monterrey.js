$(function() {
					
	var docElem = document.documentElement,
	header = $(".header"),
	didScroll = false,
	changeHeaderOn = 300;

function init() {
	scrollPage();
	window.addEventListener( 'scroll', function( event ) {
		if( !didScroll ) {
			didScroll = true;
			setTimeout( scrollPage, 250 );
		}
	}, false );
}

function scrollPage() {
	var sy = scrollY();
	if ( sy >= changeHeaderOn ) {
		header.addClass('header-shrink');

	}
	else {
		header.removeClass('header-shrink');
	}
	didScroll = false;
}

function scrollY() {
	return window.pageYOffset || docElem.scrollTop;
}

init();
});