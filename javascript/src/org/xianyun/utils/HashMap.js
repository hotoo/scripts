/**
 * @overview 哈希表。其中键必须为非空字符串对象。
 * @namespace org.xianyun.utils;
 * @extends {Object}
 * 
 * @version 2008/2/25
 * @author 闲耘(mail[AT]xianyun.org)
 */
var HashMap = function(){
	this._table = {};
};

/**
 * 按照指定键获取哈希表中对应值，未定义指定键时返回默认值。
 * @param {String} key 指定键。
 * @param {Object} defaultValue 默认返回值。
 * @return {Object} 如果找到指定键，返回键所对应的值；否则，返回默认值；
 * 	如果未给定默认值，返回undefined。
 */
HashMap.prototype.get = function(key, defaultValue){
	if (!(key instanceof String||typeof key==="string") || key==="")
		throw new ArgumentException("HashMap.prototype.get(key,defaultValue)，"+
			"其中key必须是不为空的字符串。");
	var k = HashMap._hash(key);
	return typeof this._table[k]==="undefined"?defaultValue:this._table[k];
};

/**
 * 设置指定键所对应的值。如果已存在指定键，修改对应值；如果不存在指定键，则创建之，并设置对应值。
 * @param {String} key 指定键。
 * @param {Object} value 指定对应的值。
 * @return {Object} 返回指定的value。
 * @exception {ArgumentException}
 */
HashMap.prototype.put = function(key, value){
	if (!(key instanceof String||typeof key==="string") || key==="")
		throw new ArgumentException("HashMap.prototype.set(key,value)，"+
			"其中key必须是不为空的字符串。");
	var k = HashMap._hash(key);
	this._table[k] = value;
	return value;
};

/**
 * 以迭代器形式返回哈希表中所有的键。
 * @return {Array} 哈希表中所有项的键组成的数组（可以用new Iterator(a)形式将数组转为迭代器）。
 */
HashMap.prototype.keys = function(){
	var a = [];
	for (var k in this._table)
		if (HashMap._PREFIX_REG.test(k))
			a[a.length] = k.replace(HashMap._PREFIX_REG, "");
	return a;
//	return new Iterator(a);
};

/**
 * 以迭代器形式返回哈希表中所有的值。
 * @return {Array} 哈希表中所有项的值组成的数组（可以用new Iterator(a)形式将数组转为迭代器）。
 */
HashMap.prototype.values = function(){
	var a = [];
	for (var k in this._table)
		if (HashMap._PREFIX_REG.test(k))
			a[a.length] = this._table[k];
	return a;
//	return new Iterator(a);
};

/**
 * 判断哈希表是否包含指定键。
 * @param {String} k 指定键。
 * @return {Boolean} true,如果包含指定键，否则返回false。
 */
HashMap.prototype.containsKey = function(k){
	return typeof this._table[k]!=="undefined";
};

/**
 * 判断哈希表是否包含指定值。
 * @param {Object} v 指定值。
 * @return {Boolean} true,如果包含指定值，否则返回false。
 */
HashMap.prototype.containsValue = function(v){
	for (var k in this._table){
		if (v === this._table[k] ||
		  (this._table[k]!==null&&this._table[k].equals(v))){
			return true;
		}
	}
	return false;
};

/**
 * 返回哈希表的大小，即哈希表中键值映射对象的个数。
 * @return {Number}
 */
HashMap.prototype.size = function(){
	var sz = 0;
	for (var k in this._table)
		if (HashMap._PREFIX_REG.test(k))
			sz++;
	return sz;
};

/**
 * 判断哈希表是否为空，即哈希表中不存在键值映射对。
 * @return {Boolean} true,如果不存在键值映射，否则返回false。
 */
HashMap.prototype.isEmpty = function(){
	return this.size()===0;
};

/**
 * 从此映射中移除所有映射关系。
 */
HashMap.prototype.clear = function(){
	this._table = {};
	/*
	for (var k in this._table) 
		if (HashMap._PREFIX_REG.test(k)) {
			this._table[k] = null;
			delete this._table[k];
	*/
};

/**
 * 删除匹配指定规则的所有键（项）。
 * 注：正则表达式匹配规则暂未实现。
 * @param {String, RegExp} key
 */
HashMap.prototype.remove = function(key){
	var k = HashMap._hash(key);
	if (this.containsKey(k)){
		this._table[k] = null;
		delete this._table[k];
	}
};

HashMap.prototype.toJSONString = function(){
	return Object.prototype.toJSONString.call(this._table).replace(HashMap._PREFIX_JSON_REG, "");
};

HashMap.prototype.equals = function(h){
	if(this===h){return true;}
	if(!(h instanceof HashMap)){return false;}
	var m = this.keys(), i=0, o1, o2;
	while(m.hasNext()){
		i++; o1=this.get(k); o2=h.get(k);
		if(o1===undefined||o1===null){if(o1!==o2){return false;}}
		else if(o1!==o2||!o1.equals(o2)){return false;}
	}
	var n = h.keys();
	while(n.hasNext()){i--; n.next();}
	return i===0;
};

HashMap.prototype.toString = function(){
	var sb = new StringBuffer();
	for (var k in this._table)
		if (HashMap._PREFIX_REG.test(k))
			sb.appendLine(k.replace(HashMap._PREFIX_REG,"")+"="+this._table[k]);
	return sb.toString();
};

/**
 * @type {RegExp} 匹配哈希表各项的前缀，用于判断当前键是否是哈希表的键，
 * （防止Object扩展成员/方法的干扰）。如果修改此处，必同步修改HashMap._PREFIX。
 * @ignore
 */
HashMap._PREFIX_REG = /^\$hc_/;
/**
 * @type {RegExp} 拥有将哈希表转为JSON字符串时，将键中的前缀剔除。
 * @ignore
 */
HashMap._PREFIX_JSON_REG = /\$hc_/g;
/**
 * @type {String} 同HashMap.PREFIX_REG之理。
 * @ignore
 */
HashMap._PREFIX = "$hc_";

/**
 * 对指定字符串进行“哈希化”。
 * 为防止Object类型的扩展对this._table的成员/方法，为每个键前加上指定的前缀，如果改变此前缀，
 * 请同步修改HashMap._PREFIX的表达式。
 * @param {String} s 指定字符串。
 * @ignore
 */
HashMap._hash = function(s){
	if (!(s instanceof String||typeof s==="string") || s===""){
		throw new ArgumentException("HashMap._hash(s) 中的参数s必须是非空字符串。");
	}
	return HashMap._PREFIX + s;
};
