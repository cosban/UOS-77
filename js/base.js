var commands = [];
var actionQueue = [];
var com_pos = -1;
var cur_pos = 1;
var delay = 0;
var scroll = 0;
var outputLocked = false;
var inputLocked = false;
$(window).ready(function() {
	$('body').append('<audio id="loginAudio" preload="auto"><source src="./audio/keyboard-multiple.mp3" /></audio>');
	setInterval(function() {
		var opacity = Number($('#cursor').css('opacity'));
		$('#cursor').css('opacity', (opacity + 1) % 2);
	}, 600);
	setInterval(function() {
		if (delay > 0) {
			delay--;
		} else if (actionQueue.length > 0 && !outputLocked) {
			var action = actionQueue.shift();
			if (typeof action === "string") {
				if(action === ">clear") {
					clearOutput();
				} else {
					$('.output').append("<p>" + action + "</p>");
					scroll = setView(scroll + 23);
				}
			} else if (typeof action === "number") {
				delay = action;
			} else {
				action();
			}
		}
	}, 50);
	appendAction(toggleInputEnabled);
	appendAction(' \n'+
				 ' \n'+
	             ' \n'+
				 ' \n'+
				 ' \n'+
				 'cosBIOS (version pre-0.4.2-20770204-235959-zellurs\n'+
				 ' \n'+
				 'PRESS Ctrl+L TO RECONFIGURE POST OPTIONS\n', false);
				 appendAction(4);
				 appendAction(clearOutput);
    appendAction('Detecting Hardware...\n');
	appendAction(12);
	appendAction('2 Hard Disk(s) found\n'+
				 '1 Tape Drive(s) found\n'+
				 ' \n'+
				 'Attempting to Enable Network...\n')			 
	appendAction(20);
	appendAction('Network Connection Error: E20338-1\n');
	appendAction(4);
	appendAction(clearOutput);
	appendAction('WELCOME. PLEASE ENTER VALID CREDENTIALS.\n'+
				 ' \n'+
	             ' \n'+
				 ' \n'+
				 ' \n', false);
	appendAction('           LOGIN: charlie\n'+
				 '        PASSWORD: ********************\n');
	appendAction(function(){document.getElementById('loginAudio').play()});
	appendAction(20);
	appendAction(clearOutput);
	var now = new Date();
	var last = new Date(2016, 2, 25, 20, 53, 42, 531);
	appendAction('###############################################################################\n'+
				 '#               .dP\'                         dP\"Yb.                           #\n'+
				 '#             dP\'                            `b   \'Yb                         #\n'+
				 '#                                                                             #\n'+
				 '#     .aaa.    \'Yb   `Y8888888b. `Y8888888b.    \'Yb   `Yb    dP\' .d888b.      #\n'+
				 '#    d\'   `b    88      .dP\'        .dP\'         88     Yb  dP   8\'   `Yb     #\n'+
				 '#    `b.  .8    88    ,dP         ,dP            88      YbdP    Yb.   88     #\n'+
				 '#       .dP`b  .8P    88     .    88     .      .8P      .8P         .dP      #\n'+
				 '#    .dP\'  dP         `Yb...dP    `Yb...dP             dP\'  b      .dP\'       #\n'+
				 '#       .dP\'            `\"\"\"\'       `\"\"\"\'              Y.  ,P    .dP\'         #\n'+
				 '#   .dP\'              Location: Baltimore              `\"\"\'                   #\n'+
				 '###############################################################################\n'+
				 ' \n'+
				 'Current time: ' + now.toISOString()  + '\n'+
				 'Last login:   ' + last.toISOString() + '\n');
	appendAction(toggleInputEnabled);
});

$(document).on('keypress', function(e) {
	if(inputLocked) {
		return;
	}
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
			// don't interrupt stuff that is already happening.
			if(actionQueue.length > 0) {
				appendAction(input);
			} else {
				if(input === ">clear") {
					clearOutput();
				} else {
					$('.output').append("<p>" + input + "</p>");
					scroll = setView(scroll + 23);
				}
			}
			$(".input").html('&gt;<span id="cursor"></span>');
			break;
		}
		default: 
		{
			cur_pos = insertCharacter(String.fromCharCode(key), cur_pos);
		}
	}
}).on('keydown', function(e){
	if(inputLocked) {
		return;
	}
	var key = e.which;
	switch(key){
		case 8: // backspace
		{
			e.preventDefault();
			cur_pos = removeCharacter(cur_pos, true);
			break;
		}
		case 33: // page up
		{
			e.preventDefault();
			scroll = setView(scroll - 23);
			break;
		}
		case 34: // page down
		{
			e.preventDefault();
			scroll = setView(scroll + 23);
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
var setView = function(height) {
	var max = Number($('.output').height()) + Number($('.input').height()) - 600;
	if (max < 0) {
		max = 0;
	}
	if (height < 0) {
		height = 0;
	} else if (height > max) {
		height = max;
	}
	$(".terminal").scrollTop(height);
	return height;
}

var checkFlag = function(flag) {
	if(flag === false) {
		console.log("flag was false");
		setTimeout(checkFlag(flag), 1000);
    } else {
		console.log("flag was true");
		return false;
	}
}

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
var toggleInputEnabled = function(){
	if(inputLocked) {
		inputLocked = false;
		var input = $(".input").html('&gt;<span id="cursor"></span>');
	} else {
		inputLocked = true;
		var input = $(".input").html('');
	}
}
var setInput = function(text) {
	var input = $(".input").html('&gt;<span id="cursor"></span>');
	var textloop = function(text){
		setTimeout(function () {
			cur_pos = insertCharacter(text[0], cur_pos);
			if (text.length > 1){
				textloop(text.substr(1));
			} 
			return cur_pos;
		}, 5);
		return cur_pos;
	}
	if (text.length > 0) {
		return textloop(text);
	} else {
		return 1;
	}
}

var appendAction = function(text, split) {
	if (typeof split === 'undefined') {
		split = true;
	}
	if(typeof text === "string" && split) {
		var lines = text.split(/\r\n|\r|\n/g);
		for (var i = 0; i < lines.length; i++){
			actionQueue.push(lines[i]);
		}
	} else {
		actionQueue.push(text);
	}
}

var clearOutput = function() {
	$('.output').empty();
	outputLocked = true;
	setTimeout(function(){
		outputLocked = false;
	}, 50);
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