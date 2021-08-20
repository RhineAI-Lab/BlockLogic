
const CodeUtils = {};

CodeUtils.Esprima = null;

CodeUtils.init = function(parser){
    CodeUtils.Esprima = parser;
};

CodeUtils.getXml = function(code) {
    const startStr = "//------ 图形块结构记录 请勿随意修改 ------\n/*";
    let i = code.indexOf(startStr);
    if(i==-1){
        return null
    }else {
        i += startStr.length;
        const length = code.substring(i).indexOf("*/");
        return code.substring(i,i+length)
    }
};

CodeUtils.getXmlCodeList = function (code) {
    if(CodeUtils.Esprima){
        let result = [];
        let syntax = null;
        try {
            syntax = CodeUtils.Esprima.parse(code,{jsx: true ,loc: true, range: true});
        }catch (e) {
            console.warn("语法有误，解析失败");
            return [];
        }
        function search(obj) {
            if(isString(obj)){
            }else if(isArray(obj)){
                for (let i = 0; i < obj.length; i++) {
                    search(obj[i])
                }
            }else if(isObj(obj)){
                if(obj.type){
                    if(obj.type==="JSXElement"){
                        if(obj.closingElement){
                            result.push({
                                line:[obj.openingElement.loc.start.line,obj.closingElement.loc.end.line],
                                range:[obj.openingElement.range[0],obj.closingElement.range[1]]
                            });
                        }else{
                            result.push({
                                line:[obj.openingElement.loc.start.line,obj.openingElement.loc.end.line],
                                range:obj.openingElement.range,
                            });
                        }
                        let res = result[result.length-1];
                        res.indent = StringUtils.countLastN(code,res.range[0]-1);
                        res.tip = StringUtils.getLineContain(code,StringUtils.getLastNotSpaceIndex(code,res.range[0]-1));
                        res.tip = res.tip.substring(StringUtils.countLikeSpaceFront(res.tip));
                        if(res.tip.length>10){
                            res.tip = res.tip.substring(0,10)+"..."
                        }else {
                            res.tip = res.tip.substring(0,res.tip.length-1)+".."
                        }
                    }else {
                        let values = Object.values(obj);
                        for (let i = 0; i < values.length; i++) {
                            search(values[i])
                        }
                    }
                }
            }
        }
        search(syntax.body);
        return result
    }
    return null;
};

CodeUtils.updateXmlCode = function (xmlString) {
    var xmlDoc=null;
    if(window.DOMParser && document.implementation && document.implementation.createDocument){
        try{
            domParser = new  DOMParser();
            xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
        }catch(e){
        }
    }else if(!window.DOMParser && window.ActiveXObject){   //window.DOMParser 判断是否是非ie浏览器
        var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
        for(var i=0;i<xmlDomVersions.length;i++){
            try{
                xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                xmlDoc.async = false;
                xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                break;
            }catch(e){
            }
        }
    } else{
        return null;
    }
    return xmlDoc;
};

CodeUtils.getXmlCode = function (xmlObj,indent) {
    if(xmlObj==null){
        return "";
    }
    indent = indent || 0;
    var code = "";
    if(document.all){
        code = xmlObj.xml;
    }else{
        code = (new XMLSerializer()).serializeToString(xmlObj);
    }
    code = CodeUtils.formatXml(code,indent);
    return code;
};

CodeUtils.formatXml = function(blob, indentNum) {
    indentNum = indentNum || 0;
    blob = blob.replace(/<(\w+)([^<]*)\/>/g, '<$1$2></$1>');
    blob = blob.replace(/\n/g,"");
    var lines = blob.split('<');
    var indent = '';
    for (let i = 0; i < indentNum; i++) {
        indent += ' ';
    }
    for (var i = 1; i < lines.length; i++) {
        var line = lines[i];
        if (line[0] == '/') {
            indent = indent.substring(4);
        }
        lines[i] = indent + '<' + line;
        if (line[0] != '/' && line.slice(-2) != '/>') {
            indent += '    ';
        }
    }
    var text = lines.join('\n');
    text = text.replace(/(<(\w+)\b[^>]*>[^\n]*)\n *<\/\2>/g, '$1</$2>');
    return text.replace(/^\n/, '');
};

function isObj(object){
    return object && typeof (object) == 'object' && Object.prototype.toString.call(object).toLowerCase() === "[object object]"
}
function isArray(obj){
    return Array.isArray(obj)
}
function isString(obj) {
    return typeof(obj)=='string'
}
