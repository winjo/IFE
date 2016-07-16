function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}
function Tree(data) {
    var node = new Node(data);
    this._root = node;
}
//深度优先遍历
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
//广度优先遍历
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
//前序遍历
Tree.prototype.traversePre = function(callback) {
    (function recurse(currentNode) {
        callback(currentNode);

        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            recurse(currentNode.children[i]);
        }
 
    })(this._root);
};
Tree.prototype.traversePost = function(callback) {
    (function recurse(currentNode) {
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            recurse(currentNode.children[i]);
        }
 
        callback(currentNode);
    })(this._root);
 
};
Tree.prototype.traverseSearch = function(callback) {
    var found = false;

    //递归法
    (function recurse(currentNode) {
        found = callback(currentNode);

        for (var i = 0, length = currentNode.children.length; i < length && !found; i++) {
            recurse(currentNode.children[i]);
        }
    })(this._root);

    //非递归
    // var queue = [];
    // queue.push(this._root);
    // currentTree = queue.shift();
    // while(!found && currentTree){
    //     found = callback(currentTree);

    //     for (var i = 0, length = currentTree.children.length; i < length && !found; i++) {
    //         queue.push(currentTree.children[i]);
    //     }

    //     currentTree = queue.shift();
    // }
};
//二叉树的遍历
//前序
Tree.prototype.traverseDLR = function(callback) {
    (function recurse(currentNode) {
        callback(currentNode);

        if (typeof currentNode.children[0] !== "undefined") {
    		recurse(currentNode.children[0]);
    	}
        if (typeof currentNode.children[1] !== "undefined") {
    		recurse(currentNode.children[1]);
        }
    })(this._root);
};
//中序
Tree.prototype.traverseLDR = function(callback) {
    (function recurse(currentNode) {
        if (typeof currentNode.children[0] !== "undefined") {
    		recurse(currentNode.children[0]);
    	}

    	callback(currentNode);

        if (typeof currentNode.children[1] !== "undefined") {
        	recurse(currentNode.children[1]);
        }
    })(this._root);
};
//后序
Tree.prototype.traverseLRD = function(callback) {
    (function recurse(currentNode) {
    	if (typeof currentNode.children[0] !== "undefined") {
    		recurse(currentNode.children[0]);
    	}
        if (typeof currentNode.children[1] !== "undefined") {
        	recurse(currentNode.children[1]);
        }

        callback(currentNode);
    })(this._root);
};