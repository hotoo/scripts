/** Set (class)
 * @author 闲耘(hotoo.cn[AT]gmail.com)
 * @constructor new Set()
 * @namespace org.xianyun.utils
 * @create 2007/08/23
 */

var Set = function(){
    var _set = new Array();

    this.add = function(obj){
        if (this.contains(obj)){return}
        _set.push(obj);
    };

    this.contains = function(obj){
        for (var i=0; i<_set.length; i++){
            if (_set[i].equals(obj)){
                return true;
            }
        }
        return false;
    };

    this.remove = function(obj){
        // @TODO
        if (!this.contains(obj)){return}
        _set[indexOf(obj)] = null;
        //!delete
    };

    this.length = this.size = function(){
        return _set.length;
    };
	
	/** 将Set对象转为字符串对象。
	 * @param void.
	 * @return {String}
	 */
	this.toString = function(){
		return _set.toString();
	};
	
	/**aa
	 * 比较两个Set对象是否相等。
	 * @param {Object} set
	 * @return {Boolean}
	 */
	this.equals = function(set){
		_set.sort().equals(set.sort());
		//return this.toString()==set.toString();
	};
}