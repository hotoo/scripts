/*<![CDATA[*/

/**
 * 不透明性辅助方法：渐变透明性。
 * @author 闲耘 (xianyun.org, hotoo.cn[AT]gmail.com)
 * @version 2007/11/04
 */
OpacityUtil = {
	show : function(element, delay){
	    function showing(value){
	        if (value<100){
	            Opacity.setValue(element, value);
	            window.setTimeout("showing("+(value+10)+")", delay);
	        }
	    }
	    showing(10);
	},
	hidden : function(element, delay){
	    Opacity.hidding(element, 100, delay);
	},
	hidding : function(element, value, delay){
	    if (value>0){
	        Opacity.setValue(element, value);
	        window.setTimeout("OpacityUtil.hidding("+element.id+", "+(value-10)+", "+delay+")", delay);
	    }
	}
};
/*]]>*/