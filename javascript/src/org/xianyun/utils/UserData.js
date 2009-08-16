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
var UserData = function(){
	this._table = Browser.isIE?"":"";
};
/**
 * 
 * @param {String} k key
 * @param {Object} v value.
 */
UserData.set=function(k,v){
	try{
		if(document.all){
		with(document.documentElement){
			load(key);
			setAttribute("value", v);
			save(key);
			return  getAttribute("value");
		}
		}else if(window.sessionStorage){ //for firefox 2.0+
			sessionStorage.setItem(k,v);
		}else{
			throw new Error("浏览器不支持UserData或者sessionStorage。");
		}
	}catch(e){}
};
/**
 * 
 * @param {String} k key.
 */
UserData.get = function(k){};
/**
 * 
 * @param {String} k key
 */
UserData.del = function(k){};

/*]]>*/
