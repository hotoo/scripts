/**
 * @param 
 * @author 闲耘(mail[AT]xianyun.org)
 */
var Crazy=function(funs,args,time){
    this.funs=funs;
    this.args=args;
    this.times=time||10000;
    this._result=[];
};
Crazy.prototype.test=function(){
	if(!this.funs || this.funs.length==0){return;}
	//for (var i=0,l=Crazy.funs.length; i<l; i++){
        this._test1(this.funs.shift());
	//}
};
Crazy.prototype._test1=function(f){
    var d = new Date();
    for (var t=0; t<this.times; t++){
        f.apply(f, this.args);
    }
    d = new Date()-d;
    var n=funame(f),ME=this;
    this._result[this._result.length]=[n,d];
    window.setTimeout(function(){
        if(ME.funs.length){
            ME._test1(ME.funs.shift());
        }else{
            ME.print();
        }
    }, 100);
};
Crazy.prototype.print=function(){
    var s="", max=this._result[0][1];
    for (var i=0,l=this._result.length; i<l; i++){
        if(this._result[i][1]>max){
            max=this._result[i][1];
        }
    }
    s=['<table class="result">','<thead><tr>',
        '<th width="200">Function Name</th>','<th width="100">Timer</th>',
        '<th width="200">Rate</th>','</tr></thead>','<tbody>'];
    for (i=0,l=this._result.length; i<l; i++){
        var r=(this._result[i][1]/max*100).toFixed(2);
        s.push('<tr>',
            '<td><strong>',this._result[i][0],'</strong></td>',
            '<td>',this._result[i][1],'</td>',
            '<td><div class="rate"><div style="width:',r,'%;"></div><cite>',r,'</cite></div></td>',
            '</tr>');
    }
    s.push('</tbody>','</table>');
    var o=document.createElement("div");
    document.body.appendChild(o);
    o.innerHTML = s.join("");
};

