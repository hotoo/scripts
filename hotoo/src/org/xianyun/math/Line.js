
/**
 * 直线方程: A*x+B*y+C=0
 * y=K*x+B;
 * @namespace org.xianyun.math;
 * @constructor new Line(Point2D, Point2D);
 * 				new Line(Number, Number);
 * @param {Point2D, Number} a
 * @param {Point2D, Number} b
 * @since IE5.0, Firefox1.0, Opera8.0, Netscape8.0
 * @author 闲耘 (xianyun.org, hotoo.cn[AT]gmail.com)
 * @version 0.1.1, 2007/11/18
 */
var Line = function(a, b){
	if (a instanceof Point2D && b instanceof Point2D)
		this.__Line_point2d_point2d(a, b);
	else if (a.typeOf()==="Number" && b.typeOf()==="Number")
		this.__Line_k_offset(a, b);
	else 
		throw new Error("arguments error.");
};
/**
 * 重载构造函数。
 * 直线方程: A*x+B*y+C=0
 * y=K*x+B;
 * @param {Point2D} point2d_1
 * @param {Point2D} point2d_2
 */
Line.prototype.__Line_point2d_point2d = function(point2d_1, point2d_2){
	this.start = point2d_1;
	this.end = point2d_2;
	this._K = (this.end.y-this.start.y) / (this.end.x-this.start.y);
	this.offset = this.end.y - this._K*this.end.x;
};
/**
 * 重载构造函数。
 * 直线方程: A*x+B*y+C=0
 * y=K*x+B;
 * @param {Number} k
 * @param {Number} offset
 */
Line.prototype.__Line_k_offset = function(k, offset){
	this._K = k;
	this.offset = offset;
};

Line.prototype._distance_line = function(line){
};
Line.prototype._distance_point2d = function(point2d){
};

/**
 * 判断指定二维空间点是否位于直线上。
 * @param {Object} obj
 * @return {Boolean}
 */
Line.prototype.contains = function(obj){
	if (obj instanceof Point2D) return this._contains_point2d(obj);
	return false;
};
/**
 * 判断指定二维空间点是否位于直线上。
 * @param {Point2D} point2d
 * @return {Boolean}
 */
Line.prototype._contains_point2d = function(point2d){
	return (new Line(this.start, point2d)._K===this._K);
};

/**
 * 判断直线是否与指定另一直线相交。
 * @param {Line} line
 * @return {Boolean}
 */
Line.prototype.intersect = function(line){
	return line instanceof Line &&
		this._K!==line._K;
};

/**
 * 求直线与另一直线的交点。
 * @param {Line} line
 * @return {Point2D}
 */
Line.prototype.intersection = function(line){
	if (!this.intersect(line)) return null;
	//TODO
};

/**
 * 判断直线是否平行于指定直线。
 * @param {Line} line
 */
Line.prototype.parallel = function(line){
	return (!this.intersect(line)) &&
		(this.offset !== line.offset);
};
