/** cn.hotoo.UI.image.HTImage.js (class)
 * @description 集成了大多对图片的基本操作
 *   例如自动限制图片的宽度和高度
 *   滚动滑轮改变图片缩放比例
 *   单击后在新窗口显示图片
 *   重新设置图片路径后，也能够自动适应宽高限制
 * @create 2006-7-3
 * @update 2006-7-24
 */

_package('cn.hotoo.UI.image');

var HTImage = cn.hotoo.UI.image.HTImage = function(src, width, height, isWheel){
    var img = null;
    
    this.getImage = function(){
        return img;
    };
    this.setSrc = function(src){
        img.setAttribute('src', src);
    };
    var init = function(){
        img = document.createElement('img');
        img.setAttribute('src', src);
        img.setAttribute('border', 0);
        img.onclick = function(){
            window.open(img.getAttribute('src'));
        };
        img.onmousewheel = function(){
            if (! isWheel){return;};
            var zoom = parseInt(img.style.zoom, 10) || 100;
            zoom += event.wheelDelta / 12;
            if (zoom > 0){
                img.style.zoom = zoom + '%';
            };
        };
        img.onload = function(){
            img.removeAttribute('width');
            img.removeAttribute('height');
            if (width != null && img.width > width){
                //var proportion = width / parseInt(img.width);
                img.setAttribute('width' , width);
                //img.setAttribute('height' , parseInt(img.height) * proportion);
            };
            img.removeAttribute('width');
            img.removeAttribute('height');
            if (height != null && img.height > height){
                img.setAttribute('height', height);
            };
        };/*
        img.onreadystatechange = function(){
            if(img.readyState == 'complete'){
                img.removeAttribute('width');
                img.removeAttribute('height');
            };
        };*/
    };

    init();
};