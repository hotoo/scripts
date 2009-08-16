/*<![CDATA[*/
/** 数学区域对象。(--, 0), (0,1], [2, ++), --,-∞表示负无穷，++,+∞表示正无穷。
 * @class org.xianyun.math.Area
 * @create 2007/08/08
 * @author 闲耘 (hotoo.cn[AT]gmail.com)
 */


var Bound = function(bound){
    var REB = /^\s*([\[\(])\s*(\d+|--|-∞)\s*,\s*(\d+|\+\+|\+∞)\s*([\]\)])\s*$/

    if (!REB.test(bound.toString())){
        throw new Error("syntax error.");
    }

    /** 解析字符串对象bound，用于范围表达式的数学处理。
     * @param bound, String.
     * @return Array.
     */
    var parse = function(bound){
        var a = new Array();
        var b = bound.toString().match(REB);
        a.push(b[1]);a.push(b[2]);a.push(b[4]);a.push(b[3]);
        return a;
    };

    // init.
    var a = parse(bound);

    /** 将范围表达式符号转换为数学比较符。
     * @param c, String, Character. "[,(,),]"之一
     * @return String.
     */
    var toComparisonOperators = function(c){
        switch (c){
        case "[":return ">=";
        case "(":return ">";
        case ")":return "<";
        case "]":return "<=";
        default :throw Error("param error.");
        }
    };

    /** 判断当前范围对象的值是否包含数值number.
     * @param number, Number.
     * @return Boolean.
     */
    this.contain = function(number){
        if (a[1]=="--" || a[1]=="-∞"){
            if (a[3]=="++" || a[3]=="+∞"){
                return true;
            } else {
                return eval(""+number+toComparisonOperators(a[2])+a[3]);
            }
        } else {
            if (a[3]=="++" || a[3]=="+∞"){
                return eval(""+number+toComparisonOperators(a[0])+a[1]);
            } else {
                return eval(""+number+toComparisonOperators(a[0])+a[1]+"&&"+number+toComparisonOperators(a[2])+a[3]);
            }
        }
    };

    /** 取得当前区域对象和指定区域对象bound的交集。
     * @param bound, Bound.
     * @return Bound, null
     */
    this.intersection = function(bound){
        // @TODO
    };

    /** 判断当前范围对象是否与另一范围对象bound值相等。
     * @param bound, Bound.
     * @return Boolean.
     */
    this.equals = function(bound){
        return this.toString()==bound.toString();
    };

    this.toString = function(){
        return bound.replace(/\s+/g, "");
    };

    this.valueOf = function(){
        return this.toString();
    };
};
Bound.intersection = function(bound1, bound2){
    
};

/*]]>*/