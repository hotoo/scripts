/*<![CDATA[*/
/** 
 * @class Calender.js
 * @version 1.0.0
 * @create 
 * @update 
 * @author 闲耘 (hotoo.cn[AT]gmail.com)
 */


Date.prototype.getDays1Month = function(month){
    return Date.getDays1Month(this.getFullYear(), this.getMonth());
};

Date.getPrevMonth = function(year, month){
    return {
        "year" : month==1?year-1:year,
        "month" : month==1?12:month-1
    };
};
Date.getNextMonth = function(year, month){
    return {
        "year" : month==12?year+1:year,
        "month" : month==12?1:month+1
    };
};
Date.getPrevDay = function(year, month, day){
    var m = day==1?(month==1?12:month-1):month;
    return {
        "year" : month==1&&day==1?year-1:year,
        "month" : m,
        "day" : day==1?Date.getDays1Month(year, m):day-1
    };
};
Date.getNextDay = function(year, month, day){
    var d = Date.getDays1Month(year, month);
    return {
        "year" : month==12&&day==d
    };
};
alert(Date.getPrevDay(2007, 1, 1).day);

var HTCalendar = function(vname){
    this.name = vname;
    var now = new Date();
    this.date = new Date(now.getFullYear(), now.getMonth(), 1);
    this.PREV_MONTH = null;
    this.CURR_MONTH = null;
    this.NEXT_MONTH = null;
};
HTCalendar.LANG = "ZH-CN";
HTCalendar.MONTHS = {
"EN":["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
"EN1":["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."],
"EN2":["JAN.", "FEB.", "MAR.", "APR.", "MAY", "JUN.", "JUL.", "AUG.", "SEP.", "OCT.", "NOV.", "DEC."],
"ZH-CN":["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
};
HTCalendar.WEEKS = {
"EN":["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
"EN1":["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
"EN2":["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
"ZH-CN":["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
};

/** 取得某年某月的天数
 * @param year, Number, Integer.
 * @param month, Number, Integer.
 * @return Number, Integer.
 * @create 2007/08/03
 */
Calender.getDays1Month = function(year, month){
    var d = [31,28,31,30,31,30,31,31,30,31,30,31];
    if (year%4==0){d[1]=29;}
    return d[month-1];
};

HTCalendar.prototype.mousewheel = function(e){
    e = window.event || e;
    document.getElementById(this.name+"_calendar_list").scrollTop -= (e.wheelDelta/12)*8;

};
HTCalendar.getMonthString = function(year, month){
    var s = '<table border="1" cellpadding="2" width="75%"><tr>';

    // 得到上个月最后的几天，用于补全列表。
    var startDay = this.date.getDay();
    var Y = this.date.getFullYear();
    var M = this.date.getMonth()+1;alert(Y+":"+M);
    var prev = Date.getDays1Month((M==1?Y-1:Y), (M==1?12:M-1));

    for(i=0; i<startDay ; i++){
        s += "<td vlign='top'><div class='HTCalendarDay'>"+(prev-startDay+i)+"</td>";
    }

    var numDays = this.date.getDays1Month();
    for(i=0 ; i<numDays ; i++){
        if((i + startDay + 1 ) % 7 == 1 ){
            s += "</tr><tr>";
        }
        s += "<td height='75' valign='top'><b>" + (i+1) + "</b></td>"; 
    }
    '</tr>'+
    '</table>';
    s += "</div>";
    return s;
};
HTCalendar.prototype.toString = function(){
    var s = '<table border="1" cellpadding="2" width="75%">'+
      '<tr>'+
      '  <td colspan="7" align="center">'+
      '    <font size="6"><b>'+
             HTCalendar.MONTHS[HTCalendar.LANG][this.date.getMonth()] + " " + this.date.getFullYear() +
      '    </b></font>'+
      '   </td>'+
      '</tr>'+
      '<tr>'+
      '  <td width="14%"><b><i>'+HTCalendar.WEEKS[HTCalendar.LANG][0]+'</i></b></td>'+
      '  <td width="14%"><b><i>'+HTCalendar.WEEKS[HTCalendar.LANG][1]+'</i></b></td>'+
      '  <td width="14%"><b><i>'+HTCalendar.WEEKS[HTCalendar.LANG][2]+'</i></b></td>'+
      '  <td width="14%"><b><i>'+HTCalendar.WEEKS[HTCalendar.LANG][3]+'</i></b></td>'+
      '  <td width="14%"><b><i>'+HTCalendar.WEEKS[HTCalendar.LANG][4]+'</i></b></td>'+
      '  <td width="14%"><b><i>'+HTCalendar.WEEKS[HTCalendar.LANG][5]+'</i></b></td>'+
      '  <td width="14%"><b><i>'+HTCalendar.WEEKS[HTCalendar.LANG][6]+'</i></b></td>'+
      '</tr></table>';
      s += "<div id='"+this.name+"_calendar_list' onmousewheel='"+this.name+".mousewheel();'>";
      s += HTCalendar.getMonthString(this.date.getFullYear(), this.date.getMonth());
    s += "</div>";
    return s;
};

/*]]>*/