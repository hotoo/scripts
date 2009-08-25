
window.$import = function(uri, fCallback){
    //var id = 'script_' + path.replace(/\//g, '_') + uri.replace(/\./g, '_');
    var callback = function(script){
        if (Browser.isIE){
            script.onreadystatechange = function(){
                if (script.readyState == 'complete' || script.readyState == 'loaded'){
                    if(typeof(fCallback) == 'function'){fCallback();};
                };
            };
        }else if(Browser.isFirefox){
            script.onload = function(){
                if(typeof(fCallback) == 'function'){fCallback();};
            };
            script.onerror = function(){
                alert('load error.');
            };
        }else{ // Chrome, Opera 8.0/9.0 passed.
            if(typeof(fCallback) == 'function'){fCallback();};
        };
    };
    /*if (document.getElementById(id) != null){ // script tag is created.
        try{
            fCallback();
        }catch(e){ // scripts is not success loaded.
            callback(document.getElementById(id));
        };
        return;
    };*/
    //var _url = path + uri.replace(/\./g, '/') + '.js';
    var script = document.createElement('script');
    script.setAttribute('language', 'javascript');
    script.setAttribute('type', 'text/javascript');
    //script.setAttribute('id', id);
    script.setAttribute('src', uri);
    //document.body.appendChild(script);
    document.getElementsByTagName('head')[0].appendChild(script);
    callback(script);
};

