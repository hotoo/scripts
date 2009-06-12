
/**
 * 点(二维空间)。
 * @namespace org.xianyun.math;
 * @extends Object
 * @constructor new Point2D(Point, Point);
 * 				new Point2D(Number, Number);
 * @param {Number, Point} x
 * @param {Number, Point} y
 * @since IE5.0, Firefox1.0, Opera8.0, Netscape8.0
 * @author 闲耘 (xianyun.org, hotoo.cn[AT]gmail.com)
 * @version 0.2 2007/11/18
 */
var Point2D = function(x, y){
	if (x instanceof Point && y instanceof Point){
		this.__Point2D_point_point(x, y);
	} else if (x.typeOf()===Number && y.typeOf()===Number){
		this.__Point2D_number_number(x, y);
	} else {
		throw new Error("arguments error.");
	}
};
/**
 * 重载构造函数。
 * @param {Number} numX x坐标值。
 * @param {Number} numY y坐标值。
 */
Point2D.prototype.__Point2D_number_number = function(numX, numY){
	this.__Point2D_point_point(new Point(numX), new Point(numY));
};
/**
 * 重载构造函数。
 * @param {Point} pointX x坐标点。
 * @param {Point} pointY y坐标点。
 */
Point2D.prototype.__Point2D_point_point = function(pointX, pointY){
	this.x = pointX;
	this.y = pointY;
};

/**
 * 求二维空间点所在(x,y)坐标轴的象限。
 * @return {Enum<String>} 
 * 		I, 第一象限
 * 		II, 第二象限
 * 		III, 第三象限
 * 		IV, 第四象限
 * 		0, 原点
 * 		X, x坐标轴 
 * 		Y, y坐标轴
 */
Point2D.prototype.quadrant = function(){
	var x = this.x.value;
	var y = this.y.value;
	if (x > 0 && y > 0) return "I";
	else if (x < 0 && y > 0) return "II";
	else if (x < 0 && y < 0) return "III";
	else if (x > 0 && y < 0) return "IV";
	else if (x===0 && y===0) return "0";
	else if (x === 0) return "X"; // x-axis.
	else if (y === 0) return "Y"; // y-axis.
	else throw new Error();
};
Point2D.prototype.toVector = function(){
    return new Vector2D(this.x.value, this.y.value);
};
Point2D.prototype.distance = function(){ //求距离
    if (arguments.length == 1 && arguments[0] instanceof Point2D){
        return this._point_distance.apply(this, arguments);
    } else if (arguments.length == 1 && arguments[0] instanceof Vector2D){
        return this._vector_distance.apply(this, arguments);
    } else {
        throw new Error("Argument Error!");
    }
};
Point2D.prototype._point_distance = function(p){  //求两点之间的距离(函数重载)
  return (new Vector2D(p,this)).length();
};
/**
 * 求二维空间点与指定的另一个二维空间点之间的距离。
 * @param {Point2D} point2d 指定的另一个二维空间点。
 * @return {Number} 两个点之间的直线距离。
 */
Point2D.prototype._point_distance2 = function(point2d){
	var _x = this.x.distance(point2d.x);
	var _y = this.y.distance(point2d.y);
	return Math.sqrt(_x*_x + _y*_y);
};

Point2D.prototype._vector_distance = function(v){  //求点到向量的距离(函数重载)
  var v1 = new Vector2D(this, v.start);
  var v2 = new Vector2D(this, v.end);

  var area = Math.abs(v1.cross(v2));  //平行四边形面积 = v1 X v2 = |v1v2|sin(v1,v2)
  
  return area / v.length();   //平行四边形面积除以底边长度即为点到向量的距离
};

/**
 * 比较两个二维空间点坐标是否相等。
 * @param {Point2D} point2d
 */
Point2D.prototype.equals = function(point2d){
	return (point2d instanceof Point2D) &&
		(this.x.equals(point2d.x)) &&
		(this.y.equals(point2d.y));
};

Point2D.prototype.toString = function(){
	return "["+this.x.value+","+this.y.value+"]"
};

Point2D.prototype.valueOf = function(){
	return this;
};

Point2D.prototype.typeOf = function(){
	return "Point2D";
};
