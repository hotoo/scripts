
/**
 * 点(三维空间)。
 * @namespace org.xianyun.math;
 * @extends Object
 * @constructor new Point3D(Number, Number, Number);
 * 				new Point3D(Point, Point, Point);
 * 				new Point3D(Point2D, Number);
 * 				new Point3D(Point2D, Point);
 * @param {Number, Point, Point2D} x
 * @param {Number, Point} y
 * @param {Number, Point} z
 * @since IE5.0, Firefox1.0, Opera8.0, Netscape8.0
 * @author 闲耘 (xianyun.org, hotoo.cn[AT]gmail.com)
 * @version 0.1, 2007/11/18
 */
var Point3D = function(x, y, z){
	if (x.typeOf()==="Number" && y.typeOf()==="Number" && z.typeOf()==="Number")
		this.__Point3D_num_num_num(x, y, z);
	else if (x instanceof Point && y instanceof Point && z instanceof Point)
		this.__Point3D_point_point_point(x, y, z);
	else if (x instanceof Point2D && y.typeOf()==="Number")
		this.__Point3D_point2d_num(x, y);
	else if (x instanceof Point2D && y instanceof Point)
		this.__Point3D_point2d_point(x, y);
};

/**
 * 重载构造函数。
 * @param {Number} x 指定的x坐标值。
 * @param {Number} y 指定的y坐标值。
 * @param {Number} z 指定的z坐标值。
 */
Point3D.prototype.__Point3D_num_num_num = function(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;
};
/**
 * 重载构造函数。
 * @param {Point} p1 指定的x轴坐标点。
 * @param {Point} p2 指定的y轴坐标点。
 * @param {Point} p3 指定的z轴坐标点。
 */
Point3D.prototype.__Point3D_point_point_point = function(p1, p2, p3){
	this.x = p1.value;
	this.y = p2.value;
	this.z = p3.value;
};
/**
 * 重载构造函数。
 * @param {Point2D} p 指定的二维空间点。
 * @param {Number} n 指定的z坐标值。
 */
Point3D.prototype.__Point3D_point2d_num = function(p, n){
	this.x = p.x;
	this.y = p.y;
	this.z = n;
};
/**
 * 重载构造函数。
 * @param {Point2D} p2 指定的二维空间点。
 * @param {Point} p 指定的一维空间点。
 */
Point3D.prototype.__Point3D_point2d_point = function(p2, p){
	this.x = p2.x.value;
	this.y = p2.y.value;
	this.z = p.value;
};

/**
 * 比较两个点的坐标值是否相等。
 * @param {Point3D} p 指定的三维空间点。
 */
Point3D.prototype.equals = function(p){
	return p instanceof Point3D &&
		p.x === this.x &&
		p.y === this.y &&
		p.z === this.z;
};

Point3D.prototype.toString = function(){
	return "["+this.x+","+this.y+","+this.z+"]";
};
