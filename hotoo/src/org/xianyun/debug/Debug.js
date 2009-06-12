/*<![CDATA[*/
/**
 * Javascript Debug Console.
 * @namespace org.xianyun.debug;
 * @extends {Object}
 * @constructor Debug {static object}
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/6/3, 2008/6/15
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var Debug = {
	_w:0,_h:0,
	/**
	 * @type {Array} All debug messages.
	 */
	_msg:[],
	/**
	 * @type {Object} The debug console instance.
	 */
	_win:null,
	/**
	 * @type {Date} Last debug messages push time.
	 */
	_last:null,
	/**
	 * @type {Boolean} Auto open debug console. Some bugs in Firefox, Safari.
	 */
	autoOpen:false,
	/**
	 * @type {Boolean} Auto scroll debug messages.
	 */
	autoScroll:true,
	/**
	 * @type {Boolean} Auto focus debug console. bugs in Firefox, Safari.
	 */
	autoFocus:false,
	off:false,
	/**
	 * @type {Boolean} 相邻两次调试入栈时间大于delay时，是否强化调试信息以示警告。
	 */
	warning:true,
	/**
	 * @type {Number} 两次时间相差指定毫秒数时突出显示。
	 */
	delay:100,
	/**
	 * 超过调试日志最大条数(logLen)时，自动清除较早的minus条日志。
	 */
	minus:100,
	/**
	 * @type {Number} 记录调试日志条数，超过此长度时自动清除。
	 */
	logLen:1000,
	/**
	 * @type {String} debug console stlyes.
	 */
	styles:"body{font-family:Verdana,'Courier New';font-size:11px;margin:0px;padding:0px;}body,div,p{background-color:#fff;color:#000;}",
	_copyleft:"<h3>Javascript Debug Console.</h3>author 闲耘(mail[AT]xianyun.org)",
	/**
	 * 调试信息入栈。
	 * @param {String} msg 指定调试信息。
	 */
	push:function(msg){
		if(Debug.off){return;}
		if((!Debug._win||Debug._win.closed)&&Debug.autoOpen){Debug.print();}
		Debug._recycle();
		var d=new Date();
		Debug._msg[Debug._msg.length]=[msg,d];
		if(Debug._win&&!Debug._win.closed){
			Debug._push2Win(Debug._mkMsg(msg,d));
			if(Debug.autoFocus){Debug._win.focus();}
		}
	},
	/**
	 * 清空调试消息。
	 */
	clear:function(){
		Debug._msg.length=0;
	},
	/**
	 * 清除较早的日志，回收内存。
	 */
	_recycle:function(){
		if(Debug._msg.length>=Debug.logLen){
			Debug._msg.splice(Debug.logLen-Debug.minus, Debug.minus);
		}
		return Debug._msg;
	},
	/**
	 * 格式化（以固定格式输出）调试日志。
	 * @param {String} m 原始调试日志描述。
	 * @param {Object} d 原始调试日志创建时间。
	 * @param {Object} dl 
	 */
	_mkMsg:function(m,d){
		var dl=Debug.delay, c=d-Debug._last;
		return "<div style='border-top:1px solid #ccc;'><div><span style='color:#ccc;"+(Debug.warning&&c>dl?"font-weight:bold;":"")+
			"'>["+d.toLocaleString()+":"+d.getMilliseconds()+(Debug.warning&&c>dl?" "+c:"")+
			"]</span></div><div>"+m+"</div></div>";
	},
	_mkWin:function(){
		if (!Debug._win || Debug._win.closed) {
			var w = Debug._w||screen.availWidth/3, h=Debug._h||screen.availHeight, l=screen.availWidth-w, s=[], 
				bh=window.opera?(document.body.clientHeight||document.body.offsetHeight)-25:
					(document.documentElement.clientHeight||document.documentElement.offsetHeight)-10;
			Debug._win = window.open("","","width="+w+",height="+h+",left="+l+",top=0,scrollbars=no,resizable=yes,location=no,menubar=no,toolbar=no,status=no");
			s=[
			// script.
			"<sc","ript>",
			"function $(id){return document.getElementById(id);}",
			"function getPosition(){var w=window.opera?(document.body.clientWidth||document.body.offsetWidth):",
				"(document.documentElement.clientWidth||document.documentElement.offsetWidth), ",
				"h=window.opera?(document.body.clientHeight||document.body.offsetHeight):",
				"(document.documentElement.clientHeight||document.documentElement.offsetHeight);return {width:w,height:h};}",
			"function position(){alert(window.left);return {left:0,top:0};}",
			"function clw(){window.opener.Debug._win=null;}",
			"function cls(){window.opener.Debug.clear();$('dbgMsgs').innerHTML='",Debug._copyleft,"';} window.onunload=clw;window.onbeforeunload=clw;",
			"window.attachEvent('onresize', function(){var p=getPosition();with(opener.window.Debug){_w=p.width;_h=p.height;}});",
		//	"window.attachEvent('onmove', function(e){alert((window.event||e).screenX);});",
		//	"window.onmove=function(){alert();};",
		//	"window.onresize=function(){alert();};window.statusbar.visible=false;",
			"<","/script",">",
			// style.
			"<style>",Debug.styles,"</style>",
			"<div id='dbgMsgs' style='height:",bh,"px;overflow:auto;'>",Debug._copyleft,"</div>",
			"<div style='border-top:1px solid #ccc;'>",
			"<div>",
			"&nbsp;<button onclick='cls();'> Clear </button>",
			"&nbsp;<label for='autowarnopt'><input type=checkbox onclick='window.opener.Debug.warning=this.checked;$(\"delayinput\").disabled=!this.checked;' ",
			Debug.warning?" checked":""," id=autowarnopt />Warning.</label>",
			"&nbsp;Delay<input type=text id='delayinput'",Debug.warning?"":" disabled",
			" value='",Debug.delay,"' size=8 onchange='window.opener.Debug.delay=(this.value|0);' />ms.",
			"&nbsp;<label for='dbgoff'><input type=checkbox onclick='window.opener.Debug.off=this.checked;' ",
			Debug.off?" checked":""," id=dbgoff />Off debugger.</label>",
			"</div>",
			"<div>",
			"&nbsp;<button onclick='clw();window.close();'> Close </button>",
			"&nbsp;<label for='autoscrollopt'><input type=checkbox onclick='window.opener.Debug.autoScroll=this.checked;'",
			Debug.autoScroll?" checked":""," id=autoscrollopt />Auto scroll.</label>",
			"&nbsp;<label for='autofocusopt'><input type=checkbox onclick='window.opener.Debug.autoFocus=this.checked;' ",
			Debug.autoFocus?" checked":""," id=autofocusopt />Auto focus console.</label>",
			"&nbsp;<label for='autoopenopt'><input type=checkbox onclick='window.opener.Debug.autoOpen=this.checked;' ",
			Debug.autoOpen?" checked":""," id=autoopenopt />Auto open console.</label>",
			"</div>",
			"</div>"
			];
			Debug._win.document.write(s.join(""));
			Debug._win.document.title = "Debug Console";
		}
		return Debug._win;
	},
	_push2Win:function(msg){
		if(!Debug._win||Debug._win.closed){return;}
		var m = Debug._win.document.createElement("div"), b=Debug._win.document.getElementById("dbgMsgs");
		m.innerHTML = msg;
		b.appendChild(m);
		if(Debug.autoScroll){b.scrollTop = b.scrollHeight;}
	},
	/**
	 * 
	 * @param {Number} dl delay
	 */
	print:function(){
		var r="";
		if(!Debug._win || Debug._win.closed){
		for(var i=0,o=Debug._msg,l=o.length,d,m,cd,c; i<l; i++){
			m=o[i][0]; d=o[i][1]; if(!cd){cd=d;}; c=d-cd;
			r+=Debug._mkMsg(m,d);
			Debug._last=cd=d;
		}
		Debug._mkWin();
		Debug._push2Win(r);
		}else{Debug._win.focus();}
	}
};

String.prototype.repeat = function(i){
	var s=[];for(; i>0; i--){s[s.length]=this;}return s.join("");
//	var s="";for(; i>0; i--){s+=this;}return s;
};
Function.prototype.name = function(){
	var s = this.toString().match(/function(?:\s+(\w+))\s*\(/);
	return s?s[1]:"anonymous";
};
function isArguments(a){
	return !!(a && a.callee);
}
var stack = function stacktrace(a,b){
	var s=[], t="", e="", i=0;
	a=isArguments(a)?a:arguments.caller;
	if(!a){return b?s:"global";}
//	for(var c=arguments,n; c!=null; c=c.arguments.callee.caller,i++){
	for(var c=a.callee,n; c!=null; c=c.caller,i++){
		s.splice(0,0,c.name());
		// Because of a bug in Navigator 4.0, we need this line to break.
		// c.caller will equal a rather than null when we reach the end
		// of the stack. The following line works around this.
		if (c.caller == c) break;
	}
	for (i=0,l=s.length,p=""; i<l; i++){
		p="  ".repeat(i);
		t = t+p+"function "+s[i]+"(){"+(i==l-1?"":"\n");
		e = (i==l-1?"":"\n"+p)+"}"+e;
	}
	return b?s:t+e;
};
/*]]>*/
