var commands = [];
var pos = -1;
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
			if (commands.length === 500) {
				history.pop();
			}
			commands.unshift(input.substr(1,input.length-1));
			pos = -1;
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
}).on('keydown', function(e){
	var key = e.which;
	switch(key){
		case 37: // left arrow
		{
			break;
		}
		case 38: // up arrow
		{
			if (commands.length > 0) {
				pos = (pos+1) % commands.length;
				$(".input").html('&gt;' + commands[pos]  + '<span id="cursor"></span>');
			}
			break;
		}		
		case 39: // right arrow
		{
			break;
		}
		case 40: // down arrow
		{
		if (commands.length > 0) {
			if (pos === 0) {
				$(".input").html('&gt;<span id="cursor"></span>');
			} else {
				pos = (pos+1) % commands.length;
				$(".input").html('&gt;' + commands[pos]  + '<span id="cursor"></span>');
			}
		}
			break;
		}
	}
});