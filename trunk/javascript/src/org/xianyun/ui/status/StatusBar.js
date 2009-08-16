/*<![CDATA[*/
/**
 * 
 * @namespace org.xianyun
 * @extends {Object}
 * @constructor ?!
 * @param ?!
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/5/29
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var StatusBar = function(){
	this._c=[]; // object collection.
	this._b=[]; // object bars.
	this._i=null; // current bar.
	this._e=null; // status bar element.
};
StatusBar.wapper = null;
StatusBar.bars = null;
StatusBar._init = function(){
	var fix = 1; // 不支持position=fixed样式的浏览器（如IE6）使用的模拟实现方式：0，外包，可以实现不闪动，但是动态编程时会有许多问题；1，随浏览器滚动条移动。
	StatusBar.bars = document.createElement("div");
	StatusBar.bars.className = "StatusBar";
	with(StatusBar.bars.style){
		position="absolute";border="0px solid #f00";top=Browser.height()+"px";left="0px";width="100%";
	}
	if(Browser.isIE){
	if(fix){
		StatusBar.bars.style.position="absolute";
		window.attachEvent("onscroll", function(){
			StatusBar.bars.style.top = Browser.height()+(document.documentElement||document.body).scrollTop-StatusBar.bars.offsetHeight+"px";
		});
	}else{
		if(!StatusBar.wapper){
			StatusBar.wapper = document.createElement("div");
			with(StatusBar.wapper.style){
			width="100%";height=Browser.height()+"px";overflowY="auto";left="0px";top="100px";//border="1px solid #f00"
			}
			for(var i=0,o=document.body.childNodes,l=o.length; i<l; i++){
				StatusBar.wapper.appendChild(o.item(0));
			}
		}
		with(document.body.style){
			overflow="hidden";margin="0px";border="0px";width="100%";height="100%";
		}
		with(document.documentElement.style){
			overflow="hidden";margin="0px";border="0px";width="100%";height="100%";
		}
		document.body.appendChild(StatusBar.wapper);
	}
	}else{
		StatusBar.bars.style.position = "fixed";
	}
	document.body.appendChild(StatusBar.bars);
};
window.attachEvent("onload",StatusBar._init);
StatusBar.prototype.instance = function(){
	if(!this._e){
		var e = this._e = document.createElement("div");
		e.className = "StatusBar";
		StatusBar.bars.appendChild(e);
	}
	return this._e;
};
StatusBar.prototype.add = function(o){
	if(!this._c.contains(o)){
		var i = this._c.length, ME=this;
		this._c[i] = o;
		var b = this._b[i] = document.createElement("span");
		b.className = "StatusBarOff";
	//	with(b.style){
	//	border="1px solid #ccc";cursor="pointer";//display="inline";
	//	}
		b.innerHTML = o.title instanceof Function?o.title().innerHTML:o.title;
		b.onclick = function(){
			ME.on(b,o);
		}
		this.instance().appendChild(b);//alert(StatusBar.bars.clientHeight+":"+StatusBar.bars.scrollHeight+":"+StatusBar.bars.offsetHeight);
		var h = (Browser.height()-StatusBar.bars.offsetHeight);
		if(StatusBar.wapper){StatusBar.wapper.style.height = h+"px";}
		StatusBar.bars.style.top = h+"px";
	}
	return o;
};
StatusBar.prototype.remove = function(o){
	return this._c.remove(o);
};
StatusBar.prototype.on = function(b,o){
	if(this._ib===b || this._i===o){return;}
	try{o.show();}catch(e){}
	if(this._ib){this._ib.className = "StatusBarOff";}
	b.className = "StatusBarOn";
	this._i = o; this._ib=b;
};

/*]]>*/
