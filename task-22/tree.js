function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}
function Tree(data) {
    var node = new Node(data);
    this._root = node;
}

Tree.prototype.traverseDF = function(callback) {
 
    // this is a recurse and immediately-invoking function 
    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        }
 
        // step 4
        callback(currentNode);
         
        // step 1
    })(this._root);
 
};
Tree.prototype.traverseBF = function(callback) {
    var queue = [];
     
    queue.push(this._root);
 
    currentTree = queue.shift();
 
    while(currentTree){
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.push(currentTree.children[i]);
        }
 
        callback(currentTree);
        currentTree = queue.shift();
    }
};
Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
};
Tree.prototype.add = function(data, toData, traversal) {
    var child = new Node(data),
        parent = null,
        callback = function(node) {
            if (node.data === toData) {
                parent = node;
            }
        };
 
    this.contains(callback, traversal);
 
    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};
Tree.prototype.remove = function(data, fromData, traversal) {
    var tree = this,
        parent = null,
        childToRemove = null,
        index;
 
    var callback = function(node) {
        if (node.data === fromData) {
            parent = node;
        }
    };
 
    this.contains(callback, traversal);
 
    if (parent) {
        index = findIndex(parent.children, data);
 
        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }
 
    return childToRemove;
};
function findIndex(arr, data) {
    var index;
 
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].data === data) {
            index = i;
        }
    }
 
    return index;
}
//二叉树的遍历
Tree.prototype.traverseDLR = function() {
	var animationQueue = []; 
	// this is a recurse and immediately-invoking function 
    (function recurse(currentNode) {
        animationQueue.push(currentNode.data);
        if (typeof currentNode.children[0] !== "undefined") {
    		recurse(currentNode.children[0]);
    	}
        if (typeof currentNode.children[1] !== "undefined") {
    		recurse(currentNode.children[1]);
        }
    })(this._root);

    return animationQueue;
};
Tree.prototype.traverseLDR = function() {
	var animationQueue = []; 
	// this is a recurse and immediately-invoking function 
    (function recurse(currentNode) {
        if (typeof currentNode.children[0] !== "undefined") {
    		recurse(currentNode.children[0]);
    	}
    	animationQueue.push(currentNode.data);
        if (typeof currentNode.children[1] !== "undefined") {
        	recurse(currentNode.children[1]);
        }
    })(this._root);

    return animationQueue;
};
Tree.prototype.traverseLRD = function() {
	var animationQueue = [];
	// this is a recurse and immediately-invoking function 
    (function recurse(currentNode) {
    	if (typeof currentNode.children[0] !== "undefined") {
    		recurse(currentNode.children[0]);
    	}
        if (typeof currentNode.children[1] !== "undefined") {
        	recurse(currentNode.children[1]);
        }
        animationQueue.push(currentNode.data);
    })(this._root);

    return animationQueue;
};