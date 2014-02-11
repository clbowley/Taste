var keySize = false;
var numTiles = 300;
var tall = 3;
var wide = 3;

function pop() {
	for (var i = 0; i < numTiles; i++) {
		$("#wrapper").append("<div class='tile'><h3 class='grey-10'>"+(i+1)+"</h3></div>");
		// if(i == (tall * wide)-1) { 
		// 	$(".tile").last().addClass("last-tile");
		// }
	}
	setSize();
}

function reset() {
	$(".tile").remove();
	setSize();
	pop();
}

function setSize() {
	var height = ($(window).height() - $('.manifesto').height()) / tall;
	var width = $(window).width() / wide;
	$(".tile").css("height", height).css("width", width);
}

$(document).ready(function() {
	pop();
	setSize();

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