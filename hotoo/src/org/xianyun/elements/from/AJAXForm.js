/**
 * 将指定表单form附加异步/同步行为(Behavior)并自动管理之。
 * 需要在提交前校验数据的，请在实例化AJAXForm之前/在Form标签中实现校验函数
 * (请不要在实例化之后覆盖onsubmit事件的处理函数，
 * 因为为对象绑定事件处理函数的方式不能保证处理函数的执行顺序)。
 * 校验数据函数实现方式雷同于同步方式，不能通过校验则返回false。
 * 注：为表单定义onsubmit事件需使用return，如onsubmit="return verify();"。
 * 表单提交没有涉及到file类型。
 * 
 * 发送的数据亦雷同于普通form同步方式(使用encodeURIComponent方法转码)。
 * 
 * @namespace org.xianyun.elements.form
 * @constructor new AJAXForm(form, callback)
 * @param {HTMLElement, Form} form 指定Form表单对象。
 * @param {Function} callback 异步/同步提交后的回调函数。
 * @since IE6.0, Firefox1.0, Safari3.0, Opera9.0
 * @version 2008/3/10
 * @author 闲耘(mail[AT]xianyun.org)
 */
var AJAXForm = function(f, c){
	var r;
	/**
	 * 指定提交数据的方式（异步/同步），默认为异步。
	 * @type {Boolean}
	 */
	this.async = true;

	/**
	 * 获得Form表单提交的数据。
	 * @return {String} 类似k=v&a=b的键值对。
	 */
	this.getParams = function(){
		var s = "";
		for (var i=0; i<f.elements.length; i++){
			var e = f.elements[i];
			switch (e.type){
			case "submit": case "reset": case "image":
				break;
			case "radio": case "checkbox":
				if (e.checked)
					s+="&"+e.name+"="+encodeURIComponent(e.value);
				break;
			case "select-one": // select>option
				if (e.length>0)
					s+="&"+e.name+"="+encodeURIComponent(e.value);
				break;
			case "select-multiple": // select=multiple>option 
				for (var i=0; i<e.length; i++)
					if (e[i].selected)
						s+="&"+e.name+"="+encodeURIComponent(e[i].value);
				break;
			default :// text, textarea, password, hidden, file(only file name).
				s+="&"+e.name+"="+encodeURIComponent(e.value);
				break;
			}
		}
		return s.replace("&", ""); // 去除开头的&符合。
	};

	this.toString = function(){
		return this.getParams();
	};

	var vf = f.onsubmit instanceof Function?Function.createDelegate(f, f.onsubmit):null;
	
	var sb = Function.createDelegate(this, function(){
		if ((vf instanceof Function)&&!vf()){return false;}
		if (!(r instanceof XmlHttpRequest)){r = new XmlHttpRequest(this.async);}
		r.send(f.action+"?"+Math.random(), f.method, this.getParams(), c);
		return false; // 防止页面刷新。
	});
	f.onsubmit = sb;
};