/*<![CDATA[*/
/**
 * IPv4 (Internet Protocol Version 4)
 * @namespace org.xianyun.net;
 * @extends {Object}
 * @constructor new IPv4("192.168.2.1")
 * @param {String} ip
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/5/14
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var IPv4 = function(ip){
	if(!IPv4.verify(ip)){throw new ParseException("invaild IPv4 address.");}
	this._v = ip;
};
/**
 * @ignore
 */
IPv4._REG = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

/**
 * 验证ip是否是合法的IPv4地址。
 * @param {String} ip 类似"127.0.0.1"这样的字符串。
 * @return {Boolean} ip是合法的IPv4地址是返回true，否则返回false。
 */
IPv6.validate = function(ip){
	return IPv4._REG.test(ip);
};

/**
 * 将合法的IPv4地址转换为标准（完整）形式的IPv6地址。
 * @param {String} ip 类似"127.0.0.1"这样的IPv4地址。
 * @return {String} 返回标准（完整）形式的IPv6地址。
 */
IPv4.toIPv6 = function(ip){
	if(!IPv4.verify(ip)){throw new ParseException("invaild IPv4 address.")}
	ip = ip.split(".");
	for (var i=0, v; i<4; i++){
		v=ip[i]|0;
		ip[i] = (v<16?"0":"")+v.toString(16).toUpperCase();
	}
	return "0000:0000:0000:0000:0000:0000:"+ip[0]+ip[1]+":"+ip[2]+ip[3];
};
IPv4.prototype.toString = function(){
	return this._v;
};
IPv4.prototype.valueOf = function(){
	return this._v;
};

/*]]>*/
