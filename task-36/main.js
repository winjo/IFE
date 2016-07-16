(function() {
	var X0 = 30,
		Y0 = 30,
		SAUARE_WIDTH = 45;
	var c = document.getElementById("grid-space");
	var ctx = c.getContext("2d");
	//绘制文本
	ctx.font="20px sans-serif";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	var i, x, y, tmp;
	for (i = 0; i < 10; i++) {
		x = X0 + 1 + (SAUARE_WIDTH + 1) / 2 * (2 * i + 1);
		y = Y0 / 2;
		ctx.fillText(i + 1, x, y);

		tmp = x;
		x = y;
		y = tmp;
		ctx.fillText(i + 1, x, y);
	}
	//绘制格子空间
	ctx.lineWidth = 2;
	ctx.strokeStyle = "black";
	ctx.strokeRect(X0 + 1, Y0 + 1, (SAUARE_WIDTH + 1) * 10 + 1, (SAUARE_WIDTH + 1) * 10 + 1);

	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#cdcdcd";
	for (i = 1; i < 10; i++) {
		x = X0 + 1.5 + (SAUARE_WIDTH + 1) * i;
		y = Y0 + 2;	
		ctx.moveTo(x, y);
		ctx.lineTo(x, y + (SAUARE_WIDTH + 1) * 10 - 1);

		tmp = x;
		x = y;
		y = tmp;
		ctx.moveTo(x, y);
		ctx.lineTo(x + (SAUARE_WIDTH + 1) * 10 - 1, y);
	}
	ctx.stroke();

	var locate = function(square) {
		square.squareCanvas.style.left = getRoundInt(X0 + 2 + (square.coodX - 1) * (SAUARE_WIDTH + 1)) + "px";
		square.squareCanvas.style.top = getRoundInt(Y0 + 2 + (square.coodY - 1) * (SAUARE_WIDTH + 1)) + "px";
		square.squareCanvas.style.transform = "rotate(" + getRoundInt(square.angle) + "deg)";
	};

	var wall = function(x, y, color) {
		color = typeof color == "undefined" ? "#ccc" : color;
		ctx.save();
		ctx.translate(X0 + 2 + (x - 1) * (SAUARE_WIDTH + 1), X0 + 2 + (y - 1) * (SAUARE_WIDTH + 1));
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, SAUARE_WIDTH, SAUARE_WIDTH);
		ctx.restore();
	};

	var square = function() {
		var coodX = 1,//getRandomInt(1, 10),
			coodY = 1,//getRandomInt(1, 10),
			angle = 0;
		var squareCanvas = document.createElement("canvas"),
			map = document.getElementById("map");

		map.appendChild(squareCanvas);

		squareCanvas.width = SAUARE_WIDTH;
		squareCanvas.height = SAUARE_WIDTH;
		squareCtx = squareCanvas.getContext("2d");
		squareCtx.fillStyle = "red";
		squareCtx.fillRect(0, 0, SAUARE_WIDTH, SAUARE_WIDTH);
		squareCtx.fillStyle = "blue";
		squareCtx.fillRect(0, 0, SAUARE_WIDTH, 10);

		map.style.position = "relative";
		squareCanvas.style.position = "absolute";

		return {
			squareCanvas: squareCanvas,
			coodX: coodX,
			coodY: coodY,
			angle: angle
		};
	}();

	var squreState = function() {
		var duration = 500,
			wallList = [];
		var states = {
			GO: function(num) {
				num = typeof num == "undefined" ? 1 : num - 0;
				switch (square.angle) {
					case 0:
						square.coodY -= num;
						break;
					case 90:
						square.coodX += num;
						break;
					case 180:
						square.coodY += num;
						break;
					case 270:
						square.coodX -= num;
						break;
					case -90:
						square.coodX -= num;
						break;
					case -180:
						square.coodY += num;
						break;
					case -270:
						square.coodX += num;
						break;
					default:
						break;
				}			
			},
			TUN: function(dir) {
				switch (dir) {
					case "LEF":
						square.angle -= 90;
						break;
					case "RIG":
						square.angle += 90;
						break;
					case "BAC":
						square.angle += 180;
						break;
					default:
						break;
				}				
			},
			TAR: function(dir, num) {
				num = typeof num == "undefined" ? 1 : num - 0;
				switch (dir) {
					case "LEF":
						square.coodX -= num;
						break;
					case "TOP":
						square.coodY -= num;
						break;
					case "RIG":
						square.coodX += num;
						break;
					case "BOT":
						square.coodY += num;
						break;
					default:
						break;
				}
			},
			MOV: function(dir, num, num1) {
				num = typeof num == "undefined" ? 1 : num - 0;
				num1 = typeof num == "undefined" ? 1 : num - 0;
				switch (dir) {
					case "LEF":
						square.coodX -= num;
						switch (square.angle) {
							case 0:
								square.angle -= 90;
								break;
							case 90:
								square.angle -= 180;
								break;
							case 180:
								square.angle += 90;
								break;
							case -180:
								square.angle += 90;
								break;
							case -270:
								square.angle -= 180;
								break;
							default:
								break;
						}
						break;
					case "TOP":
						square.coodY -= num;
						switch (square.angle) {
							case 90:
								square.angle -= 90;
								break;
							case 180:
								square.angle += 180;
								break;
							case 270:
								square.angle += 90;
								break;
							case -90:
								square.angle += 90;
								break;
							case -180:
								square.angle += 180;
								break;
							case -270:
								square.angle -= 90;
								break;
							default:
								break;
						}
						break;
					case "RIG":
						square.coodX += num;
						switch (square.angle) {
							case 0:
								square.angle += 90;
								break;
							case 180:
								square.angle -= 90;
								break;
							case 270:
								square.angle += 180;
								break;
							case -90:
								square.angle += 180;
								break;
							case -180:
								square.angle -= 90;
								break;
							default:
								break;
						}
						break;
					case "BOT":
						square.coodY += num;
						switch (square.angle) {
							case 0:
								square.angle += 180;
								break;
							case 90:
								square.angle += 90;
								break;
							case 270:
								square.angle -= 90;
								break;
							case -90:
								square.angle -= 90;
								break;
							case -270:
								square.angle += 90;
								break;
							default:
								break;
						}
						break;
					default:
						break;
				}
			},
			BUILD: function() {
				var x = square.coodX, 
					y = square.coodY;
				switch (square.angle) {
					case 0:
						y--;
						break;
					case 90:
						x++;
						break;
					case 180:
						y++;
						break;
					case 270:
						x--;
						break;
					case -90:
						x--;
						break;
					case -180:
						y++;
						break;
					case -270:
						x--;
						break;
					default:
						break;
				}
				
				var flag = true;
				if (x > 10 || x < 1 || y > 10 || y < 1) {
					console.log("错误：无法修墙");
				} else {
					for (var i = 0; i < wallList.length; i++) {
						if(wallList[i][0] == x && wallList[i][1] == y) {
							console.log("错误：无法修墙");
							flag = false; 
							break;
						}
					}
					if (flag) {
						wall(x, y);
						wallList.push([x, y]);
					}
				}
			},
			BRU: function(color) {
				var x = square.coodX, 
					y = square.coodY;
				switch (square.angle) {
					case 0:
						y--;
						break;
					case 90:
						x++;
						break;
					case 180:
						y++;
						break;
					case 270:
						x--;
						break;
					case -90:
						x--;
						break;
					case -180:
						y++;
						break;
					case -270:
						x--;
						break;
					default:
						break;
				}
				var flag = false;
				for (var i = 0; i < wallList.length; i++) {
					if(wallList[i][0] == x && wallList[i][1] == y) {						
						flag = true; 
						break;
					}
				}
				if (flag) {
					wall(x, y, color);
				} else {
					console.log("错误：无法粉刷");
				}
			},
			refresh: function() {
				square.coodX = 1;
				square.coodY = 1;
				square.angle = 0;
				locate(square);

				wallList.forEach(function(value) {
					wall(value[0], value[1], "white");
				});

				wallList.length = 0;
			},
			random: function() {
				var x = getRandomInt(1, 10),
					y = getRandomInt(1, 10),
					flag = true;
				for (var i = 0; i < wallList.length; i++) {
					if(wallList[i][0] == x && wallList[i][1] == y) {
						console.log("错误：无法修墙");
						flag = false; 
						break;
					}
				}
				if (flag) {
					wall(x, y);
					wallList.push([x, y]);
				}
			}
		};
		var changeState = function(cmds, speed) {
			if (cmds == "refresh") {
				states.refresh();
				return;
			} 
			if (cmds == "random") {
				states.random();
				return;
			}
			if (speed == "slow") {
				duration = 1000;
			} else if (speed == "middle") {
				duration = 500;
			} else if (speed == "fast") {
				duration = 200;
			} else if (speed == "top") {
				duration = 50;
			}
			var lastSquare = cloneObj(square),
				flag = false,
				i = 0,
				obstacle = false;
			
			var f1 = function() {
				var cmd = cmds[i++] || [""];
				if (cmd[0] == "BUILD" || cmd[0] == "BRU") {
					setTimeout(function() {
						f2(cmd);
					}, duration);
				} else{
					f2(cmd);
				}
			};

			var f2 = function(cmd) {
				states[cmd[0]].apply(states, cmd.slice(1));	

				if (square.coodX > 10) {
					square.coodX = 10;
				} else if (square.coodX < 1) {
					square.coodX = 1;
				}
				if (square.coodY > 10) {
					square.coodY = 10;
				} else if (square.coodY < 1) {
					square.coodY = 1;
				}
				for (var j = 0; j < wallList.length; j++) {
					if (isAmong(lastSquare.coodX, lastSquare.coodY, square.coodX, square.coodY, wallList[j][0], wallList[j][1])) {
						obstacle = true;
						if (isAmong(lastSquare.coodX, lastSquare.coodY, wallList[j][0], wallList[j][1], wallList[j][0] + 1, wallList[j][1])) {
							square.coodX = wallList[j][0] + 1;
						} else if (isAmong(lastSquare.coodX, lastSquare.coodY, wallList[j][0], wallList[j][1], wallList[j][0] - 1, wallList[j][1])) {
							square.coodX = wallList[j][0] - 1;
						} else if (isAmong(lastSquare.coodX, lastSquare.coodY, wallList[j][0], wallList[j][1], wallList[j][0], wallList[j][1] + 1)) {
							square.coodY = wallList[j][1] + 1;
						} else {
							square.coodY = wallList[j][1] - 1;
						}
						break;
					}
				}

				var coodXDif = square.coodX - lastSquare.coodX,
					coodYDif = square.coodY - lastSquare.coodY,
					angleDif = square.angle - lastSquare.angle;

				var startTime = Date.now();
				requestAnimationFrame(function f2() {
					var curTime = Date.now();
					lastSquare.coodX += (curTime - startTime) * coodXDif / duration;
					lastSquare.coodY += (curTime - startTime) * coodYDif / duration;
					lastSquare.angle += (curTime - startTime) * angleDif / duration;

					if ((coodXDif > 0 && lastSquare.coodX > square.coodX) ||
						(coodXDif < 0 && lastSquare.coodX < square.coodX)) {
						lastSquare.coodX = square.coodX;
						flag = false;
					} else if (coodXDif !== 0 && lastSquare.coodX !== square.coodX) {
						flag = true;
					}
					if ((coodYDif > 0 && lastSquare.coodY > square.coodY) ||
						(coodYDif < 0 && lastSquare.coodY < square.coodY)) {
						lastSquare.coodY = square.coodY;
						flag = false;
					} else if (coodYDif !== 0 && lastSquare.coodY !== square.coodY) {
						flag = true;
					}
					if ((angleDif > 0 && lastSquare.angle > square.angle) ||
						(angleDif < 0 && lastSquare.angle < square.angle)) {
						lastSquare.angle = square.angle;
						flag = false;
					} else if (angleDif !== 0 && lastSquare.angle !== square.angle) {
						flag = true;
					}
					if (flag) {
						locate(lastSquare);
						startTime = curTime;
						requestAnimationFrame(f2);
					} else {
						locate(square);
						if (Math.abs(square.angle) >= 360) {
							square.angle = square.angle > 0 ? square.angle - 360 : square.angle + 360;
							lastSquare.angle = square.angle;
						}
						if (!obstacle && i < cmds.length) {
							setTimeout(function() {
								f1();
							}, 10);
						} else if (obstacle) {
							alert("有墙，无法通过！");
						}
					}
				});
			};

			f1();
		
		};
		return {
			changeState: changeState
		};
	}();

	function getRoundInt(num) {
		return ~~(num + 0.5);
	}

	function getRandomInt(lowrValue, upperValue) {
		var choises = upperValue - lowrValue;
		return ~~((Math.random() * choises) + lowrValue);
	}

	function cloneObj(obj) {
		var clone = {};
		for (var key in obj) {
			clone[key] = obj[key];
		}
		return clone;
	}

	locate(square);

	

	var zone = document.getElementById("command-zone"),
		textarea = zone.firstElementChild,
		row = zone.lastElementChild,
		exec = document.getElementById("exec"),
		refresh = document.getElementById("refresh"),
		letter = document.getElementById("letter"),
		speed = document.getElementById("speed"),
		randomWall = document.getElementById("randomWall");

	var rowNum = function() {
		var numList = [],
			count = 0;
		return {
			add: function() {
				var n = numList.pop();
				if (n) {
					n.innerHTML = ++count;
					row.appendChild(n);
				} else {
					(row.appendChild(document.createElement("span"))).innerHTML = ++count;
				}
			},
			remove: function() {
				var child = row.lastElementChild;
				child.className = "";
				numList.push(row.removeChild(child));
				count--;
			}
		};
 	}();

 	var update = function() {
 		var codes = textarea.value;
 		var lines = codes.match(/\n/g);
 		lines = lines ? lines.length + 1 : 1;

 		for (var i = 0, len = row.childElementCount; i < len; i++) {
 			rowNum.remove();
 		}
 		for (var j = 0; j < lines; j++) {
 		  	rowNum.add();
 		}
 	};

	textarea.addEventListener("focus", function() {
		if (!this.value) {
			rowNum.add();
		}
	},false);
	textarea.addEventListener("blur", function() {
		if (!this.value) {
			rowNum.remove();
		}
	},false);
	textarea.addEventListener("scroll", function() {
		row.style.top = -textarea.scrollTop + "px";
	}, false);
	textarea.addEventListener("input", function() {
		update();
	}, false);
	exec.addEventListener("click", function() {
		var commands = textarea.value.split("\n"),
			i = 0;

		var analysis = analyseStr(textarea.value);
		if (analysis.res) {
			squreState.changeState(analysis.value, speed.value);
		} else {
			console.log("wrong", analysis.value);
			analysis.value.forEach(function(num) {
				if (row.childElementCount > 0) {
					row.childNodes[num].className = "error";
				}
				
			});	
		}

	},false);
	refresh.addEventListener("click", function() {
		textarea.value = "";
		squreState.changeState("refresh");
	},false);
	letter.addEventListener("change", function() {
		if (this.value) {
			drawLetter(this.value);
			textarea.value = drawLetter(this.value);
			update();
		}
	},false);
	randomWall.addEventListener("click", function() {
		squreState.changeState("random");
	},false);

	var analyseStr = function () {
		var reg = [];
		reg[0] = /^GO(\s+\d{1,2})?$/;
		reg[1] = /^TUN\s+(LEF|RIG|BAC)/;
		reg[2] = /^TAR\s+(LEF|RIG|TOP|BOT)(\s+\d{1,2})?$/;
		reg[3] = /^MOV\s+(LEF|RIG|TOP|BOT)(\s+\d{1,2})?$/;
		reg[4] = /^BUILD$/;
		reg[5] = /^BRU\s+#[0-9A-Fa-f]{6}$/;
		reg[6] = /^MOV\s+TO\s+\d{1,2}\s+\d{1,2}$/;
		
		return function(str) {
			var cmds = [],
				errors = [],
				arr = str.split("\n"),
				cmd,
				flag = true;//console.log(arr.length);
			var f = function(value) {
				return value.test(cmd);
			};		
			for (var i = 0; i < arr.length; i++) {
				cmd = trim(arr[i]); 			
				flag = reg.some(f);
				if (flag) {
					if (!errors.length) {
						cmds.push(cmd.split(/\s+/));
					}			
				} else {
					errors.push(i);
				}
			}
			if (errors.length) {
				return {
					res: false,
					value: errors
				};
			} else {
				return {
					res: true,
					value: cmds
				};
			}
		};
	}();

	function trim(str) {
		return str.replace(/^\s+|\s+$/g, "");
	}
	function isAmong(x1, y1, x2, y2, x0, y0) {
		if ((x1 - x0) * (x2 - x0) <= 0 && (y1 - y0) * (y2 - y0) <= 0) {
			return true;
		} else {
			return false;
		}
	}

	textarea.value = drawLetter("hi");
	update();
	letter.value = "选择一个字母";

}());

(function () {
	var selfInterval = 16;
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