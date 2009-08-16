/*<![CDATA[*/
/**
 * @overview org.xianyun.system.String.js [methods, classes]
 * 系统内置（基本）类型（字符/串类）的方法扩展。
 * @namespace org.xianyun.lang;
 * @extends {Object}
 * @constructor {String}
 * @since IE 6.0, Firefox 1.0, Opera 8.0
 * @author 闲耘 (mail[AT]xianyun.org)
 * @version 2006/6/15
 */

// Copyright (c) HE Shi-Jun <hax.sfo at gmail dot com>, 2006
// Below codes can be used under GPL (v2 or later) or LGPL (v2.1 or later) license
// from : http://blog.csdn.net/hax/archive/2006/11/27/1416692.aspx
/**
 * Usage:
 *
 * var name = 'world';
 * var result = 'Hello $1!'.format(name);
 * result = "Hello world!"
 *
 * var letters = String.format('$1$2$3$4$5$6$7$8$9$10$11$12$13$14$15$16$17$18$19$20$21$22$23$24$25$26', 
 * 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
 * letters = "abcdefghijklmnopqrstuvwxyz"
 */
if (!String._FORMAT_SEPARATOR) {
	String._FORMAT_SEPARATOR = String.fromCharCode(0x1f);
	String._FORMAT_ARGS_PATTERN = new RegExp('^[^' + String._FORMAT_SEPARATOR + ']*'
		+ new Array(100).join('(?:.([^' + String._FORMAT_SEPARATOR + ']*))?'));
}
if (!String.format)
String.format = function (s) {
    return Array.prototype.join.call(arguments, String._FORMAT_SEPARATOR).
        replace(String._FORMAT_ARGS_PATTERN, s);
};
if (!''.format)
String.prototype.format = function () {
    return (String._FORMAT_SEPARATOR +
        Array.prototype.join.call(arguments, String._FORMAT_SEPARATOR)).
        replace(String._FORMAT_ARGS_PATTERN, this);
};

String.LOWCASE=String.LOW="abcdefghijklmnopqrstuvwxyz";
String.UPCASE=String.UP="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
String.NUMBER="0123456789";
String.SPECIAL="~`!@#$%^&*()_-+={[]}\\|;:\"'<,>.?/";

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
 * @deprecated System.line
 */
String.line=function(){
	var d=document.createElement("div"),t;
	d.innerHTML="A<br />\r\nB"; t=d.innerText;
	if(t.indexOf("\r\n")==1){return "\r\n";}
	if(t.indexOf("\n")==1){return "\n";}
	return "\r";
}();

/**
 * 取得一个指定范围内，指定长度的随机字符串。
 * @param {String} s 指定字符串范围集合。
 * @param {Number} l length.
 * @example "ABC".random(6);
 */
String.random = function(s,l){
	var r=[],L=s.length;
	for(var i=0; i<l; i++){
		r[i] = s.charAt(Math.random()*L);
	}
	return r.join("");
};
String.prototype.random = function(l){
	return String.random(this,l);
};

/**
 * UUID(GUID in Windows)
 * @see http://www.broofa.com/blog/?p=151
 * @see http://www.ietf.org/rfc/rfc4122.txt
 * @see http://blog.csdn.net/nidehong/archive/2006/11/22/1406125.aspx
 * @return {String} 
 */
String.randomUUID = function(){
  var s = [], itoh = '0123456789ABCDEF';

  // Make array of random hex digits. The UUID only has 32 digits in it, but we
  // allocate an extra items to make room for the '-'s we'll be inserting.
  for (var i = 0; i < 36; i++) s[i] = Math.floor(Math.random()*0x10);

  // Conform to RFC-4122, section 4.4
  s[14] = 4;  // Set 4 high bits of time_high field to version
  s[19] = (s[19] & 0x3) | 0x8;  // Specify 2 high bits of clock sequence

  // Convert to hex chars
  for (var i = 0; i < 36; i++) s[i] = itoh.charAt(s[i]); // itoh[s[i]];

  // Insert '-'s
  s[8] = s[13] = s[18] = s[23] = '-';

  return s.join('');
};

/**
 * 题目： 一个字符串可以通过增加一个字符，删除一个字符，替换一个字符得到另外一个字符串，
 * 假设，我们把从字符串A转换成字符串B，前面3种操作所执行的最少次数称为AB相似度
 * 如  abc adc  度为 1
 *    ababababa babababab 度为 2
 *    abcd acdb 度为2
 *
 * 字符串相似度算法可以使用 Levenshtein Distance算法(中文翻译：编辑距离算法) 
 * 这算法是由俄国科学家Levenshtein提出的。其步骤
 * Step Description
 * 1    Set n to be the length of s.
 *      Set m to be the length of t.
 *      If n = 0, return m and exit.
 *      If m = 0, return n and exit.
 *      Construct a matrix containing 0..m rows and 0..n columns.
 * 2    Initialize the first row to 0..n.
 *      Initialize the first column to 0..m.
 * 3    Examine each character of s (i from 1 to n).
 * 4    Examine each character of t (j from 1 to m).
 * 5    If s[i] equals t[j], the cost is 0.
 *      If s[i] doesn't equal t[j], the cost is 1.
 * 6    Set cell d[i,j] of the matrix equal to the minimum of:
        a. The cell immediately above plus 1: d[i-1,j] + 1.
        b. The cell immediately to the left plus 1: d[i,j-1] + 1.
        c. The cell diagonally above and to the left plus the cost: d[i-1,j-1] + cost.
 * 7    After the iteration steps (3, 4, 5, 6) are complete, the distance is found in cell d[n,m].
 * @see http://www.cppblog.com/whncpp/archive/2008/09/21/62378.html
 * @param {String} t Target string.
 * @return {Number}
 */
String.prototype.distance = function(t){
	var s = this, // Source.
	n = s.length,
	m = t.length;
	if(n==0){return m;}
	if(m==0){return n;}
	
	var v = []; // 2D Array.
//	[[00,01,02,...,0n],
//	 [10,11,12,...,1n],
//	 ...,
//	 [m0,m1,m2,...,mn]]
	for(var j=0; j<=n; j++){
		for(var i=0,c,a,l,d; i<=m; i++){ // cost, above, left, diag.
			if (j==0){
				v[i] = [];
				v[i][0] = i;
			}else if(i==0){
				v[0][j] = j;
			}else {
				c = s.charAt(j)==t.charAt(i)?0:1;
				v[i][j] = c;
				var a = v[i-1][j]+1;
				var l = v[i][j-1]+1;
				var d = v[i-1][j-1]+c;
				v[i][j] = Math.min(a, Math.min(l,d));
			}
		}
	}
	return v[m][n];
};

/**
 * 判断两个字符串：
 *   如果相等，则返回0；
 *   如果目标字符串（t）是在源字符串（s）的基础上，两头拼上字符串（既s是t的子字符串），则返回1；
 *   如果目标字符串是在源字符串基础上删除两头（或一头，即t是s的子字符串），则返回2；
 *   其他（中间拼接，中间删除，其他复杂类型）则返回3。
 * 用途，安装关键字搜索/过滤：
 *   相等则不重新搜索；
 *   两头拼接则在之前的结果集中搜索（概率大，能较大程度提高效率）；
 *   两头删除则新结果集可以在旧结果集上（临时）增量输出；
 *   其他则需要从完整集合中重新搜索。
 * @param {String} t Target String.
 * @return {Number}
 */
String.prototype.different = function(t){
	var s = this;
	if(s==t){return 0;} // equals.
	if(s.length<t.length && t.indexOf(s)>=0){ // s is substring of t.
		return 1;
	}else if(s.length>t.length && s.indexOf(t)>=0){ // t is substring of s.
		return 2;
	}else{ // others.
		return 3;
	}
};

/**
 * ! localeCompare.
 */
String.prototype.compare = function(){};

/**
 * 字符串按顺序反转。
 * @return {String} 返回反转后的字符串引用。
 * @version 2007/06/29, 2008/3/30
 */
String.prototype.reverse = function(){
	return this.split("").reverse().join("");
//	var s = "";
//	for (var i=this.length-1; i>=0; i--){
//		s += this.charAt(i);
//	}
//	return s;
};

/**
 * 字符串大小写反转。
 * 需要引用 org.xianyun.lang.Character
 * @return {String}
 * @version 2007/06/29
 */
String.prototype.reverseCase = function(){
    var s = "";
    for (var i=0; i<this.length; i++){
        s += Character.reverseCase(this.charAt(i));
        //s += new Character(this.charAt(i)).reverseCase();
    }
    return s;
};

/**
 * 将首字母转为大写。
 * @return {String}
 */
String.prototype.upperCaseInitial = function(){
	var s = this.lTrim();
	if (!s)return this;
	return s.charAt(0).toUpperCase()+s.substr(1);
};

/**
 * 将以横杠连接的字符串，大写横杠后的首字母去掉横杠，并拼接起来。
 * @return {String}
 * @example
 * "color".camelize(); // "color".
 * "background-color".camelize(); // "backgroundColor".
 * "text-underline-position".camlize(); // "textUnderlinePosition".
 */
String.prototype.camelize = function(){
	return this.replace(/\-(\w)/g, function($0, $1){ // 三个横杠以内效率较高(IE6)。
		return $1.toUpperCase();
	});
//	return this.replace(/(\w+)(?:\-(\w)(\w?))+/g, function($0,$1,$2,$3){ // 多个横杠时效率较高(IE6)。
//		return $1+$2.toUpperCase()+$3;
//	});
};
/*
String.prototype.camelize = function() {
    var parts = this.split('-'), len = parts.length;
    if (len == 1) return parts[0];

    var camelized = this.charAt(0) == '-'
      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
      : parts[0];

    for (var i = 1; i < len; i++)
        camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;
};*/

/**
 * 将字符串大写字母转为小写并前加横杠后拼接起来。
 * @return {String}
 * @example
 * "color".decamelize(); // "color".
 * "backgroundColor".decamelize();// "background-color".
 * "textUnderlinePosition".decamelize(); // "text-underline-position".
 */
String.prototype.decamelize = function(){
	return this.replace(/([A-Z])/g, "-$1").toLowerCase(); // 效率较下面高一倍。
//	return this.replace(/([A-Z])/g, function($0,$1){
//		return "-"+$1.toLowerCase();
//	});
};

/**
 * 将字符串重复i次后返回。
 * @param {Number} i 指定重复次数。
 * @return {String}
 */
String.prototype.repeat = function(i){
	return new Array(1+(i||0)).join(this);
//	var s=[];for(; i>0; i--){s[s.length]=this;}return s.join("");
//	var s="";for(; i>0; i--){s+=this;}return s;
};

/**
 * 判断字符串是否包含有指定的子字符串。
 * @param {String} str 指定的子字符串。
 * @return {Boolean}
 */
String.prototype.contains = function(str){
	return this.indexOf(str)>=0;
};

/**
 * 数值字符串转换成十六进制表示。
 * @return {String}
 * @version 2007/06/30
 */
String.prototype.toHex = function(){
    return Number(this).toString(16);
};

/**
 * 去掉字符串左边无效空格。
 * @return {String}
 */
String.prototype.lTrim = function(){
    return this.replace(/^\s+/, '');
};

/**
 * 去掉字符串右边无效空格。
 * @return {String}
 */
String.prototype.rTrim = function(){
    return this.replace(/\s+$/, '');
};

/**
 * 去掉字符串左右两边无效空格。 
 * @return {String}
 */
String.prototype.trim = function(){
    return this.replace(/^\s*(.*?)\s*$/, "$1"); // 两端空白字符贪婪匹配，中间字符非贪婪匹配。
	//return this.lTrim().rTrim();
    //return this.replace(/(^\s+)|(\s+$)/g, '');
};

/**
 * 获得字符串左边l个字符。
 * @param {Number, Integer} l 指定选取长度。
 * @return {String}
 */
String.prototype.left = function(l){
    return this.substr(0, l);
};

/**
 * 返回字符串从起始位置到结束位置之间的字符串片段。
 * @param {Number} s 起始位置。
 * @param {Number} e 结束位置。
 * @return {String}
 */
String.prototype.mid = function(s,e){
	return this.substring(s,e);
};

/**
 * 获取字符串右边length个字符。
 * @param {Number, Integer} l 指定选取长度。
 * @return {String}
 */
String.prototype.right = function(l){
    return this.substr(this.length-l, l);
};

/**
 * charAt的反向查找。
 * @param {Number} i 指定查找的索引位置，默认为0。
 * @return {String} 返回指定索引位置上的(单个)字符。
 */
String.prototype.lastCharAt = function(i){
	return i>=this.length?"":this.substr(this.length-1-(i||0),1);
//	var l = this.length-1;
//	return i>l?"":this.substr(l-(i||0),1);
};

/**
 * 字符串是否以字符串suffix后缀结尾。
 * @param {String} suffix 相比较的后缀。
 * @return {Boolean}
 */
String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix)===this.length-suffix.length;
//	return (this.substr(this.length - suffix.length) == suffix);
};
String.prototype.endsWith = function(s){
	if(s instanceof RegExp){
		return (s.source.endsWith("$")?s:s.concat(/$/,s.flags())).test(this);
	}
	return this.indexOf((typeof s==="string"||s instanceof String)?s:s.toString());
};

/**
 * 字符串是否以字符串prefix前缀开始。
 * @param {String} prefix 相比较的前缀。
 * @return {Boolean}
 */
String.prototype.startsWith = function(prefix) {
	return this.indexOf(prefix)===0;
//	return (this.substr(0, prefix.length) === prefix);
//	return new RegExp("^"+prefix.toESC4RegExp()).test(this);
};
String.prototype.startsWith = function(s){
	if(s instanceof RegExp){
		return s.source.startsWith("^")?s.test(this):/^/.concat(s,s.flags()).test(this);
	}
	return this.indexOf((typeof s==="string" || s instanceof String)?s:s.toString());
};

/**
 * 字符串是否以字符c前缀开始。
 * @param {String, Character} c
 * @return {Boolean}
 */
String.prototype.startWith = function(c){
    return (this.charAt(0) == c);
};

/**
 * 字符串是否以字符c后缀结束。
 * @param {String, Character} c
 * @return {Boolean}
 */
String.prototype.endWith = function(c){
    return (c == this.charAt(this.length - 1));
};

/**
 * 得到字符串的字节长度 (双字节换算为两个单字节)
 * @return {Number, Integer}
 */
String.prototype.getActualLength = function(){
	return this.replace(/[^\x00-\xff]/g,"xx").length;
//	return this.length+this.replace(/[\x00-\xff]/g,"").length; // 如果可以快速取得表达式(双字节/单字节)匹配次数，两值相加应该比较高效。
//	return this.length+(this.match(/[^\x00-\xff]/g)||"").length;
};
String.prototype.getLength = String.prototype.getActualLength;
String.prototype.byteLength

/**
 * 比较当前字符串对象与指定对象的值是否相等，忽略大小写。
 * @param {String, Object} s
 * @return {Boolean}
 */
String.prototype.equalsIgnoreCase = function(s){
    return this.toLowerCase() == s.toLowerCase();
};

/**
 * 检查当前字符串对象的值是否是空字符串("")。
 * @return {Boolean}
 */
String.prototype.isEmpty = function(){
    return (this==="" || this.length===0);
};

/**
 * 检查当前字符串对象是否是空白字符串（全部是空格，回车，换行，换页等）。
 * @return {Boolean} 如果全部是空白字符串，则返回true，否则返回false。
 */
String.prototype.isBlank = function(){
    return /^\s*$/.test(this);
};

/**
 * 将HTML转换成纯文本（去掉标签）
 * @return {String}
 * @example "<h3>titles</h3><p>content texts</p>others.".toPlainText();
 * result:"titlescontent textsothers."
 */
String.prototype.toPlainText = function(){
//!	return this.replace(/<.*?>/, ""); // 非贪婪匹配
	return this.replace(/<[^>]*>/g, '');
};

/** 检查当前字符串对象的值是否符合Email格式。
 * @param void.
 * @return Boolean.
 */
String.prototype.isEmail = function(){
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this);
};

/** 检查当前字符串对象的值是否符合URI格式。
 * @param void.
 * @return Boolean.
 */
String.prototype.isUri = function(){
    // @TODO
    alert('perfecting...');
    return /^\w+:(\/\/\/|\/\/)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/.test(this);
};

/** 检查当前字符串对象的值是否符合URL格式。
 * @param void.
 * @return Boolean.
 */
String.prototype.isUrl = function(){
    return /^http:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/.test(this);
};

/**
 * 将字符串以指定长度（双字节字符长度为2）截取。
 * @param {Number} l 指定截取长度。
 * @param {String} e 指定结尾字符串，默认为"..."。
 */
String.prototype.cut = function(l,e){
	if(this.getLength()<=l){return this;}
	if(e==undefined){e="...";}
	var L=l-e.length, I=0, i=0, r=/[\x00-\xff]/;
	while(I<L){
		I+=r.test(this.charAt(i))?1:2;
		i++;
	};
	return this.substr(0,i)+e;
};
/**
 * 同String.prototype.cut，但每单位长度作为两个字节长度，参考示例。
 * @param {Number} l 指定截取长度（注意：每一个单位长度作为2个字节长度）。
 * @param {String} e 指定结尾字符串，默认为空字符串("")。
 * @example 
 * "abc".cut2(1); // "ab"
 * "a好".cut2(1); // "a"
 * "ABC".cut2(1,"..."); // "AB..."
 * "ABC".cut2(2,"..."); // "ABC"
 */
String.prototype.cut2 = function(l,e){
	var a=this.match(/[^\x00-\xff]|\w{1,2}/g);
	return a.length<l?this:a.slice(0,l).join("")+(e||"");
};
/**
 * 截取固定长度子字符串。
 * @param {Number, Integer} iLen 需截取的长度值。
 * @return {String}
 * @deprecated cut, cut2
 */
String.prototype.getIntercepted = function(iLen){
    if(this.getActualLength() <= iLen){
		return this;
	}
	var ELIDED = "...";
	
	var str = "";
	var l = 0;
	var schar;
	for(var i=0; schar=this.charAt(i); i++){
		str += schar;
		l += (schar.match(/[^\x00-\xff]/) != null ? 2 : 1);
		if(l >= iLen - ELIDED.length){
			break;
		}
	}
	str += ELIDED;
	
	return str;
};

/**
 * 判断当前字符串对象是否符合日期格式。
 * @return {Boolean}
 */
String.prototype.isDateTime = function(){
    return this && !isNaN(new Date(this.replace(/\-/g, "/")));
    /*if(! this) return false;
    if(isNaN(new Date(this.replace(/\-/g, '/'))))
        return false;
    else
        return true;*/
};

/**
 * 将当前字符串对象转换成对于值的日期对象。
 * @return {Date}
 */
String.prototype.toDate = function(){
    return new Date(this.replace(/-\/\\/g, '/'));
};

/** 判断当前字符串对象的类型是否为type。
 * @param type, String. 相比较的类型值。
 * @return Boolean.
 * @see Number.prototype.typeOf()
 * @ps 此方法没有实用价值。
 */
//String.prototype.typeOf = function(){
//    return "String";
//};

String.prototype.toArray = function(){
	return this.split("");
};

/**
 * 将字符串转换成字符数组
 * 空字符('')串将返回空数组([])。
 * @return {Array}
 */
String.prototype.toChars = String.prototype.toCharArray = function(){
    var chars = new Array();
    for (var i = 0; i < this.length; i++){
        chars.push(this.charAt(i));
    }
    return chars;
};

/**
 * 将当前字符串对象的值的转义文本转换成对于值，如 "&lt;" -> "<"...
 * 可用于将文本放入文本框前的转换。
 * @return {String}
 */
String.prototype.toText = function(){
	var text = this;
	text = text.replace(/<br\s*\/?>/ig, String.line);//"\n"
	text = text.replace(/&lt;/gi, "<");
	text = text.replace(/&gt;/gi, ">");
	text = text.replace(/&quot;/gi, '"');
	text = text.replace(/&#039;/g, "'");
	text = text.replace(/&nbsp;/g, " ");
	text = text.replace(/&amp;/gi, "&");
	return text;
};

/** 
 * 将当前字符串对象的值转换成转义文本。如 "<" -> "&lt;"...
 * 可用于将文本显示为HTML前的转换。
 * @return {String}
 */
String.prototype.toHTML = function(){
	var html = this;
	html = html.replace(/&/g, '&amp;');
	html = html.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
	html = html.replace(/ /g, '&nbsp;');
	html = html.replace(/</g, '&lt;');
	html = html.replace(/>/g, '&gt;');
	html = html.replace(/\"/g, '&quot;');
	html = html.replace(/\'/g, '&#039;');
	html = html.replace(/\r\n|\r|\n/g,"<br />");
	return html;
};

/**
 * 为正则表达式中特殊字符转义，加上反斜杠(\)。
 * 可用于将字符串作为创建正则表达式的参数前的转换。
 * @return {String}
 * @deprecated
 */
String.prototype.getEspecialCharacter = function(){
    var esp = new Array('!', '$', '^', '*', '\\', '/', '?', '.', '+', '[', ']', '-', '\'');
    var c = this;
    for (var i = 0; i < esp.length; i++){
        c = c.replace(new RegExp('\\' + esp[i], 'g'), '\\' + esp[i]);
    };
    return c;
};
// @create 2007/06/28 for org.xianyun.ui.helper.HTAutoComplete2
String.prototype.toESC4RegExp = function(){
    return this.replace(/\!/g, "\\!").replace(/\\/g, "\\\\").replace(/\//g, "\\/").replace(/\./g, "\\.").replace(/\$/g, "\\$").replace(/\*/g, "\\*").replace(/\^/g, "\\^").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/\[/g, "\\[").replace(/\]/g, "\\]").replace(/\{/g, "\\{").replace(/\}/g, "\\}").replace(/\?/g, "\\?").replace(/\+/g, "\\+").replace(/\-/g, "\\-").replace(/\"/g, '\\"').replace(/\'/g, "\\'").replace(/\|/g, "\\|").replace(/\,/g, "\\,");
};

String.TO_ESC_DATA = [
	[/\!/g, "\\!"], [/\\/g, "\\\\"], [/\//g, "\\/"], [/\./g, "\\."], [/\$/g, "\\$"],
	[/\*/g, "\\*"], [/\^/g, "\\^"], [/\(/g, "\\("], [/\)/g, "\\)"], [/\[/g, "\\["],
	[/\]/g, "\\]"], [/\{/g, "\\{"], [/\}/g, "\\}"], [/\?/g, "\\?"], [/\+/g, "\\+"],
	[/\-/g, "\\-"], [/\"/g, '\\"'], [/\'/g, "\\'"], [/\|/g, "\\|"], [/\,/g, "\\,"]];
String.prototype.toESC = function(){
	var s = this, e = String.TO_ESC_DATA;
	for (var i=0,l=e.length; i<l; i++){
		s = s.replace(e[i][0], e[i][1]);
	}
	return s;
};
/**
 * 计算字符串中包含子字符串的个数。
 * @param {String} c 指定的子字符串。
 * @return {Number} 返回所包含子字符串个数。
 */
String.prototype.counter = function(c){
	return this.split(c).length-1;
//	return this.replace(new RegExp(c.toESC4RegExp(), "g"), "1").length;
//!	return this.replace(new RegExp("[^"+c.toESC4RegExp()+"]", "g"), "").length; //仅能准确匹配单个字符(char)。
//	return this.match(new RegExp(c.toESC4RegExp(),"g")).length;
//	for...
};
/**
 * 将当前字符串中连续重复出现的字符/串c替换掉。即"cc", "ccccc"替换为"c"
 * @param {null, String} c 为null或空字符串时替换掉所有的重复字符/串，
 *  否则仅替换连续重复的c。
 * @return {String}
 */
String.prototype.unrepeat = function(c){
    return this.replace(new RegExp("("+(c?c.toESC4RegExp():".")+")+", "g"), "$1");
};

/**
 * 返回字符串中汉字对应的拼音，
 *   如果指定分隔符，则每个拼音以分隔符间隔（不能找到拼音的字符保持原样，包括间隔），否则各拼音相连；
 *   如果要求不返回全拼，则返回拼音首字母；否则返回全拼；
 *   如果指定处理函数，则在不能找到拼音时（包括英文字符），使用指定函数处理并返回，否则原样返回。
 * @param {String} p 指定分隔符。
 * @param {Boolean} b 指定全拼要求。
 * @param {Function} f 指定处理函数。
 * @return {String} 返回字符串的拼音。
 * @example <code>
 * "你好，hotoo.☆".pinyin(" ", true, function(c){
 * 		return "?";
 * });
 * </code>
 * result : "ni hao，hotoo.?"
 */
String.prototype.pinyin = function(p, b, f){
	var a = this.split("");
	for (var i=0, l=a.length; i<l; i++){
		var s = Character.pinyin(a[i], b);
		a[i] = (s===a[i]?((f instanceof Function)?f(s):s):s+(p||""));
	}
	return a.join("");
};

/**
 * 替换字符串中所有的形如{var}样的字符串成变量var的值。
 * @return {String} 返回解析后的字符串。
 */
String.prototype.mode=function(){
	var r=this.toString();
	if(/{[\w|\.]+}/.test(this)){
		var matches=this.match(/{([\w|\.]+)}/g);
		for(var i=0;i<matches.length;i++){
			try{
				r=r.replace(matches[i],eval(matches[i].replace("{","").replace("}","")));
			}catch (e){}
		}
	}
	return r;
};
/**
 *字符串批量替换
 *@param 数组
 *@returns string
 *@type string
 */
String.prototype.alter=function(arr,order){
	var str=this.toString();
	for(var i=0;i<arr.length;i++){
		try{
		if(order){
			str=str.replace(typeof(arr[i][1])=="object"?arr[i][1]:
				new RegExp(arr[i][1].replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g,"\\$1"),"g"),arr[i][0]);
		}else{
			str=str.replace(typeof(arr[i][0])=="object"?arr[i][0]:
				new RegExp(arr[i][0].replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g,"\\$1"),"g"),arr[i][1])
		}
		}catch(e){}
	}
	return str;
};

/**
 * 对字符串进行base64编码。
 * @param {Object} s 可选项。true 或 false，true则为base64编码，false则为 “_______base64”+base64编码，指明为base64编码，以便解码时识别。
 */
String.prototype.b64=function(s)
{
    var input=this;
	//var arr=[["＜br＞","\n"],["│","|"],["＆","&"],["＝","="],["＋","+"],["＜quot＞","'"],["＇","'"],["＂",'"']];
	//return input.alter(arr,1);
    var keyStr = "ABCDEFGHIJKLMNOP" +	"QRSTUVWXYZabcdef" +	"ghijklmnopqrstuv" +	"wxyz0123456789+/" +	"=";
    //input = input.replace(/[\']/g,"\'").replace(/\"/g,'\"');
    var output = "";
	input=encodeURI(input);
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    do
    {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)){
            enc3 = enc4 = 64;
        }else if (isNaN(chr3)){
            enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    }while (i < input.length);
    return (s?"":"_______base64")+output;
};
String.prototype.ub64=function (really)
{
    var input=this.toString();
	var arr=[["＜br＞","\n"],["│","|"],["＆","&"],["＝","="],["＋","+"],["＜quot＞}","'"],["＇","'"],["＂",'"'],["<br><br>","||"]];
//	if(!really)
//	{
//		return input.alter(arr);
//	}
	if(input.trim().indexOf("_______base64")!=0)
	{
		return input;
	}
	input=input.replace("_______base64","");
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do
    {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64)
        {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64)
        {
            output = output + String.fromCharCode(chr3);
        }
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    }while (i < input.length);
	if(decodeURI(output).length<2)
	{
		return "";
	}
    return decodeURI(output);
};
/*]]>*/