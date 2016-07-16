(function(global) {
	var baseHeight,//基准高
		alw;//容差
		
	var adjust = function(album, width) {
		var suite = [{img: [], sum: 0}];//图片序列
		var imgs = album.children;console.log(imgs.length);
		width = width - 0;
		baseHeight = width / 6;
		alw = width / 5;
		Array.prototype.forEach.call(imgs, function(img) {
			var width = img.clientWidth,
				height = img.clientHeight,
				baseWidth = baseHeight * width / height,
				tmpSum;

			for (var i = 0, l = suite.length; i < l; i++) {
				tmpSum = suite[i].sum + baseWidth;
				if (tmpSum < width + alw) {
					suite[i].img.push(img);
					suite[i].sum = tmpSum;
					break;
				}
			}
			if (i == l) {
				suite.push({img: [img], sum: baseWidth});
			}
		});console.log(suite.length);
		suite.forEach(function(row, index) {
			var realHeight = baseHeight * width / row.sum;
			if (index == suite.length - 1) {
				realHeight = baseHeight;
			}
			row.img.forEach(function(img) {
				img.style.height = realHeight + "px";
				album.appendChild(img);
			});
		});
	};

	global.cask = {
		init: function() {
			var albums = document.getElementsByClassName("album-cask");
			Array.prototype.forEach.call(albums, function(album) {
				var width = album.dataset.width || album.clientWidth;

				album.style.width = width + "px";
				adjust(album, width);
			});
		}
	};
}(this));

window.onload = function () {
	window.cask.init();
};
