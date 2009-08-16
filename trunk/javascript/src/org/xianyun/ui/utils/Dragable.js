/*<![CDATA[*/

/**
 * 可拖放到对象，可跟随鼠标移动(可拖放)的可移动对象。
 * @namespace org.xianyun.ui.utils;
 * @constructor new Dragable(document.getElementById("lay"), document.getElementById("title"))
 * @param {HTMLElement} elem DOM Element, 可拖放到对象。
 * @param {HTMLElement} handle DOM Element, 拖放触发手柄，鼠标在此执行拖放。
 * 
 * @extends org.xianyun.ui.utils.Moveable;
 * @since IE5.0+, Firefox1.0+, Opera8.0+.
 * @version 2007/10/31
 * @author 闲耘 (mail[AT]xianyun.org)
 */
var Dragable = function(elem, handle){
	Moveable.call(this, elem);
	this._dragHandle = handle;
	this.dragable = false;
	this.distanceX = 0; // 鼠标指针与浮动层起始位置的水平距离。
	this.distanceY = 0; // 鼠标指针与浮动层起始位置的垂直距离。
	if (this._dragHandle){ // 用if判断是为了防止继承时第一次创建不带参数而出错。
	this._drag = Function.createDelegate(this, this.drag);
	this._dragging = Function.createDelegate(this, this.dragging);
	this._drop = Function.createDelegate(this, this.drop);
	Event.addEventListener(this._dragHandle, "mousedown", this._drag);
	}
};
Dragable.prototype = new Moveable();

Dragable.prototype.disable = function(b){
	if (b) Event.removeEventListener(this._dragHandle, "mousedown", this._drag);
	else Event.addEventListener(this._dragHandle, "mousedown", this._drag)
};

/**
 * 拖放起始设置程序。初始化将要拖放时的状态。
 * @param {Object} evt Event, 事件对象，为了兼容Firefox。
 */
Dragable.prototype.drag = function(evt){
	evt = window.event || evt;
	if (!Event.isLeftClick(evt)){return false;}
	Event.addEventListener(document, "mousemove", this._dragging);
	Event.addEventListener(document, "mouseup", this._drop);
	var layerCoor = this.getCoordinate(); // 可移动层起始坐标。
	var _x = Event.pointerX(evt);
	var _y = Event.pointerY(evt);
	this.distanceX = _x - layerCoor.x;
	this.distanceY = _y - layerCoor.y;
	this.dragable = true;
	return false;
};

/**
 * 拖放执行过程，此时可拖放层随鼠标移动。
 * @param {Object} evt Event, 事件对象，为了兼容Firefox。
 */
Dragable.prototype.dragging = function(evt){
	evt = window.event || evt;
	if (!this.dragable || !Event.isLeftClick(evt)){return false;}
	var oldCoor = this.getCoordinate();
	mosX = Event.pointerX(evt);
	mosY = Event.pointerY(evt);
	this.moveTo(mosX-this.distanceX, mosY-this.distanceY);
	return false;
};

/**
 * 拖放过程结束，设置状态。
 */
Dragable.prototype.drop = function(){
	Event.removeEventListener(document, "mouseup", this._drop);
	Event.removeEventListener(document, "mousemove", this._dragging);
	this.dragable = false;
	return false;
};

/*]]>*/