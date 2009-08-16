/*<![CDATA[*/

/**
 * {static} org.xianyun.utils.Browser
 * 浏览器辅助对象，提供一些多浏览器兼容的辅助方法。
 * @author 闲耘(xianyun.org, hotoo.cn[AT]gmail.com)
 * @create 2007/10/31
 */
var Browser = {};

/**
 * 以指定名称添加指定地址到浏览器收藏夹。
 * 支持https, http, ftp, file等协议。
 * @param {String} title 指定的名称。
 * @param {String} url 指定的地址。
 */
Browser.add2Bookmark = function(title, url) {
	title = title || document.title;
	url = url || document.location.href;
	if (window.sidebar){ // Firefox.
		window.sidebar.addPanel(title, url, "");
	} else if(window.external){ // IE.
		window.external.AddFavorite(url, title);
	} else { // Opera.
		alert("添加失败\n添加当前页到收藏夹，请按Ctrl+D组合键");
	}
}

/**
 * 设置指定网址（未指定则设置当前页地址）为首页。
 * 支持https, http, ftp等协议，不支持file协议。
 * @param {String} url 指定的网址。
 */
Browser.setDefaultPage = function(url){
	url = url || document.location.href;
	if(window.netscape){ // Firefox, Opera.
		try {
			// about:config, 先将signed.applets.codebase_principal_support设置为true
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage',url);
		} catch (e){alert("没有权限，请手动设置");}
	} else if(document.body.setHomePage) { // IE
		document.body.style.behavior='url(#default#homepage)';
		document.body.setHomePage(url);
	}
};
Browser.setHomePage = Browser.setDefaultPage;

/*]]>*/