/*<![CDATA[*/

/**
 * 浮动窗口对象。
 * @constructor new Window();
 * @namespace org.xianyun.ui.windows;
 * @extends org.xianyun.ui.utils.Dragable;
 * @author 闲耘 (xianyun.org, hotoo.cn[AT]gmail.com)
 * @create 2007/10/31
 */
var Window = function(w, h){
	this._w; this._b; this._ov;
	this._x=0; this._y=0; this._wi=w||400; this._hi=h||300;
	this._cl; // originality color.
	this._fsd = false; // focused.
	this._evt = null; // user defined event listener.
	this._maxable=this._minable=false;
	this.maxed=this.mined=false;
};
/**
 * 
 */
Window.prototype._ini = function(){
	if (!this._w){
		this._w = document.createElement("div");
		this._w.style.cssText= "display:none;background-color:#fff;";
		this._w.style.cssText = "width:"+this._wi+"px;height:"+this._hi+"px;left:"+this._x+"px;top:"+this._y+"px";
		Event.addEventListener(this._w, "mousedown", Function.createDelegate(this, this.focus));
		
        if (Browser.isIE){
        this._ov = document.createElement('iframe');
        this._ov.style.position = 'absolute'; this._ov.style.zIndex = -1;
		this._ov.style.top = "0px"; this._ov.style.left = "0px";
		this._ov.style.width = '100%'; this._ov.style.height = this._hi+"px";//'100%';
		this._ov.setAttribute('marginWidth', 0); this._ov.setAttribute('marginHeight', 0);
		this._ov.setAttribute('frameBorder', 0); this._ov.allowTransparency=false;
        this._w.appendChild(this._ov);
        }
		
		this._b = document.createElement("div");
		this._b.style.cssText = "background-color:#fff;overflow-x:hidden;width:"+this._wi+"px;height:"+this._hi+"px;";
		this._w.appendChild(this._b);
	}
	return this._w;
};
Window.prototype.valueOf = function(){
	return this._ini();
};

Window.prototype.getEvent = function(){
	if (!this._evt) this._evt = new EventListener();
	return this._evt;
};

Window.prototype.addEventListener = function(e, h){
	UserDefinedEvent.addEventListener(this._w, e, h)
};
Window.prototype.removeEventListener = function(e, h){
	UserDefinedEvent.removeEventListener(this._w, e, h);
};

Window.prototype.show = function(){
	this.focus();
	this._w.style.display = "";
};
Window.prototype.hide = function(){
	this._w.style.display = "none";
};

Window.prototype.focus = function(e){
//	if (this._fsd) return;
	this._fsd = true;
	if (CascadeManager.topsideElement===this._w) return;
	CascadeManager.setTopside(this._w);
};

Window.prototype.moveTo = function(x, y){
	this._w.style.left = x+"px";
	this._w.style.top = y+"px";
	this._x=x; this._y=y;
};
Window.prototype.moveBy = function(h, v){
	this.moveTo(parseInt(this._w.style.left)+h, parseInt(this._w.style.top)+v);
};

/**
 * 将窗口大小调整到指定的大小。
 * @param {Number} w 窗口的宽度(width)。
 * @param {Number} h 窗口的高度(height)。
 */
Window.prototype.resizeTo = function(w, h){
	this._w.style.width =
	this._b.style.width = w+"px";
	this._w.style.height =
	this._b.style.heiht = h+"px";
	if (this._ov){
	this._ov.style.width = w+"px";
	this._ov.style.height = h+"px";
	}
	this._wi=w; this._hi=h;
};

/**
 * 以窗口当前尺寸为基准，调整窗口的大小。
 * @param {Number} h 水平方向的分量(horizontal)，单位：像素(px)。
 * @param {Number} v 垂直方向的分量(vertical)，单位：像素(px)。
 */
Window.prototype.resizeBy = function(h, v){
	this.resizeTo(parseInt(this._w.style.width)+x, parseInt(this._w.style.height)+y);
};

Window.prototype.max = function(){
	this._ost = (document.documentElement||document.body).scrollTop;
	window.scrollTo(0, 0);
	var d=(document.documentElement||document.body).style;
	this._os = d.overflow;
	d.overflow = "hidden";
	var w=this._wi, h=this._hi, x=parseInt(this._w.style.left), y=parseInt(this._w.style.top); //x=this._x, y=this._y;
	this.resizeTo(Browser.width(), Browser.height());
	this.moveTo(0, 0);
	this._wi=w; this._hi=h; this._x=x; this._y=y; // 最大化时不改变窗口的原始大小和位置。
	if(!this._f_maxRestore){this._f_maxRestore=Function.createDelegate(this, this._evt_maxRestore);}
	Event.addEventListener(document, "keydown", this._f_maxRestore);
	if(!this._f_win_max){this._f_win_max=Function.createDelegate(this, this._win_max);}
	Event.addEventListener(window, "resize", this._f_win_max);
	this.maxed = true;
};
Window.prototype._win_max = function(){
	var w=this._wi, h=this._hi;
	this.resizeTo(Browser.width(), Browser.height());
	this._wi=w; this._hi=h;// 最大化时不改变窗口的原始大小。
};
Window.prototype._evt_maxRestore = function(ev){
	var c = Event.keyCode(ev=window.event||ev);
	var e = Event.element(ev);
	if(c===Event.KEY_ESC){
		var b=(e.tagName==="INPUT"||e.tagName==="TEXTAREA");
		if(!b || !e.value){this._maxRestore();Event.stop(ev);}
	}
};
Window.prototype._maxRestore = function(){
	var d=(document.documentElement||document.body).style.overflow = this._os;//"scroll"
	window.scrollTo(0, this._ost);
	this.resizeTo(this._wi, this._hi);
	this.moveTo(this._x, this._y);
	Event.removeEventListener(document, "keydown", this._f_maxRestore);
	Event.removeEventListener(window, "resize", this._f_win_max);
	this.maxed = false;
};
Window.prototype.min = function(){
	var w=this._wi, h=this._hi;
	this.resizeTo(0,0);
	this._wi=w; this._hi=h;
	this._w.style.display="none";
	this.mined = true;
};
Window.prototype._minRestore = function(){
	this._w.style.display="block";
	this.resizeTo(this._wi, this._hi);
	this.mined = false;
};
Window.prototype.restore = function(){
	if (this.maxed){
		this._maxRestore();
	} else if (this.mined){
		this._minRestore();
	}
};
/*]]>*/