/*<![CDATA[*/
/** 
 * @class Cookie.js
 * @version 1.0.1
 * @create 
 * @update 
 * @author 闲耘 (hotoo.cn@gmail.com)
 */

var Cookie = function(name, value){
    var _name = name;
    var _value = value;
    var _maxAge = 0;
    var _path = null; // 定义了Cookies只发给指定的路径请求，如果Path属性没有被设置，则使用应用软件的缺省路径。
    var _domain = null; // 定义Cookies传送数据的唯一性。
    var _secure = null; // 指定Cookies能否被用户读取。
    var _haskeys = false; // 如果所请求的Cookies是一个具有多个键值的Cookies字典，则返回True，它是一个只读属性。

    
    this.getName = function(){
        return _name;
    };
    /* [read only]
     * Can not change the cookie name, 
     * we need create one new cookie for new name.
    this.setName = function(name){
        _name = name;
    };*/

    this.getValue = function(){
        return _value;
    };
    this.setValue = function(value){
        _value = value;
    };

    this.getMaxAge = function(){
        return _maxAge;
    };
    this.setMaxAge = function(maxAge){
        _maxAge = maxAge;
    };

    this.getPath = function(){
        return _path;
    };
    this.setPath = function(path){
        _path = path;
    };

    this.getDomain = function(){
        return _domain;
    };
    this.setDomain = function(domain){
        _domain = domain;
    };

    this.getSecure = function(){
        return _secure;
    };
    /* read only
    this.setSecure = function(secure){
        _secure = secure;
    };*/

    this.equals = function(cookie){
        if (_name == cookie.name &&
            _value == cookie.value &&
            _maxAge == cookie.maxAge &&
            _path == cookie.path &&
            _domain == cookie.domain &&
            _secure == cookie.secure){
            return true;
        } else {
            return false;
        }
    };

    this.toString = function(){
        return _name + '=' + _value +
            (_maxAge ? ';expires=' + _maxAge.toGMTString() : '')+
            (_path ? ';path=' + _path : '');
            //(_domain ? ';domain=' + domain : '') +
            //(_scure ? ';secure=' + _secure : '');
    };
    /*this.toString = function(){
        return this.getName() + '=' + this.getValue() +
            (this.getMaxAge() ? ';expires=' + this.getMaxAge().toGMTString() : '')+
            (this.getPath() ? ';path=' + this.getPath() : '') +
            (this.getDomain() ? ';domain=' + this.getDomain() : '') +
            (this.getSecure() ? ';secure=' + this.getSecure() : '');
    };*/
};

/*]]>*/