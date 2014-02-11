var keySize = true;
var numTiles = 30;
var tall = 3;
var wide = 3;

var lowbarClosed = 55;
var lowbarOpen = 400;

function windowHeight() {

}

function pop() {
	for (var i = 0; i < numTiles; i++) {
		var number = i+1;
		$("#wrapper").append("<div class=\"tile\"><a href=\"static/images/yosoyel.jpg\" class=\"swipebox\"><img src=\"static/images/yosoyel.jpg\"/></a><h3 class='grey-10'>"+number+"</h3></div>");
		// if(i == (tall * wide)-1) { 
		// 	$(".tile").last().addClass("last-tile");
		// }
	}
	setSize();
	$(".swipebox").swipebox();
}

function reset() {
	$(".tile").remove();
	setSize();
	pop();
}

function setSize() {

	var windowHeight = $(window).height();
	var windowWidth = $(window).width();

	$("#wrapper").css("height", windowHeight - lowbarClosed);

	var tileHeight =  $("#wrapper").height() / tall;
	// var height = ($(window).height() - $('.manifesto').height()) / tall;

	var tileWidth = $("#wrapper").width() / wide;

	$(".tile").css("height", tileHeight).css("width", tileWidth);
	$(".lowbar").css("height", tileHeight).css("bottom", -tileHeight+55);

}

$(document).ready(function() {

	pop();
	setSize();


	$(".lowbar").click(function() {
  		$(this).toggleClass( "open" );
	});

	if(keySize == true) {

		$(document).keydown(function(e) {

			switch(e.keyCode)
			{
				// Left
				case 37:
				console.log(e);
				if(wide>1) {wide--}
				reset();	
				break;
				
				// Up
				case 38:
				console.log(e);
				e.preventDefault();
				tall++;
				reset();
				break;
				
				// Right
				case 39:
				console.log(e);
				e.preventDefault();
				wide++;
				reset();
				break;

				// Down
				case 40:
				console.log(e);
				e.preventDefault();
				if(tall>1) {tall--}
				reset();
				break;

				default: 
				console.log("borked");
			}
		})
	}

});

$(window).resize(function() {
	setSize();
})