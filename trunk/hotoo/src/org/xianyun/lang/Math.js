/*<![CDATA[*/
/** 
 * @class Math.js
 * @create 2007/08/06
 * @author 闲耘 (hotoo.cn[AT]gmail.com)
 */

if (!Math.roundingUp){
/** 
 * 向上取整。
 * @param void.
 * @return Math, Integer.
 */
Math.roundingUp = function(n){
    var i = parseInt(n);
    if (n>=0){
        return i==n ? i : i+1;
    } else {
        return i;
    }
};
}


if (!Math.roundingDown){ // alow rounding
/** 
 * 向下取整。
 * @param void.
 * @return Math, Integer.
 */
Math.roundingDown = function(n){
    var i = parseInt(n);
    if (n<0){
        return i==n ? i : i-1;
    } else {
        return i;
    }
};
}

/**
 * 取x以b为底的对数。
 * @param {Number} x 被求数。
 * @param {Number} b 基数，底数。
 * @return {Number} 求得被求数的对数。
 */
Math.logb = function(x,b){
	return Math.log(x)/Math.log(b); //换底公式
};

/**
 * 求数值n的阶乘，这是按照阶乘定义实现的基本算法。
 * 另外，规定0的阶乘等于1(0!=1)。
 * @param {Number} n 指定求阶乘的目标数值。
 * @return {Number} 返回n的阶乘结果。
 * @version 2007/12/26
 */
Math.factorial = function(n){
	if (n===0){return 1;}
	if (!n.isPositiveInteger()){throw new Error("param error.")}
	var r=1;
	for (var i=2; i<=n; i++){
		r *= i;
	}
	return r;
};

/** 
 * 数学方法，递归(Recursion)方式求数值n的阶乘。
 * @param {Number} n
 * @return {Number}
 * @version 2007/08/08
 */
Math.factorial_I = function(n){
	return n<=1?1:n*Math.factorial_I(n-1);
};
/**
 * 尾递归(Tail Recursion)方式实现阶乘。
 * @param {Number} n 求数值n的阶乘。
 * @return {Number} 返回n的阶乘。
 */
Math.factorial_III = function(n){
	var a = arguments[1]||1;
	return n<=1?a:Math.factorial_III(n-1, a*n);
};
/**
 * 求阶乘的改进算法。
 * 循环求积次数减少一半，但是求平方时增加开销，在IE6,Firefox2,Safari3下测试求170的阶乘
 * （大于170的阶乘结果为Infinity，没有实际意义）均比简单求积方法少不到10毫秒。
 * 求小于50的阶乘的效率表现有时不如直接使用简单的累乘方法。
 * @param {Number, Integer} n 求阶乘的目标整数。
 * @see <a href="http://www.matrix67.com/blog/article.asp?id=442">计算阶乘的另一些有趣的算法</a>,
 * 	<a href="http://www.luschny.de/math/factorial/index.html">巨牛，20多种阶乘算法的代码</a>
 */
Math.factorial_II = function(n){
	if (n===0){return 1;}
	if (!n.isPositiveInteger()){throw new Error("param error.")}
//	var m=(n.isOdd()?(n+1):n)/2; // middle number.
//	var r = n.isOdd()?m:m*n; //result;
	var m,r;
	if (n.isOdd()){
		m=(n+1)/2;
		r=m;
	} else {
		m=n/2;
		r=m*n;
	}
	for (var i=1; i<m; i++){
	//	r*=(Math.pow(m,2) - Math.pow(i,2)); // Math.pow方法求平方比两个数直接相乘的效率低很多。
		r*=(m*m - i*i);
	}
	return r;
};

/**
 * 伽玛函数(Gamma Function)
 * @see <a href="http://lpl.hkcampus.net/~lpl-wwk/Graphics/Casio/Gamma%20Function.htm">Gamma Function</a>
 * 		<a href="http://www.sosmath.com/calculus/improper/gamma/gamma.html">The Gamma Function</a>
 * 		<a href="http://mathworld.wolfram.com/GammaFunction.html">Gamma Function</a>
 * @param {Object} n
 */
Math.gammaFunction = function(n){};

/**
 * 贝塔函数(Beta Function)
 * @see <a href="http://lpl.hkcampus.net/~lpl-wwk/Graphics/Casio/Beta%20Function.htm">Beta Function</a>
 */
Math.betaFunction = function(){};

/**
 * 对Math.max的扩展，允许2个以上的参数列表。
 * @param {Number} x
 * @param {Number} y
 * @return {Number}
 */
Math.max2 = function(x, y){
	var m = Math.max(x, y);
	for (var i=2; i<arguments.length; i++){
		m=Math.max(m, arguments[i]);
	}
	return m;
};

/**
 * 求n的平方。实际应用中，简单的相乘比数学方法pow()效率较高。
 * @param {Number} n 指定被求平方数。
 * @return {Number} 返回指定数值n的平方。
 */
Math.square = function (n){
    return n*n;
};

/**
 * 求n的平方。
 * 使用数学方法pow()，效率也很高，但是实际应用中简单的相乘更快。
 * @param {Number} n 指定被求平方数。
 * @return {Number} 返回指定数值n的平方。
 */
Math.square_I = function(n){
    return Math.pow(n,2);
};

/**
 * 求n的立方。
 * @param {Number} n
 */
Math.cube = function(n){
    return n*n*n;
};

Math.cube_II = function(n){
    return Math.pow(n,3);
};
/*]]>*/