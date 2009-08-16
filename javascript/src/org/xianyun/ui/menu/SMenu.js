/*<![CDATA[*/
/** cn.hotoo.UI.menu.SMenu.js (Simple function)
 * 
 */
var currNode = null;

function showHidden(sId){
    var o = typeof(sId) == 'object' ? sId : document.getElementById(sId);
    var c = typeof(currNode) == 'object' ? currNode : document.getElementById(currNode);
    if (o.style.display == 'none'){
        hidden(c);
        show(o);
    }else{
        show(c);
        hidden(o);
    };
};
function show(o){
    o.style.display = '';
    currNode = o;
};
function hidden(o){
    o.style.display = 'none';
};
/*]]>*/