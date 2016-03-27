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
	var key = e.which;
	e.preventDefault();
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
			$('.output').append("<p>" + input + "</p>")
			$(".input").html('&gt;<span id="cursor"></span>');
			break;
		}
		default: 
		{
			cur_pos = insertCharacter(String.fromCharCode(key), cur_pos);
		}
	}
}).on('keydown', function(e){
	var key = e.which;
	switch(key){
		case 8: // backspace
		{
			e.preventDefault();
			cur_pos = removeCharacter(cur_pos, true);
			break;
		}
		
		case 35: // end key
		{
			e.preventDefault();
			var input = $(".input").text();
			cur_pos = setCursor(input.length);
			break;
		}
		case 36: // home key
		{
			e.preventDefault();
			cur_pos = setCursor(1);
			break;
		}
		case 37: // left arrow
		{
			e.preventDefault();
			cur_pos = setCursor(cur_pos - 1);
			break;
		}
		case 38: // up arrow
		{
			e.preventDefault();
			if (commands.length > 0) {
				com_pos = (com_pos+1) % commands.length;
				curpos = setInput(commands[com_pos]);
			}
			break;
		}		
		case 39: // right arrow
		{
			e.preventDefault();
			cur_pos = setCursor(cur_pos + 1);
			break;
		}
		case 40: // down arrow
		{
			e.preventDefault();
			if (commands.length > 0) {
				if (com_pos <= 0) {
					curpos = setInput('');
				} else {
					com_pos = (com_pos+1) % commands.length;
					curpos = setInput(commands[com_pos]);
				}
			}
			break;
		}
		case 46: // delete key
		{
			e.preventDefault();
			cur_pos = removeCharacter(cur_pos, false);
			break;
		}
	}
});

var setCursor = function(pos) {
	var input = $(".input").text();
	if (pos < 1) {
		pos = 1;
	}
	if (pos > input.length) {
		pos = input.length;
	}
	var prefix = input.substring(0, pos);
	var suffix = input.substr(pos);
	$(".input").html(prefix + '<span id="cursor"></span>' + suffix);
	return pos;
}

var setInput = function(text) {
	var input = $(".input").html('&gt;<span id="cursor"></span>');
	var inputloop = function(text){
		setTimeout(function () {
			cur_pos = insertCharacter(text[0], cur_pos);
			if (text.length > 1){
				inputloop(text.substr(1));
			} 
			return cur_pos;
		}, 5);
		return cur_pos;
	}
	if (text.length > 0) {
		return inputloop(text);
	} else {
		return 1;
	}
}

var insertCharacter = function(c, pos) {
	var input = $(".input").text();
	var prefix = input.substring(0, pos);
	var suffix = input.substr(pos);
	prefix += c;
	$(".input").html(prefix + '<span id="cursor"></span>' + suffix);
	return pos + 1;
}

var removeCharacter = function(pos, before) {
	var input = $(".input").text();
	if (before) {
		if (pos > 1) {
			var prefix = input.substring(0, pos-1);
			var suffix = input.substr(pos);
			pos = pos - 1;
			$(".input").html(prefix + '<span id="cursor"></span>' + suffix);
		}
	} else {
		if (pos < input.length + 1) {
			var prefix = input.substring(0, pos);
			var suffix = input.substr(pos+1);
			$(".input").html(prefix + '<span id="cursor"></span>' + suffix);
		}
	}
	return pos;
}