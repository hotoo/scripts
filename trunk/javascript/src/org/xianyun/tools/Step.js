/*<![CDATA[*/
/**
 * @overview Step
 * @namespace org.xianyun.tools;
 * @extends {Object}
 * @constructor new Step();
 * @param {Function} p 步骤执行过程。
 * @param {Number} d 每步延时时长。
 * @param {Function} c 停止步骤的条件。
 * @param {Array} a 步骤执行过程的参数。
 * @param {Function} f 步骤完成时执行此方法。
 * @version 2008/6/18
 * @deprecated 以类实现不带来任何好处。
 */
var Step = function(p,d,c,a,f){
	this.process = p;
	this.delay = d;
	this.condition = c;
	this.param = a;
	this.finish = f;
};
Step.prototype.exec = function(){
	var p=this.process, d=this.delay, c = this.condition, a = this.param, f=this.finish;
	var i = window.setInterval(function(){
		if(!c()){p.apply(p,a);}
		else{
			window.clearInterval(i);
			if(f instanceof Function){f();}
		}
	},this.delay);
};


/**
 * @overview 按照指定时间间隔执行步骤过程，直至满足停止条件。
 * @param {Function} o 执行步骤前的初始化过程，可选。
 * @param {Function} f 步骤执行过程，必须。
 * @param {Number} t 每步执行间隔时间，可选，默认为1毫秒。
 * @param {Function} p 停止执行步骤的条件，必须。
 * @param {Array} a 步骤执行过程的参数，可选。
 * @param {Function} d 步骤执行完成后执行此方法，可选。
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version 2008/6/18, 2008/6/28
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */

function step(o,f,t,p,a,d){
	if(o instanceof Function){o.apply(o,a);}
	var v=0, l=a?a.length||0:0, i=window.setInterval(function(){
		a[l]=(v++);
		if(!p.apply(p,a)){f.apply(f,a);}
		else{window.clearInterval(i);if(d instanceof Function){d.apply(d,a);}}
	},t||1);
}
/*]]>*/
