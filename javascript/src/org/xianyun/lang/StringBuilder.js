/*<![CDATA[*/
/**
 * 字符串构建器，辅助构建大型字符串，主要用于大型字符串拼接。
 * 需要使用插入，删除等复杂操作，请使用StringBuffer类。
 * @namespace org.xianyun.lang;
 * @extends {Object}
 * @constructor new StringBuilder();
 * @param {String} s 带字符串参数初始化，可选。
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/3/14, 2008/7/26
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */

var StringBuilder = function(s){
	this._v=[];
	if (arguments.length==0){
		this._t=""; // text.
	}else if(arguments.length==1){
		this._t = s.toString();
	}else{
		this._t = Array.prototype.join.apply(arguments,""); // [].join.apply(...);
	}
	this._v[0] = this._t;
	this._c = false; // changed, boolean.
	/**
	 * @type {Number} length
	 */
	this.length=s.length;
	
};
StringBuilder.prototype.append=function(s){
	s = s.toString();
	this._v[this._v.length]=s;
	this.length += s.length;
	this._c = true;
	return this;
};
StringBuilder.prototype.apendLine = function(s){
	return this.append(arguments.length==0?System.line:s.toString()+System.line);
};
StringBuilder.prototype.concat = function(){
	for(var i=0,l=arguments.length; i<l; i++){
		this.append(arguments[i]);
	}
	return this;
};
StringBuilder.prototype.toString=function(){
	return this.valueOf();
};
StringBuilder.prototype.valueOf=function(){
	try {
		return this._t = (this._c?this._v.join(""):this._t);
	}finally{
		this._c = false;
	}
};
/*]]>*/
