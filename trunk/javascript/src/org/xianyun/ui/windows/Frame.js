/*<![CDATA[*/
/**
 * 
 * @namespace org.xianyun.ui.windows;
 * @extends {Window}
 * @constructor new Frame();
 * @param 
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/3/25
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var Frame = function(){
	Window.apply(this, arguments);
	this._t; this._b; this._bo; this._f; // div, over the iframe on hide body at drag.
	this._mxd = false; // is maxed.
	this._mind = false; // min-ed.
	this._op; // old position.
	this._os; // old scroll bar style.
	this._ost; // olk scroll top.
};
Frame.prototype = new Window();
Frame.prototype.constructor = Frame;

Frame.prototype._ini = function(){
	Window.prototype._ini.call(this);
	if (!this._t){
		var b = this._b;
		this._t = document.createElement("div");
		this._t.style.height = "23px";
		this._t.style.cursor = "move";
		this._bo = document.createElement("div");
		this._b = document.createElement("div");
		this._b.style.cssText = "overflow:hidden;width:100%;height:100%;";
		this._f = document.createElement("div");
		this._f.style.cssText = "width:100%;height:5px;padding:0px;margin:0px;";
		this._bo.style.height = this._hi-parseInt(this._t.style.height)-parseInt(this._f.style.height)+"px";
		
		b.appendChild(this._t);
		this._bo.appendChild(this._b);
		b.appendChild(this._bo);
		b.appendChild(this._f);
		Event.addEventListener(this._t, "dblclick", Function.createDelegate(this, this.swich));
		this._dg = new Dragable(this._w, this._t);
	}
	return this._w;
};
Frame.prototype.title = function(){
	this._ini();
	return this._t;
};
Frame.prototype.body = function(){
	this._ini();
	return this._b;
};
Frame.prototype.foot = function(){
	this._ini();
	return this._f;
};
Frame.prototype.resizeTo = function(w, h){
	Window.prototype.resizeTo.call(this, w, h);
	this._bo.style.height = h - parseInt(this._t.style.height)-parseInt(this._f.style.height)+"px";
};
Frame.prototype.max = function(){
	this._ost = document.body.scrollTop||document.documentElement.scrollTop;
	window.scrollTo(0, 0);
	try {
//	this._os = document.body.style.overflow;
	this._os = document.documentElement.style.overflow;//alert(this._os);
	document.documentElement.style.overflow = "hidden";
	}catch(e){}
	this.resizeTo(Browser.width(), Browser.height());
	this._op = [parseInt(this._w.style.left),parseInt(this._w.style.top)];
	this.moveTo(0, 0);
	this._dg.disable(true);
	this._t.style.cursor = "default";
	this._mxd = true;
};
Frame.prototype.maxRevert = function(){
	try {
	//document.body.style.overflow = "auto";
	document.documentElement.style.overflow = "scroll";//this._os;
	}catch(e){}
	window.scrollTo(0, this._ost);
	this.resizeTo(this._wi, this._hi);
	this.moveTo(this._op[0], this._op[1]);
	this._dg.disable(false);
	this._t.style.cursor = "move";
	this._mxd = false;
};
Frame.prototype.minRevert = function(){
	this.resizeTo(this._wi, this._hi);
	this.moveTo(this._op[0], this._op[1]);
	window.scrollTo(0, this._ost);
	if (Browser.isIE || Browser.isOpera){
		Event.removeEventListener(window, "scroll", this._slobd);
	} else {
		this._w.style.position = "position";
	}
	this._t.style.display = "block";
	this._b.style.display = "block";
	this._f.style.display = "block";
	this._mind = false;
};
Frame.prototype.min = function(){
	this._op = [parseInt(this._w.style.left),parseInt(this._w.style.top)];
	this._ost = document.documentElement.scrollTop||document.body.scrollTop||0;
	this._t.style.display = "none";
	this._b.style.display = "none";
	this._f.style.display = "none";
	this._w.style.left = "0px";
	this._w.style.top = (Browser.height()-20+document.documentElement.scrollTop||document.body.scrollTop||0)+"px";
	this._w.style.height = "20px";
	this._w.style.width = "150px";
	if (Browser.isIE || Browser.isOpera){
		if (!this._slobd) this._slobd = Function.createDelegate(this, function(){ // on scroll body
			this._w.style.top = (Browser.height()-20+document.documentElement.scrollTop||document.body.scrollTop||0)+"px";
		});
		Event.addEventListener(window, "scroll", this._slobd);
	} else {
		this._w.style.position = "fixed";
	}
	this._mind = true;
};
Frame.prototype.swich = function(){
	if (this._mxd) this.maxRevert();
	else if (this._mind) this.minRevert();
	else this.max();
};
Frame.prototype.close = function(){
	this._w.style.display = "none";
};
Frame.prototype.drag = function(e){
	if (this._mxd) return;
};
Frame.prototype.dragging = function(e){
	if (!this.dragable)return;
	this._b.style.visibility = "hidden";
};
Frame.prototype.drop = function(e){
	if (this._mxd) return;
	this._b.style.visibility = "visible"
};

/*]]>*/
