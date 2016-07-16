(function () {
	var $canvas = document.getElementById("game"),
		ctx = $canvas.getContext("2d"),
		blockImg = new Image(),
		marioImg = new Image(),
		flagImg = new Image(),
		monsterImg = new Image(),
		fireballImg = new Image(),
		blockReady = false,
		marioReady = false,
		flagReady = false,
		monsterReady = false,
		fireballReady = false;

	blockImg.onload = function () {
		blockReady = true;
	};
	marioImg.onload = function () {
		marioReady = true;
	};
	flagImg.onload = function () {
		flagReady = true;
	};
	monsterImg.onload = function () {
		monsterReady = true;
	};
	fireballImg.onload = function () {
		fireballReady = true;
	};
	blockImg.src = "images/block.png";
	marioImg.src = "images/mario.png";
	flagImg.src = "images/flag.png";
	monsterImg.src = "images/monster.png";
	fireballImg.src = "images/fireball.gif";

	var render = function () {
		if (blockReady && marioReady && flagReady && monsterReady && fireballReady) {
			window.render = function (data) {
				//绘制砖块
				ctx.clearRect(0, 0, $canvas.width, $canvas.height);
				data.forEach(function (row, x) {
					row.forEach(function (column, y) {
						if (!data[x][y]) {
							ctx.drawImage(blockImg, y * map.unit, x * map.unit);
						}
					});
				});
				//绘制mario
				ctx.drawImage(marioImg, mario.y * map.unit, mario.x * map.unit);
				//绘制旗帜（终点）
				ctx.drawImage(flagImg, flag.y * map.unit, flag.x * map.unit);
				//绘制怪物
				monsters.forEach(function (monster) {
					ctx.drawImage(monsterImg, monster.y * map.unit, monster.x * map.unit);
				});
				//绘制火球
				fireballs.forEach(function (fireball) {
					ctx.drawImage(fireballImg, fireball.y * map.unit, fireball.x * map.unit);
				});
			};
		}
	};

	window.render = render;
}());