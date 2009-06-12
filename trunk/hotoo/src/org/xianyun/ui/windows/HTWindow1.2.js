/** cn.hotoo.javascript.tools.HTWindow.js [class]
 * @description 一个完全封装的模拟窗口类
 * IE 6.0, firefox 1.0, Opera 8.0 通过测试
 * @using cn.hotoo.javascript.tools.Counter.js [class]
 *           cn.hotoo.javascript.tools.Browser.js [object]
 * @version 1.2.0
 *
 * @author 闲耘 (HoToo)
 * @author hotoo.cn@gmail.com
 *
 * @create 2006-6-14
 * @update 2006-6-15 using Counter.js and Browser.js
 *              veriest compatible for more browser.
 * @bug overflow-x in IE and Opera,
 *         overflow in firefox.
 *         select, flash will override the div.
 *
 */

var HTWinIndex = new Counter(100); // the max zIndex.

function HTWindow( title, body , width, height, left, top, callback){
    var _index = HTWinIndex; // 外部变量名修改后，相应修改此处变量名
    this._win = null;
    this._title = null;
    this._titleHTML = title == null ? '' : title;
    this._body = null;
    this._bodyHTML = body == null ? '' : body;
    this._minBar = null;
    this._maxBar = null;
    this._closeBar = null;
    var _callback = callback;
    var _bIsDrag = false;
    var _mouseX = 0;
    var _mouseY = 0;
    var _winX = 0;
    var _winY = 0;
    var _ME = this;
    this._winStyle = {
		'left' : left == null ? 100 : left,
		'top' : top == null ? 100 : top,
		'width' : width == null ? 300 : width,
		'height' : height == null ? 200 : height,
		'position' : 'absolute' ,
		'border' : '2px solid #888888' ,
		'backgroundColor' : '#f6f6f6' ,
		'fontSize' : 13 ,
		'color' : '#999999' ,
		'lineHeight' : 2 ,
	//!	'float' : 'right' , // throw exception in firefox 1.0.
		'zIndex' : _index.getCount() 
	};
    this._titleStyle = {
		'width' : '100%' ,
		'height' : 24 ,
        'borderBottom' : '0px solid #cccccc' ,
		'backgroundColor' : '#888888' ,
        'fontFamily' : 'verdana,helvetica,arial,sans-serif;',
		'fontSize' : 13 ,
		'color' : '#f6f6f6' ,
		'lineHeight' : 2 ,
		'fontWeight' : 'bold' ,
		'textAlign' : 'center' ,
        'overflow' : 'hidden',
        'cursor' : 'move' 
	};
    this._bodyStyle = {
		'width' : '100%' ,
		'height' : parseInt(this._winStyle.height) - parseInt(this._titleStyle.height) ,
        'border' : '0px solid #cccccc' ,
		'backgroundColor' : '#f6f6f6' ,
		'fontSize' : 13 ,
		'color' : '#999999' ,
		'lineHeight' : 1.5,
		'fontWeight' : 'lighter' ,
		'textAlign' : 'left' ,
        'overflow' : 'hidden' , // !Browser.isIE
        'overflowX' : 'hidden' , // Browser.isIE
        'overflowY' : 'visible' , // Browser.isIE
        'wordBreak' : 'break-all' 
	};
    this._dragStyle = {
        'winBorder' : '2px solid #666666' ,
        'winShadow' : 'dropshadow(color=#ff0000,offx=6,offy=6,positive=1)' ,
        'titleBackgroundColor' : '#666666' ,
        'bodyBackgroundColor' : '#eeeeee' 
    };
    
    this.setStyle = function( oStyle ){
		for ( var key in oStyle ) {
			this._winStyle[key] = oStyle[key];
		}
	}
    this.create = function(){
        // create window.
        this._win = document.createElement('div');
        this._win.onmousedown = this.focus;
        for ( var key in this._winStyle ) {
			this._win.style[key] = this._winStyle[key];
		}
        // create the title for window.
        this._title = document.createElement('div');
        this._title.style.textDecoration = 'none';
        this._title.style.color = '#f6f6f6';
        this._title.setAttribute('title', this._titleHTML);
        for ( var key in this._titleStyle ) {
			this._title.style[key] = this._titleStyle[key];
		}
        this._title.onselectstart = function(){ return false;};
        this._title.ondblclick = this.minMax;
        this._title.onmousedown = this.dragStart;
        this._title.onmousemove = this.drag;
        this._title.onmouseup = this.dragStop;
        this._title.onmouseout = this.dragStop;
        // create min bar.
        this._minBar = document.createElement('a');
        this._minBar.setAttribute('href', 'javascript:void(0);');
        this._minBar.style.textDecoration = 'none';
        this._minBar.style.color = '#f6f6f6';
        this._minBar.innerHTML = Browser.isIE ? 
            '<span style="font-family:webdings;font-size:11px;font-weight:lighter;">0</span>' : '_';
        this._minBar.setAttribute('title' , Browser.isOpera ? '&#26368;&#23567;&#21270;' : '最小化');
        this._minBar.onclick = this.min;
        // create max bar.
        this._maxBar = document.createElement('a');
        this._maxBar.setAttribute('href', 'javascript:void(0);');
        this._maxBar.style.textDecoration = 'none';
        this._maxBar.style.color = '#f6f6f6';
        this._maxBar.innerHTML = Browser.isIE ? 
            '<span style="font-family:webdings;font-size:11px;font-weight:lighter;">2</span>' : '=';
        this._maxBar.style.display = 'none';
        this._maxBar.setAttribute('title', Browser.isOpera ? '&#26368;&#22823;&#21270;' : '最大化');
        this._maxBar.onclick = this.max;
        // create close bar.
        this._closeBar = document.createElement('a');
        this._closeBar.setAttribute('href', 'javascript:void(0);');
        this._closeBar.innerHTML = Browser.isIE ? 
            '<span style="font-family:webdings;font-size:11px;font-weight:lighter;">r</span>' : 'X';
        this._closeBar.setAttribute('title', Browser.isOpera ? '&#20851;&#38381;' : '关闭');
        this._closeBar.style.textDecoration = 'none';
        this._closeBar.style.color = '#f6f6f6';
        this._closeBar.onclick = this.close;
        // create a title.
        var _tit = document.createElement('span');
        _tit.innerHTML = this._titleHTML;
        // create a container include the bars.
        var _bars = document.createElement('span');
        _bars.style.top = 1;
        _bars.style.position = 'absolute';
        _bars.style.right = 5;
        this._title.appendChild(_bars);
        this._title.appendChild(_tit);
        // add they bars.
        _bars.appendChild(this._minBar);
        _bars.appendChild(this._maxBar);
        _bars.appendChild(this._closeBar);
        // create the body of window.
        this._body = document.createElement('div');
        for ( var key in this._bodyStyle ) {
			this._body.style[key] = this._bodyStyle[key];
		}
        this._body.innerHTML = this._bodyHTML;
        document.body.appendChild(this._win);
        this._win.appendChild(this._title);
        this._win.appendChild(this._body);
        // create a iframe over the select object and so on.
        /*
        var over = document.createElement('iframe');
        over.style.zIndex = -1;
        over.style.position = 'absolute';
        over.style.top = 0;
        over.style.left = 0;
        over.style.width = '100%';
        over.style.height = '100%';
        over.setAttribute('frameBorder', 0);
        over.setAttribute('marginWidth', 0);
        over.setAttribute('marginHeight', 0);
        this._win.appendChild(over);
        */
        _index.addCount(1);
    };
    this.minMax = function(){
        if(_ME._body.style.display == 'none'){
            _ME.max();
        } else {
            _ME.min();
        }
    }
    this.min = function( ){
        _ME._body.style.display = 'none';
        _ME._win.style.height = _ME._title.style.height;
        _ME._minBar.style.display = 'none';
        _ME._maxBar.style.display = '';
    };
    this.revert = function(){}
    this.max = function( ){
        _ME._body.style.display = '';
        _ME._win.style.height = _ME._winStyle.height;
        _ME._minBar.style.display = '';
        _ME._maxBar.style.display = 'none';
    };
    this.close = function( ){
        _ME.hidden();
        if (_callback != null){
            _callback(true);
        };
    };
    this.open = function( ){
        _ME.show();
    };
    this.show = function( ){
        this.focus();
        this._win.style.display = '';
    };
    this.hidden = function( ){
        this._win.style.display = 'none';
    };
    this.focus = function( ){
        if (_ME._win.style.zIndex == _index.getCount()) { return;}
        _index.addCount(1);
        _ME._win.style.zIndex = _index.getCount();
    };
    this.dragStart = function( event ){
        if (event == null) {event = window.event;}
        _mouseX = event.clientX;
        _mouseY = event.clientY;
        _winX = parseInt(_ME._win.style.left);
        _winY = parseInt(_ME._win.style.top);
        // set drag style.
        _ME._win.style.border = _ME._dragStyle.winBorder;
        //_ME._win.style.filter = _ME._dragStyle.winShadow;
        _ME._title.style.backgroundColor = _ME._dragStyle.titleBackgroundColor;
        _ME._body.style.backgroundColor = _ME._dragStyle.bodyBackgroundColor;
        _bIsDrag = true;
    };
    this.drag = function( event ){
        if (!_bIsDrag) { return;}
        if (event == null) {event = window.event;}
        _ME._win.style.left = event.clientX - ( _mouseX - _winX);
        _ME._win.style.top = event.clientY - ( _mouseY - _winY);
    };
    this.dragStop = function(){
        if (!_bIsDrag){return;};
        _ME._win.style.border = _ME._winStyle.border;
        _ME._title.style.backgroundColor = _ME._titleStyle.backgroundColor;
        _ME._body.style.backgroundColor = _ME._bodyStyle.backgroundColor;
        _bIsDrag = false;
    };

    this.create();
}