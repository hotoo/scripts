/*<![CDATA[*/
/**
 * RangUtil.js
 * @namespace org.xianyun.dom
 * @constructor RangUtil.getRang()
 * @create 2007/10/08
 */
var RangUtil = new Object();

/**
 * 获得Range对象，跨浏览器。
 * @param void.
 * @return {Object}.
 */
RangUtil.getRang = function(){
    if (undefined != document.createRange){
        return document.createRange();
    }else if(document.selection.createRange){
        return document.selection.createRange();
    }
};

/*]]>*/