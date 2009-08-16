/**
 * 克隆对象。拷贝对象有浅层拷贝(shallow copy)和深层拷贝(deep copy)之分：
 * 浅层拷贝即<i>拷贝对象</i>指向<i>被拷贝对象</i>的引用，例如对象赋值方式；
 * 深层拷贝即<i>拷贝对象</i>创建新的对象，并使用<i>被拷贝对象</i>的属性初始化<i>拷贝对象</i>。
 * 这里的clone方法均为深层拷贝(Function类型例外)。
 * 测试未通过，实验中。
 * @author 闲耘 (mail[AT]xianyun.org)
 * @version 1.0, 2007/12/06
 */

/**
 * 扩展对象(Object)的克隆方法(拷贝行为)。
 * 该方法同样会拷贝对Object对象的扩展方法/属性，例如Object.prototype.clone方法本身。
 * @return {Object}
 */
Object.prototype.clone = function(){
	var o = {};
	for (var k in this){
		if (this[k]===null){
			o[k] = null;
		} else {
			o[k] = this[k].clone();
		}
	}
	return o;
};

/**
 * 扩展Function类似的克隆方法。
 * @return {Function}
 */
Function.prototype.clone = function(){
	return this;
};

/**
 * 扩展字符串类型(String)的克隆方法。
 * 字符串是不可变对象，两个值相同的字符串基本类型完全相等，即其内存地址相同(""==="")。
 * Javascript虚拟机在实现上其实也是将值相等的字符串引用指向同一内存地址。
 * 而每次new出来的字符串对象(尽管值相等)内存地址不相同。
 * 这里返回字符串基本类型的值。
 * @return {String}
 */
String.prototype.clone = function(){
	return this.valueOf();
	//return new String(this.valueOf());
};

/**
 * 扩展数值类型(Number)的克隆方法。
 * @return {Number}
 */
Number.prototype.clone = function(){
	return this.valueOf();
	//return new Number(this.valueOf());
};

/**
 * 扩展布尔类型(Boolean)的克隆方法。
 * @return {Boolean}
 */
Boolean.prototype.clone = function(){
	//return this.valueOf();
	return this.valueOf()?true:false;
	//return new Boolean(this.valueOf()).valueOf();
};

/**
 * 扩展日期类型(Date)的克隆方法。
 * @return {Date}
 */
Date.prototype.clone = function(){
	return new Date(this.valueOf());
};

/**
 * 扩展正则表达式类型(RegExp)的克隆方法。
 * @return {RegExp}
 */
RegExp.prototype.clone = function(){
	return new RegExp(this.source, 
		(this.ignoreCase?"i":"")+
		(this.multiline?"m":"")+
		(this.global?"g":""));
};

/**
 * 扩展数组类型(Array)的克隆方法。
 * @return {Array}
 */
Array.prototype.clone = function(){
	var a = [];
	for (var i=0; i<this.length; i++){
		a[i] = this[i].clone();
	}
	return a;
};
