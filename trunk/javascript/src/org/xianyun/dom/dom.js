// check for XPath implementation
if( document.implementation.hasFeature("XPath", "3.0") )
{
// prototying the XMLDocument
XMLDocument.prototype.selectNodes = function(cXPathString, xNode)
{
if( !xNode ) { xNode = this; }
var oNSResolver = this.createNSResolver(this.documentElement)
var aItems = this.evaluate(cXPathString, xNode, oNSResolver,
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
var aResult = [];
for( var i = 0; i < aItems.snapshotLength; i++)
{
aResult[i] = aItems.snapshotItem(i);
}
return aResult;
};

// prototying the Element
Element.prototype.selectNodes = function(cXPathString)
{
if(this.ownerDocument.selectNodes)
{
  return this.ownerDocument.selectNodes(cXPathString, this);
}
else{throw "For XML Elements Only";}
};
}




// check for XPath implementation
if( document.implementation.hasFeature("XPath", "3.0") )
{
// prototying the XMLDocument
XMLDocument.prototype.selectSingleNode = function(cXPathString, xNode)
{
if( !xNode ) { xNode = this; }
var xItems = this.selectNodes(cXPathString, xNode);
if( xItems.length > 0 )
{
return xItems[0];
}
else
{
return null;
}
};

// prototying the Element
Element.prototype.selectSingleNode = function(cXPathString)
{ 
if(this.ownerDocument.selectSingleNode)
{
return this.ownerDocument.selectSingleNode(cXPathString, this);
}
else{throw "For XML Elements Only";}
};
}