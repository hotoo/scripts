/*<![CDATA[*/
/**
 * IPv6 (Internet Protocol Version 6)
 * @namespace org.xianyun.net;
 * @extends {Object}
 * @constructor new IPv6("::");
 * @param {String} ip
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @see http://baike.baidu.com/view/5228.htm
 * 		http://www.cnpaf.net/class/ipv6/
 * @version 2008/5/14
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var IPv6 = function(ip){
	this._v = IPv6.parse(ip);
}
IPv6._REG_STD = /^([0-9a-fA-F]{4}:){7}[0-9a-fA-F]{4}$/; //     标准（完整）形式。
IPv6._REG_SHT = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/; // 简写形式(涵盖标准形式)。

IPv6._REG_CUT_A = /^::$/; // 压缩形式：完全(::)。
IPv6._REG_CUT_R = /^[0-9a-fA-F]{1,4}(:[0-9a-fA-F]{1,4}){0,7}::$/; // 压缩形式：双冒号居右(20AF::, 0:2F::)
IPv6._REG_CUT_L = /^::([0-9a-fA-F]{1,4}:){0,7}[0-9a-fA-F]{1,4}$/; // 压缩形式：双冒号居左(::20AF, ::0:2F)
IPv6._REG_CUT_M = /^[0-9a-fA-F]{1,4}(:[0-9a-fA-F]{1,4}){0,7}::([0-9a-fA-F]{1,4}:){0,7}[0-9a-fA-F]{1,4}$/; // 压缩形式：双冒号居中(20AF::2F, 0:20AF::AF:0)

IPv6._REG_MIX_STD = /^([0-9a-fA-F]{4}:){6}(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/; // 混合标准（完整）形式。
IPv6._REG_MIX_SIP = /^([0-9a-fA-F]{1,4}:){6}(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/; // 混合简写形式(涵盖标准形式)。
IPv6._REG_MIX_CUT_L = /^::([0-9a-fA-F]{1,4}:){0,6}(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/; // 混合压缩形式：双冒号居左。
IPv6._REG_MIX_CUT_R = /^[0-9a-fA-F]{1,4}(:[0-9a-fA-F]{1,4}){0,6}::(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/; // 混合压缩形式：双冒号居（十六进制）右。
IPv6._REG_MIX_CUT_M = /^[0-9a-fA-F]{1,4}(:[0-9a-fA-F]{1,4}){0,6}::([0-9a-fA-F]{1,4}:){0,5}[0-9a-fA-F]{1,4}:(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/; // 混合压缩形式：双冒号居（十六进制）中。
/**
 * @param {String} ip
 * @return {Boolean}
 */
IPv6.verify = function(ip){
	if(IPv6._REG_SHT.test(ip)){return true;}
	if((IPv6._REG_CUT_A.test(ip) || IPv6._REG_CUT_L.test(ip) || IPv6._REG_CUT_R.test(ip) ||
		IPv6._REG_CUT_M.test(ip)) && (ip.match(/:(?!:)/g)||"").length<7){return true;}
	if((IPv6._REG_MIX_SIP.test(ip)||IPv6._REG_MIX_CUT_L.test(ip) ||
		IPv6._REG_MIX_CUT_R.test(ip)||IPv6._REG_MIX_CUT_M.test(ip)) &&
		(ip.match(/:(?!:)/g)||"").length<7){return true;}
	return false;
};
/**
 * 将任意IPv6格式的字符串解析为标准（完整）形式。
 * @TODO 尚待完整实现。
 * @param {String} ip
 * @return {String} 返回与参数标准（完整）形式。
 */
IPv6.parse = function(ip){
	if(IPv6._REG_STD.test(ip)){
		return ip;
	}else if(IPv6._REG_SHT.test(ip)){
		ip = ip.split(":");
		for (var i=0;i<8;i++){
			if(ip[i].length<4){ip[i]=("000"+ip[i]).right(4);}
		}
		return ip.join(":").toUpperCase();
	}else if(IPv6._REG_CUT_A.test(ip)){
		return "0000:0000:0000:0000:0000:0000:0000:0000";
	}else if(IPv6._REG_CUT_L.test(ip)){
//		var l=8-ip.match(/:(?!:)/g).length;
		var v=ip.match(/[\da-fA-F]+(?=:|$)/g), l=8-v.length, r=[];
		for(var j=0; j<l; j++){
			r[j]="0000";
		}
		for(var j=0; j<8-l; j++){
			r[l+j] = v[j]&&v[j].length<4?("000"+v[j]).right(4):v[j];
		}
		return r.join(":").toUpperCase();
	}else if(IPv6._REG_CUT_R.test(ip)){
		var v=ip.match(/[\da-fA-F]+(?=$|:)/g), l=v.length, r=[];
		for(var j=0; j<l; j++){
			r[j] = v[j]&&v[j].length<4?("000"+v[j]).right(4):v[j];
		}
		for(var j=l; j<8; j++){
			r[j]="0000";
		}
		return r.join(":").toUpperCase();
	}else if(IPv6._REG_CUT_M.test(ip)){
		var v=ip.match(/[\da-fA-F]+(?=$|:)/g), i=ip.split("::")[0].split(":").length;l=v.length, r=[];
		for(var j=0; j<i; j++){
			r[j] = v[j]&&v[j].length<4?("000"+v[j]).right(4):v[j];
		}
		for(var j=i; j<8-l+i; j++){
			r[j]="0000";
		}
		for(var j=8-l+i; j<8; j++,i++){
			r[j] = v[i]&&v[i].length<4?("000"+v[i]).right(4):v[i];
		}
		return r.join(":").toUpperCase();
	}else if(IPv6._REG_MIX_STD.test(ip)){
		var a=ip.match(/:(\d+)\.(\d+)\.(\d+)\.(\d+)/);
		for (var i=1; i<=4; i++){
			a[i] = (a[i]<16?"0":"")+((a[i]|0).toString(16).toUpperCase());
		}
		return ip.match(/(?:[0-9a-fA-F]{1,4}:){6}/)[0]+a[1]+a[2]+":"+a[3]+a[4];
	}else if(IPv6._REG_MIX_SIP.test(ip)){
	}else if(IPv6._REG_MIX_CUT_L.test(ip)){
	}else{
		throw new ParseException("invaild ipv6 address.");
	}
};
/**
 * 
 * @param {Number} p 
 * 		0:标准（完整）形式(0000:0000:0000:0000:0000:0000:7F00:0001)；
 * 		1:简写形式(0:0:0:0:0:0:7F:1)；
 * 		2:压缩形式(::7F:1)；
 * 		3:标准（完整）混合形式(0000:0000:0000:0000:0000:0000:127.0.0.1)；
 * 		4:简写混合形式(0:0:0:0:0:0:127.0.0.1)；
 * 		5:压缩混合形式(::127.0.0.1)；
 */
IPv6.format = function(p){
	switch (p){
	case 1:
		break;
	case 2:
		break;
	case 3:
		break;
	case 4:
		break;
	case 5:
		break;
	default:
		break;
	}
};
/**
 * 比较两个IPv6对象或IPv6格式字符串所代表的地址是否相等。
 * @param {String} ip0
 * @param {String} ip1
 * @return {Boolean}
 */
IPv6.compare = function(ip0,ip1){
	
};
IPv6.prototype.toString = function(){
	return this._v;
};
IPv6.prototype.valueOf = function(){
	return this._v;
};


// ----------------------------------------------------------------------------
function isIPv6(str){
	return /:/.test(str) && str.match(/:/g).length<8 && /::/.test(str) ?
		(str.match(/::/g).length==1 && /^::$|^(::)?([\da-f]{1,4}(:|::))*[\da-f]{1,4}(:|::)?$/i.test(str)) :
		/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str);
}

function test(str){
    var inseg = false;
    var once = false;
    var segc = 0;
    var ic = 0;
    var n = str.length;
    if (str.charAt(n - 1) == ':' && str.charAt(n - 2) != ':') 
        return false;
    for (var i = 0; i < n; i++) {
        var c = str.charAt(i);
        if (c == ':') 
            if (str.charAt(i + 1) == ':') 
                if (once) 
                    return false;
                else {
                    once = true;
                    i++;
                    if (inseg) 
                        segc++;
                    inseg = false;
                    continue;
                }
            else 
                if (inseg) {
                    segc++;
                    inseg = false;
                    continue;
                }
                else 
                    return false;
        if (c >= '0' && c <= '9' || c >= 'a' && c <= 'f' || c >= 'A' && c <= 'F') 
            if (inseg) {
                if (++ic > 4) 
                    return false;
            }
            else {
                inseg = true;
                ic = 1;
            }
        else 
            return false;
    }
    if (inseg) 
        segc++;
    if (once) 
        return segc <= 6;
    else 
        return segc == 8;
}
/*]]>*/
