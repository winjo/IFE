var astar = function(start, end, map) {
	var	COST_STRAIGHT = 10,//垂直方向或水平方向移动的路径评分
		COST_DIAGONAL = 14,//斜方向移动的路径评分
		row = window.map.row,
		column = window.map.column;

	var openList = [],
		closeList = [],
		resultList = [];
		
	var x1 = start[0],
		y1 = start[1],
		x2 = end[0],
		y2 = end[1];

	if(x1 < 0 || x1 >= row || y1 < 0 || y1 >= column ||
		x2 < 0 || x2 >= row || y2 < 0 || y2 >= column) {
	    return resultList;
	}
	if(map[x1][y1] === 0 || map[x2][y2] === 0){
	    return resultList;
	}

	var sNode = new Node(x1, y1, null);
	var eNode = new Node(x2, y2, null);
	
	openList.push(sNode);
	resultList = search(sNode, eNode);
	// if(resultList.length === 0){
	//     return;
	// }
	return resultList;

	//搜寻
	function search(sNode, eNode){
	  	var resultList = [],
	  		isFind = false,
	  		node = null,
	  		cost;

	  	while(openList.length > 0) {
	     	node = openList[0];
		    if(node.x == eNode.x && node.y == eNode.y) {
		        isFind = true;
		        break;
		    }
	        //遍历周围八个点
	        for (var i = node.x - 1, iLen = i + 3; i < iLen; i++) {
	           	for (var j = node.y - 1, jLen = j + 3; j < jLen; j++) {
	           		if(i < 0 || i >= row || j < 0 || j >= column) {
	           			continue;
	           		}
	           		//去掉原点
	           		if (i == node.x && j == node.y) {
	           			continue;
	           		}
	           		if (i == node.x || j == node.y) {
	           			cost = COST_STRAIGHT;
	           		} else {
	           			cost = COST_DIAGONAL;
	           		}
	           		checkPath(i, j, node, eNode, cost);
	           	}
	        }       
	        //从开启列表中删除
	        //添加到关闭列表中       
	        closeList.push(openList.shift());	  
	        //开启列表中排序，把F值最低的放到最底端
	        openList.sort(compare);
	    }
	    if(isFind){
	        getPath(resultList, node);
	    }
	    return resultList;
	}
	function checkPath(x, y, parentNode, eNode, cost){
		var node = new Node(x, y, parentNode);

	    if(map[x][y] === 0){
	        closeList.push(node);
	        return;
	    }
	    //查找关闭列表中是否存在
	    if (getIndex(closeList, x, y) != -1) {
	    	return;
	    }
	    //查找开启列表中是否存在
	    var index = getIndex(openList, x, y);	      		  	
		if (index != -1) {
			//G值是否更小，即是否更新G，F值
			if ((parentNode.g + cost) < openList[index].g) {
				openList[index].parentNode = parentNode;
				openList[index].setG(cost);
			}
		} else {
			//排除走斜线时旁边有墙的点
			if (map[x][parentNode.y] !== 0 && map[parentNode.x][y] !== 0) {
				//添加到开启列表中			
				node.setG(cost);
				node.setH(eNode);
				openList.push(node);
			}		
		}
	}
	//集合中是否包含某个元素(-1：没有找到，否则返回所在的索引)
	function getIndex(list, x, y){
	    var i, node;
		for (i = 0; i < list.length; i++) {
			node = list[i];
			if (node.x == x && node.y == y) {
				return i;
			}
		}
	    return -1;
	}
	//从终点往返回到起点
	function getPath(resultList, node) {
		if (node.parentNode !== null) {
			getPath(resultList, node.parentNode);
		}
		resultList.push(node);
	}
	//节点比较类
	function compare(o1, o2) {
		return o1.f - o2.f;
	}
	//节点构造函数
	function Node(x, y, parentNode) {
		this.x = x;
		this.y = y;
		this.parentNode = parentNode;
		this.g = 0;
		this.h = 0;
		this.f = 0;

		if (typeof Node.prototype.setG != "function") {
			Node.prototype.setG = function(cost) {
				this.g = (this.parentNode || {g: 0}).g + cost;
				this.f = this.g + this.h;
			};
			Node.prototype.setH = function(eNode) {
				this.h = Math.abs(this.x - eNode.x) * COST_STRAIGHT + Math.abs(this.y - eNode.y) * COST_STRAIGHT;
				this.f = this.g + this.h;
			};
		}
	}
};