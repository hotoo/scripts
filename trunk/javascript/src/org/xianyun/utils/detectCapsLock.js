/**
 * 判断是否开启了锁定大写键(Caps Lock)
 * @author 秦歌(dancewithnet.com)
 * @see http://dancewithnet.com/2007/04/16/detect-caps-lock/
 */
function detectCapsLock(event){
    var e = event || window.event;
    var o = e.target || e.srcElement;
    var keyCode = e.keyCode || e.which; // 获取按键的keyCode
    var isShift = e.shiftKey || (keyCode==16) || false;
    // 判断shift键是否按住
    if(((keyCode>=65 && keyCode<=90) && !isShift) || // Caps Lock 打开，且没有按住shift键
      ((keyCode>=97 && keyCode<=122) && isShift) // Caps Lock 打开，且按住shift键
      ){
        return true;
    }
    return false;
}
//document.getElementById('password').onkeypress = detectCapsLock;
