/*<![CDATA[*/
/**
 * @overview 中国大陆身份证号码。
 * ---身份证号码的规则

1、15位身份证号码组成：
ddddddyymmddxxs共15位，其中：
dddddd为6位的地方代码，根据这6位可以获得该身份证号所在地。
yy为2位的年份代码，是身份证持有人的出身年份。
mm为2位的月份代码，是身份证持有人的出身月份。
dd为2位的日期代码，是身份证持有人的出身日。
这6位在一起组成了身份证持有人的出生日期。
xx为2位的顺序码，这个是随机数。
s为1位的性别代码，奇数代表男性，偶数代表女性。

2、18位身份证号码组成：
ddddddyyyymmddxxsp共18位，其中：
其他部分都和15位的相同。年份代码由原来的2位升级到4位。最后一位为校验位。
校验规则是：
（1）十七位数字本体码加权求和公式
S = Sum(Ai * Wi), i = 0, ... , 16 ，先对前17位数字的权求和
Ai:表示第i位置上的身份证号码数字值
Wi:表示第i位置上的加权因子
Wi: 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2
（2）计算模
Y = mod(S, 11)
（3）通过模得到对应的校验码
Y: 0 1 2 3 4 5 6 7 8 9 10
校验码: 1 0 X 9 8 7 6 5 4 3 2

也就是说，如果得到余数为1则最后的校验位p应该为对应的0.如果校验位不是，则该身份证号码不正确。

 * @namespace org.xianyun.utils;
 * @extends {Object}
 * @constructor {static}IDCard
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @see http://dev.csdn.net/article/63/63451.shtm
 * @version 2008/12/31
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var IDCard = {
	/**
	 * 检验身份证号码是否符合规范。
	 * @param {String} id 身份证ID号码
	 * @return {Boolean}
	 */
	verify:function(id){
		if(18==id.length){return IDCard.verify18(id);}
		if(15==id.length){return IDCard.verify15(id);}
		return false;
	},
	_WI:[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],
	_VERIFY_CODE:[1,0,"x",9,8,7,6,5,4,3,2],
	verify18:function(id){
		
	},
	verify15:function(id){},
	_PREV_DATA:[],
	info:function(){}
};

/*]]>*/
