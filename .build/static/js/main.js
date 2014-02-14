var people = [];
var tiles = [];
var numTiles = 14;
var tall = 3;
var wide = 4;
var breakpoint = "sm";
var featured = [1,2];
var lowbarClosed = 55;
var hashTile;

var swipeboxInstance;



function getPeople(callback) {
// create tiles from people in taste.json

	console.log("getting people");

	$.ajaxSetup({async:false});

	$(function () {
	    $.getJSON('/static/js/taste.json', function ($people) {
	        
	        $.each($people, function (index, person) {
	        	
	        	var url = "static/images/people/" + this.filename;
	        	var name = this.name;
	        	var title = this.title;
	        	var quote = this.quote;
	        	var link = (this.link) ? this.link : url;
	        	var featured = this.featured;

	            $('#tiles').append('<div class=\"tile col-'+ breakpoint +'-'+(12/wide)+'\"><a href=\"'+link+'\" class="swipebox" data-name="'+this.name+'" data-title="'+this.title+'" data-quote="'+this.quote+'" title=\"'+name+'\" onclick=\"sethash('+index+')\"><img src=\"'+url+'\"/></a></div>');
	            
	        });

	        // size the tiles perfectly
	        setSize();
	        
	        // start up the lightbox
         	swipeboxInstance = $(".swipebox").swipebox();

         	if (callback) callback();
	    });
	});

}

function reset() {
	$(".tile").remove();
	setSize();
}

function setSize() {

	var windowHeight = $(window).height();
	var windowWidth = $(window).width();

	$("#tiles").css("height", windowHeight - lowbarClosed);

	var tileHeight =  $("#tiles").height() / tall;
	// var height = ($(window).height() - $('.manifesto').height()) / tall;

	var tileWidth = $("#tiles").width() / wide;

	$(".tile").css("height", tileHeight);
	$(".lowbar").css("min-height", (tileHeight*2 + 55)).css("bottom", (-$(".lowbar").height() + lowbarClosed));
	// $("#logo").css("top", tileHeight + 40);

}

function toggleManifesto() {
		$(".lowbar, #logo, #message h1").toggleClass( "open" );
};


function sethash(id) {

   top.document.location.hash = id;
   hashTile = id;

}

function loadHash() {
	if(window.location.hash) {
		
		var hashTile = parseInt(location.hash.substring(1));
				
	}
}

function initNewsletterForm() {
	$('#newsletter_signup_form button').click( function() {
	    $.ajax({
	        url: 'https://www.drinksoma.com/newsletter/users.json',
	        type: 'post',
	        dataType: 'json',
	        data: {email: $('#newsletter_signup_form input[type="email"]').val(),segment:"taste_campaign_2014"},
	        success: function(data) {
	        	$('#newsletter_signup_form').hide();
	        	$('#newsletter_signup_confirm').show();
	        }
	    });
	    return false;
	});
}


$(window).resize(function() {
	setSize();
})

$(document).ready(function() {

	// $("#message .fittext").fitText(0.5);
	$("#message .fittext").fitText(1.2, { minFontSize: '2em', maxFontSize: '90px' });

	// Get the party started
	getPeople(function() {
		// check for hash
	   if (window.location.hash) { // if there is a hash

	   		hashTile = parseInt(location.hash.substring(1));
			console.log("hash = " + hashTile);
		 	swipeboxInstance.setupElements();
	     	swipeboxInstance.openSlide(hashTile);

	           // $.fancybox.open($('.fancybox'), {index : parseInt(location.hash.substring(1))});
	   }
	});
});