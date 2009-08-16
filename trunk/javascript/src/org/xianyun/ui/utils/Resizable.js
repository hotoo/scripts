/*<![CDATA[*/

/**
 * 可改变大小(宽度和高度)的HTML元素对象。
 * @param {HTMLElement} elem 指定的HTML对象。
 * @author 闲耘 (mail[AT]xianyun.org)
 * @version 2008/4/4
 */
var Resizable = function(er, sr, wr, nr){
	this._orig_body_cursor;
	this.sensitive = false; // 是否即时反应出调整大小后的状态，为false则在释放鼠标时调整大小。
	this._onresized = false; // 当前状态。
	
	this.e_resizing = er;
	this.s_resizing = sr;
	this.w_resizing = wr;
	this.n_resizing = nr;
	
	this._f_e_resized = Function.createDelegate(this, this.e_resized);
	this._f_s_resized = Function.createDelegate(this, this.s_resized);
	this._f_se_resized = Function.createDelegate(this, this.se_resized);
	this._f_w_resized = Function.createDelegate(this, this.w_resized);
	this._f_n_resized = Function.createDelegate(this, this.n_resized);
	this._f_nw_resized = Function.createDelegate(this, this.nw_resized);
	this._f_ne_resized = Function.createDelegate(this, this.ne_resized);
	this._f_sw_resized = Function.createDelegate(this, this.sw_resized);
};

Resizable.prototype.e_resize = function(){
	if (!this.e_resizing || this._onresized) {return false;}
	this._orig_body_cursor = (document.body||document.documentElement).style.cursor;
	(document.body||document.documentElement).style.cursor = "e-resize";
	Event.addEventListener(document, "mousemove", this.e_resizing);
	Event.addEventListener(document, "mouseup", this._f_e_resized);
	this._onresized = true;
	return false;
};
Resizable.prototype.e_resized = function(){
	if (!this.e_resizing || !this._onresized){return false;}
	(document.body||document.documentElement).style.cursor = this._orig_body_cursor;
	Event.removeEventListener(document, "mouseup", this._f_e_resized);
	Event.removeEventListener(document, "mousemove", this.e_resizing);
	this._onresized = false;
	return false;
};

Resizable.prototype.s_resize = function(){
	if (!this.s_resizing || this._onresized) {return false;}
	this._onresized = true;
	this._orig_body_cursor = (document.body||document.documentElement).style.cursor;
	(document.body||document.documentElement).style.cursor = "s-resize";
	Event.addEventListener(document, "mousemove", this.s_resizing);
	Event.addEventListener(document, "mouseup", this._f_s_resized);
	return false;
};
Resizable.prototype.s_resized = function(){
	if (!this.s_resizing || !this._onresized) return false;
	(document.body||document.documentElement).style.cursor = this._orig_body_cursor;
	Event.removeEventListener(document, "mouseup", this._f_s_resized);
	Event.removeEventListener(document, "mousemove", this.s_resizing);
	this._onresized = false;
	return false;
};

Resizable.prototype.se_resize = function(){
	if (!this.s_resizing || !this.s_resizing || this._onresized){return false;}
	var c = (document.body||document.documentElement).style.cursor;
	this.e_resize.apply(this, arguments);
	Event.removeEventListener(document, "mouseup", this._f_e_resized);
	this._onresized = false;
	this.s_resize.apply(this, arguments);
	Event.removeEventListener(document, "mouseup", this._f_s_resized);
	Event.addEventListener(document, "mouseup", this._f_se_resized);
	this._orig_body_cursor = c;
	(document.body||document.documentElement).style.cursor = "se-resize";
	return false;
};
Resizable.prototype.se_resized = function(){
	if (!this.s_resizing || !this.s_resizing || !this._onresized){return false;}
	this.e_resized.apply(this, arguments);
	this._onresized = true;
	this.s_resized.apply(this, arguments);
	(document.body||document.documentElement).style.cursor = this._orig_body_cursor;
	this._onresized = false;
	return false;
};

Resizable.prototype.w_resize = function(){
	if (!this.w_resizing || this._onresized) {return false;}
	this._onresized = true;
	this._orig_body_cursor = (document.body||document.documentElement).style.cursor;
	(document.body||document.documentElement).style.cursor = "w-resize";
	Event.addEventListener(document, "mousemove", this.w_resizing);
	Event.addEventListener(document, "mouseup", this._f_w_resized);
	return false;
};
Resizable.prototype.w_resized = function(){
	if (!this.w_resizing || !this._onresized){return false;}
	(document.body||document.documentElement).style.cursor = this._orig_body_cursor;
	Event.removeEventListener(document, "mouseup", this._f_w_resized);
	Event.removeEventListener(document, "mousemove", this.w_resizing);
	this._onresized = false;
	return false;
};

Resizable.prototype.n_resize = function(){
	if (!this.n_resizing || this._onresized) {return false;}
	this._onresized = true;
	this._orig_body_cursor = (document.body||document.documentElement).style.cursor;
	(document.body||document.documentElement).style.cursor = "n-resize";
	Event.addEventListener(document, "mousemove", this.n_resizing);
	Event.addEventListener(document, "mouseup", this._f_n_resized);
	return false;
};
Resizable.prototype.n_resized = function(){
	if (!this.n_resizing || !this._onresized){return false;}
	(document.body||document.documentElement).style.cursor = this._orig_body_cursor;
	Event.removeEventListener(document, "mouseup", this._f_n_resized);
	Event.removeEventListener(document, "mousemove", this.n_resizing);
	this._onresized = false;
	return false;
};

Resizable.prototype.nw_resize = function(){
	if (!this.n_resizing || !this.w_resizing || this._onresized){return false;}
	var c = (document.body||document.documentElement).style.cursor;
	this.n_resize.apply(this, arguments);
	Event.removeEventListener(document, "mouseup", this._f_n_resized);
	this._onresized = false;
	this.w_resize.apply(this, arguments);
	Event.removeEventListener(document, "mouseup", this._f_w_resized);
	Event.addEventListener(document, "mouseup", this._f_nw_resized);
	this._orig_body_cursor = c;
	(document.body||document.documentElement).style.cursor = "nw-resize";
	return false;
};
Resizable.prototype.nw_resized = function(){
	if (!this.n_resizing || !this.w_resizing || !this._onresized){return false;}
	this.n_resized.apply(this, arguments);
	this._onresized = true;
	this.w_resized.apply(this, arguments);
	(document.body||document.documentElement).style.cursor = this._orig_body_cursor;
	Event.removeEventListener(document, "mouseup", this._f_nw_resized);
	this._onresized = false;
	return false;
};

Resizable.prototype.ne_resize = function(){
	if (!this.n_resizing || !this.e_resizing || this._onresized){return false;}
	var c = (document.body||document.documentElement).style.cursor;
	this.n_resize.apply(this, arguments);
	Event.removeEventListener(document, "mouseup", this._f_n_resized);
	this._onresized = false;
	this.e_resize.apply(this, arguments);
	Event.removeEventListener(document, "mouseup", this._f_e_resized);
	Event.addEventListener(document, "mouseup", this._f_ne_resized);
	this._orig_body_cursor = c;
	(document.body||document.documentElement).style.cursor = "ne-resize";
	return false;
};
Resizable.prototype.ne_resized = function(){
	if (!this.n_resizing || !this.e_resizing || !this._onresized){return false;}
	this.n_resized.apply(this, arguments);
	this._onresized = true;
	this.e_resized.apply(this, arguments);
	(document.body||document.documentElement).style.cursor = this._orig_body_cursor;
	Event.removeEventListener(document, "mouseup", this._f_ne_resized);
	this._onresized = false;
	return false;
};

Resizable.prototype.sw_resize = function(){
	if (!this.s_resizing || !this.w_resizing || this._onresized){return false;}
	var c = (document.body||document.documentElement).style.cursor;
	this.s_resize.apply(this, arguments);
	Event.removeEventListener(document, "mouseup", this._f_s_resized);
	this._onresized = false;
	this.w_resize.apply(this, arguments);
	Event.removeEventListener(document, "mouseup", this._f_w_resized);
	Event.addEventListener(document, "mouseup", this._f_sw_resized);
	this._orig_body_cursor = c;
	(document.body||document.documentElement).style.cursor = "sw-resize";
	return false;
};
Resizable.prototype.sw_resized = function(){
	if (!this.s_resizing || !this.w_resizing || !this._onresized){return false;}
	this.s_resized.apply(this, arguments);
	this._onresized = true;
	this.w_resized.apply(this, arguments);
	(document.body||document.documentElement).style.cursor = this._orig_body_cursor;
	Event.removeEventListener(document, "mouseup", this._f_sw_resized);
	this._onresized = false;
	return false;
};

/*]]>*/