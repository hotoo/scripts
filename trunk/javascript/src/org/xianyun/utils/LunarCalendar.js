/*<![CDATA[*/
/**
 * 
 * @namespace org.xianyun
 * @extends {Object}
 * @constructor ?!
 * @param {Number} y
 * @param {Number} m
 * @param {Number} d
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/4/19
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var LunarCalendar = function(y,m,d){
	var i, leap=0, temp=0;
	
	if(y instanceof Date){
		this._dt=y;
	}else if(arguments.length===0){
		this._dt = new Date();
	}else if(arguments.length===1 && (arguments[0] instanceof Number || typeof arguments[0]==="number")){
		this._dt = new Date(arguments[0]);
	}else if(arguments.length===3){
		this._dt = new Date(y, m, d);
	}
	
	var offset=(Date.UTC(this._dt.getFullYear(),this._dt.getMonth(),this._dt.getDate())-Date.UTC(1900,0,31))/86400000;
	
	for(i=1900; i<2050 && offset>0; i++) { temp=LunarCalendar.yearDays(i); offset-=temp; }
	
	if(offset<0){offset+=temp; i--;}
	
	this.year = i; this.YEAR = i; //!TODO
	
	leap = LunarCalendar.leapMonth(i); //闰哪个月
	this.isLeap = false;
	
	for(i=1; i<13 && offset>0; i++) {
	//闰月
	if(leap>0 && i==(leap+1) && this.isLeap==false){
		--i; this.isLeap=true; temp=LunarCalendar.leapDays(this.year);
	}else{temp=LunarCalendar.monthDays(this.year, i);}
	
	//解除闰月
	if(this.isLeap==true && i==(leap+1)) this.isLeap = false;
	
	offset -= temp;
	}
	
	if(offset==0 && leap>0 && i==leap+1)
	if(this.isLeap){this.isLeap=false;}
	else{this.isLeap=true; --i;}
	
	if(offset<0){ offset += temp; --i; }
	
	this.month = i;
	this.MONTH=LunarCalendar.MONTH_INFO[this.month];
	this.day = offset + 1;
	this.DAY = LunarCalendar.DATE_INFO[this.day];
};
LunarCalendar.INFO=[
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,
0x14b63];
LunarCalendar.GAN=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
LunarCalendar.ZHI=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
LunarCalendar.ANIMAL=["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];
LunarCalendar.SOLAR_TERM=["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至",
	"小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"];
LunarCalendar.TERM_INFO = [0,21208,42467,63836,85337,107014,128867,150921,173149,
	195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758];
LunarCalendar.HOLIDAY_INFO=[];
LunarCalendar.MONTH_INFO = ['','一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
LunarCalendar.DATE_INFO = [
	"","初一","初二","初三","初四","初五","初六","初七","初八","初九","初十",
	"十一","十二","十三","十四","十五","十六","十七","十八","十九","二十",
	"廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十","卅一"];
/**
 * 返回农历 y年的总天数。
 * @param {Number} y
 */
LunarCalendar.yearDays = function(y){
	var i, sum = 348;
	for(i=0x8000; i>0x8; i>>=1){sum+=(LunarCalendar.INFO[y-1900] & i)?1:0;}
	return sum+LunarCalendar.leapDays(y);
};
/**
 * 返回农历 y年闰月的天数。
 * @param {Number} y
 */
LunarCalendar.leapDays = function(y){
	return LunarCalendar.leapMonth(y)?(LunarCalendar.INFO[y-1900]&0x10000?30:29) : 0;
//	if(LunarCalendar.leapMonth(y)){
//		return LunarCalendar.INFO[y-1900]&0x10000?30:29;
//	}else{
//		return 0;
//	}
};
/**
 * 返回农历 y年闰哪个月 1-12 , 没闰返回 0。
 * @param {Number} y
 */
LunarCalendar.leapMonth = function(y) {
	return(LunarCalendar.INFO[y-1900] & 0xf);
};
/**
 * 返回农历 y年m月的总天数。
 * @param {Object} y
 * @param {Object} m
 */
LunarCalendar.monthDays = function(y,m) {
	return( (LunarCalendar.INFO[y-1900] & (0x10000>>m))? 30: 29 );
};
/**
 * 传入 offset 返回干支, 0=甲子。
 * @param {Number} n
 */
LunarCalendar.cyclical = function(n) {
	return LunarCalendar.GAN[n%10]+LunarCalendar.ZHI[n%12];
};
/**
 * 年柱 1900年立春后为庚子年(60进制36)。
 * @param {Object} y
 */
LunarCalendar.year = function(y,m,d){
//	依节气调整二月分的年柱, 以立春为界
//	if(m===2 && (d+1)==LunarCalendar.solarTerm(y,2)) return cyclical(y-1900+36);
	return LunarCalendar.cyclical(y-1900+36-(m<=2?1:0));
//	if(m<=2) return LunarCalendar.cyclical(y-1900+36-1);
//	else return LunarCalendar.cyclical(y-1900+36);
};
/**
 * 月柱 1900年1月小寒以前为 丙子月(60进制12)
 * @param {Object} y
 * @param {Object} m
 */
LunarCalendar.month = function(y,m,d){
	var firstNode = LunarCalendar.solarTerm(y,m*2) //返回当月「节」为几日开始
//	alert(firstNode+":"+d);
//	依节气月柱, 以「节」为界
	if((d)==firstNode) return LunarCalendar.cyclical((y-1900)*12+m+1+13);
	return LunarCalendar.cyclical((y-1900)*12+m+1+12);
};
/**
 * 日柱
 * @param {Object} y
 * @param {Object} m
 */
LunarCalendar.date = function(y,m,d){
//	当月一日与 1900/1/1 相差天数
//	1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
	var c = Date.UTC(y,m+1,1,0,0,0,0)/86400000+25567+10; //Cyclical
	return LunarCalendar.cyclical(c+d-2);
};
/**
 * 某年的第n个节气为几日(从0小寒起算)
 * @param {Object} y
 * @param {Object} n
 */
LunarCalendar.solarTerm = function(y,n) {
	var offDate = new Date((31556925974.7*(y-1900)+LunarCalendar.TERM_INFO[n]*60000) + Date.UTC(1900,0,6,2,5));
	return offDate.getUTCDate();
};
/**
 * 
 * @param {String} f "Y","M","D"组合，忽略位置。
 */
LunarCalendar.prototype.toString = function(f){
	return this.year+"年"+this.month+"月"+this.day+"日";
};
LunarCalendar.prototype.toLocaleString = function(){
	return this.year+"年"+LunarCalendar.MONTH_INFO[this.month]+LunarCalendar.DATE_INFO[this.day]+"日";
};
/*]]>*/
