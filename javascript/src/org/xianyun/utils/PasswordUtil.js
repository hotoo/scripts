/*<![CDATA[*/
/*
 * 
 * 数字、小写英文、大写英文、符号四种字符集，还综合了长度、跨字符集、字典三个因素
 * 
 * 
 * 
	1.如果密码少于5位,那么就认为这是一个弱密码.
	2.如果密码只由数字、小写字母、大写字母或其它特殊符号当中的一种组成,则认为这是一个弱密码.
	3.如果密码由数字、小写字母、大写字母或其它特殊符号当中的两种组成,则认为这是一个中度安全的密码.
	4.如果密码由数字、小写字母、大写字母或其它特殊符号当中的三种以上组成,则认为这是一个比较安全的密码.
*/

var PasswordUtil = {
	NONE:0, //空密码
	LOWER:1,
	LOWNESS:2,
	MIDDLING:3,
	HIGHNESS:4,
	HIGHER:5,
	
	getLevel:function(pwd){
		var rlc = /[a-z]+/; // 小写字母
		var ruc = /[A-Z]+/; // 大写字母
		var rnc = /[0-9]+/; // 数字
		var rec = /[^a-zA-Z0-9]+/; // 特殊字符
		var level = 0;
		if (rlc.test(pwd)) level++;
		if (ruc.test(pwd)) level++;
		if (rnc.test(pwd)) level++;
		if (rec.test(pwd)) level++;
		
		switch (level){
		case 0:
		case 1:
			return this.LOWNESS;
		case 2:
			return this.MIDDLING;
		default:
			return this.HIGHNESS;
		}
	}
};

/*]]>*/