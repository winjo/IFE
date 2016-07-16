(function() {
	var first = document.getElementsByClassName("first");
		second = document.getElementsByClassName("second");
		third = document.getElementsByClassName("third");
		fourth = document.getElementsByClassName("fourth");
		i = 0;

	var tree = new Tree(first[0]);

	tree.add(second[0], first[0], tree.traverseBF);
	tree.add(second[1], first[0], tree.traverseBF);

	for (i = 0; i < third.length; i++) {
		tree.add(third[i], second[Math.floor(i/2)], tree.traverseBF);
	}

	for (i = 0; i < fourth.length; i++) {
		tree.add(fourth[i], third[Math.floor(i/2)], tree.traverseBF);
	}

	var dlr = document.getElementById("dlr"),
		ldr = document.getElementById("ldr"),
		lrd = document.getElementById("lrd"),
		time = 0,
		animationQueue = [];

	i = 0;
	dlr.onclick = function() {
		clearTimeout(time);
		if (i > 0) {
			animationQueue[i-1].style.backgroundColor = "#fff";
		}
		i = 0;
		animationQueue = tree.traverseDLR();
		
		time = setTimeout(function show() {
			if (i > 0) {
				animationQueue[i-1].style.backgroundColor = "#fff";
			}
			if (i < animationQueue.length) {
				animationQueue[i++].style.backgroundColor = "#00f";
				time = setTimeout(show, 1000);
			} 		
		}, 1000);
	};
	ldr.onclick = function() {
		clearTimeout(time);
		if (i > 0) {
			animationQueue[i-1].style.backgroundColor = "#fff";
		}
		i = 0;
		animationQueue = tree.traverseLDR();

		time = setTimeout(function show() {
			if (i > 0) {
				animationQueue[i-1].style.backgroundColor = "#fff";
			}
			if (i < animationQueue.length) {
				animationQueue[i++].style.backgroundColor = "#00f";
				time = setTimeout(show, 1000);
			} 		
		}, 1000);
	};
	lrd.onclick = function() {
		clearTimeout(time);
		if (i > 0) {
			animationQueue[i-1].style.backgroundColor = "#fff";
		}
		i = 0;
		animationQueue = tree.traverseLRD();

		time = setTimeout(function show() {
			if (i > 0) {
				animationQueue[i-1].style.backgroundColor = "#fff";
			}
			if (i < animationQueue.length) {
				animationQueue[i++].style.backgroundColor = "#00f";
				time = setTimeout(show, 1000);
			} 		
		}, 1000);
	};
}());