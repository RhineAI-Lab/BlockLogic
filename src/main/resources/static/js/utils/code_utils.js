
const CodeUtils = {};

CodeUtils.getXml = function(code) {
    var startStr = "//------ 图形块结构记录 请勿随意修改 ------\n/*";
    var i = code.indexOf(startStr);
    if(i==-1){
        return null
    }else {
        i += startStr.length;
        var length = code.substring(i).indexOf("*/");
        return code.substring(i,i+length)
    }
};
