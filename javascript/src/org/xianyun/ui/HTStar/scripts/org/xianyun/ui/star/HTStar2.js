/*<![CDATA[*/
/** HTStar2.js (class), for control icon's property of src.
 * @author 闲耘 (hotoo.cn@gmail.com)
 * @using com.htmlor.ajax.XmlHttpRequest (class),
 *           Prototype.Position (static object).
 * @create 2007-4-14, some changes from HTStar.js
 * @update 
 * @test pass Internet Explorer 6.0, Firefox 1.0, Opera 9.0, Netscape 8.0.
 * @version beta.
 */
// construction, the name is a string same a variable which reference to this object.
// eg : star_1 = new HTStar('star_1');
var HTStar = function(name){
    // [ private ].
    this.name = name;
    this.maxLevel = null;
    this.level = 0;
    this.action = null;
    this.method = 'post';
    this.paras = null;
    this.xmlhttp = null;
    this.callback = null;
    this.direction = '_'; // [static horizontal(default) : '_'], [horizontal : '-'], [vertical : '|'].
    this.icon = {
        'on' : 'icon/HTStar_On.gif',
        'off' : 'icon/HTStar_Off.gif'
    };
};
// [ public ].
HTStar.$ = function(s){
    return document.getElementById(s);
};
// eg : star.setAction('setStar.asp');
HTStar.prototype.setAction = function(action){
    this.action = action;
};
// default method is 'post'.
// eg : star.setMethod('Post');
HTStar.prototype.setMethod = function(method){
    this.method = /^post$/i.test(method) ? 'post' : 'get';
    return this.method;
};
// eg : star.setParas({'id' : 1, 'level' : '%LEVEL%'});
// %LEVEL% 's value will replace to the level, user's choice.
HTStar.prototype.setParas = function(paras){
    this.paras = paras;
};
// MUST, the count of star.
// eg : star.setMaxLevel(5);
HTStar.prototype.setMaxLevel = function(level){
    this.maxLevel = level;
};
HTStar.prototype.setCallback = function(handle){
    this.callback = handle;
};
HTStar.prototype.setDirection = function(direction){
    switch (direction){
    case '|' : // dynamic vertical.
    case 'vertical' :
        this.direction = '|';
        break;
    case 'horizontal' : // dynamic horizontal.
    case '-' :
        this.direction = '-';
        break;
    default : // static horizontal.
        this.direction = '_';
        break;
    };
};
// OPTIONAL, change style when need different star icon.
// eg : star.setClassName({'on' : 'HTStarOn_2', 'off' : 'HTStarOff_2'});
HTStar.prototype.setIcons = function(icon){
    for (var c in icon){
        this.icon[c] = icon[c];
    };
};
HTStar.prototype.setDefaultLevel = function(level){
    if (!level || this.level == level || level > this.maxLevel){return false;};
    this.level = level;
    if (HTStar.$('HTStar_'+this.name+'_1')){
        this.setStar(level);
    };
};
HTStar.prototype.getLevel = function(){
    return this.level;
};
// change the star icon on the client.
HTStar.prototype.setStar = function(level){
    for (var i = 1; i <= level; i++){
        if (HTStar.$('HTStar_'+this.name+'_'+i).src != this.icon.on){
            HTStar.$('HTStar_'+this.name+'_'+i).src = this.icon.on;
        };
    };
    for (var i = level+1; i <= this.maxLevel; i++){
        if (HTStar.$('HTStar_'+this.name+'_'+i).src != this.icon.off){
            HTStar.$('HTStar_'+this.name+'_'+i).src = this.icon.off;
        };
    };
    if (this.maxLevel == 1){ // change title at runtime.
        HTStar.$('HTStar_'+this.name+'_1').title = (this.level ? 'STAR ON' : 'STAR OFF');
    };
};
// update star value to the server.
HTStar.prototype.setLevel = function(level){
    if(!this.paras){window.alert("no paras.");return false;};
    if(!this.action){window.alert("nuknow action.");return false;};
    if (this.maxLevel > 1 && this.level == level){return false;}; //! remove this line when need.
    var ME = this;
    var parastr = '';
    level = (this.maxLevel == 1 && this.level == 1 ? 0 : level);
    for(var key in this.paras){
        parastr += key + '=' + this.paras[key] + '&';
    };
    parastr = parastr.replace('%LEVEL%', level);
    var urlstr = (this.method == 'post' ? this.action : (this.action + '?' + parastr));
    var data = (this.method == 'post' ? parastr : null);
    if(this.xmlhttp == null){
        this.xmlhttp = new XmlHttpRequest();
    };
    this.xmlhttp.send(urlstr, this.method, data, function(status, req){
        if (status == 'ok'){
            if (req.responseText == 'success'){
                ME.level = level;
                ME.setStar(level);
                if (ME.direction == '|' || ME.direction == '-'){ // for float layer.
                    //HTStar.$('HTStarBar'+ME.name).innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;'+level;
                    HTStar.$('HTStarBar'+ME.name).src = (ME.level ? ME.icon.on : ME.icon.off);
                };
            }else{
                window.alert(req.responseText);
            };
        }else if (status == 'ex'){
             window.alert('error from the server.');
        };
        if (typeof(ME.callback) == 'function'){
            ME.callback(status, req);
        };
    });
};
HTStar.floatLayer = null;
HTStar.getFloatLayer = function(){
    if (!this.floatLayer){
        this.floatLayer = document.createElement('div');
        this.floatLayer.className = 'HTStarFloatLayer';
        this.floatLayer.onclick=function(){HTStar.hidden();};
        this.floatLayer.onmouseover=function(){HTStar.show();}; // ! important, control the float layer.
        this.floatLayer.onmouseout=function(){HTStar.hidden();};
        document.body.appendChild(this.floatLayer);
    };
    return this.floatLayer;
};
HTStar.show = function(){
    this.getFloatLayer().style.visibility='visible';
};
HTStar.hidden = function(){
    this.getFloatLayer().style.visibility='hidden';
};
// common method for return stars string.
HTStar.prototype.getStars = function(){
    var s = '<span '+(this.maxLevel > 1 ? ' onmouseout="' + this.name + '.setStar(' + this.name+'.level);"' : '')+'>';
    for (var i = 1; i <= this.maxLevel; i++){
        var _i = (this.direction == '|' ? this.maxLevel + 1 - i : i); // vertical direction MAY order by level descending.
        s += '<'+(this.direction=='|'?'div':'span')+'><img style="cursor:pointer;" id="HTStar_' + this.name + '_' + _i + '"'+
            ' src="'+(i <= this.level ? this.icon.on : this.icon.off)+'"' +
            ' title="'+(this.maxLevel == 1 ? (this.level ? 'STAR ON' : 'STAR OFF') : 'Level:'+_i)+'"'+
            (this.maxLevel > 1 ? ' onmouseover="'+ this.name + '.setStar(' + _i + ');"' : '') +
            //! (this.maxLevel > 1 ? ' onmouseout="' + this.name + '.setStar(' + this.name+'.level);"' : '')+
            ' onclick="' + this.name + '.setLevel(' + _i + ');" />'+
            '</'+(this.direction=='|'?'div':'span')+'>';
    };
    return s + '</span>';
};
// for float layer, reset innerHTML and coordinate.
HTStar.prototype.show = function(){
    var stars = this.getStars(); // stars html string.
    if (HTStar.getFloatLayer().innerHTML != stars){
        HTStar.getFloatLayer().innerHTML = stars;
    };
    var p = Position.cumulativeOffset(HTStar.$('HTStarBar'+this.name));
    HTStar.getFloatLayer().style.left = (this.direction == '|' ? p[0]-3 : p[0]-((this.level?this.level:1)-1)*(16+1)); // padding:3px; font-size:16px;
    HTStar.getFloatLayer().style.top = (this.direction == '|' ? p[1]-(this.maxLevel-(this.level?this.level:1))*(16+1) : p[1]-3);
    //! window.alert(HTStar.$('HTStarBar'+this.name).style.fontSize); // can not get the styles while define at external file at runtime, otherwise, we can automatic set this value equal fontsize + 1.
    HTStar.show();
};
HTStar.prototype.toString = function(){
    if (!this.maxLevel){window.alert('please set the max level before.');return null;}
    if (this.direction == '|' || this.direction == '-'){
        return '<span><img style="cursor:pointer;" id="HTStarBar'+this.name+'" onmouseover="'+this.name+'.show();"'+
            ' src="' + (this.level ?  this.icon.on : this.icon.off) + '" /></span>';
    }else{
        return '<span>'+this.getStars()+'</span>';
    };
};
/*]]>*/