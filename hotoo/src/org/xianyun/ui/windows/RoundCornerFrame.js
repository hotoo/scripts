/*<![CDATA[*/
/**
 * 圆角窗口。
 * @namespace org.xianyun
 * @extends {Object}
 * @constructor ?!
 * @param ?!
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version ?!
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
RoundCornerFrame = function(w, h){
	Window.call(this, w, h);
	this._bgc = "#ABC6EA"; // background color. (#99CCFF)
	this._clo = false; // closeable.
	this.mxa = false; // max able.
	this.mna = false;
};
RoundCornerFrame.prototype = new Frame(0,0);
RoundCornerFrame.prototype.constructor = RoundCornerFrame;

RoundCornerFrame.prototype._ini = function(){
	if (!this._w){
	Frame.prototype._ini.call(this);
	var r = "display:block;font-size:1px;overflow:hidden;height:1px;";
	this._hr1 = document.createElement("div"); this._hr1.style.cssText=r+"cursor:move;margin:0 5px;background-color:"+this._bgc+";"; this._hr1.innerHTML="&nbsp;"; // head round 1.
	this._hr2 = document.createElement("div"); this._hr2.style.cssText=r+"cursor:move;height:1px;border-left:5px solid "+this._bgc+";border-right:5px solid "+this._bgc+";background-color:"+this._bgc+";margin:0 3px;border-width:0 2px;"; this._hr2.innerHTML="&nbsp;";
	this._hr3 = document.createElement("div"); this._hr3.style.cssText=r+"cursor:move;height:1px;border-left:5px solid "+this._bgc+";border-right:5px solid "+this._bgc+";background-color:"+this._bgc+";margin:0 2px;"; this._hr3.innerHTML="&nbsp;";
	this._hr4 = document.createElement("div"); this._hr4.style.cssText=r+"cursor:move;border-left:5px solid "+this._bgc+";border-right:5px solid "+this._bgc+";background-color:"+this._bgc+";height:2px;margin:0 1px;"; this._hr4.innerHTML="&nbsp;";
	this._t.appendChild(this._hr1); this._t.appendChild(this._hr2);
	this._t.appendChild(this._hr3); this._t.appendChild(this._hr4);

	this.__t = document.createElement("div"); this.__t.style.cssText = "color:"+Color.alpha(this._bgc, 0x11)+";background-color:"+this._bgc+";text-indent:5px;cursor:move;";
	this._t.appendChild(this.__t);
	this.__b = document.createElement("div");
	this.__b.style.cssText = "overflow:visible;display:block;color:"+Color.alpha(Color.complement(this._bgc),0x99)+";background-color:"+Color.alpha(this._bgc, 0x33)+";border-left:4px solid "+this._bgc+";border-right:4px solid "+this._bgc+";height:100%;";
	this._b.appendChild(this.__b);
	this._fr1 = document.createElement("div"); this._fr1.style.cssText=r+"height:1px;margin:0 5px;background-color:"+this._bgc+";"; this._fr1.innerHTML="&nbsp;"; // head round 1.
	this._fr2 = document.createElement("div"); this._fr2.style.cssText=r+"height:1px;border-left:5px solid "+this._bgc+";border-right:5px solid "+this._bgc+";background-color:"+this._bgc+";margin:0 3px;border-width:0 2px;"; this._fr2.innerHTML="&nbsp;";
	this._fr3 = document.createElement("div"); this._fr3.style.cssText=r+"height:1px;border-left:5px solid "+this._bgc+";border-right:5px solid "+this._bgc+";background-color:"+this._bgc+";margin:0 2px;"; this._fr3.innerHTML="&nbsp;";
	this._fr4 = document.createElement("div"); this._fr4.style.cssText=r+"border-left:5px solid "+this._bgc+";border-right:5px solid "+this._bgc+";background-color:"+this._bgc+";height:2px;margin:0 1px;"; this._fr4.innerHTML="&nbsp;";
	this._f.appendChild(this._fr4); this._f.appendChild(this._fr3);
	this._f.appendChild(this._fr2); this._f.appendChild(this._fr1);

//	this._w.onlostfocus = Function.createDelegate(this, this.blur);
	UserDefinedEvent.addEventListener(this._w, "blur", Function.createDelegate(this, this.blur));
	}
	return this._w;
};
RoundCornerFrame.prototype.resetColor = function(c){
	this._hr1.style.backgroundColor = 
	this._hr2.style.backgroundColor = 
	this._hr3.style.backgroundColor = 
	this._hr4.style.backgroundColor = 
	this._fr1.style.backgroundColor = 
	this._fr2.style.backgroundColor = 
	this._fr3.style.backgroundColor = 
	this._fr4.style.backgroundColor = 
	this.__t.style.backgroundColor 	= c;
	this.__b.style.borderLeft 	= 
	this.__b.style.borderRight	= 
	this._hr2.style.borderLeft 	= 
	this._hr2.style.borderRight = 
	this._hr3.style.borderLeft 	= 
	this._hr3.style.borderRight = 
	this._hr4.style.borderLeft 	= 
	this._hr4.style.borderRight = 
	this._fr2.style.borderLeft 	= 
	this._fr2.style.borderRight = 
	this._fr3.style.borderLeft 	= 
	this._fr3.style.borderRight = 
	this._fr4.style.borderLeft 	= 
	this._fr4.style.borderRight = "5px solid "+c;
};
RoundCornerFrame.prototype.title = function(){
	this._ini();
	return this.__t;
};
RoundCornerFrame.prototype.body = function(){
	this._ini();
	return this.__b;
};
RoundCornerFrame.prototype.show = function(){
	Frame.prototype.show.call(this);
};
RoundCornerFrame.prototype.setColor = function(c){
	this._bgc = c; try{this.resetColor(c);}catch(e){}
};
RoundCornerFrame.prototype.focus = function(){
	//if (this._fsd) return;
	this._fsd = true;
	Frame.prototype.focus.call(this);
	this.resetColor(this._bgc);
};
RoundCornerFrame.prototype.blur = function(){
	//if (!this._fsd) return;
	this._fsd = false;
	this.resetColor(Color.alpha(this._bgc, 0x66));
};


/*]]>*/
