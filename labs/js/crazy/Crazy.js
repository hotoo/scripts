/**
 * @overview {class} Crazy - Performance Test Framework.
 * @param {Array<Function>} function list.
 * @param {Array} arguments for execute function item.
 * @param {Number} times loop execute function item times.
 * @param {Function} callback execute when all performance test complete.
 * @author 闲耘(mail[AT]xianyun.org)
 * @version 1.3 2009/08/23
 */
var Crazy=function(funs, args, times, callback){
    this.funs=funs;
    this._func=null; //functions copy for runtime.
    this.args=args;
    this.times=times||10000;
    this._result=null;
    this._results=[];
    this.callback=callback;
    this.out = null;
    this._refback = Function.createDelegate(this, this._testback);
    this.counter = 0;
};
Crazy.prototype.test=function(){
	if(!this.funs || this.funs.length===0){return;}
    this._result=[];
    this._func = this.funs.concat();
    this._test(this._func.shift());
    this.counter++;
};
Crazy.prototype._test=function(f){
    var d = new Date(), n=funame(f);
    for (var t=0; t<this.times; t++){
        f.apply(f, this.args);
    }
    d = new Date()-d;
    this._result[this._result.length]=[n, d];
    this._results[this._results.length]=[n, d];
    window.setTimeout(this._refback, 100);
};
Crazy.prototype._testback=function(){
    if(this._func.length){
        this._test(this._func.shift());
    }else{
        this.print(this._result);
        if(this.callback){this.callback();}
        this._result.length=0; this._result=null;
    }
};
Crazy.prototype.print=function(result){
    var s="", max=result[0][1], min=result[0][1], FAST=85;
    for (var i=1,l=result.length; i<l; i++){
        if(result[i][1]>max){max=result[i][1];}
        if(result[i][1]<min){min=result[i][1];}
    }
    s=['<table class="result">',
        '<caption><code>',result[0][0],'(<i>',this.args.toSrc().join("</i>, <i>"),'</i>){',this.times,'}; ...</code></caption>',
        '<thead><tr>',
            '<th width="260">Function Name</th>',
            '<th width="200">Time(Rate)</th>',
            '<th width="200">Performance</th>',
        '</tr></thead>','<tbody>'];
    for (i=0,l=result.length; i<l; i++){
        var r=(100*result[i][1]/max).toFixed(2),
            p=(100*min/result[i][1]).toFixed(2);
        s.push('<tr>',
            '<td>',(p>=FAST?'<span style="color:#FF7D29;">':""),result[i][0],(p>=FAST?"<span>":""),'</td>',
            '<td><div class="rate"><div style="width:',r,'%;"></div><cite>',result[i][1],'ms (',r,'%)</cite></div></td>',
            '<td><div class="perf',(p==100?" perf-best":(p>=FAST?" perf-fast":"")),
                '"><div style="width:',p,'%;"></div><cite>',p,'%</cite></div></td>',
            '</tr>');
    }
    s.push('</tbody>','</table>');
    var o=document.createElement("div");
    o.innerHTML = s.join("");
    this.out.appendChild(o);
};
Crazy.prototype.average = function(){
    var a=[], k, m=this.funs.length;
    for(var i=0,l=this._results.length; i<l; i++){
        k=i%m;
        if(!a[k]){a[k] = [this._results[i][0], this._results[i][1]];}
        else{a[k][1] += this._results[i][1];}
    }
    this.print(a);
};
