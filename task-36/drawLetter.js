var drawLetter = function() {
	var letters = {};
	var randomColor = function() {
		return " #" + Math.random().toString(16).slice(2, 8);
	};

	letters.a = "MOV BOT" 				+ "\n" +
			    "TAR RIG 4" 			+ "\n" +
			    "TUN BAC" 				+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR BOT" 				+ "\n" +
			    "TAR LEF" 				+ "\n" +
			    "BUILD"	 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR RIG 2" 			+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR BOT" 				+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR LEF 2" 			+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR BOT" 				+ "\n" +
			    "TAR LEF" 				+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR RIG 4" 			+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR BOT" 				+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR LEF 4" 			+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR BOT" 				+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR RIG" 				+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR RIG" 				+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR RIG" 				+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR RIG" 				+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR RIG" 				+ "\n" +
			    "TAR BOT" 				+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR LEF 6"			 	+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR BOT" 				+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR RIG 6" 			+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR BOT" 				+ "\n" +
			    "BUILD" 				+ "\n" +
			    "BRU" + randomColor() 	+ "\n" +
			    "TAR LEF 6" 			+ "\n" +
			    "BUILD"	 				+ "\n" +
			    "BRU" + randomColor();
	letters.b = "TAR BOT"				+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"TAR BOT"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR LEF 4"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR BOT"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG 4"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR BOT"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR LEF 4"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR BOT"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"TAR BOT"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR LEF 5"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR BOT"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG 5"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR BOT"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR LEF 5"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR LEF"				+ "\n" +
				"TAR BOT"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor();
	letters.c = "TAR BOT"				+ "\n" +
				"TAR RIG 4"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG"				+ "\n" +
				"TAR BOT"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR LEF 4"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR LEF"				+ "\n" +
				"TAR BOT"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor()	+ "\n" +
				"TAR BOT"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR BOT"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR BOT"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR BOT"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR BOT"				+ "\n" +
				"TAR RIG"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR RIG 4"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR BOT"				+ "\n" +
				"TAR LEF"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR LEF"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor() 	+ "\n" +
				"TAR LEF"				+ "\n" +
				"BUILD"					+ "\n" +
				"BRU" + randomColor();
	letters.hi = "MOV RIG"		+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF0000"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF0000"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF0000"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF0000"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF0000"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF0000"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF0000"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"GO 2"			+ "\n" +
				"TUN LEF"		+ "\n" +
				"GO 3"			+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #0000FF"	+ "\n" +
				"TAR RIG"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #0000FF"	+ "\n" +
				
				"MOV RIG 2"		+ "\n" +
				"TAR TOP 4"		+ "\n" +
				"TUN BAC"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF0000"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF0000"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF0000"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF0000"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF0000"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF0000"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF0000"	+ "\n" +
				"MOV TOP 5"		+ "\n" +
				"TAR RIG"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #99FFCC"	+ "\n" +
				"TAR BOT 2"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF99CC"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF99CC"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF99CC"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF99CC"	+ "\n" +
				"TAR BOT"		+ "\n" +
				"BUILD"			+ "\n" +
				"BRU #FF99CC"	+ "\n" +
				"TAR LEF 7"		+ "\n" +
				"GO 8";

	return function(letter) {
		return letters[letter.toLowerCase()];
	};
}();