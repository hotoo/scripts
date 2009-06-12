/*<![CDATA[*/
/**
 * 键值对。其中键的值不允许为以下值：
 * 空(null), 空字符串("", ''), 未定义(undefined)。
 * @namespace org.xianyun.utils;
 * @extends Object
 * @constructor new KeyValuePair(Object, Object);
 * @param {Object} key
 * @param {Object} value
 * @author 闲耘 (mail[AT]xianyun.org)
 * @version 1.0, 2007/11/29
 */
var KeyValuePair = function(key, value){
	if (key===null || key==="" || key===undefined)
		throw new Error("arguments error.");

	this.key = key;
	this.value = value;
};
/**
 * 将{key:KEY, value:VALUE}对象解析为键值对类型的对象(KeyValuePair)。
 * @param {Object} pair 指定的存在key和value属性的对象。
 * @return {KeyValuePair}
 */
KeyValuePair.parse = function(pair){
	if (!pair || !pair.key || !pair.value)
		throw new Error("arguments error.");
	return new KeyValuePair(pair.key, pair.value);
};
/**
 * 判断两个键值对对象的值是否相等。
 * @param {KeyValuePair} keyValuePair
 * @return {Boolean}
 */
KeyValuePair.prototype.equals = function(keyValuePair){
	return (keyValuePair instanceof KeyValuePair) &&
		this.key.equals(keyValuePair.key) &&
		((this.value===null && keyValuePair.value===null) ||
		this.value.equals(keyValuePair.value));
};
/**
 * 将键值对对象转换为字符串对象。
 */
KeyValuePair.prototype.toString = function(){
	return "{key:"+this.key+",value:"+this.value+"}";
};
/*]]>*/