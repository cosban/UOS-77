var commands = [];
var com_pos = -1;
var cur_pos = 1;
$(window).ready(function() {
	setInterval(function() {
		var opacity = Number($('#cursor').css('opacity'));
		$('#cursor').css('opacity', (opacity + 1) % 2);
	}, 600);
});

$(document).on('keypress', function(e) {
    e.preventDefault();
	var key = e.which;
	switch(key){
		case 13: // enter key
		{
			var input = $(".input").text();
			if (commands.length === 500) {
				history.pop();
			}
			commands.unshift(input.substr(1));
			com_pos = -1;
			cur_pos = 1;
			$('.output').append("<p>" + input + "</p><p>UNKOWN INPUT: " + input.substr(1) + " did you mean COCKS instead?<p>")
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
			cur_pos = cur_pos+1;
		}
	}
}).on('keydown', function(e){
	var key = e.which;
	switch(key){
		case 8: // backspace
		{
			e.preventDefault();
			var input = $(".input").text();
			if (input.length > 1) {
				input = input.substr(0, input.length-1);
				$(".input").html(input + '<span id="cursor"></span>');
			}
		}
		case 37: // left arrow
		{
			e.preventDefault();
			var input = $(".input").text();
			if (cur_pos > 1) {
				cur_pos = cur_pos -1;
				var prefix = input.substring(0, cur_pos);
				var suffix = input.substr(cur_pos);
				$(".input").html(prefix + '<span id="cursor"></span>' + suffix);
			}
			break;
		}
		case 38: // up arrow
		{
			e.preventDefault();
			if (commands.length > 0) {
				com_pos = (com_pos+1) % commands.length;
				cur_pos = commands[com_pos].length+1;
				$(".input").html('&gt;' + commands[com_pos]  + '<span id="cursor"></span>');
			}
			break;
		}		
		case 39: // right arrow
		{
			e.preventDefault();
			var input = $(".input").text();
			if (cur_pos <= input.length) {
				cur_pos = cur_pos + 1;
				var prefix = input.substring(0, cur_pos);
				var suffix = input.substr(cur_pos);
				$(".input").html(prefix + '<span id="cursor"></span>' + suffix);
			}
			break;
		}
		case 40: // down arrow
		{
			e.preventDefault();
			if (commands.length > 0) {
				if (com_pos === 0) {
					$(".input").html('&gt;<span id="cursor"></span>');
					cur_pos = 1;
				} else {
					com_pos = (com_pos+1) % commands.length;
					cur_pos = commands[com_pos].length+1;
					$(".input").html('&gt;' + commands[com_pos]  + '<span id="cursor"></span>');
				}
			}
			break;
		}
	}
});