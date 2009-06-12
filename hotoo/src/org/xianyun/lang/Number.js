/*<![CDATA[*/
/** org.xianyun.lang.Number
 * 系统数值对象Number扩展方法。注：数值常量 instanceof Number == false;
 * 错误用法：1.method()
 * 正确用法：(1).method() 或 Number(1).method() 或 new Number(1).method()，以及静态方法：Number.method(1)。
 * 方法放在Number“名字空间”下，意义比较明确，一定程度上避免了命名冲突。
 *
 * @author 闲耘 (mail[AT]xianyun.org)
 */

/**
 * 圆周率(π)小数位精度为E-14的值。
 * @type {Number}
 */
Number.PI = 3.1415926535897932384626433832795;

/**
 * 自然对数的底。
 */
Number.E = 2.7182818284590452;

/**
 * 黄金分割近似值。
 * 即把一根线段分为长短不等的a、b两段，
 * 使其中长线段的比（即a+b）等于短线段b对长线段a的比，
 * 列式即为 a:(a+b) = b:a，其比值为0.6180339……
 * 比值 = (√5-1)/2 ≈ 0.6180339887498949 (Javascript计算结果)
 */
Number.GOLDEN_SECTION = 0.6180339887498949;

/**
 * 判断当前数值对象的类型是否为"number"。
 * 如果对象是数值对象，类型则肯定是"number"（typeof number=="number"），
 * 写此方法纯粹是为了简写typeof number=="number"成为这样：number.typeOf("number")（实际上并没有简化）
 * （这也参照了 number instanceof Number，也可以写成这样：number instanceof(Number)，
 * 某些对象我也实现了Object.prototype.instanceOf()方法），
 * 和使判断对象类型的方法面向对象化，以及在所有对象中实现这一方法，以便代码统一（see String.prototype.typeOf()）。
 *
 * 为什么没有定义成员属性：Number.prototype.TYPE="number" 
 * 或者 Number.prototype.type="number"，然后这样调用：num.type=="number"？
 * 忘记了。
 *
 * @ps 这些方法没有什么实用价值。@comment at 2007/08/03
 * @deprecated isNumber(n);
 */
Number.prototype.typeOf = function(type){
    return type == 'number';
};

Number._ROMAN = ["I","V","X","L"];
Number.toRoman = function(a){
	
};
Number.prototype.toRoman = function(){
	return Number._ROMAN[this]
};
Number.prototype.fromRoman = function(r){
	
};

Number.prototype.compare = function(n){
	return this-n;
//	var i=this-n;
//	if(i>0){return 1;}
//	return this===0?0:-1;
};

/**
 * 符号函数。
 * @return {Number} 如果参数num等于0，返回0；如果num大于0，返回1；如果num小于0，返回-1；
 * 特别的，如果num是NaN，返回NaN；[REMOVE:如果num是+0或者-0，返回与num相同的值(+0|-0)]。
 */
Number.prototype.signum = function(){
	if (isNaN(this)) return NaN;
	if (this===0) return 0;
	return this>0?1:-1;
};

/**
 * 判断当前数值对象是否是整数。
 * @return {Boolean} true，如果数值是整数，否则返回false。
 */
Number.prototype.isInteger = function(){
    //return parseInt(this.valueOf())===this.valueOf();
	return /^[+-]?\d+$/.test(this);
};

/**
 * 判断数值是否是为正数。
 * @return {Boolean} true，如果数值是正数，否则返回false。
 */
Number.prototype.isPositive = function(){
	return this>0;
};

/**
 * 判断数值是否是为负数。
 * @return {Boolean} true，如果数值是负数，否则返回false。
 */
Number.prototype.isNegative = function(){
	return this<0;
};

/**
 * 判断数值是否为正整数。
 * @return {Boolean} true，如果数值为正整数，否则返回false。
 */
Number.prototype.isPositiveInteger = function(){
	return this.isPositive() && this.isInteger();
};

/**
 * 判断数值是否为负整数。
 * @return {Boolean} true，如果数值为负整数，否则返回false。
 */
Number.prototype.isNegativeInteger = function(){
	return this.isNegative() && this.isInteger();
};

//Number.prototype.isLong = function(){window.alert("implement...");};

/**
 * 判断当前数字的值是否为奇数（定义：不能被2整除的(整)数，如1，3和5）。
 * 关于零(0)是否属于偶数，目前似乎尚无定论，这里不予理会，作为偶数处理。
 * @return {Boolean} true，如果当前值是奇数，否则，返回false。
 */
Number.prototype.isOdd = function(){
	/* Javascript整除(取模)运算：
	 * 被除数为正整数时，结果为0或1；
	 *       为负整数时，结果为0或-1；
	 *       为0时，结果为0；
	 *       为小数时，结果为正或负小数。
	 */
	return (n&1) !== 0; // 效率更高。
//	return ((this%2)!==0);
//	return this.isInteger() && ((this%2)!==0);
};

/**
 * 判断当前数值对象的值是否为质数（定义：除了1和它本身以外，不能再被别的整数整除）。
 * @return {Boolean} true，当前数值对象是质数，否则返回false。
 */
Number.prototype.isPrime = function(){
	if (!this.isInteger()) return false;
	
	for (var i=2; i<this; i++){
		if (this%i !== 1) return false;
	}
	return true;
};

/**
 * 判断数值是否属于斐波纳契数列中的值。
 * @return {Boolean} true，如果数值属于斐波纳契数列，否则返回false。
 */
Number.prototype.isFibonacci = function(){
	for (var i=1; i<this; i++){
		var f = Number.fibonacci(i);
		if (this>f) continue;
		else if (f===this) return true;
		else return false;
	}
};
/**
 * 求斐波纳契(fibonacci)数列中第index的值。
 * 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...
 * 从第三个数起，每个数都是前两数之和。
 * 从第3个数开始每隔两个必是2的倍数，
 * 从第4个数开始每隔3个必是3的倍数，
 * 从第5个数开始每隔4个必是5的倍数...
 * 越往后，相邻两项的比值会无限趋向于黄金比1.61803...
 * 斐波纳契特征根方程解：an = (((1 + √5)/2)^n - ((1 - √5)/2)^n)/√5 
 * @param {Number} index 指定的斐波纳契(fibonacci)数列索引值。
 * @return {Number} 返回斐波纳契数列中第index个值。
 */
Number.fibonacci = function(index){
	if (!index.inInteger() || index<1)
		throw new Error("param must be integer number.");
	return (index===1||index===2)?
		1:Number.fibonacci(index-1)+Number.fibonacci(index-2);
};

/** 判断数值对象参数是否是浮点数。
 * @param n, Number, String, Object.
 * @return Boolean.
 */
if (!Number.isFloat){
Number.isFloat = function(n){
    return this.toString().test(/^\d*\.\d*$/);
};
}
/** 判断当前数值对象是否是浮点数。
 * @param void.
 * @return Boolean.
 */
if (!Number.prototype.isFloat){
Number.prototype.isFloat = function(){
    return Number.isFloat(this);
};
}
//Number.prototype.isDouble = function(){throw new Error("implement...");};

/**
 * 十进制转换为十六进制格式字符串。
 * @return {String}
 */
Number.prototype.toHex = function(){
    return this.toString(16);
};

/**
 * 将数值（字符串型）用千分号分隔。
 * @return {String}
 * 注：没有放在String.js的原因是这个不是为String写的。
 */
String.prototype.commafy = function(){
    var _n = this.match(/(-?\d+)(\.\d*)?/);
    var __n = _n[1].match(/(-?\d{0,3})((?:\d{3})*)/);
    return __n[1] + __n[2].replace(/(\d{3})/g, ",$1") + // integer.
        _n[2].replace(/(\d{3})/g, "$1,").replace(/(.*),$/, "$1"); // decimal.
};
Number.prototype.commafy = function(){
    return this.toString().commafy();
};

Number.prototype.format = function(len, style){
	var a = this.toString().split(".");
	if(a[0].length>=len)return a.join(".");
	return new Array(len-a[0].length+1).join("0") + a[0] + (a[1]?"."+a[1]:"");
};

/**
 * 将数值（字符串型）去除千分号分隔。
 * @return {String}
 * 注：没有放在String.js的原因是这个不是为String写的。
 */
String.prototype.decommafy = function(){
    return this.replace(/,/g, "");
};


Number.getMax = function(num0, num1){
    return Math.max(num0, num1);
};
Number.getMax2 = function(num0, num1){
    return num0>num1 ? num0 : num1;
};


Number.getMin = function(num0, num1){
    return Math.min(num0, num1);
};
Number.getMin2 = function(num0, num1){
    return num0<num1 ? num0 : num1;
};


/**
 * 获得一组数值对象参数中的最大数。
 * @param {unknow, arguments, Number}
 * @return {Number}
 */
if (!Number.max){
Number.max = function(){
    var max = arguments[0];
    for (var i=1; i<arguments.length; i++){
        max = (arguments[i]>max ? arguments[i] : max);
    }
    return max;
};
}

/**
 * 获得一组数值对象参数中的最小数。
 * @param {nuknow, arguments, Number}
 */
if (!Number.min){
Number.min = function(){
    var min = arguments[0];
    for (var i=1; i<arguments.length; i++){
        min = (arguments[i]<min ? arguments[i] : min);
    }
    return min;
};
}

/**
 * 四舍五入。
 * @return {Number, Integer}
 */
if (!Number.round){
Number.round = function(n){
    return Math.round(n);
};
Number.round2 = function(n){
    var i = parseInt(n);
    if (n>=0){
        return (n-i>=0.5) ? (i+1) : i;
    }else {
        return (i-n>=0.5) ? (i-1) : i;
    }
};
}
if (!Number.prototype.round){
Number.prototype.round = function(){
    return Math.round(this);
}
Number.prototype.round2 = function(){
    return Number.round(this);
};
}
Number.prototype.round = function(precision){ 
	precision = Math.pow(10, precision || 0); 
	return Math.round(this * precision) / precision; 
}

/**
 * 向上取整。
 * @return {Number, Integer}
 */
if (!Number.roundingUp){
Number.roundingUp = function(n){
    var i = parseInt(n);
    if (n>=0){
        return i==n ? i : i+1;
    } else {
        return i;
    }
};
}
if (!Number.prototype.roundingUp){
Number.prototype.roundingUp = function(){
    return Number.roundingUp(this);
};
}

/**
 * 向下取整。
 * @return {Number, Integer}
 */
if (!Number.roundingDown){ // alow rounding
Number.roundingDown = function(n){
    var i = parseInt(n);
    if (n<0){
        return i==n ? i : i-1;
    } else {
        return i;
    }
};
}
if (!Number.prototype.roundingDown){
Number.prototype.roundingDown = function(){
    return Number.roundingDown(this);
};
}
Number.prototype.round=function(precision){ 
	precision = Math.pow(10, precision || 0); 
	return Math.round(this * precision) / precision; 
}; 
Number.prototype.floor=function(precision){ 
	precision = Math.pow(10, precision || 0); 
	return Math.floor(this * precision) / precision; 
};
/** 将数值格式化输出
 * @param {String} format
 * @return {String}
 * eg: num.format("00.0000E0");
 * 参数中带E表示格式化为浮点型，小数点前的保留2位整数，小数点后保留4位小数
 * @version 2007/08/03
 */
if (!Number.prototype.format){
Number.prototype.format = function(format){
    window.alert("unimplemented");
};
/**
 * 将数字前补零。
 * TODO 数值本身位数长度大于参数值时，结果不正确。
 */
Number.prototype.format = function(l){
	return ((new Array(l).join("0")+(this|0)).slice(-l))
};
}
Number.prototype.format = function(len){
	return ((new Array(len).join("0")+(this|0)).slice(-len));
};

/** 
 *
 *
 */
/*]]>*/