// Navigation

$(document).ready(function () {
	$( ".header-button" ).click(function() {
        $( this ).toggleClass( "close-nav" );
        $( ".header-nav" ).slideToggle( "100", function() {
        });

        if( $('.search-container').css('display') == 'block' ) {
		   $('.search-container').hide();
		   $('.search-button').toggleClass("close-search");
		}
    });
});


// Search

$(document).ready(function () {
	$( ".search-button" ).click(function() {
        $( this ).toggleClass( "close-search" );
        $( ".search-container" ).slideToggle( "100", function() {
        });

    	if( $('.header-nav').css('display') == 'block' ) {
		   $('.header-nav').hide();
		   $('.header-button').toggleClass("close-nav");
		}
    });
});