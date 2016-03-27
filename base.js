$(window).ready(function() {
	setInterval(function() {$('#cursor').toggleClass("hidden")}, 600);
});

$(document).on('keypress', function(e) {
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
			break;
		}
		
		case 46: // delete key
		{
			break;
		}
		default: 
		{
			var input = $(".input").text();
			input += String.fromCharCode(key);
			$(".input").html(input + '<span id="cursor"></span>');
		}
	}
});
$(document).on('keydown', function(e){
	var key = e.which;
	switch(key){
		case 37: // left arrow
		{
			break;
		}
		case 38: // up arrow
		{
			$(".input").html('&gt;previous<span id="cursor"></span>');
			break;
		}		
		case 39: // right arrow
		{
			break;
		}
		case 40: // down arrow
		{
			$(".input").html('&gt;next<span id="cursor"></span>');
			break;
		}
	}
});