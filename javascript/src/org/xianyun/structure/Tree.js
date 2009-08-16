/*<![CDATA[*/

var Tree = function(){
	/**
	 * @type {TreeNode}
	 */
	this._root = null;
};
/**
 * @param {TreeNode} node 查找指定节点。
 */
Tree.prototype.has = function(node){
	if (!(this._root instanceof TreeNode)){
		throw new Error("param error.");
	}
	var curr = this._root;
	do{
		if (curr.hasMoreChild()){
			if (curr.equals(node)) return true;
			curr = curr.nextChild();
		} else if (curr.parent) {
			curr = curr.parent;
		} else {
			break;
		}
	}while(true);
	
	return false;
};


/**
 * 树的节点。
 * @param {Object} parent 节点的父节点。
 * @param {String} value 节点的值。
 */
var TreeNode = function(value){
	/**
	 * @type {String}
	 */
	this._value = value|"";
	/**
	 * @type {Array}
	 */
	this._children = null;
	this.parent = null;
	this._iteration=-1;
};
/**
 * 添加子节点。
 * @param {TreeNode} child 指定添加为子节点的节点对象。
 */
TreeNode.prototype.addChild = function(child){
	if (!this._children) this._children=[];
	this._children.push(child);
	this.parent = this;
	
};
TreeNode.prototype.removeChild = function(child){
	var i = this._children.indexOf(child);
	if (i===-1)return;
	this._children[i].parent = null;
	this._children.removeAt(i);
	if (this._children.length===0)this._children=null;
};
TreeNode.prototype.hasMoreChild = function(){
	return this._children!==null && 
		(this._iteration+1<this._children.length);
};
TreeNode.prototype.nextChild = function(){
	return this._children[++this._iteration];
};
TreeNode.prototype.equals = function(node){
	return node!==null && 
		(node instanceof TreeNode) &&
		this._value.equals(node._value) &&
		((this._children===null&&this._value===null)||
		this._children.equals(node._children));
};
TreeNode.prototype.toString = function(){
	return this._value;
};

/*]]>*/