/** cn.hotoo.UI.Window.ModalDialog.js [class]
 * @description 一个封装的模拟 showModalDialog() 类
 * IE 6.0, firefox 1.0, Opera 8.0 通过测试
 * @using cn.hotoo.javascript.UI.HTWindow.js [class]
 *           cn.hotoo.javascript.UI.HTForm.js [object]
 *           cn.hotoo.javascript.tools.Browser.js [object]
 * @version 1.1.0
 *
 * @author 闲耘 (HoToo)
 * @author hotoo.cn@gmail.com
 *
 * @create 2006-6-20
 * @update
 *
 */
_package('cn.hotoo.UI.Window');

_import('cn.hotoo.tools.Counter');
_import('cn.hotoo.UI.Window.HTWindow');
_import('cn.hotoo.UI.form.HTForm');

var ModalDialog = cn.hotoo.UI.Window.ModalDialog = function(title, body, width, height, left, top){
    var _title = title;
    var _body = body;
    var _win = null;
    var _layOver = null;

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
            _body,
            width,
            height,
            left,
            top,
            callback
        );
    };
    var callback = function(){
        //this.returnValue = arguments[0];
        hidden();
    };
    this.getBody = function(){
        return _win.getBody();
    };
    this.open = function(){
        _win.open();
        _layOver.style.height = document.body.scrollHeight;
        _layOver.style.display = '';
    };
    this.close = function(){
        _win.close();
        hidden();
    };
    var hidden = function(){
        _layOver.style.display = 'none';
    };

    create();
};