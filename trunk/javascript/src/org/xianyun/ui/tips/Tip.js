/** cn.hotoo.javascript.tools.Tip.js [class]
 * @description 闲耘喜欢的一种提示方式
 * IE 6.0, firefox 1.0, Opera 8.0 通过测试
 * @version 1.2.1
 *
 * @author 闲耘 (HoToo)
 * @author hotoo.cn@gmail.com
 *
 * @create 2006-5-22
 * @update 2006-5-23
 *              2006-5-30 this._delay = delay ;
 *
 */
function Tip( oNextSibling, sText ){
	this._object = oNextSibling;
	this._div = null ;
	this._text = sText ;
	this._delay = 3000 ; // after 3 second, this object well destroy.
	this._parent = null ;
	this._style = {
		'left' : 0 ,
		'top' : 0 ,
		'width' : 200 ,
		'height' : 20 ,
		'position' : 'absolute' , // '', 'relative', 'static', 'fixed', 'inherit'.
		'border' : '1px solid #cccccc' ,
		'backgroundColor' : '#eeeeee' ,
		'fontSize' : 13 ,
		'color' : '#999999' ,
		'lineHeight' : 2 ,
		'fontWeight' : 'bold' ,
		'textAlign' : 'center' ,
	//!	'float' : 'right' , // throw exception in firefox 1.0.
		'zIndex' : 100
	} ;
	var _ME = this ;

	this.isFloating = function(){
		return (this._style['position'] == 'absolute') || (this._object == null) ;
	}
	this.setStyle = function( oStyle ){
		for ( var key in oStyle ) {
			eval( 'this._style["' + key + '"] = "' + oStyle[key] + '" ;' ) ;
		}
	}
	this.setDelay = function( delay ){
		this._delay = delay ;
	}
	this.setText = function( text ){
		this._text = text ;
	}
	this.display = function( ){ // normal.
		if ( _ME == null ){ return ; }
		this.isFloating() ? this._div.style.visibility = 'visible' : this._div.style.display = 'block' ;
	}
	this.displayEval = function( ){ // when using eval method.
		if ( _ME == null ){ return ; }
		_ME.isFloating() ? ME._div.style.visibility = 'visible' : _ME._div.style.display = 'block' ;
	}
	this.hidden = function(){ // normal.
		if ( _ME == null ){ return ; }
		this.isFloating() ? this._div.style.visibility = 'hidden' : this._div.style.display = 'none' ;
	}
	this.hiddenEval = function(){ // when using eval method.
		if ( _ME == null ){ return ; }
		_ME.isFloating() ? _ME._div.style.visibility = 'hidden' : _ME._div.style.display = 'none' ;
	}	
	this.create = function(){
		this._div = document.createElement('div');
		for ( var key in this._style ) {
			eval( 'this._div.style.' + key + ' = "' + this._style[key] + '" ;' ) ;
		}
		if ( this.isFloating() ) {
			this._div.style.top = parseInt(document.body.scrollTop) + parseInt(this._style['top']) ;
			this._div.style.left = parseInt(document.body.scrollLeft) + 
                parseInt(document.body.clientWidth) - parseInt(this._style['width'])  - 4 ;
			document.body.appendChild( this._div );
		} else {
			document.body.insertBefore( this._div,  this._object );
		}
		this._div.innerHTML = this._text ;
		setTimeout(eval('this.timeout'), this._delay);
	}
	this.remove = function(){
		if ( _ME == null ){ return ;}
		document.body.removeChild( this._div );
		this._div = null ;
		this._style = null ;
		this._object = null ;
		_ME = null ;
	//!	this = null ; // 不能给this赋值
	}
	this.timeout = function(){
		_ME.remove();
	//!	this.remove();
	//	document.body.removeChild( ME.div );
	//!	document.body.removeChild( this.div );
	}
}