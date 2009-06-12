/*<![CDATA[*/
/**
 * Codyy IM Frame.
 * @namespace org.xianyun
 * @extends {RoundCornerFrame}
 * @constructor ?!
 * @param ?!
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version ?!
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var IMFrame = function(w, h){
	BorderFrame.call(this, w, h);
	this._minp; // mined panel.
};
IMFrame.prototype = new BorderFrame(0,0);
IMFrame.prototype.constructor = IMFrame;

IMFrame.prototype._ini = function(){
	if (!this._w){
		BorderFrame.prototype._ini.call(this);
		var _tb = document.createElement("table");
		_tb.style.cssText = "border:0px solid #fff;width:100%;height:84px;border-collapse:collapse;border-spacing:0px;margin:0px;padding:0px;";
		_tb.cellSpacing = "0px"; _tb.cellPadding = "0px";
		var _tbd = document.createElement("tbody");
		var _tr = document.createElement("tr");
		var _tdl = document.createElement("td");
		_tdl.style.cssText = "width:30px;background-image:url(icon/title_left.gif);background-repeat:no-repeat;";
		var _tdm = document.createElement("td");
		_tdm.style.cssText = "background-image:url(icon/topbg.gif);background-repeat:repeat-x;";
		var _tdr = document.createElement("td");
		_tdr.style.cssText = "width:95px;padding-top:1px;background-image:url(icon/top_right.gif);background-repeat:repeat-x;";
		_tdr.align="left"; _tdr.vAlign = "top";
		this._mib = document.createElement("img"); this._mib.src = "icon/min_bar.gif"; this._mib.style.cssText="cursor:pointer;";
		this._mib.onmouseover = Function.createDelegate(this, function(){this._mib.src="icon/min_bar_on.gif";});
		this._mib.onmouseout = Function.createDelegate(this, function(){this._mib.src="icon/min_bar.gif";});
		this._mib.onclick = Function.createDelegate(this, function(){this.min();});
		this._mxb = document.createElement("img"); this._mxb.src = "icon/max_bar.gif"; this._mxb.style.cssText="cursor:pointer;";
		this._mxb.title = "最大化/还原";
		this._mxb.onmouseover = Function.createDelegate(this, function(){this._mxb.src="icon/max_bar_on.gif";});
		this._mxb.onmouseout = Function.createDelegate(this, function(){this._mxb.src="icon/max_bar.gif";});
		this._mxb.onclick = Function.createDelegate(this, function(){this.swich();});
		this._clsb = document.createElement("img"); this._clsb.src = "icon/close_bar.gif"; this._clsb.style.cssText="width:35px;cursor:pointer;";
		this._clsb.onmouseover = Function.createDelegate(this, function(){this._clsb.src="icon/close_bar_on.gif";});
		this._clsb.onmouseout = Function.createDelegate(this, function(){this._clsb.src="icon/close_bar.gif";});
		_tb.appendChild(_tbd);
		_tbd.appendChild(_tr);
		_tr.appendChild(_tdl);
		_tr.appendChild(_tdm);
		_tr.appendChild(_tdr);
		_tdr.appendChild(this._mib); _tdr.appendChild(this._mxb); _tdr.appendChild(this._clsb);
		this.__t = document.createElement("div"); // title.
		this.__t.style.cssText = "height:42px;";
		this.__tb = document.createElement("div"); // toolbar.
		this.__tb.innerHTML = '<img src="icon/home_off.gif" class="toolbar" onmouseover="this.src=\'icon/home_on.gif\';" onmouseout="this.src=\'icon/home_off.gif\';" /><img src="icon/camera_off.gif" '+
			' class="toolbar" onmouseover="this.src=\'icon/camera_on.gif\';" onmouseout="this.src=\'icon/camera_off.gif\';" /><img src="icon/sendfile_off.gif" '+
			' class="toolbar" onmouseover="this.src=\'icon/sendfile_on.gif\';" onmouseout="this.src=\'icon/sendfile_off.gif\';" /><img src="icon/mail_off.gif" '+
			' class="toolbar" onmouseover="this.src=\'icon/mail_on.gif\';" onmouseout="this.src=\'icon/mail_off.gif\';" />';
		_tdm.appendChild(this.__t);
		_tdm.appendChild(this.__tb);
		this._t.appendChild(_tb);
		this._t.style.height = "82px";
		
		var _tb2 = document.createElement("table");
		_tb2.style.cssText = "width:100%;height:100%;border:0px solid #fff;border-collapse:collapse;border-spacing:0px;margin:0px;padding:0px;";
		_tb2.cellSpacing = "0px"; _tb2.cellPadding = "0px";
		var _tbd2 = document.createElement("tbody");
		var _tr2 = document.createElement("tr");
		var _tdl2 = document.createElement("td");
		_tdl2.style.cssText = "width:2px;background-image:url(icon/left_border.gif);background-repeat:repeat-y;";
		_tdl2.innerHTML = "&nbsp;"
		var _tdL2 = document.createElement("td");
		_tdL2.innerHTML = "&nbsp;"; _tdL2.vAlign = "top";
		var _tdm2 = document.createElement("td"); // hidden right information bar.
		_tdm2.innerHTML = "<img src='icon/switch_right.gif' style='cursor:pointer;' />";
		_tdm2.style.cssText = "width:5px;background:#eee;";
		_tdm2.onclick = function(){_tdR2.style.display = (_tdR2.style.display==="none"?"block":"none");};
		var _tdR2 = document.createElement("td");
		_tdR2.style.cssText = "width:150px";
		_tdR2.innerHTML = "&nbsp;"
		var _tdr2 = document.createElement("td");
		_tdr2.style.cssText = "width:2px;background-image:url(icon/right_border.gif);background-repeat:repeat-y;";
		_tdr2.innerHTML = "&nbsp;";
		this._b.appendChild(_tb2);
		_tb2.appendChild(_tbd2);
		_tbd2.appendChild(_tr2);
		_tr2.appendChild(_tdl2);
		_tr2.appendChild(_tdL2);
		_tr2.appendChild(_tdm2);
		_tr2.appendChild(_tdR2);
		_tr2.appendChild(_tdr2);
		
		// ================== add message body ==================
		var _tokbox = document.createElement("div");
		_tokbox.style.cssText = "border:1px solid #ccc;";
		var _msgList = document.createElement("div");
		_msgList.style.cssText = "width:100%;height:260px;";
		var _msgTolbar = document.createElement("div");
		_msgTolbar.style.cssText = "border-top:1px solid #ccc;border-bottom:1px solid #ccc;background-color:#ccc;";
		_msgTolbar.innerHTML = "Toolbar";
		var _msgInpt = document.createElement("div");
		_msgInpt.style.cssText = "width:100%;height:40px;overflow:auto;";
		_msgInpt.designMode="on";
		_msgInpt.contentEditable=true;
		_tdL2.appendChild(_tokbox);
		_tokbox.appendChild(_msgList);
		_tokbox.appendChild(_msgTolbar);
		_tokbox.appendChild(_msgInpt);
		
		var _tb3 = document.createElement("table");
		_tb3.style.cssText = "width:100%;height:100%;border:0px solid #fff;border-collapse:collapse;border-spacing:0px;margin:0px;padding:0px;";
		_tb3.cellSpacing = "0px"; _tb3.cellPadding = "0px";
		
		UserDefinedEvent.addEventListener(this._w, "blur", Function.createDelegate(this, this.blur));
	}
	return this._w;
};
IMFrame.prototype.title = function(){
	return this.__t;
};
IMFrame.prototype.valueOf = function(){
	return BorderFrame.prototype.valueOf.call(this);//alert(this._hr1.style.backgroundColor);
};
IMFrame.prototype.minRevert = function(){
	BorderFrame.prototype.minRevert.call(this);
	this._minp.style.display = "none";
};
IMFrame.prototype.min = function(){
	BorderFrame.prototype.min.call(this);
	if (!this._minp){
		this._minp = document.createElement("div");
		Event.addEventListener(this._minp, "click", Function.createDelegate(this, function(){
			this.swich();
		}));
		this._minp.style.cssText = "border:1px solid #ccc;";
		this._minp.innerHTML = "您正在与{$friend_name}聊天";//this._t.innerHTML;
		this._t.parentNode.insertBefore(this._minp, this._t);
	}
	this._minp.style.display = "block";
	this._mind = true;
};
IMFrame.prototype.blur = function(){
	
};

/*]]>*/
