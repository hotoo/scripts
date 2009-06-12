/**
 * Uniform Resource Locator.
 * like http://www.xianyun.org:80/index?p=v&a=b#top
 * @namespace org.xianyun.net
 * @constructor new URL(url)
 * @extends {URI}
 * @param {String} url 指定统一资源定位符。
 */
var URL = function(url){
	var u = URL.regex.exec(url);
	this.value = u[0];
//!	URI已解码的授权组成部分，未实现。
	this.authority;
	this.protocol = u[2];
	this.username = u[4];
	this.password = u[5];
	this.host = u[6];
	this.port = u[7];
	this.path = u[8];
	this.queryString = u[9];
	this.fragment = u[10];
	return this;
};
URL.regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;

/**
 * URL的默认端口集。
 * @type {Object<Number>}
 * @ignore
 */
URL.DEFAULT_PORTS = {
	ftp:21,
	ssh:22,
	telnet:23,
	smtp:25,
	http:80,
	pop3:109,
	https:443,
	mms:1755
};

/**
 * 验证指定url地址是否合法。
 * @param {Object} url 指定的url地址。
 * @return {Boolean} true，如果合法，否则，false。
 */
URL.validate = function(url){
	return URL.regex.test(url);
//	return /^\w+:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/.test(url);
};

/**
 * 将指定字符串解析为URL对象。
 * @param {String} s 指定字符串。
 */
URL.parse = function(s){
	return new URL(s);
};

/**
 * 获取URL（对象）地址所带参数中指定名称所对应的（最后一个）参数值。
 * @param {String} u 指定url地址。
 * @param {String} n 指定参数名称。
 * @return {String} 返回指定参数名所对应的（最后一个）参数值。
 */
URL.getParam = function(u, n){
	var v = u.replace(
	  new RegExp(".*(?:\\?|&|\\b)"+n+"=(.*?)(?:&|#|$).*","i"), "$1");
	return v===u||v==="&"||v==="#"?"":v;
};

/**
 * 获取URL（对象）地址所带参数（键值对）中指定键对应的值。
 * @param {String} u 指定url地址。
 * @param {String} n 指定参数名称（键）。
 * @return {Array} 返回对应的值，为找到则返回空字符串。
 */
URL.getParams = function(u, n){
	var p = [];
	var a = u.match(new RegExp("(?:\\?|&|\\b)"+n+"=.+?(?:\\b|&|#|$)","ig"));
	if (a && a instanceof Array && a.length>0){
		for (var i=0; i<a.length; i++){
			p[p.length] = URL.getParam(a[i], n);
		//	p[p.length] = a[i].replace(/.*?=(.+?)(?:&|#|$)/, "$1");
		}
	}
	return p;
};

/**
 * 获取指定URL（对象）地址中的参数字符串。
 * @param {String} u 指定URL（对象）地址。
 * @return {String} 返回URL地址中参数字符串部分。
 */
URL.paramString = function(u){
	var s = u.replace(/.*?\?(.*?)(?:#.*)?$/, "$1");
//	var s = u.replace(/.*?\?(.*?)(?:#|$).*/, "$1");
	return s===u?"":s;
};

/**
 * 获取指定URL（对象）地址中所有的参数名称（忽略重复参数名）。
 * @param {String} u 指定URL地址。
 * @return {Array} 返回所有参数名称（忽略重复名称）。 
 */
URL.paramNames = function(u){
	var p = [];
	var a = u.match(/(?:\?|&).*?=/g);
	if (a && a instanceof Array && a.length>0){
		for (var i=0; i<a.length; i++){
			var s = a[i].replace(/(?:\?|&)(.*?)=.*/, "$1");
			if (!p.contains(s))
				p[p.length] = s;
		}
	}
	return p;
};

URL.prototype.toString = function(){
	return this.value;
};
URL.prototype.valueOf = function(){
	return this.value;
};
URL.prototype.equals = function(url){
	if (this===url){return true;}
	return (url instanceof URL) &&
		url.valueOf()===this.valueOf();
};
