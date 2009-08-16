/*<![CDATA[*/
/**
 * COMMA SEPARATED VALUE，基本规则如下：
 *  每条记录占一行；
 *  以(英文半角)逗号(,)为分隔符；
 *  逗号前后的空格会被忽略；
 *  字段中包含有逗号，该字段必须用双引号(该解析器也可以自动识别单引号，下同)括起来；
 *  字段中包含有换行符，该字段必须用双引号括起来；
 *  字段前后包含有空格，该字段必须用双引号括起来；
 *  字段中的双引号用两个双引号表示(该解析器中同样将两个连续的单引号解析为一个单引号)；
 *  字段中如果有双引号，该字段必须用双引号括起来(有单引号最好也括起来)；
 *  第一条记录，可以是字段名。
 *
 * @namespace org.xianyun.tools;
 * @constructor CSV {static object}
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/5/25
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */

var CSV = {
	/**
	 * 将字段中两个连续的（双/单）引号转换为一个引号。
	 * @param {String} s 字段的值。
	 * @return {String}
	 * @ignore
	 */
	_csv:function(s){
		return s.replace(/\"\"/g,'\"').replace(/\'\'/g,"\'");
	},
	/**
	 * 将csv格式字符串解析为二维数组，解析器不判断/不处理非法格式。
	 * @param {String} s csv格式字符串。
	 * @return {Array[Array[String,Number]]}
	 */
	parse:function(s){
		var a=s.replace(/\r\n|\r|\n/g,"\n").split("\n"), ra=/^(\"|\')((?:.|\s)*)\1$/m,
			rs=/^(\"|\')((?!\1).*)/, re={"'":/(.*)\'$/,'"':/(.*)\"$/}, r=[];
		for (var i=0,l=a.length,_a,b=false,t=null,n=false,_r=[]; i<l; i++){
			_a=a[i].split(",");
			for (var j=0,m=_a.length,c; j<m; j++){
				c=_a[j].trim();
				if(ra.test(c)){
					_r[_r.length]=CSV._csv(RegExp.$2);
				}else if(!b && rs.test(c)){
					t=CSV._csv(RegExp.$2); b=true; n=(j==m-1); q=RegExp.$1;
				}else if(b && q && re[q].test(c)){
					_r[_r.length]=t+(n?"\n":",")+CSV._csv(RegExp.$1); t=null; b=false;
				}else{
					if(b){t+="\n"+CSV._csv(c);}
					else{_r[_r.length]=CSV._csv(c);}
				}
			}
			if(!b && !(_r.length===1&&_r[0]==="")){r[r.length]=_r; _r=[];}
		}
		return r;
	},
	fieldsName:function(a){
		return a[0];
	},
	/**
	 * 根据字段名/标签名
	 * @param {Array} a 指定解析为数组后的csv数据。
	 * @param {String} n 指定字段名。
	 * @param {Number} r 指定行数，第一行值为1，以此类推。
	 */
	getFieldByName:function(a,n,r){
		var i = a[0].indexOf(n);
		if(i===-1){throw Error("Field "+n+" is in-existent.");}
		return a[r][i];
	}
};

/*]]>*/
