(function(){
    // goto WikiWord Input
    var gotoBox = $('<div id="goto-box"><input type="text" id="gotokey" /></div>').appendTo("body");
    var statusBar = $('<div id="status-bar"><input type="text" id="status-line" /></div>').appendTo("body");

    // 'g' mode for gf, gg, gt...
    var mode = {
        normal:"normal",
        search:"search",
        command:"command",

        g:"g",
        Goto:"Goto"
    };
    mode.curr = mode.normal;

    $("body").keypress(function(evt){
        window.status = (evt.keyCode)
        switch(evt.keyCode){
        case 27: // <Esc>
            if(mode.curr == mode.Goto){
                hideGotobox();
            }else if(mode.curr == mode.search){
                statusBar.hide();
            }else if(mode.curr == mode.command){
                statusBar.hide();
            }else if(mode.curr == mode.g){
            }
            mode.curr = mode.normal;
            break;
        case 47: // '/'
            if(mode.curr == mode.normal){
                statusBar.show();
                statusBar.find("input").val("").focus();
                mode.curr = mode.search;
            }
            break;
        case 58: // ':'
            if(mode.curr == mode.normal){
                statusBar.show();
                statusBar.find("input").val("").focus();
                mode.curr = mode.command;
            }
            break;
        case 71: // 'G'
            if(mode.curr == mode.normal){
                gotoBottom();
                return false;
            }
            break;
        case 103: // 'g'
            if(mode.curr == mode.normal){
                mode.curr = mode.g;
                return false;
            }else if(mode.curr == mode.g){
                gotoTop();
                mode.curr  = mode.normal;
            }
            break;
        case 106: // 'j'
            if(mode.curr == mode.normal){
                jumpDown("line");
            }
            break;
        case 107: // 'k'
            if(mode.curr == mode.normal){
                jumpUp("line");
            }
            break;
        case 116: // 't'
            if(mode.curr == mode.g){
                showGotobox();
                mode.curr = mode.Goto;
            }
            break;
        default:
            break;
        }
    });


    function gotoTop(){
        window.scrollTo(0, 0);
    }
    function gotoBottom(){
        window.scrollTo(0, document.body.clientHeight);
    }
    function jumpDown(st){
        window.scrollBy(0, 16);
    }
    function jumpUp(st){
        window.scrollBy(0, -16);
    }
    function showGotobox(){
        gotoBox.show();
        gotoBox.find("input").val("").focus();
        return false;
    }
    function hideGotobox(){
        gotoBox.hide();
    }
})();
