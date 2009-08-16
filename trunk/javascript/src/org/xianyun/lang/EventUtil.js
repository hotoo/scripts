/*<![CDATA[*/
//eventutil.js
// from : 《Javascript高级程序设计》
// http://www.blogjava.net/killme2008/archive/2007/02/06/98286.html

var EventUtil = new Object;
/* 
  此方法用来给特定对象添加事件，oTarget是指定对象,sEventType是事件类型，如click、keydown等，    fnHandler是事件回调函数*/

EventUtil.addEventHandler = function (oTarget, sEventType, fnHandler) {
    //firefox情况下
    if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false);
    }
    //IE下
    else if (oTarget.attachEvent) {
        oTarget.attachEvent("on" + sEventType, fnHandler);
    }
    else {
        oTarget["on" + sEventType] = fnHandler;
    }
};
/* 
  此方法用来移除特定对象的特定事件，oTarget是指定对象,sEventType是事件类型，如click、keydown等，fnHandler是事件回调函数
*/      
EventUtil.removeEventHandler = function (oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else { 
        oTarget["on" + sEventType] = null;
    }
};

/*
 格式化事件，因为IE和其他浏览器下获取事件的方式不同并且事件的属性也不尽相同，通过此方法提供一个一致的事件
*/
EventUtil.formatEvent = function (oEvent) {
    //isIE和isWin引用到一个js文件，判断浏览器和操作系统类型
    if (isIE && isWin) {
        oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
        //IE只支持冒泡，不支持捕获
        oEvent.eventPhase = 2;
        oEvent.isChar = (oEvent.charCode > 0);
        oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
        oEvent.pageY = oEvent.clientY + document.body.scrollTop;
        //阻止事件的默认行为
        oEvent.preventDefault = function () {
            this.returnValue = false;
        };

         //将toElement,fromElement转化为标准的relatedTarget 
        if (oEvent.type == "mouseout") {
            oEvent.relatedTarget = oEvent.toElement;
        } else if (oEvent.type == "mouseover") {
            oEvent.relatedTarget = oEvent.fromElement;
        }
        //取消冒泡      
        oEvent.stopPropagation = function () {
            this.cancelBubble = true;
        };

        oEvent.target = oEvent.srcElement;
        //添加事件发生时间属性，IE没有
        oEvent.time = (new Date).getTime();
    }
    return oEvent;
};

EventUtil.getEvent = function() {
    if (window.event) {
        //格式化IE的事件
        return this.formatEvent(window.event);
    } else {
        return EventUtil.getEvent.caller.arguments[0];
    }
};
/*]]>*/