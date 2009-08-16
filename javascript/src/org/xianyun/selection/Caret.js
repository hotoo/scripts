/**
 * 光标(输入框中，非鼠标指针)
 * @namespace org.xianyun.selection
 * @constructor {static} Caret
 * @extends {Object}
 * @version 2007/6/28 from org.xianyun.ui.autocomplete.HTAutoComplete2
 * @since IE6.0, Firefox1.0, Safari3.0, Opera9.0, Netscape9.0
 * @author 闲耘(mail[AT]xianyun.org)
 */
/**
 * 
 */
var Caret = {};

/**
 * 获得DOM光标在文本区的索引位置，不在文本区则返回-1。
 * 调用/触发此方法应为事件(如keypress)处理函数。
 * @param {HTMLElement} a, DOM对象。
 * @return {Number, Integer}
 */
Caret.indexOf = function(a){
	var t = a.tagName.toUpperCase();
    if("INPUT"===t || "TEXTAREA"===t){
        var b=a.value.length;
        if(undefined!==a.selectionStart){
            b=a.selectionStart;
        }else if(document.selection){
            var c=document.selection.createRange();
            c.moveStart("character",-b);
            b=c.text.length;
        }
        return b;
    }else{
        return -1;
    }
};