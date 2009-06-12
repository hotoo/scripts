/*<![CDATA[*/
/**
 * 简易日历。完全通过覆写html字符串形式切换月份，TODO:使用td带id并更新其内容方式实现。
 * @namespace org.xianyun.ui.calendar;
 * @extends {Calendar}
 * @constructor new SimpleCalendar();
 * @param {Date} 初始日期。
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/4/21
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var SimpleCalendar = function(date){
	Calendar.apply(this, arguments);
//    if (date instanceof Date){
//        Calendar.call(this, date);
//    } else if(arguments.length>=3){
//        Calendar.call(this, arguments[0], arguments[1], arguments[2]);
//    } else if(arguments.length==1 && !isNaN(new Date(date))){
//        Calendar.call(this, date);
//    } else {
//        Calendar.call(this);
//    }
	this._memo = new HashMap();
};
SimpleCalendar.prototype = new Calendar();
SimpleCalendar.prototype.constructor = SimpleCalendar;
SimpleCalendar.LANG = "CN";
SimpleCalendar.MONTHS = {
"EN":["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
"EN1":["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."],
"EN2":["JAN.", "FEB.", "MAR.", "APR.", "MAY", "JUN.", "JUL.", "AUG.", "SEP.", "OCT.", "NOV.", "DEC."],
"ZH-CN":["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
};
SimpleCalendar.WEEKS = {
"EN":["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
"EN1":["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
"EN2":["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
"ZH-CN":["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
"CN":["日", "一", "二", "三", "四", "五", "六"]
};
SimpleCalendar.prototype.show = function(m){
	$("SimpleCalendar_"+this._name).style.display = m?"none":"";
	$("SimpleCalendar_"+this._name+"_list_module").style.display = m=="list"?"":"none";
	$("SimpleCalendar_"+this._name+"_add").style.display = m=="add"?"":"none";
};
SimpleCalendar.prototype.putMemo = function(m){
	for (var k in m){
		this._memo.put(k,m[k]);
	}
};
SimpleCalendar.prototype.editor = function(d){
	this._currDate=d; this.show("add");
	$('SimpleCalendar_'+this._name+'_editor').value = this._memo.get(d)||"";
	$('SimpleCalendar_'+this._name+'_editor').focus();
};
SimpleCalendar.prototype.lister = function(d){return false;
	this.show("list");
	var l = this._memo.get(d);
	if(l && l.length){
	var s="<table>";
	for (var i=0, L=l.length; i<L; i++){
		s+="<tr><td>"+l[i]+"</td><td>x</td></tr>";
	}
	s+="</table>";
	}else{
		s="<div>No Task.</div>";
	}
	$("SimpleCalendar_"+this._name+"_list").innerHTML = s;
};
SimpleCalendar.prototype.add = function(d, v){
	v=(v||document.getElementById("SimpleCalendar_"+this._name+"_editor").value).replace(/^\s*(.*?)\s*$/, "$1");
	d = d||this._currDate;
	if(v){
	this._memo.put(d,v);
	}else{
	this._memo.remove(d);
	}
	this.refu();
};
SimpleCalendar.prototype.del = function(){
	this._memo.remove(this._currDate);
	this.refu();
};
SimpleCalendar.prototype.refu = function(){
	$("SimpleCalendar_"+this._name+"_body").innerHTML = this.calString();
	$("SimpleCalendar_"+this._name+"_date").innerHTML = this.getYear()+"·"+this.getMonth();
};
/**
 * 从服务器端获取备忘录。
 * @param {String} id item id.
 * @param {Date} ds date start.
 * @param {Date} de date end.
 * @param {Function} cb callback.
 */
SimpleCalendar.prototype.getMemo = function(id,ds,de,cb){
	
};
SimpleCalendar.prototype.prev = function(){
	var d = this.getPrevMonth();
	this.setYear(d.year, d.month);
	this.refu();
};
SimpleCalendar.prototype.next = function(){
	var d = this.getNextMonth();
	this.setYear(d.year, d.month);
	this.refu();
};
SimpleCalendar.prototype.select = function(y,m,d){
	var s = y+"_"+m+"_"+d;
	if(this._currDate==s){this.editor(s);}
	this._currDate=s;
	this.setDate(d);
	this.refu();
};
SimpleCalendar.prototype.calString = function(){
    var b = '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>';
	var a = SimpleCalendar.WEEKS[SimpleCalendar.LANG];
	for(var i=0, l=a.length; i<l; i++){
		b+='<td class="SimpleCalendarTitle">'+a[i]+'</td>';
	}
	b+='</tr><tr>';

    // 输出上个月最后的几天，用于补全列表。
    var startDay = new Calendar(this.getYear(), this.getMonth(), 1).getDay();
    var pM = this.getPrevMonth();
    var prev = Calendar.getDays1Month(pM.year, pM.month);
    for(var i=0,j,t,c; i<startDay; i++){
		j=prev-startDay+i+1;
		t = this._memo.get(pM.year+"_"+pM.month+"_"+j);
		c = ((j==d?"SimpleCalendarToday":"")+(t?" SimpleCalendarMemo":"")).replace(/^\s*(.*?)\s*$/, "$1");
        b += "<td class='SimpleCalendarDateOff"+(t?" SimpleCalendarMemo":"")+"'"+(t?" title='"+t+"'":"")+" onclick='"+this._name+".prev();'><div"+(c?" class='"+c+"'":"")+">"+j+"</div></td>";
    }

    // 输出当前月份。
    var numDays = Calendar.getDays1Month(this.getYear(), this.getMonth());
    for(var i=1, d=this.getDate(),t,c,lc; i<=numDays ; i++){
        if((i+startDay)%7==1){b += "</tr><tr>";}
		t = this._memo.get(this.getYear()+"_"+this.getMonth()+"_"+i);
//!		c = ((i==d?"SimpleCalendarToday":"")+(t?" SimpleCalendarMemo":"")).replace(/^\s*(.*?)\s*$/, "$1");
		c=i==d&&t?"SimpleCalendarTodayMemo":(i==d)?"SimpleCalendarToday":t?"SimpleCalendarMemo":"";
		lc=new LunarCalendar(this.getYear(),this.getMonth()-1,i);
		lc=lc.day==1?lc.MONTH:lc.DAY;
        b+="<td"+(t?" title='"+t+"'":"")+" class='SimpleCalendarDateOn' valign=middle onclick='"+this._name+".select("+this.getYear()+","+this.getMonth()+","+i+");'>"+
			"<div"+(c?" class='"+c+"'":"")+">"+i+"<div class='SimpleCalendarLunarDate'>"+lc+"</div></div></td>";
    }

    // 输出下个月的开头，用于补全。
    var Y = this.getYear();
    var M = this.getMonth();
    var D = Calendar.getDays1Month(Y, M);
    var endDay = new Date(Y, M-1, D).getDay();
//    if(endDay==0){
//        b += "</tr><tr>";
//    }
    for(var i=1, t; i<6-endDay+1; i++){
		t = this._memo.get(this.getYear()+"_"+(this.getMonth()+1)+"_"+i);
        b += "<td"+(t?" title='"+t+"'":"")+" class='SimpleCalendarDateOff' onclick='"+this._name+".next();' align=center valign=middle><div"+(t?" class='SimpleCalendarMemo'":"")+">"+i+"</div></td>";
    }
//	if (endDay==0){
//		b+="<td class='HT2DCalendarDateOff'><div class='HT2DCalendarDateOff'>7</div></td>";
//	}
    b+='</tr></table>';
	return b;
};
/**
 * 取得简易日历的HTML字符串。
 * @param {String} n 简易日历实例引用名。
 */
SimpleCalendar.prototype.toString = function(n){
	if (n&&!this._name) {this._name = n;}
    // header html.
    s = '<div class="SimpleCalendar" id="SimpleCalendar_'+this._name+'">'+
		"<table style='border-collapse:collapse;' cellspacing=0 cellpadding=0>"+
		"<tr><td colspan=4 style='height:34px;color:#fff;text-align:right;'>农历</td></tr>"+
        "<tr><td class='SimpleCalendarTimer' id='SimpleCalendarTimer'>17:22</td>"+
		"<td class='SimpleCalendarPrev' onclick='"+this._name+".prev()'></td>"+
		"<td class='SimpleCalendarDate' id='SimpleCalendar_"+this._name+"_date'>"+this.getYear()+"·"+this.getMonth()+"</td>"+
		"<td class='SimpleCalendarNext' onclick='"+this._name+".next()'></td></tr>"+
        "<tr><td colspan=4 id='SimpleCalendar_"+this._name+"_body'>"+this.calString()+"</td></tr>"+
        "</table>"+
		'</div>'+
		'<div id="SimpleCalendar_'+this._name+'_list_module" style="display:none;"><div onclick="'+this._name+'.show(\'\')">«return</div><div id="SimpleCalendar_'+this._name+'_list">loading...</div></div>'+
		'<div id="SimpleCalendar_'+this._name+'_add" style="display:none;">'+
			'<div>add Task:</div>'+
			'<div><textarea title="任意控制键+回车提交" id="SimpleCalendar_'+this._name+'_editor" rows=6 class="SimpleCalendarTextArea" onkeydown="if(window.event.keyCode==13&&(window.event.ctrlKey||window.event.shiftKey||window.event.altKey)){'+
			this._name+'.add(null,this.value);this.value=\'\';'+this._name+'.show(\'\');}"></textarea><br /><input type="button"  onclick="'+this._name+'.add();'+this._name+'.show();\" value="保存" /><input type="button" onclick="'+this._name+'.show(\'\');" value="取消" /><input type="button"  onclick="'+this._name+'.del();'+this._name+'.show();\" value="删除" /></div>'+
		'</div>';
    return s;
};
/*]]>*/
