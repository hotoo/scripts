/**
 * get browser name.
 * {Object<Boolean>}
 */
window.Browser = {
    isIE : (navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0),
    isFirefox : navigator.userAgent.indexOf('Firefox') >= 0,
    isChrome : navigator.userAgent.indexOf('Chrome') >= 0,
    isOpera : navigator.userAgent.indexOf('Opera') >= 0,
    isNetscape : navigator.userAgent.indexOf('Netscape') >= 0
};

/**
 * get function name.
 * @param {Function} f function reference
 * @return {String} return function name if has.
 */
function funame(f){
    if(f.name){return f.name;}
	var s = f.toString().match(/function(?:\s+(\w+))\s*\(/);
	return s?s[1]:"anonymous";
}

/**
 * create function delegate. execute function <code>method</code>
 * just like it is property of <code>instance</code>.
 * @param {Object} instance
 * @param {Function} method
 * @return {Function}
 */
Function.createDelegate = function(instance, method){
	//var args = Array.from(arguments).splice(2,arguments.length - 2);
    return function() {
        return method.apply(instance, arguments);
    }
};
/**
 * to json string
 * @return {Array<String>}
 */
Array.prototype.toSrc = function(){
    for (var i=0,r=[],l=this.length; i<l; i++){
        var a=this[i];
        if(a instanceof String || typeof(a)=="string"){r[i]='"'+a+'"';}
        else if(a instanceof RegExp){r[i]="/"+a.source+"/"+(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.global?"g":"");}
        else if(a instanceof Array){r[i]="["+a+"]";}
        else{r[i]=a;} // Number, Boolean
    }
    return r;
};

