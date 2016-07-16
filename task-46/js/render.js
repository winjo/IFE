(function () {
	var $canvas = document.getElementById("game"),
		ctx = $canvas.getContext("2d"),
		blockImg = new Image(),
		marioImg = new Image(),
		flagImg = new Image(),
		blockReady = false,
		marioReady = false,
		flagReady = false;

	blockImg.onload = function () {
		blockReady = true;
	};
	marioImg.onload = function () {
		marioReady = true;
	};
	flagImg.onload = function () {
		flagReady = true;
	};
	blockImg.src = "images/block.png";
	marioImg.src = "images/mario.png";
	flagImg.src = "images/flag.png";

	var render = function () {
		if (blockReady && marioReady && flagReady) {
			window.render = function (data) {
				ctx.clearRect(0, 0, $canvas.width, $canvas.height);
				data.forEach(function (row, x) {
					row.forEach(function (column, y) {
						if (!data[x][y]) {
							ctx.drawImage(blockImg, y * map.unit, x * map.unit);
						}
					});
				});
				ctx.drawImage(marioImg, mario.y * map.unit, mario.x * map.unit);
				ctx.drawImage(flagImg, flag.y * map.unit, flag.x * map.unit);
			};
		}
	};

	window.render = render;
}());