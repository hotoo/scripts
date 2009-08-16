/*<![CDATA[*/
/**
 * @overview 辅助方法，一般用于偷懒，有人直接称之为：lazy。
 * @namespace org.xianyun.utils;
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/6/15
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */

/**
 * 判断对象的类型是否为数值型。
 * 这三种类型比较特殊，其他类型直接 instanceof 或者比较 o.constructor 即可。
 * @param {Object} n
 * @return {Boolean}
 */
function isNumber(n){
	return typeof n=="number" || n instanceof Number;
}
/**
 * 判断对象的类型是否为字符串型。
 * @param {Object} s
 * @return {Boolean}
 */
function isString(s){
	return typeof s=="string" || s instanceof String;
}
/**
 * 判断对象的类型是否为布尔型。
 * @param {Object} b
 * @return {Boolean}
 */
function isBoolean(b){
	return typeof b=="boolean" || b instanceof Boolean;
}
/**
 * 判断对象是否是一个arguments。
 * @param {Object} a
 * @return {Boolean}
 */
function isArguments(a){
	return !!(a && a.callee);
//	return o instanceof Object && isNumber(a.length);
}


/*]]>*/
