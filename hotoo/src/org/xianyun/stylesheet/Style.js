/*<![CDATA[*/
/** 获得元素对象的样式值。
 * @class org.xianyun.style.Style.js
 * @version 2007/08/23
 * @author 闲耘 (hotoo.cn[AT]gmail.com)
 */

var Style = {};

/**
 * 动态导入外部样式文件。
 * @param {String} url 指定样式文件地址。
 */
Style.load = function(url){
	var c = document.createElement("link");
	c.rel = "stylesheet";
	c.type = "text/css";
	c.href = url;
	var h = document.getElementsByTagName("head");
	if (h.length>0) h[0].appendChild(c);
	else document.body.appendChild(c);
};
Style.getStyle = function(oElm, strCssRule){
    var strValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle){
        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
    }else if(oElm.currentStyle){
        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
        strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
};

/**
 * 此方法不能正确获取float的值， 因为float是JavaScript的保留字，
 * 所以IE中使用styleFloat作为脚本属性名，Firefox使用cssFloat，Opera两者都支持。
 * 另外sProperty参数的大小写也会导致无法正确获取属性值。
 *
 * @see Prototype 1.5.0_rc2
 * @param {HTMLElement} e 目标HTML元素。
 * @param {String} s 指定样式名称。
 */
Style.get = function(element, style) {
    var inline = (style == 'float' ?
        (typeof element.style.styleFloat != 'undefined' ? 'styleFloat' : 'cssFloat') : style);
    var value = element.style[inline.camelize()];
    if (!value) {
		if (document.defaultView && document.defaultView.getComputedStyle) {
			var css = document.defaultView.getComputedStyle(element, null);
			value = css ? css.getPropertyValue(style) : null;
		} else if (window.getComputedStyle) {
			return window.getComputedStyle(element, null).getPropertyValue(style);
		} else if (element.currentStyle) {
			value = element.currentStyle[inline.camelize()];
		}
	}
	return value;
};

Style.set = function(element, style) {
    for (name in style)
      	element.style[name.camelize()] = style[name];
};
/**
 * @ignore 未完成。
 * @param {Object} s
 */
Style.parse = function(s){
	var r=[], re=/(.+?\:.*?)(?:;|$)/g, rr=/^(.+?)\:(.*?);$/, a=s.match(re);
	for(var i=0,l=a.length; i<l; i++){
		var b = a[i].match(rr);//alert(b);
		r[r.length] = [b[1], b[2]];
	}alert(a[1]);
	return r;
};
/**
 * 为指定元素对象设置样式。
 * @param {HTMLElement} e 指定元素对象。
 * @param {String} t 指定样式定义。
 */
Style.setText = function(e, t){
	e.style.cssText = t;
};
/*]]>*/