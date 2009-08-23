
function repeat(s,i){
	return new Array(1+(i||0)).join(s);
}
function repeat2(s,i){
	var t=[];
    for(; i>0; i--){t[t.length]=s;}
    return t.join("");
}
function repeat3(s,i){
	var t="";
    for(; i>0; i--){t+=s;}
    return t;
}


function crazyIt(){
    var c=new Crazy();
    c.funs=[repeat, repeat2, repeat3];
    c.args=["0", 3];
    c.timer=100000;
    c.test();
}


