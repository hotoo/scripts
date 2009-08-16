/*<![CDATA[*/
/**
 * 无序图，“键值对”类型对象(org.xianyun.utils.KeyValuePair)的集合。
 * key和value都允许是对象(而不仅仅是字符串或索引[数值])。
 * @namespace org.xianyun.utils;
 * @extends Object
 * @constructor new Map();
 * @since IE5.0, Firefox1.0, Netscape8.0, Opera8.0, Safari3.0
 * @author 闲耘 (mail[AT]xianyun.org)
 * @version 1.2.0, 2007/11/29
 */
var Map = function(){
	// [new Map.Entry(KEY, VALUE), ...]
	this._table = [];
};
/**
 * 检查图中是否包含有值为key的键。
 * @param {Object} key 指定键。
 * @return {Boolean}
 */
Map.prototype.containsKey = function(key){
	return this.get(key)===null;
};
/**
 * 判断图中是否包含内容为value的值。
 * @param {Object} value
 * @return {Boolean}
 */
Map.prototype.containsValue = function(value){
	for (var i=0; i<this._table.length; i++){
		if ((this._table[i].getValue()===null && value===null) ||
		  this._table[i].getValue().equals(value))
			return true;
	}
	return false;
};
/**
 * 根据指定的键取得无序图中对应的值。
 * @param {Object} key 指定的键。
 * @return {Object}
 */
Map.prototype.get = function(key){
	for (var i=0; i<this._table.length; i++){
		if (this._table[i].getKey().equals(key))
			return this._table[i].getValue();
	}
	return null;
};
/**
 * 向无序图中添加键值对对象，如果已经存在相同的键，则覆盖此键的值。
 * @param {KeyValuePair} pair 指定的键值对。
 */
Map.prototype.set = function(pair){
	if (!(pair instanceof Map.Entry))
		throw new Error("arguments error.");

	var i = this._indexOf(pair.getKey());
	if (i !== -1){
		this._table[i].setValue(pair.getValue());
	} else {
		this._table.push(pair);
	}
};
/**
 * 返回无序图当前所有的键列表。
 * @return {Array}
 */
Map.prototype.keys = function(){
	var k = [];
	for (var i=0; i<this._table.length; i++){
		k[k.length] = this._table[i].getKey();
	}
	return k;
};
/**
 * 返回无序图当前的长度，即键值对的数量。
 * @return {Number}
 */
Map.prototype.length = function(){
	return this._table.length;
};
/**
 * 判断无序图是否为空。
 * @return {Boolean}
 */
Map.prototype.isEmpty = function(){
	return this._table.length===0;
};
/**
 * {private}
 * 返回指定键所在的索引位置，仅供内部实现使用。
 * @param {Object} key 指定的键。
 * @return {Number}
 */
Map.prototype._indexOf = function(key){
	for (var i=0; i<this._table.length; i++){
		if (this._table[i].getKey().equals(key))
			return i;
	}
	return -1;
};
/**
 * 将键为key的键值对对象从无序图中删除。
 * @param {Object} key 指定的键。
 * @return {Object} 返回被删除键值对对象的值。
 */
Map.prototype.remove = function(key){
	var i = this._indexOf(key);
	return ((i===-1)?null:this._table.splice(i, 1).getValue());
};
/**
 * 将无序图中所有的键值对删除。
 */
Map.prototype.clear = function(){
	this._table.length = 0;
};
/**
 * 判断两个无序图的值是否相等。
 * @param {Map} map
 * @return {Boolean}
 */
Map.prototype.equals = function(map){
	if (!(map instanceof Map) ||
		this.length()!==map.length())
		return false;
	
	var k = this.keys();
	for (var i=0; i<k.length; i++){
		var v1 = this.get(k[i]);
		var v2 = map.get(k[i]);
		if (map.containsKey(k[i]) &&
		  ((v1===null && v2===null) || v1.equals(v2)))
			return true;
	}
	return false;
};
/**
 * 将无序图转型为字符串型。
 * @return {String}
 */
Map.prototype.toString = function(){
	return "[Object Map]";
};



/**
 * 键值对。其中键的值不允许为以下值：
 * 空(null), 空字符串("", ''), 未定义(undefined)。
 * @namespace org.xianyun.utils;
 * @extends Object
 * @constructor new Map.Entry(Object, Object);
 * @param {Object} key
 * @param {Object} value
 * @author 闲耘 (mail[AT]xianyun.org)
 * @version 1.0, 2007/11/29
 */
Map.Entry = function(key, value){
	if (key===null || key==="" || key===undefined)
		throw new Error("arguments error.");

	this._key = key;
	this._value = value;
};
/**
 * 将{key:KEY, value:VALUE}对象解析为键值对类型的对象(KeyValuePair)。
 * @param {Object} pair 指定的存在key和value属性的对象。
 * @return {KeyValuePair}
 */
Map.Entry.parse = function(pair){
	if (!pair || !pair.key || !pair.value)
		throw new Error("arguments error.");
	return new KeyValuePair(pair.key, pair.value);
};
/**
 * 返回条目的键。
 * @return {Object}
 */
Map.Entry.prototype.getKey = function(){
	return this._key;
};
/**
 * 获得条目的值。
 * @return {Object}
 */
Map.Entry.prototype.getValue = function(){
	return this._value;
};
/**
 * 设置条目的值。
 * @param {Object} value 指定值。
 */
Map.Entry.prototype.setValue = function(value){
	this._value = value;
};
/**
 * 判断两个键值对对象的值是否相等。
 * @param {KeyValuePair} keyValuePair
 * @return {Boolean}
 */
Map.Entry.prototype.equals = function(entry){
	return (entry instanceof Map.Entry) &&
		this._key.equals(entry.key) &&
		((this._value===null && entry.value===null) ||
		this._value.equals(entry.value));
};
/**
 * 将键值对对象转换为字符串对象。
 */
Map.Entry.prototype.toString = function(){
	return "{key:"+this._key+",value:"+this._value+"}";
};
/*]]>*/