/*<![CDATA[*/


var Drag = {
	"moveDiv":null,
	"dragObj":null,
	"draging":false,
  "start":function(ev){
  	Drag.dragObj = Utils.getTarget(ev);
  	if(Drag.isdragable()){
  	  Drag.createDiv();
    	Drag.draging = false;
  	}
    return false;
  },
  "draging":function(ev){
  	if(!Drag.isdragable() || Drag.moveDiv == null){
  	    return;
  	}
  	
  	// 设置被选定对象的鼠标跟随效果
  	if(!Drag.draging){
  		var move = Drag.dragObj.cloneNode(true);
  		Drag.moveDiv.appendChild(move);
  	}
    Drag.moveDiv.style.top  = (Utils.getPosition(ev)).top;
		Drag.moveDiv.style.left = (Utils.getPosition(ev)).left;
		
		// 使用DOM操作，替换拖动过程中元素的位置
		var mouseOverObj = Utils.getTarget(ev);		
		if(mouseOverObj.getAttribute("dragable") || mouseOverObj.getAttribute("container")){
			if(Drag.dragObj.parentNode != mouseOverObj.parentNode){
				if(mouseOverObj.nextSibling){
					mouseOverObj.parentNode.insertBefore(Drag.dragObj,mouseOverObj);
			  }else{
			    mouseOverObj.parentNode.appendChild(Drag.dragObj);
			  }
			}else{
				if(mouseOverObj.nextSibling){
					Drag.dragObj.parentNode.insertBefore(Drag.dragObj,mouseOverObj);
			  }else{
			    Drag.dragObj.parentNode.appendChild(Drag.dragObj);
			  }
      }
    }
    
    // 设置状态为拖动中
    Drag.draging = true;
    return false;
  },
  "end":function(){
    Drag.dragObj = null;
    Drag.removeDiv();
    Drag.draging = false;
    return false;
  },
  "removeDiv":function(){
  	// 移除拖动时跟随鼠标移动的虚拟DIV层
    if(Drag.moveDiv != null){
  		Drag.moveDiv.style.display = "none";
  		Drag.moveDiv.parentNode.removeChild(Drag.moveDiv);
    	Drag.moveDiv = null;
  	}
  },
  "createDiv":function(){
  	 // 初始化拖动时跟随鼠标移动的虚拟DIV层
  	 Drag.removeDiv();
     Drag.moveDiv = document.createElement("div");
     Drag.moveDiv.style.cssText = "position:absolute;z-index:10;";
     document.body.appendChild(Drag.moveDiv);
  },
  "isdragable":function(){
  	// 验证当前对象是否为可拖动的对象
    if(Drag.dragObj == null || !Drag.dragObj.getAttribute("dragable")){
  	    return false;
  	}
  	return true;
  }
}

var Utils = {
  "getTarget":function(ev){
  	 // 获得当前的目标源对象
  	 ev = ev || window.event;
  	 var tget = ev.target || ev.srcElement;
  	 return tget;
  },
  "getPosition":function(ev){
  	 // 设置坐标
  	 // 模拟一个鼠标跟随的效果
  	 ev = ev || window.event;
  	 return {top:document.body.scrollTop + ev.clientY + 10,
  	 				left:document.body.scrollLeft + ev.clientX + 10};
  }
}


document.onmousemove = Drag.draging;
document.onmouseup   = Drag.end;
document.onmousedown = Drag.start;



/*]]>*/