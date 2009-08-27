/**
 * 图片等比例缩放
 * @param {Image} image object, or image element.
 * @param {Number} w image max width.
 * @param {Number} h image max height.
 */
function imgResize(i,w,h){
    var image=new Image();
    image.src=i.src;
    if(image.width>0 && image.height>0){
        if(image.width/image.height>= w/h){
            if(image.width>w){
                i.width=w;
                i.height=(image.height*w)/image.width;
            }else{
                i.width=image.width;
                i.height=image.height;
            }
        } else{
            if(image.height>h){
                i.height=h;
                i.width=(image.width*h)/image.height;
            }else{
                i.width=image.width;
                i.height=image.height;
            }
        }
    }
}
