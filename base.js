$(window).ready(function() {
	setInterval(function() {$('#cursor').toggleClass("hidden")}, 1000);
});

$(document).on('keydown', function(e) {
	var key = e.which;
	switch(key){
		case 8: // backspace
		{
			var input = $(".input").text();
			if (input.length > 1) {
				input = input.substr(0, input.length-1);
				$(".input").html(input + '<span id="cursor"></span>');
			}
			break;
		}
		case 13: // enter key
		{
			var input = $(".input").text();
			$('.output').append("<p>" + input + "</p>")
			$(".input").html('&gt;<span id="cursor"></span>');
		}
		case 37: // left arrow
		case 38: // up arrow
		case 39: // right arrow
		case 40: // down arrow
		case 46: // delete key
		{
			break;
		}
		default: 
		{
			var input = $(".input").text();
			input += String.fromCharCode(e.keyCode);
			$(".input").html(input + '<span id="cursor"></span>');
		}
		
	}
	
});