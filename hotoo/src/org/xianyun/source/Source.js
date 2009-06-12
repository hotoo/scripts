/**
 * @param {String} c 匹配的括号，如：([{'"
 * @param {Number} d 匹配深度
 * @param {Boolean} b true:仅匹配指定深度; false:匹配小于等于指定深度。
 */
RegExp.nestedMatch = function(c, d, b){
    var cc = [["(",")"],["[","]"],["{","}"],["'","'"],['"','"']];
    for (var i=0; i<cc.length; i++){
        if (c===cc[i][0]){
            var c1 = c;
            var c2 = cc[i][1];
        }
    }
    var I = "\\"+c1+"[^\\"+c1+"\\"+c2+"]*\\"+c2+"";
    var N = "\\"+c1+"([^\\"+c1+"\\"+c2+"]|"+"N_1"+")*\\"+c2+""; // 匹配小于等于指定深度。
    var M = "\\"+c1+"("+"N_1"+")*\\"+c2+""; // 仅仅匹配指定深度。
    var s = (!!b?M:N);
    for (var i=d; i>2; i--){
        s = s.replace("N_1",s);
    }
    //s = s.replace("N_1",I);
    return d===1?I:s.replace("N_1",I);
};

var Source = {
	/**
	 * 编译Javascript源代码。
	 * @param {String} src 被编译的源代码字符串。
	 * @return {String}
	 */
	compile:function(src){
		return Source.compress(Source.confusion(src));
	},
	
	/**
	 * 压缩Javascript源代码（既去除无效空白和注释）。
	 * @param {Object} src
	 */
	compress:function(src){
		// annotate:
		src = src.replace(/\/\/.*(?:\n|\r)/g,"");
		src = src.replace(/\/\*(?:.|\n)*?\*\//gm,"");
		// space:
		src = src.replace(/\s{2,}/g," ");
		var op = [",",";","+","-","\*","/","&","|","!","&&","||","=","==","===","!=","!===","<","<=",">",">=","}","{","(",")","[","]","?",":"];
		for (var i=0; i<op.length; i++){
			src = src.replace(new RegExp("\\s*"+op[i].toESC4RegExp()+"\\s*","g"),op[i]);
		}
		src = src.trim();
		return src;
	},
	
	/**
	 * 混淆Javascript源代码。
	 * @param {String} src 被混淆的源代码。
	 * @return {String}
	 */
	confusion:function(src){
		var s = "";
		// 1. function fun(){}
		// 2. function(){}
		//var f = /function(?<name>[^\(]*)\((?<args>[^\)])\)\s*\{(?<code>(?:.|\n)*?)\}/gm;
		//var f = /function(?<name>[^\(]*)\(([^\)])\)\s*\{([^\}])\}/gm;
		var rf = new RegExp("function(\\s+\\w+)?\\s*\\([^\\)\\{\\}]*?\\)"+RegExp.nestedMatch("{",10),"g"); //function
		var rfm = new RegExp("function(\\s+\\w+)?\\s*\\(([^\\(\\)\\[\\}\\{\\}]*?)\\)\\s*("+RegExp.nestedMatch("{",10)+")"); // function arguments
		var rfa = /function(\s+\w+)?\s*\(([^\(\)\[\}\{\}]*?)\)/; // function arguments
		var fs = src.match(rf);
		if (!fs) return src;
		for (var i=0; i<fs.length; i++) {
			var m = rfm.exec(fs[i]);
			if (!m) continue;
			var name = m[1];
			var args = m[2].split(",");
			var code = m[3];//alert(args);
			//var name = RegExp.$1;
			//var args = m.$2.split(",");alert(args);
			//var code = RegExp.$3;
			var newArgs = new Array();
			for (var j = 0; j < args.length; j++) {
				if (args[j]==="") continue;
				newArgs.push("_"+j);
				code = code.replace(new RegExp("(?:[^\\.]|\\b)"+args[j].toESC4RegExp()+"\\b", "g"), "_"+j);
			}
			//s += "function"+name+"("+newArgs.join(",")+")"+code+"";
			src = src.replace(fs[i], "function"+name+"("+newArgs.join(",")+")"+code+"","i");
		}
		return src;
		return "function"+funName+"("+newArgs.join(",")+")"+c+"";
	},
	
	
	/**
	 * 反编译Javascript源代码。
	 * @param {String} code 目标代码。
	 * @return {String}
	 */
	decompile:function(src){
		return Source.format(src);
	},
	
	/**
	 * 格式化目标Javascript代码。
	 * @param {String} src 目标Javascript代码。
	 * @param {Object} optional 格式化选项。
	 * @return {String}
	 */
	format:function(src, optional){
		var o = {
			newLine:"\n",
			bracketStart:true, // true:at end; false:new line, at befort;
			bracketEnd:true
		};
		src = src.replace(/;/g, ";"+o.newLine);
		//src = src.replace(/(function[^{]*?{)/g, "$1"+o.newLine);
		src = src.replace(/\{/g, (o.bracket?o.newLine:"")+"{"+o.newLine);
		src = src.replace(/\}/g, (o.bracket?o.newLine:"")+"}"+o.newLine);
		return src;
	},
	save:function(){}
};
