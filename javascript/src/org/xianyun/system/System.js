/*<[CDATA[*/

var System = {};
System.out = {};
System.out.print = function(string){
    document.write(string);
};
System.out.println = function(string){
    document.write(string+"<br />");
};

var printf = function(s){
	
};

/**
 * 操作系统相关。
 */
var OS = OperatingSystem = {
	isWindows: navigator.userAgent.indexOf("Windows")>=0,
	isUnix: navigator.userAgent.indexOf("Unix")>=0,
	isLinux: navigator.userAgent.indexOf("Linux")>=0,
	isMacintosh:navigator.userAgent.indexOf("Mac")>=0,
	isMac:navigator.appVersion.indexOf("Mac")!=-1,
	isDOS : false
};
/**
 * @type {String} 兼容Windows,Unix,Linux,Macintosh的回车换行符。
 */
OS.SEPARATOR = (OS.isLinux||OS.isUnix)?"\n":OS.isMac?"\r":"\r\n";
/**
 * 浏览器使用的换行符。
 * @type {String} 浏览器使用的换行符。
 * @see HTMLElement.innerText非IE浏览器实现参考DHTML.js
 * @example "a<br />b".replace(/<br\s*\/?>/ig, String.line);
 * 
 * java:System.getProperty("line.separator");
 * 
 * var c=a.innerText;
 * c.indexOf("\r\n")+","+c.indexOf("\r")+","+c.indexOf("\n")
 */
System.line=function(){
	var d=document.createElement("div"),t;
	d.innerHTML="A<br />\r\nB"; t=d.innerText;
	if(t.indexOf("\r\n")==1){return "\r\n";}
	if(t.indexOf("\n")==1){return "\n";}
	return "\r";
}();

/**
 * <OBJECT ID=dlgHelper CLASSID="clsid:3050f819-98b5-11cf-bb82-00aa00bdce0b" WIDTH="0px" HEIGHT="0px"></OBJECT>
 * @since IE5
 */
OS.FONTS = [];
OS.FONTS.init = function(){
	for (var i=1, l=dlgHelper.fonts.count; i<l;i++){
		OS.FONTS[i] = dlgHelper.fonts(i);
	}
	return OS.FONTS;
};

OS.BLOCK_FORMATS = [];
OS.BLOCK_FORMATS.init = function(){
	for (var i=0, l=dlgHelper.blockFormats.count; i<l; i++){
		OS.BLOCK_FORMATS[i] = dlgHelper.blockFormats[i];
	}
	return OS.BLOCK_FORMATS;
};
/*]]>*/