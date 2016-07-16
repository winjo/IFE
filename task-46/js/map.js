(function () {
	var UNIT = 32,
		ROW = 18,
		COLUMN = 11;

	var randomMap = function () {
		var data = [],
			x, y, i, j, 
			k = 0, amount = 30;

		for (i = 0; i < ROW; i++) {
			data[i] = [];
			for (j = 0; j < COLUMN; j++) {
				data[i][j] = 1;
			}
		}
		while (k++ < amount) {
			x = ~~(Math.random() * ROW);
			y = ~~(Math.random() * COLUMN);
			while ((x == flag.x && y == flag.y) ||
				   (x == mario.x && y == mario.y)) {
				x = ~~(Math.random() * ROW);
				y = ~~(Math.random() * COLUMN);
			}
			data[x][y] = 0;
		}
		return data;
	};
	var map = {
		row: ROW,
		column: COLUMN,
		unit: UNIT,
		data: data.shift(),
		update: function() {
			this.data = data.shift() || randomMap();
		}	
	};
	
	window.map = map;
}());