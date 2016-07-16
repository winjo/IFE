(function () {
	var path = {
		new: false,
		value: []
	};
	document.addEventListener("click", function (e) {	
		if (e.target.id == "game") {
			var x = ~~(e.clientY / map.unit),
				y = ~~(e.clientX / map.unit);
			path.new = true;
			var start = [~~(mario.x + 0.5), ~~(mario.y + 0.5)];
			var end = [x, y];
			path.value = astar(start, end, map.data);
		}
	});

	window.path = path;
}());