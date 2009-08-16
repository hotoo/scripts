
var Email = function(user, pass, host, subject, body){
	this._u = user;
	this._p = pass;
	this._h = host;
	this._s = subject;
	this._b = body;
};

/**
 * 验证Email地址是否合法。
 * 允许@符号前带、加号(+)、减号(-)、点号(.)、非US-ASCII字符（如汉字），主机名同样允许非US-ASCII字符。
 * @param {Object} m 指定的Email地址。
 * @see <a href="http://www.iotop.cn/article.asp?id=45" target="_blank">论坛E-mail验证的正则表达式升级</a>
 * 
 * 1. 必须包含一个并且只有一个符号“@” 
 * 2. 第一个字符不得是“@”或者“.” 
 * 3. 不允许出现“@.”或者.@ 
 * 4. 结尾不得是字符“@”或者“.” 
 * 5. 允许“@”前的字符中出现“＋”
 * 6. 不允许“＋”在最前面，或者“＋@”
 * 
 * 正则表达式如下：
 * -----------------------------------------------------------------------
 * ^(\w+((-\w+)|(\.\w+))*)\+\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$
 * -----------------------------------------------------------------------
 */
Email.validate = function(m){
	return /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/.test(m); // 只验证常用Email格式。
	return /^(\w+((-\w+)|(\.\w+))*)\+\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(m);
};

Email.prototype.toString = function(){
	var a = [];
	if (this._s) a[a.length] = "subject="+this._s;
	if (this._b) a[a.length] = "body="+this._b;
	a = a.join("&");
	return "mailto:"+this._u+"@"+this._h+(s?"?"+s:"");
};

Email.prototype.valueOf = function(){
	return this._u+":"+this._p+"@"+this._h;
};
