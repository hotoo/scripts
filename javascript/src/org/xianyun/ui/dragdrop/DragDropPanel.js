/*<![CDATA[*/

/**
 * {public}
 * 可拖动和放下(拖放)对象，允许设置多个拖动源和多个放置目标。
 * @namespace org.xianyun.ui.dragdrop;
 * @constructor new DragDropPanel();
 * @extends org.xianyun.ui.utils.DragDropable
 * @since IE5.0+, Firefox1.0+, Opera8.0+
 * 
 * @author 闲耘 (xianyun.org, hotoo.cn[AT]gmail.com)
 * @version 2007/11/03
 */

var DragDropPanel = function(){
	DragDropable.call(this);
	this.inserter = document.createElement("hr"); // 拖动时跟随鼠标移动到层。
	this.inserter.style.cssText="display:none;height:1px:font-size:1px;color:#ff0000;";
	//this.inserter.style.display="none";
	//this.inserter.style.height="1px";
	//this.inserter.style.color="#f00";
	document.body.appendChild(this.inserter);
	this.source = null; // {public} 被拖动的对象源。
};
DragDropPanel.prototype = new DragDropable();
DragDropPanel.prototype.drag = function(evt){
	DragDropable.prototype.drag.call(this, evt);
	this.source = Event.element(evt);
};
DragDropPanel.prototype.mouseover = function(evt){
	DragDropable.prototype.mouseover.call(this, evt);
	//if (this.dragable && this.draging)
	//	;
	evt=window.event||evt;
	var ele=Event.element(evt);
	if (this.dragable){
		ele.parentNode.insertBefore(this.inserter, ele);
		this.inserter.style.display="";
	}
};
DragDropPanel.prototype.mouseout = function(evt){
	DragDropable.prototype.mouseout.call(this, evt);
	//if (this.dragable && this.draging)
	evt=window.event||evt;
	var ele=Event.element(evt);
	//ele.parentNode.insertBefore(ele, this.inserter);
	this.inserter.style.display="none";
};
DragDropPanel.prototype.draging = function(evt){
	DragDropable.prototype.draging.call(this, evt);
	if (!this.dragable)return false;
	//this.inserter.style.display="";
};
DragDropPanel.prototype.drop = function(evt){
	if (this.dragable && this.dropable){
		this.droped(evt);
		this.mouseout(evt);
	}
	DragDropable.prototype.drop.call(this);
	this.source = null;
	this.inserter.style.display="none";
};
/**
 * {protected}
 * 拖放至可放下目标对象时，执行此用户自定义事件，请自行实现。下面是一个简单的实现示例。
 * @param {Object} evt 浏览器自动传入的事件对象，为了兼容多浏览器。
 */
DragDropPanel.prototype.droped = function(evt){
	if (!this.dragable || !this.dropable)return false;
	evt=window.event||evt;
	var ele=Event.element(evt);
	//ele.innerHTML = this.source.innerHTML;
	ele.parentNode.insertBefore(this.source, ele);
	return false;
};
/*]]>*/