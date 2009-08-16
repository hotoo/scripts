/* 
 *  Copyright (c) Netease.com, Inc. - 2006
 *  Author: Robin Pan (htmlor@gmail.com)
 *
 *
 *  XmlHttpRequest() [class]
 *
 *  使用xmlhttprequest对象（异步/同步）发送数据（get/post）
 *  服务器响应由回调函数处理
 *
/*----------------------------------------------------------------*/


function XmlHttpRequest(bAsync){
	this.async = (bAsync != null ? bAsync : true);
	
	this.send = function(sURL, sMethod, oData, fCallback){
		// 创建一个request对象
		var req = null;
		// 支持XMLHttpRequest的（非ie）
		if(window.XMLHttpRequest){
			req = new XMLHttpRequest();
		}
		// 支持ActiveX的（ie）
		else if(window.ActiveXObject){
			try{
				// ie6以上
				req = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch(e){
				// 低版本ie
				req = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		if(req == null){
			return false;
		}
		
		// 处理request的响应
		req.onreadystatechange = function(){
			// 响应完成后（状态4）
			if(req.readyState == 4){
				// 良好
				if(req.status == 200){
					fCallback("ok", req);
				}
				// 异常
				else{
					fCallback("ex", req);
				}
			}
			// 响应未完成时（状态0/1/2/3）
			else{
				fCallback("ing", req);
			}
		}
		
		// 发送数据（异步）
		req.open(sMethod, sURL, this.async);
		// 提交方法为post时，发送信息头
		if(sMethod == "post"){
            //req.setrequestheader("content-length",(new String(url)).length);
			req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		req.send((sMethod == "post") ? oData : null);
		
		return true;
	}
}
