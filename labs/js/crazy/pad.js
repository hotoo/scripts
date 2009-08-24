function pad(num, n) {
    var i = (num + "").length;
    while(i++ < n) num = "0" + num;
    return num;
}

function pad2(num, n) {
    if ((num + "").length >= n) return num;
    return pad2("0" + num, n);
}

function pad3(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}

function pad4(num,n){
    var s=""+num, l=s.length;
    return l>=n?s:new Array(n-l+1).join("0")+s;
}

var _PAD="00000000000000000000000000000000000000000000000000";
function pad5(num, n){
    var s=""+num, l=s.length;
    return l>=n?s:_PAD.slice(0,n-l)+s;
}

function pad6(num, n){
    var s=""+num, l=s.length;
    return l>=n?s:_PAD.substr(0,n-l)+s;
}

var _ARR_PAD=[];
for(var i=1; i<_PAD.length; i++){
    _ARR_PAD[i]=_PAD.substr(0,i);
}
function pad7(num, n){
    var s=""+num, l=s.length;
    return l>=n?s:_ARR_PAD[n-l]+s;
}

function pad8(num,n){
    return (""+num.length>=n)?num:pad8("0"+num,n);
}

function pad9(num, n){
    return (""+num).length>=n?num:pad9("0"+num,n);
    //if(l>=n){return s;}
    //return n-l==1?"0"+num:pad9("0"+num, n);
}

function crazyIt(){
    var fs=[pad, pad3, pad5, pad6, pad7];
    return [{funs:fs, args:[12, 9], times:5000},
           {funs:fs, args:[123456789,3], times:5000}];
}

