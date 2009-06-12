/*<![CDATA[*/
/** window method's extend.
 * @object window.js
 * @create 2007/07/29
 * @update 
 * @author 闲耘 (hotoo.cn[AT]gmail.com)
 */

window.gotoTop = function(){
    if (top!=this){
        top.location = this.location;
        //top.location.href = this.location.href;
    }
};

window.$open=window.open;
/**
 * 当浏览器拦截弹出窗口时，给出相应提示。
 * @param {String} u url address.
 * @param {String} t name, title.
 * @param {String} f features.
 * @param {Boolean} r replace.
 */
window.open = function(u, t, f, r){
	var w=window.$open(u, t||"_blank", f||"", r||false);
	if(!w){
	//	你可以换成自定义的模拟层来提醒用户，并给出打开新窗口的链接。
		alert('天啦！你的机器上竟然有软件拦截弹出窗口耶，好讨厌哦，人家不来了啦！快去掉嘛~~555~'); // from other's funny.
	}
	return w;
};
/*]]>*/