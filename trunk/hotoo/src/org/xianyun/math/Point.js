
/**
 * 点(一维空间：只有x坐标轴)。
 * @namespace org.xianyun.math;
 * @extends Object
 * @constructor new Point(Number);
 * @param {Number} x 点所在x坐标轴的值。
 * @since IE5.0, Firefox1.0, Opera8.0, Netscape8.0
 * @author 闲耘 (xianyun.org, hotoo.cn[AT]gmail.com)
 * @version 0.1 2007/11/18
 */
var Point = function(x){
	this.value = x;
};

/**
 * 求两个一维空间点之间的距离。
 * @param {Point} point 指定的一维空间点。
 * @return {Number} 返回两点间距离。
 */
Point.prototype.distance = function(point){
	if (!point instanceof Point) throw new Error("point is not a instance of Point.");

	return Math.abs(this.value - point.value);
};

/**
 * 比较两个一维空间点的值是否相等。
 * @param {Point} point
 * @return {Boolean}
 */
Point.prototype.equals = function(point){
	return ((point instanceof Point) &&
		(this.value===point.value));
};

Point.prototype.toString = function(){
	return "["+this.value+"]";
};

Point.prototype.valueOf = function(){
	return this.toString();
};