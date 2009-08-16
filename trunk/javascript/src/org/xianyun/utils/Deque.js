/*<![CDATA[*/
/**
 * 一个线性 collection，支持在两端插入和移除元素。名称 deque 是“double ended queue（双端队列）”的缩写，通常读为“deck”。
 * 大多数 Deque 实现对于它们能够包含的元素数没有固定限制，但此接口既支持有容量限制的双端队列，也支持没有固定大小限制的双端队列。 
 * @namespace org.xianyun
 * @extends {Object}
 * @constructor ?!
 * @param {Number} l 指定双向队列的长度，大于0则限制队列长度，否则不限制。
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/4/4
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var Deque = function(l){
	this._l = l||0; // max length.
	this._t = []; // table.
};
Deque.prototype.pushLeft = function(e){
	return this._t.splice(e,0,0);
};
Deque.prototype.push = function(i){
	return this._t[this._t] = i;
};
Deque.prototype.popLeft = function(){
	return this._t.splice(0,1);
};
Deque.prototype.pop = function(){
	return this._t.pop();
};
Deque.prototype.clear = function(){
	return this._t.length=0;
};
Deque.prototype.length = function(){
	return this._t.length;
};

/*]]>*/
