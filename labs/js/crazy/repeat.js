/**
 * 把字符串s重复i次。
 * @param {String} s 被重复的字符串。
 * @param {Number} i 重复的次数。
 * @return {String} 返回重复后得到的新字符串。
 */
function repeat_new_arr_join(s,i){
	return new Array(1+(i||0)).join(s);
}
function repeat_for_minus_arr_join(s,i){
	var t=[];
    for(; i>0; i--){t[t.length]=s;}
    return t.join("");
}
function repeat_for_minus_str_append(s,i){
	var t="";
    for(; i>0; i--){t+=s;}
    return t;
}
function repeat_for_plus_arr_join(s,i){
    var t=[];
    for(var k=0; k<i; k++){ t[k]=s;}
    return t.join("");
}
function repeat_for_plus_str_append(s,i){
    var t="";
    for(var k=0; k<i; k++){t+=s;}
    return s;
}
function repeat_while_minus_arr_join(s,i){
    var t=[];
    while(i-- > 0){t[t.length]=s;}
    return t.join("");
}
function repeat_while_minus_str_append(s,i){
    var t="";
    while(i-- > 0){t+=s;}
    return t;
}
function repeat_while_plus_arr_join(s,i){
    var t=[], k=0;
    while(k++ < i){t[k]=s;}
    return t.join("");
}
function repeat_while_plus_str_append(s,i){
    var t="", k=0;
    while(k++ < i){t+=s;}
    return t;
}
function repeat_recursion_callee(s,i){
    var r=arguments[2]||"";
    return i?arguments.callee(s,i-1,r+s):r;
}
function repeat_recursion_name(s,i){
    var r=arguments[2]||"";
    return i?repeat_recursion_name(s,i-1,r+s):r;
}




function crazyIt(){
    var fs=[repeat_new_arr_join, repeat_for_minus_arr_join, repeat_for_minus_str_append,
        repeat_for_plus_arr_join, repeat_for_plus_str_append, repeat_while_minus_arr_join,
        repeat_while_minus_str_append, repeat_while_plus_arr_join, repeat_while_plus_str_append,
        repeat_recursion_callee, repeat_recursion_name];

    return [{funs:fs, args:["0", 30], times:10000},
        {funs:fs, args:["0123456789",1000], times:1000}];
}


