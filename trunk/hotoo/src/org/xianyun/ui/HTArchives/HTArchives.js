/*<![CDATA[*/
/** 
 * @class HTArchives.js
 * @version 1.0.0
 * @create 2007/07/25
 * @update 
 * @author 闲耘 (hotoo.cn[AT]gmail.com)
 */

/**HTArchivesDatas (class)
 * data for HTArchives
 * @param title
 * @param url
 * @param labels
 * @param description, default same the title
 */
var HTArchivesDatas = function(title, url, labels, date, description){
    return {"title":title, "url":url, "labels":labels, "date":date, "description":description};
};

/**HTArchives (class)
 * @param vname, String, variable name of reference this object.
 * @param datas, 
 */
var HTArchives = function(vname, datas){
    this.name = vname;
    this.data = datas;
    this.SORT_MODE = "BY_DATE"; // BY_DATE, BY_LABEL, BY_TITLE
    this.singleton = true; // just show one more every time.
    //this.watch("singleton", function(property, oldval, newval){
    //    alert(this.name);
    //});
    this.currentArchiveIndex = -1;
};
HTArchives.$ = function(id){
    return document.getElementById(id);
};
HTArchives.prototype.sort = function(mode){
    this.SORT_MODE = mode;
    return this.toString();
};
HTArchives.prototype.toString = function(){
    var s = "";
    for (var i=0; i<this.data.length; i++){
        s += "<div class='HTArchivesListItem'>"+
            "<div id='HTArchives_"+this.name+"_less_"+i+"'>"+this.getLessString(i)+"</div>"+
            "<div id='HTArchives_"+this.name+"_more_"+i+"' style='display:none;'>"+this.getMoreString(i)+"</div>"+
            "</div>";
    }
    return s;
};
HTArchives.prototype.getMoreString = function(index){
    return '<div class="HTArchivesBox">'+
    '<div class="HTArchivesX1 HTArchiverBoxBorder">&nbsp;</div>'+
    '<div class="HTArchivesX2 HTArchiverBoxBorder">&nbsp;</div>'+
    '<div class="HTArchivesX3 HTArchiverBoxBorder">&nbsp;</div>'+
    '<div class="HTArchivesX4 HTArchiverBoxBorder">&nbsp;</div>'+
    '<div class="HTArchiverBoxTitle" onclick="'+this.name+'.showLess('+index+');"><table width="98%"><tr><td><div class="HTArchiverBoxTitle">'+this.data[index].title+'</div></td><td width="1em"><div class="HTArchivesBar" onclick="'+this.name+'.showLess('+index+');" title="Less">«</div></td></tr></table></div>'+
    '<div class="HTArchiverBoxBody">'+this.data[index].description+'</div>'+
    '<div class="HTArchiverBoxFoot">'+unescape(this.data[index].labels)+' &nbsp; '+this.data[index].date+'</div>'+
    '<div class="HTArchivesX4 HTArchiverBoxBorder">&nbsp;</div>'+
    '<div class="HTArchivesX3 HTArchiverBoxBorder">&nbsp;</div>'+
    '<div class="HTArchivesX2 HTArchiverBoxBorder">&nbsp;</div>'+
    '<div class="HTArchivesX1 HTArchiverBoxBorder">&nbsp;</div>'+
    '</div>';
};
HTArchives.prototype.getLessString = function(index){
    return '<div class="HTArchivesBox" onclick="'+this.name+'.showMore('+index+');">'+
    '<div class="HTArchivesX1 HTArchiverLessBoxBorder">&nbsp;</div>'+
    '<div class="HTArchivesX2 HTArchiverLessBoxBorder">&nbsp;</div>'+
    '<div class="HTArchivesX3 HTArchiverLessBoxBorder">&nbsp;</div>'+
    '<div class="HTArchivesX4 HTArchiverLessBoxBorder">&nbsp;</div>'+
    '<div class="HTArchiverLessBoxTitle"><table width="98%"><tr><td><div style="width:100%;height:3em;color:#008000;overflow:hidden;text-overflow:ellipsis;">'+
        '<span>'+this.data[index].labels+'</span>'+
        '<span class="HTArchiverLessBoxTitle">'+this.data[index].title+'</span>'+
        '<span class="HTArchivesLessDesc"> - '+this.data[index].description.toPlainText()+'</span></div></td>'+
        '<td width="1em"><div class="HTArchivesBar" onclick="'+this.name+'.showMore('+index+');" title="More...">»</div></td></tr></table></div>'+
    '<div class="HTArchivesX4 HTArchiverLessBoxBorder">&nbsp;</div>'+
    '<div class="HTArchivesX3 HTArchiverLessBoxBorder">&nbsp;</div>'+
    '<div class="HTArchivesX2 HTArchiverLessBoxBorder">&nbsp;</div>'+
    '<div class="HTArchivesX1 HTArchiverLessBoxBorder">&nbsp;</div>'+
    '</div>';
};
HTArchives.prototype.showMore = function(index){
    var e=window.event;
    var t=e.srcElement||e.target;
    if (t.tagName=="A"){
        return false;
    }
    if (this.singleton && this.currentArchiveIndex!=-1){
        this.showLess(this.currentArchiveIndex);
    }
    index = index<0?this.data.length-1:index>=this.data.length?0:index;
    HTArchives.$("HTArchives_"+this.name+"_less_"+index).style.display = "none";
    HTArchives.$("HTArchives_"+this.name+"_more_"+index).style.display = "";
    this.currentArchiveIndex = index;
};
HTArchives.prototype.showLess = function(index){
    var e=window.event;
    var t=e.srcElement||e.target;
    if (t.tagName=="A"){
        return false;
    }
    HTArchives.$("HTArchives_"+this.name+"_more_"+index).style.display = "none";
    HTArchives.$("HTArchives_"+this.name+"_less_"+index).style.display = "";
};
HTArchives.prototype.previous = function(){
    this.showMore(this.currentArchiveIndex-1);
};
HTArchives.prototype.next = function(){
    this.showMore(this.currentArchiveIndex+1);
};
HTArchives.prototype.valueOf = function(){
    return this.toString();
};
HTArchives.DATAS = new Array();
HTArchives.init = function(){
    var arcs = document.getElementsByTagName("ul");
    for (var a=0; a<arcs.length; a++){
        if (arcs[a].className=="HTArchives"){
            var datas = arcs[a].getElementsByTagName("li");
            var _ds = new Array();
            for (var d=0; d<datas.length; d++){
                _ds.push({title:datas[d].getAttribute("title"),
                    url:datas[d].getAttribute("url"),
                    labels:datas[d].getAttribute("labels"),
                    date:datas[d].getAttribute("date"),
                    description:datas[d].innerHTML});
            }
            HTArchives.DATAS[a] = new HTArchives("HTArchives.DATAS["+a+"]", _ds);

            var node = document.createElement("div");
            arcs[a].parentNode.insertBefore(node, arcs[a]);

            node.innerHTML = HTArchives.DATAS[a].toString();
            arcs[a].style.display = "none";
            //arcs[a].parentNode.innerHTML = HTArchives.DATAS[a].toString();
        }
    }
};
/*]]>*/