/*<![CDATA[*/
/**
 * 
 * @namespace org.xianyun
 * @extends {Object}
 * @constructor ?!
 * @param ?!
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version ?!
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var Resizer = {
	onresize:false,
	// start.
	w_resize:function(){
		Resizer.onresize = true;
		(document.body||document.documentElement).style.cursor = "w-resize";
		Event.addEventListener(document, "mousemove", Resizer.w_resizing);
	},
	// ing..
	w_resizing:function(e){
		
	},
	// finished.
	resized:function(){},
};

/*]]>*/
