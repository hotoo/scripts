
/**
 * 一维向量。
 * @namespace org.xianyun.math;
 * @extends Object
 * @constructor new Vector(Number, Number);
 * 				new Vector(Point, Point);
 * @param {Number, Point} start 一维向量起点。
 * @param {Number, Point} end 一维向量终点。
 * @since IE5.0, Firefox1.0, Opera8.0, Netscape8.0
 * @author 闲耘 (xianyun.org, hotoo.cn[AT]gmail.com)
 * @version 0.1, 2007/11/18
 */
var Vector = function(start, end){
	if (start.typeOf()==="Number" && end.typeOf()==="Number")
		this.__Vector_num_num(start, end);
	else if (start instanceof Point && end instanceof Point)
		this.__Vector_point_point(start, end);
	else 
		throw new Error("arguments error.");
};
/**
 * 重载构造函数。
 * @param {Number} start 一维向量起点。
 * @param {Number} end 一维向量终点。
 */
Vector.prototype.__Vector_num_num = function(start, end){
	this._start = new Point(start);
	this._end = new Point(end);
};
/**
 * 重载构造函数。
 * @param {Point} start 一维向量起点。
 * @param {Point} end 一维向量终点。
 */
Vector.prototype.__Vector_point_point = function(start, end){
	this._start = start;
	this._end = end;
};

/**
 * 一维空间向量相加。
 * @param {Vector} v 指定相加的一维空间向量。
 * @return {Vector}
 */
Vector.prototype.plus = function(v){
	if (!(v instanceof Vector)) return new Error("arguments error.");
	return new Vector(this._start.value+v._start.value,
		this._end.value+v._end.value);
};

/**
 * 一维空间向量相减。
 * @param {Vector} v 指定相减的一维空间向量。
 * @return {Vector}
 */
Vector.prototype.minus = function(v){
	if (!(v instanceof Vector)) return new Error("arguments error.");
	return new Vector(this._start.value-v._start.value,
		this._end.value-v._end.value);
};

/**
 * 求向量的长度。
 * @return {Number} 向量的长度。
 */
Vector.prototype.length = function(){
	return Math.abs(this._end.value-this._start.value);
};

/**
 * 求两个一维向量间的距离。
 * @param {Vector} v
 *//* 需要/有这个方法吗？
Vector.prototype.distance = function(v){
	if (!(v instanceof Vector)) return new Error("arguments error.");
	return this._point.distance(v._point);
};*/

/**
 * 比较两个向量的方向和长度是否相等。
 * @param {Vector} v 指定相比较的一维向量。
 * @return {Boolean} 类型、方向和长度都相等时返回true。
 */
Vector.prototype.equals = function(v){
	return (v instanceof Vector) &&
		this._start.equals(v._start) &&
		this._end.equals(v._end);
};

/**
 * 将向量转为字符串型。
 */
Vector.prototype.toString = function(){
	var f="";
	var s = this._start.value.toString()+","+this._end.value.toString();
	for (var i=1; i<s.length; i++)
		f+="-";
	return f+">\n" + s;
};