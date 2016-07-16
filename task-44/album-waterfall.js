(function(global) {
	var gallerys = [],
		imgs = [],
		i = 1,
		maxPic = 100,
		gutter,
		column;
		
	var LoadImage = function() {
		this.$img = document.createElement("img");
		this.$img.style.marginTop = gutter + "px";
		this.img = imgs.shift() || new Image();
		this.img.onload = this.handleLoad.bind(this);
	};
	var getScreenHeight = function () {
		return (document.documentElement.scrollTop || document.body.scrollTop) +
				(document.documentElement.clientHeight || document.body.clientHeight);
	};
	LoadImage.prototype.setSrc = function(parent, src) {
		parent.appendChild(this.$img);
		this.$img.src = "images/loading.gif";
		this.img.src = src;
	};
	LoadImage.prototype.handleLoad = function() {
		this.$img.src = this.img.src;
		//保存对象以便复用
		this.img.src = "";
		imgs.push(this.img);
		this.img = null;
	};

	global.waterfall = {
		album: document.getElementById("album-waterfall"),
		init: function() {
			var width = this.album.dataset.width || this.album.clientWidth;

			column = (this.album.dataset.column || 4) - 0;
			gutter = this.album.dataset.gap || 16;
			this.album.style.width = width + "px";
			
			for (var i = 0; i < column; i++) {
				var gallery = this.album.appendChild(document.createElement("div"));
				gallery.style.width = 100 / column + "%";
				gallery.style.paddingLeft = gutter / 2 + "px";
				gallery.style.paddingRight = gutter / 2 + "px";

				gallerys.push(gallery);			
			}
			this.load();
		},
		load: function() {
			do {
				(new LoadImage()).setSrc(gallerys[0], "images/pictures/pic" + (i++) + ".jpg");

				gallerys.sort(function(gal1, gal2) {
					return gal1.clientHeight - gal2.clientHeight;
				});										
			}			
			while(getScreenHeight() > gallerys[0].offsetHeight + gallerys[0].offsetTop);
		},
		add: function() {
			if (i <= maxPic && getScreenHeight() > gallerys[0].offsetHeight + gallerys[0].offsetTop) {
				(new LoadImage()).setSrc(gallerys[0], "images/pictures/pic" + (i++) + ".jpg");

				gallerys.sort(function(gal1, gal2) {
					return gal1.clientHeight - gal2.clientHeight;
				});	
			}
		},
		adjust: function(type, status) {
			if (type == "column") {
				var gallery; 
				if (status) {
					column++;
					gallery = this.album.appendChild(document.createElement("div"));
					gallery.dataset.column = column - 1;		
					gallerys.push(gallery);
					gallerys.forEach(function(gallery) {
						gallery.style.width = 100 / column + "%";	
						gallery.style.paddingLeft = gutter / 2 + "px";
						gallery.style.paddingRight = gutter / 2 + "px";					
					});	
					this.load();	
				} else {
					if (column > 2) {
						column--;
						gallery = this.album.removeChild(this.album.firstElementChild);
						gallerys.splice(gallerys.indexOf(gallery), 1);
						gallerys.forEach(function(gallery) {
							gallery.style.width = 100 / column + "%";
						});
					}				
				}
			} else if (type == "gutter") {
				if (status) {
					gutter += 4;
					gallerys.forEach(function(gallery) {
						gallery.style.paddingLeft = gutter / 2 + "px";
						gallery.style.paddingRight = gutter / 2 + "px";
						Array.prototype.forEach.call(gallery.children, function(img) {
							img.style.marginTop = gutter + "px";
						});
					});
					
				} else {
					if (gutter > 4) {
						gutter -= 4;
						gallerys.forEach(function(gallery) {
							gallery.style.paddingLeft = gutter / 2 + "px";
							gallery.style.paddingRight = gutter / 2 + "px";
							Array.prototype.forEach.call(gallery.children, function(img) {
								img.style.marginTop = gutter + "px";
							});
						});				
					}		
				}
			}
		}
	};

}(this));