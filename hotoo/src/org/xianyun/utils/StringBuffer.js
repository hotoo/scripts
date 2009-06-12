/*<![CDATA[*/
/**
 * 此对象主要用在大文本拼接上，小文本请使用+号拼接。
 * Firefox的+号拼接速度也很快，不过用此类可以更快。
 * @constructor new StringBuffer(),
 *  			new StringBuffer(String)
 * @param {String} text
 * @see http://blog.csdn.net/meizz/archive/2005/12/14/552260.aspx
 * @version 2007/10/13
 * @deprecated 此类已过时，替代类为org.xianyun.lang.StringBuilder，
 * 	org.xianyun.lang.StringBuffer类用于大型字符串的复杂处理。
 */
var StringBuffer = function(text){
	// constructor:
	var _val = new Array();
	var _txt = text?text.toString():"";
	var _len = _txt.length;
	var _changed = false;
	if (_txt) _val.push(_txt);

	
	/**
	 * 向StringBuffer对象中拼接字符串对象。
	 * @param {Object, String} value
	 * @return {void}
	 */
	this.append = function(value){
		_val.push(value.toString());
		//_val[_val.length]=value;
		_changed = true;
		//return _len+value.length;//使用此方法也有点耗时，而且返回值似乎用处不大，取消返回值。
		//return this.length(); // {Number} 返回StringBuffer对象拼接后字符串内容的长度。
		// 注：因为返回内容长度计算比较耗时，严重影响效率，所以在实现上取消了返回值。
	};
	
	/**
	 * 向StringBuffer对象中拼接<strong>一行</strong>字符串对象。
	 * 使用Unix风格，新行用\n，没有\r。请酌情修改。
	 * @param {Object} value, 向对象中拼接的值。最好是String类型。
	 * @return {void}
	 */
	this.appendLine = function(value){
		var v = value.toString();
		this.append( v ? v+"\n" : "\n");
	};
	
	/**
	 * 将StringBuffer对象内容清空。
	 * @param {void}
	 * @return {void}
	 */
	this.clear = function(){
		_changed = true;
		_val.length = 0;
	};
	
	/**
	 * 取得StringBuffer文本内容的长度。
	 * @param {void}
	 * @return {Number}
	 */
	this.length = getLength = function(){
		return _len = (_changed ? _val.toString().length : _len);
	};
	
	/**
	 * 判断StringBuffer对象内容是否为空。
	 * @param {void}
	 * @return {Boolean}
	 */
	this.isEmpty = function(){
		return this.length()===0;
	};
	
	/**
	 * 比较StringBuffer对象与指定对象是否值（即文本内容）相等。
	 * @param {StringBuffer, Object} stringbuffer 可以是任意类型的对象，但只有StringBuffer对象才有意义。
	 * @return {Boolean} 仅当对象类型和值相等时返回true。
	 */
	this.equals = function(stringbuffer){
		return (stringbuffer instanceof StringBuffer) && 
			(this.valueOf()===stringbuffer.valueOf());
	};
	
	/**
	 * 将StringBuffer对象转换为String对象。
	 * @param {void}
	 * @return {String} 返回StringBuffer对象的内容。
	 */
	this.toString = function(){
		try {
			return _txt = _changed ? _val.join("") : _txt;
		} finally {
			_changed = false;
		}
	};
	
	/**
	 * 返回StringBuffer对象的值（即文本内容）。
	 * @param {void}
	 * @return {String}
	 */
	this.valueOf = function(){
		return this.toString();
	};
};

/*]]>*/