/*<![CDATA[*/
/**
 * 
 * @namespace org.xianyun
 * @extends {Object}
 * @constructor ?!
 * @param ?!
 * @since IE5.0+
 * @version ?!
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
var FSO = {
	_fso:null,
	instance:function(){
		return FSO._fso||new ActiveXObject("Scripting.FileSystemObject");
	}
};

var Drives = function(){
	return FSO.instance().Drives;
};

var Drive = function(n){
	var o = FSO.instance();
	return o.GetDriveName(n);
	return o.GetDrive(n);
//	return o.GetDrive(o.GetDriveName(n));
};

var File = function(path){
	return FSO.instance().GetFile(path);
};
//File.prototype.read = function(){};
//File.prototype.write = function(){};

/*]]>*/
