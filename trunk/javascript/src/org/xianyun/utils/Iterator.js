/*<![CDATA[*/

/**
 * @overview 迭代器。
 * 默认迭代位置在起始位置之前，第一次迭代则返回第一个元素。
 * @namespace org.xianyun.utils;
 * @constructor new Iterator(a);
 * @param {Array} a 将指定数组实例化为迭代器。
 * @version 0.1, 2007/11/15
 * @author 闲耘(mail@xianyun.org)
 */
var Iterator = function(a){
	var i = 0;
	
	/**
	 * 判断迭代器是否还有下一个元素。
	 * @return {Boolean} true, 如果有，否则，false。
	 */
	this.hasNext = function(){
		return i < a.length;
	};
	
	/**
	 * 获取迭代器中下一个元素。
	 * @exception {OutOfBoundException} 迭代器中没有下一个元素时，抛出异常。
	 * @return {Object} 返回迭代器下一个元素。
	 */
	this.next = function(){
		return a[i++];
	};
};
//Iterator.prototype.equals = function(i){
//	if(this===i){return true;}
//	if(!(i instanceof Iterator)){return false;}
//	var v1=this.valueOf(), v2=i.valueOf();
//	return 
//};

/*]]>*/