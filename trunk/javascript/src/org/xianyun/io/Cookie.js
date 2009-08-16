/*<![CDATA[*/
/**
 * 
 * @namespace org.xianyun
 * @extends {Object}
 * @constructor ?!
 * @param ?!
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version ?!
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var	Cookie = function(name,	value){
	this.name =	name;
	this.value = escape(value);
	this.maxAge	= null;
	this.expires = null;
	this.path =	"";	// 定义了Cookies只发给指定的路径请求，如果Path属性没有被设置，则使用应用软件的缺省路径?
	this.domain	= null;	// 定义Cookies传送数据的唯一性?
	this.secure	= null;	// 指定Cookies能否被用户读取?
	this.haskeys = false; // 如果所请求的Cookies是一个具有多个键值的Cookies字典，则返回True，它是一个只读属性?
};
Cookie.prototype.getName = function(){
	return this.name;
};
/*Cookie.prototype.setName = function(name){
	this.name =	name;
};*/

Cookie.prototype.getValue =	function(){
	return decodeURIComponent(this.value);//unescape
};
Cookie.prototype.setValue =	function(value){
	this.value = encodeURIComponent(value);//escape
};

Cookie.prototype.getMaxAge = function(){
	return this.maxAge;
};
Cookie.prototype.setMaxAge = function(maxAge){
	this.maxAge	= maxAge;
	if (maxAge > 0){
		this.expires = new Date();
		this.expires.setTime(this.expires.getTime()	+ maxAge * 1000);
		this.expires = this.expires.toGMTString();
	} else if(maxAge ==	0){
		this.expires = 'Thu, 1 Jan 1970	00:00:00 UTC';
	} else {
		this.expires = null;
	}
};
Cookie.prototype.setExpires	= function(e){
	this.expires = e;
};

Cookie.prototype.getPath = function(){
	return this.path;
};
Cookie.prototype.setPath = function(path){
	this.path =	path;
};

Cookie.prototype.getDomain = function(){
	return this.domain;
};
Cookie.prototype.setDomain = function(domain){
	this.domain	= domain;
};

Cookie.prototype.getSecure = function(){
	return this.secure;
};
/* Read	only
Cookie.prototype.setSecure = function(secure){
	this.secure	= secure;
};*/

Cookie.prototype.equals	= function(cookie){
	if (this.name == cookie.name &&
		this.value == cookie.value &&
		this.maxAge	== cookie.maxAge &&
		this.path == cookie.path &&
		this.domain	== cookie.domain &&
		this.secure	== cookie.secure){
		return true;
	} else {
		return false;
	}
};

Cookie.prototype.toString =	function(){
	return this.getName() +	'='	+ this.getValue() +
		(this.expires!=null	? ';expires=' +	this.expires : '')+
		(this.getPath()	? ';path=' + this.getPath()	: '')+
		(this.getDomain() ?	';domain=' + this.getDomain() :	'')	+
		(this.getSecure() ?	';secure':"");
};

Cookie.gets = function(name){
	//var RE=/(?:^|\b|;)name=(.*?)(?:;|\b|$)(?:(expires|path|domain)=(.+?)(?:;|\b|$))?(?:(expires|path|domain)=(.+?)(?:;|\b|$))?(?:(expires|path|domain)=(.*?)(?:;|\b|$))?/;
	var RE=new RegExp("(?:^|\b|;)"+name+"=(.*?)(?:;|\b|$)"+
		"(?:(expires|path|domain)=(.+?)(?:;|\b|$))?"+
		"(?:(expires|path|domain)=(.+?)(?:;|\b|$))?"+
		"(?:(expires|path|domain)=(.*?)(?:;|\b|$))?");
	var m=COOKIES.match(RE);
	if (m===null){
		return null;
	}
	var v=m[1], e, p, d;
	for (var i=2; i<m.length; i++){
		switch (m[i]){
		case "": i++; continue;
		case "expires": e=(e=m[++i])===";"?"":e; break;
		case "path": p=(p=m[++i])===";"?"":p; break;
		case "domain": d=(d=m[++i])===";"?"":d; break;
		}
	}
	var c = new Cookie(name, v);
	if (e){c.setExpires(e);}
	if (p){c.setPath(p);}
	if (d){c.setDomain(d);}
	return c;
};

Cookie.get = function(n, p, d){
	return Cookie.gets(n).getValue();
};
Cookie.set = function(name, value, expires, path, domain){};
Cookie.del = function(name){};

function isEnableCookie(){
    try {
        var cookie_helper = new CookieHelper("");
        var test_cookie_name = "test_cookie_name";
        var test_cookie_value = "test_cookie_value";
        var test_cookie_value_ret = "";
        
        cookie_helper.writeCookie(test_cookie_name, test_cookie_value);
        test_cookie_value_ret = cookie_helper.getCookieValue(test_cookie_name);
        
        if (test_cookie_value_ret != null) {
            cookie_helper.removeCookie(test_cookie_name);
            return true;
        }
        else {
            return false;
        }
    } 
    catch (error) {
        return false;
    }
}

/*]]>*/
