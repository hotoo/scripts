/*<![CDATA[*/
/**
 * {Object} SelectionUtil.js
 * @namespace org.xianyun.dom
 * @constructor RangUtil.getRang()
 * @create 2007/10/08
 */
var SelectionUtil = new Object();

/**
 * 取得Selection对象，跨浏览器。
 * @param void.
 * @return {Object}, {Selection}
 */
SelectionUtil.getSelection = function(){
    if (document.selection){
        return document.selection;
    }else if(document.getSelection){
        return document.getSelection(); //!
    }else if(window.getSelection){
        return window.getSelection(); //!
    }else {
        return null;
    }
};

/*]]>*/