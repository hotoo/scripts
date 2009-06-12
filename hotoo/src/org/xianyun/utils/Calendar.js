/*<![CDATA[*/
/**
 * 日历基类。
 * 现在只实现年月日（略去时分秒）
 * @constructor Calendar()
 *              Calendar(Date) // new Calendar(new Date())
 *              Calendar(Number) // new Calendar(1000), milliseconds.
 *              Calendar(String) // new Calendar("1999/1/1")
 *              Canendar(Number, Number, Number) // new Calendar(1999, 1, 1)
 * @param date, Date.
 * @author 闲耘 (hotoo.cn[AT]gmail.com)
 * @create 2007/08/13
 */
var Calendar = function(date){
    if (date instanceof Date){ // Calendar(Date)
        this.date = date;
    } else if(arguments.length>=3){ // Calendar(Number, Number, Number)
        this.date = new Date(arguments[0], arguments[1]-1, arguments[2]);
    } else if(arguments.length==1){
		var d = new Date(date);
        this.date = new Date(date);
    } else {
        this.date = new Date();
    }
};

Calendar.MONTH_DAYS=[0,31,29,31,30,31,30,31,31,30,31,30,31];
/** 
 * 取得某年某月的天数。月份基数为 1。
 * @param {Number, Integer} y 指定年份，不指定年份时，默认2月29天。
 * @param {Number, Integer} m 指定月份。
 * @return {Number, Integer}
 */
Calendar.getDays1Month = function(y, m){
	return Calendar.days(y,m);
};
Calendar.days = function(y,m){
	var nl = !(y && (y%400===0 ||(y%4===0&&y%100!==0))); // not leap.
	if(m){
		return (m===2 && nl)?28:Calendar.MONTH_DAYS[m];
	}else{
		return nl?365:366;
	}
};

/** 
 * 取得日历的当前年份。
 * @param void.
 * @return Number, Year.
 */
Calendar.prototype.getYear = function(){
    return this.date.getFullYear();
};

/**
 * 设置日历年份。
 * @param {Number} y 指定年份。
 * @param {Number} m 指定月份。
 * @param {Object} d 指定日期。
 */
Calendar.prototype.setYear = function(y, m, d){
    return this.date.setFullYear(y, m?m-1:this.getMonth(), d||this.getDate());
}

/** 
 * 取得当前日历的当前月份。单位：月。
 * !! 月份基数为 1。
 * @param void.
 * @return Number, Integer. enum(1,2,3,4,5,6,7,8,9,10,11,12)
 */
Calendar.prototype.getMonth = function(){
    return this.date.getMonth()+1;
};

/**
 * 设置日历的月份。
 * @param {Number} m 指定月份，基数为1。
 * @param {Number} d 指定日期，基数为1，默认不改变原始日期。
 */
Calendar.prototype.setMonth = function(m, d){
	return this.date.setMonth(m-1, d||this.getDate());
}

/** 
 * 取得当前日历的当前日期。单位：日。
 * @param void.
 * @return Number, Integer, enum(1-28)/(1-29)/(1-30)/(1-31)
 */
Calendar.prototype.getDate = function(){
    return this.date.getDate();
};

/**
 * 设置当前日历的日期。
 * @param {Number} d 范围：[1-31]，不同年/月份范围不同。
 * @return Number.
 */
Calendar.prototype.setDate = function(d){
    return this.date.setDate(d);
}

/** 
 * 得到当前日历的是星期几。
 * @param void.
 * @return Number, Integer, enum(0-6).
 * 0:sunday, 1:monday, ...
 */
Calendar.prototype.getDay = function(){
    return this.date.getDay();
};

/** 
 * 取得当前日历的上一年。单位：年。
 * @param void.
 * @return Number, Integer, Year.
 */
Calendar.prototype.getPrevYear = function(){
    return this.getYear()-1;
};

/** 
 * 取得当前日历的下一年。单位：年。
 * @param void.
 * @return Number, Integer, Year.
 */
Calendar.prototype.getNextYear = function(){
    return this.getYear()+1;
};

/** 
 * 取得当前日历的上一月。单位：月。
 * !! 月份基数为 1。
 * @param void.
 * @return Object, {
 *      year, Number, Integer, Year.
 *      month, Number, Integer, Month.
 *  }
 */
Calendar.prototype.getPrevMonth = function(){
    var Y = this.getYear();
    var M = this.getMonth();
    return {
        "year" : M==1?Y-1:Y,
        "month" : M==1?12:M-1
    };
};

/** 
 * 取得当前日历的下一个月的月份。单位：月。
 * !! 第一个月从 1 开始。
 * @param void.
 * @return Object{
 *     year, Number, Integer.
 *     month, Number, Integer.
 * }
 */
Calendar.prototype.getNextMonth = function(){
    var Y = this.getYear();
    var M = this.getMonth();
    return {
        "year" : M==12?Y+1:Y,
        "month" : M==12?1:M+1
    };
};

/** 
 * 取得当前日历的上一天的日期。单位：日。
 * @param void.
 * @return Object, {
 *      year, Number, Integer, Year.
 *      month, Number, Integer, Month.
 *      date, Number, Integer, Day.
 *  }
 */
Calendar.prototype.getPrevDate = function(){
    var Y = this.getYear();
    var M = this.getMonth();
    var D = this.getDate();
    var pM = D==1?(M==1?12:M-1):M; // previous month.
    return {
        "year" : M==1&&D==1 ? Y-1 : Y,
        "month" : pM,
        "date" : D==1? Calendar.getDays1Month(Y, pM) : D-1
    };
};

/** 
 * 取得当前日历的下一天的日期。单位：日。
 * @param void.
 * @return Object, {
 *      year, Number, Integer, Year.
 *      month, Number, Integer, Month.
 *      date, Number, Integr, Day
 *  }
 */
Calendar.prototype.getNextDate = function(){
    var Y = this.getYear();
    var M = this.getMonth();
    var D = this.getDate();
    var nD = Calendar.getDays1Month(Y, M);
    return { // 这里是一个返回一个Object，还是返回一个Date/Calendar对象？根据实用原则以及由于getNextMonth方法不需要day属性，选择前者。
        "year" : M==12&&D==nD ? Y+1 : Y,
        "month" : D==nD? (M==12?1:M+1) : M,
        "date" : D==nD ? 1 : D+1
    };
};

/**
 * 将日历对象作为格式化的字符串输出。
 * 例外：
 *     年：如果短年份格式为00，如(2000)，则返回完整年份。
 *     月：如果月份大于9，则返回完整月份。
 *     日：如果日期大于9，则返回完整日期。
 * @param format, Stirng. simple:"YY/MM/DD"
 * @return String.
 */
Calendar.prototype.format = function(format){
    var y = this.getYear().toString();
    var sy = y.substr(y.length-2);
    sy = sy=="00"?y:sy;
    var m = this.getMonth();
    var d = this.getDate();

    format = format.replace(/YYYY/ig, y);
    format = format.replace(/YY/ig, sy);
    format = format.replace(/MM/g, m<10?"0"+m:m);
    format = format.replace(/M/g, m);
    format = format.replace(/DD/ig, (d<10?"0"+d:d));
    format = format.replace(/D/ig, d);
    return format;
};

/**
 * 覆写toString方法。
 * @param void.
 * @return String.
 */
Calendar.prototype.toString = function(){
    return this.date.toString();
};

Calendar.prototype.valueOf = function(){
	return this.date.valueOf();
};
/*]]>*/