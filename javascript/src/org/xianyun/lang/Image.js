/** cn.hotoo.javascript.utils.Image.js [methods]
 * @description 图片公用方法
 * IE 6.0, firefox 1.0, Opera 8.0 通过测试
 * @using
 * @version 0.2.0
 *
 * @author 闲耘 (HoToo)
 * @author hotoo.cn@gmail.com
 *
 * @create 2006-6-15
 * @update
 *
 */

// 预下载图像
function getPreloadedImage( sSrc ){
	var img = new Image();
	img.src = sSrc;
	return img;
}

function resizepic(thispic){ // 改变图片大小
    if(thispic.width>700) thispic.width=700;
};

function bbimg(o){ // 无级缩放图片大小
    var zoom=parseInt(o.style.zoom, 10)||100;
    zoom+=event.wheelDelta/12;
    if (zoom>0) o.style.zoom=zoom+'%';
    return false;
};