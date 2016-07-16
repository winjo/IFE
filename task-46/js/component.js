(function () {
	var x1 = 0,
		y1 = (map.column - 1) / 2,
		x2 = (map.row - 1),
		y2 = (map.column - 1) / 2,
		speed = 1;

	var coord, diffX, diffY,
		arrivalX = true,
		arrivalY = true;

	var mario = {
		x: x1,
		y: y1,
		move: function (duration) {
			if (path.new) {
				if (arrivalX && arrivalY) {
					coord = path.value.shift();
					if (!coord) {
						path.new = false;
						return;
					}
					diffX = coord.x - mario.x > 0 ? 1 : -1;
					diffY = coord.y - mario.y > 0 ? 1 : -1;
				}

				mario.x += (duration * speed) / map.unit * diffX;
				mario.y += (duration * speed) / map.unit * diffY;

				if ((diffX > 0 && mario.x < coord.x) || 
					(diffX < 0 && mario.x > coord.x)) {
					arrivalX = false;
				} else {
					mario.x = coord.x;
					arrivalX = true;
				}

				if ((diffY > 0 && mario.y < coord.y) ||
					(diffY < 0 && mario.y > coord.y)) {
					arrivalY = false;
				} else {
					mario.y = coord.y;
					arrivalY = true;
				}
				//更新地图
				if (mario.x == flag.x && mario.y == flag.y) {		
					mario.x = x1;
					mario.y = y1;
					map.update();
					path.new = false;
				}		
			}
		}
	};
	var flag = {
		x: x2,
		y: y2
	};

	window.mario = mario;
	window.flag = flag;
}());