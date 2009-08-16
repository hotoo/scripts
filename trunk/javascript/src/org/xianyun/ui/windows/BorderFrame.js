/*<![CDATA[*/
/**
 * A frame with border.
 * @namespace org.xianyun.ui.windows;
 * @extends {Window}
 * @constructor new BorderFrame();
 * @param {Number} w width
 * @param {Number} h height
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version ?!
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var BorderFrame = function(w, h){
	Window.call(this, w, h);
	this._e_resizable = false;
	this._s_resizable = false;
	this._w_resizable = false;
	this._n_resizable = false;
	
	this._minable = false;
	this._maxable = false;
	this._closeable = false;
	
	this._minWidth = 180; // 大于0px即可。
	this._minHeight = 160; // 表格最小高度大约为50px，切勿设置小于或等于50px。
};
BorderFrame.prototype = new Window(0,0);
BorderFrame.prototype.constructor = BorderFrame;

BorderFrame.prototype._ini = function(){
	if (!this._w){
		Window.prototype._ini.call(this);
		this._f_er = Function.createDelegate(this, this.e_resize);
		this._f_sr = Function.createDelegate(this, this.s_resize);
		this._f_wr = Function.createDelegate(this, this.w_resize);
		this._f_nr = Function.createDelegate(this, this.n_resize);
		this._resizer = new Resizable(this._f_er, this._f_sr, this._f_wr, this._f_nr);
		
		this._table = document.createElement("table");
		this._table.style.cssText = "width:"+this._wi+"px;height:"+this._hi+"px;border:0px solid #fff;border-collapse:collapse;border-spacing:0px;margin:0px;padding:0px;";
		this._table.cellPadding="0px"; this._table.cellSpacing="0px";
		this._b.appendChild(this._table);
		this._tbody = document.createElement("tbody");
		this._table.appendChild(this._tbody);
		
		this._top_border_tr = document.createElement("tr");
		this._top_border_tr.style.cssText = "height:2px;";
		this._nw_border_td = document.createElement("td");
		this._nw_border_td.style.cssText = "background-color:#ccc;width:2px;";
		this._n_border_td = document.createElement("td");
		this._n_border_td.colSpan = 3;
		this._n_border_td.style.cssText = "background-color:#ccc;";
		this._ne_border_td = document.createElement("td");
		this._ne_border_td.style.cssText = "background-color:#ccc;width:2px;";
		this._tbody.appendChild(this._top_border_tr);
		this._top_border_tr.appendChild(this._nw_border_td);
		this._top_border_tr.appendChild(this._n_border_td);
		this._top_border_tr.appendChild(this._ne_border_td);

		this._head_tr = document.createElement("tr");
		this._head_tr.style.cssText = "height:24px;";
		this._head_w_border_td = document.createElement("td");
		this._head_w_border_td.style.cssText = "background-color:#ccc;width:2px;";
		this._head_icon_td = document.createElement("td");
		this._head_icon_td.innerHTML="<img src='icon/application_xp_terminal.png' />"; // debug.
		this._head_icon_td.style.cssText = "width:18px;background-color:#eee;";
		this._head_title_td = document.createElement("td");
		this._head_title_td.style.cssText="text-overflow:ellipsis;height:24px;";
//!		this._head_title_td.noWrap = true;
//!		set title width at end.
		this._title = document.createElement("div");
		this._title.style.cssText="overflow:hidden;text-overflow:ellipsis;width:100%;height:95%;";
		this._head_title_td.appendChild(this._title);
		this._head_title_td.style.cssText = "overflow:hidden;background-color:#eee;cursor:move;";
		this._head_ctrl_td = document.createElement("td");
		this._head_ctrl_td.style.cssText = "width:60px;background-color:#eee;text-align:right;padding:5px;";
		this._head_e_border_td = document.createElement("td");
		this._head_e_border_td.style.cssText = "background-color:#ccc;width:2px;";
		this._tbody.appendChild(this._head_tr);
		this._head_tr.appendChild(this._head_w_border_td);
		this._head_tr.appendChild(this._head_icon_td);
		this._head_tr.appendChild(this._head_title_td);
		this._head_tr.appendChild(this._head_ctrl_td);
		this._head_tr.appendChild(this._head_e_border_td);
//		this._head_title_td.style.width=parseInt(this._w.style.width)-
//			parseInt(this._head_icon_td.style.width)-parseInt(this._head_ctrl_td.style.width)-
//			parseInt(this._head_w_border_td.style.width)-parseInt(this._head_e_border_td.style.width)+"px";
		
		this._body_tr = document.createElement("tr");
		// set height at end.
		this._body_w_border_td = document.createElement("td");
		this._body_w_border_td.style.cssText = "background-color:#ccc;width:2px;";
		this._body_content_td = document.createElement("td");
		this._body_content_td.colSpan = 3;
		this._body_content_td.innerHTML="Body"; // debug.
		this._body_e_border_td = document.createElement("td");
		this._body_e_border_td.style.cssText = "background-color:#ccc;width:2px;";
		this._tbody.appendChild(this._body_tr);
		this._body_tr.appendChild(this._body_w_border_td);
		this._body_tr.appendChild(this._body_content_td);
		this._body_tr.appendChild(this._body_e_border_td);
		
		this._foot_tr = document.createElement("tr");
		this._foot_tr.style.cssText = "height:24px;";
		this._foot_w_border_td = document.createElement("td");
		this._foot_w_border_td.style.cssText = "background-color:#ccc;width:2px;";
		this._foot_content_td = document.createElement("td");
		this._foot_content_td.style.cssText = "background-color:#eee;";
		this._foot_content_td.colSpan = 3;
		this._foot_e_border_td = document.createElement("td");
		this._foot_e_border_td.style.cssText = "background-color:#ccc;width:2px;";
		this._tbody.appendChild(this._foot_tr);
		this._foot_tr.appendChild(this._foot_w_border_td);
		this._foot_tr.appendChild(this._foot_content_td);
		this._foot_tr.appendChild(this._foot_e_border_td);
		
		this._bottom_border_tr = document.createElement("tr");
		this._bottom_border_tr.style.cssText = "height:2px;";
		this._sw_border_td = document.createElement("td");
		this._sw_border_td.style.cssText = "background-color:#ccc;width:2px;";
		this._s_border_td = document.createElement("td");
		this._s_border_td.colSpan = 3;
		this._s_border_td.style.cssText = "background-color:#ccc;";
		this._se_border_td = document.createElement("td");
		this._se_border_td.style.cssText = "background-color:#ccc;width:2px;";
		this._tbody.appendChild(this._bottom_border_tr);
		this._bottom_border_tr.appendChild(this._sw_border_td);
		this._bottom_border_tr.appendChild(this._s_border_td);
		this._bottom_border_tr.appendChild(this._se_border_td);
		
		this._body_tr.style.cssText = "height:"+(parseInt(this._table.style.height)-parseInt(this._head_tr.style.height)-parseInt(this._foot_tr.style.height))+";";
		
//		Event.addEventListener(this._head_title_td, "dblclick", Function.createDelegate(this, this.restore));
		this._head_title_td.attachEvent("ondblclick", Function.createDelegate(this, this.restore));
		this._dg = new Dragable(this._w, this._head_title_td);
//!		UserDefinedEvent.addEventListener(this._w, "blur", Function.createDelegate(this, this.blur));
	}
	return this._w;
};
BorderFrame.prototype.icon = function(){
	return this._head_icon_td;
};
BorderFrame.prototype.title = function(){
	return this._title;//this._head_title_td;
};
BorderFrame.prototype.body = function(){
	return this._body_content_td;
};

/**
 * 调整框架时，是否即时调整其大小。
 * @param {Boolean} b true则即时调整，false则在调整完成（即释放鼠标）时调整窗口/框架大小。
 */
BorderFrame.prototype.resizeSensitive = function(b){
	this._resizer.sensitive = b;
};

/**
 * 设置东方(east)调整大小能力，框架默认不可调整大小。
 * @param {Boolean} b b为true并且_e_resizable为true则可以调整，false为不可调整。
 * @ignore 供内部（如最大化时）改变外观（光标样式）和行为（拖放时改变大小），不改变可改变_e_resizable状态。
 */
BorderFrame.prototype._set_e_resizable = function(b){
	b = this._e_resizable && b;
	this._head_e_border_td.style.cursor=
	this._body_e_border_td.style.cursor=
	this._foot_e_border_td.style.cursor=b?"e-resize":"default";
	if (b){
		if(!this._f_e_resize){this._f_e_resize=Function.createDelegate(this._resizer, this._resizer.e_resize);}
//		Event.addEventListener(this._head_e_border_td, "mousedown", this._f_e_resize);
//		Event.addEventListener(this._body_e_border_td, "mousedown", this._f_e_resize);
//		Event.addEventListener(this._foot_e_border_td, "mousedown", this._f_e_resize);
		this._head_e_border_td.attachEvent("onmousedown", this._f_e_resize);
		this._body_e_border_td.attachEvent("mousedown", this._f_e_resize);
		this._foot_e_border_td.attachEvent("mousedown", this._f_e_resize);
	}else{
		if(!this._f_e_resize){return;}
//		Event.removeEventListener(this._head_e_border_td, "mousedown", this._f_e_resize);
//		Event.removeEventListener(this._body_e_border_td, "mousedown", this._f_e_resize);
//		Event.removeEventListener(this._foot_e_border_td, "mousedown", this._f_e_resize);
		this._head_e_border_td.detachEvent("mousedown", this._f_e_resize);
		this._body_e_border_td.detachEvent("mousedown", this._f_e_resize);
		this._foot_e_border_td.detachEvent("mousedown", this._f_e_resize);
	}
	this._resizer.e_resizing=b?this._f_er:null;
	this._set_ne_resizable(b);
	this._set_se_resizable(b);
};
/**
 * 设置南方(south)调整大小的能力，默认不可调整。
 * @param {Boolean} b true则可调整，否则不可调整。
 * @ignore
 */
BorderFrame.prototype._set_s_resizable = function(b){
	b = this._s_resizable && b;
	this._s_border_td.style.cursor=b?"s-resize":"default";
	if(b){
		if(!this._f_s_resize){this._f_s_resize=Function.createDelegate(this._resizer, this._resizer.s_resize);}
//		Event.addEventListener(this._s_border_td, "mousedown", this._f_s_resize);
		this._s_border_td.attachEvent("mousedown", this._f_s_resize);
	}else{
		if(!this._f_s_resize){return;}
//		Event.removeEventListener(this._s_border_td, "mousedown", this._f_s_resize);
		this._s_border_td.detachEvent("mousedown", this._f_s_resize);
	}
	this._resizer.s_resizing=b?this._f_sr:null;
	this._set_se_resizable(b);
	this._set_sw_resizable(b);
};
/**
 * 设置东南方向调整大小的能力。
 * @param {Boolean} b true则可调整，否则不可调整。
 * @ignore
 */
BorderFrame.prototype._set_se_resizable = function(b){
	b = this._e_resizable && this._s_resizable && b;
	this._se_border_td.style.cursor=b?"se-resize":"default";
	if(b){
		if(!this._f_se_resize){this._f_se_resize=Function.createDelegate(this._resizer, this._resizer.se_resize);}
//		Event.addEventListener(this._se_border_td, "mousedown", this._f_se_resize);
		this._se_border_td.attachEvent("mousedown", this._f_se_resize);
	}else{
		if(!this._f_se_resize){return;}
//		Event.removeEventListener(this._se_border_td, "mousedown", this._f_se_resize);
		this._se_border_td.detachEvent("mousedown", this._f_se_resize);
	}
};
/**
 * 设置西方调整大小的能力。
 * @param {Boolean} b true则可调整，否则不可调整。
 * @ignore
 */
BorderFrame.prototype._set_w_resizable = function(b){
	var b = this._w_resizable && b;
	this._head_w_border_td.style.cursor=
	this._body_w_border_td.style.cursor=
	this._foot_w_border_td.style.cursor=b?"w-resize":"default";
	if(b){
		if(!this._f_w_resize){this._f_w_resize=Function.createDelegate(this._resizer, this._resizer.w_resize);}
//		Event.addEventListener(this._head_w_border_td, "mousedown", this._f_w_resize);
//		Event.addEventListener(this._body_w_border_td, "mousedown", this._f_w_resize);
//		Event.addEventListener(this._foot_w_border_td, "mousedown", this._f_w_resize);
		this._head_w_border_td.attachEvent("mousedown", this._f_w_resize);
		this._body_w_border_td.attachEvent("mousedown", this._f_w_resize);
		this._foot_w_border_td.attachEvent("mousedown", this._f_w_resize);
	}else{
		if(!this._f_w_resize){return;}
//		Event.removeEventListener(this._head_w_border_td, "mousedown", this._f_w_resize);
//		Event.removeEventListener(this._body_w_border_td, "mousedown", this._f_w_resize);
//		Event.removeEventListener(this._foot_w_border_td, "mousedown", this._f_w_resize);
		this._head_w_border_td.detachEvent("mousedown", this._f_w_resize);
		this._body_w_border_td.detachEvent("mousedown", this._f_w_resize);
		this._foot_w_border_td.detachEvent("mousedown", this._f_w_resize);
	}
	this._resizer.w_resizing=b?this._f_wr:null;
	this._set_sw_resizable(b);
	this._set_nw_resizable(b);
};
/**
 * 设置北方(north)调整大小的能力。
 * @param {Boolean} b true则可调整，否则不可调整。
 * @ignore
 */
BorderFrame.prototype._set_n_resizable = function(b){
	var b = this._n_resizable && b;
	this._n_border_td.style.cursor=b?"n-resize":"default";
	if(b){
		if(!this._f_n_resize){this._f_n_resize=Function.createDelegate(this._resizer, this._resizer.n_resize);}
//		Event.addEventListener(this._n_border_td, "mousedown", this._f_n_resize);
		this._n_border_td.attachEvent("mousedown", this._f_n_resize);
	}else{
		if(!this._f_n_resize){return;}
//		Event.removeEventListener(this._n_border_td, "mousedown", this._f_n_resize);
		this._n_border_td.detachEvent("mousedown", this._f_n_resize);
	}
	this._resizer.n_resizing=b?this._f_nr:null;
	this._set_ne_resizable(b);
	this._set_nw_resizable(b);
};
BorderFrame.prototype._set_sw_resizable = function(b){
	var b = this._s_resizable && this._w_resizable && b;
	this._sw_border_td.style.cursor=b?"sw-resize":"default";
	if(b){
		if(!this._f_sw_resize){this._f_sw_resize=Function.createDelegate(this._resizer, this._resizer.sw_resize);}
//		Event.addEventListener(this._sw_border_td, "mousedown", this._f_sw_resize);
		this._sw_border_td.attachEvent("mousedown", this._f_sw_resize);
	}else{
		if(!this._f_sw_resize){return;}
//		Event.removeEventListener(this._sw_border_td, "mousedown", this._f_sw_resize);
		this._sw_border_td.detachEvent("mousedown", this._f_sw_resize);
	}
};
BorderFrame.prototype._set_ne_resizable = function(b){
	var b = this._n_resizable && this._e_resizable && b;
	this._ne_border_td.style.cursor=b?"ne-resize":"default";
	if(b){
		if(!this._f_ne_resize){this._f_ne_resize=Function.createDelegate(this._resizer, this._resizer.ne_resize);}
//		Event.addEventListener(this._ne_border_td, "mousedown", this._f_ne_resize);
		this._ne_border_td.attachEvent("mousedown", this._f_ne_resize);
	}else{
		if(!this._f_ne_resize){return;}
//		Event.removeEventListener(this._ne_border_td, "mousedown", this._f_ne_resize);
		this._ne_border_td.detachEvent("mousedown", this._f_ne_resize);
	}
};
BorderFrame.prototype._set_nw_resizable = function(b){
	var b = this._n_resizable && this._w_resizable && b;
	this._nw_border_td.style.cursor=b?"nw-resize":"default";
	if(b){
		if(!this._f_nw_resize){this._f_nw_resize=Function.createDelegate(this._resizer, this._resizer.nw_resize);}
//		Event.addEventListener(this._nw_border_td, "mousedown", this._f_nw_resize);
		this._nw_border_td.attachEvent("mousedown", this._f_nw_resize);
	}else{
		if(!this._f_nw_resize){return;}
//		Event.removeEventListener(this._nw_border_td, "mousedown", this._f_nw_resize);
		this._nw_border_td.detachEvent("mousedown", this._f_nw_resize);
	}
};

/**
 * 设置是否允许东方(east, 右边)边框调整框架的大小。
 * @param {Boolean} b 为true时可以调整，否则不允许调整。
 */
BorderFrame.prototype.set_e_resizable = function(b){
	this._set_e_resizable(this._e_resizable=b);
};
/**
 * 设置是否允许南方(south, 下边)边框调整框架的大小。
 * @param {Boolean} b 为true则可以调整，否则不可调整。
 */
BorderFrame.prototype.set_s_resizable = function(b){
	this._set_s_resizable(this._s_resizable=b);
};
/**
 * 设置是否允许西方(west, 左边)边框调整框架的大小。
 * @param {Boolean} b 为true则可以调整，否则不可调整。
 */
BorderFrame.prototype.set_w_resizable = function(b){
	this._set_w_resizable(this._w_resizable=b);
};
/**
 * 设置是否允许北方(north, 上边)边框调整框架的大小。
 * @param {Boolean} b 为true则可以调整，否则不可调整。
 */
BorderFrame.prototype.set_n_resizable = function(b){
	this._set_n_resizable(this._n_resizable=b);
};

/**
 * 每次改变标题栏控制按钮状态时调用此方法。
 * @ignore
 */
BorderFrame.prototype._sortCtrlBar = function(){
	var s = "border:0px solid #999;width:20px;height:20px;font-size:14px;cursor:pointer;";
	if(this._minable){
		if(!this._min_bar){
		this._min_bar = document.createElement("span");
		this._min_bar.innerHTML = "<img src='icon/min.gif' onmouseover='this.src=\"icon/min_on.gif\";' onmouseout='this.src=\"icon/min.gif\"' />";
		this._min_bar.title = "minimize";
		this._min_bar.style.cssText = s;
		if(!this._f_min){this._f_min=Function.createDelegate(this, this.min);}
//		Event.addEventListener(this._min_bar, "click", this._f_min);
		this._min_bar.attachEvent("onclick", this._f_min);
		}
		this._head_ctrl_td.appendChild(this._min_bar);
	}else{
		if(this._min_bar){
//!		if(this._f_min){Event.removeEventListener(this._min_bar, "click", this._f_min);}
		this._head_ctrl_td.removeChild(this._min_bar);
		}
	}
	if(this._minable || this._maxable){
		if(!this._normal_bar){
		this._normal_bar = document.createElement("span");
		this._normal_bar.innerHTML = "<img src='icon/restore.gif' onmouseover='this.src=\"icon/restore_on.gif\";' onmouseout='this.src=\"icon/restore.gif\"' />";
		this._normal_bar.title = "restore";
		this._normal_bar.style.cssText = s+"display:none;";
		if(!this._f_restore){this._f_restore=Function.createDelegate(this, this.restore);}
//		Event.addEventListener(this._normal_bar, "click", this._f_restore);
		this._normal_bar.attachEvent("click", this._f_restore);
		}
		this._head_ctrl_td.appendChild(this._normal_bar);
	}else{
		if(this._normal_bar){
//!		if(this._f_restore){Event.removeEventListener(this._normal_bar, "click", this._f_restore);}
		this._head_ctrl_td.removeChild(this._normal_bar);
		}
	}
	if(this._maxable){
		if(!this._max_bar){
		this._max_bar = document.createElement("span");
		this._max_bar.innerHTML = "<img src='icon/max.gif' onmouseover='this.src=\"icon/max_on.gif\";' onmouseout='this.src=\"icon/max.gif\"' />";
		this._max_bar.title = "maximize";
		this._max_bar.style.cssText = s;
		if(!this._f_max){this._f_max=Function.createDelegate(this, this.max);}
//		Event.addEventListener(this._max_bar, "click", this._f_max);
		this._max_bar.attachEvent("click", this._f_max);
		}
		this._head_ctrl_td.appendChild(this._max_bar);
	}else{
		if(this._max_bar){
//!		if(this._f_max){Event.removeEventListener(this._max_bar, "click", this._f_max);}
		this._head_ctrl_td.removeChild(this._max_bar);
		}
	}
	if(this._closeable){
		if(!this._close_bar){
		this._close_bar = document.createElement("span");
		this._close_bar.innerHTML = "<img src='icon/close.gif' onmouseover='this.src=\"icon/close_on.gif\";' onmouseout='this.src=\"icon/close.gif\"' />";
		this._close_bar.title = "close";
		this._close_bar.style.cssText = s;
		if(!this._f_close){this._f_close=Function.createDelegate(this, this.close);}
//		Event.addEventListener(this._close_bar, "click", this._f_close);
		this._close_bar.attachEvent("click", this._f_close);
		}
		this._head_ctrl_td.appendChild(this._close_bar);
	}else{
		if(this._close_bar){
//!		if(this._f_close){Event.removeEventListener(this._close_bar, "click", this._f_close);}
		this._head_ctrl_td.removeChild(this._close_bar);
		}
	}
};
BorderFrame.prototype.setMinable = function(b){
	this._minable=b; this._sortCtrlBar();
}
BorderFrame.prototype.setMaxable = function(b){
	this._maxable=b; this._sortCtrlBar();
};
BorderFrame.prototype.setCloseable = function(b){
	this._closeable=b; this._sortCtrlBar();
};

BorderFrame.prototype.e_resize = function(evt){
	if(!this._e_resizable){return;}
	evt = window.event||evt;
	var w = Event.pointerX(evt) - parseInt(this._w.style.left);
	if (w>this._minWidth) this.resizeTo(w, parseInt(this._w.style.height));
//	Event.stop(evt);
	evt.returnValue=false;evt.cancelBubble=true;
};
BorderFrame.prototype.s_resize = function(e){
	if (!this._s_resizable){return;}
	var h = Event.pointerY(e) - parseInt(this._w.style.top);
	if (h>this._minHeight) this.resizeTo(parseInt(this._w.style.width), h);
	Event.stop(e);
};
BorderFrame.prototype.w_resize = function(evt){
	if(!this._w_resizable){return}
	var l = Event.pointerX(evt);
	var w = parseInt(this._w.style.width)+parseInt(this._w.style.left) - l;
	if (w > this._minWidth) {
	this.resizeTo(w, parseInt(this._w.style.height));
	this.moveTo(l, parseInt(this._w.style.top));
	}
	Event.stop(evt);
};
BorderFrame.prototype.n_resize = function(evt){
	if(!this._n_resizable){return;}
	var t = Event.pointerY(evt);
	var h = parseInt(this._w.style.height)+parseInt(this._w.style.top) - t;
	if (h>this._minHeight){
	this.resizeTo(parseInt(this._w.style.width), h);
	this.moveTo(parseInt(this._w.style.left), t);
	}
	Event.stop(evt);
};
BorderFrame.prototype._setCtrlBarStatus = function(s){
	if(this._minable){this._min_bar.style.display = s==="min"?"none":"";}
	if(this._maxable){this._max_bar.style.display = s==="max"?"none":"";}
	if((this._minable||this._maxable)){this._normal_bar.style.display = s==="normal"?"none":"";}
};
BorderFrame.prototype.resizeTo = function(w, h){
	if (w<this._minWidth||h<this._minHeight){return false;}
	Window.prototype.resizeTo.call(this, w, h);
	this._table.style.width = w+"px";
	this._table.style.height = h+"px";
	this._body_tr.style.height = h - parseInt(this._head_tr.style.height)-parseInt(this._foot_tr.style.height)-4+"px";
	this._b.style.height = h+"px";
	this._head_title_td.style.width=parseInt(this._w.style.width)-
		parseInt(this._head_icon_td.style.width)-parseInt(this._head_ctrl_td.style.width)-
		parseInt(this._head_w_border_td.style.width)-parseInt(this._head_e_border_td.style.width)+"px";
};
BorderFrame.prototype.max = function(){
	if(!this._maxable){return;}
	Window.prototype.max.call(this);
	this._setCtrlBarStatus("max");
	this._dg.disable(true);
	this._head_title_td.style.cursor = "default";
	this._set_e_resizable(false);
	this._set_s_resizable(false);
	this._set_w_resizable(false);
	this._set_n_resizable(false);
};
BorderFrame.prototype._maxRestore = function(){
	if(!this._maxable){return;}
	Window.prototype._maxRestore.call(this);
	this._setCtrlBarStatus("normal");
	this._dg.disable(false);
	this._head_title_td.style.cursor = "move";
	this._set_e_resizable(true);
	this._set_s_resizable(true);
	this._set_w_resizable(true);
	this._set_n_resizable(true);
};
BorderFrame.prototype.min = function(){
	if(!this._minable){return;}
	Window.prototype.min.call(this);
	this._setCtrlBarStatus("min");
};
BorderFrame.prototype._minRestore = function(){
	if(!this._minable){return;}
	Window.prototype._minRestore.call(this);
	this._setCtrlBarStatus("normal");
};

BorderFrame.prototype.restore = function(){
	if (this.maxed) this._maxRestore();
	else if (this.mined) this._minRestore();
	else this.max(); // 其实只需要前两个条件，这里只是为了方便双击标题。
};
BorderFrame.prototype.close = function(){
	if(!this._closeable){return;}
	this._w.style.display = "none";
};
BorderFrame.prototype.blur = function(){
	
};
BorderFrame.prototype.valueOf = function(){
	return Window.prototype.valueOf.call(this);
};
/*]]>*/
