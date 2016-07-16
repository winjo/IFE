(function () {
	var x1 = 0,
		y1 = (map.column - 1) / 2,
		x2 = (map.row - 1),
		y2 = (map.column - 1) / 2,
		marioSpeed = 1,
		fireSpeed = 0.1;

	var coord, diffX = 0, diffY = 0,
		arrivalX = true,
		arrivalY = true;

	var reset = function () {
		mario.x = x1;
		mario.y = y1;
		path.new = false;
		arrivalX = true;
		arrivalY = true;
	};

	var mario = {
		x: x1,
		y: y1,
		speed: marioSpeed,
		move: function (duration) {
			if (path.new) {
				if (arrivalX && arrivalY) {
					coord = path.value.shift();
					if (!coord) {
						path.new = false;
						return;
					}
					diffX = coord.x > mario.x ? 1 : -1;
					diffY = coord.y > mario.y ? 1 : -1;
				}

				mario.x += duration * this.speed / map.unit * diffX;
				mario.y += duration * this.speed / map.unit * diffY;

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
					reset();	

					map.update();
					posi = monstersPosi.shift();
					monsters.forEach(function (monster, index) {
						monster.update(index);
					});					
				}		
			}
		}
	};

	var flag = {
		x: x2,
		y: y2
	};

	var monsters = [], fireballs = [], fireballsCathe = [];
		monstersPosi = [[[5,3,1.5],[10,2,2.5],[10,8,2.5]],
						[[11,3,1.5],[4,6,1.5],[2,8,1.5]]];

	var Monster = function (x, y, r) {
		this.x = x;
		this.y = y;
		this.area = r * r;//侦查区域
		this.interval = 500;
	};
	Monster.prototype.detect = function (duration) {
		this.interval += duration;
		if (this.interval > 500) {
			this.interval = 500;
		}
		var val = (this.x - mario.x) * (this.x - mario.x) + (this.y - mario.y) * (this.y - mario.y);
		if (this.area > val && this.interval == 500) {		
			this.fire(val);
			this.interval = 0;
		}
	};
	Monster.prototype.update = function (index) {
		var	x, y, r;

		if (posi) {
			x = posi[index][0];
			y = posi[index][1];
			r = posi[index][2];
		} else {
			do {
				x = ~~(Math.random() * (map.row - 4) + 2);
				y = ~~(Math.random() * map.column);
				r = ~~(Math.random() * 3 + 1) + 0.5;
			} while (map.data[x][y] === 0);
		}			
		this.x = x;
		this.y = y;
		this.setArea(r);
	};
	Monster.prototype.fire = function (val) {
		var	radioX = (mario.x - this.x) / Math.sqrt(val),
			radioY = (mario.y - this.y) / Math.sqrt(val);

		var fireball = fireballsCathe.shift();

		if (fireball) {
			fireball.x = this.x;
			fireball.y = this.y;
			fireball.radio = [radioX, radioY];
		} else {
			fireball = new Fireball(this.x, this.y, [radioX, radioY]);
		}
		
		fireballs.push(fireball);
		
	};
	Monster.prototype.setArea = function (r) {
		this.area = r * r;
	};

	var Fireball = function (x, y, radio) {
		this.x = x;
		this.y = y;
		this.radio = radio;
	};
	Fireball.prototype.speed = fireSpeed;
	Fireball.prototype.move = function (duration) {
		this.x += duration * this.speed * this.radio[0] / map.unit;
		this.y += duration * this.speed * this.radio[1] / map.unit;

		var x = ~~this.x,
			y = ~~this.y;

		if (x < 0 || x >= map.row || 
			y < 0 || y >= map.column ||
			map.data[x][y] === 0) {
			fireballsCathe.concat(fireballs.splice(fireballs.indexOf(this), 1));
		}

		if ((this.x - mario.x) * (this.x - mario.x) + (this.y - mario.y) * (this.y - mario.y) < 0.5) {
			alert("GAME OVER");
			fireballsCathe.concat(fireballs.splice(fireballs.indexOf(this), 1));
			reset();
		}

	};

	var posi = monstersPosi.shift();
	monsters.push(new Monster(posi[0][0], posi[0][1], posi[0][2]));
	monsters.push(new Monster(posi[1][0], posi[1][1], posi[1][2]));
	monsters.push(new Monster(posi[2][0], posi[2][1], posi[2][2]));

	window.mario = mario;
	window.flag = flag;
	window.monsters = monsters;
	window.fireballs = fireballs;
}());