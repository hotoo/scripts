/*<![CDATA[*/
/**
 * 浮动层的层次(层叠)管理器。
 * @author 闲耘 (xianyun.org, mail[AT]xianyun.org)
 * @version 2007/11/01
 */
var CascadeManager = {
	maxZIndex : 0,
	
	topsideElement : null, // 最上层的元素对象。
	
	/**
	 * 初始化页面：获得页面上初始Z轴最大值，
	 * 并为浮动可层叠元素对象(position:absolute)注册被管理监听事件。
	 * 完成后，该对象被鼠标按下时，将自动显示在最上层（坐标位置不变）。
	 * 
	 * 注意：该方法在页面加载完成时自动执行，如无必要，请不要调用执行，避免重复绑定事件。
	 * 另，主动调用并重复绑定事件不影响效果，除了相对效率。
	 */
	initialize : function(){
		var eles = document.getElementsByTagName("*");
		for (var i=0; i<eles.length; i++){
			if (eles[i].style.position.toString().toLowerCase()==="absolute"){
				var z = (parseInt(eles[i].style.zIndex)||0);
				if (CascadeManager.maxZIndex<=z){
					CascadeManager.maxZIndex = z;
					CascadeManager.topsideElement = eles[i]; // 获得初始的最上层对象：Z轴大于或等于其他对象，并位于文档较后位置。
				}
				//CascadeManager.maxZIndex = Math.max(CascadeManager.maxZIndex, parseInt(eles[i].style.zIndex)||0);
				Event.addEventListener(eles[i], "mousedown", Function.createDelegate(eles[i], function(){CascadeManager.setTopside(this);}));
			}
		}
	},
	
	/**
	 * 获取当前页面中Z轴最大的值。
	 * @return {Number}
	 */
	getMaxZIndex : function(){
		var eles = document.getElementsByTagName("*");
		for (var i=0; i<eles.length; i++){
			if (eles[i].style.position.toString().toLowerCase()==="absolute"){
				var z = (parseInt(eles[i].style.zIndex)||0);
				if (CascadeManager.maxZIndex<=z){
					CascadeManager.maxZIndex = z;
					CascadeManager.topsideElement = eles[i]; // 获得初始的最上层对象：Z轴大于或等于其他对象，并位于文档较后位置。
				}
			}
		}
		return CascadeManager.maxZIndex;
	},
	
	/**
	 * 将指定元素对象显示到最上层。
	 * @param {HTMLElement} elem Element, 被指定的元素对象。
	 */
	setTopside : function(elem){
		if (CascadeManager.topsideElement===elem) return;
		elem.style.zIndex = CascadeManager.maxZIndex;
		document.body.appendChild(elem);
		if (CascadeManager.topsideElement && CascadeManager.topsideElement.uonblur) // 当为元素（自）定义失去焦点(onlostfocus)的事件时，执行此事件。
			CascadeManager.topsideElement.uonblur();
		CascadeManager.topsideElement = elem;
	}
};
//Event.addEventListener(window, "load", Function.createDelegate(this, CascadeManager.initialize));
/*]]>*/