
/**
 * 二维空间向量。
 * @namespace org.xianyun.math;
 * @constructor new Vector2D(Vector, Vector);
 * 				new Vector2D(Point2D, Point2D);
 * 				new Vector2D(Number, Number);
 * 				new Vector2D(Number, Number, Number, Number);
 * @since IE5.0, Firefox1.0, Opera8.0, Netscape8.0
 * @author 闲耘 (xianyun.org, hotoo.cn[AT]gmail.com)
 * @version 0.1, 2007/11/18
 */
var Vector2D = function(){
    if (arguments.length == 2 && arguments[0] instanceof Point2D &&
        arguments[1] instanceof Point2D){
        this.__Vector2D_point2d_point2d.apply(this, arguments);
    } else if (arguments.length == 2 && !isNaN(arguments[0]) && !isNaN
        (arguments[1])){
		this.__Vector2D_double_double.apply(this, arguments);
    } else if (arguments.length == 4 && !isNaN(arguments[0]) && !isNaN
        (arguments[1]) && !isNaN(arguments[2]) && !isNaN(arguments[3])){
		this.__Vector2D_double_double_double_double.apply(this, arguments);
    } else {
        throw new Error("Argument Error!");
    }
};
/**
 * 重载构造函数。
 * @param {Vector} x 向量在x轴的分量。
 * @param {Vector} y 向量在y轴的分量。
 */
Vector2D.prototype.__Vector2D_vector_vector = function(x, y){
	this._x = x;
	this._y = y;
	this._start = new Point2D(x._start, y._start);
	this._end = new Point2D(x._end, y.end);
};
/**
 * 重载构造函数。
 * @param {Point2D} start 向量起点。
 * @param {Point2D} end 向量终点。
 */
Vector2D.prototype.__Vector2D_point2d_point2d = function(start, end){
    this.__Vector2D_vector_vector(new Vector(start.x, end.x),
		new Vector(start.y, end.y));
};
/**
 * 重载构造函数Vector2D
 * @param {Number} x
 * @param {Number} y
 */
Vector2D.prototype.__Vector2D_double_double = function(x, y){
	this.__Vector2D_point2d_point2d(new Point2D(0,0), new Point2D(x,y));
};
/**
 * 重载构造函数Vector2D
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 */
Vector2D.prototype.__Vector2D_double_double_double_double = function(x1, y1, x2, y2){
    this.__Vector2D_point2d_point2d(new Point2D(x1, y1), new Point2D(x2, y2));
};

/**
 * 求向量的长度。
 * @return {Number}
 */
Vector2D.prototype.length = function(){
	var x = this._x.length();
	var y = this._y.length();
    return Math.sqrt(x*x + y*y);
};

/**
 * 向量在x坐标轴的分量。
 * @return {Vector}
 */
Vector2D.prototype.pond_x = function(){
	return this._x;
};

/**
 * 向量在y坐标轴的分量。
 * @return {Vectors}
 */
Vector2D.prototype.pond_y = function(){
	return this._y;
};

/**
 * cross:求向量的交积 P1 X P2 = x1y2 - x2y1
 * @param {Vector2D} v
 */
Vector2D.prototype.plus = function(v){
	return new Vector2D();
};

Vector2D.prototype.minus = function(v){
	
};

