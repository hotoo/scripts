/**
 * 用户请求（对象）。
 * @namespace org.xianyun.system
 * @constructor {static} Request
 * @extends {Object}
 * @since IE6.0, Firefox1.0, Opera8.0, Safari3.0, Netscape8.0
 * @version 2008/3/12
 * @author 闲耘(mail[AT]xianyun.org)
 */
Request = {
	/**
	 * 以指定键获取地址栏中形如key1=value1&key2=value2的键值对中的对应值。
	 * 该方法只返回查找到的最后一个对应值。
	 * @param {String} k 指定的键。
	 * @return {String} 返回指定键最后一个所对应的值。
	 */
	getParam : function(k){
		return URL.getParam(document.location.href, k);
	},
	
	/**
	 * 以指定键获取地址栏中形如key=value1&key=value2的键值对中的对应值。
	 * 该方法支持多个同名键的获取。
	 * @param {String} k 指定键名。
	 * @return {Array} 返回所有指定键对应的值。
	 */
	getParams : function(k){
		return URL.getParams(document.location.href, k);
	},
	
	/**
	 * 返回地址栏参数部分的字符串。
	 * @return {String}
	 */
	paramString : function(){
		return URL.paramString(document.location.href);
	},
	
	/**
	 * 返回所有参数名列表（忽略重复参数名）。
	 * @return {Array, Iterator}
	 */
	paramNames : function(){
		return URL.paramNames(document.location.href);
	}
};
