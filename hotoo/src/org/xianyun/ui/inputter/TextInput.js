/*<![CDATA[*/
/**
 * 当文本框内容为空时自动显示提示信息(占位符文本placeholder)
 * @namespace org.xianyun.ui.inputter;
 * @extends {Object}
 * @constructor new TextInput(e);
 * @param {HTMLElement} e 指定的Input, TextArea等输入框控件。
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/3/28
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var TextInput = function(e){
	this._e = e;
	this._t = this._e.placeholder||this._e.title||""; // default value, tips.
	if (!this._e.defaultValue){
		this._e.value = this._t;
		this._e.className = "TextInputOff";
	}
	this._dv=this._e.defaultValue;
//	this._e.title="";
	this._fos = Function.createDelegate(this, this.focus);
	this._blr = Function.createDelegate(this, this.blur);
	Event.addEventListener(this._e, "focus", this._fos);
};
/**
 * 输入框获焦时自动调用此方法。
 * @ignore
 */
TextInput.prototype.focus = function(){
	Event.addEventListener(this._e, "blur", this._blr);
	Event.removeEventListener(this._e, "focus", this._fos);
	if (this._e.value===this._t && this._e.className==="TextInputOff"){
		this._e.value = "";
	}
	this._e.className = "TextInputOn";
};
/**
 * 输入框失去焦点时自动调用此函数。
 * @ignore
 */
TextInput.prototype.blur = function(){
	Event.addEventListener(this._e, "focus", this._fos);
	Event.removeEventListener(this._e, "blur", this._blr);
	if (this._e.value=="" && this._e.className==="TextInputOn"){
		this._e.value = this._t;
		this._e.className = "TextInputOff";
	}
};
/**
 * @return {String} 返回输入框的文本值。
 */
TextInput.prototype.value=function(){
	if(this._e.className="TextInputOn")return this._e.value;
	else return this._e.defaultValue;
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
		this._e.className = "TextInputOff";
		this._e.title="";
		this._fos = Function.createDelegate(this, this.focus);
		this._blr = Function.createDelegate(this, this.blur);
		Event.addEventListener(this._e, "focus", this._fos);
	}
	return this._e;
};

/*]]>*/
