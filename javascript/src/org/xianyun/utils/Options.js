/*<![CDATA[*/
/**
 * &lt;select&gt; HTMLElement operations.
 * @param {HTMLElement} sel &lt;select&gt; element object.
 * @author 闲耘 (mail[AT]xianyun.org)
 * @version 1.0, 2009/09/22
 */
var Options = function(sel){
    this.sel = sel;
};

/**
 * create new option item and select it, if exist same one, select it.
 * @param {String} txt option element's text for display.
 * @param {String} val value of option for form submit.
 * @return {Boolean} 
 */
Options.prototype.create = function(txt, val){
    var ops=this.sel.options, l=ops.length;
    for(var i=0; i<l; i++){
        if(ops[i].value == (val||txt) || ops[i].text==txt){
            ops[i].selected = true;
            return true;
        }
    }
    ops[l] = new Option(txt, val||txt);
    ops[l].selected = true;
    return true;
};

/**
 * change selected option's text and value.
 * @param {String} txt option name/text for display.
 * @param {String} val option value.
 * @return {Boolean}
 */
Options.prototype.change = function(txt, val){
    var ops = this.sel.options;
    if(!ops.length){return false;}
    ops[this.sel.selectedIndex].value = val||txt;
    ops[this.sel.selectedIndex].text = txt;
    return true;
};

/**
 * remove selected option item.
 * @return {Boolean}
 */
Options.prototype.remove = function(){
    var ops = this.sel.options;
    if(!ops.length){return false;}
    this.sel.remove(this.sel.selectedIndex);
    return true;
};

/**
 * clear all options item.
 * @return {Boolean}
 */
Options.prototype.clear = function(){
    var l = this.sel.options.length;
    while(l--){
        this.sel.remove(0);
    }
    return true;
};
/*]]>*/
