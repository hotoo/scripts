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
var IMFrame = function(w, h, uid, fid){
	Frame.call(this, w, h);
	this._minp; // mined panel.
	this._uid = uid; // user id.
	this._fid = fid; // friend id.
};
IMFrame.prototype = new Frame(0,0);
IMFrame.prototype.constructor = IMFrame;

IMFrame.prototype._ini = function(){
	if (!this._w){
		Frame.prototype._ini.call(this);
		this._t.style.height = "82px";
		this._t.innerHTML = '<TABLE style="BORDER-RIGHT: #fff 0px solid; PADDING-RIGHT: 0px; BORDER-TOP: #fff 0px solid; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; BORDER-LEFT: #fff 0px solid; WIDTH: 100%; PADDING-TOP: 0px; BORDER-BOTTOM: #fff 0px solid; BORDER-COLLAPSE: collapse; HEIGHT: 84px; border-spacing: 0px" cellSpacing=0 cellPadding=0>'+
'<TBODY>'+
'<TR>'+
'<TD style="BACKGROUND-IMAGE: url(icon/title_left.gif); WIDTH: 30px; BACKGROUND-REPEAT: no-repeat"></TD>'+
'<TD style="BACKGROUND-IMAGE: url(icon/topbg.gif); BACKGROUND-REPEAT: repeat-x">'+
'<DIV style="HEIGHT: 42px"><div class="talkTitle">您正在与{$friend_name}聊天...</div><div class="talkSign">难道乔丹哥真的已经不行了，难怪麦迪老睡不醒...</div></DIV>'+
'<DIV><IMG class=toolbar onmouseover="this.src=\'icon/home_on.gif\';" onmouseout="this.src=\'icon/home_off.gif\';" src="icon/home_off.gif"><IMG class=toolbar onmouseover="this.src=\'icon/camera_on.gif\';" onmouseout="this.src=\'icon/camera_off.gif\';" src="icon/camera_off.gif"><IMG class=toolbar onmouseover="this.src=\'icon/sendfile_on.gif\';" onmouseout="this.src=\'icon/sendfile_off.gif\';" src="icon/sendfile_off.gif"><IMG class=toolbar onmouseover="this.src=\'icon/mail_on.gif\';" onmouseout="this.src=\'icon/mail_off.gif\';" src="icon/mail_off.gif"></DIV></TD>'+
'<TD style="BACKGROUND-IMAGE: url(icon/top_right.gif); WIDTH: 95px; PADDING-TOP: 1px; BACKGROUND-REPEAT: repeat-x" vAlign=top align=left><IMG style="CURSOR: pointer" height=17 src="icon/min_bar.gif" width=27><IMG title=最大化/还原 style="CURSOR: pointer" height=17 src="icon/max_bar.gif" width=26><IMG style="WIDTH: 35px; CURSOR: pointer" height=17 src="icon/close_bar.gif" width=35></TD></TR></TBODY></TABLE>'+
'</body>'+
'</html>';
		"<div class='talkTitle'>您正在与{$friend_name}聊天...</div>"+
			'<div class="talkSign">难道乔丹哥真的已经不行了，难怪麦迪老睡不醒...</div>'+
			'<div style="font-size:8px;">&nbsp;</div>'+
			'<div>'+
			'<img src="icon/home_off.gif" class="toolbar" onmouseover="this.src=\'icon/home_on.gif\';" onmouseout="this.src=\'icon/home_off.gif\';" /><img src="icon/camera_off.gif" '+
			' class="toolbar" onmouseover="this.src=\'icon/camera_on.gif\';" onmouseout="this.src=\'icon/camera_off.gif\';" /><img src="icon/sendfile_off.gif" '+
			' class="toolbar" onmouseover="this.src=\'icon/sendfile_on.gif\';" onmouseout="this.src=\'icon/sendfile_off.gif\';" /><img src="icon/mail_off.gif" '+
			' class="toolbar" onmouseover="this.src=\'icon/mail_on.gif\';" onmouseout="this.src=\'icon/mail_off.gif\';" />'+
			'</div>';
		this._b.style.height = "320px";
		this._b.innerHTML = '<div class="talkframe">'+
''+
'<div><table width="100%" style="border-collapse:collapse;"><tr>'+
'<td style="width:2px;background-image:url(icon/left_border.gif);background-repeat:repeat-y;"></td>'+
'<td style="width:100%"><div class="talkLeft">'+
'	<div class="msgListbox">'+
'	Hi, Friend.<br />'+
'	Hello.<br />'+
'	</div>'+
'	<div class="talksettingbar">'+
'		<div class="fontbar" id="fontsettingbar">'+
'		<select name="fontfamily"><option value="song">宋体</option><option value="hei">黑体</option><option value="li">隶书</option><option value="kai">楷体_GB2312</option></select>'+
'		<select name="fontsize"><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select>'+
'		<img src="icon/font_b.gif" class="toolbar" />'+
'		<img src="icon/font_i.gif" class="toolbar" />'+
'		<img src="icon/font_u.gif" class="toolbar" />'+
'		<img src="icon/font_color.gif" class="toolbar" />'+
'		</div>'+
'		<div>'+
'		<img src="icon/face.gif" /><img src="icon/font.gif" onclick="IM.TalkWindow.showFontSetting(this);" /><img src="icon/lan.gif" /><img src="icon/vibrator.gif" /><img src="icon/img.gif" />'+
'		</div>'+
'	</div>'+
'	<!-- div class="msgbox"><textarea class="msgInput"></textarea></div -->'+
'	<div style="width:100%;height:50px;overflow:auto;" designMode="on" contentEditable="true"></div>'+
'</div>'+
'<div align="right">'+
'<!-- button>Close</button><button>Send</button -->'+
'<img src="icon/close.gif" onmouseover="this.src=\'icon/close_on.gif\'" onmouseout="this.src=\'icon/close.gif\'" /><img src="icon/send.gif"'+
' onmouseover="this.src=\'icon/send_on.gif\'" onmouseout="this.src=\'icon/send.gif\'" /><img src="icon/send_setting.gif"'+
' onmouseover="this.src=\'icon/send_setting_on.gif\'" onmouseout="this.src=\'icon/send_setting.gif\'" />'+
'</div>'+
'</td>'+
'<td style="cursor:pointer;font-size:2px;width:2px;" onclick="swith();"><div>&nbsp;</div></td>'+
'<td id="talkRight">'+
'<div class="userbox"><div class="userboxtitle">{$friend_name}</div><div align="center" valign="middle"><img src="myFace.gif" alt="{$friend_face}" /></div></div>'+
'<div>&nbsp;</div>'+
'<div class="userbox"><div class="userboxtitle">{$user_name}</div><div><img src="myFace.gif" alt="{$user_face}" /></div></div>'+
'</td>'+
'<td style="width:2px;background-image:url(icon/right_border.gif);background-repeat:repeat-y;"></td>'+
'</tr></table></div>'+
'</div>';
		this._f.style.height = "15px";
		this._f.innerHTML = '<div><table style="width:100%;border:0px solid #fff;padding:0px;margin:0px;border-collapse:collapse;"><tr><td style="width:14px;height:15px;background-image:url(icon/border_foot_l.gif);background-repeat:no-repeat;"></td><td style="height:15px;background-image:url(icon/border_foot_m.gif);background-repeat:repeat-x;"></td><td style="width:14px;height:15px;background-image:url(icon/border_foot_r.gif);background-repeat:no-repeat;"></td></tr></table></div>';
		
		this._bo.style.height = this._hi-parseInt(this._t.style.height)-parseInt(this._f.style.height)-140+"px";
		UserDefinedEvent.addEventListener(this._w, "blur", Function.createDelegate(this, this.blur));
	}
	return this._w;
};
IMFrame.prototype.title = function(){
	return this.__t;
};
IMFrame.prototype.valueOf = function(){
	var r = Frame.prototype.valueOf.call(this);//alert(this._hr1.style.backgroundColor);
	return r;
};
IMFrame.prototype.minRevert = function(){
	Frame.prototype.minRevert.call(this);
	this._minp.style.display = "none";
};
IMFrame.prototype.min = function(){
	Frame.prototype.min.call(this);
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
