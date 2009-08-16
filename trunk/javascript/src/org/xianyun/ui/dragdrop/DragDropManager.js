/*<![CDATA[*/

var DragDropManager = {
	registerDragSource:function(){},
	registerDropTarget:function(){}
};

var DragSource = function(){
	this.onDrag = function(){};
};

var DropTarget = function(){
	this.onDrag = function(){};
	this.inDraging = function(){};
	this.onDrop = function(){};
};

/*]]>*/