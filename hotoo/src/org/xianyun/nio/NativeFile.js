/*<![CDATA[*/
/**
 * Native File.
 * @namespace org.xianyun
 * @extends {Object}
 * @constructor ?!
 * @param ?!
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version ?!
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var NFile = {
	_instance:function(){
		var fso=new ActiveXObject("Scripting.FileSystemObject");
		this._instance = function(){
			return fso;
		};
		return fso;
	},
	read:function(){},
	readLine:function(){},
	write:function(){}
};

var NDrive = {
	_instance:function(){}
};


/*]]>*/
