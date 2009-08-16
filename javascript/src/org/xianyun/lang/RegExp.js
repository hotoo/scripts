/*<![CDATA[*/
/**
 * 连接两个正则表达式。
 * 题外话：获得字符串常量""的长度，比构建空数组再求其长度效率高（忽略构建过程，求长度消耗时间相同）。
 * @param {RegExp} r 指定被连接的正则表达式对象。
 * @param {String} p 连接后的表达式使用的选项，由"i","g","m"组合而成。
 * @return {RegExp} 返回连接后的正则表达式。
 */
RegExp.prototype.concat = function(r, p){
	var i=(this.source.match(/\((?!\?:)/g) || "").length; // 正向预搜索。
	return new RegExp(this.source+r.source.replace(/\\(\d)/g, function($0, $1){
		return "\\" + (i+($1 | 0)); // 修正第二个表达式中的反向引用。注意这里的位运算。
	}), p);
};

/**
 * 返回正则表达式的标记字符串。
 * @return {String} 标记字符(i,m,g)依次组合。
 */
RegExp.prototype.flags = function(){
	return [this.ignoreCase?"i":"",this.multiline?"m":"",this.global?"g":""].join("");
//	return (this.ignoreCase?"i":"")+(this.multiline?"m":"")+(this.global?"g":"");
};

/**
 * for Regular Expression.
 * @overview Pattern
 * @version 2007/07/27
 * @author 闲耘 (hotoo.cn[AT]gmail.com)
 */
Pattern = {
    EMAIL : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    BLANK : /^[\s]*$/,
    URI : /^\w+:(\/\/\/|\/\/)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/,
    URL : /^http:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/,
	VAR : /^[a-zA-Z_]+[a-zA-Z0-9_]*$/,
	REGEXP:/(?:^|\W)\/.*?\/[img]*(?:\W|$)/,
	NUMBER:/(?:^|\W)([\+\-]?\d+(?:\.\d))|(0[0-7]+)|(0[xX][\da-fA-F]+)(?:\W|$)/
};
var Pattern = {
    URL:/^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/,
    EMAIL:/^\w+(?:[\-\+\.]\w+)*@\w+(?:[\-\.]\w+)*\.\w+(?:[\-\.]\w+)*$/,
    NUM:/^[\d]+(?:\.\d{1,2})?$/,
    DECIMAL:/^[\d]+(?:\.\d+)?$/,
    OCTAL:/0[0-7]+/,
    HEX:/^0[xX][0-9A-Fa-f]+\.[0-9A-Fa-f]+$/,
    INT:/^[0-9]+$/,
    DATE:/^\d{4}-(?:0?[1-9]|1[0-2])-(?:0?[1-9]|[12][0-9]|3[01])$/,
    TIME:/^(?:[01]?[0-9]|2[0-3])\:[0-5]?[0-9]\:[0-5]?[0-9]$/,
    DATE_TIME:/^\d{4}-(?:0?[1-9]|1[0-2])-(?:0?[1-9]|[12][0-9]|3[01])\s(?:[01]?[0-9]|2[0-3])\:[0-5]?[0-9]\:[0-5]?[0-9]$/,
    UPCASE:/^[A-Z]+$/,
    LOWCASE:/^[a-z]+$/,
    PASSWORD:/^[\d\w_]{6,12}$/,
    MOBILE:/^(?:147|15[0-35-9]|13[0-9]|18[05-9])\d{8}$/,
    PHONE:null,
    FAX:null,
    ID_CARD:null,
    IPv4:/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
    IPv6:null,
    HEX_COLOR:/^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$/
};

/*
/^[\u4e00-\u9fa5\uf900-\ufa2d]*$/
/^[\w\u4E00-\u9FA5\uF900-\uFA2D]*$/

/^[chr(0xa1)-chr(0xff)]+$/

[\u4e00-\u9fa5]

/^[chr(0xa1)-chr(0xff)]+$/
*/

/*]]>*/
