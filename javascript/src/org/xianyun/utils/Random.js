// package org.xianyun.utils.Random

/**
 * 随机数对象。
 * @namespace org.xianyun.util
 * @constructor Random(Number)
 * @extends {Object}
 * @param {Number} seed 指定随机范围，[0,seed)。
 * @version 0.1, 2008/1/8
 * @author 闲耘(mail[AT]xianyun.org)
 */
var Random = function(seed){
	var sd = seed || 1;
	/**
	 * 返回下一个[0,seed)的随机数。
	 * @return {Number}
	 */
	var next = function(){
		return (Math.random()*sd);
	};
	
	/**
	 * 返回一个[0,seed)之间的整数。
	 * @return {Number}
	 */
	this.nextInt = function(){
		return parseInt(next());
	};
	
	/**
	 * 返回一个[0,seed)的浮点数。
	 * @return {Number}
	 */
	this.nextFloat = function(){
		return next(); //parseFloat(next());
	};
	
	/**
	 * 返回一个随机布尔值。
	 * @return {Boolean}
	 */
	this.nextBoolean = function(){
		return next()>=(sd/2);
	};
};
