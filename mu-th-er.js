$(function() {
    var wy_logo = `
  #####  #####  #####  #####  #####
   #####  ###  #######  ###  #####
    #####  #  #########  #  #####
     #####   ##### #####   #####
      ##### #####   ##### #####
       #########  #  #########
        #######  ###  #######
         #####  #####  #####

           MU-TH-ER 6000
`;

    var type_audio = new Audio('audio/floppy-write.mp3')
    type_audio.loop = true

    function termout(message) {
	type_audio.play();
	terminal.typing('echo', 100, message,
			function() { type_audio.pause() });
    }

    var terminal = $('body').terminal(function(command) {
	var message = '';
	$.terminal.parse_arguments(command).forEach(function(value, index){
	    message = message + index + ': ' + value + '\n';
	})
	termout(message);
    });

    terminal.clear();
    terminal.echo(wy_logo);
});
