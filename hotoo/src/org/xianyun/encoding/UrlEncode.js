/*<![CDATA[*/
/**
 * 
 * @namespace org.xianyun
 * @extends {Object}
 * @constructor ?!
 * @param ?!
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version ?!
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
function UrlEncode(str){
/*********qiushuiwuhen(2002-9-16)********/
var i,c,p,q,ret="",strSpecial="!\"#$%&'()*+,/:;<=>?@[\]^`{|}~%";
for(i=0;i<str.length;i++){
   if(str.charCodeAt(i)>=0x4e00){
    var p=strGB.indexOf(str.charAt(i));
    if(p>=0){
     q=p%94;
     p=(p-q)/94;
     ret+=("%"+(0xB0+p).toString(16)+"%"+(0xA1+q).toString(16)).toUpperCase();
    }
   }
   else{
    c=str.charAt(i);
    if(c==" ")
     ret+="+";
    else if(strSpecial.indexOf(c)!=-1)
     ret+="%"+str.charCodeAt(i).toString(16);
    else
     ret+=c;
   }
}
return ret;
}

/*]]>*/
