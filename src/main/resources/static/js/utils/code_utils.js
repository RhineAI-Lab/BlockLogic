
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
                                lineStart:obj.openingElement.loc.start.line,
                                lineEnd:obj.closingElement.loc.end.line,
                                range:[obj.openingElement.range[0],obj.closingElement.range[1]]
                            });
                        }else{
                            result.push({
                                lineStart:obj.openingElement.loc.start.line,
                                lineEnd:obj.openingElement.loc.end.line,
                                range:obj.openingElement.range,
                            });
                        }
                        let res = result[result.length-1];
                        res.tip = StringUtils.getLineContain(code,StringUtils.getLastNotSpaceIndex(code,res.range[0]-1));
                        res.tip = res.tip.substring(StringUtils.countSpaceFront(res.tip));
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

function isObj(object){
    return object && typeof (object) == 'object' && Object.prototype.toString.call(object).toLowerCase() === "[object object]"
}
function isArray(obj){
    return Array.isArray(obj)
}
function isString(obj) {
    return typeof(obj)=='string'
}
