/**
 * 范围(Range)对象。
 * @namespace org.xianyun.selection
 * @constructor {static} Selection
 * @extends {Object}
 * @version 2007/6/28 from org.xianyun.ui.autocomplete.HTAutoComplete2
 * @since IE6.0, Firefox1.0, Safari3.0, Opera9.0, Netscape9.0
 * @author 闲耘(mail[AT]xianyun.org)
 */
Selection = {};

/** 
 * 获得selection对象，跨浏览器
 * TODO cross browser.
 * @param void.
 * @return selection, Object.
 */
Selection.instance = function(){
    if (document.selection){
        return document.selection;
    }else if(document.getSelection){
        return document.getSelection(); //!
    }else if(window.getSelection){
        return window.getSelection(); //!
    }else {
        throw new NotSupportException("浏览器不支持Selection对象。");
    }
};