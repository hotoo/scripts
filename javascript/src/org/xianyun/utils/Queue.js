/*<![CDATA[*/
/**
 * 有序单向列表，队列。
 * @namespace org.xianyun.utils;
 * @exception {TypeError} 如果设置队列最大长度的参数值不合法，抛出异常。
 * @constructor new Queue(len);
 * @param {Number} l 队列的最大长度，入列时如果队列超出最大长度，则队首出列；如果未设置，则不限制长度。
 * @author 闲耘 (mail[AT]xianyun.org)
 * @version 2007/07/23, 2008/3/20
 */
var Queue = function(l){
    var _e=[];
	if (l===undefined||l===null) _l = 0;
	else if (l instanceof Number || typeof l==="number") _l = l;
	else throw new TypeError("Queue:max length invaild.");
	
	/**
	 * 判断队列是否为空。
	 * @return {Boolean} true，如果队列没有元素，否则返回false。
	 */
	this.isEmpty = function(){
		return _e.length===0;
	};
	
	/**
	 * 取得队列的即时长度，即队列中元素的个数。
	 * @return {Number} 返回队列长度。
	 */
	this.length = function(){
		return _e.length;
	};
	
	/**
	 * 返回但不弹出队首元素。
	 * @exception {ReferenceError} 如果队列为空则抛出异常。
	 * @return {Object} 返回队列首个元素。
	 */
	this.get = function(){
		if (_e.length===0)
			throw new ReferenceError("Queue.get():queue is empty.");
		return _e[0];
	};
	
	/**
	 * 将（多个）指定元素推到队尾。
	 * @param {Object[]} 一个/多个元素。
	 * @return {Number} 返回队列当前长度。
	 */
	this.push = function(){
	    for (var i=0, l=arguments.length; i<l; i++){
			if (_l!==0 && _e.length>=_l) this.dequeue();
	        _e[_e.length] = arguments[i]; // _e.push(arguments[i]);
	    }
	    return _e.length;
	};
	
	this.dequeue = function(){
		if (_e.length===0) throw new ReferenceError("Queue.dequeue():queue is empty.");
		return _e.shift();
	};
	
	this.clear = function(){
		return this.splice(0, _e.length);
	};
	
	this.toString = function(){
		return _e.toString();
	};
	
	this.valueOf = function(){
		return _e;
	};
	
	this.equals = function(q){
		if (this===q) return true;
		var v=this.valueOf(), w=q.valueOf();
		if (q instanceof Queue && (v===w||v.equals(w))) return true;
		return false;
	};

	//@TODO
	//Queue.prototype.traverse = function(visit()){};
};
/*]]>*/