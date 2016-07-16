(function() {
	var choises = document.getElementById("choises"),
		display = document.getElementById("display");
		

	choises.addEventListener("click", function(e) {
		switch (e.target.id) {
			case "add-column":
				waterfall.adjust("column", true);
				break;
			case "reduce-column": 
				waterfall.adjust("column", false);
				break;
			case "add-gutter":
				waterfall.adjust("gutter", true); 
				break;
			case "reduce-gutter": 
				waterfall.adjust("gutter", false);
				break;
			default:
				break;
		}
	}, false);

	waterfall.album.addEventListener("click", function(e) {
		if (e.target.nodeName == "IMG") {
			var img = display.firstElementChild;
			img.setAttribute("src", e.target.getAttribute("src"));
			display.className += " in";				
		}
	},false);

	display.addEventListener('click', function(e) {
		if (e.target.nodeName != "IMG") {
			display.className = "fade";
		}			
	});

	window.addEventListener("scroll", function() {
		waterfall.add();
	}, false);

	waterfall.init();
}());