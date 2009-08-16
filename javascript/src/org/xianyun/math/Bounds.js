/*<![CDATA[*/
/** 数学区域对象集。匹配多个区域，如 "(--, 0)[1,++)"
 * @class org.xianyun.math.Bounds
 * @using org.xianyun.math.Bound
 * @create 2007/08/08
 * @author 闲耘 (hotoo.cn[AT]gmail.com)
 */

var Bounds = function(bounds){
    var REBS = /\s*([\[\(]\s*(\d+|--|-∞)\s*\,\s*(\d+|\+\+|\+∞)\s*[\]\)])\s*/g; // 匹配多个区域。
    if (!REBS.test(bounds.toString())){
        throw new Error("syntax error.");
    }

    /** 可以将范围表达式进行优化。
     * @param void.
     * @return Array[Bound].
     */
    var parse = function(){
        var as = new Array();
        var bs = bounds.toString().match(REBS);
        for (var i=0; i<bs.length; i++){
            as.push(new Bound(bs[i]));
        }
        return as;
    };

    var as = parse();

    /** 优化范围对象集，将有交集的范围对象合并为一个范围对象。
     * @param as, Array. 元素为范围对象的数组。
     * @return Array. 优化后的范围对象集。
     */
    var optimize = function(as){
        for (var i=as.length; i>=0; i--){
            // @TODO
        }
    };
    var optimize2 = function(b1, b2){
        // @TODO
    };

    /** 判断当前范围表达式是否包含数值number。
    * 这个方法可以在将范围表达式优化后
     * @param number, Number.
     * @return Boolean.
     */
    this.contain = function(number){
        for (var i=0; i<as.length; i++){
            if (as[i].contain(number)){
                return true;
            }
        }
        return false;
    };

    /** 比较当前区域对象是否与另一区域对象bound的值相等。
     * @param bound, Bound.
     * @return Boolean.
     */
    this.equals = function(){
        // @TODO 比较优化后的区域对象集转为字符串的值即可。
    };

    this.toString = function(){
        return bounds.replace(/\s+/g, "");;
    };
    this.valueOf = function(){
        return this.toString();
    };
};

/*]]>*/