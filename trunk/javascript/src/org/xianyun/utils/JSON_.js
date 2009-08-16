
var JSON = {
	/**
	 * 将指定字符串解析为JSON(Javascript Object Notative)对象。
	 * @param {String} str 指定的字符串。
	 * @exception {ParseException} 解析时出现异常。
	 * @return {Object} 解析后的Javascript对象。
	 */
	parse : function(str){
		return eval(str);
	}
};
