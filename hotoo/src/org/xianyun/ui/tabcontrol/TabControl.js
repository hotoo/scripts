/*<![CDATA[*/
/**
 * 页签集控件。
 * @namespace org.xianyun.ui.tabcontrol;
 * @extends {Object}
 * @constructor new TabControl(trigger);
 * @param {String} trigger 设置标签切换的触发器（事件名称），如"click", "mouseover"。
 * @since IE5.0, Firefox1.0, Opera8.0, Safari3.0, Netscape8.0
 * @version 2008/3
 */
var TabControl = function(trigger, type){
    this._tabpages = [];
    this._currTabpage = null;
	this._trigger = trigger||"click";
	this._type = type||false; // using UL/LI or TABLE/TR/TD
	
	this._d = null; // tabcontrol box.
	this._t = null; // tabs.
	this._p = null; // pages.
};

/**
 * 返回页签集控件的活动页签索引。
 * @return {Number}
 */
TabControl.prototype.activeIndex = function(){
	if (this._tabpages.length===0 || !this._currTabpage) return -1;
	return this._tabpages.indexOf(this._currTabpage);
};

/**
 * Get the TabControl Object, if not exist, create.
 * @ignore
 */
TabControl.prototype._Ctl = function(){
	if (!this._d){
	    this._d = document.createElement("div");
		this._d.className = "TabControl";
	    this._t = document.createElement("ul"); // tab.
	    this._t.className = "TabControlTabs";
	    this._p = document.createElement("div"); // page.
	    this._p.className = "TabControlPages";
	    this._d.appendChild(this._t); this._d.appendChild(this._p);
	}
	return this._d;
};

/**
 * 向TabControl对象指定标签索引位置添加指定TabPage对象。
 * @exception {ArgumentException}
 * @param {TabPage, String, HTMLElement} t 指定被添加的TabPage对象，或者页签的标签/标题(title)内容。
 * @param {String, HTMLElement} b 页签内容(body)。可选项，如果第一个参数t的类型是TabPage，则忽略此参数。 
 * @param {Number, Integer} i 指定的索引(index)位置。可选项，如果将页签添加到末尾，则忽略此参数。
 * @return {TabPage} 返回被添加TabPage对象的引用。
 * @ignore
 */
TabControl.prototype._add = function(t,b,i){
	var l = this._tabpages.length;
	if ((t instanceof String || typeof t==="string")){
		if (b instanceof Number||typeof b==="number"){
			t = new TabPage(t);
			i = b;
		} else {
		    t = new TabPage(t, b);
		}
	} else if (t instanceof TabPage){
		var _ = this._tabpages.indexOf(t);
		if (_>=0){
			return this.move(_,(i instanceof Number||typeof i==="number"?i:l-1)); // 正如HTMLElement/DOM对相同对象引用的添加方式，如果要添加一个已存在的标签页，则将它移动到指定的位置。
		} else {
		    i = b; // 
		}
	} else {
		throw new ArgumentException("期望至少一个字符串型参数或一个TabPage对象");
	}
	this._Ctl();
	if ((typeof i === "number" || i instanceof Number) && !isNaN(i) && (i>=0&&i<l)){ // insert.
		var r = this._tabpages[i];
		this._tabpages.insert(t, i);
		this._t.insertBefore(t.tab(), r.tab());
		this._p.insertBefore(t.page(), r.page());
	} else { // append.
		this._tabpages.insert(t);
		this._t.appendChild(t.tab());
		this._p.appendChild(t.page());
	}
	Event.observe(t.tab(), this._trigger, Function.createDelegate(this, function(){
		this.activize(t);
	}));
	if (l===0) this.activize(this._tabpages[0]);
	return t;
};

/**
 * 将指定TabPage对象附加到TabControl对象的末尾。
 * @exception {ArgumentException}
 * @param {TabPage, String, HTMLElement} t 指定被添加的TabPage对象，或者页签的标签/标题(title)内容。
 * @param {String, HTMLElement} b 页签内容(body)。可选项，如果第一个参数t的类型是TabPage，则忽略此参数。
 * @return {TabPage} 返回被添加TabPage对象的引用。
 */
TabControl.prototype.append = function(t, b){
	return this._add(t, b);
};

/**
 * 在指定索引位置插入标签页。
 * @exception {ArgumentException}
 * @param {TabPage, String, HTMLElement} t 指定被添加的TabPage对象，或者页签的标签/标题(title)内容。
 * @param {String, HTMLElement} b 页签内容(body)。可选项，如果第一个参数t的类型是TabPage，则忽略此参数。 
 * @param {Number, Integer} i 指定的索引(index)位置。可选项，如果将页签添加到末尾，则忽略此参数。
 * @return {TabPage} 返回被添加TabPage对象的引用。
 * @see append(), remove(), removeAt()
 */
TabControl.prototype.insert = function(t, b, i){
	return this._add(t, b, i);
};

/**
 * 删除指定的页签。
 * @exception {ArgumentException}
 * @param {TabPage} p 指定页签对象，如果为空，则删除当前活动页。
 * @return {TabPage} 返回被删除的页签对象。
 */

TabControl.prototype.remove = function(p){
	if (p===undefined||p===null) p = this._currTabpage;
	if (!(p instanceof TabPage)){
		throw ArgumentException("TabContorl.prototype.remove():参数必须为空或者类型为TabPage");
	}
	return this.removeAt(this.indexOf(p));
};

TabControl.prototype.removeAt = function(i){
	var l = this._tabpages.length;
	if (l===0) return null;
//	if (i===null || i===undefined) i = this.activeIndex();
	if (!(i instanceof Number||typeof i==="number") || isNaN(i) || i<0 || i>=l)
		throw new Error("期望范围在0-"+l+"之间的整数。实际参数是："+i);
	var p = this._tabpages[i];

	this._tabpages.remove(p);
	this._t.removeChild(p.tab());
	this._p.removeChild(p.page());
	if (l>1) this.activize(this._tabpages[0]);
	else this._currTabpage = null;
	return p;
};

/**
 * 标签集内页签位置调整，将第一个参数所引用的页签移至第二个参数指定的索引位置处。
 * @param {Number, TabPage} t 指定被移动页签对象。
 * 	如果是数值型(Number)，则引用页签集对应索引位置的页签对象；
 * 	如果是页签类型(TabPage)，且页签存在于页签集合中，则直接引用之；
 * 	否则，抛出异常。
 * @param {Number} i 指定目标索引。
 */
TabControl.prototype.move = function(t, i){
	var j;
	if (t instanceof TabPage){
		j = this.indexOf(t);
		if (j<0) throw new RuntimeException("TabControl.prototype.move():页签集中不存在指定的页签对象:"+t);
	} else if ((t instanceof Number || typeof t==="number")&&t>=0&&t<this._tabpages.length){
		j=t; t = this._tabpages[t];
	} else {
		throw new ArgumentException("TabControl.prototype.move():指定的页签对象或索引不合法:"+t);
	}
	if (i===j) return t;
	var c = this._currTabpage;
	this.insert(this.remove(t), i);
	this.activize(c);
};

TabControl.prototype.indexOf = function(p){
	return this._tabpages.indexOf(p);
};

/**
 * 设置页签集的活动页。
 * @param {TabPage, Number} t
 */
TabControl.prototype.activize = function(t){
	if (t instanceof TabPage){
		if (this.indexOf(t)<0){throw new Error("TabControl.prototype.activize():Has not TabPage "+t);}
	} else if ((t instanceof Number || typeof t==="number")&&!isNaN(t)&&t>=0&&t<this._tabpages.length){
		t = this._tabpages[t];
	} else {
		throw new Error("TabControl.prototype.activize():Argument Type/Range Error.");
	}
    if (this._currTabpage===t){return;};
    if (this._currTabpage instanceof TabPage)
		this._currTabpage.off();
    t.on();
    this._currTabpage = t;
};

TabControl.prototype.valueOf = function(){
    return this._Ctl();
};

TabControl.prototype.toString = function(i){
	throw new NotImplementedException("org.xianyun.ui.tab.TabControl.toString will return HTML string.");
};

TabControl.prototype.equals = function(that){
	return this===that;
};



/**
 * 单个页签对象。
 * @param {String, HTMLElement} t
 * @param {String, HTMLElement} p
 */
var TabPage = function(t, p){
    this._STL = {
        TAB_ON:"TabControlTabOn",
        TAB_OFF:"TabControlTabOff",
		TAB_DIS:"TabControlTabDisable"
    };
	this._ti = t; // title content.
	this._pg = p; // page content.
	this._da = false; // disable.
};

TabPage.prototype.tab = function(){
	if (!this._t){
	    this._t = document.createElement("li");
		if (this._ti instanceof String || typeof this._ti==="string")
		    this._t.innerHTML = this._ti;//'<a href="#">'+tab+'</a>';
		else
			try{this._t.appendChild(this._ti);}catch(e){}
		this._t.title = this._ti;
	    this._t.className = this._STL.TAB_OFF;
	}
    return this._t;
};

TabPage.prototype.page = function(){
	if (!this._p){
	    this._p = document.createElement("div");
	    this._p.innerHTML = this._pg;
		this._p.style.display = "none";
	}
    return this._p;
};

TabPage.prototype.on = function(){
	if (this._da) return;
    this._t.className = this._STL.TAB_ON;
    this._p.style.display = "";
};

TabPage.prototype.off = function(){
    this._t.className = this._STL.TAB_OFF;
    this._p.style.display = "none";
};

TabPage.prototype.setDisable = function(b){
	this._da = b;
	this._t.className = this._STL.TAB_DIS;
	this._p.style.display = "none";
};

TabPage.prototype.equals = function(t){
	return this===t;
};
/*]]>*/