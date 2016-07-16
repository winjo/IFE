(function(global) {
	var update = function(node, width, height) {
		node.style.width = width;
		node.style.height = height;

		var childCount = node.childElementCount,
			nWidth = parseInt(width),
			nHight = parseInt(height);
		if (childCount == 3) {
			node.children[0].style.width = nWidth - nHight / 2 + "px";
			node.children[1].style.width = nHight / 2 + "px";
			node.children[2].style.width = nHight / 2 + "px";
		} else if (childCount == 5) {
			node.children[3].style.height = nWidth / 3 + "px";
			node.children[4].style.height = nHight - nWidth / 3 + "px";
		}
	};
	global.albumjigsaw = {
		init: function() {
			var nodes = document.getElementsByClassName("album-jigsaw");
			Array.prototype.forEach.call(nodes, function(node) {
				var width = window.getComputedStyle(node).width;
				var height = window.getComputedStyle(node).height;

				update(node, width, height);
			});
		}
	};
}(this));

window.albumjigsaw.init();