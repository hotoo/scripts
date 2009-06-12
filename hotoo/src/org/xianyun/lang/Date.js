/*<![CDATA[*/
/**
 * Date.js, object.
 * @author 闲耘 (hotoo.cn[AT]gmail.com)
 */

Date.prototype.isWeekend = function(){
	return this.getDay()%6 ? false : true
};

Date.prototype.getMDate = function(){
	return (new Date(this.getFullYear(), this.getMonth()+1, 0).getDate());
};

if (!Date.prototype.compare){
/**
 * 当前日期与另一日期比较。
 * @param date, Date. 相比较的日期对象。
 * @return Number, Long. 两个日期毫秒差值。
 */
Date.prototype.compare = function(d){
    return this-d;
};
}

/**
 * 取得某年某月的天数
 * @param {Number, Integer} year
 * @param {Number, Integer} month
 * @return {Number, Integer}
 */
Date.getDays1Month = function(year, month){
    var d = [31,28,31,30,31,30,31,31,30,31,30,31];
    if (year%4==0){d[1]=29;}
    return d[month-1];
};
Date.prototype.getDays1Month = function(month){
    return Date.getDays1Month(this.getFullYear(), this.getMonth());
};

/**
 * 计算m月d日的星座名称。
 * @param {Number} m 指定月份，基数为1（即1月为起始月）。
 * @param {Number} d 指定日期。
 * @return {String} 返回星座名称。
 * @see http://baike.baidu.com/view/110035.htm
 * 	http://www.missyuan.com/viewthread.php?tid=191267
 */
Date.astro = function(m,d){
	return Date.astro._r[m-(d<Date.astro._a[m-1]?1:0)];
//	return Date.astro._s.substr(m*2-(d<Date.astro._a[m-1]?2:0),2);
};
//Date.astro._s="魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
Date.astro._r=["摩羯","水瓶","双鱼","牡羊","金牛","双子","巨蟹","狮子","处女","天秤","天蝎","射手","摩羯"];
Date.astro._a=[20,19,21,21,21,22,23,23,23,23,22,22];

/*

白羊座 更新日期04.19.～05.13                             原来日期03.21.～04.20   
金牛座 更新日期05.14.～06.20                             原来日期04.21.～05.21   
双子座 更新日期06.21.～07.19                              原来日期05.22.～06.22   
巨蟹座 更新日期07.20.～08.19                              原来日期06.23.～07.23   
狮子座 更新日期08.20.～09.15                              原来日期07.24.～08.23   
处女座 更新日期09.16.～10.30                              原来日期08.24.～09.23   
天秤座 更新日期10.31.～11.22                              原来日期09.24.～10.23   
天蝎座 更新日期11.23.～11.29                              原来日期10.24.～11.22   
蛇夫座 更新日期11.30.～12.17   
射手座 更新日期12.18.～01.18                              原来日期11.23.～12.21   
摩羯座 更新日期01.19.～02.15                              原来日期12.22.～01.20   
水瓶座 更新日期02.16.～03.11                              原来日期01.21.～02.19   
双鱼座 更新日期03.12.～04.18                               原来日期02.20.～03.20  

["0419,0513","白羊座"],
["0514,0620","金牛座"],
["0621,0719","双子座"],
["0720,0819","巨蟹座"],
["0820,0915","狮子座"],
["0916,1030","处女座"],
["1031,1122","天秤座"],
["1123,1129","天蝎座"],
["1130,1217","蛇夫座"],
["1218,0118","射手座"],
["0119,0215","摩羯座"],
["0216,0311","水瓶座"],
["0312,0418","双鱼座"],

 */
Date.astro2 = function(m,d,v){
	v=v||0;
	var a=Date.astro2._dt[v].a, s=Date.astro2._dt[v].s, r=Date.astro2._dt[v].r;
	for (var i=0,l=a.length; i<l; i++){
		if ((((m-1)<<5)+d)<=a[i]){
			return s.substr(i*2,2);
		}
	}
};
Date.astro2._dt=[
{r:["魔羯","水瓶","双鱼","牡羊","金牛","双子","巨蟹","狮子","处女","天秤","天蝎","射手","魔羯"],
 s:"魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯",
 a:[19,50,84,116,148,181,214,246,278,310,341,373,383]},
{r:["魔羯","水瓶","双鱼","牡羊","金牛","双子","巨蟹","狮子","处女","天秤","天蝎","蛇夫","射手","魔羯"],
 s:"魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎蛇夫射手魔羯",
 a:[19,50,84,116,148,181,214,246,278,310,341,0,373,383]}
];

Date.constellation = function(m,d){
	var s=(m<10?"0"+m:m)+(d<10?"0"+d:d);
	for (var o=Date.constellation._data,i=o.length-1; i>=0; i--){
		if(o[i][0]<=s){return o[i][1];}
	}
};
Date.constellation._dataI=[
	["0101,0229","双子"],
	["0301,0431","处女"],
	["0501,0630","天平"],
	["0701,0830","天蝎"],
	["0901,1031","狮子"],
	["1101,1231","射手"]
];
Date.constellation._dataII=[
["0419,0513","白羊座"],
["0514,0620","金牛座"],
["0621,0719","双子座"],
["0720,0819","巨蟹座"],
["0820,0915","狮子座"],
["0916,1030","处女座"],
["1031,1122","天秤座"],
["1123,1129","天蝎座"],
["1130,1217","蛇夫座"],
["1218,0118","射手座"],
["0119,0215","摩羯座"],
["0216,0311","水瓶座"],
["0312,0418","双鱼座"],
];
Date.constellation._dataII=[
["0419","白羊座"],
["0514","金牛座"],
["0621","双子座"],
["0720","巨蟹座"],
["0820","狮子座"],
["0916","处女座"],
["1031","天秤座"],
["1123","天蝎座"],
["1130","蛇夫座"],
["1218","射手座"],
["0119","摩羯座"],
["0216","水瓶座"],
["0312","双鱼座"],
];

/** 
 * 将日期格式化为指定字符串。
 * 题外话：取后两位有比较数值和String.right(2)两种方法，但是数值比较的效率较高。
 * @param {String} f 使用YYYY/YY,MM/M,DD/D,hh/h,mm/m,ss/s,ms分别表示每个日期值保留的位数。
 * 	注意/存在的问题：格式化字符串中不能出现非格式化使用的YYYY,YY,MM,M,DD,D,hh,h,mm,m,ss,s,ms等字符串。
 * 	解决办法：格式化字符串的各个子串外使用大括号{}包括，如：{YY}/{M}/{D}。这样则需要使用第二个为true的参数。
 * @param {Boolean} e 精确(exactitude)，默认为false。为true则需要将YY等字符串以大括号包括，如{YY}。
 * @return {String} 返回按照指定格式输出的字符串。
 * @version 2007/08/03, 2008/3/24
 * @example <code>new Date().format("YYYY年MM月DD日 hh时mm分ss秒")</code>
 * 	result : 2007年08月03日 10时13分12秒
 */
Date.prototype.format =	function(f, e){
	var Y = this.getUTCFullYear();
	var	d =	f.replace(e?/\{Y{4}\}/g:/Y{4}/g, Y);
	var y = Y%100;
	d =	d.replace(e?/\{YY\}/g:/YY/g, y>9?y:"0"+y);
	var M = this.getUTCMonth()+1;
	d =	d.replace(e?/\{MM\}/g:/MM/g, M>9?M:"0"+M);
	d =	d.replace(e?/\{M\}/g:/M/g, M);
	var D = this.getUTCDate();
	d =	d.replace(e?/\{DD\}/g:/DD/g, D>9?D:"0"+D);
	d =	d.replace(e?/\{D\}/g:/D/g, D);

	var h = this.getHours();
	d =	d.replace(e?/\{hh\}/g:/hh/g, h>9?h:"0"+h);
	d =	d.replace(e?/\{h\}/g:/h/g, h);
	var m = this.getMinutes();
	d =	d.replace(e?/\{mm\}/g:/mm/g, m>9?m:"0"+m);
	d =	d.replace(e?/\{m\}/g:/m/g, m);
	var s = this.getSeconds();
	d =	d.replace(e?/\{ss\}/g:/ss/g, s>9?s:"0"+s);
	d =	d.replace(e?/\{s\}/g:/s/g, s);
	var ms = this.getMilliseconds();
	d = d.replace(e?/\{ms\}/g:/ms/g, ms);

	return d;
};

        /* -- 计算两个字符(YYYY-MM-DD)的日期相隔天数 -- */
function Date_Compare(asStartDate,asEndDate){
 var miStart = Date.parse(asStartDate.replace(/\-/g, '/'));
 var miEnd   = Date.parse(asEndDate.replace(/\-/g, '/'));
 return (miEnd-miStart)/(1000*24*3600);
}

      /*-- 判断一个字符串(YYYY-MM-DD)的日期是否正确 -- */
function Date_istrue(asDate){
 var lsDate  = asDate + "";
 var loDate  = lsDate.split("-");
 if (loDate.length!=3) return false;
 var liYear  = parseInt(loDate[0]);
 var liMonth = parseInt(loDate[1]);
 var liDay   = parseInt(loDate[2]);
 if ((loDate[0].length>4)||(loDate[1].length>2)||(loDate[2].length>2)) return false;
 if (isNaN(liYear)||isNaN(liMonth)||isNaN(liDay)) return false;
 if ((liYear<1900)||(liYear>3000)) return false;
 if ((liMonth>12)||(liMonth<=0))   return false;
 if (Date_getDay(liYear,liMonth)<liDay) return false;
 return !isNaN(Date.UTC(liYear,liMonth,liDay));
}

      /*-- 返回某年某月的天数-- */
function Date_getDay(aiYear,aiMonth){
 var loDay = [0,31,28,31,30,31,30,31,31,30,31,30,31];
 if (aiYear%4==0) loDay[2] = 29;
 return loDay[aiMonth];
}
/*]]>*/