
/**
 * 有限直线段。
 * @namespace org.xianyun.math;
 * @extends org.xianyun.math.Line
 * @constructor new BeeLine(Point2D, Point2D);
 * @param {Point2D} start
 * @param {Point2D} end
 * @since IE5.0, Firefox1.0, Opera8.0, Netscape8.0
 * @author 闲耘 (xianyun.org, hotoo.cn[AT]gmail.com)
 * @version 0.1, 2007/11/18
 */
var BeeLine = function(start, end){
	Line.call(this, start, end);
};
BeeLine.prototype = new Line(new Point2D(0,0), new Point2D(1,1));

/**
 * 
 * @param {Point2D} point2d 指定的二维空间点。
 */
BeeLine.prototype.contains = function(point2d){
	return Line.prototype.contains(point2d) &&
		point2d.x.value > this.start.x.value &&
		point2d.x.value < this.end.x.value;
};

/**
 * intersect:相交
 * @param {Line} line
 */
BeeLine.prototype.intersect = function(line){
	if (line instanceof Line)
		return this.__instersect_line(line);
	else if (line instanceof BeeLine)
		return this.__intersect_beeline(line);
};
BeeLine.prototype.__instersect_line = function(line){
	return Line.prototype.intersect.call(this, line);
};

/**
 * intersection:交集
 */
BeeLine.prototype.intersection = function(){};

BeeLine.prototype.length = function(){
	var x = this.end.x-this.start.x;
	var y = this.end.y-this.start.y;
	return Math.sqrt(x*x + y*y);
};