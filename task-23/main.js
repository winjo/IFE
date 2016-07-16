(function() {
	var first = document.getElementsByClassName("first");
		second = document.getElementsByClassName("second");
		third = document.getElementsByClassName("third");
		fourth = document.getElementsByClassName("fourth");
		fifth = document.getElementsByClassName("fifth");
		i = 0;

	var tree = new Tree(first[0]);

	for (i = 0; i < second.length; i++) {
		tree.add(second[i], first[0], tree.traverseBF);
	}

	for (i = 0; i < third.length; i++) {
		if (i < 3) {
			tree.add(third[i], second[0], tree.traverseBF);
		} else {
			tree.add(third[i], second[1], tree.traverseBF);
		}
		
	}

	for (i = 0; i < fourth.length; i++) {
		if (i < 4) {
			tree.add(fourth[i], third[0], tree.traverseBF);
		} else if (i < 6) {
			tree.add(fourth[i], third[2], tree.traverseBF);
		} else if (i < 9) {
			tree.add(fourth[i], third[3], tree.traverseBF);
		} else {
			tree.add(fourth[i], third[4], tree.traverseBF);
		}	
	}

	tree.add(fifth[0], fourth[9], tree.traverseBF);

	var pre = document.getElementById("pre"),
		post = document.getElementById("post"),
		bf = document.getElementById("bf"),
		text = document.getElementById("text"),
		search = document.getElementById("search"),
		time = 0,
		animationQueue = [];

	i = 0;
	pre.onclick = function() {
		clearTimeout(time);
		if (i > 0) {
			animationQueue[i-1].style.backgroundColor = "#fff";
		}
		i = 0;
		animationQueue = [];

		tree.traversePre(function(node) {
			animationQueue.push(node.data);
		});
		
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
	post.onclick = function() {
		clearTimeout(time);
		if (i > 0) {
			animationQueue[i-1].style.backgroundColor = "#fff";
		}
		i = 0;
		animationQueue = [];

		tree.traversePost(function(node) {
			animationQueue.push(node.data);
		});

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
	bf.onclick = function() {
		clearTimeout(time);
		if (i > 0) {
			animationQueue[i-1].style.backgroundColor = "#fff";
		}
		i = 0;
		animationQueue = [];

		tree.traverseBF(function(node) {
			animationQueue.push(node.data);
		});

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
	search.onclick = function() {
		clearTimeout(time);
		if (i > 0) {
			animationQueue[i-1].style.backgroundColor = "#fff";
		}
		i = 0;
		animationQueue = [];

		tree.traverseSearch(function(node) {
			if (node.data.firstElementChild.firstChild.nodeValue != text.value) {
				animationQueue.push(node.data);
				return false;
			} else {
				animationQueue.push(node.data);
				return true;
			}
		});

		time = setTimeout(function show() {
			if (i > 0) {
				animationQueue[i-1].style.backgroundColor = "#fff";
			}
			if (i < animationQueue.length-1) {
				animationQueue[i++].style.backgroundColor = "#00f";
				time = setTimeout(show, 1000);
			} else {
				animationQueue[i++].style.backgroundColor = "#f00";
			} 		
		}, 1000);

	};
}());