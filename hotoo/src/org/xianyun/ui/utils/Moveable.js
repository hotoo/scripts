/*<![CDATA[*/

/**
 * 可移动的HTML元素对象。
 * @namespace org.xianyun.ui.utils;
 * @constructor new Moveable(document.getElementById("demo"))
 * @param {HTMLElement} elem DOM Element, 指定的可移动对象。
 * 
 * @extends Object
 * @author 闲耘 (mail[AT]xianyun.org)
 * @since IE5.0+, Firefox1.0+, Opera8.0+
 * @version 2007/10/31
 */
var Moveable = function(elem){
	this._ele = elem; // 可移动元素对象。
	if (this._ele) this._ele.style.position = "absolute"; // 用if判断是为了防止继承时第一次创建不带参数而出错。
};
/**
 * 移动可移动层(Moveable)到指定坐标位置。
 * @param {Number} x 移至X坐标处。
 * @param {Number} y 移至Y坐标处。
 */
Moveable.prototype.moveTo = function(x, y){
	this.setCoordinate(x, y);
};
/**
 * 设置可移动层(Moveable)的坐标位置为指定值。
 * @param {Number} x 设置X坐标。
 * @param {Number} y 设置Y坐标。
 */
Moveable.prototype.setCoordinate = function(x, y){
	if (x!==null) this._ele.style.left = x+"px";
	if (y!==null) this._ele.style.top = y+"px";
};
/**
 * 获取看移动层当前坐标。
 * @return {Object} (x:Number,y:Number)
 */
Moveable.prototype.getCoordinate = function(){
	return {
		"x":parseInt(this._ele.style.left),
		"y":parseInt(this._ele.style.top)
	};
};

/**
 * 获取可移动元素对象本身。
 * @return {HTMLElement}
 */
Moveable.prototype.getElement = function(){
	return this._ele;
};

/*]]>*/