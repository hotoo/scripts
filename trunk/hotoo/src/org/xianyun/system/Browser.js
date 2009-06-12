/** Browser.js [object]
 * IE 6.0, firefox 1.0, Opera 8.0 通过测试
 * @version 1.1.0
 * @namespace org.xianyun.core
 * @author 闲耘 (HoToo)
 * @author hotoo.cn@gmail.com
 * @create 2006-6-15
 * @update 2006-6-17 using navigator.userAgent. thanks meizz.
 */

var Browser = {
    "isFirefox"  : navigator.userAgent.indexOf("Firefox") >= 0,
    "isIE"       : (navigator.userAgent.indexOf("MSIE")>=0) && (navigator.userAgent.indexOf("Opera")<0),
    "isMaxthon"  : navigator.userAgent.indexOf("Maxthon")>=0,
    "isMaxthon2" : navigator.userAgent.indexOf("Maxthon 2.0")>=0,
    "isNetscape" : navigator.userAgent.indexOf('Netscape') >= 0,
    "isOpera"    : navigator.userAgent.indexOf("Opera") >= 0,
    "isSafari"   : navigator.userAgent.indexOf("Safari")>=0,
	"isChrome"   : navigator.userAgent.indexOf("Chorme")>=0
};
Browser.height = function(){
	return document.documentElement.clientHeight||document.documentElement.offsetHeight;
};
Browser.width = function(){
	return document.documentElement.clientWidth||document.documentElement.offsetWidth;
};

/* version 1.0.0. thanks Robin Pan
var Browser = {
    "isIE" : document.all && window.ActiveXObject && !window.opera ,
    "isFirefox" : document.implementation && document.implementation.createDocument && !window.opera ,
    "isOpera" : window.opera 
};
*/

/* 2006-6-17
navigator.userAgent
ie6.0 : 
	Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)
firefox1.0 : 
	Mozilla/5.0 (Windows; U; Windows NT 5.0; zh-CN; rv:1.7.5) Gecko/20041124 Firefox/1.0 (ax)
opera 8.0
	Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; en) Opera 8.00
Chorme0.2
	Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13
	2008/9/3
*/