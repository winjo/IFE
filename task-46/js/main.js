(function () {
	(function () {
		var selfInterval = 1000 / 16;
		var requestAnimFrame = window.requestAnimationFrame    ||
	                       	window.webkitRequestAnimationFrame ||
	                        window.mozRequestAnimationFrame    ||
	                       	window.msRequestAnimationFrame     ||
	                        window.oRequestAnimationFrame      ||
	                        function (callback) {
	                            setTimeout(callback, selfInterval);
	                        };
	    window.requestAnimationFrame = requestAnimFrame;
	})();

	var now, then, duration;

	var main = function () {
		now = Date.now();
		duration = now - then;

		mario.move(duration);
		render(map.data);

		then = now;
		requestAnimationFrame(main);
	};

	then = Date.now();
	main();
}());