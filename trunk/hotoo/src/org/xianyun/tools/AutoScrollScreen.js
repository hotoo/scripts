/** cn.hotoo.javascript.tools.AutoScrollScreen.js [object]
 * @description 双击鼠标滚动屏幕静态[static]对象
 * IE 6.0, firefox 1.0, Opera 8.0 通过测试
 * @using
 * @version 0.6.0
 *
 * @author 闲耘 (HoToo)
 * @author hotoo.cn@gmail.com
 *
 * @create 2006-6-15
 * @update 2006-6-16
 *
 */


var AutoScrollScreen = new Object( );

AutoScrollScreen.delay = 50;

AutoScrollScreen.start = function(){
    AutoScrollScreen._timer = 
        setInterval('AutoScrollScreen.scroll()', 
            AutoScrollScreen.delay);
};

AutoScrollScreen.stop = function(){
    clearInterval(AutoScrollScreen._timer);
};

AutoScrollScreen.scroll = function(){
    var _currentpos = document.body.scrollTop;
    window.scroll( 0, ++_currentpos);
    if (_currentpos != document.body.scrollTop){
        this.stop();
    }
};

Event.addEventListener(document, "dblclick", AutoScrollScreen.start);
Event.addEventListener(document, "mousedown", AutoScrollScreen.stop);