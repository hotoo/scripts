/**
 * 数据类型。只为简化类型判断。由于String, Number, Boolean的特殊性：
 * "string" instanceof String === false
 * (1) instanceof Number ===false
 * true instanceof Boolean === false
 * 但是"string", 1, true等均可以使用其对应类型的扩展方法。
 * 
 * 其他类型直接使用 obj instanceof Obj即可。
 * 
 * @author 闲耘 (mail@xianyun.org)
 * @version 2008/2/23
 */
var Type = Object;

/**
 * 判断对象的类型是否是字符串。
 * @return {Boolean} true, 如果对象是字符串类型（"",new String()）；否则返回false。
 */
Type.prototype.isString = function(){
	// 经过测试发现代码实现上只需要instanceof即可，后面的typeof可以不要。
	// 但是 "" instanceof String === false
    return this instanceof String || typeof this==="string";
};

/**
 * 判断对象的类型是否为数值型。
 * @return {Boolean} true, 如果是数值型，否则，false。
 */
Type.prototype.isNumber = function(){
	// 同isString.
    return this instanceof Number || typeof this==="number";
};

/**
 * 判断对象类型是否为布尔型。
 * @return {Boolean} true, 如果是布尔型，否则，false。
 */
Type.prototype.isBoolean = function(){
	// 同isString.
    return this instanceof Boolean || typeof this==="boolean";
};
