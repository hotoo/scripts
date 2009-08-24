/**
 * @overview {class} Crazy - Performance Test Framework.
 * @param {Array<Function>} function list.
 * @param {Array} arguments for execute function item.
 * @param {Number} times loop execute function item times.
 * @param {Function} callback execute when all performance test complete.
 * @author 闲耘(mail[AT]xianyun.org)
 * @version 1.2 2009/08/23
 */
var Crazy=function(funs, args, times, callback){
    this.funs=funs;
    this._func=null; //function copy.
    this.args=args;
    this.times=times||10000;
    this._result=[];
    this.callback=callback;
};
Crazy.prototype.test=function(){
	if(!this.funs || this.funs.length==0){return;}
    this._func = this.funs.concat();
    this._test1(this._func.shift());
};
Crazy.prototype._test1=function(f){
    var d = new Date();
    for (var t=0; t<this.times; t++){
        f.apply(f, this.args);
    }
    d = new Date()-d;
    var n=funame(f), ME=this;
    this._result[this._result.length]=[n,d];
    window.setTimeout(function(){
        if(ME._func.length){
            ME._test1(ME._func.shift());
        }else{
            ME.print();
            if(ME.callback){ME.callback();}
        }
    }, 100);
};
Crazy.prototype.print=function(){
    var s="", max=this._result[0][1], min=this._result[0][1], FAST=85;
    for (var i=1,l=this._result.length; i<l; i++){
        if(this._result[i][1]>max){max=this._result[i][1];}
        if(this._result[i][1]<min){min=this._result[i][1];}
    }
    s=['<table class="result">','<caption><code>',this._result[0][0],'(<i>',this.args.join("</i>, <i>"),'</i>); ...</code></caption>','<thead><tr>',
        '<th width="260">Function Name</th>',
        '<th width="200">Time(Rate)</th>','<th width="200">Performance</th>','</tr></thead>','<tbody>'];
    for (i=0,l=this._result.length; i<l; i++){
        var r=(100*this._result[i][1]/max).toFixed(2),
            p=(100*min/this._result[i][1]).toFixed(2);
        s.push('<tr>',
            '<td>',(p>=FAST?'<span style="color:#FF7D29;">':""),this._result[i][0],(p>=FAST?"<span>":""),'</td>',
            '<td><div class="rate"><div style="width:',r,'%;"></div><cite>',this._result[i][1],'ms (',r,'%)</cite></div></td>',
            '<td><div class="perf',(p==100?" perf-best":(p>=FAST?" perf-fast":"")),'"><div style="width:',p,'%;"></div><cite>',p,'%</cite></div></td>',
            '</tr>');
    }
    s.push('</tbody>','</table>');
    var o=document.createElement("div");
    document.body.appendChild(o);
    o.innerHTML = s.join("");
};

