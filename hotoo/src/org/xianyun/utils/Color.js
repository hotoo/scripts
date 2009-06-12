/*<![CDATA[*/
/**
 * @overview Color类封装了默认sRGB颜色空间中的颜色。
 * @namespace org.xianyun.utils;
 * @constructor new Color(r,g,b,a);
 * @param {Number} r 指定颜色的Red分量，范围[0,0xFF]
 * @param {Number} g 指定颜色的Green分量，范围[0,0xFF]
 * @param {Number} b 指定颜色的Blue分量，范围[0,0xFF]
 * @param {Number} a 可选，范围[0,1]或[0,0xFF]，默认为0xFF，即完全不透明。
 * @see <a href="http://www.w3.org/pub/WWW/Graphics/Color/sRGB.html" target="_blank">
 * 		A Standard Default Color Space for the Internet - sRGB</a>
 * @author 闲耘 (mail[AT]xianyun.org)
 * @version 2006-6-15, 2008/3/20
 */
var Color = function(r, g, b, a){
    this._r, this._g, this._b, this._a;
	if ((r instanceof Number||typeof r==="number") && r>0 && r<0xFF &&
	  (g instanceof Number||typeof g==="number") && g>0 && g<0xFF &&
	  (b instanceof Number||typeof b==="number") && b>0 && b<0xFF){
		this._r=r; this._g=g; this._b=b;
		this._a=(a instanceof Number||typeof a==="number")&&a>=0&&a<=0xFF?a:0xFF;
	} else {
		throw new Error("Color:arguments invalid.");
	}
};
/**
 * @type {String} 浅绿色。
 */
Color.aqua = '#00ffff'; Color.AQUA = Color.aqua;
/**
 * @type {String} 黑色。
 */
Color.black = '#000000'; Color.BLACK = Color.black;
/**
 * @type {String} 蓝色。
 */
Color.blue = '#0000ff'; Color.BLUE = Color.blue;
/**
 * @type {String} 紫红色。
 */
Color.fuchsia = '#ff00ff'; Color.FUCHSIA = Color.fuchsia;
/**
 * @type {String} 灰色。
 */
Color.gray = '#808080'; Color.GRAY = Color.gray;
/**
 * @type {String} 绿色。
 */
Color.green = '#008000'; Color.GREEN = Color.green;
/**
 * @type {String} 橙色。
 */
Color.lime = '#00ff00'; Color.LIME = Color.lime;
/**
 * @type {String} 栗色。
 */
Color.maroon = '#800000'; Color.MAROON = Color.maroon;
/**
 * @type {String} 海蓝色，深蓝色。
 */
Color.navy = '#000080'; Color.NAVY = Color.navy;
/**
 * @type {String} 橄榄色。
 */
Color.olive = '#808000'; Color.OLIVE = Color.olive;
/**
 * @type {String} 紫色。
 */
Color.purple = '#800080'; Color.PURPLE = Color.purple;
/**
 * @type {String} 红色。
 */
Color.red = '#ff0000'; Color.RED = Color.red;
/**
 * @type {String} 银色。
 */
Color.silver = '#c0c0c0'; Color.SILVER = Color.silver;
/**
 * @type {String} 茶色。
 */
Color.teal = '#008080'; Color.TEAL = Color.teal;
/**
 * @type {String} 白色。
 */
Color.white = '#ffffff'; Color.WHITE = Color.white;
/**
 * @type {String} 黄色。
 */
Color.yellow = '#ffff00'; Color.YELLOW = Color.yellow;

/**
 * 验证指定的字符串是否符合十六进制颜色值表达法。
 * 十六进制颜色值表达法分完整写法(#FFFFFF)和简写(#FFF)两种格式。
 * @param {String} s 类似"#FFFFFF"或"#FFF"这样的字符串。
 * @return {Boolean} 符合则返回true，否则返回false。
 */
Color.validate = function(s){
	return /^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$/.test(s);
//	return /^#[0-9a-fA-F]{6}$/.test(s) || /^#[0-9a-fA-F]{3}$/.test(s);
};

/**
 * 将简写颜色值字符串格式化为完整的（六位十六进制）颜色值字符串。
 * #F90 &lt;=&gt; #FF9900
 * @exception {SyntaxError} 颜色值字符串不为类似"#FFF"或"#FFFFFF"这样的字符串时，抛出异常。
 * @param {String} s 指定颜色值格式的字符串。
 * @return {String} 返回以#开头，后接六位十六进制字符串格式的字符串。
 * @example <code>Color.format("#F90");</code>
 * result:"#FF9900"
 */
Color.format = function(s){
	if (/^#[0-9a-fA-F]{6}$/.test(s)){return s;}
	if (/^#[0-9a-fA-F]{3}$/.test(s)){// #F90 <=> #FF9900
		var a=s.replace("#","").split(""); a[0]=a[0]+a[0]; a[1]=a[1]+a[1]; a[2]=a[2]+a[2];
		return "#"+a.join("");
	}
	throw new SyntaxError("Color.format():syntax invalid.");
};

/**
 * 将类似"#FFFFFF"或"#FFF"这样的字符串解析为Color对象。
 * @exception {SyntaxError}
 * @param {String} s 指定被解析的字符串。
 * @return {Color}
 */
Color.parse = function(s){
	if (!Color.validate(s)) throw new Error("Color.parse():syntax invalid.");
	var a = Color.format(s).replace("#","").match(/../g);
	return new Color(parseInt(a[0],16), parseInt(a[1],16), parseInt(a[2],16));
};

/**
 * 将颜色值格式的字符串解析为颜色值，并按指定alpha系数返回颜色对应的透明色。
 * @exception {RangeError, SyntaxError}
 * @param {Object} s 指定颜色值字符串。
 * @param {Object} a 指定alpha系数，范围[0,255]。
 * @return {String} 返回类似"#ffffff"这样的颜色值字符串。
 */
Color.alpha = function(s, a){
	if (a<0||a>0xFF)
		throw new RangeError("Color.alphaColor():alpha out of range [0,255]");
	if (!Color.validate(s))
		throw new SyntaxError("Color.alphaColor():color syntax invalid.");
	var c = Color.format(s).replace("#","").match(/../g);
	for	(var i=0, t; i<3; i++){
		t = parseInt(0xFF-(0xFF-parseInt(c[i],16))*a/0xFF);
		c[i] = (t<16?"0":"")+t.toString(16);
	}
	return "#"+c.join("");
};
/**
 * 同Color.alpha，但是alpha系数范围在[0,1]之间。
 * @exception {RangeError, SyntaxError}
 * @param {String} s 指定颜色值格式字符串。
 * @param {Number} a 指定alpha系数，范围[0,1]。
 * @return {String} 返回类似"#ffffff"这样的颜色值字符串。
 */
Color.alpha1 = function(s, a){
	if (a<0||a>1)
		throw new RangeError("Color.alphaColor():alpha out of range [0,1]");
	if (!Color.validate(s))
		throw new SyntaxError("Color.alphaColor():color syntax invalid.");
	var c = Color.format(s).replace("#","").match(/../g);
	for	(var i=0, t; i<3; i++)	{
		t = parseInt(0xFF-(0xFF-parseInt(c[i],16))*a); // parseInt(parseInt(c[i],16)*a + 0xFF*(1-a));
		c[i] = (t<16?"0":"")+t.toString(16);
	}
	return "#"+c.join("");
};

Color.prototype.alpha = function(a){
	return Color.alpha(this.toString(), a===undefined?a:this._a);
};

Color.beta = function(s, a){
	if (!Color.validate(s)||a<0||a>0xFF)
		throw new RangeError("Color.alphaColor():alpha out of range [0,255], or color syntax invalid.");
	var c = Color.format(s).replace("#","").match(/../g);
	for	(var i=0, t; i<3; i++){
		t = parseInt(parseInt(c[i],16)*(1-a));
		c[i] = (t<16?"0":"")+t.toString(16);
	}
	return "#"+c.join("");
};

/**
 * 将指定颜色值字符串解析为颜色值，并返回其补色(即反转色)。
 * @param {String} c 指定颜色值字符串。
 * @return {String} 返回反转后的颜色值字符串。
 */
Color.complement = function(c){
	if (!Color.validate(c)) throw new SyntaxError("Color.complement():color syntax invalid.");
	var a = Color.format(c).replace("#","").match(/../g);
	for (var i=0, t; i<3; i++){
		t = 0xFF-parseInt(a[i],16);
		a[i] = (t<16?"0":"")+t.toString(16);
	}
	return "#"+a.join("");
};
Color.prototype.Complementary = function(){
    return Color.complement(this.toString(16));
};

/**
 * 将颜色对象转为类似"#FFFFFF"这样的字符串。
 * @return {String} 返回类似"#FFFFFF"这样的字符串。
 */
Color.prototype.toString = function(){
    return "#"+this._r.toString(16)+this._g.toString(16)+this._b.toString(16);
};

/**
 * 返回颜色值十六进制字符串。
 * @return {String}
 */
Color.prototype.valueOf = function(){
	return "#"+this._r.toString(16)+this._g.toString(16)+this._b.toString(16);
};
/*]]>*/