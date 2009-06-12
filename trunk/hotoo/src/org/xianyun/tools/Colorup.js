/** 
 * cn.hotoo.javascript.UI.Colorup.js [class]
 * @overview 把各种语言的关键字按指定的颜色输出
 * @using cn.hotoo.javascript.UI.Syntax.js
 *           cn.hotoo.javascript.UI.Color.js
 *           will using cn.hotoo.javascript.utils.String.js
 * @author 闲耘 (HoToo)
 * @author hotoo.cn@gmail.com
 *
 * @version 0.2.0 2006-6-10, 2006-6-16(Syntax.js)
 */

_package('cn.hotoo.UI');

var Colorup = cn.hotoo.UI.Colorup = function( code, language ){
    this._code = code;
    this._language = language;
    var _ME = this;

    switch(this._language){
        case 'java' :this.matchCase = true; break;
        case 'javascript' : this.matchCase = Syntax.Javascript.CASE; break;
        case 'html' : this.matchCase = false; break;
        default : this.matchCase = false; break;
    };

    this.getHTMLtoText = function( html ){
        return html.replace(/&/g, '&amp;').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/ /g, '&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/\'/g, '&#039;').replace(/\r\n/g, '<br />').replace(/\r/g, '<br />').replace(/\n/g, '<br />') ;
    }

    this.colorup = function(){
        switch(this._language){
            case 'javascript' :
                return this.colorupJs();
                break;
            default :
                return this._code;
                break;
        }
    }

    this.colorupJs = function(){
        this._code = this.getHTMLtoText(this._code);
        for(var i =0; i < Syntax.Javascript.KeyWordBuiltInObjects.length; i++){ // replace the Key Word Built in Objects.
            var reg = new RegExp(this.getHTMLtoText(Syntax.Javascript.KeyWordBuiltInObjects[i]), this.matchCase ? 'g' : 'gi');
            this._code = this._code.replace( reg, 
                '<span style=\"color:' + Color.red + ';\">' +
                this.getHTMLtoText(Syntax.Javascript.KeyWordBuiltInObjects[i]) +
                '</span>');
        }
        for(var i =0; i < Syntax.Javascript.KeyWordReservedWords.length; i++){ // replace the Key Word of Reserved Words.
            var reg = new RegExp(this.getHTMLtoText(Syntax.Javascript.KeyWordReservedWords[i]), this.matchCase ? 'g' : 'gi');
            this._code = this._code.replace( reg, 
                '<span style=\"color:' + Color.blue + ';\">' +
                this.getHTMLtoText(Syntax.Javascript.KeyWordReservedWords[i]) +
                '</span>');
        }
        for (var i = 0, len = this._code.length; i < len; i++){
            this._code = this._code.replace('&#039;', '<span style="color:' + Color.fuchsia + '">\'');
            this._code = this._code.replace('&#039;', '\'</span>');
            this._code = this._code.replace('&quot;', '<span style="color:' + Color.fuchsia + '">\"');
            this._code = this._code.replace('&quot;', '\"</span>');
        }
        this._code = this._code.replace(/\/\*/g, '<span style=\"color:' + Color.green + '\">\/*');
        this._code = this._code.replace(/\*\//g, '*/</span>');
        this._code = this._code.replace(/\/\//g, '<span style="color:' + Color.green + '">\/\/');
        this._code = this._code.replace(/<br \/>/g, '<br /></span>');
        //this._code = this._code.replace(Browser.isFirefox ? /\n/g : /\r\n/g, '</span>');
        return this._code;
    };
}

Colorup.getCodeFromPreTag = function(sTagId, sLanguage){
    document.getElementById(sTagId).innerHTML = 
        new Colorup(document.getElementById(sTagId).innerHTML, sLanguage).colorup();
}