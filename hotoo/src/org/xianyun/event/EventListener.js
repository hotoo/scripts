/*<![CDATA[*/
/**
 * 用户自定义事件监听者，可以添加/删除自定义事件。
 * @namespace org.xianyun.event;
 * @extends {Object}
 * @constructor new EventListener();
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/3/26
 * @author 闲耘 (mail[AT]xianyun.org)
 */
var EventListener = function(){
	this._l = new HashMap();
	this._h = new HashMap(); // handler.
};

/**
 * 返回指定事件名称所有的监听者（处理函数列表）。
 * @param {String} n 指定事件名称。
 * @param {Boolean} b 如果不存在，是否创建空列表。
 * @return {Array} 监听者列表。
 * @ignore
 */
EventListener.prototype._get = function(n, b){
	if (b && !this._l.get(n))
		this._l.put(n, []);//alert((n));
	return this._l.get(n);
};

/**
 * 添加指定事件（名称）的对应监听者（处理函数）。
 * @param {String} n 指定事件名称。
 * @param {Function} h 指定事件触发时的处理函数。
 * @return {Number} 返回当前事件（名称）监听者的数量。
 */
EventListener.prototype.add = function(n, h){
	return this._get(n, true).push(h);
};

/**
 * 删除指定事件（名称）监听者中，已存在的指定监听者（处理函数）。
 * @param {String} n 指定事件名称。
 * @param {Function} h 指定被删除的目标监听者。
 * @return {Function, null} 返回被删除的事件监听者，如果不存在，返回null。
 */
EventListener.prototype.remove = function(n, h){
	var a = this._get(n);
	try{return a.remove(h);}catch(e){return null;}
//	return a instanceof Array?a.remove(h):null;
};

/**
 * 触发指定名称的事件（实现上是执行事件列表中指定事件（名称）的所有订阅者。
 * @param {String} n 指定事件名称。
 * @param {Object} s 事件源，一般在调用方的类定义中指向this（调用者）。
 * @param {Array} a 参数列表。
 * @ignore 未经测试。
 */
EventListener.prototype.trigger = function(n, s, a){
	for (var i=0, e=this._get(n), l=e.length; i<l; i++)
		e[i](s, a);
};

/**
 * 获得事件监听者处理函数列表，并返回可执行函数。
 * @param {Object} n 事件名称。
 * @return {Function} 该函数会执行/触发所有监听者处理函数。
 */
EventListener.prototype.get = function(n){
	var ME = this;
	return this._h.get(n)||this._h.put(n, function(){
		var e=ME._get(n); if(!e){return;}
		for (var i=0, l=e.length; i<l; i++)
			e[i].apply(ME, arguments);
	});
};
/*]]>*/