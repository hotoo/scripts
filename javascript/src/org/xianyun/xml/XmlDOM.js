
var XmlDOM = function(DOM){
    var dom = DOM;
    this.getDOM = function(){
        return dom;
    };
    this.getNodeValue = function(sTagName, iIndex){
        try {
            return dom.getElementsByTagName(sTagName)[iIndex].firstChild.nodeValue;
        }catch(e){
            return "";
        };
    };
    this.getNodeLen = function(sTagName){
        try{
            return dom.getElementsByTagName(sTagName).length;
        }catch(e){
            return 0;
        };
    };
};

/**
 * 将指定字符串解析为XML DOM对象。
 * @param {String} markup 指定字符串。
 * @return {Object} 返回XML DOM对象。
 */
window.XMLDOM = function(markup) { // sync load xml object.
    if (!window.XMLDOMParser) {
        var progIDs = ['Msxml2.DOMDocument.3.0', 'Msxml2.DOMDocument', 'Microsoft.XMLDOM'];
        
        for (var i=0, l=progIDs.length; i<l; i++) {
            try {
                var xmlDOM = new ActiveXObject(progIDs[i]);
                xmlDOM.async = false;
                xmlDOM.loadXML(markup);
                xmlDOM.setProperty('SelectionLanguage', 'XPath');
                
                return xmlDOM;
            }catch (ex) {}
        }
        
        return null;
    }
    else {
		try {
			var domParser = new window.XMLDOMParser();
		} catch(e){
			domParser = new DOMParser();
		}
        return domParser.parseFromString(markup, 'text/xml');
    }
};



function Xml( src ){
    var _src = src;
    var _xml = null;
    this.init = function(){
        _xml = '';
    };
};

function getNodeValue( aoXml, asTagName , aiIndex ) {
    try {
        return aoXml.getElementsByTagName(asTagName)[aiIndex].firstChild.nodeValue;
    } catch ( e ) {
        return "";
    }
}

function getNodeLen( aoXml, asTagName ) {
    try {
        return aoXml.getElementsByTagName( asTagName ).length ;
    } catch( e ) {
        return 0 ;
    }
}