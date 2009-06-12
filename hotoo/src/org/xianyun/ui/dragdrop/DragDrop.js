/*<![CDATA[*/

/**
 * {public}
 * 可拖动和放下(拖放)对象，允许设置多个拖动源和多个放置目标。
 * @namespace org.xianyun.ui.dragdrop;
 * @constructor new DragDrop();
 * @extends org.xianyun.ui.utils.DragDropable
 * @since IE5.0+, Firefox1.0+, Opera8.0+
 * 
 * @author 闲耘 (xianyun.org, hotoo.cn[AT]gmail.com)
 * @version 2007/11/03
 */

var DragDrop = function(){
	DragDropable.call(this);
	if (!DragDrop.mover){
	var _layer = document.createElement("div"); // 拖动时跟随鼠标移动到层。
	_layer.style.display="none";
	document.body.appendChild(_layer);
	DragDrop.mover = new Moveable(_layer);
	}
	this.mover=DragDrop.mover;
	this.source = null; // {public} 被拖动的对象源。
};
DragDrop.prototype = new DragDropable();
DragDrop.mover = null;
DragDrop.prototype.drag = function(evt){
	DragDropable.prototype.drag.call(this, evt);
	this.source = Event.element(evt);
	this.mover.getElement().style.backgroundColor="#FFFFDE";
	this.mover.getElement().style.border="1px solid #FEF3C0";
	this.mover.getElement().innerHTML="<img src='undropable.png' />"+this.source.innerHTML;
};
DragDrop.prototype.mouseover = function(evt){
	DragDropable.prototype.mouseover.call(this, evt);
	if (this.dragable && this.inDraging){
		this.mover.getElement().innerHTML = "<img src='dropable.png' />"+this.source.innerHTML;
		this.mover.getElement().style.backgroundColor="#D6E9FC";
		this.mover.getElement().style.border="1px solid #8EC2F5";
	}
	evt=window.event||evt;
	var ele=Event.element(evt);
	//if (this.dragable)
	//	ele.style.backgroundColor="#FCFC8A";
};
DragDrop.prototype.mouseout = function(evt){
	DragDropable.prototype.mouseout.call(this, evt);
	if (this.dragable && this.inDraging)
		this.mover.getElement().innerHTML = "<img src='undropable.png' />"+this.source.innerHTML;
	this.mover.getElement().style.backgroundColor="#FFFFDE";
	this.mover.getElement().style.border="1px solid #FEF3C0";
	evt=window.event||evt;
	var ele=Event.element(evt);
//	ele.style.backgroundColor="";
};
DragDrop.prototype.draging = function(evt){
	DragDropable.prototype.draging.call(this, evt);
	if (!this.dragable)return false;
	this.mover.getElement().style.display="";
	this.mover.moveTo(Event.pointerX(evt)+13, Event.pointerY(evt)+18); // 加值使浮动层紧随鼠标指针右下角。
	document.body.style.cursor = "move";
};
DragDrop.prototype.drop = function(evt){
	if (this.dragable && this.dropable){
		this.droped(evt);
		this.mouseout(evt);
	}
	DragDropable.prototype.drop.call(this);
	this.source = null;
	this.mover.getElement().style.display="none";
	document.body.style.cursor = "";
};
/**
 * {protected}
 * 拖放至可放下目标对象时，执行此用户自定义事件，请自行实现。下面是一个简单的实现示例。
 * @param {Object} evt 浏览器自动传入的事件对象，为了兼容多浏览器。
 */
/*
DragDrop.prototype.droped = function(evt){
	if (!this.dragable || !this.dropable)return false;
	evt=window.event||evt;
	var ele=Event.element(evt);
	ele.innerHTML = this.source.innerHTML;
	return false;
};
*/
/*]]>*/