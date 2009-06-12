/** 
 * cn.hotoo.javascript.system.Browser.js [object]
 * @author 闲耘 (xianyun.org, hotoo.cn@gmail.com)
 * @version 2006-6-15
 *
 */

/**
 * w3c规范中getElementsByName是按着name属性进行检索的，
 * 而MS的IE却是按着id来检索，导致不能得到正确的Elements。
 */
if (Browser.isIE){
document.getElementsByName = function(name, parentNode){
    var re = [];
    var e = (parentNode || document).getElementsByTagName("*");
    for (var i=0; i<e.length; i++){
        if (e[i].getAttribute("name")===name){
            re[re.length] = e[i];
        }
    }
    return re;
};
}
document.getElementByClass = function(classname){
	var r=[], t=document.all?document.all:document.getElementsByTagName("*");
	for (var i =0,l=t.length,c; i<l; i++) {
		var c = t[i].className.split(" ");
	//	if (classNames.contain(classname)) 
		if (/^|\s/.test(t[i].className))
			r[r.length] = t[i];
	}
	return elements;
};
function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all) ? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/-/g, "\-");
	var oRegExp = new RegExp("(^|\s)" + strClassName + "(\s|$)");
	var oElement;
	for (var i = 0; i < arrElements.length; i++) {
		oElement = arrElements[i];
		if (oRegExp.test(oElement.className)) {
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}


if (!Document) Document = new Object();

Document.getScrollTop = function(){
	if (typeof window.pageYOffset != 'undefined') {
	    return window.pageYOffset;
	} else if (typeof document.compatMode != 'undefined' &&
	     document.compatMode != 'BackCompat') {
	    return document.documentElement.scrollTop;
	} else if (typeof document.body != 'undefined') {
	    return document.body.scrollTop;
	}
}

Document.getScrollLeft = function(){
	if (typeof window.pageXOffset != 'undefined') {
	   return window.pageXOffset;
	}
	else if (typeof document.compatMode != 'undefined' &&
	     document.compatMode != 'BackCompat') {
	   return document.documentElement.scrollLeft;
	}
	else if (typeof document.body != 'undefined') {
	   return document.body.scrollLeft;
	}
}

Document.getClientWidth = function(){
	if (typeof document.compatMode != 'undefined' &&
	     document.compatMode != 'BackCompat') {
	   return document.documentElement.clientWidth;
	} else if (typeof document.body != 'undefined') {
	   return document.body.clientWidth;
	}
}

Document.getClientHeight = function(){
	if (typeof document.compatMode != 'undefined' &&
	     document.compatMode != 'BackCompat') {
	    scrollPos = document.documentElement.clientHeight;
	} else if (typeof document.body != 'undefined') {
	    scrollPos = document.body.clientHeight;
	}
}

Document.forbid = function(){
    document.oncontextmenu = function(){return false};
    document.ondragstart = function(){return false};
    document.onselectstart = function(){return false};
    document.onselect = function(){document.selection.empty();};
    document.oncopy = function(){document.selection.empty();};
    document.onbeforecopy = function(){return false};
    document.onmouseup = function(){document.selection.empty();};
}

document.writeln = function(string){
    return document.write(string+"<br />");
};