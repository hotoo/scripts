/*<![CDATA[*/
/**
 * 获取窗口的可用大小(宽,高)
 * @return {Object} {width,height}
 */
window.getSize = function(){
	var w=(window.opera?(document.body.clientWidth||document.body.offsetWidth):
		(document.documentElement.clientWidth||document.documentElement.offsetWidth))||0, 
	h=(window.opera?(document.body.clientHeight||document.body.offsetHeight):
		(document.documentElement.clientHeight||document.documentElement.offsetHeight))||0;
	return {width:w,height:h,"0":w,"1":h};
};
/**
 * @overview 获取浏览器的可用大小。
 * @namespace org.xianyun.ui.utils;
 * @extends {Object}
 * @constructor {static}
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/6/24, 2008/7/10
 *
 * @author 闲耘(mail[AT]xianyun.org)
 * @example window.sizer.width, window.sizer.height;
 */

var _sz=window.getSize();
window.sizer = {
	width:_sz.width,
	height:_sz.height,
	_adjust:function(){
		var s = window.getSize();
		with(window.sizer){
		width = s.width;
		height = s.height;
		}
	}
};
//! 需要修补非IE浏览器的绑定事件方法。
window.attachEvent("onresize", window.sizer._adjust);
window.attachEvent("onload", window.sizer._adjust);
/*]]>*/
