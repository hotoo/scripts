//<![CDATA[
/** javascript runtime environment.
 * @author 闲耘 (HoToo)
 * @author http://www.xianyun.org
 * @create 2006-6-26
 * @update 2007/08/08 修改部分实现，并加入非入侵式的自动名字空间管理。
 * “非入侵式的自动名字空间管理”即：类，静态对象等实现代码中不需要加入$package("org.xianyun.test.Class")这样为名字空间管理而入侵的代码。
 * 实现类，静态对象的实现代码完全按照Javascript实现类，静态对象的方法书写即可。如果使用本文件（不敢成为“框架”），
 * 类，静态对象按照一定的文件存放位置要求（类似Java名字空间，类，静态对象的名称必须和文件名[大小写]相同）存放，
 * 在外部代码（页面上）中使用$import("org.xianyun.test.Class")方法，
 * 即可动态导入classpath目录下的org/xianyun/test/目录中的Class.js文件，并在页面代码中可使用org.xianyun.test.Class指向Class类或静态对象。
 * 如果没有导入相同的类或静态对象，则亦可使用Class指向本身，否则，Class指向最后导入的类，静态对象。（注：浏览器IE6, Firefox1.0, Opera9.0都容忍重定义错误）
 * 如果不使用本文件和相应方法，各个独立的类，静态对象可以无需修改立即抽出使用。
 */


/** Browser object.
 * @update 2006-6-17
 *              2006-8-16 add isNetscape.
 * @p.s. thanks robin pan and meizz.
 */
window.Browser = {
    isIE : (navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0),
    isFirefox : navigator.userAgent.indexOf('Firefox') >= 0,
    isOpera : navigator.userAgent.indexOf('Opera') >= 0,
    isNetscape : navigator.userAgent.indexOf('Netscape') >= 0
};
//window.Browser={isIE:(navigator.userAgent.indexOf('MSIE')>=0)&&(navigator.userAgent.indexOf('Opera')<0),isFirefox:navigator.userAgent.indexOf('Firefox')>=0,isOpera:navigator.userAgent.indexOf('Opera')>=0,isNetscape : navigator.userAgent.indexOf('Netscape') >= 0};

// IE : Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727) 
// Netscape (Firefox) : Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US; rv:1.7.5) Gecko/20060127 Netscape/8.1
// Netscape (IE) : Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727) Netscape/8.1 


/** window.classpath.
 * @description using classpath to find classes.
 * @update 2006-7-29
 */
window.classpath = window.CLASS_PAHT = window.CLASSPATH = function(){
    var _sc = document.getElementsByTagName('script');
    var _cp = _sc[_sc.length - 1].getAttribute('classpath');
    return (_cp == null) ? 'classes/' : _cp + '/';
}();
//window.classpath=function(){var _sc=document.getElementsByTagName('script');var _cp=_sc[_sc.length-1].getAttribute('classpath');return (_cp==null)?'classes/':_cp+'/';}();//2006-7-29

/** window._package()
 * @description create the object for name space.
 * @param packageName, string, like Java, using dot (.) replace solidus (/) with directory.
 * @demo _package('cn.hotoo.Obj') will create these object: cn, cn.hotoo, cn.hotoo.Obj
 * @update <<2006-7-26
 *//*
window._package = function(packageName){
    var ps = packageName.split('.');
    for (var i = 0; i < ps.length; i++){
        var _ps = ps[0];
        for (var j = 1; j <= i; j++){
            _ps += '.' + ps[j];
        };
        try{
            if (typeof(eval(_ps)) == 'function'){continue;}; // object is existed.
            if (typeof(eval(_ps)) == 'undefined'){ // object.property == 'undefined'
                eval(_ps + ' = new Function();');
            };
        }catch(e){
            eval(_ps + ' = new Function();'); // non object.
        };
    };
};
//window._package=function(packageName){var ps=packageName.split('.');for(var i=0;i<ps.length;i++){var _ps=ps[0];for(var j=1;j<=i;j++){_ps+='.'+ps[j];};try{if(typeof(eval(_ps))=='function'){continue;};if(typeof(eval(_ps))=='undefined'){eval(_ps+'=new Function();');};}catch(e){eval(_ps+'=new Function();');};};};//<<2006-7-26
*/
/** from AtlasRuntime.js
 * @create 2006-8-3
 */
window._package = window.$package = function(packageName){
    var rt = window;
    var ps = packageName.split('.');
    for (var i=0; i<ps.length; i++){
        var curr = ps[i];
        if (!rt[curr]){
            rt[curr] = new Object();
        };
        rt = rt[curr];
    };
};
//window._package=function(packageName){var r=window;var ps=packageName.split('.');for(var i=0;i<ps.length;i++){var c=ps[i];if(!r[c]){r[c]=new Object();};r=r[c];};};//2006-8-3

/** window.$import()
 * @description dynamic load Javascript file at runtime.
 * @param uri, string, like Java package name and class name. eg: 'org.xianyun.Obj'.
 * @param classpath, string, if need a temporary classpath, set it;
 *     else, set null or non-string object to using default classpath.
 * @param fCallback, function, when load javascript file successful, execute it.
 * @p.s. the best version. 2006-7-26
 */
window.$import = function(uri, classpath, fCallback){
    var path = (typeof(classpath) == 'string') ? classpath : this.classpath;
    var id = 'script_' + path.replace(/\//g, '_') + uri.replace(/\./g, '_');
    var mkNS = function(){
        var c = uri.substr(uri.lastIndexOf(".")+1);
        u = uri.replace(/[\/\\]/g, "."); // @TODO 如果直接使用/，如org/xianyun/test/Class，则最后也不允许带后缀.js
        $package(uri); // 自动名字空间管理。
        try{
        	eval(uri+"="+c);
        }catch (e){
            throw e;
        }
    };
    var callback = function(script){
        if (Browser.isIE){
            script.onreadystatechange = function(){
                if (script.readyState == 'complete' || script.readyState == 'loaded'){
                    mkNS();
                    if(typeof(fCallback) == 'function'){fCallback();};
                };
            };
        }else if(Browser.isFirefox){
            script.onload = function(){
                mkNS();
                if(typeof(fCallback) == 'function'){fCallback();};
            };
            script.onerror = function(){
                //alert('load error.');
            };
        }else{ // Opera 8.0/9.0 passed.
            mkNS();
            if(typeof(fCallback) == 'function'){fCallback();};
        };
    };
    if (document.getElementById(id) != null){ // script tag is created.
        try{
            fCallback();
        }catch(e){ // scripts is not success loaded.
            callback(document.getElementById(id));
        };
        return;
    };
    var _url = path + uri.replace(/\./g, '/') + '.js';
    var script = document.createElement('script');
    script.setAttribute('language', 'javascript');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('id', id);
    script.setAttribute('src', _url);
//	script.defer = true;
//	script.text = source;
    //document.body.appendChild(script);
    document.getElementsByTagName('head')[0].appendChild(script);
    callback(script);
};
//window.$import=function(uri,classpath,fCallback){var path=(typeof(classpath)=='string')?classpath:this.classpath;var id='script_'+path.replace(/\//g,'_')+uri.replace(/\./g,'_');var callback=function(script){if(Browser.isIE){script.onreadystatechange=function(){if(script.readyState=='complete'||script.readyState=='loaded'){if(typeof(fCallback)=='function'){fCallback();};};};}else if(Browser.isFirefox){script.onload=function(){if(typeof(fCallback)=='function'){fCallback();};};}else{if(typeof(fCallback)=='function'){fCallback();};};};if(document.getElementById(id)!=null){try{fCallback();}catch(e){callback(document.getElementById(id));};return;};var _url=path+uri.replace(/\./g,'/')+'.js';var script=document.createElement('script');script.setAttribute('language','javascript');script.setAttribute('type','text/javascript');script.setAttribute('id',id);script.setAttribute('src',_url);document.getElementsByTagName('head')[0].appendChild(script);callback(script);}; //2006-7-26


/** window.$import2();
 * @description import multi script files from uris.
 * @using window.$import();
 * @param uris, String or Array. example for Array:
 *   uris=[
 *    ["org.xianyun.Obj1", "classpath/"],
 *    ["org.xianyun.Obj2", null],
 *    ["Org.xianyun.Obj3"]
 *   ];
 * @param classpath, String. example: "", 当前页面所在目录; "/", 站点根目录; "fold/", 当前目录下fold目录
 * @param fCallback, Function.
 * @create 2007/07/30
 */
window.$import2 = function(uris, classpath, fCallback){
    if (uris instanceof String || typeof uris == 'string'){
        $import(uris, classpath, fCallback);
    } else if(uris instanceof Array){
        if (uris.length <= 0){return;};
        var _mkfun = function(__uri, __classpath, __fCallback){
            if (typeof(__classpath) == 'string'){ // using temporary classpath.
                return 'window.$import("' + __uri + '", "' + __classpath + '", '+__fCallback+')';
            }else if (typeof(classpath) == 'string'){ // using common classpath.
                return 'window.$import("' + __uri + '", "' + classpath + '", '+__fCallback+')';
            }else{ // using default classpath.
                return 'window.$import("' + __uri + '", null, '+__fCallback+')';
            };
        };
        var len = uris.length - 1;
        var imp = _mkfun(uris[len][0], uris[len][1], "fCallback");
        for (var i=len-1; i>=0; i--){
            imp = _mkfun(uris[i][0], uris[i][1], "function(){"+imp+"}");
        };
        eval(imp);
    } else {
        throw new Error("window.$import2() arguments error.");
    }
};


/** window._import()
 * @description dynamic, batch or not load scripts at runtime.
 * @param uris, array or string, if is array may like this:
 * uris = [
 *     ['packagesName.className', 'classpath/'], // %currentDirectory%/classpath/, must end with solidus (/).
 *     ['cn.hotoo.tools.Counter', null], // null or non-string, using default classpath.
 *     ['cn.hotoo.UI.Window.HTWindow', ''] // current directory, do no start with solidus (/), if not, using root directory.
 * ];
 * @param classpath, string, the common classpath in this action of batch import.
 * @param fCallback, function, after loaded all scripts, do this action.
 * @p.s. excessive design. 2006-7-27
 */
window._import = function(uris, classpath, fCallback){
    var __import = function(uri, classpath, fCallback){
        var path = (typeof(classpath) == 'string') ? classpath : this.classpath;
        var id = 'script_' + path.replace(/\//g, '_') + uri.replace(/\./g, '_');
        var callback = function(script){
            if (Browser.isIE){
                script.onreadystatechange = function(){
                    if (script.readyState == 'complete' || script.readyState == 'loaded'){
                        if(typeof(fCallback) == 'function'){fCallback();};
                    };
                };
            }else if(Browser.isFirefox || Browser.isNetscape){
                script.onload = function(){
                    if(typeof(fCallback) == 'function'){fCallback();};
                };
            }else{ // Opera 8.0/9.0 passed.
                if(typeof(fCallback) == 'function'){fCallback();};
            };
        };
        if (document.getElementById(id) != null){ // script tag is created.
            try{
                fCallback();
            }catch(e){ // scripts is not success loaded.
                callback(document.getElementById(id));
            };
            return;
        };
        var _url = path + uri.replace(/\./g, '/') + '.js';
        var script = document.createElement('script');
        script.setAttribute('language', 'javascript');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('id', id);
        script.setAttribute('src', _url);
        //document.body.appendChild(script);
        document.getElementsByTagName('head')[0].appendChild(script);
        callback(script);
    };
    if (typeof(uris) == 'string' || uris instanceof String){
        __import(uris, classpath, fCallback);
    }else if (uris instanceof Array){
        if (uris.length <= 0){return;};
        var len = uris.length - 1;
        if (typeof(uris[len][1]) == 'string'){ // using temporary classpath.
            imp = '__import("' + uris[len][0] + '", "' + uris[len][1] + '", fCallback)';
        }else if (typeof(classpath) == 'string'){ // using common classpath.
            imp = '__import("' + uris[len][0] + '", "' + classpath + '", fCallback)';
        }else{ // using default classpath.
            imp = '__import("' + uris[len][0] + '", null, fCallback)';
        };
        for (var i = len - 1; i >= 0; i--){
            if (typeof(uris[i][1]) == 'string'){
                imp = '__import("' + uris[i][0] + '", "' + uris[i][1] + '", function(){' + imp + ';})';
            }else if (typeof(classpath) == 'string'){
                imp = '__import("' + uris[i][0] + '", "' + classpath + '", function(){' + imp + ';})';
            }else{
                imp = '__import("' + uris[i][0] + '", null, function(){' + imp + ';})';
            };
        };
        eval(imp);
    };
};
//window._import=function(uris,classpath,fCallback){var __import=function(uri,classpath,fCallback){var path=(typeof(classpath)=='string')?classpath:this.classpath;var id='script_'+path.replace(/\//g,'_')+uri.replace(/\./g, '_');var callback=function(script){if(Browser.isIE){script.onreadystatechange=function(){if(script.readyState=='complete'||script.readyState=='loaded'){if(typeof(fCallback)=='function'){fCallback();};};};}else if(Browser.isFirefox||Browser.isNetscape){script.onload=function(){if(typeof(fCallback)=='function'){fCallback();};};}else{if(typeof(fCallback)=='function'){fCallback();};};};if(document.getElementById(id) != null){try{fCallback();}catch(e){callback(document.getElementById(id));};return;};var _url=path+uri.replace(/\./g,'/')+'.js';var script=document.createElement('script');script.setAttribute('language','javascript');script.setAttribute('type','text/javascript');script.setAttribute('id',id);script.setAttribute('src',_url);document.getElementsByTagName('head')[0].appendChild(script);callback(script);};if(typeof(uris)=='string'){__import(uris,classpath,fCallback);}else if(typeof(uris)=='object'){if(uris.length<=0){return;};var len=uris.length-1;if(typeof(uris[len][1])=='string'){imp='__import("'+uris[len][0]+'","'+uris[len][1]+'",fCallback)';}else if(typeof(classpath)=='string'){imp='__import("'+uris[len][0]+'","'+classpath+'",fCallback)';}else{imp='__import("'+uris[len][0]+'",null,fCallback)';};for(var i=len-1;i>=0;i--){if(typeof(uris[i][1])=='string'){imp='__import("'+uris[i][0]+'","'+uris[i][1]+'",function(){'+imp+';})';}else if(typeof(classpath)=='string'){imp='__import("'+uris[i][0]+'","'+classpath+'",function(){'+imp+';})';}else{imp='__import("'+uris[i][0]+'",null,function(){'+imp+';})';};};eval(imp);};};//2006-7-27
//]]>