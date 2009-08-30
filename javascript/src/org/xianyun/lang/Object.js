/*<![CDATA[*/

/**
 * 遍历对象的属性，并使用iterator函数处理之。
 * @param {Function} iterator
 */
Object.prototype.each = function(iterator){
	for (var k in this){
		iterator(this[k], k, this);
	}
};

/**
 * @overview
 * @param {Function} 
 * @return {Array} 
 */

Object.prototype.toArray = function(filter){
    var a=[];
    for(var k in this){
        if(filter(k, this[k], this)){
            a[a.length]=k;
        }
    }
    return a;
};

/**
 * @see org.xianyun.system.String.prototype.typeOf();
 */
Object.prototype.typeOf = function(){
	var o = [String, Number, Boolean, Date, Array, RegExp, Function, Object];
	var s = ["String", "Number", "Boolean", "Date", "Array", "RegExp", "Function", "Object"];
	
	var type = (typeof this).upperCaseInitial();
	
	if (type==="Object"){
		for (var i=0; i<o.length; i++){
			if (this instanceof o[i]){
				type = s[i];
				return type;
			}
		}
	}
	return type;
};

/**
 * @see org.xianyun.system.String.prototype.instanceOf();
 */
Object.prototype.instanceOf = function(type){
    if (this == type){return true;}
    return this instanceof type;
};


Object.prototype.toString = function(){
	var s = "";
	for (var k in this){
		s+= k+":"+this[k].toString()+",";
	}
	return s;
};
/*]]>*/
