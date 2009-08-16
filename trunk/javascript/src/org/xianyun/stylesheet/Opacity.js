/*<![CDATA[*/

/**
 * 对象的不透明性操作。
 * @since IE5.0+, Firefox1.0+, Opera8.0+
 * @author 闲耘 (xianyun.org, hotoo.cn[AT]gmail.com)
 * @version 2007/10/04
 */
var Opacity = new Object();
/**
 * 为指定元素对象设置不透明性。
 * @param {HTMLElement} elem 指定的被设置元素对象。
 * @param {Number} value 不透明性值，0.0(完全透明)到1.0(完全不透明)的浮点型。
 */
Opacity.setValue = function(elem, value){
	var s=elem.style;
    if(s.filter!==undefined){ // IE.
        s.filter="alpha(opacity="+(value*100)+")";
    } else if(s.MozOpacity!==undefined){ // Firefox.
        s.MozOpacity=value;
    } else if (s.opacity!==undefined){ // w3c(Firefox, Opera).
		s.opacity=value;
	} else if(s["-moz-opacity"]!==undefined){
		s["-moz-opacity"]=value;
	}
};

/**
 * 获得指定对象的不透明性值。
 * @author 闲耘 (xianyun.org, hotoo.cn[AT]gmail.com)
 * @param {HTMLElement} elem 指定的对象。
 * @return {Number} 指定对象的不透明性值(0.0 - 1.0)。
 */
Opacity.getValue = function(elem){
	var s = elem.style;
    if (s.filter!==undefined){ // IE.
        var op = s.filter.match(/opacity=(\d+)/i);
        return op?parseInt(op[1])/100 : 1.0;
    } else if (s.MozOpacity!==undefined || s.opacity!==undefined){ // w3c(Firefox, Opera).
        return parseFloat(s.MozOpacity||s.opacity||1);
    } else {
		return 1.0;
	}
}
/*]]>*/