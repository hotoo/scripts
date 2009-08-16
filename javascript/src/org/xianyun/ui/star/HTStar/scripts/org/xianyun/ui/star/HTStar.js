/*<![CDATA[*/
/** HTStar.js (class)
 * @author 闲耘 (hotoo.cn@gmail.com)
 * @using com.htmlor.ajax.XmlHttpRequest (class),
 *           Prototype.Position (static object),
 *           org.xianyun.system.Browser (static object).
 * @create 2007-4-8, static horizontal.
 * @update 2007-4-9, 2007-4-10 for dynamic horizontal and dynamic vertical.
 *      2007-4-11 refactoring to HTStar.prototype.getStars();
 *      2007-4-13 refactoring for HTStar.prototype.setStar();
 *                    HTStar.prototype.show();
 * @test pass Internet Explorer 6.0, Firefox 1.0, Opera 9.0, Netscape 8.0.
 * @version finished.
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
    this.offset = 1;
    this.direction = '_'; // [static horizontal(default) : '_'], [horizontal : '-'], [vertical : '|'].
    this.className = {
        'star' : 'HTStar',
        'on' : 'HTStarOn',
        'off' : 'HTStarOff'
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
HTStar.prototype.getOffset = function(){
    return this.offset;
};
HTStar.prototype.setOffset = function(offset){
    this.offset = offset;
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
HTStar.prototype.setClassName = function(className){
    for (var c in className){
        this.className[c] = className[c];
    };
};
HTStar.prototype.setDefaultLevel = function(level){
    if (!level || this.level == level || level > this.maxLevel){return false;};
    this.level = level;
    if (HTStar.$('HTStar_'+this.name+'_1')){ // when star object on the page.
        this.setStar(level);
    };
};
HTStar.prototype.getLevel = function(){
    return this.level;
};
// change the star icon on the client.
HTStar.prototype.setStar = function(level){
    var counter = 0;//!debugger.
    for (var i = 1; i <= level; i++){
        var on = this.className.star+' '+this.className.on;
        if (HTStar.$('HTStar_'+this.name+'_'+i).className != on){
            HTStar.$('HTStar_'+this.name+'_'+i).className = on;
            counter ++; //!debugger.
        };
    };
    for (var i = level+1; i <= this.maxLevel; i++){
        var off = this.className.star+' '+this.className.off;
        if (HTStar.$('HTStar_'+this.name+'_'+i).className != off){
            HTStar.$('HTStar_'+this.name+'_'+i).className = off;
            counter++;//!debugger.
        };
    };
    //window.status += counter+',';//!debugger.
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
                    HTStar.$('HTStarBar'+ME.name).className = ME.className.star+' '+(ME.level ? ME.className.on : ME.className.off);
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
        this.floatLayer.id = 'HTStarFloatLayer';
        this.floatLayer.onclick=function(){HTStar.hidden();};
        this.floatLayer.onmouseover=function(){HTStar.show();}; // ! important, control the float layer.
        this.floatLayer.onmouseout=function(){HTStar.hidden();};
        document.body.appendChild(this.floatLayer);
        this.floatLayer.name = null;
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
    var s = '<span'+(this.maxLevel > 1 ? ' onmouseout="' + this.name + '.setStar(' + this.name+'.level);"' : '')+'>';
    for (var i = 1; i <= this.maxLevel; i++){
        var _i = (this.direction == '|' ? this.maxLevel + 1 - i : i); // vertical direction MAY order by level descending.
        s += '<'+(this.direction=='|'?'div':'span')+' id="HTStar_' + this.name + '_' + _i + '"'+
            ' class="'+this.className.star+' '+(i <= this.level ? this.className.on : this.className.off)+'"' +
            ' title="'+(this.maxLevel == 1 ? (this.level ? 'STAR ON' : 'STAR OFF') : 'Level:'+_i)+'"'+
            (this.maxLevel > 1 ? ' onmouseover="'+ this.name + '.setStar(' + _i + ');"' : '') +
            //! (this.maxLevel > 1 ? ' onmouseout="' + this.name + '.setStar(' + this.name+'.level);"' : '')+ //! Will inefficient when add this line.
            ' onclick="' + this.name + '.setLevel(' + _i + ');">&nbsp;'+(Browser.isIE?'':'&nbsp;'+(Browser.isFirefox?'':'&nbsp;&nbsp;'))+
            '</'+(this.direction=='|'?'div':'span')+'>';
    };
    return s + '</span>';
};
// for float layer, reset innerHTML and coordinate.
HTStar.prototype.show = function(){
    if (HTStar.getFloatLayer().name != this.name){
        HTStar.getFloatLayer().innerHTML = this.getStars(); // stars html string.
        HTStar.getFloatLayer().name = this.name;
    };
    var p = Position.cumulativeOffset(HTStar.$('HTStarBar'+this.name));
    var p_on = Position.cumulativeOffset(HTStar.$('HTStar_'+this.name+'_'+(this.level?this.level:1))); // star on's position.
    var p_0 = Position.cumulativeOffset(HTStar.$('HTStarFloatLayer')); // float layer's position.
    HTStar.getFloatLayer().style.left = (this.direction == '|' ? p[0]-this.offset : p[0]-(p_on[0]-p_0[0])-this.offset);
    HTStar.getFloatLayer().style.top = (this.direction == '|' ? p[1]-(p_on[1]-p_0[1])-this.offset : p[1]-this.offset);
    HTStar.show();
};
HTStar.prototype.toString = function(){
    if (!this.maxLevel){window.alert('please set the max level before.');return null;}
    if (this.direction == '|' || this.direction == '-'){
        return '<span id="HTStarBar'+this.name+'" onmouseover="'+this.name+'.show();"'+
            ' class="'+this.className.star+' ' + (this.level ?  this.className.on : this.className.off) + '">&nbsp;'+
            (Browser.isIE?'':'&nbsp;'+(Browser.isFirefox?'':'&nbsp;&nbsp;'))+'</span>';
    }else{ // this.direction == '_';
        return '<span>'+this.getStars()+'</span>';
    };
};
/*]]>*/