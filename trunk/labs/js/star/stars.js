(function(){
    $.fn.extend({
        stars:function(opt){
            var _opt = $.extend({
                disabled:false,
                dir:"ltr", // ltr, rtl, ttb, btt.
                paramName:"level",
                level:0,
                url:"",
                data:"",
                method:"",
                className:"star-on",
                onchangebefore:function(i){return true;},
                callback:function(){}
            },opt);
            var root=$(this);
            var L=$(">li",root).length+1;
            // init.
            if(_opt.dir=="ltr" || _opt.dir=="rtl"){
                $(">li",root).css("float","left");
            }
            if(_opt.disabled){disable();}
            else{enable();}
            setStar(_opt.level);

            function disable(){
                $(">li>a",root).removeAttr("href").css("cursor","default");
            }
            function enable(){
                $(">li>a",root).each(function(a,b,c){
                    var l=a+1;
                    if(_opt.dir=="rtl" || _opt.dir=="ttb"){l=L-l;}
                    $(this).attr("href",_opt.url+"?"+(_opt.data?_opt.data+"&":"")+_opt.paramName+"="+l);
                }).click(function(){return false;}).css("cursor","pointer");;
            }
            function over(e){
                if(_opt.disabled){return;}
                var i=$(">li>a",root).index(this)+1;
                setStar(i);
            }
            function out(e){
                if(_opt.disabled){return;}
                var i=$(">li>a",root).index(this)+1;
                setStar(_opt.level);
            }
            function setStar(i){
                if(_opt.disabled){return;}
                $(">li>a",root).removeClass(_opt.className);
                switch(_opt.dir){
                case "ltr": // left to right.
                case "ttb": // top to bottom.
                    $(">li>a:lt("+(i)+")",root).addClass(_opt.className);
                    break;
                case "rtl": // right to left.
                case "btt": // bottom to top.
                    if(i==1){
                        $(">li>a",root).addClass(_opt.className);
                    }else{
                        $(">li>a:gt("+(i-2)+")",root).addClass(_opt.className);
                    }
                    break;
                }
            }


            // hover.
            $(">li>a",this).hover(over,out).focus(over).blur(out).click(function(e){// action.
                if(_opt.disabled){$(this).blur();return;}
                var i=$(">li>a",root).index(this)+1;
                if(!_opt.onchangebefore.call(this,i)){return;}

                _opt.level = i;
                setStar(i);
                return;
                $.ajax({
                    method:_opt.method
                });
            });
        }
    });

})();
