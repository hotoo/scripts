/* 
 *  Copyright (c) Netease.com, Inc. - 2006
 *  Author: Robin Pan (htmlor@gmail.com)
 *
 *
 *  InstSubmit() [class]
 *
 *  触发提交事件后，把数据通过xmlhttp发送到远端（异步）
 *
 *  需调用 XmlHttpRequest 类 （xmlhttprequest.js）
 *
/*----------------------------------------------------------------*/


function InstSubmit(sURL, oParas, eTrigger, fCallback){
	this.url = sURL;
	this.paras = oParas;
	this.trigger = eTrigger;
	this.callback = (fCallback != null ? fCallback : null);
	
	this.method = "post";
	this.xmlhttp = null;
	
	var ME = this;
	
	this.setParas = function(oParas){
		this.paras = oParas;
	};
	
	this.excute = function(){
		if(this.paras == null){
			alert("no paras");
			return false;
		}
		var parastr = "";
		for(var key in this.paras){
			parastr += "&" + key + "=" + encodeURIComponent( escape( this.paras[key] ) ); // 加人了编码转换函数encodeURIComponent 和 escape。闲耘(HoToo) [2006-5-19]
		}
		var urlstr = (this.method == "post") ? this.url : (this.url + "?" + parastr);
		var data = (this.method == "post") ? parastr : null;
		
		if(this.xmlhttp == null){
			this.xmlhttp = new XmlHttpRequest();
		}
		this.xmlhttp.send(urlstr, this.method, data, this.response);
	};
	
	this.response = function(sFlag, oReq){
		switch(sFlag){
			case "ex":
				ME.resException(oReq);
				break;
			case "ing":
				ME.resLoading(oReq);
				break;
			case "ok":
				ME.resComplete(oReq);
				break;
		}
	};
	this.resException = function(oReq){
		this.failed(oReq);
	};
	this.resLoading = function(oReq){
		this.loading(oReq);
	};
	this.resComplete = function(oReq){
		if(oReq.responseText == "success"){
			this.success(oReq);
			if(this.callback != null){
				this.callback('success', this.paras, this.trigger);
			}
		}
		else{
			this.failed(oReq);
		}
	};
	this.loading = function(oReq){
		this.setTriggerStyle(1);
	};
	this.success = function(oReq){
		this.setTriggerStyle(0);
	};
	this.failed = function(oReq){
		this.setTriggerStyle(0);
		//alert(oReq.responseText);
		//alert("提交未成功。");
		if(this.callback != null){ // 为适应当前系统，闲耘做了小部分修改。[2006-5]
			this.callback(oReq.responseText, this.paras, this.trigger);
		}
	};
	
	this.setTriggerStyle = function(iStatus){
		if(iStatus == 0){
			this.trigger.disabled = false;
		}
		else{
			this.trigger.disabled = true;
		}
	};
}
