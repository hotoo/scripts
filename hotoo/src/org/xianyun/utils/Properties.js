/**
 * @overview Properties表示一个持久的属性集。
 * @namespace org.xianyun.utils;
 * @constructor new Properties()
 * @extends {Object}
 * @author 闲耘 (mail[AT]xianyun.org)
 * @version 2008/2/25
 */
var Properties = function(){
	this._ps = new HashMap();
	this._file = null;
};

/**
 * 获取属性集中指定属性名对应的值(即映射集中指定键所对应的值)。
 * 如果未找到/未定义指定属性名，则返回默认属性值。
 * @param {String} key 指定的属性名。
 * @param {Object} defaultValue 默认属性值。
 * @return {Object} 对应的属性值。
 */
Properties.prototype.getProperty = function(key, defaultValue){
	return this._ps.get(key, defaultValue);
};

/**
 * 为属性集设置/添加名为指定属性名，值为指定值的属性。
 * @param {String} key 指定属性名，非空字符串。
 * @param {Object} value 指定属性值。
 */
Properties.prototype.setProperty = function(key, value){
	this._ps.put(key, value);
};

/**
 * 清楚属性集中所有属性。
 */
Properties.prototype.clear = function(){
	this._ps.clear();
};

/**
 * 获取属性集中所有的属性名。
 * @return {Iterator}
 */
Properties.prototype.propertyNames = function(){
	return this._ps.keys();
};

/**
 * 将指定url地址指向的资源文件所定义的属性集导入到属性集对象中。
 * @param {String} url 指定的url地址。暂时还未确定该参数是用File/String类型。
 * @param {Boolean} 是否使用异步方式加载。设置为false时使用同步方式，否则使用异步方式。
 * @exception {FileNotFoundException}
 */
Properties.prototype.load = function(url, async){
	var ME = this;
	this._file = new File(url);
	this._file.load(function(status, req){
		if (status === "ok") {
			ME._url = url;
			var text = req.responseText;
			var ps = text.replace(/^#.*?(?:(?:\r\n)|$)/g, "") // 去除#开头的注释。
				.replace(/^\[.*?\](?:(?:\r\n)|$)/g, "") // 去除类似*.ini文件中的分组。
				.replace(/\r\n\s*\r\n/g, "\r\n") // 去除空行。
				.split("\r\n");
			var KEY_VALUE_PAIR_REGEXP = /^(.*?)=(.*)$/;
			for (var i = 0; i < ps.length; i++) {
				var x = ps[i].match(KEY_VALUE_PAIR_REGEXP);
				if (x !== null) {
					var k = x[1].trim();
					var v = x[2].trim();
					ME._ps.put(k, v);
				}
			}
		}
	}, async);
	/*new Ajax().post(url, function(text, xmlhttp, json){
			ME._url = url;
			var ps = text.replace(/^#.*?(?:(?:\r\n)|$)/g,"") // 去除#开头的注释。
				.replace(/^\[.*?\](?:(?:\r\n)|$)/g, "") // 去除类似*.ini文件中的分组。
				.replace(/\r\n\s*\r\n/g, "\r\n") // 去除空行。
				.split("\r\n");
			var KEY_VALUE_PAIR_REGEXP = /^(.*?)=(.*)$/;
			for (var i=0; i<ps.length; i++){
				var x = ps[i].match(KEY_VALUE_PAIR_REGEXP);
				if (x!==null){
					var k = x[1].trim();
					var v = x[2].trim();
					ME._ps.put(k, v);
				}
			}
		},
		"",
		function(){}
	);*/
};

/**
 * 从指定的xml文件中导入属性集。
 * 未实现
 * @param {String} url 指定xml文件的地址。参数类型有待商榷。
 */
Properties.prototype.loadFromXML = function(url){};

/**
 * 将属性集以纯文本的映射集形式存储到服务器。
 */
Properties.prototype.store = function(){
	if (this._file===null) throw new IOException("Properties.prototype.store()"+
		"的目标文件地址不合法。");
	var ME = this;
	this.file.store(function(){},"d="+this.toString(), function(){});
};

/**
 * 将属性集以xml格式存储到服务器。
 */
Properties.prototype.storeToXML = function(){};

/**
 * 将属性集转换为字符串。
 * @return {String} 以键值对形式返回属性集中所有的映射。
 */
Properties.prototype.toString = function(){
	return this._ps.toString();
};
