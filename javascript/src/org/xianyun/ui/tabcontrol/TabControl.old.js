/*<![CDATA[*/
/**
                                         .------------.
                                         | TabControl |
.-------------------------------------------.
| @description 封装的一个选项卡控件         |
|   fGetData interface to support using AJAX  |
|   IE6.0, Firefox1.0, Opera8.0/9.0 通过测试  |
| @version 1.3.0                                       |
| @author 闲耘( hotoo.cn)                         |
| @author hotoo.cn@gmail.com                   |
| @create 2006-7-13.                                |
| @update 2006-7-21.                               |
|_____________________________________.|

*/

_package('cn.hotoo.UI.tabcontrol');

var TabControl = cn.hotoo.UI.tabcontrol = function(oParent, arrTabPage, iDefaultTabPage){
    var control = null;
    var table = null, tbody = null; labelBox = null;
    var body = null;
    var currTabPage = null;
    var exclusivePageId = 0;
    var tabPage = new Array();
    var spLabel = new Array();
    var initTabPagesId = new Array();

    this.getInstance = function(){
        return control;
    };
    this.getTabPage = function(id){
        return tabPage[id];
    };
    this.getCurrentTabPage = function(){
        return currTabPage;
    };
    this.getTabPagesId = function(){
        return initTabPagesId;
    };
    this.appendTabPage = function(label, content, fGetData, bEveryTime){
        var id = addTabPage(label, content, fGetData, bEveryTime);
        initTabPagesId.push(id);
        labelBox.appendChild(tabPage[id].getLabel());
        labelBox.appendChild(spLabel[id]);
        body.appendChild(tabPage[id].getBody());
        doShow(id);
        return id;
    };
    this.insertTabPage = function(id, label, content, fGetData, bEveryTime){
        //
    };
    var addTabPage = function(label, content, fGetData, bEveryTime){
        var __id = getExclusiveId();
        tabPage[__id] = new TabPage(label, content, fGetData, bEveryTime);
        tabPage[__id].getLabel().onclick = function(){
            doShow(__id);
        };
        spLabel[__id] = document.createElement('td');
        spLabel[__id].style.borderBottom = '1px solid #8CD5D5';
        spLabel[__id].style.width = '2px';
        spLabel[__id].innerHTML = '&nbsp;';
        return __id;
    };
    this.removeTabPage = function(id){ // bug, no current tab page after removed.
        labelBox.removeChild(tabPage[id].getLabel());
        labelBox.removeChild(spLabel[id]);
        body.removeChild(tabPage[id].getBody());
    };
    this.show = function(id){
        doShow(id);
    };
    var init = function(){
        control = document.createElement('div');
        control.style.width = '99%';
        //control.style.height = '98%';
        control.style.paddingLeft = '5px';
        table = document.createElement('table');
        table.style.width = '100%';
        table.style.height = '27px';
        table.style.border = '0px solid #ffffff';
        if (Browser.isIE){
            table.style.borderCollapse = 'collapse';
            //table.style.borderSpacing = 0;
        }else{
            table.setAttribute('cellspacing', 0);
            table.setAttribute('cellpadding', 0);
        };
        table.style.marginBottom = '5px';
        tbody = document.createElement('tbody');
        labelBox = document.createElement('tr');
        emptyLabel = document.createElement('td');
        emptyLabel.style.borderBottom = '1px solid #8CD5D5';
        emptyLabel.innerHTML = '&nbsp;';
        body = document.createElement('div');
        body.style.borderBottom = '20px solid #D9F0F0';

        if (typeof(oParent) == 'object'){
            oParent.appendChild(control);
        };
        control.appendChild(table);
        control.appendChild(body);
        table.appendChild(tbody);
        tbody.appendChild(labelBox);
        labelBox.appendChild(emptyLabel);
    };
    var initTabPage = function(){
        /*arrTabPage = [
                [label, content, fGetData, bEveryTime],
                [...]
            ]
        */
        for (var i = 0; i < arrTabPage.length; i++){
            var id = addTabPage(arrTabPage[i][0], arrTabPage[i][1], arrTabPage[i][2], arrTabPage[i][3]);
            initTabPagesId.push(id);
            labelBox.appendChild(tabPage[id].getLabel());
            labelBox.appendChild(spLabel[id]);
            body.appendChild(tabPage[id].getBody());
        };
        if (typeof(iDefaultTabPage) == 'number' && iDefaultTabPage < arrTabPage.length){
            doShow(iDefaultTabPage);
        };
    };
    var getExclusiveId = function(){
        return exclusivePageId ++;
    };
    var doShow = function(id){
        if (id == currTabPage){ return;};
        if (currTabPage != null){
            tabPage[currTabPage].disguise();
        };
        tabPage[id].show();
        currTabPage = id;
    };

    var TabPage = function(label, content, fGetData, bEveryTime){ // inner class for create tabpage.
        var labelStyle = {
            fontFamily:'verdana,helvetica,arial,sans-serif',
            padding:'0 0 0 0',
            margin:'0 0 0 0',
            fontSize:'14px',
            textAlign:'center',
            width:'100px'
        };
        var labelOnStyle = {
            fontWeight:'bold',
            backgroundColor:'#D9F0F0',
            borderRight:'1px solid #8CD5D5',
            borderLeft:'1px solid #8CD5D5',
            borderTop:'1px solid #8CD5D5',
            borderBottom:'0px solid #ffffff',
            //borderCollapse:'collapse',
            cursor:''
        };
        var labelOffStyle = {
            fontWeight:'',
            backgroundColor:'#FFFFFF',
            borderRight:'1px solid #CFCFCF',
            borderLeft:'1px solid #CFCFCF',
            borderTop:'1px solid #CFCFCF',
            borderBottom:'1px solid #8CD5D5',
            //borderCollapse:'separate',
            cursor:(Browser.isIE?'hand':'pointer')
        };
        var _label = document.createElement('td');
        for (var key in labelStyle){
            _label.style[key] = labelStyle[key];
        };
        for (var key in labelOffStyle){
            _label.style[key] = labelOffStyle[key];
        };
        _label.setAttribute('title', label);
        _label.innerHTML = label;
        var _body = document.createElement('div');
        _body.style.display = 'none';
        _body.innerHTML = content;
        this.show = function(){
            for (var key in labelOnStyle){
                _label.style[key] = labelOnStyle[key];
            };
            _body.style.display = '';
            if (typeof(fGetData) == 'function'){ // get data.
                if (bEveryTime){
                    fGetData(this);
                }else if (_body.innerHTML == content){
                    fGetData(this);
                };
            };
        };
        this.disguise = function(){
            for (var key in labelOffStyle){
                _label.style[key] = labelOffStyle[key];
            };
            _body.style.display = 'none';
        };
        this.getLabel = function(){
            return _label;
        };
        this.getBody = function(){
            return _body;
        };
    };

    init();
    if (typeof(arrTabPage) == 'object'){
        initTabPage();
    };
};
/*]]>*/