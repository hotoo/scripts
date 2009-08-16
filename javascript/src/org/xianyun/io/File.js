/**
 * 文件。
 * @param {String} path 文件的路径。
 * @param {String} type 文件的类型。
 * @version 2008/2/25
 */
var File = function(path, type){
	this._path = path;
	this._filename = null;
	this._postfix = null;
	this._type = type;
	this._data = null;
	this._xmlhttp = null;
};

/**
 * 取得文件的短文件名。
 * @return {String}
 */
File.prototype.getFileName = function(){
	return this._filename=this._filename||this._path===null?null:this._path.replace(/^.*[\/\\]/, "");
};
/**
 * 返回文件的后缀。
 * @return {String}
 */
File.prototype.getPostfix = function(){
	return this._postfix = (this._postfix||this._path.replace(/^.*\./,""));
};
/**
 * 获取文件的类型，如果未指定，则返回文件的后缀，没有后缀则返回undefined。
 * @return {String, undefined}
 */
File.prototype.getType = function(){
	var p;
	return this._type=this._type||(p=this.getPostfix())===""?undefined:p;
};
/**
 * 取得文件的全路径。
 * @return {String}
 */
File.prototype.getPath = function(){
	return this._path;
};
/**
 * 读取文件中的内容。默认为null，需要在load完成之后才能读取。
 * @return {Object}
 */
File.prototype.read = function(){
	return this._data;
};
/**
 * 向文件的“内存”中写入数据。
 * @param {Object} data 指定被写入的数据。
 */
File.prototype.write = function(data){
	this._data = data;
};
/**
 * 将内容从文件所在路径加载到文件中。
 * @exception {FileNotFoundException}
 * @param {Function} callback 文件加载过程中的回调函数。
 * @param {Boolean} async 是否使用异步方式加载。设置为false时使用异步方式，否则使用同步方式。
 */
File.prototype.load = function(callback, async){
	if (this._xmlhttp===null) this._xmlhttp = new XmlHttpRequest(async);
	var ME = this;
	this._xmlhttp.send(this._path, "get", null, function(status, req){
		if (status === "ok") {
			ME._data = /^xml$/i.test(ME.getType())?req.responseXml:req.responseText;
		} else if (status==="ex"){
			throw new FileNotFoundException("加载文件失败，请检查文件路径。");
		}
		callback(status, req);
	});
};
File.prototype.store = function(callback, param, onloading){
	if (this._xmlhttp===null) this._xmlhttp = new XmlHttpRequest();
	this._xmlhttp.send(this._path, "post", this._data, callback);
};
