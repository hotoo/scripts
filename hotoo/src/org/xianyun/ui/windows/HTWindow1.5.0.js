/** cn.hotoo.javascript.UI.HTWindow.js [class]
 * @description һ����ȫ��װ��ģ�ⴰ����
 * IE 6.0, firefox 1.0, Opera 8.0, Maxthon 1.5.3 ͨ�����
 * @using cn.hotoo.javascript.tools.Counter.js [class]
 *           cn.hotoo.javascript.tools.Browser.js [object]
 * @version 1.5.0
 *
 * @author ���� (HoToo)
 * @author hotoo.cn@gmail.com
 *
 * @create 2006-6-14
 * @update 2006-6-15 using Counter.js and Browser.js
 *       veriest compatible for more browser.
 *    2006-6-21 using iframe layer overrider the select, 
 *       flash object layer in IE (other browser no bug).
 * @bug overflow-x in IE and Opera,
 *       overflow in firefox.
 *    using overflow:auto in css can resolve it,
 *    but it's a ugly interface because scroll bar.
 *  !important : encoding problem in Opera, 
 *   need a encoding class for js if using non UTF-8 encoding.
 *
 */

var HTWinIndex = new Counter(100); // the max zIndex.

function HTWindow( title, body , width, height, left, top, callback){
    var _index = HTWinIndex; // after modify the outer variable, modify this also.
    var _win = null;
    var _innerWin = null;
    var _layover = null;
    var _title = null;
    var __title = null;
    var _titleHTML = title == null ? '' : title;
    this.body = null; // public object, can using it to append objcet into this window.body : winRef.body.appendChild(obj);
    var _bodyHTML = body == null ? '' : body;
    var _minBar = null;
    var _maxBar = null;
    var _closeBar = null;
    var _callback = callback; // private. a Function object. if callback not null, it will execute when this window close.
    var _bIsDrag = false;
    var _mouseX = 0;
    var _mouseY = 0;
    var _winX = 0;
    var _winY = 0;
    var _ME = this;
    var _winStyle = {
		'width' : typeof(width) == 'number' ? width : 300,
		'height' : typeof(height) == 'number' ? height : 200,
        'left' : typeof(left) == 'number' ? left : document.body.clientWidth / 2,
		'top' : typeof(top) == 'number' ? top : parseInt(document.body.clientHeight / 2) + document.body.scrollTop,
		'position' : 'absolute' ,
		'border' : '0px solid #ffffff' ,
		'backgroundColor' : '#f6f6f6' ,
		'fontSize' : 13 ,
		'color' : '#999999' ,
		'lineHeight' : 2 ,
		'zIndex' : _index.getCount() 
	};
    var _innerWinStyle = {
		'width' : '100%',
		'height' : '100%',
		'border' : '2px solid #666666' ,
		'backgroundColor' : '#f6f6f6' ,
		'fontSize' : 13 ,
		'color' : '#999999' ,
		'lineHeight' : 2 
	};
    var _titleStyle = {
		'width' : '100%' ,
		'height' : 24 ,
        'borderBottom' : '0px solid #cccccc' ,
		'backgroundColor' : '#666666' ,
        'fontFamily' : 'verdana,helvetica,arial,sans-serif;',
		'fontSize' : 13 ,
		'color' : '#f6f6f6' ,
		'lineHeight' : 2 ,
		'fontWeight' : 'bold' ,
		'textAlign' : 'center' ,
        'overflow' : 'hidden',
        'cursor' : 'move' 
	};
    var _bodyStyle = {
		'width' : '100%' ,
		'height' : parseInt(_winStyle.height) - parseInt(_titleStyle.height) ,
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
        'winBorder' : '2px solid #333333' ,
        'titleBackgroundColor' : '#333333' ,
        'bodyBackgroundColor' : '#eeeeee' 
    };    
    this.setStyle = function( oStyle ){
		for ( var key in oStyle ) {
			_winStyle[key] = oStyle[key];
		}
	};
    this.create = function(){
        // create window frame.
        _win = document.createElement('div');
        _win.onmousedown = this.focus;
        for ( var key in _winStyle ) {
			_win.style[key] = _winStyle[key];
		};
        if (typeof(left) != 'number') // default value is center of the screen.
            _win.style.left = _winStyle.left - _winStyle.width / 2;
        if (typeof(top) != 'number') // default value is middle of the screen.
            _win.style.top = _winStyle.top - _winStyle.height / 2;
        document.body.appendChild(_win);
        // create a iframe for overrider the select object and so on in IE.
        if (Browser.isIE){
        _layover = document.createElement('iframe');
		_layover.allowtransparency = "allowtransparency"; // 允许透明。
        _layover.style.position = 'absolute';
        _layover.style.zIndex = -1;
        _layover.style.top = 0;
        _layover.style.left = 0;
        _layover.style.width = '100%';
        _layover.style.height = '100%';
        _layover.setAttribute('frameBorder', 0);
        _layover.setAttribute('marginWidth', 0);
        _layover.setAttribute('marginHeight', 0);
        _win.appendChild(_layover);
        };
        // create a inner window for display.
        _innerWin = document.createElement('div');
        for ( var key in _innerWinStyle ) {
			_innerWin.style[key] = _innerWinStyle[key];
		};
        _win.appendChild(_innerWin);
        // create the title for window.
        _title = document.createElement('div');
        _title.style.textDecoration = 'none';
        _title.style.color = '#f6f6f6';
        _title.setAttribute('title', _titleHTML);
        _title.setAttribute('align', 'center');
        _title.align = 'center';
        for ( var key in _titleStyle ) {
			_title.style[key] = _titleStyle[key];
		}
        _title.onselectstart = function(){ return false;};
        _title.ondblclick = this.minMax;
        _title.onmousedown = this.dragStart;
        _title.onmousemove = this.drag;
        _title.onmouseup = this.dragStop;
        _title.onmouseout = this.dragStop;
        // create min bar.
        _minBar = document.createElement('a');
        _minBar.setAttribute('href', 'javascript:void(0);');
        _minBar.style.textDecoration = 'none';
        _minBar.style.color = '#f6f6f6';
        _minBar.innerHTML = Browser.isIE ? 
            '<span style="font-family:webdings;font-size:11px;font-weight:lighter;">0</span>' : '_';
        _minBar.setAttribute('title' , Browser.isOpera ? '&#26368;&#23567;&#21270;' : '��С��');
        _minBar.onclick = this.min;
        // create max bar.
        _maxBar = document.createElement('a');
        _maxBar.setAttribute('href', 'javascript:void(0);');
        _maxBar.style.textDecoration = 'none';
        _maxBar.style.color = '#f6f6f6';
        _maxBar.innerHTML = Browser.isIE ? 
            '<span style="font-family:webdings;font-size:11px;font-weight:lighter;">2</span>' : '=';
        _maxBar.style.display = 'none';
        _maxBar.setAttribute('title', Browser.isOpera ? '&#26368;&#22823;&#21270;' : '���');
        _maxBar.onclick = this.max;
        // create close bar.
        _closeBar = document.createElement('a');
        _closeBar.setAttribute('href', 'javascript:void(0);');
        _closeBar.innerHTML = Browser.isIE ? 
            '<span style="font-family:webdings;font-size:11px;font-weight:lighter;">r</span>' : 'X';
        _closeBar.setAttribute('title', Browser.isOpera ? '&#20851;&#38381;' : '�ر�');
        _closeBar.style.textDecoration = 'none';
        _closeBar.style.color = '#f6f6f6';
        _closeBar.onclick = this.close;
        // create a title container for display title string.
        __title = document.createElement('div');
        __title.style.width = parseInt(_win.style.width) - 60;
        __title.style.overflow = 'hidden';
        __title.setAttribute('title', _titleHTML);
        __title.innerHTML = _titleHTML;
        // create a container include the bars.
        var _bars = document.createElement('div');
        _bars.style.top = 1;
        _bars.style.position = 'absolute';
        _bars.style.right = 5;
        _title.appendChild(_bars);
        _title.appendChild(__title);
        // add they bars.
        _bars.appendChild(_minBar);
        _bars.appendChild(_maxBar);
        _bars.appendChild(_closeBar);
        // create the body of window.
        this.body = document.createElement('div');
        for ( var key in _bodyStyle ) {
			this.body.style[key] = _bodyStyle[key];
		}
        this.body.innerHTML = _bodyHTML;
        _innerWin.appendChild(_title);
        _innerWin.appendChild(this.body);

        _index.addCount(1);
    };
    this.setTitle = function(title){
        __title.innerHTML = title;
        _title.setAttribute('title', title);
        __title.setAttribute('title', title);
    };
    this.minMax = function(){
        if(_ME.body.style.display == 'none'){
            _ME.max();
        } else {
            _ME.min();
        }
    }
    this.min = function( ){
        _ME.body.style.display = 'none';
        _win.style.height = _title.style.height;
        _minBar.style.display = 'none';
        _maxBar.style.display = '';
    };
    this.revert = function(){}
    this.max = function( ){
        _ME.body.style.display = '';
        _win.style.height = _winStyle.height;
        _minBar.style.display = '';
        _maxBar.style.display = 'none';
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
        _ME.focus();
        _win.style.display = '';
    };
    this.hidden = function( ){
        _win.style.display = 'none';
    };
    this.focus = function( ){
        if (_win.style.zIndex == _index.getCount()) { return;}
        _index.addCount(1);
        _win.style.zIndex = _index.getCount();
    };
    this.dragStart = function(event){
        if (event == null) {event = window.event;}
        _mouseX = event.clientX;
        _mouseY = event.clientY;
        _winX = parseInt(_win.style.left);
        _winY = parseInt(_win.style.top);
        // set drag style.
        _innerWin.style.border = _ME._dragStyle.winBorder;
        _title.style.backgroundColor = _ME._dragStyle.titleBackgroundColor;
        _ME.body.style.backgroundColor = _ME._dragStyle.bodyBackgroundColor;
        _bIsDrag = true;
    };
    this.drag = function(event){
        if (!_bIsDrag) { return;}
        if (event == null) {event = window.event;}
        _win.style.left = event.clientX - ( _mouseX - _winX);
        _win.style.top = event.clientY - ( _mouseY - _winY);
    };
    this.dragStop = function(){
        if (!_bIsDrag){return;};
        _innerWin.style.border = _innerWinStyle.border;
        _title.style.backgroundColor = _titleStyle.backgroundColor;
        _ME.body.style.backgroundColor = _bodyStyle.backgroundColor;
        _bIsDrag = false;
    };

    this.create();
};