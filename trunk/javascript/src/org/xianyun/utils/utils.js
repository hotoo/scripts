/*
通用方法
*/

/**
 * 察觉按键时，是否打开大写键(Caps Lock)。
 * @param {Event} e
 * @return {Boolean}
 */
function  detectCapsLock(e){  
	var k = e.keyCode || e.which;
	var u = e.shiftKey ? e.shiftKey : k==16; // Shift:16
	return (k>=65 && k<=90 && !u) // Caps Lock ON and Shift OFF.
		|| (k>=97 && k<=122 && u); // Caps Lock ON and Shift ON.
}

// 得到元素的绝对座标
function getElementAbsPos(eTarget){
	var top = eTarget;
	var pos ={'x' :0, 'y' : 0};
	
	pos['x'] += top.offsetLeft;
	pos['y'] += top.offsetTop;
	while(top.offsetParent != document.body){
		top = top.offsetParent;
		pos['x'] += top.offsetLeft;
		pos['y'] += top.offsetTop;
	}
	pos['x'] += document.body.offsetLeft;
	pos['y'] += document.body.offsetTop;
	
	return pos;
}

// 得到一个按钮元素
function getButtonElement(sLabel, sType){
	var type = (sType != null) ? sType : "button";
	var btn = document.createElement(Browser.isIE() ? '<button type="'+ type +'"></button>' : "button");
	if(!Browser.isIE()){
		btn.type = type;
	}
	btn.innerHTML = sLabel;
	
	return btn;
}

function showElement(eTarget, bVisible){
	eTarget.style.visibility = (bVisible) ? "visible" : "hidden";
}
function displayElement(eTarget, bVisible){
	eTarget.style.display = (bVisible) ? "" : "none";
}

function changeLinkHref(eLink, sHref){
	eLink.href = sHref;
}