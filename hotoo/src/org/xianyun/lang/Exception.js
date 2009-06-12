/*<![CDATA[*/
/**
 * @overview 这里集合了常用类型化异常类。
 * 对于弱类型的Javascript来说，类型化异常也许没有必要，你可以直接简单的抛出Error，大都数浏览器都能捕获这个错误/异常。
 * 如果你希望类型化异常，可以抛掷这里定义的异常类型，或者你也可以基于这些类扩展自己的异常类。
 * 在扩展自定义异常时，需要注意以下几点：
 * 	1. 系统核心类Error使用原型继承时，需要在异常构造函数中返回异常（参看Throwable类）。
 * 	2. 由于原型继承方式需要在定义子类时创建超类实例而直接掷出超类异常，建议将子类封装(Packing)并在构造函数中调用父类的构造。参考“深入Javascript类与继承机制”。
 * 在应用中抛出异常时，需要注意：
 * 	1. 异常掷出方式多种多样，包括：
 * 		i. 抛出异常类本身(throw Exception(msg))
 * 		ii. 抛出异常类实例(throw new Exception(msg))
 * 		iii. 创建异常类实例(new Exception(msg))
 * 		iv. 将异常类作为方法/函数类调用(Exception(msg))
 * 		这些抛掷方式均可以被浏览器异常管理器捕获。
 * 	2. 使用try/catch捕获异常时，异常描述信息建议使用ex.message，这个属性兼容多浏览器。
 * @since IE5.0, Firefox1.0, Opera8.0, Safari3.0, Netscape8.0
 * @version 2008/3/22
 * @author 闲耘(mail[AT]xianyun.org)
 */

/**
 * 可抛掷的异常超类，实际异常在此掷出。
 * @namespace org.xianyun.lang;
 * @extends {Object}
 * @exception {Error}
 * @constructor new Throwable(msg);
 * @param {String} m 异常描述信息。
 */
var Throwable = function(m){
	return Error.call(this, "\r{Throwable}:"+(m||"Unknow Throwable."));
};
//Throwable.prototype = new Error();
//Throwable.prototype.constructor = Throwable;

/**
 * 普通异常类。
 * @namespace org.xianyun.lang;
 * @extends {Throwable}
 * @exception {Error}
 * @constructor new Exception(m);
 * @param {String} m 异常描述信息。
 */
var Exception = function(m){
	return Throwable.call(this, "\r  |\r  +--{Exception}:"+(m||"Unknow Exception."));
};

/**
 * 参数异常。
 * @namespace org.xianyun.lang;
 * @extends {Exception}
 * @exception {Error}
 * @constructor new ArgumentException(m);
 * @param {String} m 错误信息描述。
 */
var ArgumentException = function(m){
	return Exception.call(this, "\r    |\r    +--{ArgumentException}:"+(m||"Argument Exception."));
};

/**
 * 未找到指定文件时抛出此异常。
 * @namespace org.xianyun.io;
 * @constructor new FileNotFoundException(m);
 * @extends {Exception}
 * @param {String} m 异常描述信息。
 */
var FileNotFoundException = function(m){
	return Exception.call(this, "\r    |\r    +--{FileNotFoundException}:"+(m||"File Not Found Exception."));
};

/**
 * 输入/输出异常。
 * @namespace org.xianyun.io;
 * @constructor new IOExecption(m);
 * @extends {Exception}
 * @param {String} m 异常描述信息。
 */
var IOException = function(m){
	return Exception.call(this, "\r    |\r    +--{IOException}:"+(m||"Input/Output Exception."));
};

/**
 * 系统不支持某功能/方法时抛出此异常。
 * @namespace org.xianyun.lang;
 * @extends {Exception}
 * @exception {Error}
 * @constructor new NotSupportException(m);
 * @param {String} m 异常信息描述。
 */
var NotSupportException =  function(m){
	return Exception.call(this, "\r    |\r    +--{NotSupportException}:"+(m||"System doesn't support."));
};

/**
 * 当类/方法等未实现时，抛出此异常。
 * @namespace org.xianyun.lang;
 * @extends {Exception}
 * @exception {Error}
 * @constructor new NotImplementedException(m);
 * @param {String} m 异常描述信息。
 */
var NotImplementedException = function(m){
	return Exception.call(this, "\r    |\r    +--{NotImplementedException}:"+m||"Not Implemented Exception.");
};

/**
 * 数组或其它域超出范围时抛出此异常。
 * @namespace org.xianyun.lang;
 * @extends {Exception}
 * @exception {Error}
 * @constructor new OutOfBoundException(m);
 * @param {String} m 异常描述信息。
 */
var OutOfBoundException = function(m){
	return Exception.call(this, "\r    |\r    +--{OutOfBoundException}:"+m||"Out of Bound Exception.");
};

/**
 * 运行时异常。
 * @namespace org.xianyun.lang;
 * @exception {Error}
 * @extends {Exception}
 * @constructor new RuntimeException(m);
 * @param {String} m 错误信息描述。
 */
var RuntimeException = function(m){
	return Exception.call(this, "\r    |\r    +--{RuntimeException}:"+m||"Runtime Exception.");
};

/**
 * 解析异常。
 * 将字符串或其他对象解析为指定类型对象出现错误时，抛出此异常。
 * @namespace org.xianyun.lang;
 * @extends {Exception}
 * @exception {Error}
 * @constructor new ParseException(m);
 * @param {String} m 异常描述信息。
 */
var ParseException = function(m){
	return Exception.call(this, "\r    |\r    +--{ParseException}:"+m||"Parse Exception.");
};

/*]]>*/
