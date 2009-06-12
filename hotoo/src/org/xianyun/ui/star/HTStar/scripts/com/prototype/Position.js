/** 
 * Position 对象也是常用的工具类，提供了获取元素在页面上位置的函数，Drag&Drop的效果一定常会用到 
 * 具体的应用参考 script.aculo.us 基于prototype 的实现，尤其是dragdrop.js。 
 */ 
var Position = { 

  // set to true if needed, warning: firefox performance problems 
  // NOT neeeded for page scrolling, only if draggable contained in 
  // scrollable elements 
  includeScrollOffsets: false, 

  // must be called before calling withinIncludingScrolloffset, every time the 
  // page is scrolled 
  prepare: function() { 
    this.deltaX =  window.pageXOffset 
                || document.documentElement.scrollLeft 
                || document.body.scrollLeft 
                || 0; 
    this.deltaY =  window.pageYOffset 
                || document.documentElement.scrollTop 
                || document.body.scrollTop 
                || 0; 
  }, 

  /** 
   * 当对象所处的页面有滚动条是，计算位移 
   */ 
  realOffset: function(element) { 
    var valueT = 0, valueL = 0; 
    do { 
      valueT += element.scrollTop  || 0; 
      valueL += element.scrollLeft || 0; 
      element = element.parentNode; 
    } while (element); 
    return [valueL, valueT]; 
  }, 

  /** 
   * 计算出对象在页面上的位置 
   */ 
  cumulativeOffset: function(element) { 
    var valueT = 0, valueL = 0; 
    do { 
      valueT += element.offsetTop  || 0; 
      valueL += element.offsetLeft || 0; 
      element = element.offsetParent; 
    } while (element); 
    return [valueL, valueT]; 
  }, 

  // caches x/y coordinate pair to use with overlap 
  /** 
   * 判断一个坐标是否在指定元素的空间范围中 
   * 比如你想判断鼠标点击点的坐标是否在某个层或窗口 
   */ 
  within: function(element, x, y) { 
    if (this.includeScrollOffsets) 
      return this.withinIncludingScrolloffsets(element, x, y); 
    this.xcomp = x; 
    this.ycomp = y; 
    this.offset = this.cumulativeOffset(element); 

    return (y >= this.offset[1] && 
            y <  this.offset[1] + element.offsetHeight && 
            x >= this.offset[0] && 
            x <  this.offset[0] + element.offsetWidth); 
  }, 

  withinIncludingScrolloffsets: function(element, x, y) { 
    var offsetcache = this.realOffset(element); 

    this.xcomp = x + offsetcache[0] - this.deltaX; 
    this.ycomp = y + offsetcache[1] - this.deltaY; 
    this.offset = this.cumulativeOffset(element); 

    return (this.ycomp >= this.offset[1] && 
            this.ycomp <  this.offset[1] + element.offsetHeight && 
            this.xcomp >= this.offset[0] && 
            this.xcomp <  this.offset[0] + element.offsetWidth); 
  }, 

  // within must be called directly before 
  /** 
   * 调用该方法时，确保首先调用了within方法 
   * 如果x,y坐标位于element的空间范围中，那么返回一个小于1的标示位置的值，比如0.5标示该坐标位于element空间的中线上 
   */ 
  overlap: function(mode, element) {  
    if (!mode) return 0;  
    if (mode == 'vertical') 
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) / 
        element.offsetHeight; 
    if (mode == 'horizontal') 
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) / 
        element.offsetWidth; 
  }, 

  /** 
   * 复制源对象的空间数据到目的对象。 
   * 常用的地方：拖缀一个层到新地方时，常常动态构造和该层同样大小的虚层。 
   */ 
  clone: function(source, target) { 
    source = $(source); 
    target = $(target); 
    target.style.position = 'absolute'; 
    var offsets = this.cumulativeOffset(source); 
    target.style.top    = offsets[1] + 'px'; 
    target.style.left   = offsets[0] + 'px'; 
    target.style.width  = source.offsetWidth + 'px'; 
    target.style.height = source.offsetHeight + 'px'; 
  } 
} 