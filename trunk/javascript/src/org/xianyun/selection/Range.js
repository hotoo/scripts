/**
 * 范围(Range)对象。
 * @namespace org.xianyun.selection
 * @constructor {static} Range
 * @extends {Object}
 * @version 2007/6/28 from org.xianyun.ui.autocomplete.HTAutoComplete2
 * @since IE6.0, Firefox1.0, Safari3.0, Opera9.0, Netscape9.0
 * @author 闲耘(mail[AT]xianyun.org)
 */
Range = {};

/**
 * 创建Range对象，跨浏览器。
 * @param void.
 * @return {Object}.
 */
Range.create = function(){
    if(undefined != document.createRange){ // FF1.0+
        return document.createRange();
    }else if(document.selection.createRange){ // IE4.0+
        return document.selection.createRange();
    }else{
		throw new NotSupportException("浏览器不支持范围(Range)对象。");
	}
};