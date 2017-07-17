
$(document).ready(function () {


    // Navigation

	$( ".header-button" ).click(function() {
        $( this ).toggleClass( "close-nav" );
        $(".list-group-item").removeClass('sort-hide');
        $( ".header-nav" ).slideToggle( "100", function() {
        });

        if( $('.search-container').css('display') == 'block' ) {
		   $('.search-container').hide();
		   $('.search-button').toggleClass("close-search");
		}
    });



    // Search

	$( ".search-button" ).click(function() {
        $( this ).toggleClass( "close-search" );
        $( ".search-container" ).slideToggle( "100", function() {
        });

    	if( $('.header-nav').css('display') == 'block' ) {
		   $('.header-nav').hide();
		   $('.header-button').toggleClass("close-nav");
		}
    });



    // Thumbnail Placeholder on Homepage prior to Image Upload

    var eachImageSmall = $(".imageSmall");

    for( var i = 0; i < eachImageSmall.length; i++) {
        var element = eachImageSmall.eq(i);

        if(element.prop('currentSrc') == 'http://localhost:3030/') {
            $(element).attr("src", "http://localhost:3030/img/placeholder.svg");
            console.log(element);

        } else {
            console.log('Image has been submitted');
        }
    }



    // Image Placeholder on Details page prior to Image Upload

    var eachImageLarge = $("#imageLarge");

    if(eachImageLarge.prop('currentSrc') == 'http://localhost:3030/') {
        $(eachImageLarge).attr("src", "http://localhost:3030/img/placeholder-large.svg");
        console.log(eachImageLarge);

    }



});



