(function() {
	var id = 0;
	var elementList = [];
	var DC = [];

	var commandSystem = function () {
		var obj = {},
			airships = [];

		obj.addAirship = function (airship) {
			airships.push(airship);
		};
		obj.removeAirship = function(airship) {
			var index = airships.indexOf(airship);
			if ( index > -1) {
				airships.splice(index, 1);
			}
		};
		obj.conduct = function(command) {
			airships.forEach(function(airship) {
				airship.execute(command);
			});
		};
		obj.adaper = new Adapter(function(json) {
			var binary = "";

			binary = preFix(json.id, 4);
			switch(json.command) {
				case "fly":
					binary += "0001";
					break;
				case "stop":
					binary += "0010";
					break;
				case "destroy":
					binary += "1100";
					break;
				default: 
					binary += "0000";
					break;
			}

			return binary;
		}, function(binary) {
			var json = {};

			json.id = parseInt(binary.slice(0, 2), 10) + "号";
			switch(binary.charAt(2)) {
				case "0":
					json.power = "前进号";
					break;
				case "1":
					json.power = "奔腾好";
					break;
				case "2":
					json.power = "超越号";
					break;
				default:
					json.power = "unknown";
					break;
			}
			switch(binary.charAt(3)) {
				case "0":
					json.energy = "劲量型";
					break;
				case "1":
					json.energy = "光能型";
					break;
				case "2":
					json.energy = "永久型";
					break;
				default:
					json.energy = "unknown";
					break;
			}
			switch(binary.slice(4, 8)) {
				case "0001":
					json.status = "飞行中";
					break;
				case "0010":
					json.status = "已停止";
					break;
				case "1100":
					json.status = "即将销毁";
					break;
				default:
					json.status = "unknown";
					break;
			}
			json.fuel = parseInt(binary.slice(-8), 10) + "%";

			return json;
		});

		return obj;
	}();

	var Airship = function(model) {
		this.element = createAirship();

		this.id = id;
		this.fuel = 100;
		this.model = model;

		this.status = "stop";

		var _this = this;
		var startTime = Date.now();
		requestAnimationFrame(function f() {
			var currentTime = Date.now(),
				supplyFuel = (currentTime - startTime) * _this.model.supply / 1000;

			_this.setFuel(_this.fuel + supplyFuel);

			startTime = currentTime;
			if (_this.status != "destroy") {
				requestAnimationFrame(f);
			}
						
		});

		setTimeout(function send() {
			var report = _this.adaper.encode(_this);
			bus(function(report) {
				dataCenter(report);
			}, 0.9, 300, report);

			if (_this.status != "destroy") {
				setTimeout(send, 700);
			}		
		}, 1000);
	};
	Airship.prototype.fly = function() {
		this.status = "fly";

		var initialTime = Date.now(),
			startTime = Date.now(),
			r = this.element.getAttribute("r"),
			iniRad = this.element.getAttribute("rad"),
			_this = this;

		requestAnimationFrame(function f() {
			var currentTime = Date.now(),
				rad = (currentTime - initialTime) * _this.model.speed / 1000 / r + Number(iniRad),
				consumeFuel = (currentTime - startTime) * _this.model.cosume / 1000;

			_this.setFuel(_this.fuel - consumeFuel);
			_this.element.style.transform = place(r, rad);
			_this.element.setAttribute("rad", rad);

			if (_this.status == "fly" && _this.fuel > 0) {
				startTime = currentTime;
				requestAnimationFrame(f);
			} else if (_this.status != "destroy") {
				_this.status = "stop";
			}
		});
	};
	Airship.prototype.stop = function() {
		this.status = "stop";
	};
	Airship.prototype.destroy = function() {
		var element;

		element = this.element.parentNode.removeChild(this.element);
		elementList.push(element);

		this.status = "destroy";
		commandSystem.removeAirship(this);
	};
	Airship.prototype.setFuel = function(remainFuel) {
		if (remainFuel > 100) {
			this.fuel = 100;
		} else if (remainFuel < 0) {
			this.fuel = 0;
		} else {
			this.fuel = remainFuel;
		}

		this.element.firstElementChild.style.width = this.fuel + "%";
		this.element.getElementsByClassName("percent")[0].innerHTML = Math.floor(this.fuel);
	};
	Airship.prototype.execute = function(command) {
		var duration = 300,
			probability = 0.9,
			_this = this;

		bus(function(cmd) {
			cmd = _this.adaper.decode(cmd);
			console.log(_this.id + "号飞船接受到命令");

			if (_this.id == cmd.id) {
				switch (cmd.command) {
					case "fly":
						console.log("飞船飞行");
						_this.fly();					
						break;
					case "stop":
						console.log("飞船停止");
						_this.stop();			
						break;
					case "destroy":
						console.log("飞船销毁");
						_this.destroy();	
						break;
					default:
						console.log("无法识别命令");
						break;
				}
			}
		}, probability, duration, command);
	};
	Airship.prototype.adaper = new Adapter(function(json) {
		var binary = "";

		binary = preFix(json.id, 2) + json.model.power + json.model.energy;
		switch(json.status) {
			case "fly":
				binary += "0001";
				break;
			case "stop":
				binary += "0010";
				break;
			case "destroy":
				binary += "1100";
				break;
			default: 
				binary += "0000";
				break;
		}
		binary += preFix(Math.floor(json.fuel), 8);

		return binary;
	}, function(binary) {
		var json = {};

		json.id = parseInt(binary.slice(0, 4), 10);
		switch(binary.slice(4)) {
			case "0001":
				json.command = "fly";
				break;
			case "0010":
				json.command = "stop";
				break;
			case "1100":
				json.command = "destroy";
				break;
			default:
				json.command = "unknown";
				break;
		}

		return json;
	}); 


	var conduct = document.getElementById("conduct");
	conduct.addEventListener("click", function(e) {
		var target = e.target;

		if (target.nodeName == "INPUT") {
			var cmd = {};
			cmd.id = target.parentNode.id - 0;
			cmd.command = target.className;

			console.log("命令：" + cmd.id + "号飞船" + target.value);

			commandSystem.conduct(commandSystem.adaper.encode(cmd));
		}
	}, false);

	var create = document.getElementById("create");
	create.addEventListener("click", function() {
		var power = document.getElementsByName("power"),
			energy = document.getElementsByName("energy"),
			powerValue,
			energyValue,
			model = {};

		powerValue = Array.prototype.filter.call(power, function(obj, index) {
			if (obj.checked) {
				model.power = index;
				return true;
			}
		})[0].value.split("/");
		energyValue = Array.prototype.filter.call(energy, function(obj, index) {
			if (obj.checked) {
				model.energy = index;
				return true;
			}
		})[0].value;
		model.speed = powerValue[0] - 0;
		model.cosume = powerValue[1] - 0;
		model.supply = energyValue[0] - 0;

		commandSystem.addAirship(new Airship(model));

		console.log("新的飞船起飞");
	}, false);

	// function mediator(callback, probability, duration, id) {
	// 	if (Math.random() < probability) {
	// 		setTimeout(callback, duration);
	// 	} else {
	// 		console.log("到达" + id + "号飞船的信息丢失");
	// 	}
	// }
	
	function Adapter(encode, decode) {
		this.encode = encode;
		this.decode = decode;
	}

	function bus(callback, probability, duration, command) {
		setTimeout(function send() {
			if (Math.random() < probability) {
				console.log("发送成功");
				callback(command);
			} else {
				console.log("发送失败，尝试重新发送");
				setTimeout(send, duration);
			}
		}, duration);
	}

	function createAirship() {
		var r = 120,
			rad = Math.random() * Math.PI * 2,
			airship;

		
		if (!(airship = elementList.pop())) {
			airship = document.createElement("div");
		}

		airship.id = "airship" + (++id);
		airship.className = "airship";
		airship.setAttribute("r", r);
		airship.setAttribute("rad", rad);
		airship.innerHTML = '<div class="fuel"></div>' +
							'<span>' + id + '号-</span>' +
							'<span class="percent">100</span><span>%</span>';
		airship.style.transform = place(r, rad);
		document.getElementById("planet").appendChild(airship);

		return airship;
	}

	function place(r, rad) {
		var cos = -Math.sin(rad);//Math.cos(rad + Math.PI / 2),
			sin = Math.cos(rad);//Math.sin(rad + Math.PI / 2);

		return "matrix(" + cos + "," + sin + "," + (-sin) + "," + cos + "," + r * sin + "," + (-r * cos) + ")";
	}

	function dataCenter(report) {
		var data = commandSystem.adaper.decode(report);
		DC.push(data);

		show(data);
	}

	var table = document.getElementById("table-container"),
		tbody = table.firstElementChild.lastElementChild,
		rowNum = 0;
	
	function show(data) {
		var row;

		rowNum++;
		if (rowNum < 11) {
			row = document.createElement("tr");
			tbody.appendChild(row);

			row.insertCell(0);
			row.cells[0].innerHTML = data.id;
			row.insertCell(1);
			row.cells[1].innerHTML = data.power;
			row.insertCell(2);
			row.cells[2].innerHTML = data.energy;
			row.insertCell(3);
			row.cells[3].innerHTML = data.status;
			row.insertCell(4);
			row.cells[4].innerHTML = data.fuel;
		} else {
			row = tbody.appendChild(tbody.firstElementChild);
			row.cells[0].innerHTML = data.id;
			row.cells[1].innerHTML = data.power;
			row.cells[2].innerHTML = data.energy;
			row.cells[3].innerHTML = data.status;
			row.cells[4].innerHTML = data.fuel;
		}
		
	}

	function preFix(num, length) {
		return (Array(length).join("0") + num).slice(-length);
	} 
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
}());