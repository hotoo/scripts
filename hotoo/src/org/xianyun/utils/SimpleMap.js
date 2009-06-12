/*<![CDATA[*/
/**
 * 简单无序图。
 * key 只允许为字符串型，使用其他类型时自动转型为字符串。
 * value 允许是任意对象。
 * @author 闲耘 (mail[AT]xianyun.org)
 * @create 1.0, 2007/08/23
 */
var SimpleMap = function(){
    var map = new Object();

    this.containsKey = function(key){
        for (var k in map){
            if (k==key){return true;}
        }
        return false;
    };

    this.containsValue = function(value){
        for (var k in map){
            if (value==map[k]){return true;}
        }
        return false;
    }

    this.get = function(key){
        return map[key];
    }

    this.isEmpty = function(){
        return this.size()==0;
    }

    this.remove = function(key){
        if (!this.containsKey(key)){return;}
        map[key] = null;
        delete map[key];
    };

    this.size = function(){
        var i = 0;
        for (var k in map){
            i++;
        }
        return i;
    }
};
/*]]>*/