/*<![CDATA[*/
/**
 * TODO : 现在基本上是select对象的联动类，需进一步抽象为菜单等的联动抽象类。
 * 另，抽象为可以接受任意数据源，包括本地数据源和网络数据源。
 * @overview (无限级)联动类抽象基类。
 * 可作为类似“省市县级联动”或“菜单项”等的父类。
 * @namespace org.xianyun.ui.linkage;
 * @extends {Object}
 * @constructor new Linkage(HTMLElement[])
 * @param {HTMLElement[]} 多个（不定数）指定的HTML容器。
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 0.8 2008/3/20
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */

/**
 * 单个联动项，如果有子项（改变当前项的值时，直接受影响的项），则在改变当前项的值时，改变子项的选项。
 * @param {HTMLElement} curr 当前项对应的HTMLElement对象。
 * @param {LinkageItem} next 子项。在普通的实例化过程中，需要先实例化最后一项，并将实例化后的引用作为前一项的参数。
 */
var LinkageItem = function(curr, next){
	this._tg = "change"; // 联动触发事件名称。
	this._elm = curr; // 当前联动项的HTMLElement对象引用。
	this._next = next; // 联动子项。触发联动事件时，将改变该项的状态。
	this._ds = null; // data source.
	this._chg = Function.createDelegate(this, this.onchange); // change handler.
	Event.observe(this._elm, this._tg, this._chg);
};

/**
 * 设置事件触发器，在当前HTMLElement对象触发指定事件时，改变整个联动对象状态。
 * 这个方法将取消之前的事件绑定，并以新事件绑定之。
 * @param {String} t 事件名称。
 */
LinkageItem.prototype.setTrigger = function(t){
	if (this._tg===t) return;
	Event.stopObserving(this._elm, this._tg, this._chg);
	this._tg = t;
	Event.observe(this._elm, this._tg, this._chg);
	
};

/**
 * 设置联动数据来源。
 * @param {Array, Function} d 指定数据来源。
 */
LinkageItem.prototype.setDataSrc = function(d){
	if (d instanceof Array)
		this._ds = d;
};

/**
 * 从数据源中获得匹配的项。
 * 	如果来源是数组，则直接在数组中过滤匹配的项。
 * 	如果来源是函数，则执行指定函数。
 * @param {Object} k 指定匹配键。
 * @return {Array} 返回数据源中与指定键匹配的数据。
 */
LinkageItem.prototype.getData = function(k){
	var a = [];
	if (!this._ds) return a;
	for (var i=0, l=this._ds.length; i<l; i++){
		if (this._ds[i][2]===k)
			a[a.length] = this._ds[i];
	}
	return a;
};

/**
 * 为当前联动项设置选项数据。
 * @param {Object} v
 */
LinkageItem.prototype.setData = function(d){
	for (var i=0, l=this._elm.options.length; i<l; i++){
		this._elm.options[0] = null;
	//!	this._elm.options.remove(0); // IE support.
	}
//!	if (d.length===0){return;}
	for (var i=0, l=d.length; i<l; i++){
		this._elm.options[i] = new Option(d[i][1], d[i][0])
	}
	if (this._next)
		this._next.setData(this.getData(this._elm.value));
};
LinkageItem.prototype.onchange = function(){
	if (this._next)
		this._next.setData(this.getData(this._elm.value));
};
LinkageItem.prototype.setValue = function(v){
	for (var i=0, o=this._elm.options, l=o.length; i<l; i++)
		if (o[i].value===v)
			o[i].selected = true;
	this.onchange();
};

/**
 * @overview （无限级）联动类，由多个联动子项组合而成，实际实现上，这多个子项是一个关联的单向链表。
 * @namespace org.xianyun.ui.linkage;
 * @constructor new Linkage(HTMLElement[]);
 * @param {HTMLElement[]} 不限数量个SELECT(HTMLElement)对象，顺序与关联数据顺序相同，如省,市,县。
 */
var Linkage = function(){
	this._lks = [];
	for (var i=arguments.length-1, n=null; i>=0; i--){
		n = this._lks[i] = new LinkageItem(arguments[i], n);
	}
};

/**
 * 为联动集合设置数据源，所有的子项均使用该数据源。
 * @param {Array} d 指定数据源。
 */
Linkage.prototype.setDataSrc = function(d){
	if (!(d instanceof Array)) throw new TypeError("Linkage.setDataSrc(Array);");
	for (var i=this._lks.length-1; i>=0; i--){
		this._lks[i].setDataSrc(d);
	}
};
/**
 * 设置联动事件触发器，所有子项均使用相同触发事件。
 * @param {String} t 事件名称。
 */
Linkage.prototype.setTrigger = function(t){
	for (var i=this._lks.length-1; i>=0; i--)
		this._lks[i].setTrigger(t);
};

/*]]>*/
