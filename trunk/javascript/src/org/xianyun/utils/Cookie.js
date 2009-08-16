/** cn.hotoo.system.Cookie.js [methods]
 * @description Cookie公用方法
 * 
 * @author 闲耘 (hotoo.cn@gmail.com)
 * @create 2006-6-15
 * @update 2007/05/23
 *
 */

var Cookies = {
	getValue:function(name){
		var RE=/;(\s+)=(.*?);((expires|path|domain)=(.*?))*;/;
	},
	
	/**
	 * 以指定名称设置cookie的值，如果没有同名cookie，则新增之，否则覆盖之。
	 * @param {Object} name
	 * @param {Object} value
	 * @param {Object} overtime
	 * @param {Object} path
	 * @param {Object} domain
	 */
	setValue:function(name,value,overtime,path,domain){
		if (!name.isString()||name==="") throw new ArgumentException("cookie名必须是不为空的字符串");
		if (!value.isString()) throw new ArgumentException("cookie值必须为字符串类型");
		if (overtime===undefined) overtime=-1;
		else if (!overtime.isNumber()) throw new ArgumentException("过期需指定为设定之时起，有效的秒数。");
		if (path===undefined) path="/";
		else if (!path.isString()) throw new ArgumentException("有效路径需为字符串类型。");
		if (domain===undefined) domain=null;
	},
	deleteCookie:function(){}
};

// http://www.vipcn.com/InfoView/Article_174339.html
// http://www.113317.com/blog/article.asp?id=1416

var Cookie = function(name, value){
    this.name = name;
    this.value = escape(value);
    this.maxAge = null;
    this.expires = null;
    this.path = null; // 定义了Cookies只发给指定的路径请求，如果Path属性没有被设置，则使用应用软件的缺省路径。
    this.domain = null; // 定义Cookies传送数据的唯一性。
    this.secure = null; // 指定Cookies能否被用户读取。
    this.haskeys = false; // 如果所请求的Cookies是一个具有多个键值的Cookies字典，则返回True，它是一个只读属性。
};
Cookie.prototype.getName = function(){
    return this.name;
};
/*Cookie.prototype.setName = function(name){
    this.name = name;
};*/

Cookie.prototype.getValue = function(){
    return decodeURIComponent(this.value);//unescape
};
Cookie.prototype.setValue = function(value){
    this.value = encodeURIComponent(value);//escape
};

Cookie.prototype.getMaxAge = function(){
    return this.maxAge;
};
Cookie.prototype.setMaxAge = function(maxAge){
    this.maxAge = maxAge;
    if (maxAge > 0){
        this.expires = new Date();
        this.expires.setTime(this.expires.getTime() + maxAge * 1000);
        this.expires = this.expires.toGMTString();
    } else if(maxAge == 0){
        this.expires = 'Thu, 1 Jan 1970 00:00:00 UTC';
    } else {
        this.expires = null;
    }
};

Cookie.prototype.getPath = function(){
    return this.path;
};
Cookie.prototype.setPath = function(path){
    this.path = path;
};

Cookie.prototype.getDomain = function(){
    return this.domain;
};
Cookie.prototype.setDomain = function(domain){
    this.domain = domain;
};

Cookie.prototype.getSecure = function(){
    return this.secure;
};
/* Read only
Cookie.prototype.setSecure = function(secure){
    this.secure = secure;
};*/

Cookie.prototype.equals = function(cookie){
    if (this.name == cookie.name &&
        this.value == cookie.value &&
        this.maxAge == cookie.maxAge &&
        this.path == cookie.path &&
        this.domain == cookie.domain &&
        this.secure == cookie.secure){
        return true;
    } else {
        return false;
    }
};

Cookie.prototype.toString = function(){
    return this.getName() + '=' + this.getValue() +
        (this.expires!=null ? ';expires=' + this.expires : '')+
        (this.getPath() ? ';path=' + this.getPath() : '')+
        (this.getDomain() ? ';domain=' + this.getDomain() : '') +
        (this.getSecure() ? ';secure':"");
};



var Cookies = new Object();
document.getCookies = function(){
    var arr_cookies = document.cookie.split(';');
    for (var i = 0; i < arr_cookies.length; i++){
        var arr_cookie = arr_cookies[i].split('=');
        var name = arr_cookie[0];
        var value = arr_cookie[1];
        Cookies[name] = new Cookie(name, value);
    }
    return Cookies;
};
document.getCookie = function(name){
    return Cookies[name];
};
document.setCookie = function(cookie){
    var name = cookie.getName();
    var value = cookie.getValue();
    if (Cookies[name]){
        Cookies[name].setValue(value);
    }else {
        Cookie[name] = new Cookie(name, value);
    }
    document.cookie = cookie.toString();
};
document.deleteCookie = function(cookieName){
    if (Cookies[cookieName]){
        Cookies[cookieName].setMaxAge(0);
        Cookies[cookieName].setValue('');
        document.setCookie(Cookies[cookieName]);
        Cookies[cookieName] = null;
    }
};



// Copyright (c) 2006 Chris McClelland (http://www.ajaxpress.org/)
// See index.php for full license.
function setCookie(name, value, session) {
    if (session) {
        expires = "";
    } else {
        var expires = new Date();
        expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
    }
    var curCookie = name + "=" + escape(value) + 
        ((expires)? "; expires=" + expires.toGMTString() : "") +
        "; path=/";
    document.cookie = curCookie;
}


function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return "";
    } else {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
        end = dc.length;
    return unescape(dc.substring(begin + prefix.length, end));
}


function deleteCookie(name) {
    if (getCookie(name)) {
        document.cookie = name + "=; path=/; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}