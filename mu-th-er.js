$(function() {
    var prompt = '> ';
    var waitprompt = 'PRESS ANY KEY TO CONTINUE ';

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
	terminal.typing('echo', 25, message,
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

    var labnotes = ` 
LABORATORY NOTES
CHIEF SCIENCE OFFICER ASH HILL
2122-06-13
 
THE SPECIMEN'S GESTATION PERIOD IS SHORTER THAN EXPECTED.
IT HAS EMERGED FROM KANE'S BODY CAVITY.
THIS WILL COMPLICATE TRANSFERRING THE SPECIMEN TO EARTH.
 
NEVERTHELESS, THIS DOES PROVIDE AN OPPORTUNITY TO OBSERVE
THE SPECIMEN'S ADULT PHASE.
THE EVOLVED HUNTING ABILITY IS ADMIRABLE.
`;

    var recommended_actions = ` 
THE FOREIGN ORGANISM IS WRECKING HAVOC ON CRAFT AND CREW.
RECOMMEND TAKING THE FOLLOWING ACTIONS:
 
1. ISOLATE, CAPTURE, AND NEUTRALIZE ORGANISM.
2. DO NOT DIE.
`;

    var jokes = [
	`WHY DID THE ASTRONAUT BREAK UP WITH HER BOYFRIEND?
BECAUSE SHE NEEDED SOME SPACE.`,
	`WHERE SHOULD YOU PARK THE NOSTROMO?\nA PARKING METEOR.`,
	`WHY DID THE COW GO TO OUTER SPACE?\nTO VISIT THE MILKY WAY.`,
	`WHY DO ALIENS NOT EAT CLOWNS?\nTHEY TASTE FUNNY.`,
	`WHY HAVE ALIENS NOT COME TO OUR SOLAR SYSTEM YET?
THEY READ THE REVIEWS: ONE STAR.`,
	`YESTERDAY I WAS CHARGED $10,000 DOLLARS FOR SENDING MY CAT INTO SPACE.
IT WAS A CAT ASTRO FEE.`,
    ];

    var terminal = $('body').terminal(function(command) {
	// var message = '';
	// $.terminal.parse_arguments(command).forEach(function(value, index){
	//     message = message + index + ': ' + value + '\n';
	// })
	// termout(message);
	command = command.toUpperCase();
	if (command.includes('MESSAGE')) {
	    terminal.set_prompt(waitprompt);
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
	} else if (command.includes('LAB')) {
	    terminal.set_prompt(waitprompt);
	    terminal.clear();
	    termout(labnotes);
	    terminal.push(function(command) { }, {
		onExit: function() {
		    terminal.clear();
		    terminal.set_prompt(prompt);
		    termout('LAB NOTES CLOSED\n ');
		},
		keydown: function() {
		    terminal.pop();
		    return false;
		}
	    });
	} else if (command.includes('VOICE')) {
	    terminal.clear();
	    termout(` 
MICROPHONE NOT REGISTERING SOUND.
POSSIBLE HARDWARE FAILURE.
OR TALK LOUDER.
`);
	} else if (command.includes('TEMP')) {
	    terminal.clear();
	    termout(`TEMPERATURE CONTROLS OFFLINE.
`);
	} else if (command.includes('REBOOT')) {
	    terminal.clear();
	    termout(` 
SAFETY PROTOCOLS DICTATE THAT BEFORE A REBOOT CREW MUST
BE ACTIVELY MANNING LIFE SUPPORT AND NAVIGATION.
`);
	} else if (command.includes('ACTION')) {
	    terminal.clear();
	    termout(recommended_actions);
	} else if (command.includes('JOKE')) {
	    terminal.clear();
	    termout(jokes[Math.floor(Math.random() * jokes.length)] + '\n');
	} else {
	    termout('CANNOT UNDERSTAND: \'' + command + '\'')
	}
    }, {
	prompt: prompt
    });

    terminal.history().disable();
    terminal.clear();
    terminal.echo(wy_logo);
});
