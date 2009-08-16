/*<![CDATA[*/
/**
 * 
 * @namespace org.xianyun
 * @extends {Object}
 * @constructor ?!
 * @param ?!
 * @since IE5.0+, Firefox1.0+, Opera8.0+, Safari3.0, Netscape8.0
 * @version ?!
 *
 * @author 闲耘(mail[AT]xianyun.org)
 */
if(!window.Node){
/**
 * Firefox2.0拥有 Node.ELEMENT_NODE 这样的常量，而IE6不支持。
 */
var Node = {
	ELEMENT_NODE				:1,
	ATTRIBUTE_NODE				:2,
	TEXT_NODE					:3,
	CDATA_SECTION_NODE			:4,
	ENTITY_REFERENCE_NODE		:5,
	ENTITY_NODE					:6,
	PROCESSING_INSTRCTION_NODE	:7,
	COMMENT_NODE				:8,
	DOCUMENT_NODE				:9,
	DOCUMENT_TYPE_NODE			:10,
	DOCUMENT_FRAGMENT_NODE		:11,
	NOTATION_NODE				:12
};
}

/*]]>*/
