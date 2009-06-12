/*<![CDATA[*/
//TODO Drag时绑定事件，Drop时取消事件。
/**
 * {public}
 * 可拖动和放下(拖放)界面类型，允许设置多个拖动源和多个放置目标。
 * 具体实现请继承之，并扩展相应方法，可以参考org.xianyun.ui.dragdrop.DragDrop.js
 * @namespace org.xianyun.ui.dragdrop;
 * @constructor new DragDropable();
 * @extends Object
 * @since IE5.0+, Firefox1.0+, Opera8.0+
 * 
 * @author 闲耘 (xianyun.org, hotoo.cn[AT]gmail.com)
 * @version 2007/11/03
 */
var DragDropable = function(){
	this._E = { // Events.
	drag : Function.createDelegate(this, this.drag),
	draging : Function.createDelegate(this, this.draging),
	drop : Function.createDelegate(this, this.drop),
	mouseover : Function.createDelegate(this, this.mouseover),
	mouseout : Function.createDelegate(this, this.mouseout)
	};

	//----------------------------- {protocted} -------------------------------------\\
	this.dragable=false; // 当前元素对象是否可以进行拖放：鼠标按下源对象。
	this.inDraging=false; // 当前对象是否正在进行拖放：鼠标按下源对象，并进行移动。
	this.dropable=false; // 当前对象是否可以放置被拖放元素对象。
};

/**
 * {public}
 * 添加被拖动元素对象源。
 * @param {HTMLElement} elem 指定的可拖放对象源。
 */
DragDropable.prototype.addSource = function(elem){
	Event.addEventListener(elem, "mousedown", this._E.drag);
};

/**
 * {public}
 * 取消可拖动元素对象源。
 * @param {HTMLElement} elem 指定的可拖动源。
 */
DragDropable.prototype.removeSource = function(elem){
	Event.removeEventListener(elem, "mousedown", this._E.drag);
};

/**
 * {public}
 * 添加可被放下目标。
 * @param {HTMLElement} elem 指定的目标。被拖动源放至此目标时，会执行默认和自定义处理事件。
 */
DragDropable.prototype.addTarget = function(elem){
	Event.addEventListener(elem, "mouseover", this._E.mouseover);
	Event.addEventListener(elem, "mouseout", this._E.mouseout);
};

/**
 * {public}
 * 取消可被放下目标。
 * @param {HTMLElement} elem 指定的可放下目标。取消后，将取消执行先前注册的“放下”事件。
 */
DragDropable.prototype.removeTarget = function(elem){
	Event.removeEventListener(elem, "mouseover", this._E.mouseover);
	Event.removeEventListener(elem, "mouseout", this._E.mouseout);
};

/**
 * {protected}
 * 初始化将要被拖动的状态。
 * 此处需要继承并覆写：往移动者(this.mover)中写数据，参考演示代码。
 * @param {Event} evt 浏览器自动传入的事件对象，为了兼容多浏览器。
 */
DragDropable.prototype.drag = function(evt){
	if (this.dragable) return false;
	Event.stop(evt); // disable select text.
	this.dragable=true;
	Event.addEventListener(document, "mousemove", this._E.draging);
	Event.addEventListener(document, "mouseup", this._E.drop);
	return false;
};

/**
 * {protected}
 * 执行拖动过程。拖动层此时紧随鼠标指针移动。
 * @param {Object} evt 浏览器自动传入的事件对象，为了兼容多浏览器。
 */
DragDropable.prototype.draging = function(evt){
	if (!this.dragable) return false;
	evt=window.event||evt;
	Event.stop(evt); // disable select text.
	this.inDraging=true;
	return false;
};

/**
 * {protected}
 * 鼠标指针移入目标对象中自动执行此方法。事件在添加可“放下”目标(addTarget)方法中自动注册。
 * 如果需要改变移入时的样式等，请继承并扩充之，参考演示代码。
 */
DragDropable.prototype.mouseover = function(){
	if (!this.dragable || !this.inDraging) return false;
	this.dropable=true;
};

/**
 * {protected}
 * 鼠标指针移出目标对象中自动执行此方法。事件在添加可“放下”目标(addTarget)方法中自动注册。
 * 如果需要改变移入时的样式等，请继承并扩充之，参考演示代码。
 */
DragDropable.prototype.mouseout = function(){
	if (!this.dragable || !this.inDraging) return false;
	this.dropable=false;
};

/**
 * {protected}
 * 拖动对象被放下时执行此方法。
 * 要实现更多功能，请覆写此方法。参考演示代码。
 */
DragDropable.prototype.drop = function(){
	if (!this.dragable) return false;
	Event.removeEventListener(document, "mousemove", this._E.draging);
	Event.removeEventListener(document, "mouseup", this._E.drop);
	this.dragable=false;
	this.inDraging=false;
	return false;
};

/*]]>*/