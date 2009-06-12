/*<![CDATA[*/
/**
 * 
 * @namespace org.xianyun
 * @extends {Object}
 * @constructor {static} ClassName
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/3/14
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var ClassName = {
	_assertElem : function(e){
		if (!e) throw new ArgumentException("期望HTMLElement对象。");
	},
	_assertName : function(n){
		if (!n || !n.isString() || !Patterm.VAR.test(n))
			throw new ArgumentException("期望合法变量名。");
	},
	
	/**
	 * 获得指定DOM对象的样式类名(className)
	 * @param {HTMLElement} elem 指定DOM对象。
	 * @return {String} 以字符串形式返回指定DOM对象的（所有）样式类名（多个类名以空格间隔，不做任何处理）。
	 */
	get : function(elem){
		ClassName._assertElem(e);
		return elem.className||"";
	},
	
	/**
	 * 以数组形式返回指定DOM对象的所有（不重复）样式类名（className）
	 * @param {HTMLElement} elem 指定DOM对象。
	 * @return {Array} 返回所有（不重复）样式类名(className)。
	 */
	gets : function(elem){
		ClassName._assertElem(elem);
		var a = [], c = ClassName.get(elem).split(" ");
		for (var i=0; i<c.length; i++)
			if (!a.contains(c[i]))
				a[a.length] = c[i];
		return a;
	},
	
	/**
	 * 为指定DOM对象设置className，原有className将覆盖。
	 * @param {HTMLElement} elem 目标DOM对象。
	 * @param {String} name 指定className（样式类名）。
	 */
	set : function(elem, name){
		ClassName._assertElem(elem);ClassName._assertName(name);
		elem.className = name;
	},
	add : function(elem, name){
		ClassName._assertElem(elem);ClassName._assertName(name);
		//if (!elem || !name) throw new ArgumentException("期望HTMLElement和非空字符串");
		if (!ClassName.contains(elem, name))
			elem.className = ClassName.get(elem)+" "+name;
	},
	remove : function(elem, name){
		ClassName._assertElem(elem);ClassName._assertName(name);
		//if (!elem || !name) throw new ArgumentException("期望HTMLElement和非空字符串");
		if (ClassName.contains(elem, name)){
			var a = ClassName.gets(elem).remove(name);
			elem.className = a.join(" ");
		}
	},
	
	replace : function(elem, cn0, cn1){
	//	var c = ClassName.gets(elem);
	//	var i = c.indexOf(cn0);
	//	if (i>=0) c[i] = cn1;
	//	elem.className = c.join("");
		ClassName.remove(elem, cn0);
		ClassName.add(elem, cn1);
	},
	
	/**
	 * 清除指定DOM对象中的所有样式类名。
	 * @param {Object} elem 指定DOM对象。
	 */
	clear:function(elem){
		ClassName._assertElem(elem);
		//if (!elem) throw new ArgumentException("期望HTMLElement对象。");
		elem.className = "";
	},
	
	/**
	 * 判断指定DOM对象的样式类名集合中是否存在指定的样式类名。
	 * @param {HTMLElement} elem 指定的DOM对象。
	 * @param {String} name 指定的样式类名。
	 * @return {Boolean}
	 */
	contains:function(elem, name){
		ClassName._assertElem(elem);ClassName._assertName(name);
		return ClassName.gets(elem).contains(name);
		//return new RegExp("(?:^"+name+" | "+name+" | "+name+"$)").test(ClassName.get(elem));
	}
};

/*]]>*/
