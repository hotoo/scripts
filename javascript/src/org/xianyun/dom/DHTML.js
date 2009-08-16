/**
 * 将某节点n插到指定节点e之后。
 * @param {Object} n 指定被插入的目标节点。
 * @param {Object} e 指定参考节点。
 */
function insertAfter(n, e){
	var p = e.parentNode;
	if (p.lastChild == e) {
		p.appendChild(n);
	}else {
		p.insertBefore(n, e.nextSibling);
	}
}

if(typeof HTMLElement!="undefined"){
if(window.Event){//	修正Event的DOM
/**
 *						IE5		MacIE5		Mozilla		Konqueror2.2	Opera5
 * event				yes		yes			yes			yes				yes
 * event.returnValue	yes		yes			no			no				no
 * event.cancelBubble	yes		yes			no			no				no
 * event.srcElement		yes		yes			no			no				no
 * event.fromElement	yes		yes			no			no				no
 *
 */
Event.prototype.__defineSetter__("returnValue",function(b){
	if(!b)this.preventDefault();
	return b;
});
/**
 * 设置或者检索当前事件句柄的层次冒泡
 * @type {Boolean} b 为true则停止冒泡。
 */
Event.prototype.__defineSetter__("cancelBubble",function(b){
	if(b)this.stopPropagation();
	return b;
});
/**
 * @type {HTMLElement}
 */
Event.prototype.__defineGetter__("srcElement",function(){
	var	node=this.target;
	while(node.nodeType!=1)node=node.parentNode;
	return node;
});
/**
 * 返回鼠标移出的源节点。
 * @type {HTMLElement} 
 */
Event.prototype.__defineGetter__("fromElement",function(){
	var	node;
	if(this.type=="mouseover")
		node=this.relatedTarget;
	else if(this.type=="mouseout")
		node=this.target;
	if(!node)return;
	while(node.nodeType!=1)node=node.parentNode;
	return node;
});
/**
 * 返回鼠标移入的源节点。
 * @type {HTMLElement}
 */
Event.prototype.__defineGetter__("toElement",function(){
	var	node;
	if(this.type=="mouseout")
		node=this.relatedTarget;
	else if(this.type=="mouseover")
		node=this.target;
	if(!node)return;
	while(node.nodeType!=1)node=node.parentNode;
	return node;
});
Event.prototype.__defineGetter__("offsetX",function(){
	return this.layerX;
});
Event.prototype.__defineGetter__("offsetY",function(){
	return this.layerY;
});
}

/**
 * 修正Document的DOM。
 */
if(window.Document){
	/*
								IE5		   MacIE5		 Mozilla		Konqueror2.2		Opera5
	document.documentElement	yes		   yes			  yes			 yes					no
	document.activeElement		  yes		 null		 no			   no					 no

	*/
}

/**
 * 修正Node的DOM。
 */
if(window.Node){
	/*
								IE5		   MacIE5		 Mozilla		Konqueror2.2		Opera5
	Node.contains				 yes		yes			   no			 no					   yes
	Node.replaceNode			yes		   no			 no			   no					 no
	Node.removeNode				   yes		  no			no			  no					no
	Node.children				 yes		yes			   no			 no					   no
	Node.hasChildNodes			  yes		 yes			yes			   yes					  no
	Node.childNodes				   yes		  yes			 yes			yes					   no
	Node.swapNode				 yes		no			  no			no					  no
	Node.currentStyle			 yes		yes			   no			 no					   no

	*/
Node.prototype.replaceNode=function(Node){// 替换指定节点
	this.parentNode.replaceChild(Node,this);
}
Node.prototype.removeNode=function(removeChildren){// 删除指定节点
	if(removeChildren)
		return this.parentNode.removeChild(this);
	else{
		var	range=document.createRange();
		range.selectNodeContents(this);
		return this.parentNode.replaceChild(range.extractContents(),this);
	}
}
/**
 * 交换节点。
 * @param {Node} Node
 */
Node.prototype.swapNode=function(Node){
	var	nextSibling=this.nextSibling;
	var	parentNode=this.parentNode;
	node.parentNode.replaceChild(this,Node);
	parentNode.insertBefore(node,nextSibling);
}
}
if(window.HTMLElement){
	/**
	 * 为对象绑定事件。
	 * @param {String} evt 事件名称。
	 * @param {Function} handler 事件被触发时执行的处理函数。
	 */
	HTMLElement.prototype.attachEvent=function(e, h){
		return this.addEventListener(e.replace(/^on/i,""), h, false);
	};
	window.attachEvent = function(e,h){
		return window.addEventListener(e.replace(/^on/i,""), h, false);
	};
	document.attachEvent = function(e,h){
		return document.addEventListener(e.replace(/^on/i,""), h, false);
	};
	
	/**
	 * 为对象取消事件的绑定。
	 * @param {String} e 事件名称。
	 * @param {Function} h 被取消的处理函数。
	 * 注：由于两个函数不可能相等，所以这里必须和在绑定时使用的函数是同一个引用。
	 */
	HTMLElement.prototype.detachEvent=function(e, h){
		return this.removeEventListener(e.replace(/^on/i,""), h, false);
	};
	window.detachEvent = function(e,h){
		return window.removeEventListener(e.replace(/^on/i,""), h, false);
	};
	document.detachEvent = function(e,h){
		return document.removeEventListener(e.replace(/^on/i,""), h, false);
	};

	HTMLElement.prototype.__defineGetter__("all",function(){
		var	a=this.getElementsByTagName("*");
		var	node=this;
		a.tags=function(sTagName){
			return node.getElementsByTagName(sTagName);
			}
		return a;
		});
	HTMLElement.prototype.__defineGetter__("parentElement",function(){
		if(this.parentNode==this.ownerDocument)return null;
		return this.parentNode;
		});
	HTMLElement.prototype.__defineGetter__("children",function(){
		var	tmp=[];
		var	j=0;
		var	n;
		for(var	i=0;i<this.childNodes.length;i++){
			n=this.childNodes[i];
			if(n.nodeType==1){
				tmp[j++]=n;
				if(n.name){
					if(!tmp[n.name])
						tmp[n.name]=[];
					tmp[n.name][tmp[n.name].length]=n;
					}
				if(n.id)
					tmp[n.id]=n;
				}
			}
		return tmp;
		});
	HTMLElement.prototype.__defineGetter__("currentStyle", function(){
		return this.ownerDocument.defaultView.getComputedStyle(this,null);
		});
	HTMLElement.prototype.__defineSetter__("outerHTML",function(sHTML){
		var	r=this.ownerDocument.createRange();
		r.setStartBefore(this);
		var	df=r.createContextualFragment(sHTML);
		this.parentNode.replaceChild(df,this);
		return sHTML;
		});
	HTMLElement.prototype.__defineGetter__("outerHTML",function(){
		var	attr;
		var	attrs=this.attributes;
		var	str="<"+this.tagName;
		for(var	i=0;i<attrs.length;i++){
			attr=attrs[i];
			if(attr.specified)
				str+=" "+attr.name+'="'+attr.value+'"';
			}
		if(!this.canHaveChildren)
			return str+">";
		return str+">"+this.innerHTML+"</"+this.tagName+">";
		});
	HTMLElement.prototype.__defineGetter__("canHaveChildren",function(){
		switch(this.tagName.toLowerCase()){
			case "area":
			case "base":
			case "basefont":
			case "col":
			case "frame":
			case "hr":
			case "img":
			case "br":
			case "input":
			case "isindex":
			case "link":
			case "meta":
			case "param":
				return false;
			}
		return true;
		});

	HTMLElement.prototype.__defineSetter__("innerText",function(sText){
		var	parsedText=document.createTextNode(sText);
		this.innerHTML=parsedText;
		return parsedText;
		});
	HTMLElement.prototype.__defineGetter__("innerText",function(){
		var	r=this.ownerDocument.createRange();
		r.selectNodeContents(this);
		return r.toString();
		});
	HTMLElement.prototype.__defineSetter__("outerText",function(sText){
		var	parsedText=document.createTextNode(sText);
		this.outerHTML=parsedText;
		return parsedText;
		});
	HTMLElement.prototype.__defineGetter__("outerText",function(){
		var	r=this.ownerDocument.createRange();
		r.selectNodeContents(this);
		return r.toString();
		});
	HTMLElement.prototype.__defineGetter__("uniqueID",function()
	{
		if(!this.id)
		{
			this.id="control_"+random(7);
		}
		return this.id;
	}
	);

	HTMLElement.prototype.contains=function(Node){// 是否包含某节点
		do if(Node==this)return	true;
		while(Node=Node.parentNode);
		return false;
		}
	HTMLElement.prototype.insertAdjacentElement=function(where,parsedNode){
		switch(where){
			case "beforeBegin":
				this.parentNode.insertBefore(parsedNode,this);
				break;
			case "afterBegin":
				this.insertBefore(parsedNode,this.firstChild);
				break;
			case "beforeEnd":
				this.appendChild(parsedNode);
				break;
			case "afterEnd":
				if(this.nextSibling)
					this.parentNode.insertBefore(parsedNode,this.nextSibling);
				else
					this.parentNode.appendChild(parsedNode);
				break;
			}
		}
	HTMLElement.prototype.insertAdjacentHTML=function(where,htmlStr){
		var	r=this.ownerDocument.createRange();
		r.setStartBefore(this);
		var	parsedHTML=r.createContextualFragment(htmlStr);
		this.insertAdjacentElement(where,parsedHTML);
		}
	HTMLElement.prototype.insertAdjacentText=function(where,txtStr){
		var	parsedText=document.createTextNode(txtStr);
		this.insertAdjacentElement(where,parsedText);
		}
	}
		HTMLElement.prototype.fireEvent=function(eventstr)
		{
		var	evt	= document.createEvent("MouseEvents");
		evt.initEvent(eventstr.replace("on",""), true, true);
		this.dispatchEvent(evt);
		};
}
if(window.addEventListener)
{
FixPrototypeForGecko();
}
function FixPrototypeForGecko()
{
HTMLElement.prototype.__defineGetter__("runtimeStyle",element_prototype_get_runtimeStyle);
window.constructor.prototype.__defineGetter__("event",window_prototype_get_event);
Event.prototype.__defineGetter__("keyCode",event_prototype_get_keyCode);
Event.prototype.__defineGetter__("x",event_prototype_get_x);
Event.prototype.__defineGetter__("y",event_prototype_get_y);
HTMLElement.prototype.__defineGetter__("pixelLeft",element_prototype_get_pixelLeft);
HTMLElement.prototype.__defineGetter__("cssText",element_prototype_get_cssText);
HTMLElement.prototype.__defineSetter__("cssText",element_prototype_set_cssText);
}
function element_prototype_get_runtimeStyle()
{
//return style instead...
return this.style;
}
function element_prototype_get_pixelLeft ()
{
	return parseInt(this.style.left.replace("px",""));
}
function window_prototype_get_event()
{
return SearchEvent();
}

function event_prototype_get_x()
{
return this.pageX;
}
function event_prototype_get_y()
{
return this.pageY;
}
function event_prototype_get_offsetX()
{
return this.offsetX;
}
function element_prototype_get_cssText ()
{
	var	css="";
	for(var	i in this)
	{
		css+=i+":"+this[i]+";";
	}
	return css;
}
function element_prototype_set_cssText()
{
	var	css="";
	for(var	i in this)
	{
		css+=i+":"+this[i]+";";
	}
	this.setAttribute("style",css);
}
function event_prototype_get_keyCode ()
{
	return event.which;
}
function SearchEvent()
{
//IE
if(document.all)
return window.event;

func=SearchEvent.caller;
while(func!=null)
{
var	arg0=func.arguments[0];
if(arg0)
{
if(arg0.constructor==Event)
return arg0;
}
func=func.caller;
}
return null;
}
