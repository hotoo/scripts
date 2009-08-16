/*<![CDATA[*/
/**
 * 堆栈。
 * @author 闲耘 (xianyun.org, hotoo.cn[AT]gmail.com)
 * @create 2007/07/22
 */
var Stack = function(){
    this.elements = new Array();
    for (var i=0; i<arguments.length; i++){
        this.elements.push(arguments[i]);
    }
};
Stack.prototype.isEmpty = function(){
    return this.elements.length==0;
};
Stack.prototype.getLength = function(){
    return this.elements.length;
};
Stack.prototype.getTop = function(){
    return this.elements[this.elements.length-1]; // when stack is empty, return this.elements[-1], undefined, null.
};
/*Stack.prototype.push = function(element){
    return this.elements.push(element);
};*/
Stack.prototype.push = function(){
    for (var i=0; i<arguments.length; i++){
        this.elements.push(arguments[i]);
    }
    return this.elements.length;
};
Stack.prototype.pop = function(){
    return this.elements.pop();
};

Stack.prototype.equals = function(stack){
	return stack instanceof Stack &&
		this.elements.equals(stack.elements);
};
Stack.prototype.toString = function(){
    return this.elements.toString();
};
Stack.prototype.valueOf = function(){
    return this.elements.valueOf();
};
//@TODO
//Stack.prototype.traverse = function(visit()){};
/*]]>*/