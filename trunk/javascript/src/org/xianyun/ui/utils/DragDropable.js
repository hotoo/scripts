/*<![CDATA[*/
/**
 * 拖放管理器。
 * @namespace org.xianyun
 * @extends {Object}
 * @constructor new DragDropable(draggingHandler);
 * @param {Function} f 拖放过程处理。
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/4/12
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var DragDropable = function(f){
	/**
	 * @public
	 */
	this.sensitive = true; // 是否即时反应出拖放后的状态，为false则在释放鼠标时调整位置。
	this.disable = false; // 动态改变可拖放状态。
	/**
	 * @private
	 */
	this._dragging = f; // 拖放过程处理函数。
	this._orig_body_cursor; // 文档原始指针样式。
	this._onDraged = false; // 当前是否处于拖放状态。
	this._f_drop = Function.createDelegate(this, this.drop);
};
DragDropable.prototype.drag = function(e){
	this._orig_body_cursor = (document.body||document.documentElement).style.cursor;
	(document.body||document.documentElement).style.cursor = "move";
	if(this._dragging){Event.addEventListener(document, "mousemove", this._dragging);}
	Event.addEventListener(document, "mouseup", this._f_drop);
	this._onDraged = true;
};
DragDropable.prototype.drop = function(){
	if(this.disable || !this._dragging){return false;}
	(document.body||document.documentElement).style.cursor = this._orig_body_cursor;
	if(this._dragging){Event.removeEventListener(document, "mousemove", this._dragging);}
	Event.removeEventListener(document, "mouseup", this._f_drop);
};

/*]]>*/
