/*<![CDATA[*/
/**
 * 
 * @namespace org.xianyun.ui.editor;
 * @extends {Object}
 * @constructor new InstEditor(HTMLElement,type,callback);
 * @param {HTMLElement} e The target of edit area element.
 * @param {String} t type [text,textarea,select-one,select-multiple,radio,checkbox].
 * @param {Function} c callback function.
 * @param {Object,String} p params. eg: {name:"hotoo",id:89}, "name=hotoo&id=89"
 * @param {Boolean} a auto submit when blur editor area, default is true.
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/3/30
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var InstEditor = function(e,t,c,p,a){
	this._e = e;
	this._t = (t||"text").toLowerCase(); // text; textarea; select-one; select-multiple; radio; checkbox; (忽略:pasword;file;hidden;submit;reset;image;)
	this.options = null; // option.
	this._edt = null; // editor.
	this._ea = true; // enabled.
	this._cb=c; // callback.
	this.autoSubmit=a!=undefined?a:true;
	this._submitedDele=Function.createDelegate(this,this.submited);
	this.defaultValue=e.innerHTML.replace(/\r\n|\r|\n/g,"").replace(/<br\s*\/?>/ig,"\n"); // FF:innerHTML has \r\n|\r|\n.
	this.floating=false;
	if (e) this._init();
};
InstEditor.prototype._init = function(){
	Event.addEventListener(this._e, "click", Function.createDelegate(this, this.focus));
	Event.addEventListener(this._e, "mouseover", Function.createDelegate(this, this.mouseover));
	Event.addEventListener(this._e, "mouseout", Function.createDelegate(this, this.mouseout));
	this._e.title = "Click here to edit.";
};
InstEditor.prototype._destroy = function(){
	
};
InstEditor.prototype.mouseover=function(){
	this._e.style.backgroundColor="#fbffcc";
};
InstEditor.prototype.mouseout=function(){
	this._e.style.backgroundColor="";
};
InstEditor.prototype.focus = function(){
	if (!this._edt){
		switch(this._t){
		case "text": this._edt = document.createElement("input"); break;
		case "textarea": this._edt = document.createElement("textarea");
			var edt=this._edt;
			Event.addEventListener(edt,"keyup",function(){edt.style.height=edt.scrollHeight+"px";});
		//	edt.attachEvent("onkeyup",function(){edt.style.height=edt.scrollHeight;});
			break;
		case "select": case "select-one":
			this._edt = document.createElement("select");
			for(var i=0,l=this.options.length; i<l; i++){
				this._edt.options[i] = new Option(this.options[i][0],this.options[i][1]);
				if(this.options[i][0]===this._e.innerHTML){this._edt.options[i].selected=true;this._edt.selectedIndex=i;}
			}
			break;
		case "select-multiple": 
			this._edt = document.createElement("select");
			this._edt.multiple=true;
			var a=this._e.innerHTML.split(",");
			for(var i=0,l=this.options.length; i<l; i++){
				this._edt.options[i] = new Option(this.options[i][0],this.options[i][1]);
				if(a.contains(this.options[i][0])){this._edt.options[i].selected=true;this._edt.options.setAttribute("selected","selected");}
			}
			break;
		case "radio": this._edt = document.createElement("radio"); break;
		case "checkbox": this._edt = document.createElement("checkbox"); break;
		default: return;
		}
		var es=this._e.style, styles={
			border:"1px inset #fff",
			backgroundColor:"#fbffcc",
			color:es.color,
			display:es.display,
			width:this._e.offsetWidth,
			height:this._e.offsetHeight,
			fontSize:es.fontSize,
			fontFamily:es.fontFamily,
			fontWeight:es.fontWeight
		};
		for (var k in styles){
			try{this._edt.style[k]=styles[k];}catch(e){};
		}
	//	for (var k in this._e.style){
	//		try{this._edt.style[k] = this._e.style[k]}catch(e){};
	//	}
		this._e.parentNode.insertBefore(this._edt, this._e);
		if(this.autoSubmit){Event.addEventListener(this._edt, "blur", Function.createDelegate(this, this.blur));}
		else{}
		this._edt.value = this.defaultValue;//this._e.innerHTML.replace(/<br\s*\/?>/ig,"\n");
	}
	this._edt.style.width=this._e.style.width||(this._e.scrollWidth+"px");
	this._edt.style.height=this._e.style.height||(this._e.scrollHeight+"px");
	this._e.style.display="none";
	this._edt.style.display="";
	try{this._edt.focus(); this._edt.select();}catch(e){}
};
InstEditor.prototype.blur = function(){
	if(this._t==="select"||this._t==="select-one"){
		try{
			var t=this._edt[this._edt.selectedIndex].text;
			if(t!==this._e.innerHTML){this._e.innerHTML=t;}
		}catch(e){}
	
	}else if(this._t==="select-multiple"){
		var a=[];
		for(var i=0,o=this._edt.options,l=o.length; i<l; i++){
			if(o[i].selected){a[a.length]=o[i].text}
		}
		this._e.innerHTML=a.join(",");
	}else{
		var t = this._edt.value.toHTML();
		if(t!==this._e.innerHTML){this._e.innerHTML=t;}
	}
	if(this.autoSubmit){this.submit.call(this,this._pam,this._submited);}
	else{this.submited();}
};
InstEditor.prototype.submit = function(){
	if(this._cb instanceof Function&&this.defaultValue!=this._edt.value){this._cb.call(this, this._pam, this._edt.value, this._submitedDele);}
	else{this.submited();}
};
InstEditor.prototype.submited = function(){
	this.defaultValue=this._edt.value;
	this._edt.style.display = "none";
	this._e.style.display = "block";
};

/*]]>*/
