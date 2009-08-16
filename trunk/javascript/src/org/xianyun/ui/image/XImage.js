/*<![CDATA[*/
/**
 * @overview
 * notice (BOM.Image):
 * 1. new Image(); // √
 * 2. Image instanceof Object; // IE:false; FF:true;
 * 3. Image instanceof Function; // false.
 * 
 * 4. new Image() instanceof Object; // IE:false; FF:true;
 * 5. new Image() instanceof Image; // IE:throw new Error("缺少函数"); FF:true;
 * 
 * 6. new Image().constructor; // IE:undefined; FF:HTMLImageElement;
 * 7. new Image().construcotr==Image; // false. review 6 about FF.
 * 
 * 

<code>
document.write("<br />");
document.write("Image instanceof Object : "+(Image instanceof Object)+"<br />");
document.write("Image instanceof Function : "+(Image instanceof Function)+"<br />");

document.write("new Image() instanceof Object : "+(new Image() instanceof Object)+"<br />");
document.write("new Image() instanceof Image : ");
try{document.write((new Image() instanceof Image));
}catch(e){document.write("Error : "+e.message);}
document.write("<br />");

document.write("new Image().constructor : "+(new Image().constructor)+"<br />");
document.write("new Image().construcotr==Image : "+(new Image().construcotr==Image)+"<br />");
document.write("new Image().construcotr==Object : "+(new Image().construcotr==Object)+"<br />");
document.write("new Image().construcotr==HTMLElement : ");
try{document.write((new Image().construcotr==HTMLElement));
}catch(e){document.write("Error : "+e.message);};
</code>
======================== OS:Win2003 ===========================
IE 6:
Image instanceof Object : false
Image instanceof Function : false
new Image() instanceof Object : false
new Image() instanceof Image : Error : 缺少函数
new Image().constructor : undefined
new Image().construcotr==Image : false
new Image().construcotr==Object : false
new Image().construcotr==HTMLElement : Error : 'HTMLElement' 未定义 

FF 3:
Image instanceof Object : true
Image instanceof Function : false
new Image() instanceof Object : true
new Image() instanceof Image : true
new Image().constructor : [object HTMLImageElement]
new Image().construcotr==Image : false
new Image().construcotr==Object : false
new Image().construcotr==HTMLElement : false 

Safari 3:
Image instanceof Object : true
Image instanceof Function : false
new Image() instanceof Object : true
new Image() instanceof Image : false
new Image().constructor : [object HTMLImageElementConstructor]
new Image().construcotr==Image : false
new Image().construcotr==Object : false
new Image().construcotr==HTMLElement : false

Opera 9:
Image instanceof Object : true
Image instanceof Function : true
new Image() instanceof Object : true
new Image() instanceof Image : Error : Statement on line 16: Second argument to 'instanceof' does not implement [[HasInstance]] Backtrace: Line 16 of inline#1 script in file://localhost/C:/Documents%20and%20Settings/Administrator/Local%20Settings/Temp/non38.htm document.write(new Image() instanceof Image); 
new Image().constructor : function Object() { [native code] }
new Image().construcotr==Image : false
new Image().construcotr==Object : false
new Image().construcotr==HTMLElement : false

 * @namespace org.xianyun.ui.image;
 * @extends {Object}
 * @constructor new XImage();
 * @param {HTMLImageElement, String} i
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2006/7/3, 2006/7/24, 2008/6/21
 *
 * @author 闲耘(mail[AT]xianyun.org)
 * 
 * @example usage I:
 * html:&lt;img src="img.gif" id="ximg" /&gt;<br />
 * javascript:new XImage(document.getElementById("ximg"));
 * 
 * usage II:
 * javascript:document.appendChild(new XImage().valueOf());
 */
var XImage = function(i){
	if(i && i.src){
		this._i = i; // image.
		this._s = i.src;
	}else{
		this._i = null;
		this._s = i; // src.
	}
	this.maxWidth = null;
	this.maxHeight = null;
	this.autoProportion = true; // 自动均衡宽&高。
};
XImage.getSize = function(img){
	var i = new Image();
	i.src = img.src;
	i.removeAttribute("width"); 
	i.removeAttribute("height");
	return {width:i.width, height:i.height};
};
XImage.prototype.setWidth = function(w){
	this._i.setAttribute("width",w);
};
XImage.prototype.setHeight = function(h){
	this._i.setAttribute("height",h);
};
XImage.prototype.load = function(s){
	this._i.setAttribute("src",s);
};
XImage.prototype.reload = function(){
	this._i.setAttribute("src", this._i.getAttribute("src")+"?"+Math.random());
};
XImage.prototype.proportion = function(){
	if(!this.maxWidth && !this.maxHeight){return;}
	this._i.removeAttribute("width");
	this._i.removeAttribute("height");
};
XImage.prototype.valueOf = function(){
	if(!this._i){
		this._i = document.createElement("img");
		this._i.setAttribute("src", this._s);
		var ME=this;
		this._i.onload = function(){
			ME.proportion();
		};
	}
	return this._i;
};

/*]]>*/
