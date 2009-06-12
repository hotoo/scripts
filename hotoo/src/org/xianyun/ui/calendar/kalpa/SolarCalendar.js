/*<![CDATA[*/

var SolarCalendar = function(){
	
};

/*
 * 4年一闰，百年不闰，400年再闰 
 * 也就是说： 
 * 在公历（格里历）纪年中，有闰日的年份叫闰年，一般年份365天，闰年为366天。
 * 由于地球绕太阳运行周期为365天5小时48分46秒（合365.24219天）即一回归年，公历把一年定为365天。
 * 所余下的时间约为四年累计一天，加在二月里，所以平常年份每年365天，二月为28天，闰年为366天，二月为29天。
 * 因此，每400年中有97个闰年，闰年在2月末增加一天，闰年366天。
 * 闰年的计算方法：公元纪年的年数可以被四整除，即为闰年；被100整除而不能被400整除为平年；
 * 被100整除也可被400整除的为闰年。如2000年是闰年，而1900年不是。
 * @see <a href="http://zhidao.baidu.com/question/36555624.html">为什么有时候是4年一闰，有时候是400年一闰？</a>
 *      <a href="http://blog.vckbase.com/teacheryang/archive/2006/10/16/22774.html">闰年的计算</a>
 */
SolarCalendar.prototype.isLeepYear = function(y){
	return y%4===0 && (y%100!==0 || y%400===0);
};
SolarCalendar.getDays1Month = function(y, m){
	
};
/*]]>*/