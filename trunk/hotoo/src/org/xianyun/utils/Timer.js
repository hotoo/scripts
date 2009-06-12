/*<![CDATA[*/
/**
 * 定时器，可以设置第一次触发（距离当前时间）的时间。
 * @namespace org.xianyun.utils;
 * @extends {Object}
 * @constructor new Timer(delay,handler);
 * @param {Number} delay 每次触发间隔。
 * @param {Function} handler 触发器监听者。
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @author 闲耘(mail[AT]xianyun.org)
 * @version 2008/3/10
 */
var Timer = function(delay, handler){
	this._timer=null;
	this._tasks = new EventListener();
	if(handler){this._tasks.add("trigger",handler);}
	this._task=Function.createDelegate(this,this._tasks.get("trigger"));
	this._delay=delay;
	this._inited = false;
};
/**
 * 设置首次触发间隔。
 * @param {Number} delay
 */
Timer.prototype.setInitialDelay = function(delay){
	this._initDelay = delay;
};
/**
 * 设置每次触发间隔。
 * @param {Number} delay
 */
Timer.prototype.setDelay = function(delay){
	this._delay = delay;
};
Timer.prototype.addTrigger=function(h){
	this._tasks.add("trigger",h);
};
Timer.prototype.removeTrigger=function(h){
	this._tasks.remove("trigger",h);
};
/**
 * 第一次触发时（有start）调用此函数。
 */
Timer.prototype._cycle = function(){
	this._task();
	this._timer = window.setInterval(this._task, this._delay);
	this._inited = true;
};
/**
 * 开始计时。
 */
Timer.prototype.start = function(){
	this._inited = false;
	window.setTimeout(Function.createDelegate(this,this._cycle), this._initDelay);
};
/**
 * 停止计时器。
 */
Timer.prototype.stop = function(){
	if (!this._inited)
		window.clearTimeout(this._timer);
	else 
		window.clearInterval(this._timer);
};
/**
 * 重启计时器。
 */
Timer.prototype.restart = function(){
	this.stop(); this.start();
};

/*]]>*/
