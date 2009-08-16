/*<![CDATA[*/
/**
 * @overview 字符串缓冲区，用于大型字符串高级处理。
 * @namespace org.xianyun.lang;
 * @extends {Object}
 * @constructor new StringBuffer();
 * @param {String} s
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/7/26
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var StringBuffer = function(s){
	this._v = [];
	if(arguments.length==0){
		this._t = "";
	}else if(arguments.length==1){
		this._t = s.toString();
	}else{
		this._t = Array.prototype.join.apply(arguments,"");
	}
	this._v.concat(this._t.split(""));
	this._c = false;
	this.length = this._t.length;
};
/**
 * 向字符串缓冲区(StringBuffer)尾部拼接字符串。
 * @param {String, ...} arguments 动态个数字符串参数。
 * @return {StringBuffer} 返回更新后的StringBuffer本身。
 * @example <code>new StringBuffer("abc").append("def","ghi");</code>
 * result:"abcdefghi"
 */
StringBuffer.prototype.append = function(){
	var s=Array.prototype.join.apply(arguments,"");
	this._v.concat(s.split(""));
	this.length += s.length;
	this._c = true;
	return this;
};
/**
 * 向字符串缓冲区尾部拼接字符串并在最后拼接一个换行符（根据浏览器支持的换行符不同而有所不同）。
 * 该方法需要System.line对象。
 * @param {String, ...} arguments 动态个数的字符串参数。
 * @return {StringBuffer} 返回更新后的StringBuffer本身。
 */
StringBuffer.prototype.appendLine = function(){
	return this.append(arguments.length==0?System.line:Array.prototype.join.apply(arguments,System.line));
};
/**
 * 向StringBuffer中指定位置插入字符串。
 * @param {Number} k 指定索引位置。
 * @param {String} s 被插入的字符串。
 * @return {StringBuffer} 返回更新后的StringBuffer对象本身。
 */
StringBuffer.prototype.insert = function(k, s){
	s = s.split("");
	this._v.slice(0,k).concat(s.split(""), this._v.slice(k));
//	for (var i=s.length-1; i>=0; i--){
//		this._v.splice(k,0,s.charAt(i)); // s[i]
//	}
	this.length += s.length;
	this._c = true;
	return this;
};
StringBuffer.prototype.remove = function(i,l){
	this._v.splice(i,l);
	this.length -= l;
	this._c = true;
	return this;
};
StringBuffer.prototype.replace = function(p,t){
	if(p instanceof Number || typeof p=="number"){
		for (var i=t.length-1; i>=0; i--){
			this._v.splice(p,0,t.charAt(i)); // s[i]
		}
		return this;
	}
	return this.toString().replace(p,t);
};
StringBuffer.prototype.indexOf = function(s,i){
	return this.toString().indexOf(s,i)
};
StringBuffer.prototype.charAt = function(i){
	if(Math.abs(i)>this.length){return "";}
	return this._v[i>=0?i:this.length-1-i];
};
StringBuffer.prototype.substr = function(i,l){
	return this._v.slice(i,e||(this.length-1-i)).join("");
};
StringBuffer.prototype.substring = function(s,e){
	return this._v.slice(s,e).join("");
};
StringBuffer.prototype.reverse = function(){
	return this._v.reverse().join("");
};
/*]]>*/
