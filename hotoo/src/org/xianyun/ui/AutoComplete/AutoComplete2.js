/*<![CDATA[*/
/**@class org.xianyun.ui.helper.HTAutoComplete2
 * @using org.xianyun.system.String;
 * @debug cross Internet Explorer 6.0, Firefox 1.0, Opera 9.0, Netscape 8.0.
 * @author 闲耘(xianyun.org, hotoo.cn[AT]gmail.com)
 * @create 2007/06/28
 */
var HTAutoComplete2 = function(oElement){
    this.element = oElement;
    this.currentMatchText = null; // private:
    this.currentList = null; // 自动完成当前匹配列表， Array。
    this.values = null;
    //this.selectedIndex = -1; // using globe variable HTAutoComplete2.selectedIndex.
    this.matchEmpty = false // public: 是否匹配空字符串。是，则匹配所有项，主要用于较少可匹配项目时。
    this.followCaret = false; // public: 匹配时，提示框是否跟随光标。
    this.matchFromBegin = false; // public: 从起始字符匹配。
    this.separators = ","; // public:分隔符。
    this.submit = null; // 提交，没有匹配列表并得到回车事件时触发。 ac.submit = function(){};
    this.element.autocomplete = false; // disable browser default functionality.

    var ME = this;
    var _mat = function(){
        var val=ME.getCurrentText();
        if (/^\s*$/.test(val) && !this.matchEmpty){
            return;
        }else {
            ME.match(val);
        }
        HTAutoComplete2.cursorIndex = HTAutoComplete2.getCursorIndex(ME.element);
    };
    this.bindEvent("focus", function(){_mat();});
    this.bindEvent("keydown", function(e){
        e = window.event || e;
        var key = e.keyCode || e.which; //var target = e.srcElement || e.target;
        switch(key){
            case 10, 13 : ME.selected();break; // Enter
            case 38 : ME.up();break; // Up
            case 40 : ME.down();break; // Down
            default : break;
        }
    });
    this.bindEvent("keyup", function(e){
        e = window.event || e;
        var key = e.keyCode || e.which; //var target = e.srcElement || e.target;
        switch(key){
            case 10, 13 : break; // Enter
            case 38 : break; // Up
            case 40 : break; // Down
            default : 
                ME.match(ME.getCurrentText()); 
                HTAutoComplete2.cursorIndex=HTAutoComplete2.getCursorIndex(ME.element); 
                break;
        }
    });
    this.bindEvent("click", function(){
        _mat(); 
        //HTAutoComplete2.cursorIndex = HTAutoComplete2.getCursorIndex(ME.element);
    });
    this.bindEvent("blur", function(){ME.hidden();});
};

/**
 * 简化获得DOM元素的方法。
 * @param {Object} id
 * @return {Object}
 */
HTAutoComplete2.$ = function(id){
    return document.getElementById(id);
};
HTAutoComplete2.selectedIndex = -1; // 当前选中项的索引，如果有匹配的项，默认选中第一项。
HTAutoComplete2.cursorIndex = -1;
HTAutoComplete2.floatLayer = null; // 用于显示自动完成列表的浮动层。请使用HTAutoComplete2.getFloatLayer()方法
HTAutoComplete2.getFloatLayer = function(){
    if (!this.floatLayer){
        this.floatLayer = document.createElement('div');
        //this.floatLayer.className = 'HTAutoComplete2FloatLayer';
        this.floatLayer.id = 'HTAutoComplete2FloatLayer';
        this.floatLayer.style.position = "absolute";
        this.floatLayer.style.display = "none";
        document.body.appendChild(this.floatLayer);
        this.floatLayer.name = null;
    };
    return this.floatLayer;
};
/**
 * 捕获DOM元素element的坐标。其实可以共用Property的Position对象里的相应方法。
 * @param {Object} element
 */
HTAutoComplete2.getPosition = function(element){
    var valueT = 0, valueL = 0;
    var h = element.offsetHeight; //var w = element.offsetWidth;
    do {
        valueT += element.offsetTop  || 0;
        valueL += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);
    return [valueL, valueT+h];
};
/**
 * 跨浏览器事件绑定函数。
 * @param {Object} element
 * @param {Object} event
 * @param {Object} handle
 */
HTAutoComplete2.bindEvent = function(element, event, handle){
    if (element.attachEvent)
        element.attachEvent("on"+event, handle);
    else if (element.addEventListener)
        element.addEventListener(event, handle, false);
};
/**
 * 鼠标点击自动完成列表项事件。
 * TODO
 * @param {Object} elementId
 * @param {Number} index
 * @return void
 */
HTAutoComplete2.mousedown = function(elementId, index){
    //var o = HTAutoComplete2.$(elementId);
    //o.value = o.value.replace(new RegExp("\\b"+HTAutoComplete2.getCurrentText(o).toSafeRegExp()+"\\b", ""), value+", ");
    //setTimeout(function(){o.focus();}, 0);
    //var r = HTAutoComplete2.getRange();
    //r.moveStart('character', o.value.length);
};/*
HTAutoComplete2.setValue = function(element, cursorIndex, value){
    var _t = this.getCurrentText();
    var _c = this.getCurrentTextIndexs();
    var _flag_ = "#@#HTAutoComplete_flag_string%@%";
    var withFlag = element.value.substring(0, _c[1])+_flag_+ this.element.value.substr(_c[1]);
    element.value = withFlag.replace(
        _t.substring(0, _c[1]-_c[0])+_flag_+_t.substr(_c[1]-_c[0]), 
        " "+this.currentList[HTAutoComplete2.selectedIndex]+", ").lTrim().replace(/,\s*,/g, ",");
    this.currentMatchText = "";
    this.hidden();
    this.element.focus();
};*/
HTAutoComplete2.prototype.getPosition = function(){
    return HTAutoComplete2.getPosition(this.element);
};
HTAutoComplete2.prototype.getCursorPosition = function(){ // 捕获文本框内光标所在坐标。
    var r = HTAutoComplete2.getRange();
    var l = r["offsetLeft"] || r["startOffset"];
    var t = r["offsetTop"] || r["endOffset"];
    window.status=l +":"+ t; // debugger.
    return [l, t];//[r["offsetLeft"], r["offsetTop"]];
};
HTAutoComplete2.prototype.select = function(index){
    if (!this.currentList || this.currentList.length<=0){return;}
    if (index < 0){
        index = this.currentList.length-1;
    }else if(index > this.currentList.length-1){
        index = 0;
    }
    HTAutoComplete2.on(index);
};
HTAutoComplete2.prototype.selected = function(){
    if (! this.currentList || this.currentList.length <= 0){
        if (typeof(this.submit)=="function"){this.submit(this);}
        return;
    }
    var _t = this.getCurrentText();
    var _c = this.getCurrentTextIndexs();
    var _flag_ = "#@#HTAutoComplete2_flag_string%@%";
    var withFlag = this.element.value.substring(0, _c[1])+_flag_+ this.element.value.substr(_c[1]);
    this.element.value = withFlag.replace(
        _t.substring(0, _c[1]-_c[0])+_flag_+_t.substr(_c[1]-_c[0]), 
        " "+this.currentList[HTAutoComplete2.selectedIndex]+this.separators+" ").replace(/^\s*/g, "").replace(
            new RegExp(this.separators+"\\s\*"+this.separators, "g"), 
            this.separators);
    this.currentMatchText = "";
    this.currentList = null;
    this.hidden();
    this.element.focus();
};
HTAutoComplete2.prototype.up = function(){
    this.select(HTAutoComplete2.selectedIndex - 1);
};
HTAutoComplete2.prototype.down = function(){
    this.select(HTAutoComplete2.selectedIndex + 1);
};
HTAutoComplete2.prototype.bindEvent = function(event, handle){
    HTAutoComplete2.bindEvent(this.element, event, handle);
};
HTAutoComplete2.on = function(index){
    if (index == this.selectedIndex){return;}
    HTAutoComplete2.$("HTAutoComplete2_List_Item_"+index).className = "HTAutoComplete2ItemOn";
    if (this.selectedIndex != -1){
        HTAutoComplete2.$("HTAutoComplete2_List_Item_"+this.selectedIndex).className = "HTAutoComplete2ItemOff";
    }
    this.selectedIndex = index;
};
HTAutoComplete2.prototype.match = function(value){ // 边输入边匹配。
    if (!this.matchEmpty && /^\s*$/.test(value)){
        this.currentList = null;
        this.hidden();
        return false;
    }
    //if (this.currentMatchText == value){return;} // 注释掉这行，避免不同输入框有相同匹配关键字时，在不同输入框click时出现的问题
    value = value.replace(/(^\s+)|(\s+$)/g, "");
    this.currentMatchText = value;
    var lay = HTAutoComplete2.getFloatLayer();
    var p = this.getPosition();
    var cp = this.getCursorPosition();
    var val = this.element.value;
    lay.style.left = this.followCaret ? cp[0] + 5 : p[0];
    lay.style.top = p[1];
    this.currentList = this.filters(value);
    var s = "<div class='HTAutoComplete2ListBox'>";
    for (var i = 0; i < this.currentList.length; i++){
        s += "<div onmouseover='HTAutoComplete2.on("+i+");' onmouseout='' "+
            " onmousedown='HTAutoComplete2.mousedown(\""+this.element.id+"\", \""+i+"\");'  "+
            " class='"+(i==0?"HTAutoComplete2ItemOn":"HTAutoComplete2ItemOff")+"' "+
            "id='HTAutoComplete2_List_Item_"+i+"'>"+
            this.currentList[i].replace(
                new RegExp("("+value.toSafeRegExp()+")", "ig"), 
                "<span  class='HTAutoComplete2ListItemTextHighLight'>"+("$1".toHTML())+"</span>")+
            "</div>";
    }
    lay.innerHTML = s + "</div>";
    HTAutoComplete2.selectedIndex = 0;
    this.show();
};
HTAutoComplete2.prototype.show = function(){
    HTAutoComplete2.getFloatLayer().style.display = "";
};
HTAutoComplete2.prototype.hidden = function(){
    HTAutoComplete2.getFloatLayer().style.display = "none";
};
HTAutoComplete2.prototype.setValues = HTAutoComplete2.prototype.setArrayValue = function(values){
    this.values = values;
};
HTAutoComplete2.filters = function(value, arrayValues, matchFromBegin){ // 过滤并返回匹配的记录。
    var arr = new Array();
    for (var i = 0; i < arrayValues.length; i++){
        if (new RegExp((matchFromBegin?"^":"")+(value.toString().toSafeRegExp()), "i").test(arrayValues[i])){
            arr.push(arrayValues[i]);
        }
    }
    return arr;
};
HTAutoComplete2.prototype.filters = function(value){
    return HTAutoComplete2.filters(value, this.values, this.matchFromBegin);
};

/**
 * 获得Range对象，跨浏览器。
 * @param void.
 * @return {Object}.
 */
HTAutoComplete2.getRange = function(){
    if(undefined != document.createRange){
        return document.createRange();
    }else if(document.selection.createRange){
        return document.selection.createRange();
    }
};

/** 
 * 获得selection对象，跨浏览器
 * TODO cross browser.
 * @param void.
 * @return selection, Object.
 */
HTAutoComplete2.getSelection = function(){
    if (document.selection){
        return document.selection;
    }else if(document.getSelection){
        return document.getSelection(); //!
    }else if(window.getSelection){
        return window.getSelection(); //!
    }else {
        return null;
    }
};

/**
 * 获得DOM光标在文本区的索引位置，不在文本区则返回-1。
 * @param {Object} a, DOM对象。
 * @return {Number}, {Integer}
 */
HTAutoComplete2.getCursorIndex = function(a){
    if("INPUT"==a.tagName || "TEXTAREA"==a.tagName){
        var b=a.value.length;
        if(undefined!=a.selectionStart){
            b=a.selectionStart;
        }else if(document.selection){
            var c=document.selection.createRange();
            c.moveStart("character",-b);
            b=c.text.length;
        }
        return b;
    }else{
        return -1;
    }
};
HTAutoComplete2.prototype.getCursorIndex = function(){
    return HTAutoComplete2.getCursorIndex(this.element, this.separators);
};
HTAutoComplete2.getCurrentText = function(element, separators){
    var indexs = this.getCurrentTextIndexs(element, separators);
    return element.value.substring(indexs[0], indexs[2]);
};
HTAutoComplete2.prototype.getCurrentText = function(){
    return HTAutoComplete2.getCurrentText(this.element, this.separators);
};
HTAutoComplete2.getCurrentTextIndexs = function(element, separators){ // 获得当前匹配文本在整个文本中的起始，光标，结束位置。
    var text = element.value;
    var cursor = this.getCursorIndex(element);
    var begin = text.lastIndexOf(separators, cursor-1)+1;
    begin = begin>=-1 ? begin : 0;
    var end = text.indexOf(separators, cursor);
    end = end>begin ? end : text.length;
    return [begin, cursor, end];
};
HTAutoComplete2.prototype.getCurrentTextIndexs = function(){
    return HTAutoComplete2.getCurrentTextIndexs(this.element, this.separators);
};
/*]]>*/