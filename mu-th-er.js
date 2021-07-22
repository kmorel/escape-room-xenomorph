$(function() {
    var prompt = 'COMMAND> ';

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
	terminal.typing('echo', 10, message,
			function() { type_audio.pause() });
    }

    var messages = [
	` 
FROM: WEYLAND-YUTANI HR
TO: DENNIS PARKER
SUBJECT: RE: UNFAIR SHARES
 
MR. PARKER,
 
WE HAVE REVIEWED YOUR PETITION FOR A GREATER PORTION OF SHARES ON RETURN
FROM YOUR CURRENT MISSION, AND YOUR PETITION IS DENIED.
 
THE CONTRACT MUTUALLY AGREED TO AT THE START OF THE MISSION IS BINDING.
FURTHERMORE, THE TERMS OF THIS CONTRACT ARE STANDARD.
`,
	` 
FROM: WEYLAND-YUTANI VP MILTARY APPLICATIONS
TO: CHEIF SCIENCE OFFICER ASH HOLM
SUBJECT: SPECIAL ORDER 937
 
PRIORITY ONE
INSURE RETURN OF ORGANISM
FOR ANALYSIS.
ALL OTHER CONSIDERATIONS SECONDARY.
CREW EXPENDABLE.
`,
	` 
FROM: MU-TH-ER
TO: CAPTAIN ARTHUR DALLAS
SUBJECT: DETOUR
 
DISTRESS SIGNAL DETECTED NEAR ZETA II RETICULI.
INVESTIGATE AND PROVIDE AID AS NECESSARY.
SALVAGE APPROVED.
`,
    ];

    function print_message(index) {
	full_text = 'MESSAGE ' + (index + 1) + ' OF ' + messages.length + '\n';
	full_text += messages[index] + ' \n';
	terminal.clear();
	termout(full_text);
    }

    var crew =` 
   CREW MEMBER      POSITION             STATUS
   -----------      --------             ------
1. ARTHUR DALLAS    CAPTAIN              MISSING
2. GILBERT KANE     EXECUTIVE OFFICER    DECEASED
3. ELLEN RIPLEY     WARRANT OFFICER      OK
4. JOAN LAMBERT     NAVIGATOR            OK
5. ASH HILL         SCIENCE OFFICER      OFFLINE
6. DENNIS PARKER    CHIEF ENGINEER       OK
7. SAMUEL BRETT     ENGINEERING TECH     DECEASED
`;

    var terminal = $('body').terminal(function(command) {
	// var message = '';
	// $.terminal.parse_arguments(command).forEach(function(value, index){
	//     message = message + index + ': ' + value + '\n';
	// })
	// termout(message);
	command = command.toUpperCase();
	if (command.includes('MESSAGE')) {
	    terminal.set_prompt('PRESS ANY KEY TO CONTINUE ');
	    var message_index = 0;
	    print_message(message_index);
	    terminal.push(function(command) {
	    }, {
		onExit: function() {
		    terminal.clear();
		    terminal.set_prompt(prompt);
		    termout('MESSAGES COMPLETE\n ');
		},
		keydown: function() {
		    message_index += 1;
		    if (message_index < messages.length) {
			print_message(message_index);
		    } else {
			terminal.pop();
		    }
		    return false;
		}
	    });
	} else if (command.includes('CREW')) {
	    terminal.clear();
	    termout(crew);
	} else {
	    termout('Unknown command: \'' + command + '\'')
	}
    }, {
	prompt: prompt
    });

    terminal.history().disable();
    terminal.clear();
    terminal.echo(wy_logo);
});
