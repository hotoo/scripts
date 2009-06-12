/*<![CDATA[*/
/** Complex, 复数。
 * @class org.xianyun.math.Complex
 * @create 2007/08/08
 * @author 闲耘 (hotoo.cn[AT]gmail.com)
 */

/** 复数对象构造函数。
 * @param {Number} real 实数部分。
 * @param {Number} imaginary 虚数部分。
 */
var Complex = function(real, imaginary){
    this.real = real|0;
    this.imag = imaginary|0;
};

Complex.i=NaN;
Complex.I=Complex.i;

/**
 * 求复数的平方。
 * @param {Complex} complex 指定求平方的复数对象。
 * @return {Complex}
 */
Complex.square = function(complex){
	return complex.multiply(complex);
};

/**
 * 复数的立方。
 * @param {Complex} complex 指定求立方的复数对象。
 * @return {Complex}
 */
Complex.cube = function(complex){
	return complex.multiply(complex.multiply(complex));
};

///** 复数加法静态方法。
// * @param c1, Complex. 被加数。
// * @param c2, Complex. 加数。
// * @return Complex.
// * @deprecated
// */
//Complex.plus = function(c1, c2){
//    return new Complex(c1.real+c2.real, c1.imag+c2.imag);
//};
//
//
///** 复数减法静态方法。
// * @param c1, Complex. 被减数。
// * @param c2, Complex. 减数。
// * @return Complex.
// * @deprecated
// */
//Complex.minus = function(c1, c2){
//    return new Complex(c1.real-c2.real, c1.imag-c2.imag);
//};
//
//
///** 复数乘法静态方法。
// * @param c1, Complex. 被乘数。
// * @param c2, Complex. 乘数。
// * @return Complex.
// * @deprecated
// */
//Complex.multiply = function(c1, c2){
//    return new Complex(c1.real*c2.real-c1.imag*c2.imag, c1.real*c2.imag+c1.imag*c2.real);
//};
//
///** 比较两个复数对象的值是否相等。
// * @param complex1, Complex.
// * @param complex2, Complex.
// * @return Boolean.
// * @deprecated
// */
//Complex.equals = function(complex1, complex2){
//    return (complex1.real==complex2.real) && (complex1.imag==complex2.imag);
//};
//
//
///** 复数除法静态方法。
// * @param c1, Complex. 被除数。
// * @param c2, Complex. 除数。
// * @return Complex.
// * @deprecated
// */
//Complex.divide = function(c1, c2){
//    return new Complex((c1.real*c2.real+c1.imag*c2.real)/(c2.real*c2.real+c2.imag*c2.imag),
//        (c1.imag*c2.real-c1.real*c2.imag)/(c2.real*c2.real+c2.imag*c2.imag));
//};


/** 当前复数对象加上复数对象complex.
 * @param {Complex} complex 指定相加的复数对象。
 * @return {Complex}
 */
Complex.prototype.plus = function(complex){
    return new Complex(this.real+complex.real, this.imag+complex.imag);
};
Complex.prototype.add = Complex.prototype.plus;


/** 当前复数对象减去复数对象complex.
 * @param {Complex} complex 指定相(被)减的复数对象。
 * @return {Complex}
 */
Complex.prototype.minus = function(complex){
    return new Complex(this.real-complex.real, this.imag-complex.imag);
};
Complex.prototype.sub = Complex.prototype.minus;

/** 当前复数对象乘以复数对象complex.
 * @parsm complex, Complex.
 * @return Complex.
 */
Complex.prototype.multiply = function(complex){
    return new Complex(this.real*complex.real-this.imag*complex.imag, this.real*complex.imag+this.imag*complex.real);
};


/** 当前复数对象除以复数complex.
 * @param {Complex} complex 复数对象。
 * @return {Complex} 相除后的复数对象。
 */
Complex.prototype.divide = function(complex){
    return new Complex((this.real*complex.real+this.imag*complex.real)/(complex.real*complex.real+complex.imag*complex.imag),
        (this.imag*complex.real-this.real*complex.imag)/(complex.real*complex.real+complex.imag*complex.imag));
};


/** 比较当前复数对象的值是否与指定复数对象的值相等。
 * @param {Complex} complex.
 * @return {Boolean}
 */
Complex.prototype.equals = function(complex){
    return (complex instanceof Complex)&&
		(this.real===complex.real)&&
		(this.imag===complex.imag);
};


/** 复数求模。
 * @return {Number}
 */
Complex.prototype.module = function(){
    return Math.sqrt(this.real*this.real + this.imag*this.imag);
};


/** 复数转为字符串对象。
 * @param void.
 * @return String.
 */
Complex.prototype.toString = function(){
	if (this.real===0 && this.imag===0){
		return "0";
	} else if (this.real===0){
		return this.imag+"i";
	} else if(this.imag===0){
		return ""+this.real;
	} else {
		return this.real+"+"+this.imag+"i";
	}
};

/*]]>*/