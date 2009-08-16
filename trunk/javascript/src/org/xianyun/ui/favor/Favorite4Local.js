
var Favorite = function(vname, data){
	if (!(data instanceof Array)) throw new ArgumentException("参数类型期望为数组对象");
	this._name = vname;
	this._data = data;
	this._xmlhttp = null;
	/**
	 * 可指定收藏夹是否允许重复收藏。
	 * @type {Boolean}
	 */
	this.repeatable = false;
};
Favorite.LOCAL = new Properties();
Favorite.LOCAL.load("local_us-en.properties", false);
Favorite.prototype.getFavorString = function(){
	var s = '<div class="favorite"><ul>';
	for (var i=0; i<this._data.length; i++){
		s+='<li id="Fav_'+this._name+'_'+i+'" onmouseover="'+this._name+'.mouseover(this);" onmouseout="'+this._name+'.mouseout(this);">'+
		  '<div><a href="'+this._data[i][0]+'" target="_blank">'+this._data[i][1]+'</a></div>'+
		  '<div class="favoriteCtrlBar">'+
		  ' <span onclick="'+this._name+'.editor(this.parentNode.parentNode);">'+Favorite.LOCAL.getProperty("EDIT", "Edit")+'</span>'+
		  ' <span onclick="'+this._name+'.del(this.parentNode.parentNode);">'+Favorite.LOCAL.getProperty("DEL", "Delete")+'</span>'+
		  '</div>'+
		  '</li>';
	}
	return s+='</ul></div>';
};
Favorite.prototype.toString = function(){
	var s = '<div class="favorites">'+ // start the box.
		'<div id="Fav_'+this._name+'" onmouseover="'+this._name+'.showCreateBar(true);" onmouseout="'+this._name+'.showCreateBar(false);">'+
		'<div id="Fav_'+this._name+'_favors">'+this.getFavorString()+'</div>'+
		'<div id="Fav_'+this._name+'_createBar" class="favoriteCreateBar" onclick="'+this._name+'.editor()">'+Favorite.LOCAL.getProperty("ADD", "Add new Favorite")+'</div>'+
		'</div>'+
		'<div style="display:none;" id="Fav_'+this._name+'_creater">'+
		'<form onsubmit="'+this._name+'.edit();return false;" onreset="'+this._name+'.showFavors(true);'+this._name+'.showCreater(false);return false;">'+
		'<table>'+
		'<input type="hidden" id="Fav_'+this._name+'_index_inputer" />'+
		'<tr><td>'+Favorite.LOCAL.getProperty("URL", "URL:")+'</td><td><input type="text" id="Fav_'+this._name+'_url_inputer" /></td></tr>'+
		'<tr><td>'+Favorite.LOCAL.getProperty("TITLE", "Title:")+'</td><td><input type="text" id="Fav_'+this._name+'_name_inputer" /></td></tr>'+
		'<tr><td colspan="2"><input id="Fav_'+this._name+'_repeatable" type="checkbox" onclick="'+this._name+'.repeatable=!this.checked;" checked="checked" /><label for="Fav_'+this._name+'_repeatable">'+Favorite.LOCAL.getProperty("UN_REPEATABLE", "Unrepeatable.")+'</label></td></tr>'+
		'<tr><td colspan="2"><input type="submit" value="'+Favorite.LOCAL.getProperty("SAVE", "Save")+'" /> <input type="reset" value="'+Favorite.LOCAL.getProperty("CANCEL", "Cancel")+'" /></td></tr>'+
		'</table>'+
		'</form>'+
		'<div class="favoriteWarning" id="Fav_'+this._name+'_warning">loading...</div>'+
		'</div>'+
		'</div>'; // end the box.
	return s;
};
Favorite.prototype.showCreateBar = function(b){
	document.getElementById("Fav_"+this._name+"_createBar").style.visibility=b?"visible":"hidden";//display = b?"block":"none";
};
Favorite.prototype.showCreater = function(b){
	document.getElementById("Fav_"+this._name+"_creater").style.display=b?"block":"none";
};
Favorite.prototype.showFavors = function(b){
	document.getElementById("Fav_"+this._name).style.display = b?"block":"none";
};
Favorite.prototype.getIndex = function(o){
	var u = document.getElementById("Fav_"+this._name).getElementsByTagName("li");
	for (var i=0; i<u.length; i++){
		if (u[i]===o) return i;
	}
	return -1;
};
Favorite.prototype.getControlBar = function(o){
	var sp = o.getElementsByTagName("div");
	for (var i=0; i<sp.length; i++){
		if (sp[i].className==="favoriteCtrlBar"){
			return sp[i];
		}
	}
};
Favorite.prototype.mouseover = function(o){
	o.style.border = "1px solid #fe9d01";
	var c = this.getControlBar(o);
	c.style.display = "block";
};
Favorite.prototype.mouseout = function(o){
	o.style.border = "1px solid #ffffff";
	var c = this.getControlBar(o);
	c.style.display = "none";
};
Favorite.prototype.del = function(o){
	var ME = this;
	var i = this.getIndex(o);
	if (!window.confirm(Favorite.LOCAL.getProperty('DEL_CONFIRM', 'Are you sure to delete URL "{0}"').replace("{0}",this._data[i][0])))return;
	var data = this._data.clone(true);
	data.removeAt(i);
	this.save(data, function(status, req){
		if (status==="ok" && req.responseText==="success"){
			ME._data.removeAt(i);
			o.parentNode.removeChild(o);
		} else if (status==="ex" || (status==="ok"&&req.responseText!=="success")){
			alert(Favorite.LOCAL.getProperty('SAVE_FAILED', 'Save failed : {0}"').replace("{0}",req.responseText));
		}
	});
};
Favorite.prototype.indexOf = function(url, data){
	var d = data||this._data;
	for (var i=0; i<d.length; i++){
		if (d[i][0]===url)
			return i;
	}
	return -1;
};
Favorite.prototype.edit = function(){
	var url = document.getElementById("Fav_"+this._name+"_url_inputer");
	var u = url.value;
	var name = document.getElementById("Fav_"+this._name+"_name_inputer");
	var n = name.value;
	if (!(/^[a-zA-Z]+:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/.test(u))){
		document.getElementById("Fav_"+this._name+"_warning").innerHTML = Favorite.LOCAL.getProperty('INPUT_URL', 'Input the Correct URL."');
		document.getElementById("Fav_"+this._name+"_warning").style.display="block";
		url.focus(); return;
	}
	if (!n){
		document.getElementById("Fav_"+this._name+"_warning").innerHTML = Favorite.LOCAL.getProperty('INPUT_TITLE', 'Input the Title."');
		document.getElementById("Fav_"+this._name+"_warning").style.display="block";
		name.focus();return false;
	}
	var i=parseInt(document.getElementById("Fav_"+this._name+"_index_inputer").value);
	if (i===-1) i=this.indexOf(u, this._data); // 如果是新增，则判断是否有重复项。
	if (i!==-1 && u===this._data[i][0] && n===this._data[i][1]){ // 未更改则退出。
		this.showCreater(false);this.showFavors(true);
		return;
	}
	var ME=this, newer = [u,n];
	var data = this._data.clone(true);
	if (!(this.repeatable) && (i!==-1)){
		data[i][0]=u; data[i][1] = n;
	} else {
		data.push(newer);
	}
	this.save(data, function(status, req){
		if (status==="ok" && req.responseText==="success"){
			if (!ME.repeatable && i!==-1){
				ME._data[i][0]=u; ME._data[i][1] = n;
			} else {
				ME._data.push(newer);
			}
			ME.showCreater(false);ME.showFavors(true);
			document.getElementById("Fav_"+ME._name+"_favors").innerHTML = ME.getFavorString();
		} else if (status==="ex" || (status==="ok"&&req.responseText!=="success")){
			alert(Favorite.LOCAL.getProperty('SAVE_FAILED', 'Save failed : {0}"').replace("{0}",req.responseText));
		}
	});
};
Favorite.prototype.editor = function(o){
	this.showFavors(false);
	this.showCreater(true);
	document.getElementById("Fav_"+this._name+"_warning").style.display="none";
	var i = this.getIndex(o);
	document.getElementById("Fav_"+this._name+"_index_inputer").value = i;
	document.getElementById("Fav_"+this._name+"_url_inputer").value=i===-1?"":this._data[i][0];
	document.getElementById("Fav_"+this._name+"_url_inputer").focus();
	document.getElementById("Fav_"+this._name+"_name_inputer").value=i===-1?"":this._data[i][1];
	document.getElementById("Fav_"+this._name+"_repeatable").disabled = !(i===-1)
};
Favorite.prototype.save = function(data, callback){
	if (!this._xmlhttp) this._xmlhttp = new XmlHttpRequest();
	var s = "fav="+data.toJSONString();
	this._xmlhttp.send("save.php", "post", s, callback);
};
