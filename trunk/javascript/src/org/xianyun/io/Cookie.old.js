/**
 * cookie对象
 * @class cookie对象
 * @param 
 * @type object
 */
Cookie={};

/**
 * cookie对象的set方法
 * @requires cookie
 * @param indexName,value,savedays
 * @type void
 */
Cookie.set=function(name, value,savedays){
    var today = new Date();
    var expires = new Date();
    var saveTime;
    if(savedays==null){
        saveTime=365;
    }else{
        saveTime=savedays;
    }
    if(value instanceof Array){
        value=value.join();
    }
    if(saveTime==0){
        document.cookie = name + "=" + escape(value)+";";
    }
    else{
        expires.setTime(today.getTime() + 1000*60*60*24*Number(saveTime));
        document.cookie = name + "=" + escape(value)	+ "; expires=" + expires.toGMTString();
    }
	return value;
};
/**
 * cookie对象的get方法
 * @requires cookie
 * @param indexName
 * @type void
 */
Cookie.get=function(Name){
    var search = Name + "=";
    if(document.cookie.length > 0){
        var offset = document.cookie.lastIndexOf(search);
        if(offset != -1){
            offset += search.length;
            var end = document.cookie.indexOf(";", offset);
            if(end == -1){
                end = document.cookie.length;
            };
            return unescape(document.cookie.substring(offset, end)).toString();
        }else{
			return "";
		}
    }
	return "";
};