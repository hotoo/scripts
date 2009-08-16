/*<![CDATA[*/
/**
 * 当文本框内容为空时自动显示提示信息(占位符文本placeholder)
 * @namespace org.xianyun.ui.inputter;
 * @extends {Object}
 * @constructor new TextInput(e);
 * @param {HTMLElement} e 指定的Input, TextArea等输入框控件。
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/3/28
 * @example new TextInput($("inputTest"));
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var TextInput = function(e){
	this._e = e;
	this._t = this._e.placeholder||this._e.getAttribute("placeholder")||this._e.title||this._e.getAttribute("title")||""; // default value, tips.
	if (!this._e.defaultValue){
		this._e.value = this._t;
		this._e.style.color = "#ccc";
	}
	this._dv=this._e.defaultValue;
//	this._e.title="";
	this._fos = Function.createDelegate(this, this.focus);
	this._blr = Function.createDelegate(this, this.blur);
	this._e.onfocus = this._fos;
};
/**
 * 输入框获焦时自动调用此方法。
 * @ignore
 */
TextInput.prototype.focus = function(){
	this._e.onblur = this._blr;
	this._e.onfocus=null; this._e.removeAttribute("onfocus"); // delete this._e.onfocus;
	alert(this._e.style.color);
	if (this._e.value===this._t && this._e.style.color==="#ccc"){
		this._e.value = "";
	}
	this._e.style.color = "#000";
};
/**
 * 输入框失去焦点时自动调用此函数。
 * @ignore
 */
TextInput.prototype.blur = function(){
	this._e.onfocus = this._fos;
	this._e.onblur=null; this._e.removeAttribute("onblur"); // delete this._e.onblur;
	if (this._e.value=="" && this._e.style.color==="#000"){
		this._e.value = this._t;
		this._e.style.color = "#ccc";
	}
};
/**
 * @return {String} 返回输入框的文本值。
 */
TextInput.prototype.value=function(){
	return this._e.style.color=="#000"?this._e.value:"";
//	if(this._e.style.color=="#000")return this._e.value;
//	else return this._e.defaultValue;
};
/**
 * 将创建出来的对象以XML DOM的形式返回。
 * @return {HTMLElement}
 * @ignore 未实现完全。
 */
TextInput.prototype.valueOf=function(){
	if (!this._e){
		this._e = document.createElement("div");
		this._dv = this._e.title||""; // default value, tips.
		this._e.value = this._dv;
		this._e.style.color="#ccc";
		this._e.title="";
		this._fos = Function.createDelegate(this, this.focus);
		this._blr = Function.createDelegate(this, this.blur);
		this._e.onfocus=this._fos;
	}
	return this._e;
};

/*]]>*/
