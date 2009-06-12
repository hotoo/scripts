/** org.xianyun.utils.Counter.js [class]
 * @description 计数器类
 * IE 6.0, firefox 1.0, Opera 8.0 通过测试
 * @version 0.2.2
 *
 * @author 闲耘 (HoToo)
 * @author hotoo.cn@gmail.com
 *
 * @create 2006-6-15
 * @update 2006-6-17 for private thanks meizz.
 * http://community.csdn.net/Expert/topic/4824/4824166.xml?temp=.6934168
 */

function Counter( defaultValue ){
    if (defaultValue != null && typeof(defaultValue) != 'number') {
        alert('Counter param is error!'); return;
    };
    var index = (defaultValue == null) ? 0 : defaultValue;
    this.getCount = function(){
        return index;
    };
    this.setCount = function( value ){
        index =  value;
    };
    this.addCount = function( value ){
        index += (typeof(value) == "number") ? value : 1;
    };
    this.subCount = function( value ){
        index -= (typeof(value) == "number") ? value : 1;
    };
}