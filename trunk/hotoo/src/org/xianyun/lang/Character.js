/*<![CDATA[*/
/** 
 * @overview org.xianyun.lang.Character
 * @author 闲耘 (mail[AT]xianyun.org)
 * @version 2007/06/29
 */
var Character = function(c){ // 单个字符类
    if (c.length!==1 || !(typeof(c)==="string") || !(c instanceof String)){
        throw new Error("[Error:Arguments error.\nclass:org.xianyun.system.Character]");
    }
    this._v = c.charAt(0); // private:
    this._c = c.charCodeAt(0); // public:readonly.
};

/**
 * 取指定字符对应的拼音。
 * 需要使用org.xianyun.encoding.PinYinDictionary.js
 * @param {String, Character} c 指定目标字符。
 * @param {Boolean} b 是否返回拼音的全拼。
 * @param {Function} f 遇到非汉字/无法取拼音的字符，使用该方法处理；未指定该方法则原文返回（不处理）。
 * @return {String} 返回字符对应的拼音。
 */
Character.pinyin = function(c, b, f){
	var i = c.charCodeAt(0);
	b = (b===null||b===undefined)?true:!!b;
	if (!Character.isChinese(c)){
		return f instanceof Function?f(c):c;
	}
	if (i>18000){
		var p = PinYinDictionary.b[PinYinDictionary.a[i-18000]];
		if (p===undefined){
			return f instanceof Function?f(c):c;
		}
		return b?p:p.charAt(0);
	}
	return c;
//	if(word.length==1&&word.charCodeAt()>18000)
//		return PinYinDictionary.b[PinYinDictionary.a[word.charCodeAt()-18000]]||"?";
//	else return word;
};

Character.reverseCase = function(c){ // 单个字符大小写反转，静态方法。实现I:
    var d = c.charCodeAt(0);
    if (d>=65 && d<=90){ // A-Z
        return c.toLowerCase();
    }else if(d>=97 && d<=122){ // a-z
        return c.toUpperCase();
    }else {
        return c;
    }
};

Character.reverseCase2 = function(c){ // 单个字符大小写反转，静态方法。实现II:
    var d = c.charCodeAt(0);
    if (d>=65 && d<=90){ // A-Z
        return String.fromCharCode(d+32);
    }else if(d>=97 && d<=122){ // a-z
        return String.fromCharCode(d-32);
    }else {
        return c;
    }
};

Character.reverseCase3 = function(c){ // 单个字符大小写反转，静态方法。实现III:
    if (c.toLowerCase()==c){ // 字符本身是小写
        return c.toUpperCase();
    }else {
        return c.toLowerCase();
    }
};

Character.prototype.reverseCase = function(){ // 单个字符大小写反转，成员方法。
    return Character.reverseCase(this._v);
};

Character.charCode = function(c){
    return c.charCodeAt(0);
};

Character.prototype.charCode = function(){
	return Character.charCode(this._v);
};

Character.prototype.equals = function(c){
    return (c instanceof Character || c instanceof String || typeof c==="string") &&
	  (this._v===c || c.equals(this._v));
};

Character.prototype.isLower = function(){
	return /^[a-z]$/.test(this);
};

Character.prototype.isUpper = function(){
	return /^[A-Z]$/.test(this);
};

/**
 * 判断指定字符/串是否为中文。
 * @param {String, Character} c 指定的字符/串。
 * @return {Boolean} 指定字符/串全部为中文时返回true，否则返回false。
 */
Character.isChinese = function(c){
	return /^[\u4e00-\u9fa5]$/.test(c);
};

Character.prototype.isChinese = function(){
	return /^[\u4e00-\u9fa5]$/.test(this._v);
};

Character.prototype.toString = function(){
    return this._v;
};

Character.prototype.valueOf = function(){
    return this._v;
};

/*]]>*/