var URI = function(string){
    this.uri = string;
};
URI.prototype.compareTo = function(uri){
    if(this.uri > uri.uri){return 1;}
    else if(this.uri == uri.uri){return 0;}
    else{return -1;}
};
URI.prototype.equal = function(uri){
    return this.uri == uri.uri;
};
URI.prototype.escape = function(){
    return escape(this.uri);
};
URI.prototype.unescape = function(){
    return unescape(this.uri);
};
URI.prototype.split = function(){
    var splitUriRefRegex = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/;
    var reMissingGroupSupport = (typeof "".match(/(a)?/)[1] != "string");
	var parts = this.uri.match(splitUriRefRegex);
	parts.shift();
	var scheme=parts[1], auth=parts[3], path=parts[4], query=parts[6], frag=parts[8];
	if (!reMissingGroupSupport) {
		var undef;
		if (parts[0] == "") scheme = undef;
		if (parts[2] == "") auth = undef;
		if (parts[5] == "") query = undef;
		if (parts[7] == "") frag = undef;
	}
	parts = [scheme, auth, path, query, frag];
	return parts;
};
URI.prototype.getScheme = function(){
    return this.split()[0];
};
//@TODO 返回此 URI 的已解码的授权组成部分。
URI.prototype.getAuthority = function(){
    return this.split()[1];
};
URI.prototype.getPath = function(){
    return this.split()[2];
};
URI.prototype.getQuery = function(){
    return this.split()[3];
};
URI.prototype.getFrag = function(){
    return this.split()[4];
};
// 判断当前URI是否为绝对URI
URI.prototype.isAbsolute = function(){
    return new RegExp('^[A-Z][0-9A-Z+\-\.]*:', 'i').test(this.uri);
};
URI.prototype.absolutize = function(baseUri){
    if(this.isAbsolute()){
        return this.uri;
    }
	// Ensure base URI is absolute
	if (! baseUri || ! new URI(baseUri).isAbsolute()) {
		 throw Error("baseUri '" + baseUri + "' is not absolute");
	}
	// shortcut for the simplest same-document reference cases
	if (this.uri == "" || this.uri.charAt(0) == "#") {
		return baseUri.split('#')[0] + this.uri;
	}
	var tScheme, tAuth, tPath, tQuery;
	// parse the reference into its components
	var parts = this.uri.split();
	var rScheme=parts[0], rAuth=parts[1], rPath=parts[2], rQuery=parts[3], rFrag=parts[4];
	// if the reference is absolute, eliminate '.' and '..' path segments
	// and skip to the end
	if (typeof rScheme != "undefined") {
		var tScheme = rScheme;
		var tAuth = rAuth;
		var tPath = uriPathRemoveDotSegments(rPath);
		var tQuery = rQuery;
	} else {
		// the base URI's scheme, and possibly more, will be inherited
		parts = new URI(baseUri).split();
		var bScheme=parts[0], bAuth=parts[1], bPath=parts[2], bQuery=parts[3], bFrag=parts[4];
		// if the reference is a net-path, just eliminate '.' and '..' path
		// segments; no other changes needed.
		if (typeof rAuth != "undefined") {
			tAuth = rAuth;
			tPath = uriPathRemoveDotSegments(rPath);
			tQuery = rQuery;
		// if it's not a net-path, we need to inherit pieces of the base URI
		} else {
			// use base URI's path if the reference's path is empty
			if (! rPath) {
				tPath = bPath;
				// use the reference's query, if any, or else the base URI's,
				tQuery = (typeof rQuery != "undefined" && rQuery || bQuery);
			// the reference's path is not empty
			} else {
				// just use the reference's path if it's absolute
				if (rPath.charAt(0) == "/") {
					tPath = uriPathRemoveDotSegments(rPath);
				// merge the reference's relative path with the base URI's path
				} else {
					if (typeof bAuth != "undefined" && ! bPath) {
						tPath = "/" + rPath;
					} else {
						tPath = bPath.substring(0, bPath.lastIndexOf("/") + 1) + rPath;
					}
					tPath = uriPathRemoveDotSegments(tPath);
				}
				// use the reference's query
				tQuery = rQuery;
			}
			// since the reference isn't a net-path,
			// use the authority from the base URI
			tAuth = bAuth;
		}
		// inherit the scheme from the base URI
		tScheme = bScheme;
	}
	// always use the reference's fragment (but no need to define another var)
	//tFrag = rFrag;
	// now compose the target URI (RFC 3986 sec. 5.3)
	var result = unsplitUriRef([tScheme, tAuth, tPath, tQuery, rFrag]);
	return result;
};
// 创建URI实例
URI.create = function(string){
    return new URI(string);
};
