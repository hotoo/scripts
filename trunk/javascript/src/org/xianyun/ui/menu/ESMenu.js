/*<![CDATA[*/
/** cn.hotoo.UI.menu.ESMenu.js (class) (Encapsulation Simple Menu)
 * @description A simple treeview menu.
 * @parameter nodes, Array, the treeview's data for display.
 *             current, number, the index of nodes for current display object.
 *             isSingle, boolean, is only a node can display or not.
 * @version 1.2.0
 * @author опте (hotoo.cn)
 * @author hotoo.cn@gmail.com
 * @create 2006-7-3
 */

_package('cn.hotoo.UI.menu');

var ESMenu = cn.hotoo.UI.menu.ESMenu = function(nodes, current, isSingle){
    var box = null;
    var curr = current;
    var node = nodes;
    var isSin = isSingle == true ? true : false;
    var bars = new Array();
    this.getMenu = function(){
        box = document.createElement('div');
        //document.body.appendChild(box);
        for (var i = 0; i < node.length; i++){
            bars[i] = document.createElement('div');
            bars[i].style.cursor = 'pointer';
            bars[i].style.width = '100%';
            bars[i].style.borderBottom = '1px dotted #999999';
            bars[i].innerHTML = nodes[i][0];
            box.appendChild(bars[i]);
            bars[i].i = i;
            bars[i].child = document.createElement('div');
            bars[i].child.style.marginLeft = '20px';
            bars[i].child.style.display = 'none';
            bars[i].child.innerHTML = nodes[i][1];
            box.appendChild(bars[i].child);
            bars[i].onclick = function(){
                if (this.child.style.display == 'none'){
                    if (isSin && typeof(curr) == 'number'){
                        bars[curr].child.style.display = 'none';
                    };
                    this.child.style.display = '';
                }else{
                    if (isSin && typeof(curr) == 'number'){
                        bars[curr].child.style.display = '';
                    };
                    this.child.style.display = 'none';
                };
                curr = this.i;
            };
        };
        if (typeof(curr) == 'number' && curr <= bars.length){
            bars[curr].child.style.display = '';
        };
        return box;
    };
};
/*]]>*/