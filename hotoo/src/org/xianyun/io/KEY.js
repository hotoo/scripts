/**
 * KEY 封装了键盘上各个键名
 * @type {enum} 枚举类型，并提供了一些便捷方法。
 */
var KEY = {
	BACKSPACE:	8,
	TAB:		9,
	RETURN:		13,
	SHIFT:		16,
	CONTROL:	17,
	CTRL:		17,
	ALTER:		18,
	ALT:		18,
	PAUSE:		19,
	CAPS_LOCK:	20, // 大写锁。
	ESC:		27,
	SPACE:		32,
	PAGE_UP:	33,
	PAGE_DOWN:	34,
	END:		35,
	HOME:		36,
	LEFT:		37,
	UP:			38,
	RIGHT:		39,
	DOWN:		40,
	INSERT:		45,
	DELETE:		46,
	NUMBER_LOCK:145,
	FN:			function(n){return 111+n|0;},// F1:112 - F12:123。
	Fn:			255, // 笔记本电脑的Fn键。
	WIN:		91, // Windows专用快捷键。
	RIGHT_MENU:		93, // 右键菜单键。
	/**
	 * 判断键是否为数字(0-9)键。
	 * @param {Event} e 按键事件。
	 * @return {Boolean} true, 如果是数字键，否则返回false。
	 */
	isNumber:	function(e){
		var k = KEY.code(e);
		return (k>=48&&k<=57)||(k>=96&&k<=105); // 大/小键盘。
	},
	/**
	 * 判断按键事件是否为英文字符(A-Z)键。
	 * @param {Event} e 按键事件对象，为Firefox而存在。
	 * @return {Boolean} 是英文字符键则返回true，否则返回false。
	 */
	isChar:		function(e){
		var c = KEY.code(e);
		return c>=65&&c<=90;
	},
	/**
	 * 判断按键是否伴有控制键。
	 * @param {Event} e 按键事件。
	 * @return {Boolean} 是控制键则返回true，否则返回false。
	 */
	isControl:	function(e){
		e = window.event||e;
		return e.ctrlKey||e.shiftKey||e.altKey;
//		var c = KEY.code(e);
//		return c===16||c===17||c===18;
	},
	/**
	 * 
	 * @param {Object} evt
	 */
	code:function(evt){
		evt = window.event||evt;
		return evt.keyCode||evt.srcElement;
	}
};
