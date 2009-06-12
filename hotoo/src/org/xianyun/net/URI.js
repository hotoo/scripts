/*<![CDATA[*/
/**
 * RFC 2396 精确指出 URI 引用中的各个不同组成部分允许使用的字符。以下分类大部分取自该规范，这些约束的用法描述如下： 
 * alpha US-ASCII 字母字符，'A' 到 'Z' 以及 'a' 到 'z' 
 * digit US-ASCII 十进制数字符，'0' 到 '9' 
 * alphanum 所有 alpha 和 digit 字符 
 * unreserved     所有 alphanum 字符及字符串 "_-!.~'()*" 中包含的字符 
 * punct 字符串 ",;:$&+=" 中包含的字符 
 * reserved 所有 punct 字符及字符串 "?/[]@" 中包含的字符 
 * escaped 转义八位组，即三部分组合：百分号 ('%') 后跟两个十六进制数（'0'-'9'、'A'-'F' 和 'a'-'f'） 
 * other 未包含在 US-ASCII 字符集中的 Unicode 字符不是控制字符（根据 Character.isISOControl 方法），并且不是空格字符（根据 Character.isSpaceChar 方法）（与 RFC 2396 有些出入，RFC 2396 限制为 US-ASCII） 
 * 
 * 全部合法 URI 字符集包含 unreserved、reserved、escaped 和 other 字符。 
 */
var RFC2396 = {
	alpha:/[a-zA-Z]+/,
	digit:/[0-9]+/,
	alphanum:/[a-zA-Z0-9]+/,
	unreserved:/[a-zA-Z0-9_-!\.~\'\(\)\*]+/,
	punct:/[,;:\$&\+=]+/,
	reserved:/[,;:\$&\+=\?\/\[\]@]+/,
	escaped:/(?:%[0-9a-fA-F]{2})+/,
	other:/[^\x00-\xFF]+/
};

/**
 * 通用资源标志符(Universal Resource Identifier)
 * [scheme:]scheme-specific-part
 * @namespace js.net
 * @extends {Object}
 * @constructor new URI();
 * @param {String} uri
 * @see http://en.wikipedia.org/wiki/Uniform_Resource_Identifier
 * @see http://zh.wikipedia.org/wiki/%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E6%A0%87%E5%BF%97%E7%AC%A6
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/3/13, 2008/9/12
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var URI = function(uri){
	this._scheme = null;
	this._ssp = null; // scheme-specific-part
	if ((arguments.length===1) && uri.isString()){ // 通过指定字符串构造URI。
		var a = uri.split(":");
	}
};
/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
URI.validate = function(u){
	if (u.indexOf(":")>0)
		return /^[a-zA-Z]+:[a-zA-Z0-9]+$/.test(u); // 绝对URI。
	else 
		return /^[a-zA-Z0-9]+$/.test(u); // 相对URI。
};

URI.isAblolute = function(uri){
	return uri.indexOf(":")>0; // 包含指定方案和方案细节部分。
};
URI.prototype.isAbsolute = function(){
	return URI.isAblolute(this.toString());
};

/*]]>*/
