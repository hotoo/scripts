/** cn.hotoo.javascript.UI.HTAlert.js [class]
 * @description 一个封装的模拟 window.alert() 类
 * IE 6.0, firefox 1.0, Opera 8.0 通过测试
 * @using cn.hotoo.javascript.UI.HTWindow.js [class]
 *           cn.hotoo.javascript.UI.HTForm.js [object]
 *           cn.hotoo.javascript.tools.Browser.js [object]
 * @version 1.2.0
 *
 * @author 闲耘 (HoToo)
 * @author hotoo.cn@gmail.com
 *
 * @create 2006-6-20
 * @update
 *
 */

_package('cn.hotoo.UI.Window');

_import('cn.hotoo.UI.Window.HTWindow');
_import('cn.hotoo.UI.form.HTForm');

var HTAlert = cn.hotoo.UI.Window.HTAlert = function(title, body){
    var _title = title;
    var _body = body;
    var _win = null;
    var _layOver = null;
    var _yesBar = null;
    var _noBar = null;
    var _ME = this;

    var create = function(){
        _layOver = document.createElement(Browser.isIE ? 'iframe' : 'div');
        _layOver.style.width = '100%';
        _layOver.style.top = 0;
        _layOver.style.left = 0;
        _layOver.style.zIndex = 100;
        _layOver.style.position = 'absolute';
        _layOver.style.backgroundColor = '#eeeeee';
        _layOver.style.filter = 'Alpha(opacity=22)';
        _layOver.style.height = document.body.scrollHeight;
        document.body.appendChild(_layOver);
        _win = new HTWindow(
            _title,
            '<p /><br /><div align="center">' + _body + '</div><p /><p /></div>',
            260,
            160,
            null,
            null,
            callback
        );
        // container the ok button.
        var _div = document.createElement('div');
        _div.setAttribute('align', 'center');
        _win.getBody().appendChild(_div);
        var _ok = HTForm.getButton(null, null, '  确定  ');
        _ok.onclick = _win.close;
        _div.appendChild(_ok);
        _ok.focus();
    };
    var callback = function(){
        this.returnValue = arguments[0];
        close();
    };
    var close = function(){
        _layOver.style.display = 'none';
    };
    
    create();
};