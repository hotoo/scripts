/*<![CDATA[*/
/**
 * IP输入框子框。
 * @namespace org.xianyun.ui.inputter
 * @constructor new IPInputItem(prev, curr, next);
 * @extends {Object}
 * @param {HTMLElement} prev 上一个输入框。
 * @param {HTMLElement} curr 当前输入子框。
 * @param {HTMLElement} next 下一个子框。
 * @version 2008/3/11
 * @author 闲耘(mail[AT]xianyun.org)
 */
var IPInputItem = function(prev, curr, next){
	this.element = curr;
	curr.instance = this;
	this.element.style.imeMode = "disabled"; // 关闭输入法，支持IE。
	this.prev = prev;
	this.next = next;
};
IPInputItem.prototype.setValue = function(val){
	if (!val.isNumber() || val<0 || val>255)
		throw new ArgumentException("期望一个0 - 255之间的数值。");
	this.element.value = val;
};
/**
 * 将IP子输入框中的值转为字符串。
 * @return {String} 返回当前子框中的字符串。
 */
IPInputItem.prototype.toString = function(){
	return this.element.value;
};
/**
 * 将IP子输入框中的值转为数值。
 * @return {Number} 返回当前子框中的数值。
 */
IPInputItem.prototype.valueOf = function(){
	return parseInt(this.element.value)||0;
};

/**
 * IP输入框对象。
 * @namespace org.xianyun.ui.inputter
 * @constructor new IPInput(ip0,ip1,ip2,ip3);
 * @extends {Object}
 * @param {HTMLElement} ip0 第一个输入框，一般为单行文本框。
 * @param {HTMLElement} ip1 第二个输入框，一般为单行文本框。
 * @param {HTMLElement} ip2 第三个输入框，一般为单行文本框。
 * @param {HTMLElement} ip3 第四个输入框，一般为单行文本框。
 * @since IE6.0, Firefox1.0, Opera8.0, Safari3.0, Netscape8.0
 * @version 2008/3/11
 * @author 闲耘(mail[AT]xianyun.org)
 */
var IPInput = function(ip0, ip1, ip2, ip3){
	this._ipt0 = new IPInputItem(null, ip0, ip1); //@TODO 如果以数组方式实现，则可以抛弃IPInputItem类，而直接判断子输入框的索引值。
	this._ipt1 = new IPInputItem(ip0, ip1, ip2);
	this._ipt2 = new IPInputItem(ip1, ip2, ip3);
	this._ipt3 = new IPInputItem(ip2, ip3, null);

	this._vk = Function.createDelegate(this, this._verifyKey);
	this._vv = Function.createDelegate(this, this._verifyValue);
	Event.addEventListener(this._ipt0.element, "keydown", this._vk);
	Event.addEventListener(this._ipt1.element, "keydown", this._vk);
	Event.addEventListener(this._ipt2.element, "keydown", this._vk);
	Event.addEventListener(this._ipt3.element, "keydown", this._vk);
	Event.addEventListener(this._ipt0.element, "keyup", this._vv);
	Event.addEventListener(this._ipt1.element, "keyup", this._vv);
	Event.addEventListener(this._ipt2.element, "keyup", this._vv);
	Event.addEventListener(this._ipt3.element, "keyup", this._vv);
};
/**
 * 获焦到上一个子输入框。
 * @param {Event} evt 触发事件。
 * @ignore 有待修改。
 */
IPInput.prototype._focusPrev = function(evt){
	var curr = Event.element(evt);
	if (curr.instance && curr.instance.prev){
		curr.instance.prev.focus();
		curr.instance.prev.select();
		Event.stop(evt);
	}
};
/**
 * 获焦到下一个子输入框。
 * @param {Event} evt 触发事件。
 * @ignore 有待修改。
 */
IPInput.prototype._focusNext = function(evt){
	var curr = Event.element(evt);
	if (curr.instance && curr.instance.next){
		curr.instance.next.focus();
		curr.instance.next.select();
		Event.stop(evt);
	}
};
/**
 * 验证子输入框中的值。
 * @param {Event} evt 按键事件。
 * @ignore
 */
IPInput.prototype._verifyValue = function(evt){
	evt = window.event||evt;
	var src = Event.element(evt);//alert(src.value);
	var kc = parseInt(evt.keyCode);
	var i = parseInt(src.value);
	if (i>255){
		src.value=255;
		src.select();
		Event.stop(evt);
		return;
	}
	if (KEY.isNumber(kc) && src.value.length>=3){
		this._focusNext(evt);
	}
};
/**
 * 验证子输入框中的按键。
 * @param {Event} evt 按键事件。
 * @ignore
 */
IPInput.prototype._verifyKey = function(evt){
	evt = window.event||evt;
	var src = Event.element(evt);
	var kc = parseInt(evt.keyCode);
	var i = Caret.indexOf(src);
	switch (kc){
	case KEY.TAB:
		if (evt.shiftKey){
			this._focusPrev(evt);
		} else {
		    this._focusNext(evt);
		}
		break;
	case KEY.BACKSPACE:
		if (i===0)
			this._focusPrev(evt);
		break;
	case KEY.LEFT:
		if (i===0)
			this._focusPrev(evt);
		break;
	case KEY.RIGHT:
		if (i===src.value.length)
			this._focusNext(evt);
		break;
	case KEY.UP:
		this._focusPrev(evt);
		break;
	case KEY.DOWN:
		this._focusNext(evt);
		break;
	default:
		if (!KEY.isNumber(kc)){
			Event.stop(evt);
		}
		break;
	}
}
/**
 * 将整个IP输入框中IP值以文本方式(*.*.*.*)返回。
 * @return {String}
 */
IPInput.prototype.toString = function(){
	return this._ipt0.valueOf()+"."+this._ipt1.valueOf()+"."+
		this._ipt2.valueOf()+"."+this._ipt3.valueOf();
};
/**
 * 返回整个IP输入框中的(ip)值。
 * @return {String}
 */
IPInput.prototype.valueOf = function(){
	return this.toString();
};
/**
 * 为IP输入框设置指定的IP地址。
 * @param {String} val 类似"0.0.0.0"这样的字符串。
 */
IPInput.prototype.setValue = function(val){
	if (!val.isString()) throw new ArgumentException("期望一个字符串参数。");
	var v = val.split(".");
	if (v.length!==4) throw new ArgumentException('期望类似"0.0.0.0"这样的参数。');
	this._ipt0.setValue(parseInt(v[0]));
	this._ipt1.setValue(parseInt(v[1]));
	this._ipt2.setValue(parseInt(v[2]));
	this._ipt3.setValue(parseInt(v[3]));
};
/*]]>*/