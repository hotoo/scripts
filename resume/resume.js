/*<![CDATA[*/
function $(id){return document.getElementById(id);}
function isLeap(y){
	return y && (y%400===0 ||(y%4===0&&y%100!==0));
}
/**
 * @param {Number} y0 较小年份。
 * @param {Number} y1 较大年份。
 * @return {Number} 两个年份间的闰年数。
 */
function leaps(y0, y1){
	var n=0, i=y1, b=false;
	while (i>=y0){
		if(isLeap(i)){n++;b=true;}
		i-=(b?4:1);
	}
	return n;
}
/**
 * @param {Date} birth 生日（使用阳历）
 * @param {Date} today 相比较的日期，默认为当天。
 * @return {Number} 周岁年龄。
 */
function age(birth, today){
	today = today || new Date();
	var day=24*60*60*1000, year = 365*day, 
		fix = day*leaps(birth.getFullYear(), today.getFullYear());
	return 0|((today-birth+fix)/year);
}
/**
 * @param {HTMLElement} n 被插入对象。
 * @param {HTMLElement} e 参考对象。
 */
function insertAfter(n, e){
	var p = e.parentNode;
	if (p.lastChild == e) p.appendChild(n);
	else p.insertBefore(n, e.nextSibling);
}
/**
 * @param {Function} d 执行对每个链接元素的操作，例如在链接后加上提示性元素。
 * @param {Function} f 返回Boolean值的条件函数，可接受参数链接元素，
 *    返回true者在新窗口打开。
 */
function popout(d,f){
	var l = document.getElementsByTagName("a");
	for (var i=0,k=l.length; i<k; i++){
		if(d && !(f&&!f(l[i])))d(l[i]);
	}
}
function filter(o){
	return o.href && o.hostname!=location.hostname && o.href.indexOf("validator.w3.org")<0;
}

function mailFlag(d,f){
	var a = document.getElementsByTagName("address");
	for (var i=0,l=a.length; i<l; i++){
		var s = a[i].getElementsByTagName("samp");
		for (var j=0,k=s.length; j<k; j++){
			if(d && !(f&&!f(s[j])))d(s[j]);
		}
	}
}
function format(o){
	o.target = "_blank";
	var g = document.createElement("img");
	g.className = "popup";
	g.src = "cleardot.gif";
	g.width = "16px"; g.height = "16px";
	g.title = "在新窗口打开";
	insertAfter(g, o);
}
function isMailFlag(o){
	return o && o.innerHTML=="[AT]";
}
function replaceAT(o){
	var img = document.createElement("img");
	img.className = "mailto";
	img.src = "cleardot.gif";
	img.width = "6px"; img.height = "10px";
	img.alt = "[AT]"; img.title = "@";
	o.innerHTML = "";
	o.appendChild(img);
}
/*]]>*/