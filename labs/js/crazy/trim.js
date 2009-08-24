
String.prototype.trim = function(){
    return this.replace(/(^\s+)(\s+$)/g, '');
};

String.prototype.trim = function(){
    return this.replace(/(?:^\s+)(?:\s+$)/g, '');
};

String.prototype.lTrim = function(){
    return this.replace(/^\s+/, '');
};
String.prototype.rTrim = function(){
    return this.replace(/\s+$/, '');
};
String.prototype.trim = function(){
    return this.lTrim().rTrim();
};

String.prototype.trim = function(){
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
};

String.prototype.trim = function(){
    return this.replace(/^\s*(.*?)\s*$/, "$1"); // 两端空白字符贪婪匹配，中间字符非贪婪匹配。
};

String.prototype.trim = function(){
    return this.replace(/^\s*((?:.\n)*?)\s*$/, "$1");
};

String.prototype.trim = function(){
    var l=this.length;
    var m=/^[\s]*/.test(this);
    // /(?=[^\s])/.test(this);// -- never-online
    var s = RegExp.lastIndex;
    if(1==s && !Char.isBlank(this.charAt(0)))s=0;
    if(s==l){return '';}
    // /\s*$/.test(this);
    // var e=RegExp.index;
    var e=$lastIndexOf(function(c){return !Char.isBlank(c);});
    e=-1==e?l:e+1;
    return this.substring(s,e);
};

String.prototype.trim = function(){
    var f=function(c){return !Char.isBlank(c);};
    var l=this.length, s=this.$indexOf(f), e=this.$lastIndexOf(f);
    if(-1==s)s=0;
    e= -1==e?l:e+1;
    return this.substring(s, e);
};

String.prototype.trim = function(){
    var s = this.replace(/^\s+/, '');
    var l=s.length, e=l;
    if(0===l){return '';}
    for(var i=l-1; i>=0; i--){
        if(!Char.isBlank(s.charAt(i))){
            e=i+1;
            break;
        }
    }
    return this.substring(0,e);
};



String.prototype.$indexOf = function(f){
    for(var i=0,c,l=this.length; i=0; i--){
        c=this.charAt(i);
        if(f(c)){return i;}
    }
    return -1;
};
String.prototype.$lastIndexOf = function(f){
    for(var i=this.length-1,c; i>=0; i--){
        c=this.charAt(i);
        if(f(c)){return i;}
    }
    return -1;
};
var Char = {
    isBlank:function(c){
        //return /\s/.test(c);
        return ' '==c || '\t'==c || '\r\n'==c || '\n'==c || '\r'==c;
    }
};

