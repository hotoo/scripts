/*<![CDATA[*/
/**
 * 封装的兼容多浏览器的XMLHttpRequest（注意大小写）对象。隐藏了各浏览器间异步&同步方式的差异性。
 * @namespace org.xianyun.net;
 * @constructor XmlHttpRequest(a)
 * @param {Boolean} a 是否使用异步方式。false则为同步，否则异步。
 * @see 参考Robin Pan (htmlor@gmail.com)的同名类。
 * @since IE6.0, Firefox2.0, Opera9.0, Safari3.0, Netscape8.0
 * @version 2006/4/16, 2008/2/29
 * @author 闲耘 (mail@xianyun.org)
 */

var XmlHttpRequest = function(a){
	/**
	 * @type {Boolean} 请求方式，true:异步/false:同步。
	 */
	this.async = (a!=undefined?a:true);
	
	var d = true; // done?
	var r = null;
	if(window.XMLHttpRequest){
		r = new XMLHttpRequest();
		if (r.overrideMimeType){
		  	r.overrideMimeType("text/xml"); //如果服务器的响应没有XML mime-type header，某些Mozilla浏览器可能无法正常工作。 所以需要XmlHttp.overrideMimeType('text/xml');来修改该header.
		}
	} else if(window.ActiveXObject){ // 支持ActiveX的（ie）
		for (var i=XmlHttpRequest.AXOI, l=XmlHttpRequest.AXO.length; i<l; i++){
			try {
				r = new ActiveXObject(XmlHttpRequest.AXO[i]);
				XmlHttpRequest.AXOI = i; // 兼容性记忆体。
				break;
			} catch(e){
				r = null;
			}
		}
	}
	if (r===null) throw new NotSupportException("浏览器不支持XMLHttpRequest或类似对象。");
	
	/**
	 * 发送请求。
	 * @param {String} url 目标请求地址，可以是绝对/相对路径。
	 * @param {String} method 发送请求的方式，"post"/"get"。默认为"get"方式。
	 * @param {String} param 发送请求中带的参数。
	 * @param {Function} callback 发送请求过程中的回调函数。
	 */
	this.send = function(u, m, p, c){
		d = false;
		var isPost = /^post$/i.test(m);
		r.open(m, u, this.async); // 发送数据（异步）
		if(isPost){ // 提交方法为post时，发送信息头
            //r.setrequestheader("content-length",(new String(u)).length);
			r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		r.send(isPost?p:null);
		if (this.async) { // 同步方式不要设置回调。
			r.onreadystatechange = function(){ // 处理request的响应
				if (r.readyState == 4) {// 响应完成后（状态4）
					if (r.status == 200) { // 良好
						c("ok", r);
					} else { // 异常
						c("ex", r);
					}
					d = true;
				} else { // 响应未完成时（状态0/1/2/3）
					c("ing", r);
				}
			}
		}
		if ((!this.async)&& c instanceof Function){
			if (r.status===200) c("ok", r);
			else c("ex", r);
		}
	};
	
	/**
	 * 取消未完成的异步请求。
	 */
	this.abort = function(){
		if (!d){r.abort();}
		d=true;
	};
	
	/**
	 * 判断当前XmlHttpRequest对象是否完成请求。
	 * @return {Boolean} true，如果完成，否则返回false。
	 */
	this.isDone=function(){
		return d;
	};
}
XmlHttpRequest.AXO = [
'MSXML3.XMLHTTP.5.0',
'MSXML3.XMLHTTP.4.0',
'MSXML3.XMLHTTP.3.0',
'MSXML3.XMLHTTP.2.0',
"Msxml3.XMLHTTP",
"Msxml2.XMLHTTP.5.0",
"Msxml2.XMLHTTP.4.0",
"Msxml2.XMLHTTP.3.0",
"Msxml2.XMLHTTP",
"Microsoft.XMLHTTP"];
XmlHttpRequest.AXOI=0; // 兼容性记忆体。

/**
 * XmlHttpRequest对象池，避免每次创建新的XmlHttpRequest对象。
 */
var XmlHttpRequestPool={
	pool:[],
	/**
	 * @param {Boolean} a true则使用异步方式，false使用同步方式。默认为true。
	 * @ignore
	 */
	_instance:function(a){
		var p=XmlHttpRequestPool.pool;
		if(a===undefined){a=true;}
		for(var i=0,l=p.length; i<l; i++){
			if(p[i].isDone()&&p[i].async===a){return p[i];}
		}
		return (p[p.length]=new XmlHttpRequest(a));
	},
	send:function(u,m,p,c,a){
		XmlHttpRequestPool._instance(a).send(u,m,p,c);
	}
};
/*]]>*/